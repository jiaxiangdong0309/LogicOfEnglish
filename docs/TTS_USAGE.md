# 语音合成（TTS）功能使用说明

## 功能概述

项目集成了科大讯飞语音合成服务，支持在音标卡片中点击播放音标和单词示例的语音。

## 配置步骤

### 1. 获取科大讯飞API凭证

1. 访问 [科大讯飞开放平台](https://www.xfyun.cn/)
2. 注册并登录账号
3. 创建应用，选择"语音合成（流式版）"服务
4. 在应用管理中获取以下信息：
   - APPID
   - APIKey
   - APISecret

### 2. 配置环境变量

在项目根目录创建或编辑 `.env` 文件，填入您的凭证：

```env
VITE_XFYUN_APPID=your_app_id_here
VITE_XFYUN_API_KEY=your_api_key_here
VITE_XFYUN_API_SECRET=your_api_secret_here
```

⚠️ **重要提示**：
- `.env` 文件包含敏感信息，已添加到 `.gitignore`，不会提交到版本控制
- 可参考 `.env.example` 文件作为模板

### 3. 启动项目

配置完成后，启动开发服务器：

```bash
npm run dev
# 或
pnpm dev
```

## 使用方式

### 在音标卡片中使用

1. **播放音标**：点击音标旁边的 🔊 图标播放音标发音
2. **播放单词**：点击单词示例标签播放单词发音
3. **播放状态**：播放中的音标或单词会显示脉动动画

## 架构设计

### 目录结构

```
client/src/lib/tts/
├── TTSService.ts          # TTS服务接口定义
├── XunfeiTTSService.ts    # 科大讯飞TTS实现
└── index.ts               # 服务工厂和导出
```

### 设计模式

#### 1. 接口抽象
定义了 `TTSService` 接口，规范所有TTS服务的行为：
```typescript
interface TTSService {
  speak(text: string): Promise<void>;
  stop(): void;
  isPlaying(): boolean;
}
```

#### 2. 工厂模式
通过 `TTSServiceFactory` 统一管理服务实例创建：
- 单例模式，避免重复创建连接
- 从环境变量自动读取配置
- 便于后续更换其他TTS服务提供商

#### 3. 服务实现
`XunfeiTTSService` 实现了科大讯飞的WebSocket流式TTS：
- 自动生成HMAC-SHA256签名鉴权
- 使用Web Audio API流式播放音频
- 支持音频队列管理，无缝衔接播放

## 更换TTS服务商

如需更换为其他TTS服务（如百度、阿里云等），只需：

1. 创建新的服务实现类（如 `BaiduTTSService.ts`），实现 `TTSService` 接口
2. 在 `client/src/lib/tts/index.ts` 中替换实例化的类：
   ```typescript
   // 修改前
   this.instance = new XunfeiTTSService(config);
   
   // 修改后
   this.instance = new BaiduTTSService(config);
   ```
3. 更新 `.env` 配置为新服务商的凭证

## 技术细节

### 鉴权方式
科大讯飞使用 HMAC-SHA256 签名鉴权：
1. 生成 RFC1123 格式的时间戳
2. 构建签名原文（host + date + request-line）
3. 使用 APISecret 进行 HMAC-SHA256 签名
4. Base64 编码后作为 WebSocket 连接参数

### 音频处理
- 使用 WebSocket 接收流式音频数据（Base64编码）
- 通过 Web Audio API 解码和播放
- 维护音频队列，实现无缝连续播放

### 错误处理
- 配置缺失时抛出明确提示
- WebSocket 连接失败显示用户友好提示
- 播放失败通过 toast 提示用户

## 常见问题

### Q: 播放失败，提示"播放失败，请检查网络连接或配置"
A: 请检查：
1. `.env` 文件是否正确配置了三个环境变量
2. 环境变量的值是否正确（无多余空格）
3. 网络连接是否正常
4. 浏览器控制台是否有更详细的错误信息

### Q: 如何调整发音人或语速？
A: 修改 `XunfeiTTSService.ts` 中的 `buildRequestParams` 方法：
```typescript
business: {
  vcn: 'xiaoyan',  // 发音人: xiaoyan(女声), aisjiuxu(男声)
  speed: 50,       // 语速 [0-100]
  volume: 50,      // 音量 [0-100]
  pitch: 50,       // 音高 [0-100]
}
```

### Q: 音频格式可以更改吗？
A: 可以，修改 `buildRequestParams` 中的 `aue` 参数：
- `raw` - PCM格式
- `lame` - MP3格式（默认）
- `speex` - Speex格式

## 参考资料

- [科大讯飞语音合成API文档](https://www.xfyun.cn/doc/tts/online_tts/API.html)
- [Web Audio API MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Audio_API)
