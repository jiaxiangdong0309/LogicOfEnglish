import type { TTSService } from './TTSService';

/**
 * 浏览器原生 Web Speech API 语音合成服务实现
 * 使用 window.speechSynthesis 提供语音合成功能
 * 优点：无需API密钥，对英语音标支持较好
 * 缺点：不同浏览器支持程度不同，声音质量依赖系统
 */
export class WebSpeechTTSService implements TTSService {
  private synthesis: SpeechSynthesis;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private playing = false;
  private enVoice: SpeechSynthesisVoice | null = null;
  private zhVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (!('speechSynthesis' in window)) {
      throw new Error('当前浏览器不支持 Web Speech API');
    }
    
    this.synthesis = window.speechSynthesis;
    this.initVoices();
  }

  /**
   * 初始化语音列表，选择最佳的英语和中文语音
   */
  private initVoices() {
    const loadVoices = () => {
      const voices = this.synthesis.getVoices();
      
      if (voices.length === 0) {
        return;
      }

      // 优先选择英语语音（用于音标发音）
      // 优先级：美式英语 > 英式英语 > 其他英语
      this.enVoice = 
        voices.find(v => v.lang === 'en-US') ||
        voices.find(v => v.lang === 'en-GB') ||
        voices.find(v => v.lang.startsWith('en')) ||
        voices[0]; // 后备方案

      // 选择中文语音
      this.zhVoice = 
        voices.find(v => v.lang === 'zh-CN') ||
        voices.find(v => v.lang === 'zh-TW') ||
        voices.find(v => v.lang.startsWith('zh')) ||
        voices[0]; // 后备方案

      console.log('已加载语音:', {
        english: this.enVoice?.name,
        chinese: this.zhVoice?.name,
        totalVoices: voices.length
      });
    };

    // 语音列表可能需要异步加载
    loadVoices();
    
    // 监听语音列表变化（某些浏览器需要）
    if (this.synthesis.onvoiceschanged !== undefined) {
      this.synthesis.onvoiceschanged = loadVoices;
    }
  }

  /**
   * 检测文本类型并选择合适的语音
   */
  private detectLanguage(text: string): SpeechSynthesisVoice | null {
    // 如果是音标符号（IPA字符）或纯英文单词，使用英语语音
    const ipaPattern = /[æɪʊəɛɔʌɑːiːuːeɪaɪɔɪaʊoʊɪəeəʊə]/;
    const isEnglishWord = /^[a-zA-Z\s\-']+$/.test(text);
    
    if (ipaPattern.test(text) || isEnglishWord) {
      return this.enVoice;
    }
    
    // 包含中文字符，使用中文语音
    const hasChinese = /[\u4e00-\u9fa5]/.test(text);
    if (hasChinese) {
      return this.zhVoice;
    }
    
    // 默认使用英语语音（适合音标）
    return this.enVoice;
  }

  /**
   * 预处理文本，优化音标发音
   * 某些音标符号可能需要转换为更容易识别的形式
   */
  private preprocessText(text: string): string {
    let processed = text.trim();
    
    // 移除音标常见的斜杠标记 /.../ 
    processed = processed.replace(/^\//, '').replace(/\/$/, '');
    
    // 某些特殊音标可能需要特殊处理
    // 例如：将单个音标符号用空格隔开，便于发音
    // 这里可以根据实际效果调整
    
    return processed;
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

    return new Promise((resolve, reject) => {
      try {
        // 预处理文本
        const processedText = this.preprocessText(text);
        
        // 创建语音合成实例
        const utterance = new SpeechSynthesisUtterance(processedText);
        this.currentUtterance = utterance;

        // 选择合适的语音
        const voice = this.detectLanguage(text);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        }

        // 设置语音参数
        utterance.rate = 0.85;  // 语速稍慢，便于听清音标
        utterance.pitch = 1.0;   // 标准音高
        utterance.volume = 1.0;  // 最大音量

        // 事件监听
        utterance.onstart = () => {
          this.playing = true;
          console.log('开始播放:', processedText, '使用语音:', voice?.name);
        };

        utterance.onend = () => {
          this.playing = false;
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (event) => {
          this.playing = false;
          this.currentUtterance = null;
          console.error('语音合成错误:', event);
          reject(new Error(`语音合成失败: ${event.error}`));
        };

        // 开始播放
        this.synthesis.speak(utterance);
      } catch (error) {
        this.playing = false;
        this.currentUtterance = null;
        reject(error);
      }
    });
  }

  /**
   * 停止播放
   */
  stop(): void {
    if (this.synthesis.speaking) {
      this.synthesis.cancel();
    }
    this.playing = false;
    this.currentUtterance = null;
  }

  /**
   * 检查是否正在播放
   */
  isPlaying(): boolean {
    return this.playing;
  }

  /**
   * 获取可用的语音列表（调试用）
   */
  getAvailableVoices(): SpeechSynthesisVoice[] {
    return this.synthesis.getVoices();
  }
}
