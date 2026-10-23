# AI 智能体协作指南 - PetHome 宠物家园

> 本文档指导 AI 智能体如何理解、维护和扩展 PetHome 宠物服务平台项目。

---

## 项目概述

**PetHome（宠物家园）** 是一款基于 Next.js 14 的全栈宠物服务平台，提供领养、医疗、救助、社交等一站式宠物服务。

### 核心技术栈
- **前端**: Next.js 14.2 + TypeScript 5.0 + Tailwind CSS + React Bootstrap
- **后端**: Node.js 18+ + Express + MongoDB 8.0 + Mongoose
- **实时通信**: Socket.IO
- **认证**: JWT + bcrypt
- **部署**: Netlify（前端）+ VPS（后端）

### 项目位置
- **主仓库**: `D:\Gitee_Work\icec-2026-0171-shenshuangrui`（pethome 分支）
- **工作目录**: `E:\client`（Git worktree）
- **GitHub**: https://github.com/shuangrui666/Pethome
- **在线演示**: https://dashing-sopapillas-03316d.netlify.app

---

## 项目结构

```
Pethome/
├── client/                 # 前端 Next.js 项目
│   ├── app/               # Next.js App Router 页面
│   │   ├── page.tsx       # 首页
│   │   ├── adopt/         # 宠物领养 (5 个页面)
│   │   ├── hospital/      # 宠物医院 (4 个页面)
│   │   ├── lost/          # 走失宠物 (3 个页面)
│   │   ├── prevention/    # 防走失提醒 (2 个页面)
│   │   ├── kindergarten/  # 宠物幼儿园 (2 个页面)
│   │   ├── service/       # 上门服务 (2 个页面)
│   │   ├── shop/          # 宠物店铺 (3 个页面)
│   │   ├── meetup/        # 同城约伴 (2 个页面)
│   │   ├── community/     # 养宠社区 (3 个页面)
│   │   ├── donation/      # 宠物资助 (2 个页面)
│   │   ├── training/      # 训狗服务 (2 个页面)
│   │   ├── profile/       # 个人中心 (3 个页面)
│   │   └── auth/          # 认证页面 (2 个页面)
│   ├── components/        # React 组件 (UI、功能、布局)
│   ├── lib/               # 工具函数、API 客户端、配置
│   ├── styles/            # 全局样式
│   └── public/            # 静态资源（图片、字体）
├── server/                 # 后端 Node.js 项目
│   ├── controllers/       # 业务逻辑控制器 (13 个)
│   ├── models/            # MongoDB 数据模型 (15 个)
│   ├── routes/            # API 路由 (13 个模块)
│   ├── middleware/        # 中间件（认证、验证、错误处理）
│   ├── utils/             # 工具函数（JWT、加密、上传）
│   └── config/            # 配置文件（数据库、JWT）
├── API.md                  # RESTful API 完整文档
├── PROJECT_STRUCTURE.md    # 项目架构文档
├── AGENTS.md              # AI 智能体协作指南（本文档）
└── README.md              # 项目说明文档
```

---

## 核心功能模块

### 1. 宠物领养 (Adoption)
- **前端**: `/adopt` 路由组（5 个页面）
- **后端**: `adoptionController.js`, `adoptionRoutes.js`
- **模型**: `Adoption.js`
- **功能**: 宠物列表、详情展示、领养申请、进度追踪

### 2. 走失宠物 (Lost & Found)
- **前端**: `/lost` 路由组（3 个页面）
- **后端**: `lostFoundController.js`, `lostFoundRoutes.js`
- **模型**: `LostFound.js`
- **功能**: 发布走失信息、查询附近走失宠物、提供线索

### 3. 防走失提醒 (Prevention)
- **前端**: `/prevention` 路由组（2 个页面）
- **后端**: 待实现
- **模型**: `Prevention.js`
- **功能**: 设置提醒、GPS 定位、走失通知

### 4. 宠物幼儿园 (Kindergarten)
- **前端**: `/kindergarten` 路由组（2 个页面）
- **后端**: `kindergartenController.js`, `kindergartenRoutes.js`
- **模型**: `Kindergarten.js`
- **功能**: 寄养服务预订、看护进度查看

### 5. 上门服务 (Home Service)
- **前端**: `/service` 路由组（2 个页面）
- **后端**: `serviceController.js`, `serviceRoutes.js`
- **模型**: `Service.js`
- **功能**: 洗澡、美容、喂食等服务预订

### 6. 宠物店铺 (Shop)
- **前端**: `/shop` 路由组（3 个页面）
- **后端**: `shopController.js`, `shopRoutes.js`
- **模型**: `Product.js`, `Order.js`
- **功能**: 商品浏览、购物车、订单管理

### 7. 同城约伴 (Meetup)
- **前端**: `/meetup` 路由组（2 个页面）
- **后端**: 待实现
- **模型**: `Meetup.js`
- **功能**: 发布约伴活动、附近宠友匹配

### 8. 养宠社区 (Community)
- **前端**: `/community` 路由组（3 个页面）
- **后端**: `communityController.js`, `communityRoutes.js`
- **模型**: `Post.js`, `Comment.js`
- **功能**: 帖子发布、评论互动、点赞收藏

### 9. 宠物医院 (Hospital)
- **前端**: `/hospital` 路由组（4 个页面）
- **后端**: `hospitalController.js`, `hospitalRoutes.js`
- **模型**: `Hospital.js`, `Doctor.js`, `Appointment.js`
- **功能**: 附近医院查询、医生预约、病历管理

### 10. 宠物资助 (Donation)
- **前端**: `/donation` 路由组（2 个页面）
- **后端**: `donationController.js`, `donationRoutes.js`
- **模型**: `Donation.js`
- **功能**: 物资捐赠、捐赠记录、爱心榜单

### 11. 训狗服务 (Training)
- **前端**: `/training` 路由组（2 个页面）
- **后端**: `trainingController.js`, `trainingRoutes.js`
- **模型**: `Training.js`
- **功能**: 训狗师预约、训练课程、进度跟踪

### 12. 用户中心 (Profile)
- **前端**: `/profile` 路由组（3 个页面）
- **后端**: `userController.js`, `userRoutes.js`
- **模型**: `User.js`
- **功能**: 个人信息、我的订单、我的收藏

---

## 数据模型

### 用户相关
- **User** - 用户基本信息（用户名、邮箱、密码、头像）
- **Profile** - 用户详细资料（地址、宠物信息）

### 宠物相关
- **Adoption** - 领养申请（宠物信息、申请人、状态）
- **LostFound** - 走失/寻回信息（位置、照片、线索）
- **Prevention** - 防走失设置（设备 ID、GPS 坐标）

### 服务相关
- **Hospital** - 宠物医院（位置、联系方式、评分）
- **Doctor** - 医生信息（专长、排班）
- **Appointment** - 预约记录（时间、状态）
- **Service** - 上门服务（类型、价格、时间）
- **Kindergarten** - 寄养服务（设施、价格、预订）

### 社交相关
- **Post** - 社区帖子（标题、内容、图片）
- **Comment** - 评论（内容、点赞）
- **Meetup** - 约伴活动（时间、地点、参与人）

### 交易相关
- **Product** - 商品信息（名称、价格、库存）
- **Order** - 订单（商品、金额、状态）
- **Donation** - 捐赠记录（类型、数量、受赠方）

---

## 开发规范

### 代码风格
- **TypeScript**: 严格模式，避免 `any`
- **命名规范**: 
  - 组件：PascalCase（`PetCard.tsx`）
  - 工具函数：camelCase（`formatDate.ts`）
  - 模型：PascalCase（`User.js`）
  - 路由：kebab-case（`user-profile`）

### 文件组织
```
components/
├── common/           # 通用组件（按钮、输入框、模态框）
├── adoption/         # 领养相关组件
├── hospital/         # 医院相关组件
├── layout/           # 布局组件（导航、页脚）
└── ...

controllers/
├── adoptionController.js
├── hospitalController.js
└── ...

models/
├── User.js
├── Adoption.js
└── ...
```

### 提交规范
遵循 Conventional Commits：
- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 重构
- `test:` 测试相关
- `chore:` 构建/工具相关

示例：
```bash
git commit -m "feat: 添加防走失提醒 GPS 定位功能"
git commit -m "fix: 修复领养申请提交后页面未刷新问题"
```

---

## 常见任务指引

### 1. 添加新功能

**步骤**:
1. 确定功能所属模块（如"好友系统"）
2. 创建数据模型（`server/models/Friend.js`）
3. 实现控制器（`server/controllers/friendController.js`）
4. 添加路由（`server/routes/friendRoutes.js`）
5. 创建前端页面（`client/app/friends/`）
6. 更新 API 文档（`API.md`）

**示例 - 添加好友系统**:
```bash
# 后端
touch server/models/Friend.js
touch server/controllers/friendController.js
touch server/routes/friendRoutes.js

# 前端
mkdir client/app/friends
touch client/app/friends/page.tsx
```

### 2. 修复 Bug

**步骤**:
1. 复现问题（本地测试或在线演示）
2. 定位问题文件（查看控制台错误堆栈）
3. 分析问题原因（检查数据流、API 调用）
4. 修复并测试
5. 提交时注明修复内容

### 3. 优化性能

**常见优化点**:
- **图片**: 使用 `next/image` 懒加载
- **API**: 添加缓存机制（Redis）
- **数据库**: 添加索引（`index.js`）
- **前端**: 代码分割、按需加载

### 4. 编写测试

**测试文件位置**:
- 前端：`client/__tests__/`
- 后端：`server/__tests__/`

**测试框架**:
- 前端：Jest + React Testing Library
- 后端：Jest + Supertest

---

## API 接口规范

### 请求格式
```http
GET /api/v1/adoption/list?page=1&limit=10
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### 响应格式
```json
{
  "success": true,
  "data": { ... },
  "message": "操作成功",
  "timestamp": 1698765432100
}
```

### 错误码
- `200`: 成功
- `400`: 参数错误
- `401`: 未授权
- `403`: 禁止访问
- `404`: 资源不存在
- `500`: 服务器错误

详细 API 文档查看 [`API.md`](API.md)

---

## 环境配置

### 前端环境变量 (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

### 后端环境变量 (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/pethome
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

## 部署流程

### 前端（Netlify）
1. 推送到 GitHub
2. Netlify 自动触发构建
3. 环境变量配置
4. 自定义域名绑定

### 后端（VPS）
1. SSH 登录服务器
2. 拉取最新代码
3. `npm install`
4. `pm2 restart server`

---

## 待开发功能（优先级）

### P0 - 高优先级
- [ ] 防走失提醒完整实现（GPS + 通知）
- [ ] 同城约伴功能（匹配算法）
- [ ] 订单/预约系统（支付集成）
- [ ] 好友系统（关注、私信）

### P1 - 中优先级
- [ ] 救援基地页面
- [ ] 消息通知中心
- [ ] 评价系统
- [ ] 数据分析后台

### P2 - 低优先级
- [ ] 小程序版本
- [ ] 多语言支持
- [ ] AI 智能推荐
- [ ] 虚拟宠物游戏

---

## 智能体协作协议

### 当你接手此项目时：

1. **阅读文档顺序**
   - 先读 [`README.md`](README.md) 了解项目概况
   - 再读 [`API.md`](API.md) 了解接口规范
   - 然后读 [`PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) 了解架构
   - 最后读本文档了解开发规范

2. **代码修改前**
   - 检查相关文件是否存在
   - 查看现有代码风格
   - 确保不破坏现有功能

3. **提交代码前**
   - 本地测试通过
   - 更新相关文档
   - 遵循提交规范

4. **遇到问题**
   - 先查看错误日志
   - 检查数据库连接
   - 验证 API 参数
   - 必要时询问用户

### 当你完成任务时：

1. 验证功能是否正常工作
2. 更新相关文档（如 API 文档）
3. 提交清晰的 commit 信息
4. 向用户汇报完成情况

---

## 联系方式

- **项目负责人**: [@shuangrui666](https://github.com/shuangrui666)
- **项目仓库**: https://github.com/shuangrui666/Pethome
- **在线演示**: https://dashing-sopapillas-03316d.netlify.app

---

**祝开发愉快！🐾**
