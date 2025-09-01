# 设计文档

## 概述

RWA Hub是一个基于Next.js 14的现代化Web应用，采用Pages Router架构。该应用提供RWA（Real World Assets）相关服务，包括用户认证、任务管理、资产信息查询等功能。应用采用TypeScript开发，使用Tailwind CSS进行样式设计，集成shadcn/ui组件库，并通过RESTful API与后端服务通信。

## 架构

### 技术栈
- **前端框架**: Next.js 14 (Pages Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS + shadcn/ui
- **状态管理**: React Context + useReducer
- **HTTP客户端**: fetch API + 自定义封装
- **认证**: JWT Token + HTTP-only Cookies
- **表单处理**: React Hook Form + Zod验证
- **图标**: Lucide React
- **AI对话组件**: 推荐使用现成组件库（见下方选项）

### 项目结构
```
src/
├── pages/                  # Next.js Pages Router页面
│   ├── api/               # API路由
│   │   ├── auth/          # 认证相关API
│   │   ├── tasks/         # 任务管理API
│   │   ├── points/        # 积分管理API
│   │   └── chat/          # AI对话API
│   ├── auth/              # 认证相关页面
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── dashboard/         # 需要认证的页面
│   │   ├── index.tsx      # 仪表板首页
│   │   ├── profile.tsx    # 个人资料
│   │   ├── tasks/         # 任务管理
│   │   │   ├── index.tsx  # 任务列表
│   │   │   └── [id].tsx   # 任务详情
│   │   └── points/        # 积分管理
│   │       ├── index.tsx  # 积分余额
│   │       └── history.tsx # 积分历史
│   ├── chat/              # AI对话页面
│   │   └── [sessionId].tsx # 动态对话会话页面
│   ├── about.tsx          # 关于页面
│   ├── partners.tsx       # 合作伙伴页面
│   ├── community.tsx      # 社区页面
│   ├── index.tsx          # 首页
│   ├── _app.tsx           # 应用根组件
│   └── _document.tsx      # HTML文档结构
├── components/            # 可复用组件
│   ├── ui/               # shadcn/ui组件
│   ├── layout/           # 布局组件
│   │   ├── Layout.tsx    # 主布局组件
│   │   ├── Header.tsx    # 导航栏
│   │   ├── Footer.tsx    # 页脚
│   │   └── Sidebar.tsx   # 侧边栏
│   ├── forms/            # 表单组件
│   └── features/         # 功能特定组件
├── lib/                  # 工具库
│   ├── api.ts           # API客户端
│   ├── mock-api.ts      # Mock API实现
│   ├── auth.ts          # 认证工具
│   ├── utils.ts         # 通用工具
│   └── validations.ts   # 表单验证
├── mocks/               # Mock数据
│   ├── users.ts         # 用户mock数据
│   ├── tasks.ts         # 任务mock数据
│   ├── chat.ts          # AI对话mock数据
│   └── index.ts         # Mock数据导出
├── styles/              # 样式文件
│   └── globals.css      # 全局样式
├── types/               # TypeScript类型定义
├── contexts/            # React Context
└── hooks/              # 自定义Hooks
```

## Pages Router架构设计

### 页面路由结构
- **首页**: `/` (index.tsx)
- **认证页面**: `/auth/login`, `/auth/register`
- **仪表板**: `/dashboard/*` (需要认证)
- **AI对话**: `/chat/[sessionId]` (动态路由)
- **静态页面**: `/about`, `/partners`, `/community`
- **API路由**: `/api/*` (用于Mock API实现)

### 布局策略
```typescript
// _app.tsx中的布局逻辑
function MyApp({ Component, pageProps, router }: AppProps) {
  // 根据路由决定使用哪种布局
  const isDashboard = router.pathname.startsWith('/dashboard');
  const isAuth = router.pathname.startsWith('/auth');
  
  if (isAuth) {
    return <Component {...pageProps} />; // 无布局
  }
  
  return (
    <Layout showSidebar={isDashboard}>
      <Component {...pageProps} />
    </Layout>
  );
}
```

## 组件和接口

### 核心组件架构

#### 1. 布局组件
- **RootLayout**: 应用根布局，包含全局Provider
- **Header**: 导航栏组件，支持响应式设计
- **Footer**: 页脚组件
- **Sidebar**: 仪表板侧边栏（仅在dashboard页面组中使用）

#### 2. 认证组件
- **LoginForm**: 登录表单组件
- **RegisterForm**: 注册表单组件
- **AuthGuard**: 路由保护组件
- **ProfileForm**: 个人资料编辑表单

#### 3. 任务管理组件
- **TaskList**: 任务列表组件
- **TaskCard**: 单个任务卡片
- **TaskForm**: 任务创建/编辑表单
- **TaskFilters**: 任务筛选组件
- **TaskStats**: 任务统计组件

#### 4. AI对话组件

**推荐组件库选项：**

1. **@chatscope/chat-ui-kit-react** (推荐)
   - 专门为聊天应用设计的React组件库
   - 包含MessageList, Message, MessageInput, TypingIndicator等
   - 支持TypeScript，样式可定制
   - 安装：`npm install @chatscope/chat-ui-kit-react`
   
   **可定制性分析：**
   - ✅ **CSS变量定制**: 支持通过CSS变量修改颜色、字体、间距等
   - ✅ **className覆盖**: 每个组件都支持自定义className
   - ✅ **样式注入**: 可以通过CSS-in-JS或外部CSS完全重写样式
   - ✅ **组件组合**: 灵活的组件组合方式
   - ⚠️ **结构限制**: 某些组件的HTML结构相对固定
   - ⚠️ **主题系统**: 没有内置的完整主题系统

**使用示例和定制方案：**
```typescript
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator
} from '@chatscope/chat-ui-kit-react';

// 基本对话界面结构 + Tailwind定制
<MainContainer className="h-full bg-gray-50">
  <ChatContainer className="bg-white rounded-lg shadow-lg">
    <MessageList
      className="p-4"
      typingIndicator={isTyping ? 
        <TypingIndicator 
          content="AI正在回复..." 
          className="text-blue-600"
        /> : null
      }
    >
      {messages.map(message => (
        <Message
          key={message.id}
          className={`mb-4 ${message.role === 'user' ? 'ml-8' : 'mr-8'}`}
          model={{
            message: message.content,
            sentTime: message.timestamp,
            sender: message.role === 'user' ? 'User' : 'AI',
            direction: message.role === 'user' ? 'outgoing' : 'incoming'
          }}
        />
      ))}
    </MessageList>
    <MessageInput
      className="border-t border-gray-200"
      placeholder="输入您的问题..."
      onSend={handleSendMessage}
      attachButton={false}
    />
  </ChatContainer>
</MainContainer>

// CSS变量定制（在globals.css中）
:root {
  --cs-message-incoming-bg-color: #f3f4f6;
  --cs-message-outgoing-bg-color: #3b82f6;
  --cs-message-font-size: 14px;
  --cs-message-border-radius: 12px;
}
```

2. **备选方案**：

   **如果@chatscope定制性不够，推荐：**
   
   a) **react-chat-elements**
   - 更轻量，定制性更强
   - 需要更多手动样式工作
   - 适合需要完全自定义UI的场景
   
   b) **完全自定义实现**
   - 使用shadcn/ui基础组件构建
   - 最大的灵活性和控制权
   - 开发时间较长但完全符合设计需求
   
   **推荐策略：**
   1. 先尝试@chatscope + Tailwind定制
   2. 如果样式限制太多，切换到自定义实现
   3. 使用shadcn/ui的ScrollArea、Input、Button等组件作为基础

#### 5. UI组件
- 使用shadcn/ui提供的基础组件：Button, Input, Card, Dialog, Table等
- 自定义组件：SearchBar, AssetTypeIcon, PartnerLogo等

### API接口设计

#### 开发策略
- **Mock优先**: 使用Pages Router的API路由实现mock接口，确保开发不依赖后端服务
- **API抽象层**: 创建API客户端抽象层，便于后续切换到真实API
- **环境配置**: 通过环境变量控制使用本地API路由还是真实后端API

#### Mock API实现（Pages Router）
```typescript
// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Mock登录逻辑
    const { username, password } = req.body;
    // 返回mock响应
    res.status(200).json({ 
      code: 0, 
      message: 'success', 
      data: { token: 'mock-token', user: mockUser } 
    });
  }
}
```

#### 认证相关接口
```typescript
// 用户登录
POST /api/auth/login
Request: { username: string, password: string }
Response: { token: string, user: UserInfo }

// 用户注册
POST /api/auth/register
Request: { username: string, email: string, password: string }
Response: { message: string }

// 刷新令牌
POST /api/auth/refresh
Response: { token: string }
```

#### 用户资料接口
```typescript
// 更新用户信息
POST /api/profile/update
Request: UpdateProfileRequest
Response: { code: number, message: string, data: ProfileUpdateResult }

// 修改密码
POST /api/profile/change-password
Request: ChangePasswordRequest
Response: { code: number, message: string, data: string }

// 重置密码
POST /api/profile/reset-password
Request: ResetPasswordRequest
Response: { code: number, message: string, data: string }
```

#### 任务管理接口
```typescript
// 获取任务列表
GET /api/tasks
Query: { page?: number, size?: number }
Response: { code: number, message: string, data: Task[] }

// 创建任务
POST /api/tasks
Request: CreateTaskRequest
Response: { code: number, message: string, data: Task }

// 获取任务详情
GET /api/tasks/:id
Response: { code: number, message: string, data: Task }

// 提交任务
POST /api/tasks/:id/submit
Request: SubmitTaskRequest
Response: { code: number, message: string, data: string }

// 关闭任务
POST /api/tasks/:id/close
Response: { code: number, message: string, data: string }
```

#### 积分管理接口
```typescript
// 获取积分余额
GET /api/points/balance
Response: { code: number, message: string, data: number }

// 获取积分历史
GET /api/points/history
Query: { page?: number, size?: number }
Response: { code: number, message: string, data: PointTransaction[] }
```

#### AI对话接口（Mock实现）
```typescript
// 发送消息并获取AI回复
POST /api/chat/message
Request: { message: string, sessionId?: string }
Response: { code: number, message: string, data: { reply: string, sessionId: string } }

// 获取对话历史
GET /api/chat/history/:sessionId
Response: { code: number, message: string, data: ChatMessage[] }

// 创建新对话会话
POST /api/chat/session
Response: { code: number, message: string, data: { sessionId: string } }

// 获取用户的所有对话会话
GET /api/chat/sessions
Response: { code: number, message: string, data: ChatSession[] }
```

## 数据模型

### 用户相关模型
```typescript
interface User {
  id: number
  username: string
  nickname: string
  email: string
  avatarUrl?: string
  role: string
  points: number
  createdAt: string
  updatedAt: string
}

interface LoginResponse {
  token: string
  userId: number
  username: string
  nickname: string
  email: string
  avatarUrl?: string
  role: string
  points: number
}

interface UpdateProfileRequest {
  username?: string
  nickname?: string
  email?: string
  emailVerificationCode?: string
}
```

### 任务相关模型
```typescript
interface Task {
  id: number
  title: string
  description: string
  type: string
  status: 'AVAILABLE' | 'ASSIGNED' | 'SUBMITTED' | 'COMPLETED' | 'CLOSED'
  reward: number
  requirements?: string
  assignedUserId?: number
  createdAt: string
  updatedAt: string
  dueDate?: string
}

interface CreateTaskRequest {
  title: string
  description: string
  points: number  // 任务奖励积分
}

interface SubmitTaskRequest {
  submissionContent: string
  attachments?: string[]
}
```

### 积分相关模型
```typescript
interface PointTransaction {
  id: number
  userId: number
  amount: number
  type: 'TASK_REWARD' | 'REDEMPTION' | 'ADJUSTMENT'
  description: string
  referenceId?: number
  createdAt: string
}

interface PointBalance {
  userId: number
  balance: number
  totalEarned: number
  totalSpent: number
}
```

### AI对话相关模型
```typescript
interface ChatMessage {
  id: string
  sessionId: string
  content: string
  role: 'user' | 'assistant'
  timestamp: string
  isTyping?: boolean
}

interface ChatSession {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
  lastMessage?: string
}

interface ChatRequest {
  message: string
  sessionId?: string
}

interface ChatResponse {
  reply: string
  sessionId: string
}
```

### API响应模型
```typescript
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
```

## 错误处理

### 错误处理策略
1. **API错误处理**: 统一的错误拦截器，处理HTTP状态码和业务错误码
2. **表单验证错误**: 使用Zod进行客户端验证，显示实时错误提示
3. **认证错误**: 自动重定向到登录页面，清除无效token
4. **网络错误**: 显示重试机制和离线提示
5. **全局错误边界**: 捕获未处理的React错误

### 错误类型定义
```typescript
interface ApiError {
  code: number
  message: string
  details?: any
}

interface ValidationError {
  field: string
  message: string
}
```

## 测试策略

### 测试层级
1. **单元测试**: 使用Jest + React Testing Library测试组件和工具函数
2. **集成测试**: 测试API调用和数据流
3. **端到端测试**: 使用Playwright测试关键用户流程
4. **可访问性测试**: 使用axe-core确保WCAG合规

### 测试覆盖范围
- 所有表单组件的验证逻辑
- API客户端的错误处理
- 认证流程的完整性
- 任务CRUD操作
- 响应式布局在不同设备上的表现

## 性能优化

### 优化策略
1. **代码分割**: 使用Next.js动态导入和路由级别的代码分割
2. **图片优化**: 使用Next.js Image组件进行自动优化
3. **缓存策略**: 
   - API响应缓存（SWR或React Query）
   - 静态资源缓存
   - 页面级别的ISR（增量静态再生）
4. **懒加载**: 非关键组件和路由的懒加载
5. **Bundle优化**: 使用webpack-bundle-analyzer分析和优化包大小

### 监控指标
- Core Web Vitals (LCP, FID, CLS)
- 页面加载时间
- API响应时间
- 错误率监控

## 安全考虑

### 安全措施
1. **认证安全**: 
   - JWT token存储在HTTP-only cookies中
   - 实现token刷新机制
   - 密码强度验证
2. **数据验证**: 
   - 客户端和服务端双重验证
   - XSS防护（React默认转义）
   - CSRF保护
3. **API安全**: 
   - 请求频率限制
   - 输入sanitization
   - HTTPS强制使用
4. **权限控制**: 
   - 基于角色的访问控制
   - 路由级别的权限验证

## 部署和运维

### 部署策略
1. **构建优化**: 生产环境构建优化和压缩
2. **环境配置**: 开发、测试、生产环境的配置管理
3. **CI/CD**: 自动化测试、构建和部署流程
4. **监控**: 应用性能监控和错误追踪

### 环境变量
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:2025
NEXT_PUBLIC_APP_NAME=RWA Hub
JWT_SECRET=your-jwt-secret
DATABASE_URL=your-database-url
```