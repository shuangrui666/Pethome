---
name: adoption-module-integration
description: 领养模块完整集成记录（API 对齐 + 详情页修复 + 组件 Hoisting 问题）
type: project
category: project_introduction
keywords:
  - "领养模块集成"
  - "前后端 API 端点对齐"
  - "领养详情页数据结构"
  - "AdoptionModule 组件 hoisting"
  - "realNameVerified 字段"
usage_scenarios:
  - "领养功能完整实现参考"
  - "排查 API 和数据加载问题"
  - "组件样式定义规范"
---

**API 端点对齐** (2025-09-24):
- 问题：前后端控制器函数名不匹配，端点路径不一致
- 后端修复 (`adoption.controller.ts`)：
  - `createAdoptionApplication` → `createAdoption`
  - `getAdoptionApplications` → `getAdoptionList`
  - `getAdoptionApplicationById` → `getAdoptionById`
  - `approveAdoptionApplication` → `approveAdoption`
  - `rejectAdoptionApplication` → `rejectAdoption`
  - `getMyAdoptionApplications` → `getMyAdoptions`
  - 新增 `updateAdoption`、`deleteAdoption`
- 前端修复 (`adoption.ts`)：
  - 所有路径从 `/adoptions/*` 改为 `/adoption/*`
  - 新增 `getAdoptions()` 获取列表
- 新增审核端点：`PATCH /:id/cancel`、`PATCH /:id/complete`

**TypeScript 类型错误修复** (2025-09-24):
- `user.isRealNameVerified` → `user.realNameVerified`（匹配 User model schema）
- express-validator 的 ValidationError 使用 `(err: any).path`
- nodemon 使用 `--transpile-only` 跳过类型检查

**端口配置修复** (2025-09-24):
- 前端 `axios.ts` 默认 API URL 从 `:3001` 改为 `:5000`
- 后端端口 5000，前端端口 3000

**详情页数据结构修复** (2025-09-28):
- 问题：点击"查看详情"显示"获取领养详情失败"
- 根本原因：`mockAdoptionDetails` 中 `petId` 和 `applicantId` 是字符串 ID，但期望完整对象
- 修复：
  - 添加 `mockPetsData`（7 个完整宠物对象）
  - 添加 `mockApplicantsData`（7 个完整申请人对象）
  - 更新 7 条领养记录，使用对象引用而非字符串 ID
- API 集成：从 `getPetById` 改为 `getAdoptionById`，返回领养申请详情（含宠物 + 申请人信息）

**AdoptionModule 组件 Hoisting 问题** (2025-09-25):
- 问题：社区页面无法运行，`AdoptionModule` 组件报错
- 根本原因：`styles` 对象定义在 `return` 语句之后，但 JSX 中提前引用
- 修复：将 260+ 行 `styles` 对象从组件末尾移动到函数开始处

**数据状态配置**:
- `pending`: 待审核
- `approved`: 已通过（显示成功提示 + 联系机构按钮）
- `rejected`: 已拒绝（显示拒绝提示 + 重新申请按钮）
- `completed`: 已完成
- `cancelled`: 已取消
