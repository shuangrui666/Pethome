# PetHome 前后端审计记录

> 审计对象：仓库 `main` 分支代码快照；修复工作分支：`fix/pethome-security-and-build-baseline`。
> 本文记录静态代码审查结果，不代表已经完成本地构建、接口联调、数据库验证或生产部署。

## 1. 当前仓库结构

- Next.js App Router 前端位于根目录 `app/`，共享组件位于 `components/`。
- 根目录前端 API 封装位于 `src/api/`。
- Express + Mongoose 后端位于 `server/src/`。
- 根目录还存在一份高度重复的 `client/` 前端副本。后续应确定唯一维护入口，避免双重修改。
- 已盘点到 33 个 App Router 页面文件；页面文件存在不等于页面功能已验收。

## 2. 已确认的功能真实性问题

以下页面源码存在模拟数据、TODO 或静态演示数据，必须在产品中明确区分演示数据与真实业务数据：

- `app/community/page.tsx`：列表请求失败或返回空列表时回退到模拟帖子。
- `app/lost-found/page.tsx`：包含模拟走失宠物数据。
- `app/medical/page.tsx`：包含模拟医院数据。
- `app/service/page.tsx`、`app/shop/page.tsx`、`app/training/page.tsx`、`app/donation/page.tsx`：包含模拟业务记录。
- `app/match/page.tsx`：TODO 尚未接入约伴 API，使用模拟聚会数据。
- `app/prevention/page.tsx`：TODO 尚未接入真实设备 API，使用模拟设备数据。
- `app/my-appointments/page.tsx`、`app/my-orders/page.tsx`：页面明确保留 TODO 和模拟记录。
- `app/profile/security/page.tsx`、`app/profile/privacy/page.tsx`、`app/profile/notifications/page.tsx`：部分保存/修改操作仍是 TODO。

## 3. 前后端 API 路由不一致（静态审查）

| 模块 | 前端 API 约定 | 后端当前注册路由 | 结论 |
|---|---|---|---|
| 认证实名 | `POST /auth/verify` | `POST /api/auth/verify-realname` | 路径不一致，且上传字段格式需核对 |
| 宠物 | 有 `PATCH /pets/:id/status` | 当前宠物路由未注册该 PATCH 路由 | 状态更新接口缺失 |
| 领养审核 | `PATCH /adoption/:id/review` | `PUT /adoption/:id/approve`、`PUT /adoption/:id/reject` | 方法和路径不一致 |
| 幼儿园 | `/kindergartens` | 挂载为 `/api/kindergarten` | 基础路径不一致 |
| 医疗 | records、clinics、appointments、medicines | 当前后端路由以 resources、vets、diagnosis、medicines、vet-appointment 为主 | 多组路径不一致 |
| 捐赠/收容所 | donations、shelters、donation records 等 | 后端现有 donation 路由包含 donations、tracking、shelters 等不同路径 | 多组方法/路径不一致 |
| 社交 | posts、friend-requests、messages | 后端 social 路由主要提供 meetup、friends、friend-request 等 | 帖子/好友请求/消息接口存在不一致或缺失 |
| 服务预约 | 前端含 bookings、服务评分等 | 后端 service 路由使用服务 ID 下的 confirm/complete/cancel/rate | 需要逐项对齐 |
| 训练 | 前端含 enrollments、sessions、progress 等 | 后端训练路由使用 enroll、cancel、progress、plan 等 | 需要逐项对齐 |

静态路径比较只能确认接口契约存在差异，不能单凭文件判断所有调用必然失败；仍需逐个核对控制器参数、响应结构和实际运行结果。

## 4. 页面路由和导航问题

- 认证拦截器原本跳转到 `/login`，但实际页面是 `/auth`。修复分支已改为跳转到 `/auth`。
- 原导航栏包含 `/messages`，但已盘点路由中没有该页面。修复分支已暂时移除这个失效入口，待消息功能真正实现后再添加。
- `app/match/page.tsx` 引用了 `/match/create` 和 `/match/[id]`，但当前未发现对应页面。
- `app/community/page.tsx` 引用了 `/community/[id]`，当前未发现对应详情页面。
- 订单和预约页面还引用若干未盘点到的详情/评价路由，需要后续补齐或移除失效链接。

## 5. 已在修复分支完成的变更

工作分支：`fix/pethome-security-and-build-baseline`

1. `server/src/index.ts`：移除会输出全部请求头和请求体的调试日志，避免 Authorization、密码和个人信息进入日志；启动时校验 JWT_SECRET 至少 32 位，并要求生产环境显式配置 MONGODB_URI。
2. `server/src/controllers/auth.controller.ts`：移除注册/登录过程中的敏感调试输出。
3. `app/layout.tsx`：移除构建时访问 Google Fonts 的 Inter 下载依赖。
4. `app/globals.css`：改用本地系统字体栈。
5. `src/api/axios.ts`：401 会话失效时改跳转到现有 `/auth` 页面。
6. `components/Navbar.tsx`：安全处理损坏的 localStorage 用户 JSON；暂时移除不存在的消息入口。
7. `server/src/controllers/auth.controller.ts`：修正注册查重逻辑，用户名、邮箱、手机号任意一项重复都会触发查重，而不是错误地要求用户名与邮箱/手机号同时匹配。
8. `server/.env.example`：将弱 JWT 示例密钥替换为必须由部署者自行生成的安全占位值。
9. `.github/workflows/ci.yml`：新增前端 Next.js build 与后端 TypeScript build 的 GitHub Actions 检查流程；目前尚未观察到该工作流运行结果。

## 6. 尚未验证的事项

- 修复分支尚未在用户本地执行 Next.js build 或浏览器验收。
- 后端尚未执行 TypeScript build、数据库连接和 API 集成测试。
- 开发环境未设置 MONGODB_URI 时仍默认连接 localhost；生产环境现要求显式配置 MONGODB_URI。
- 后端启动现要求配置至少 32 位的 JWT_SECRET；部署环境必须设置真实随机密钥，不能直接复制示例占位值。
- 根目录 `netlify.toml` 的 `publish = "out"` 与当前 Next.js 默认构建配置之间存在疑点；`NEXT_EXPORT` 不是 Next.js 自动启用静态导出的配置。不可在未验证部署方式前将其视为已正确配置。
- Netlify 需要选择兼容 Next.js SSR 的部署插件/配置，或明确改造为静态导出；这两种部署策略不能混用。

## 7. 后续修复顺序

1. 完成后端配置与安全审查（JWT 密钥、数据库连接、CORS、上传和日志）。
2. 建立前后端 API 契约表，逐个模块统一路径、HTTP 方法、请求字段和响应格式。
3. 补齐认证、宠物档案、领养、寻回等核心业务的端到端测试。
4. 将模拟数据改为明确的演示模式；正式模式接口失败时不得静默伪装成真实业务数据。
5. 补齐失效路由，或移除指向不存在页面的链接。
6. 修复订单、预约、隐私、安全、通知等 TODO。
7. 完成构建、运行、部署配置验证后，再进行新版首页和视觉系统改造。

---
最后更新：2026-11-15
