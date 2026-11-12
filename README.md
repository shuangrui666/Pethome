# PetHome

<div align="center">

![PetHome 封面](/public/cover.png)

<p>
  <a href="https://dashing-sopapillas-03316d.netlify.app">
    <img src="https://img.shields.io/badge/%E5%9C%A8%E7%BA%BF%E8%AF%95%E7%8E%A9-%E7%82%B9%E5%87%BB%E8%AE%BF%E9%97%AE-0A66C2?style=for-the-badge" alt="在线演示">
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


## PetHome V2.0：AI 智能化升级路线

PetHome V2.0 计划在现有宠物服务平台基础上，引入人工智能能力，重点解决真实养宠场景中的知识获取、健康信息理解、宠物与资源匹配等问题。项目采用渐进式建设方式：先完成需求与数据治理，再实现可验证的 AI 功能，最后开展效果评估和系统集成。

> **状态说明：本节描述的是 V2.0 的规划方向，不代表相关功能已经开发完成或上线。** 功能状态以后续代码、测试记录和验收结果为准。

### 1. 核心方向：AI 智能养宠知识助手（规划中）

- **自然语言养宠问答**：支持用户围绕喂养、日常护理、行为训练等问题进行自然语言提问。
- **RAG 知识检索增强**：整理可信的养宠知识资料，通过检索相关内容辅助大语言模型生成回答。
- **回答依据与来源展示**：在条件允许时展示参考资料或知识来源，降低无依据回答的风险。
- **多轮上下文对话**：结合当前会话上下文理解追问，减少用户重复描述。
- **宠物档案辅助个性化**：在用户授权并主动提供宠物种类、年龄等信息后，提供更贴合具体情况的建议。

### 2. 重点算法方向：机器学习推荐与智能匹配（规划中）

- **领养智能匹配**：综合宠物特征、领养人条件和领养需求，探索更合适的领养候选推荐。
- **救助资源匹配**：根据求助类型、位置、可用资源等信息，辅助连接求助者、救助人员和资源。
- **同城宠物约伴推荐**：结合宠物基本特征、活动偏好和距离等因素推荐潜在伙伴。
- **推荐理由说明**：向用户展示影响匹配结果的主要因素，提升推荐结果的可理解性。
- **模型实验与评估**：逐步建立数据清洗、特征工程、训练/验证、基线对比和指标评估流程；在有足够合规数据前，不宣称模型效果。

### 3. 拓展方向：AI 健康辅助（规划中）

- **健康信息整理**：帮助用户结构化记录和整理宠物的症状描述、持续时间及相关情况。
- **健康风险提示**：基于可靠知识和用户提供的信息提示需要关注的风险及可能的就医紧急程度。
- **健康知识问答**：结合知识检索提供常见健康问题的科普解释和资料依据。

**安全边界：**健康辅助功能不提供兽医诊断，不替代专业检查、治疗或兽医意见；遇到紧急或严重症状时应提示用户及时联系兽医。

### 4. 拓展方向：计算机视觉与图片辅助匹配（规划中）

- **宠物图片特征识别探索**：研究宠物类别或外观特征的图像识别能力。
- **走失宠物图片辅助匹配探索**：研究利用图片特征为走失宠物线索筛选提供辅助。
- **人工确认机制**：图片相似度只能作为线索，不直接认定两张图片中的宠物为同一只。

### 5. 建设顺序

| 阶段 | 主要工作 | 验收重点 |
|---|---|---|
| 阶段一：现状核查 | 确认正式前端入口、部署配置、API 对照关系和现有功能状态 | 有可复核的代码与部署证据 |
| 阶段二：AI 基础架构 | 明确模型服务接口、知识数据来源、隐私与安全边界 | 架构文档、数据来源记录和接口设计 |
| 阶段三：RAG 知识助手 | 建立知识整理、切分、向量化、检索和回答流程 | 检索质量测试、回答依据和错误案例记录 |
| 阶段四：健康辅助 | 在知识助手基础上增加健康信息整理与风险提示 | 安全边界、测试用例和人工复核机制 |
| 阶段五：智能匹配 | 建立匹配数据集、基线方法和机器学习实验 | 与规则基线对比，并记录评估指标 |
| 阶段六：视觉拓展与集成 | 评估宠物图片识别和走失线索辅助匹配 | 独立测试、误匹配分析和人工确认流程 |

### 6. 当前 AI 能力说明

现有代码中出现的规则式相似度计算或条件匹配，不应直接描述为已经实现机器学习模型；规则推荐也不等同于 RAG、大语言模型或计算机视觉。当前是否存在可用的 AI 服务、模型训练流程和完整业务联调，均需以实际代码和测试结果核实。

在相关功能完成开发、测试并通过验收之前，以上 V2.0 能力统一标记为**规划中**。后续应按实际进度更新状态，不提前宣传为已上线功能。

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

### 开发规范

- 遵循 [TypeScript](https://www.typescriptlang.org/) 类型规范
- 使用 [ESLint](https://eslint.org/) 和 [Prettier](https://prettier.io/) 格式化代码
- 提交信息遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范

---

## 许可证

本项目采用 [BSD 许可证](LICENSE)

---

## 联系方式

- 作者：shuangrui666
- Email: shuangrui666@gitee.com
- GitHub: [@shuangrui666](https://github.com/shuangrui666)

---

<div align="center">

**如果这个项目对你有帮助，请给一个 ⭐ Star！**

</div>
