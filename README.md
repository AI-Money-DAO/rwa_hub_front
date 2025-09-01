# RWA Hub

RWA Hub是一个基于Next.js 14的现代化Web应用，专注于RWA（Real World Assets）相关服务。该网站提供用户认证、任务管理、资产信息查询等功能。

## 技术栈

- **前端框架**: Next.js 14 (Pages Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **表单处理**: React Hook Form + Zod验证
- **AI对话组件**: @chatscope/chat-ui-kit-react
- **图标**: Lucide React
- **代码格式化**: Prettier + ESLint

## 项目结构

```
src/
├── pages/                  # Next.js Pages Router页面
│   ├── api/               # API路由 (Mock实现)
│   ├── auth/              # 认证相关页面
│   ├── dashboard/         # 需要认证的页面
│   ├── chat/              # AI对话页面
│   └── index.tsx          # 首页
├── components/            # 可复用组件
│   ├── ui/               # shadcn/ui组件
│   ├── layout/           # 布局组件
│   ├── forms/            # 表单组件
│   └── features/         # 功能特定组件
├── lib/                  # 工具库
├── mocks/               # Mock数据
├── types/               # TypeScript类型定义
├── contexts/            # React Context
└── hooks/              # 自定义Hooks
```

## 开发环境设置

### 安装依赖

```bash
npm install
```

### 环境变量

复制 `.env.example` 到 `.env.local` 并配置相应的环境变量：

```bash
cp .env.example .env.local
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 其他命令

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint

# 代码格式化
npm run format

# 检查代码格式
npm run format:check
```

## 开发规范

### 代码格式化

项目使用 Prettier 进行代码格式化，配置文件为 `.prettierrc`。

### ESLint配置

ESLint配置为警告模式，不会阻止构建：
- `@typescript-eslint/no-unused-vars`: warn
- `@typescript-eslint/no-explicit-any`: warn

### 提交前检查

建议在提交代码前运行：

```bash
npm run format
npm run lint
npm run build
```

## API设计

项目采用Mock优先的开发策略：
- 使用Pages Router的API路由实现mock接口
- API客户端抽象层支持本地API和真实API切换
- 通过环境变量 `NEXT_PUBLIC_ENABLE_MOCK_API` 控制

## 部署

项目可以部署到任何支持Next.js的平台，如Vercel、Netlify等。

```bash
npm run build
npm start
```

## 开发进度

项目按照规范化的任务列表进行开发，详见 `.kiro/specs/rwa-hub-website/tasks.md`。

当前已完成：
- ✅ 项目初始化和基础配置
- ✅ Next.js 14 + TypeScript设置
- ✅ Tailwind CSS + shadcn/ui配置
- ✅ AI对话组件库安装
- ✅ 项目目录结构设置
- ✅ ESLint + Prettier配置
- ✅ 基础类型定义和Mock数据

## 贡献指南

1. Fork项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request