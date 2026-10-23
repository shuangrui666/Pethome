# PetHome

<div align="center">

![PetHome 封面](/public/cover.png)

<p>
  <a href="https://dashing-sopapillas-03316d.netlify.app">
    <img src="https://img.shields.io/badge/在线演示-点击访问-0A66C2?style=for-the-badge&logoColor=white" alt="在线演示">
  </a>
  <a href="https://github.com/shuangrui666/Pethome/blob/main/API.md">
    <img src="https://img.shields.io/badge/API 文档-查看说明-0288D1?style=for-the-badge&logoColor=white" alt="API 文档">
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js">
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/MongoDB-8.0-green?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/license-BSD-blue?style=for-the-badge" alt="License">
</p>

<p>
  <a href="https://dashing-sopapillas-03316d.netlify.app">在线演示</a> •
  <a href="https://github.com/shuangrui666/Pethome/blob/main/API.md">API 文档</a> •
  <a href="#项目简介">项目简介</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#贡献指南">贡献指南</a>
</p>

</div>

---

## 项目简介

**PetHome（宠物家园）** 是一款专为爱宠人士打造的一站式服务平台，致力于解决养宠过程中的各种痛点问题。无论是寻找领养、宠物医疗、流浪救助，还是分享养宠经验，PetHome 都能为您提供全方位的服务。

### 核心功能

| 功能 | 描述 |
|------|------|
| 宠物领养 | 寻找心仪宠物、领养申请流程 |
| 宠物医院 | 附近医院查询、医生在线咨询 |
| 流浪救助 | 流浪动物救助、救助点管理 |
| 社区交流 | 养宠经验分享、宠物社交互动 |

### 项目特色

- **全面的宠物服务** - 整合领养、医疗、救助、社交四大核心功能
- **LBS 位置服务** - 基于地理位置推荐附近的宠物医院、救助点
- **实时消息推送** - 使用 Socket.IO 实现即时通讯功能
- **安全可靠** - JWT 认证 + 数据加密 + 输入验证

---

## 项目截图

<div align="center">

<table>
<tr>
<td align="center">
<h4>🏠 首页</h4>
<p>精美首页展示，功能入口一目了然，快速导航至各个服务模块</p>
<img src="https://github.com/user-attachments/assets/20361164-175c-41ff-bbaa-67b819c0095f" width="280" alt="首页"/>
</td>
<td align="center">
<h4>📝 申请领养</h4>
<p>在线提交领养申请，填写基本信息，等待审核反馈</p>
<img src="https://github.com/user-attachments/assets/882ae3d7-2e17-4883-9875-25efd349ba59" width="280" alt="申请领养"/>
</td>
</tr>

<tr>
<td align="center">
<h4>📢 走失宠物发布</h4>
<p>发布走失宠物信息，上传照片和联系方式，扩大寻找范围</p>
<img src="https://github.com/user-attachments/assets/7fe9ed4c-e20f-4181-8eec-da757b5a9d4c" width="280" alt="走失宠物发布"/>
</td>
<td align="center">
<h4>🔍 走失宠物查询</h4>
<p>查询附近走失宠物信息，提供线索帮助寻找</p>
<img src="https://github.com/user-attachments/assets/61d029b7-4e84-48b8-916c-8cf6fd3d9efe" width="280" alt="走失宠物查询"/>
</td>
</tr>

<tr>
<td align="center">
<h4>⏰ 防走丢提醒</h4>
<p>设置宠物信息提醒，走失时及时接收通知</p>
<img src="https://github.com/user-attachments/assets/f0cb40a0-5bdb-4a17-b16f-9e794fae9cd8" width="280" alt="防走丢提醒"/>
</td>
<td align="center">
<h4>🎓 宠物幼儿园</h4>
<p>宠物寄养服务，专业看护，让宠物安心度假</p>
<img src="https://github.com/user-attachments/assets/46cb4001-e025-4380-8f0a-8985c4e651a1" width="280" alt="宠物幼儿园"/>
</td>
</tr>

<tr>
<td align="center">
<h4>🛍️ 宠物店铺</h4>
<p>在线购物平台，宠物用品一站式采购</p>
<img src="https://github.com/user-attachments/assets/7d62b5f0-c3e5-4331-9045-ada979e3de89" width="280" alt="宠物店铺"/>
</td>
<td align="center">
<h4>🤝 同城约伴</h4>
<p>约附近宠友一起遛弯，宠物社交新方式</p>
<img src="https://github.com/user-attachments/assets/dabc86cf-7f7a-4842-a651-a63ef1e5a154" width="280" alt="同城约伴"/>
</td>
</tr>

<tr>
<td align="center">
<h4>💊 宠物医药</h4>
<p>宠物药品查询，在线预约兽医咨询服务</p>
<img src="https://github.com/user-attachments/assets/9e51e2a1-1adc-4c91-8a51-caab60b942a7" width="280" alt="宠物医药"/>
</td>
<td align="center">
<h4>❤️ 宠物资助</h4>
<p>为流浪动物提供物资援助，传递爱心</p>
<img src="https://github.com/user-attachments/assets/d9ccafb5-3d31-479c-a0fc-e805cada435f" width="280" alt="宠物资助"/>
</td>
</tr>

<tr>
<td align="center">
<h4>🐕 训狗服务</h4>
<p>专业训狗师在线指导，解决养狗难题</p>
<img src="https://github.com/user-attachments/assets/9eece611-a2f4-42b6-8826-ab6255a6e5f4" width="280" alt="训狗服务"/>
</td>
<td align="center">
<h4>💬 养宠社区</h4>
<p>分享养宠经验，与众多宠友交流心得</p>
<img src="https://github.com/user-attachments/assets/7a43d621-c1fc-47c9-91ad-308307a97488" width="280" alt="养宠社区"/>
</td>
</tr>
</table>

</div>

---

## 技术架构

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

## 项目目录

```
Pethome/
├── client/                 # 前端 Next.js 项目
│   ├── app/               # Next.js 14 App Router 路由
│   │   ├── page.tsx       # 首页
│   │   ├── adopt/         # 宠物领养页面
│   │   ├── hospital/      # 宠物医院页面
│   │   └── community/     # 社区交流页面
│   ├── components/        # React 组件
│   ├── lib/               # 工具函数和配置
│   └── public/            # 静态资源
├── server/                 # 后端 Node.js 项目
│   ├── controllers/       # 业务逻辑
│   ├── models/            # MongoDB 模型
│   ├── routes/            # API 路由
│   ├── middleware/        # 中间件
│   └── utils/             # 工具函数
└── README.md
```

---

## 快速开始

### 环境要求

- Node.js >= 18.x
- MongoDB >= 8.x
- npm 或 yarn

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/shuangrui666/Pethome.git
cd Pethome
```

2. **安装依赖**
```bash
# 前端
cd client
npm install

# 后端
cd ../server
npm install
```

3. **配置环境变量**

在项目根目录创建 `.env` 文件：

```env
# 数据库
MONGODB_URI=mongodb://localhost:27017/pethome

# JWT
JWT_SECRET=your-secret-key-here

# 端口
PORT=5000
```

4. **启动服务**

```bash
# 后端（终端 1）
cd server
npm run dev

# 前端（终端 2）
cd client
npm run dev
```

5. **访问应用**

打开浏览器访问 `http://localhost:3000`

---

## 功能说明

### 宠物领养
- 浏览附近可领养的宠物
- 在线提交领养申请
- 领养进度追踪

### 宠物医院
- 基于 LBS 的附近医院查询
- 医生在线预约
- 病历管理和查询

### 流浪救助
- 流浪动物上报
- 救助点信息展示
- 捐赠和志愿者报名

### 社区交流
- 养宠经验分享
- 宠物照片分享
- 问答互动

---

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 贡献者名单

感谢以下贡献者的支持：

- [@shuangrui666](https://github.com/shuangrui666) - 项目创始人 & 核心开发者

欢迎成为贡献者！查看 [CONTRIBUTING.md](CONTRIBUTING.md) 了解如何参与贡献。

### 开发规范

- 遵循 [TypeScript](https://www.typescriptlang.org/) 类型规范
- 使用 [ESLint](https://eslint.org/) 和 [Prettier](https://prettier.io/) 格式化代码
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

---

## 许可证

本项目采用 [BSD-3-Clause 许可证](LICENSE) - 查看许可证文件了解详细信息

---

## 社交媒体

<p>
  <a href="https://github.com/shuangrui666/Pethome">
    <img src="https://img.shields.io/badge/GitHub-Project-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://github.com/shuangrui666">
    <img src="https://img.shields.io/badge/GitHub-@shuangrui666-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub User">
  </a>
</p>

---

## 联系方式

- 作者：shuangrui666
- Email: shuangrui666@gitee.com
- GitHub: [@shuangrui666](https://github.com/shuangrui666)
- 项目仓库: [github.com/shuangrui666/Pethome](https://github.com/shuangrui666/Pethome)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
