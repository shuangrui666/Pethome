---
name: kindergarten-detail-dynamic-data-fix
description: 狗狗幼儿园详情页动态数据加载和真实图片集成完整修复（2026-10-09）
type: project
category: important_decision
keywords:
  - "狗狗幼儿园详情页"
  - "动态路由数据加载"
  - "useParams hook"
  - "mockKindergartens 完整数据"
  - "kindergarten detail page"
  - "certifications operatingHours"
usage_scenarios:
  - "详情页固定数据问题排查"
  - "幼儿园详情页图片缺失"
  - "动态路由参数数据加载"
---

**问题** (2026-10-09): 用户报告两个问题：
1. "不管按哪个幼儿园来查看详细都是快乐幼儿园的信息" - 详情页显示固定数据，不根据路由参数动态变化
2. "快乐幼儿园里面还缺少了图片" - 详情页使用占位符图片，没有真实图片

**根本原因**:
- 详情页 `E:\client\app\kindergarten\[id]\page.tsx` 使用固定的 `mockKindergarten` 对象，未根据 `params.id` 动态加载
- 模拟数据缺少 `certifications`（资质证书）和 `operatingHours`（营业时间）字段

**修复内容**:

**1. 动态数据加载逻辑**:
- 导入 `useParams` hook、`useEffect`、`useState`、`getKindergartenById`、`Kindergarten` 接口
- 创建完整 `mockKindergartens` 数组（5 个幼儿园，ID 1-5），每个都有真实 Unsplash photos
- 添加 `kindergarten` 状态和 `loading` 状态
- 实现 `loadKindergarten` 函数：先尝试 API 调用，失败则使用模拟数据查找对应 ID
- 添加 loading 状态处理和 404 处理（当 kindergarten 为 null 时显示错误页面）
- 将所有 `mockKindergarten.xxx` 替换为 `kindergarten.xxx`

**2. 真实图片集成**:
- 所有幼儿园 `photos` 字段包含 3 张真实 Unsplash 图片 URL
- 图片轮播从 `photos` 字段获取，不再使用占位符

**3. 模拟数据完善** (5 个幼儿园完整数据):
- **快乐狗狗幼儿园** (ID=1): 资质证书 3 项，营业时间 8:00-20:00
- **萌犬学园** (ID=2): 资质证书 3 项，营业时间 7:30-20:30
- **狗狗欢乐营** (ID=3): 资质证书 3 项，营业时间 8:00-19:00
- **夕阳红狗狗之家** (ID=4): 资质证书 3 项，营业时间 24 小时
- **全年龄段宠物乐园** (ID=5): 资质证书 3 项，营业时间 7:00-21:00

**4. 接口定义更新**:
- `E:\client\src\api\kindergarten.ts` 添加 `certifications?: string[]` 和 `operatingHours?: string` 字段

**5. 渲染逻辑优化**:
- facilities 从对象数组改为字符串数组渲染（带✅图标）
- 容量状态使用 `availableSlots` 字段
- 简化服务价格显示（使用 `priceRange` 字段）
- 简化用户评价（暂无评价提示）

**文件修改**:
- `E:\client\app\kindergarten\[id]\page.tsx` - 完整重写数据加载和渲染逻辑
- `E:\client\src\api\kindergarten.ts` - 接口定义补充

**如何应用**: 当详情页需要显示不同数据时，确保根据路由参数动态加载；所有模拟数据应包含完整字段以匹配接口定义；图片使用真实 Unsplash URL 避免 404。
