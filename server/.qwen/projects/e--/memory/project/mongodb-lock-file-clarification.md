---
name: mongodb-lock-file-clarification
description: MongoDB mongod.lock 锁文件在正常运行时是正常现象
type: project
---

**发现** (2025-09-25): 用户报告 `mongod.lock` 文件问题，但实际 MongoDB 服务正常运行

**关键认知**:
- `mongod.lock` 是 MongoDB 正常运行时创建的锁文件，不是错误
- 只有当 MongoDB 异常崩溃后重新启动时，才可能需要手动删除该锁文件
- 锁文件存在且 MongoDB 服务正在运行（通过 netstat 和进程检查确认）= 正常状态

**验证方式**:
- MongoDB 服务状态：`netstat -ano | findstr :27017`
- 后端连接状态：检查 netstat 中到 27017 的 ESTABLISHED 连接
- Windows 服务：`Get-Service -Name MongoDB` 查看服务状态
- 进程检查：`tasklist | findstr mongod`

**How to apply**: 用户报告 MongoDB 问题时，先通过 netstat 和 Windows 服务命令验证实际运行状态，不要仅凭锁文件存在就判断为错误；锁文件是 MongoDB 正常运行的标志之一
