import type { TTSService } from './TTSService';
import { XunfeiTTSService } from './XunfeiTTSService';
import { WebSpeechTTSService } from './WebSpeechTTSService';

/**
 * TTS服务提供商类型
 */
export type TTSProvider = 'xunfei' | 'webspeech';

/**
 * TTS服务工厂
 * 统一管理TTS服务的创建和实例，便于后续更换服务提供商
 */
class TTSServiceFactory {
  private static instance: TTSService | null = null;
  private static currentProvider: TTSProvider | null = null;

  /**
   * 获取TTS服务单例
   * @param provider 指定TTS服务提供商，不指定则使用环境变量配置
   */
  static getInstance(provider?: TTSProvider): TTSService {
    // 如果指定了新的提供商，需要重新创建实例
    if (provider && provider !== this.currentProvider) {
      this.reset();
      this.currentProvider = provider;
    }

    if (!this.instance) {
      // 从环境变量读取配置的提供商
      const envProvider = import.meta.env.VITE_TTS_PROVIDER as TTSProvider;
      const selectedProvider = provider || envProvider || 'webspeech'; // 默认使用 WebSpeech
      
      this.currentProvider = selectedProvider;

      if (selectedProvider === 'xunfei') {
        // 使用科大讯飞TTS
        const config = {
          appId: import.meta.env.VITE_XFYUN_APPID || '',
          apiKey: import.meta.env.VITE_XFYUN_API_KEY || '',
          apiSecret: import.meta.env.VITE_XFYUN_API_SECRET || '',
        };

        // 验证配置
        if (!config.appId || !config.apiKey || !config.apiSecret) {
          console.warn('科大讯飞TTS配置不完整，切换到 WebSpeech');
          this.instance = new WebSpeechTTSService();
        } else {
          this.instance = new XunfeiTTSService(config);
        }
      } else {
        // 使用浏览器原生 WebSpeech API
        this.instance = new WebSpeechTTSService();
      }

      console.log(`TTS服务已初始化: ${selectedProvider}`);
    }

    return this.instance;
  }

  /**
   * 重置实例（用于测试或重新配置）
   */
  static reset(): void {
    if (this.instance) {
      this.instance.stop();
      this.instance = null;
    }
    this.currentProvider = null;
  }

  /**
   * 获取当前使用的提供商
   */
  static getCurrentProvider(): TTSProvider | null {
    return this.currentProvider;
  }
}

/**
 * 导出便捷的TTS服务获取方法
 */
export const getTTSService = (provider?: TTSProvider) => TTSServiceFactory.getInstance(provider);

/**
 * 获取当前TTS提供商
 */
export const getCurrentTTSProvider = () => TTSServiceFactory.getCurrentProvider();

/**
 * 导出类型供外部使用
 */
export type { TTSService } from './TTSService';
export type { TTSProvider };
