---
name: mongodb-setup-needed
description: MongoDB 安装问题已解决，服务正常运行
type: project
---

**MongoDB 安装信息**:
- **最终安装路径**: `C:\Program Files\MongoDB\Server\8.3\bin\`
- **数据目录**: `D:\Program Files\MongoDB\Server\8.3\data` ✅ 存在，包含 95 个数据文件
- **配置文件**: `C:\Program Files\MongoDB\Server\8.3\bin\mongod.cfg`
- **后端 .env 配置**: `MONGODB_URI=mongodb://localhost:27017/pethome`

**问题诊断** (2025-09-28):
- 数据目录存在且有完整数据文件（WiredTiger 存储引擎文件），说明之前有数据
- D 盘 bin 目录完全缺失，MongoDB 可执行文件不存在
- **根本原因**: MongoDB 未正确安装到 D 盘，只有数据目录结构而无可执行文件

**解决方案执行** (2025-09-28):
1. 下载 MongoDB Community Server MSI 安装包：`D:\mongodb-windows-x86_64-8.3.11-signed.msi`
2. 运行 MSI 安装程序（默认安装到 C 盘）
3. MongoDB 自动安装到 `C:\Program Files\MongoDB\Server\8.3\`

**当前状态** (2025-09-28):
- ✅ MongoDB 服务状态：RUNNING（Windows 服务，自动启动）
- ✅ 端口监听：27017 端口正常监听
- ✅ 连接状态：已有建立连接，后端已连接
- ✅ 前端服务器：运行在 http://localhost:3000
- ⚠️ **缺少客户端工具**: bin 目录只有 `mongod.exe` 和 `mongos.exe`，没有 `mongosh.exe` 命令行工具
- **环境核心功能就绪**，但无法直接用命令行查看数据库内容

**客户端工具缺失** (2025-09-28):
- 问题：用户打开 MongoDB 客户端显示空白，因为缺少 mongosh 或 Compass
- bin 目录内容：仅包含 `mongod.exe`（服务端）、`mongos.exe`（分片路由）、`InstallCompass.ps1` 脚本
- 解决方案：需要单独安装 MongoDB Shell (mongosh) 或 MongoDB Compass 图形化工具

**How to apply**: MongoDB 服务端正常运行，后续开发可正常使用。如需查看数据库内容，需安装：
- 方式 1：运行 `InstallCompass.ps1` 安装 MongoDB Compass 图形化工具
- 方式 2：从 MongoDB 官网下载独立版 mongosh 命令行工具
