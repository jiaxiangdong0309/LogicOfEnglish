import type { TTSService, TTSConfig } from './TTSService';

/**
 * 科大讯飞语音合成服务实现
 * 使用WebSocket流式API实现语音合成
 */
export class XunfeiTTSService implements TTSService {
  private config: TTSConfig;
  private ws: WebSocket | null = null;
  private audioContext: AudioContext | null = null;
  private audioQueue: AudioBuffer[] = [];
  private currentSource: AudioBufferSourceNode | null = null;
  private playing = false;
  private nextStartTime = 0;

  constructor(config: TTSConfig) {
    this.config = config;
  }

  /**
   * 生成鉴权URL
   */
  private async generateAuthUrl(): Promise<string> {
    const host = 'tts-api.xfyun.cn';
    const path = '/v2/tts';
    
    // 生成RFC1123格式的时间戳
    const date = new Date().toUTCString();
    
    // 构建签名原文
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
    
    // 使用HMAC-SHA256签名
    const signature = await this.hmacSha256(signatureOrigin, this.config.apiSecret);
    
    // 构建authorization原文
    const authorizationOrigin = `api_key="${this.config.apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    
    // Base64编码
    const authorization = btoa(authorizationOrigin);
    
    // 构建完整URL
    const url = `wss://${host}${path}?authorization=${encodeURIComponent(authorization)}&date=${encodeURIComponent(date)}&host=${host}`;
    
    return url;
  }

  /**
   * HMAC-SHA256签名（浏览器环境）
   */
  private async hmacSha256(message: string, secret: string): Promise<string> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );
    
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    
    // 转换为Base64
    const signatureArray = Array.from(new Uint8Array(signature));
    return btoa(String.fromCharCode(...signatureArray));
  }

  /**
   * 构建请求参数
   */
  private buildRequestParams(text: string) {
    return {
      common: {
        app_id: this.config.appId,
      },
      business: {
        aue: 'lame', // 音频编码: raw, lame(mp3)
        auf: 'audio/L16;rate=16000', // 音频采样率
        vcn: 'xiaoyan', // 发音人，可选: xiaoyan(女声), aisjiuxu(男声), aisxping(女声)等
        speed: 50, // 语速 [0-100]
        volume: 50, // 音量 [0-100]
        pitch: 50, // 音高 [0-100]
        tte: 'UTF8', // 文本编码
      },
      data: {
        status: 2, // 数据状态: 2表示一次传完
        text: btoa(unescape(encodeURIComponent(text))), // Base64编码的文本
      },
    };
  }

  /**
   * 初始化AudioContext
   */
  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * 播放音频队列
   */
  private playAudioQueue() {
    if (!this.audioContext || this.audioQueue.length === 0) return;

    const currentTime = this.audioContext.currentTime;
    
    // 如果是第一个音频，立即播放
    if (this.nextStartTime < currentTime) {
      this.nextStartTime = currentTime;
    }

    const buffer = this.audioQueue.shift()!;
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(this.nextStartTime);
    
    this.currentSource = source;
    this.nextStartTime += buffer.duration;

    source.onended = () => {
      if (this.audioQueue.length > 0) {
        this.playAudioQueue();
      } else {
        this.playing = false;
        this.currentSource = null;
      }
    };
  }

  /**
   * 解码音频数据
   */
  private async decodeAudioData(audioData: string): Promise<AudioBuffer> {
    // Base64解码
    const binaryString = atob(audioData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // 解码音频
    return await this.audioContext!.decodeAudioData(bytes.buffer);
  }

  /**
   * 合成并播放语音
   */
  async speak(text: string): Promise<void> {
    if (!text || text.trim().length === 0) {
      throw new Error('文本不能为空');
    }

    // 停止当前播放
    this.stop();

    // 初始化AudioContext
    this.initAudioContext();
    
    this.playing = true;
    this.audioQueue = [];
    this.nextStartTime = 0;

    return new Promise(async (resolve, reject) => {
      try {
        // 生成鉴权URL
        const url = await this.generateAuthUrl();
        this.ws = new WebSocket(url);

        this.ws.onopen = () => {
          const params = this.buildRequestParams(text);
          this.ws!.send(JSON.stringify(params));
        };

        this.ws.onmessage = async (event) => {
          try {
            const response = JSON.parse(event.data);
            
            if (response.code !== 0) {
              reject(new Error(`语音合成失败: ${response.message}`));
              this.ws?.close();
              return;
            }

            // 接收音频数据
            if (response.data && response.data.audio) {
              const audioBuffer = await this.decodeAudioData(response.data.audio);
              this.audioQueue.push(audioBuffer);
              
              // 开始播放
              if (this.audioQueue.length === 1) {
                this.playAudioQueue();
              }
            }

            // 数据传输完成
            if (response.data && response.data.status === 2) {
              this.ws?.close();
              
              // 等待所有音频播放完成
              const checkComplete = () => {
                if (!this.playing) {
                  resolve();
                } else {
                  setTimeout(checkComplete, 100);
                }
              };
              checkComplete();
            }
          } catch (error) {
            reject(error);
            this.ws?.close();
          }
        };

        this.ws.onerror = (error) => {
          reject(new Error('WebSocket连接错误'));
          this.playing = false;
        };

        this.ws.onclose = () => {
          this.ws = null;
        };
      } catch (error) {
        reject(error);
        this.playing = false;
      }
    });
  }

  /**
   * 停止播放
   */
  stop(): void {
    this.playing = false;
    this.audioQueue = [];
    
    if (this.currentSource) {
      try {
        this.currentSource.stop();
      } catch (e) {
        // 忽略已经停止的错误
      }
      this.currentSource = null;
    }

    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  /**
   * 检查是否正在播放
   */
  isPlaying(): boolean {
    return this.playing;
  }
}
