# WebSpeech API TTS 使用指南

## 概述

WebSpeech API 是浏览器原生提供的语音合成接口，特别适合英语音标的发音。相比科大讯飞，它对 IPA（国际音标）符号的支持更好。

## 优势

### ✅ 无需配置
- 不需要 API 密钥
- 不需要网络请求
- 开箱即用

### ✅ 音标支持好
- 能够正确识别和发音大部分 IPA 音标符号
- 如：`/æ/`、`/ɪ/`、`/ʊ/`、`/ə/` 等

### ✅ 智能语言检测
- 自动识别文本类型（音标、英文单词、中文）
- 自动选择最合适的语音引擎

### ✅ 多平台支持
- macOS：使用系统自带的高质量语音（如 Alex, Samantha）
- Windows：使用 Microsoft 语音
- iOS/Android：使用系统语音

## 快速开始

### 1. 配置 .env 文件

编辑 `.env` 文件，设置使用 WebSpeech：

```env
VITE_TTS_PROVIDER=webspeech
```

### 2. 重启开发服务器

```bash
# 如果服务器正在运行，按 Ctrl+C 停止，然后重启
pnpm dev
```

### 3. 测试音标发音

1. 打开浏览器访问应用
2. 展开任意音标卡片
3. 点击音标旁边的 🔊 图标
4. 你应该能听到清晰的音标发音了！

## 技术实现

### 自动语言检测

`WebSpeechTTSService` 会自动检测文本类型：

```typescript
// 检测 IPA 音标符号
const ipaPattern = /[æɪʊəɛɔʌɑːiːuːeɪaɪɔɪaʊoʊɪəeəʊə]/;

// 检测纯英文单词
const isEnglishWord = /^[a-zA-Z\s\-']+$/.test(text);

// 检测中文
const hasChinese = /[\u4e00-\u9fa5]/.test(text);
```

根据检测结果，自动选择：
- **英语语音**：用于音标和英文单词
- **中文语音**：用于包含中文的文本

### 语音参数优化

针对音标学习场景，设置了特殊参数：

```typescript
utterance.rate = 0.85;   // 语速稍慢（85%），便于听清音标
utterance.pitch = 1.0;   // 标准音高
utterance.volume = 1.0;  // 最大音量
```

### 文本预处理

```typescript
// 自动移除音标的斜杠标记
// 输入：/æ/
// 处理后：æ
processed = text.replace(/^\//, '').replace(/\/$/, '');
```

## 浏览器兼容性

| 浏览器 | 支持情况 | 语音质量 |
|--------|---------|---------|
| Chrome | ✅ 完全支持 | ⭐⭐⭐⭐ |
| Safari | ✅ 完全支持 | ⭐⭐⭐⭐⭐ (macOS系统语音) |
| Edge | ✅ 完全支持 | ⭐⭐⭐⭐ |
| Firefox | ⚠️ 部分支持 | ⭐⭐⭐ |

## 常见问题

### Q1: 为什么有些音标发音不准确？

**A:** 音标发音质量取决于系统提供的语音库。建议：
- **macOS**: 使用 Safari 浏览器，调用系统高质量语音
- **Windows**: 可以安装额外的语音包提升质量
- **Chrome**: 通常使用系统默认语音

### Q2: 如何查看可用的语音列表？

**A:** 打开浏览器控制台，输入：

```javascript
speechSynthesis.getVoices().forEach(voice => {
  console.log(voice.name, voice.lang);
});
```

### Q3: 可以手动选择语音吗？

**A:** 可以！修改 `WebSpeechTTSService.ts` 中的语音选择逻辑：

```typescript
// 例如，强制使用 Google US English
this.enVoice = voices.find(v => v.name === 'Google US English');
```

### Q4: 首次播放没声音？

**A:** 语音列表可能还在加载中。解决方法：
1. 等待几秒后重试
2. 刷新页面
3. 查看控制台是否有错误信息

### Q5: 如何切换回科大讯飞？

**A:** 修改 `.env` 文件：

```env
VITE_TTS_PROVIDER=xunfei
```

然后重启开发服务器。

## 调试技巧

### 查看当前使用的语音

在 `WebSpeechTTSService` 的构造函数中已经添加了日志：

```typescript
console.log('已加载语音:', {
  english: this.enVoice?.name,
  chinese: this.zhVoice?.name,
  totalVoices: voices.length
});
```

打开浏览器控制台可以看到正在使用的语音。

### 监听播放事件

```typescript
utterance.onstart = () => {
  console.log('开始播放:', text, '使用语音:', voice?.name);
};
```

每次播放时都会在控制台输出详细信息。

## 性能优化

### 单例模式
工厂类使用单例模式，避免重复创建实例：

```typescript
static getInstance(provider?: TTSProvider): TTSService {
  if (!this.instance) {
    this.instance = new WebSpeechTTSService();
  }
  return this.instance;
}
```

### 语音预加载
语音列表在服务初始化时就加载完成，避免播放时的延迟。

## 与科大讯飞对比

| 特性 | WebSpeech | 科大讯飞 |
|------|-----------|---------|
| 配置难度 | ⭐ 无需配置 | ⭐⭐⭐ 需要API密钥 |
| 网络要求 | ✅ 可离线 | ❌ 必须联网 |
| 音标支持 | ⭐⭐⭐⭐ 好 | ⭐⭐ 一般 |
| 中文支持 | ⭐⭐⭐ 一般 | ⭐⭐⭐⭐⭐ 优秀 |
| 响应速度 | ⭐⭐⭐⭐⭐ 极快 | ⭐⭐⭐ 较快 |
| 声音质量 | ⭐⭐⭐⭐ 系统依赖 | ⭐⭐⭐⭐ 稳定 |
| 成本 | ✅ 免费 | 💰 有限额度 |

## 建议配置

### 英语音标学习应用（当前场景）
```env
VITE_TTS_PROVIDER=webspeech  # 推荐 ⭐⭐⭐⭐⭐
```

### 中文为主的应用
```env
VITE_TTS_PROVIDER=xunfei
```

### 混合场景
可以考虑在代码中动态切换：
- 音标和英文单词 → WebSpeech
- 中文文本 → 科大讯飞

## 下一步

如果 WebSpeech 的音标发音效果不理想，可以考虑：

1. **预录音频**: 为每个音标录制真人发音（最标准）
2. **专业TTS服务**: 如 Google Cloud TTS、Azure TTS（对音标支持更好）
3. **混合方案**: 音标用预录音频，单词用 TTS

## 总结

WebSpeech API 是一个优秀的短期解决方案，特别适合：
- 快速原型开发
- 不想配置 API 的场景
- 对英语音标发音有要求的应用

现在就试试吧！🎉
