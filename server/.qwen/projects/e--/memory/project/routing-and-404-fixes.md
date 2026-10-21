---
name: routing-and-404-fixes
description: 宠物网站所有 404 错误和路由问题的统一修复记录
type: project
category: common_pitfall
keywords:
  - "Next.js 404 错误修复"
  - "路由缓存问题"
  - "端口配置错误"
  - "浏览器缓存端口"
  - "模态框 vs 单独页面"
  - "动态路由数据加载"
usage_scenarios:
  - "排查页面 404 错误"
  - "诊断端口访问问题"
  - "路由缓存清理流程"
  - "确认功能实现方式（模态框/页面）"
---

## Next.js 开发服务器缓存导致的 404

**问题** (2025-09-25): 访问 `/lost-found` 页面显示 404 "this page could not be found"

**根本原因**: Next.js 开发服务器缓存问题，导致路由未正确注册。HTML 中 initialTree 指向 `["_not-found",...]` 而非 `["lost-found",...]`

**标准修复流程**:
1. 停止前端服务器：`taskkill /F /PID <pid>`
2. 删除 Next.js 缓存：`rd /s /q E:\client\.next`
3. 重启前端服务器：`cd E:\client && npm run dev`
4. 验证：`curl http://localhost:3000/lost-found`

---

## 端口混淆导致的 404

**问题** (2025-09-28, 2026-10-12): 
- 全站 404 或页面空白
- 走失寻回页面数据未更新，浏览器显示 `ERR_CONNECTION_REFUSED`

**根本原因**:
- 用户访问错误端口（3001/3000）而非实际运行端口（3003/3000）
- 浏览器缓存了旧的服务地址
- 开发服务器进程卡死

**端口配置历史**:
- 2025-09-28: 因端口冲突，服务运行在 3003（3000-3002 被占用）
- 2026-10-09: 修改 `package.json` 为 `next dev -p 3000` 固定端口
- 2026-10-12: `next.config.js` 中 API 端口从 3001 改为 5000

**标准修复流程**:
1. 检查实际运行端口：`netstat -ano | findstr :3000`
2. 终止卡死进程：`taskkill /F /PID <pid>`
3. 重启服务：`cd E:\client && npm run dev`
4. 指导用户访问正确 URL：`http://localhost:3000`
5. 强制刷新浏览器：Ctrl + Shift + R

---

## 缺失页面路由的 404

**问题** (2025-09-28): 
- `/match` 路由（同城约伴）404
- `/prevention` 路由（防走失防护）404

**修复**: 创建缺失的页面文件
- `E:\client\app\match\page.tsx` - 约伴活动列表、分类导航、发布按钮
- `E:\client\app\prevention\page.tsx` - 防护设备列表、状态监控、防走失小贴士

**技术实现**: Next.js app router、React 客户端组件、styled-jsx、Lucide React 图标

---

## 用户误解导致的 404

**问题** (2026-10-11): 用户访问 `localhost:3000/shop/shop1/booking` 返回 404

**根本原因**: 用户误以为预约功能是单独页面，实际以模态框形式在店铺详情页中实现

**正确的访问方式**:
1. 访问店铺详情页：`http://localhost:3000/shop/1`（使用数字 ID）
2. 找到"⚡ 快速预约"区域
3. 点击预约按钮弹出模态框

**修复内容**:
- 取消 API 调用注释，实现真实 `createService` 调用
- 添加用户认证集成（getMe, getPets）
- 修复前后端字段映射：
  ```typescript
  const serviceTypeMap = {
    'dog-walking': 'walk',
    'grooming-home': 'grooming',
    'grooming-shop': 'grooming',
    'boarding': 'boarding',
  }
  ```

---

## 动态路由数据加载问题

**问题** (2026-10-09): 狗狗幼儿园详情页不管点哪个都显示"快乐幼儿园"信息

**根本原因**: 详情页 `E:\client\app\kindergarten\[id]\page.tsx` 使用固定的 `mockKindergarten` 对象，未根据 `params.id` 动态加载

**修复**:
- 导入 `useParams` hook、`useEffect`、`useState`
- 创建完整 `mockKindergartens` 数组（5 个幼儿园，ID 1-5）
- 实现 `loadKindergarten` 函数：先 API 调用，失败则使用模拟数据查找
- 添加 loading 状态和 404 处理

---

## How to apply

1. **Next.js 页面 404 但文件存在**: 优先清除 `.next` 缓存并重启开发服务器
2. **页面数据未更新或空白**: 先检查前端服务是否运行在正确端口（固定 3000）
3. **浏览器连接失败**: 确认访问的 URL 端口与实际运行端口一致，强制刷新（Ctrl+Shift+R）
4. **功能访问方式**: 确认功能是模态框实现还是单独页面（如预约服务是模态框）
5. **动态详情页**: 确保根据路由参数动态加载数据，使用 `useParams` hook
6. **next.config.js 修改后**: 必须重启前端服务并清除浏览器缓存
