---
name: auth-module-fixes
description: 认证模块字段匹配、端口混淆和功能问题的统一修复记录
type: project
category: common_pitfall
keywords:
  - "认证 API 字段不匹配"
  - "注册登录功能修复"
  - "端口混淆 404"
  - "username 字段"
  - "3000 端口访问"
usage_scenarios:
  - "注册失败排查"
  - "认证页面 404 诊断"
  - "前后端字段对齐"
---

**问题模式**: 用户报告认证功能异常（无法注册、页面 404、按钮无反应）

## 字段命名不匹配问题 (2025-09-28)

**用户反馈**: "无法注册，它显示，操作失败"、"为什么无法注册，只有登录"

**根本原因**: 
- 前端 API `client/src/api/auth.ts` 中 `RegisterData` 接口使用 `name` 字段
- 后端控制器期望 `username` 字段
- API 响应解析格式不匹配

**修复**:
1. 修改 `RegisterData` 接口：`name: string` → `username: string`，`role` 改为可选
2. 修复 `register` 和 `login` 函数响应解析：
   - 后端返回：`{success: true, data: {token, user}}`
   - 修复为返回：`{token: response.data.data.token, user: response.data.data.user}`

## 端口混淆导致的 404 问题 (2025-09-28)

**用户反馈**: "页面又 404 了"、访问 `/auth%EF%BC%89`（带全角括号）

**根本原因**:
1. 旧进程 (PID 25308) 占用 3003 端口运行旧版本代码
2. 前端开发服务器实际运行在 3000 端口 (PID 12788)
3. 浏览器地址栏 URL 包含全角字符 `/auth）`

**修复**:
1. 终止旧进程：`taskkill /F /PID 25308`
2. 指导用户使用正确 URL：`http://localhost:3000/auth`
3. 建议清除浏览器缓存（Ctrl+F5）

## 登录方式扩展 (2025-09-28)

**问题**: 后端登录只支持邮箱登录

**修复**:
- 重写 `login` 函数支持三种登录方式
- 参数从 `email` 改为 `usernameOrEmail`
- 添加判断逻辑：
  ```typescript
  if (usernameOrEmail.includes('@')) {
    query = { email: usernameOrEmail };
  } else if (/^1[3-9]\d{9}$/.test(usernameOrEmail)) {
    query = { phone: usernameOrEmail };
  } else {
    query = { username: usernameOrEmail };
  }
  ```
- 前端 `LoginData` 接口从 `email: string` 改为 `usernameOrEmail: string`

**如何应用**:
- 如遇注册失败，检查前后端字段命名是否一致
- 如遇页面 404，首先检查访问端口是否正确（前端 3000）
- 检查 URL 中是否包含全角字符或特殊符号
- 端口配置变更后需要清除浏览器缓存或硬刷新
