# Coze SDK RESTful API 文档

> 版本: 1.0.0  
> 基于 Coze SDK 的 HTTP API 服务，提供智能体对话、文件管理等功能

## 📋 目录

- [API 概述](#api-概述)
- [服务配置](#服务配置)
- [认证机制](#认证机制)
- [通用响应格式](#通用响应格式)
- [错误代码](#错误代码)
- [API 端点](#api-端点)
  - [健康检查](#健康检查)
  - [聊天对话](#聊天对话)
  - [文件管理](#文件管理)
  - [用户管理](#用户管理)
  - [工作空间管理](#工作空间管理)
  - [系统配置](#系统配置)
- [前端集成示例](#前端集成示例)
- [SDK 集成](#sdk-集成)

---

## 🌟 API 概述

本API服务基于 FastAPI 框架构建，遵循 RESTful 设计原则，为前端应用提供与 Coze 智能体交互的能力。

### 主要特性

- ✅ **RESTful 设计**: 符合REST架构风格
- ✅ **流式聊天**: 支持实时聊天体验
- ✅ **文件上传**: 支持多种文件格式
- ✅ **CORS 支持**: 支持跨域请求
- ✅ **自动文档**: 集成 Swagger/OpenAPI
- ✅ **错误处理**: 统一的错误响应格式
- ✅ **日志记录**: 完整的请求日志
- ✅ **限流保护**: API 请求频率限制

---

## 🔧 服务配置

### 默认配置

```
服务地址: http://0.0.0.0:2026
API文档: http://服务器IP:2026/docs
健康检查: http://服务器IP:2026/health
```

### 环境变量

| 变量名 | 描述 | 默认值 | 必需 |
|--------|------|--------|------|
| `COZE_API_TOKEN` | Coze API 访问令牌 | - | ✅ |
| `COZE_API_BASE` | Coze API 基础URL | `https://api.coze.cn` | ❌ |
| `COZE_BOT_ID` | 默认智能体ID | - | ❌ |
| `HOST` | 服务主机地址 | `0.0.0.0` | ❌ |
| `PORT` | 服务端口 | `2026` | ❌ |
| `ENABLE_RATE_LIMIT` | 启用限流 | `true` | ❌ |
| `RATE_LIMIT_REQUESTS` | 限流请求数 | `100` | ❌ |
| `RATE_LIMIT_WINDOW` | 限流时间窗口(秒) | `60` | ❌ |

---

## 🔐 认证机制

本API服务使用服务器端的 Coze API Token 进行认证，前端无需传递认证信息。

```javascript
// 前端请求示例 - 无需认证头
fetch('http://服务器IP:2026/api/v1/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({...})
});
```

---

## 📤 通用响应格式

所有API端点都遵循统一的响应格式：

### 成功响应
```json
{
    "success": true,
    "message": "操作成功描述",
    "data": {
        // 具体数据内容
    }
}
```

### 错误响应
```json
{
    "success": false,
    "message": "错误描述",
    "data": null
}
```

---

## ❌ 错误代码

| HTTP 状态码 | 含义 | 说明 |
|-------------|------|------|
| 200 | 成功 | 请求处理成功 |
| 400 | 请求错误 | 请求参数无效 |
| 404 | 未找到 | 请求的资源不存在 |
| 413 | 内容过大 | 文件大小超过限制 |
| 429 | 请求过多 | 触发限流限制 |
| 500 | 服务器错误 | 内部服务器错误 |
| 503 | 服务不可用 | 服务暂时不可用 |

---

## 🔌 API 端点

### 健康检查

#### 获取服务状态
```http
GET /health
```

**响应示例:**
```json
{
    "status": "healthy",
    "message": "Service is healthy and CozeClient is working",
    "timestamp": "2025-01-01T12:00:00.000Z",
    "version": "1.0.0"
}
```

#### 获取根路径状态
```http
GET /
```

**响应示例:**
```json
{
    "status": "running",
    "message": "Coze SDK API Service is running",
    "timestamp": "2025-01-01T12:00:00.000Z",
    "version": "1.0.0"
}
```

---

### 聊天对话

#### 与智能体对话
```http
POST /api/v1/chat
```

**请求头:**
```
Content-Type: application/json
```

**请求参数:**
```json
{
    "bot_id": "7537334510896185359",  // 可选，默认使用环境变量
    "user_id": "user123",              // 必需，用户唯一标识
    "messages": [                      // 必需，消息列表
        {
            "role": "user",            // 消息角色：user, assistant, system
            "content": "你好，请介绍一下自己",
            "content_type": "text"     // 内容类型，默认text
        }
    ],
    "conversation_id": "conv_123",     // 可选，用于多轮对话
    "stream": false                    // 可选，是否启用流式响应
}
```

**成功响应 (非流式):**
```json
{
    "success": true,
    "message": "Chat completed successfully",
    "data": {
        "content": "你好！我是一个基于Coze平台的智能助手...",
        "timestamp": "2025-01-01T12:00:00.000Z",
        "bot_id": "7537334510896185359",
        "user_id": "user123"
    },
    "conversation_id": "conv_456"
}
```

**流式响应 (stream: true):**
返回 `text/event-stream` 格式的数据：

```
data: {"type": "message_delta", "content": "你好", "timestamp": "2025-01-01T12:00:00.000Z"}

data: {"type": "message_delta", "content": "！我是", "timestamp": "2025-01-01T12:00:01.000Z"}

data: {"type": "chat_completed", "conversation_id": "conv_456", "timestamp": "2025-01-01T12:00:02.000Z"}

data: {"type": "end"}
```

**错误响应示例:**
```json
{
    "success": false,
    "message": "bot_id is required either in request or environment variable COZE_BOT_ID",
    "data": null
}
```

---

### 文件管理

#### 上传文件
```http
POST /api/v1/upload
```

**请求头:**
```
Content-Type: multipart/form-data
```

**请求参数:**
- `file`: 文件对象 (必需)
- `description`: 文件描述 (可选)

**cURL 示例:**
```bash
curl -X POST "http://服务器IP:2026/api/v1/upload" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@/path/to/document.pdf" \
     -F "description=这是一个PDF文档"
```

**成功响应:**
```json
{
    "success": true,
    "message": "File uploaded successfully",
    "file_id": "file_123456789",
    "file_url": "https://example.com/files/file_123456789"
}
```

**错误响应示例:**
```json
{
    "success": false,
    "message": "File too large. Maximum size is 10MB",
    "file_id": null,
    "file_url": null
}
```

---

### 用户管理

#### 获取用户信息
```http
GET /api/v1/user/info
```

**查询参数:**
- `user_id`: 用户ID (可选，当前版本会被忽略)

**成功响应:**
```json
{
    "success": true,
    "message": "User info retrieved successfully",
    "data": {
        "user_info": "User(id='123', name='用户名')",
        "response_logid": "log_123456"
    }
}
```

---

### 工作空间管理

#### 获取工作空间列表
```http
GET /api/v1/workspaces
```

**成功响应:**
```json
{
    "success": true,
    "message": "Workspaces retrieved successfully",
    "data": [
        {
            "id": "workspace_123",
            "name": "我的工作空间",
            "icon_url": "https://example.com/icon.png",
            "role_type": "admin"
        }
    ]
}
```

---

### 系统配置

#### 获取系统配置
```http
GET /api/v1/config
```

**成功响应:**
```json
{
    "success": true,
    "message": "Configuration retrieved successfully",
    "data": {
        "api_base": "https://api.coze.cn",
        "default_bot_id": "7537334510896185359",
        "default_user_id": null,
        "log_level": "INFO",
        "environment": "production",
        "version": "1.0.0",
        "features": {
            "chat": true,
            "file_upload": true,
            "user_management": true,
            "workspace_management": true
        }
    }
}
```

#### 测试连接
```http
GET /api/v1/test/connection
```

**成功响应:**
```json
{
    "success": true,
    "message": "Connection test successful",
    "data": {
        "connected": true,
        "user_id": "user_123",
        "timestamp": "2025-01-01T12:00:00.000Z"
    }
}
```

---

## 💻 前端集成示例

### JavaScript/TypeScript

#### 基础聊天功能
```javascript
class CozeAPI {
    constructor(baseURL = 'http://服务器IP:2026') {
        this.baseURL = baseURL;
    }

    // 发送聊天消息
    async chat(botId, userId, messages, options = {}) {
        const response = await fetch(`${this.baseURL}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bot_id: botId,
                user_id: userId,
                messages: messages,
                conversation_id: options.conversationId,
                stream: options.stream || false
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // 流式聊天
    async chatStream(botId, userId, messages, onMessage, options = {}) {
        const response = await fetch(`${this.baseURL}/api/v1/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                bot_id: botId,
                user_id: userId,
                messages: messages,
                conversation_id: options.conversationId,
                stream: true
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        try {
                            const data = JSON.parse(line.slice(6));
                            onMessage(data);
                            
                            if (data.type === 'end') {
                                return;
                            }
                        } catch (e) {
                            console.error('Parse error:', e);
                        }
                    }
                }
            }
        } finally {
            reader.releaseLock();
        }
    }

    // 文件上传
    async uploadFile(file, description) {
        const formData = new FormData();
        formData.append('file', file);
        if (description) {
            formData.append('description', description);
        }

        const response = await fetch(`${this.baseURL}/api/v1/upload`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    // 健康检查
    async healthCheck() {
        const response = await fetch(`${this.baseURL}/health`);
        return await response.json();
    }

    // 获取用户信息
    async getUserInfo() {
        const response = await fetch(`${this.baseURL}/api/v1/user/info`);
        return await response.json();
    }

    // 获取工作空间列表
    async getWorkspaces() {
        const response = await fetch(`${this.baseURL}/api/v1/workspaces`);
        return await response.json();
    }
}

// 使用示例
const api = new CozeAPI();

// 普通聊天
async function sendMessage() {
    try {
        const response = await api.chat(
            '7537334510896185359', 
            'user123',
            [{ role: 'user', content: '你好' }]
        );
        console.log('回复:', response.data.content);
    } catch (error) {
        console.error('聊天错误:', error);
    }
}

// 流式聊天
async function streamChat() {
    try {
        await api.chatStream(
            '7537334510896185359',
            'user123',
            [{ role: 'user', content: '请详细介绍一下自己' }],
            (data) => {
                if (data.type === 'message_delta') {
                    document.getElementById('chat').innerHTML += data.content;
                } else if (data.type === 'chat_completed') {
                    console.log('对话完成，ID:', data.conversation_id);
                }
            }
        );
    } catch (error) {
        console.error('流式聊天错误:', error);
    }
}

// 文件上传
async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    
    if (file) {
        try {
            const response = await api.uploadFile(file, '用户上传的文档');
            console.log('文件上传成功:', response.file_id);
        } catch (error) {
            console.error('文件上传错误:', error);
        }
    }
}
```

### React 集成示例
```jsx
import React, { useState, useCallback } from 'react';

const CozeChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    
    const api = new CozeAPI();

    const sendMessage = useCallback(async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            let assistantMessage = { role: 'assistant', content: '' };
            setMessages(prev => [...prev, assistantMessage]);

            await api.chatStream(
                '7537334510896185359',
                'user123',
                [...messages, userMessage],
                (data) => {
                    if (data.type === 'message_delta') {
                        setMessages(prev => {
                            const newMessages = [...prev];
                            newMessages[newMessages.length - 1].content += data.content;
                            return newMessages;
                        });
                    } else if (data.type === 'chat_completed') {
                        setConversationId(data.conversation_id);
                    }
                },
                { conversationId }
            );
        } catch (error) {
            console.error('发送消息失败:', error);
        } finally {
            setLoading(false);
        }
    }, [input, messages, conversationId]);

    return (
        <div className="chat-container">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <strong>{msg.role}:</strong> {msg.content}
                    </div>
                ))}
                {loading && <div className="loading">正在思考中...</div>}
            </div>
            
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="输入消息..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    发送
                </button>
            </div>
        </div>
    );
};

export default CozeChat;
```

### Vue.js 集成示例
```vue
<template>
  <div class="coze-chat">
    <div class="messages" ref="messagesContainer">
      <div 
        v-for="(message, index) in messages" 
        :key="index" 
        :class="['message', message.role]"
      >
        <strong>{{ message.role }}:</strong> {{ message.content }}
      </div>
      <div v-if="loading" class="loading">正在思考中...</div>
    </div>
    
    <div class="input-area">
      <input
        v-model="input"
        @keyup.enter="sendMessage"
        placeholder="输入消息..."
        :disabled="loading"
        type="text"
      />
      <button @click="sendMessage" :disabled="loading">发送</button>
    </div>
  </div>
</template>

<script>
import { CozeAPI } from './coze-api.js';

export default {
  name: 'CozeChat',
  data() {
    return {
      messages: [],
      input: '',
      loading: false,
      conversationId: null,
      api: new CozeAPI()
    };
  },
  methods: {
    async sendMessage() {
      if (!this.input.trim()) return;

      const userMessage = { role: 'user', content: this.input };
      this.messages.push(userMessage);
      this.input = '';
      this.loading = true;

      try {
        const assistantMessage = { role: 'assistant', content: '' };
        this.messages.push(assistantMessage);

        await this.api.chatStream(
          '7537334510896185359',
          'user123',
          this.messages.filter(m => m !== assistantMessage),
          (data) => {
            if (data.type === 'message_delta') {
              const lastIndex = this.messages.length - 1;
              this.messages[lastIndex].content += data.content;
            } else if (data.type === 'chat_completed') {
              this.conversationId = data.conversation_id;
            }
          },
          { conversationId: this.conversationId }
        );
      } catch (error) {
        console.error('发送消息失败:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
```

---

## 📱 SDK 集成

### 使用 Axios
```javascript
import axios from 'axios';

const cozeAPI = axios.create({
    baseURL: 'http://服务器IP:2026/api/v1',
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
cozeAPI.interceptors.request.use(
    config => {
        console.log('发送请求:', config);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
cozeAPI.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        console.error('请求错误:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// 使用示例
async function chatWithBot(message) {
    try {
        const response = await cozeAPI.post('/chat', {
            bot_id: '7537334510896185359',
            user_id: 'user123',
            messages: [{ role: 'user', content: message }]
        });
        return response.data.content;
    } catch (error) {
        throw new Error('聊天失败: ' + error.message);
    }
}
```

---

## 📋 测试工具

### Postman 集合

创建 Postman 集合来测试所有 API：

```json
{
    "info": {
        "name": "Coze SDK API",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
        {
            "name": "健康检查",
            "request": {
                "method": "GET",
                "header": [],
                "url": {
                    "raw": "http://服务器IP:2026/health",
                    "host": ["服务器IP"],
                    "port": "2026",
                    "path": ["health"]
                }
            }
        },
        {
            "name": "普通聊天",
            "request": {
                "method": "POST",
                "header": [
                    {
                        "key": "Content-Type",
                        "value": "application/json"
                    }
                ],
                "body": {
                    "mode": "raw",
                    "raw": "{\n    \"bot_id\": \"7537334510896185359\",\n    \"user_id\": \"test_user\",\n    \"messages\": [\n        {\n            \"role\": \"user\",\n            \"content\": \"你好\",\n            \"content_type\": \"text\"\n        }\n    ],\n    \"stream\": false\n}"
                },
                "url": {
                    "raw": "http://服务器IP:2026/api/v1/chat",
                    "host": ["服务器IP"],
                    "port": "2026",
                    "path": ["api", "v1", "chat"]
                }
            }
        }
    ]
}
```

### cURL 测试命令

```bash
# 健康检查
curl -X GET "http://服务器IP:2026/health"

# 普通聊天
curl -X POST "http://服务器IP:2026/api/v1/chat" \
     -H "Content-Type: application/json" \
     -d '{
         "bot_id": "7537334510896185359",
         "user_id": "test_user",
         "messages": [
             {
                 "role": "user",
                 "content": "你好，请介绍一下自己"
             }
         ]
     }'

# 文件上传
curl -X POST "http://服务器IP:2026/api/v1/upload" \
     -F "file=@test.txt" \
     -F "description=测试文件"

# 获取配置
curl -X GET "http://服务器IP:2026/api/v1/config"
```

---

## 🔍 故障排除

### 常见问题

1. **连接失败**
   ```
   解决方案: 检查服务是否启动，端口是否正确
   ```

2. **认证错误**
   ```
   解决方案: 检查 COZE_API_TOKEN 环境变量是否设置
   ```

3. **文件上传失败**
   ```
   解决方案: 检查文件大小是否超过10MB限制
   ```

4. **流式响应中断**
   ```
   解决方案: 检查网络连接稳定性，实现重连机制
   ```

### 调试工具

1. **查看API文档**: `http://服务器IP:2026/docs`
2. **查看服务日志**: `./run.sh logs`
3. **检查服务状态**: `./run.sh status`

---

## 📞 技术支持

如有问题或建议，请：

1. 查看服务器日志文件
2. 检查环境变量配置
3. 验证网络连接
4. 参考本文档的故障排除部分

---

**更新时间**: 2025-01-01  
**文档版本**: 1.0.0
