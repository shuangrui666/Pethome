---
name: controller-function-mismatch-fixes
description: 后端控制器函数名与路由导入不匹配的统一修复记录
type: project
category: common_pitfall
keywords:
  - "控制器函数名不匹配"
  - "Route.get() 回调错误"
  - "路由导入缺失"
  - "controller 别名导出"
  - "service/shop/training 控制器"
usage_scenarios:
  - "后端启动报错排查"
  - "控制器函数缺失修复"
  - "路由配置参考"
---

**问题模式**: 后端启动时报错 `Route.get() requires a callback function but got a [object Undefined]`

**根本原因**: 路由文件导入的控制器函数在控制器文件中未正确导出（函数名不匹配或完全缺失）

**通用修复方案**:
1. 检查路由文件导入的函数名
2. 在控制器文件中添加对应的函数或别名导出
3. 新增缺失的业务逻辑函数
4. 添加权限验证和状态检查

**修复记录**:

### 服务预约控制器 (`server/src/controllers/service.controller.ts`)

**问题** (2025-09-25): `service.routes.ts` 第 22 行报错

**缺失函数**:
- `getServiceList` → 修复：`export const getServiceList = getServices`（别名）
- `updateService` → 新增：更新服务预约（检查权限和状态，只能修改 pending 状态）
- `deleteService` → 新增：删除服务预约（只能删除 pending 状态）
- `rateService` → 新增：评价已完成的服务（检查是否已评价）

### 宠物店控制器 (`server/src/controllers/shop.controller.ts`)

**问题** (2025-09-25): `shop.routes.ts` 第 23 行报错

**缺失函数**:
- `getShopList` → 修复：`export const getShopList = getShops`（别名）
- `getMyShops` → 新增：获取当前用户的宠物店列表（分页、按创建时间倒序）
- `removeService` → 新增：从宠物店删除服务项目（需权限验证）
- `updateService` → 新增：更新宠物店服务项目（支持更新 name/description/price/duration）
- `createMonitoringRoom` → 新增：创建监控房间（用于宠物店实时监控）
- `closeMonitoringRoom` → 新增：关闭监控房间（设置 isActive 为 false）

### 训狗控制器 (`server/src/controllers/training.controller.ts`)

**问题** (2025-09-25): `SyntaxError: Identifier 'updateTrainingProgress' has already been declared`

**根本原因**: 重复函数声明
- `updateTrainingProgress` 在行 266 和行 1060 各声明一次
- 重复代码块范围：行 1056-1170

**修复**: 删除重复的函数声明（行 1056-1170），保留唯一的 `getTrainingPlan` 函数

**如何应用**: 
- 修改路由文件时需确保导入的控制器函数名与实际导出名称一致
- 可使用别名导入或导出方式快速对齐
- 删除和更新类操作需添加权限验证和存在性检查
- 大型控制器文件编辑时需警惕重复函数声明，使用 grep 搜索函数名快速发现重复
