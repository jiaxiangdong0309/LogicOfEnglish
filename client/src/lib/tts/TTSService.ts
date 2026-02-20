/**
 * 语音合成服务接口
 * 定义了TTS服务的通用接口，便于后续更换不同的TTS提供商
 */
export interface TTSService {
  /**
   * 合成并播放语音
   * @param text 要合成的文本
   * @returns Promise，播放完成或失败时resolve/reject
   */
  speak(text: string): Promise<void>;

  /**
   * 停止当前播放
   */
  stop(): void;

  /**
   * 检查服务是否正在播放
   */
  isPlaying(): boolean;
}

/**
 * TTS配置接口
 */
export interface TTSConfig {
  appId: string;
  apiKey: string;
  apiSecret: string;
}
