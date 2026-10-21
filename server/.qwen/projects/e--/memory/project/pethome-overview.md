---
name: pethome-overview
description: PetHome 宠物家园全栈项目概述
type: project
category: project_introduction
keywords:
  - "PetHome 宠物家园"
  - "Next.js TypeScript MongoDB"
  - "11 个核心功能模块"
usage_scenarios:
  - "了解项目整体架构和技术栈"
  - "查询项目运行配置和启动顺序"
---

**项目名称**: PetHome（宠物家园）

**项目类型**: 全栈宠物服务平台

**技术栈**:
- 前端：Next.js 14 (App Router) + TypeScript + Tailwind CSS
- 后端：Node.js + Express + TypeScript
- 数据库：MongoDB + Mongoose
- 认证：JWT + bcrypt
- 实时通信：Socket.io（视频监控）
- UI: Bootstrap 5 + Material Design

**11 个核心功能模块**:
1. 流浪宠物领养（需实名认证）
2. 走失动物寻回（图片、时间、地点，智能匹配串联）
3. 防走失/防盗功能
4. 养宠经验分享社区
5. 上门遛狗服务
6. 狗狗幼儿园（实时监控）
7. 宠物店（美容/寄养/监控）
8. 同城养宠人社交
9. 资助流浪动物项目
10. 宠物医疗（诊断记录 + 药品推荐）
11. 训狗服务（分阶段训练：基础/进阶/高级）

**项目运行配置**:
- 后端：`cd E:\server && npm run dev` → http://localhost:5000
- 前端：`cd E:\client && npm run dev` → http://localhost:3000
- 数据库：`mongodb://localhost:27017/pethome`
- 启动顺序：1) MongoDB → 2) 后端服务器 → 3) 前端服务器

**环境状态**:
- Node.js: v24.21.0 (D:\program Files\nodejs)
