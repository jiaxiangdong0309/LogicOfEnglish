# Logic of English - 英语音标学习指南

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1-blue.svg)](https://tailwindcss.com/)

一个交互式的英语音标学习应用，基于 Logic of English (LoE) 体系，帮助学习者通过逻辑规则而非死记硬背掌握英语发音。

## 📚 项目简介

本项目实现了一个完整的英语音标教学系统，包含：

- **26 个字母音标详解**：每个字母的多种发音、发音规则和实例
- **核心发音规则**：开音节/闭音节、不发音的结尾 E 的 9 大理由
- **交互式学习界面**：展开/折叠卡片、分类展示（元音/辅音）
- **中英文双语支持**：完整的中文和英文界面

### 教学理念

- **逻辑化学习**：75 个音标 + 31 条拼写规则 = 解释 98% 的英文单词
- **系统化教学**：先学核心规则，再学具体字母
- **可视化展示**：清晰的音标、例词和发音规则说明

## 🚀 快速开始

### 环境要求

- Node.js >= 18
- pnpm >= 10.4.1

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

应用将在 `http://localhost:3000` 启动（如果端口被占用会自动切换到下一个可用端口）

### 构建生产版本

```bash
pnpm build
```

构建产物将输出到 `dist/` 目录

### 启动生产服务器

```bash
pnpm start
```

## 📁 项目结构

```
LogicOfEnglish/
├── client/                 # 前端代码
│   ├── src/
│   │   ├── components/     # React 组件
│   │   │   ├── ui/        # shadcn/ui 组件库
│   │   │   ├── CoreLessonsCN.tsx     # 核心课程
│   │   │   └── PhonogramCardCN.tsx   # 音标卡片
│   │   ├── pages/          # 页面组件
│   │   │   ├── HomeCN.tsx            # 首页
│   │   │   └── NotFound.tsx          # 404 页面
│   │   ├── lib/            # 工具函数和数据
│   │   │   └── phonogramDataCN.ts    # 音标数据
│   │   ├── contexts/       # React Context
│   │   ├── hooks/          # 自定义 Hooks
│   │   └── App.tsx         # 应用入口
│   ├── public/             # 静态资源
│   └── index.html          # HTML 模板
├── server/                 # 后端服务
│   └── index.ts            # Express 服务器
├── shared/                 # 共享代码
├── patches/                # 依赖补丁
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
├── components.json         # shadcn/ui 配置
└── package.json            # 项目配置
```

## 🎯 核心功能

### 1. 核心发音规则

**开音节 vs 闭音节**
- **闭音节**：以辅音结尾，元音发短音（cat, bed, sit）
- **开音节**：以元音结尾，元音发长音（me, go, ba-by）

**不发音的结尾 E - 9 大理由**
1. 使元音变长（bake, time）
2. 避免 V/U 结尾（have, blue）
3. 使 C/G 变软（face, page）
4. 让辅音可见（dance, horse）
5. 区分词义（pin/pine）
6. ... 等共 9 条规则

### 2. 26 个字母音标

#### 元音 (A, E, I, O, U, Y)
每个元音都有详细的：
- 多个发音方式
- 发音规则说明
- 丰富的例词

#### 辅音 (B-Z)
- 常规辅音：发音稳定
- 特殊辅音：C、G 等根据后续字母改变发音

### 3. 交互式界面

- **标签页切换**：核心逻辑 / 26 个字母
- **展开/折叠**：点击卡片查看详细内容
- **分类展示**：元音和辅音分组显示
- **响应式设计**：支持桌面和移动设备

## 🛠️ 技术栈

### 前端
- **框架**：React 19.2
- **语言**：TypeScript 5.6
- **路由**：Wouter 3.3
- **样式**：Tailwind CSS 4.1
- **组件库**：Radix UI + shadcn/ui
- **动画**：Framer Motion
- **图标**：Lucide React
- **构建工具**：Vite 7.1

### 后端
- **运行时**：Node.js
- **框架**：Express 4.21
- **打包**：esbuild

### 开发工具
- **包管理器**：pnpm 10.15
- **代码格式化**：Prettier
- **类型检查**：TypeScript

## 📝 数据结构

### Phonogram 接口

```typescript
interface PhonogramSound {
  sound: string;           // 音标符号
  description: string;     // 发音规则说明
  examples: string[];      // 例词列表
}

interface Phonogram {
  letter: string;          // 字母
  type: 'vowel' | 'consonant';  // 类型：元音或辅音
  sounds: PhonogramSound[];     // 发音列表
}
```

### 核心课程结构

```typescript
interface CoreLesson {
  id: string;              // 课程 ID
  title: string;           // 课程标题
  description: string;     // 课程描述
  content: Array<{         // 课程内容
    concept?: string;      // 概念名称
    definition?: string;   // 定义
    result?: string;       // 结果
    rule?: string;         // 规则编号
    reason?: string;       // 原因
    explanation?: string;  // 解释
    examples: string[];    // 例词
  }>;
}
```

## 🎨 自定义开发

### 添加新的音标数据

编辑 `client/src/lib/phonogramDataCN.ts`：

```typescript
export const phonogramsCN: Phonogram[] = [
  {
    letter: 'A',
    type: 'vowel',
    sounds: [
      {
        sound: '/æ/',
        description: '在闭音节中',
        examples: ['cat', 'map', 'had']
      }
    ]
  }
];
```

### 修改主题颜色

编辑 `client/src/index.css` 中的 CSS 变量：

```css
:root {
  --primary: ...;
  --secondary: ...;
}
```

### 添加新页面

1. 在 `client/src/pages/` 创建页面组件
2. 在 `client/src/App.tsx` 添加路由

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [Logic of English](https://www.logicofenglish.com/) - 教学体系来源
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件基础

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：

- 提交 [GitHub Issue](https://github.com/yourusername/LogicOfEnglish/issues)
- 发送邮件至：your.email@example.com

---

**Happy Learning! 学习愉快！** 📖✨
