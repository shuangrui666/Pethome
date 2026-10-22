# 🏠 PetHome - 宠物家园

<div align="center">

![PetHome Banner](https://img.shields.io/badge/PetHome-宠物家园 -FF6B9D?style=for-the-badge&logo=heart)

**一站式宠物服务平台 · 连接爱宠人士 · 关爱流浪动物**

[![License](https://img.shields.io/badge/license-BSD-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.0-green?logo=mongodb)](https://www.mongodb.com/)

[查看在线演示](https://dashing-sopapillas-03316d.netlify.app) | [报告 Bug](https://github.com/shuangrui666/Pethome/issues) | [贡献代码](#贡献指南)

</div>

---

## 📖 项目简介

**PetHome（宠物家园）** 是一款专为爱宠人士打造的一站式服务平台，致力于解决养宠过程中的各种痛点问题。无论是寻找领养、宠物医疗、流浪救助，还是分享养宠经验，PetHome 都能为您提供全方位的服务。

### ✨ 核心功能

| 🏠 宠物领养 | 🏥 宠物医院 | 🆘 流浪救助 | 💬 社区交流 |
|:---:|:---:|:---:|:---:|
| 寻找心仪宠物 | 附近医院查询 | 流浪动物救助 | 养宠经验分享 |
| 领养申请流程 | 医生在线咨询 | 救助点管理 | 宠物社交互动 |

### 🎯 项目特色

- 🐕 **全面的宠物服务** - 整合领养、医疗、救助、社交四大核心功能
- 📍 **LBS 位置服务** - 基于地理位置推荐附近的宠物医院、救助点
- 💬 **实时消息推送** - 使用 Socket.IO 实现即时通讯功能
- 🔐 **安全可靠** - JWT 认证 + 数据加密 + 输入验证
- 📱 **响应式设计** - 适配 PC 端和移动端，随时随地使用
- 🎨 **温馨界面** - 可爱温馨的设计风格，提升用户体验

---

## 🖼️ 项目截图

<div align="center">

![首页]<img width="2206" height="1360" alt="image" src="https://github.com/user-attachments/assets/20361164-175c-41ff-bbaa-67b819c0095f" />


![功能模块]
申请领养页面<img width="2208" height="1394" alt="image" src="https://github.com/user-attachments/assets/882ae3d7-2e17-4883-9875-25efd349ba59" />

发布走失宠物信息<img width="2358" height="1582" alt="image" src="https://github.com/user-attachments/assets/7fe9ed4c-e20f-4181-8eec-da757b5a9d4c" />

帮助寻回宠物<img width="2226" height="1426" alt="image" src="https://github.com/user-attachments/assets/61d029b7-4e84-48b8-916c-8cf6fd3d9efe" />

防止宠物走丢<img width="2256" height="1404" alt="image" src="https://github.com/user-attachments/assets/f0cb40a0-5bdb-4a17-b16f-9e794fae9cd8" />

宠物幼儿园<img width="2268" height="1392" alt="屏幕截图 2026-10-22 193935" src="https://github.com/user-attachments/assets/46cb4001-e025-4380-8f0a-8985c4e651a1" /><img width="2272" height="1408" alt="屏幕截图 2026-10-22 194523" src="https://github.com/user-attachments/assets/14a11da8-7b6c-43ce-b8e0-6c30478014cd" />





</div>

---

## 🛠️ 技术架构

### 前端技术栈

```
├───────────────────────────────────────────────
│                   前端 (Next.js 14)                      │
├───────────────────────────────────────────────────────────┤
│ • React 18          • TypeScript 5                      │
│ • Tailwind CSS      • Radix UI                          │
│ • Axios             • Socket.IO Client                  │
│ • React Bootstrap   • Lucide Icons                      │
└───────────────────────────────────────────────────────────┘
```

### 后端技术栈

```
├───────────────────────────────────────────────
│                  后端 (Node.js + Express)                │
├───────────────────────────────────────────────────────────┤
│ • TypeScript 5      • Express 4                         │
│ • MongoDB + Mongoose 8  • Socket.IO                     │
│ • JWT 认证          • bcrypt 加密                       │
│ • Helmet 安全       • CORS 跨域                         │
│ • Multer 文件上传   • Express Validator                 │
└───────────────────────────────────────────────────────────┘
```

### 系统架构图

```
├──────────────┐        ┌──────────────┐
│  用户端      │ HTTPS  │  Netlify     │
│  (浏览器)    │◄──────►│  (CDN)       │
└──────────────┘        └──────────────┘
       │                        │
       └────────┬───────────────┘
                ▼
       ┌────────────────┐
       │ Next.js 构建   │
       │ 服务端渲染     │
       └────────────────┘
                │
                ▼
       ┌────────────────┐
       │ RESTful API    │
       └────────────────┘
                │
                ▼
       ┌────────────────┐
       │ MongoDB 数据库  │
       │ (用户/宠物/医院)│
       └────────────────┘
```

---

## 📂 项目目录

```
Pethome/
├── client/                 # 前端 Next.js 项目
│   ├── app/               # Next.js 14 App Router 路由
│   │   ├── page.tsx       # 首页
│   │   ├── adopt/         # 宠物领养页面
│   │   ├── hospitals/     # 宠物医院页面
│   │   ├── lost-found/    # 走失/寻回页面
│   │   ├── community/     # 社区交流页面
│   │   └── ...
│   ├── components/        # React 组件
│   ├── api/               # API 客户端
│   ├── public/            # 静态资源
│   └── netlify.toml       # Netlify 配置
├── server/                # 后端 Node.js 项目
│   ├── src/
│   │   ├── controllers/   # 业务逻辑控制器
│   │   │   ├── authController.ts
│   │   │   ├── petController.ts
│   │   │   ├── hospitalController.ts
│   │   │   └── ...
│   │   ├── models/        # MongoDB 数据模型
│   │   │   ├── User.ts
│   │   │   ├── Pet.ts
│   │   │   ├── Hospital.ts
│   │   │   └── ...
│   │   ├── routes/        # API 路由
│   │   ├── middleware/    # 中间件
│   │   │   ├── auth.ts    # 认证中间件
│   │   │   ├── upload.ts  # 文件上传中间件
│   │   │   └── validation.ts
│   │   └── index.ts       # 入口文件
│   ├── scripts/           # 数据种子脚本
│   ├── package.json
│   └── tsconfig.json
├── README.md              # 项目说明文档
└── LICENSE               # BSD 许可证
```

---

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- MongoDB >= 6.0
- npm 或 yarn

### 环境配置

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/shuangrui666/Pethome.git
cd Pethome
```

#### 2️⃣ 后端配置

```bash
cd server

# 安装依赖
npm install

# 创建 .env 文件
cat > .env << EOF
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pethome
JWT_SECRET=your-secret-key-here
NODE_ENV=development
EOF

# 启动开发服务器
npm run dev

# 初始化测试数据
npm run seed:all
```

#### 3️⃣ 前端配置

```bash
cd ../client

# 安装依赖
npm install

# 创建 .env.local 文件
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
EOF

# 启动开发服务器
npm run dev
```

#### 4️⃣ 访问应用

打开浏览器访问：http://localhost:3000

---

## 📦 部署说明

### Netlify 部署（推荐）

本项目已配置好 `netlify.toml`，支持一键部署：

1. 将代码推送到 GitHub
2. 在 Netlify 连接 GitHub 仓库
3. 配置环境变量
   - `NEXT_PUBLIC_API_URL` - 后端 API 地址
   - `NEXT_PUBLIC_SOCKET_URL` - WebSocket 地址
4. 自动构建并上线

**当前部署状态：**
- ✅ 已部署到 Netlify
- 🌐 访问地址：https://dashing-sopapillas-03316d.netlify.app

---

## 🤝 贡献指南

我们欢迎所有的贡献！无论是代码、文档、设计还是反馈，都非常感谢。

### 贡献流程

1. **Fork** 本项目到你的 GitHub 账号
2. **Clone** 项目到本地
3. 创建你的 **Feature Branch**
4. **Commit** 你的更改
5. **Push** 到分支
6. 开启一个 **Pull Request**

### 贡献类型

- 🐛 **Bug 修复** - 修复代码中的问题
- ✨ **新功能** - 添加新的功能特性
- 📝 **文档改进** - 完善文档说明
- 🎨 **UI 优化** - 改进用户界面体验
- ⚡ **性能优化** - 提升应用性能

### 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 代码规范
- 添加必要的注释
- 提交信息清晰明确

---

## 📚 API 文档

### 认证接口

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/auth/register` | 用户注册 |
| POST | `/api/auth/login` | 用户登录 |
| GET | `/api/auth/me` | 获取当前用户信息 |

### 宠物接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/pets` | 获取宠物列表 |
| POST | `/api/pets` | 创建宠物信息 |
| GET | `/api/pets/:id` | 获取宠物详情 |
| PUT | `/api/pets/:id` | 更新宠物信息 |
| DELETE | `/api/pets/:id` | 删除宠物信息 |

### 医院接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/hospitals` | 获取医院列表 |
| GET | `/api/hospitals/nearby` | 获取附近医院 |
| GET | `/api/hospitals/:id` | 获取医院详情 |

*(完整 API 文档请参考后端代码)*

---

## 🔒 安全说明

本项目已实施以下安全措施：
- 🔐 **JWT Token 认证** - 安全的用户认证机制
- 🔐 **密码加密** - 使用 bcrypt 加密存储密码
- 🔐 **输入验证** - 使用 express-validator 验证所有输入
- 🔐 **CORS 配置** - 限制跨域请求
- 🔐 **Helmet 安全头** - 设置 HTTP 安全头
- 🔐 **压缩中间件** - 启用 gzip 压缩

---

## 📝 更新日志

### v0.1.0 (2026-10-22)

**🎉 首次发布**

- ✨ 实现宠物领养功能
- ✨ 实现宠物医院查询
- ✨ 实现流浪救助模块
- ✨ 实现社区交流功能
- ✨ 集成实时消息推送
- ✨ 完成用户认证系统
- ✨ 响应式设计适配

---

## 🙏 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/) - React 框架
- [Express](https://expressjs.com/) - Node.js 框架
- [MongoDB](https://www.mongodb.com/) - 数据库
- [Socket.IO](https://socket.io/) - 实时通信
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [React Bootstrap](https://react-bootstrap.github.io/) - UI 组件库

---

## 📄 许可证

本项目采用 [BSD 许可证](LICENSE)

---

## 📧 联系方式

- 作者：shuangrui666
- GitHub: [@shuangrui666](https://github.com/shuangrui666)
- 项目仓库：[https://github.com/shuangrui666/Pethome](https://github.com/shuangrui666/Pethome)

---

<div align="center">

** Made with ❤️ for Pet Lovers **

如果这个项目对你有帮助，请给一个 ⭐ **Star** 支持！

[返回顶部](#pethome---宠物家园)

</div>
