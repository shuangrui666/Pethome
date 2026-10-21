---
name: image-url-fixes
description: 多个页面 Unsplash 图片 URL 失效统一修复记录
type: project
category: common_pitfall
keywords:
  - "Unsplash 图片 URL 失效"
  - "404 图片修复"
  - "宠物网站图片维护"
  - "photo-1629909613694"
  - "photo-1519494026892"
  - "photo-1533090161767"
usage_scenarios:
  - "页面图片无法显示时排查"
  - "替换失效的 Unsplash 图片 URL"
  - "图片维护参考"
---

**问题模式**: 多个页面报告图片无法显示，检查发现 Unsplash 图片 ID 失效，返回 HTTP 404

**根本原因**: Unsplash 图片 ID 失效或格式异常

**通用修复方案**:
- 替换为有效的 Unsplash 图片 ID
- 确保 `next.config.js` 中配置了 `images.unsplash.com` 域名
- 开发服务器热重载自动应用变更

**修复记录**:

### 狗狗幼儿园页面 (`E:\client\app\kindergarten\page.tsx`)

**问题** (2026-10-09): "夕阳红狗狗之家"图片缺失

**修复**:
- **夕阳红狗狗之家** (_id: '4'):
  - 失效：`photo-1518717758536-85ae29033b62`
  - 修复：`photo-1533090161767-e6ffed982c88`

### 宠物医疗页面 (`E:\client\app\medical\page.tsx`)

**问题** (2026-10-09): "仁爱宠物医院"和"综合宠物医疗中心"图片缺失

**修复**:
- **仁爱宠物医院** (medical1):
  - 失效：`photo-1576201836106-db47587fc856`
  - 修复：`photo-1629909613694-19b56837e784`
- **综合宠物医疗中心** (medical6):
  - 失效：`photo-1583511655826-05700442b31b`
  - 修复：`photo-1519494026892-80bbd2d6fd0d`

### 宠物店页面 (`E:\client\app\shop\page.tsx`)

**问题** (2026-10-11): 多张店铺图片无法显示

**修复**:
- **shop3（爱宠动物医院）**:
  - 失效：`photo-1576201836106-db47587fc856`
  - 修复：`photo-1629909613694-19b56837e784`
- **shop6（宠物全科医院）**:
  - 失效：`photo-1583511655857-d19b40a7a54e`
  - 修复：`photo-1629909613694-19b56837e784`
- **shop7（精致宠物护理中心）**:
  - 失效：`photo-1583511655826-05700442b31b`
  - 修复：`photo-1519494026892-80bbd2d6fd0d`

**如何应用**: 当页面图片无法显示时，检查 Unsplash 图片 URL 是否失效，替换为有效 URL；医疗类店铺可使用 `photo-1629909613694-19b56837e784` 作为通用医疗场景图片。
