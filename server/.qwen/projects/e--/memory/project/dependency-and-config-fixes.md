---
name: dependency-and-config-fixes
description: 前端依赖和配置问题的统一修复记录
type: project
category: common_pitfall
keywords:
  - "Next.js 路径别名问题"
  - "lucide-react 依赖缺失"
  - "app 目录导入错误"
  - "前端模块导入路径"
usage_scenarios:
  - "排查 Module not found 错误"
  - "解决路径别名配置问题"
  - "安装缺失的图标库依赖"
---

## Next.js 路径别名问题

**问题** (2025-09-25): 前端启动时报错 `Module not found: Can't resolve '@/api/adoption'`，影响 12 个页面文件

**根本原因**: Next.js 的 `app` 目录和 `src` 目录在 `client` 下是同级目录，不能使用 `@/` 路径别名访问 `src` 下的文件

**修复方案**:
- 将所有页面中的导入路径从 `@/api/xxx` 改为 `../../src/api/xxx`
- 修复的页面文件（共 12 个）:
  - `E:\client\app\adoption\page.tsx`
  - `E:\client\app\training\page.tsx`
  - `E:\client\app\medical\page.tsx`
  - `E:\client\app\shop\page.tsx`
  - `E:\client\app\lost-found\page.tsx`
  - `E:\client\app\kindergarten\page.tsx`
  - `E:\client\app\service\page.tsx`
  - `E:\client\app\donation\page.tsx`
  - `E:\client\app\community\page.tsx`
  - `E:\client\app\auth\page.tsx`
  - `E:\client\app\profile\page.tsx`
  - `E:\client\app\my-pets\page.tsx`
  - `E:\client\app\training\[id]\book\page.tsx`

**经验教训**: 在 Next.js App Router 项目中，当 `app` 和 `src` 是同级目录时，不能使用 `@/` 路径别名访问 `src` 下的内容，必须使用相对路径

---

## lucide-react 依赖缺失

**问题** (2025-09-28): 所有页面显示 build error，无法正常加载

**错误信息**:
```
Module not found: Can't resolve 'lucide-react'
  5 | import { ChevronLeft, Shield, MapPin, Bell, Smartphone, Wifi, Battery } from 'lucide-react'
```

**受影响页面**:
- `/prevention/page.tsx` - 防走失防护页面
- `/match/page.tsx` - 同城约伴页面

**根本原因**: 项目未安装 `lucide-react` 图标库依赖包

**修复**:
```bash
cd E:\client && npm install lucide-react
```

**状态**: ✅ 已修复，所有页面正常访问

---

## 领养页面字段映射问题

**问题** (2025-09-25): 领养页面显示字段错误

**根本原因**: 前端使用 `adoption.description` 但后端返回的字段名是 `reason`

**修复**: 在 `E:\client\app\adoption\page.tsx` 中将 `description` 改为 `reason`

---

## How to apply

1. **Module not found 错误**: 检查 `app` 和 `src` 目录关系，使用相对路径而非 `@/` 别名
2. **build error 缺少图标**: 安装 `lucide-react` 依赖
3. **字段显示错误**: 核对前后端 API 字段命名一致性
