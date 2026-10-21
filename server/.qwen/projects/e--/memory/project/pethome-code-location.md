---
name: pethome-code-location
description: PetHome 宠物网站代码存储位置和运行方式说明
type: project
category: project_introduction
keywords:
  - "宠物网站代码位置"
  - "项目文件结构"
  - "Next.js 全栈应用"
  - "前端后端路径"
  - "E:\client"
  - "E:\server"
usage_scenarios:
  - "用户询问代码存储位置"
  - "浏览器直接打开失败问题"
  - "项目结构说明"
---

**问题** (2026-10-11): 用户询问"你把我宠物网站的所有代码都储存在了哪里，我要在哪里才能够找到。为什么我的网站帮直接在浏览器里打开"

**代码存储位置**:

**前端代码** (Next.js React 应用):
- 根路径：`E:\client\`
- 页面路由：`E:\client\app\` (page.tsx, adoption/, lost-found/, match/, shop/, community/, medical/, training/, kindergarten/, donation/)
- 组件：`E:\client\components\`
- API 客户端：`E:\client\src\api\`
- 配置：`E:\client\package.json`, `E:\client\globals.css`

**后端代码** (Express.js API 服务):
- 根路径：`E:\server\`
- 路由：`E:\server\src\routes\`
- 控制器：`E:\server\src\controllers\`
- 模型：`E:\server\src\models\`
- 配置：`E:\server\package.json`

**数据库**: MongoDB (数据目录：`D:\Program Files\MongoDB\Server\8.3\data`)

**为什么不能直接在浏览器打开**:
- 这是 Next.js 全栈应用，不是静态 HTML 文件
- 需要启动开发服务器才能运行 JavaScript 和 API
- 直接打开 `file:///` 路径无法执行服务端渲染和 API 调用

**正确启动方式**:
1. 启动前端：`cd E:\client && npm run dev` (端口 3000)
2. 启动后端：`cd E:\server && npm start` (端口 5000)
3. 访问：`http://localhost:3000`

**How to apply**: 用户询问代码位置或浏览器打开问题时，提供完整的项目结构路径和启动步骤，强调必须运行开发服务器而非直接打开文件。
