# PetHome 工程审计报告（第一轮静态核查）

> 核查日期：2026-11-15  
> 仓库：`shuangrui666/Pethome`  
> 分支：`main`  
> 核查方式：只读检查 GitHub 源码、路由、控制器、模型和项目配置。  
> **重要边界：** 本报告是静态代码审计，不代表前后端已成功启动、构建、连接真实数据库或通过端到端测试。未读取任何 `.env` 或密钥文件。

## 1. 本轮结论

当前 PetHome 已具备 Next.js 页面、Express API 路由、Mongoose 模型和部分业务控制器的代码骨架，但前后端接口契约存在大量不一致，若干页面依赖模拟数据，且认证与日志存在高优先级安全问题。当前不应将项目描述为可正式使用或已完成部署。

**第一轮判断：**
- 前端页面：存在真实页面与表单，但不能据此认定业务闭环可用。
- 后端：存在 Express 路由、控制器和 Mongoose 模型；MongoDB 连接在 `server/src/index.ts` 中直接配置。
- 前后端集成：多组 API 路径、HTTP 方法、参数名和响应结构不一致，部分调用会命中不存在的接口。
- 真实性：社区、寻回、医疗等页面在失败或空数据时会显示本地 mock 数据；首页展示的统计数字没有真实统计接口证据。
- 安全：密码/请求头日志、伪实名认证、JWT 实名状态缺失等问题应先于视觉改版修复。

## 2. 已确认的核心问题

### P0：安全与信任边界

| 编号 | 问题 | 证据位置 | 影响 |
|---|---|---|---|
| SEC-01 | 全局请求日志打印请求头和请求体 | `server/src/index.ts` | Authorization Bearer token、密码和个人提交内容可能进入日志 |
| SEC-02 | 注册和登录控制器打印完整请求体及密码字段 | `server/src/controllers/auth.controller.ts` | 明文密码可能进入服务日志 |
| SEC-03 | 实名认证控制器明确写明“模拟验证成功”，仅做格式检查和文件上传后就设置 `realNameVerified: true` | `server/src/controllers/auth.controller.ts` | 不能作为真实身份核验；可能让未被权威核验的账号获得实名状态 |
| SEC-04 | JWT 生成时只包含 `userId` 和 `role`；领养控制器却读取 `req.user.realNameVerified` | `server/src/controllers/auth.controller.ts`、`server/src/controllers/adoption.controller.ts`、`server/src/middleware/auth.middleware.ts` | 令牌解码对象没有该字段，领养创建流程的实名判断可能始终失败；应从数据库读取可信状态或重新设计令牌/权限校验 |
| SEC-05 | HTTP CORS 使用默认开放配置，Socket.IO 默认允许 `*` | `server/src/index.ts` | 生产环境跨域来源没有按实际前端域名收紧 |
| SEC-06 | 上传中间件允许图片和视频，单文件上限 50MB；当前过滤主要依赖客户端 MIME 类型 | `server/src/middleware/upload.middleware.ts` | 需要补充服务端内容检测、文件大小/数量策略、访问控制和存储策略 |

### P1：核心业务 API 契约不匹配

以下是从前端 API 模块与后端已注册路由直接对照得出的静态错配。除非另有同路径代理或未纳入本轮范围的服务，否则这些请求无法按当前路由定义正常匹配。

| 业务 | 前端请求 | 后端实际路由/问题 |
|---|---|---|
| 实名认证 | `POST /auth/verify` | 后端为 `POST /auth/verify-realname` |
| 用户资料更新/删除 | `PUT/DELETE /users/:id` | 后端只定义 `PUT /users/me`；未发现对应的用户删除路由 |
| 宠物状态更新 | `PATCH /pets/:id/status` | 后端未定义该路由 |
| 领养审核 | `PATCH /adoption/:id/review` | 后端定义 `PUT /adoption/:id/approve` 与 `PUT /adoption/:id/reject` |
| 领养待审核数 | `GET /adoption/pending-count` | 后端未定义该路由 |
| 宠物领养申请列表 | `GET /pets/:id/adoptions` | 后端未定义该路由 |
| 医疗记录/诊所/预约 | 前端使用 `/medical/records`、`/medical/clinics`、`/medical/appointments` 等 | 后端当前路由主要为 `/medical/diagnosis`、`/medical/resources`、`/medical/vets`、`/medical/vet-appointment` |
| 幼儿园 | 前端使用 `/kindergartens` | 后端挂载前缀为 `/api/kindergarten`（单数）；报名、退园、我的报名、评价和附近查询也存在路径/方法差异 |
| 服务预约 | 前端使用独立 `/bookings` 路由 | 后端服务路由定义在 `/services` 下，没有对应的 `/bookings` 路由 |
| 训练报名/进度 | 前端调用 `/training/my-enrollments`、报名列表、sessions、progress 等路径 | 后端定义 `/training/my`、`/:id/cancel`、`/:id/progress`、`/:id/plan/:enrollmentId`；部分前端请求无对应路由或方法不同 |
| 捐赠 | 前端使用 `/donations/my-donations`、`/:id/records`、`/shelters` 等 | 后端使用 `/donations/my`、`/:id/tracking`、`/donations/shelters`，取消方式及捐赠路径也不同 |
| 社交/消息 | `src/api/social.ts` 使用 `/social/posts`、`/social/messages`、`/social/friend-requests` 等 | 后端 `social.routes.ts` 没有帖子/消息路由，帖子另挂载在 `/api/posts`；好友请求路径和 HTTP 方法也不一致 |
| 店铺服务 | 前端部分服务更新使用 PATCH，且有 reviews/nearby 等请求 | 后端服务项目更新为 PUT；未发现对应 reviews/nearby 路由 |

**修复原则：** 先建立唯一 API 契约表，再统一前端请求与后端路由；不要通过不断添加重复路由来掩盖命名和职责混乱。每条接口必须配请求/响应类型和最小集成测试。

### P1：核心页面的数据读取和表单问题

| 页面/模块 | 已确认问题 | 证据位置 |
|---|---|---|
| 我的宠物 | 页面调用 `getPets` 后读取 `data.pets`，后端 `getPets` 返回 `{ success, data, pagination }`；列表可能一直显示为空 | `app/my-pets/page.tsx`、`src/api/pet.ts`、`server/src/controllers/pet.controller.ts` |
| 我的宠物 | 创建表单发送 `photos`，后端创建控制器从 Multer 文件字段读取 `images`；字段不一致；删除按钮尚未调用删除 API，只显示成功提示 | `app/my-pets/page.tsx`、`server/src/routes/pet.routes.ts` |
| 领养 | 创建领养前依赖实名认证；当前 JWT 实名字段问题可能阻断提交 | `app/adoption/create/page.tsx`、`server/src/controllers/adoption.controller.ts` |
| 社区 | API 返回空列表时会改用 `mockPosts`；API 报错时也会显示模拟帖子 | `app/community/page.tsx` |
| 寻回 | API 报错时回退到 `mockLostPets`；“发现报告”标签当前仍请求 `status: lost`，再按宠物类型拆分模拟结果，不能视为真实已找到报告 | `app/lost-found/page.tsx` |
| 医疗 | API 返回空列表或失败时会显示 `mockClinics` | `app/medical/page.tsx` |
| 首页 | 显示 1000+ 领养、500+ 寻回、2000+ 用户、50+ 店铺等数字；未发现这些数字由真实统计接口提供 | `app/page.tsx` |

### P2：其他工程问题

1. `src/api/axios.ts` 的 401 拦截器跳转 `/login`，实际登录注册页为 `/auth`。
2. 导航栏链接 `/messages`，但当前已盘点的 App Router 页面路由中没有该页面。
3. `app/layout.tsx` 使用 `next/font/google` 下载 Inter；本地构建曾因访问 `fonts.gstatic.com` 超时而失败。当前不能据此判定其余源码一定可以编译。
4. 根目录与 `client/` 存在高度重复的前端代码；暂不删除，待唯一入口确认后再治理。
5. 用户统计控制器当前返回固定的 0 值统计对象，不能作为真实统计。
6. 医疗控制器中的药品建议使用简单关键词规则匹配，并非训练好的 AI 模型；不得宣传为机器学习诊断。
7. Socket.IO 目前有通用房间、视频帧和聊天事件处理代码，但未证明页面与这些事件形成可靠、授权的端到端链路。

## 3. 已存在的真实代码基础（不等于验收通过）

- Express 后端入口：`server/src/index.ts`。
- MongoDB/Mongoose 连接：启动时读取 `MONGODB_URI`，未配置时回退到本机 MongoDB 地址。
- 健康检查：`GET /api/health`。
- 认证：注册、登录、当前用户资料和 JWT 中间件代码存在。
- 宠物：创建、列表、详情、更新、删除、附近查询和我的宠物控制器代码存在。
- 领养：申请创建、列表、详情、审核、取消和完成等控制器代码存在。
- 寻回：报告、线索和匹配控制器代码存在。
- 社区帖子：`/api/posts` 路由存在，包含帖子、评论、点赞和收藏相关处理。
- 上传：Multer 磁盘存储中间件存在。
- 数据模型：User、Pet、Adoption 等 Mongoose 模型存在。

这些内容仅说明已找到代码实现候选；权限正确性、数据一致性、运行成功和业务验收仍需单独测试。

## 4. 建议修复顺序

1. **先止血安全问题：** 删除密码、Authorization 和完整请求体日志；实名认证改为明确的待核验流程，未接真实可信核验服务前不得自动标记为已实名；领养实名判断改为服务端读取数据库。
2. **建立 API 契约基线：** 为认证、宠物、领养、寻回、社区、医疗逐项确定唯一路径、方法、字段和响应格式。
3. **先打通最小核心闭环：** 注册/登录 → 获取当前用户 → 新增/读取/编辑/删除宠物档案 → 发布和查看领养/寻回内容。
4. **消除误导性 mock 回退：** 真实 API 失败时显示错误和重试，不要把模拟数据伪装成真实业务数据；演示数据必须明确标注。
5. **再修复其他业务：** 社区、医疗、幼儿园、店铺、训练、捐赠、服务预约。
6. **执行验证：** 后端 TypeScript 构建、前端构建、API 集成测试、权限测试和端到端测试；记录实际结果。
7. **最后确定部署方案：** 收敛根目录与 `client/` 重复结构，确认 Next.js 输出方式与 Netlify 配置一致，再部署。

## 5. 本轮尚未完成的验证

- 未连接真实 MongoDB，未运行后端服务。
- 未执行后端 `npm run build` 或前端完整构建。
- 未对每个 API 执行真实 HTTP 请求。
- 未完成所有页面的逐项 UI/表单审计。
- 未验证生产环境 CORS、上传、权限和部署配置。
- 未修改业务源代码。

**当前状态：第一轮静态审计发现高优先级问题；第一阶段仍未完成。**


## 6. 补充核查：认证上传、用户资料和核心表单

### SEC-07：实名认证上传中间件顺序错误

`server/src/routes/auth.routes.ts` 中实名认证路由的顺序为：

1. `verifyRealnameValidations`
2. `validate(verifyRealnameValidations)`
3. `upload.fields(...)`

但 `idCardFront` 和 `idCardBack` 是文件字段，Multer 尚未执行时，文件内容还没有被解析到请求对象。当前校验器却要求这两个字段在 `req.body` 中非空，因此合法的 multipart 文件上传也可能在到达 Multer 前被校验拒绝。应将文本字段校验与文件存在性校验分开，并在 Multer 解析后检查文件字段；同时先解决 SEC-03 的“模拟实名”问题。

### API-01：用户资料“我的资料”路由参数不匹配

`server/src/routes/user.routes.ts` 将 `GET /me` 绑定到 `getUserProfile`，但 `getUserProfile` 从 `req.params.id` 读取用户 ID。该路由没有 `:id` 参数，因此无法正确获取当前用户。应改为基于认证中间件提供的 `req.userId` 查询，或绑定专用的当前用户控制器。

### API-02：领养创建页面宠物列表读取方式

复核后确认 `app/adoption/create/page.tsx` 使用 `getPets()` 并读取 `response.data`，与 API 模块返回 Axios 响应体、后端在响应体中提供 `data: pets` 的结构一致。**此项不是已确认缺陷，已从问题清单撤销。** 仍需运行时验证页面加载和空状态。

### API-03：宠物列表参数名不一致

前端宠物 API 接受 `type` 参数，后端控制器读取 `species`；前端传入 `isAdoptable`，普通列表控制器没有处理该参数。过滤条件可能静默失效。

### API-04：宠物新增表单字段和后端校验不一致

`app/my-pets/page.tsx` 当前提交 `photos` URL 数组；后端创建路由验证 `name/species/breed/gender/age`，控制器则从 Multer `images` 文件字段读取图片，并没有把 `photos` 当作上传文件处理。页面还允许品种留空，但后端要求非空。需要统一为真实文件上传或明确支持 URL，并让前后端字段一致。

## 7. 第一轮核心流程判断

| 流程 | 当前静态判断 | 主要阻塞 |
|---|---|---|
| 注册/登录 | 代码已存在，待运行验证 | 敏感日志；401 路由错配；JWT/用户信息字段需要统一 |
| 实名认证 | 不可作为真实认证使用 | 模拟验证；multipart 校验顺序；前端路径错配 |
| 我的宠物 | 部分实现，当前数据链路存在错误 | 响应字段错配；新增字段错配；删除按钮未调用 API |
| 领养申请 | 部分实现，当前很可能被阻断 | 宠物列表响应读取错误；JWT 不含实名字段；前端审核 API 与后端路由不一致 |
| 走失报告 | 有表单与后端处理代码，待联调 | 前端字段契约需继续逐项核对；列表页发现报告数据逻辑不正确 |
| 社区 | 部分实现 | mock 回退；社交 API 模块大量路径不对应实际后端 |
| 医疗 | 当前接口契约严重不一致 | 前端 records/clinics/appointments 与后端 diagnosis/vets/resources 路由模型不同；mock 回退 |



## 8. 已执行的第一批安全与宠物档案修复（2026-11-15）

以下改动已直接提交到 `main`，并重新读取文件确认修改内容存在。**尚未在真实运行环境执行构建或 API 测试，不能标记为验收通过。**

| 修复 | 修改内容 | 状态 |
|---|---|---|
| 请求日志脱敏 | 移除全局日志中的请求头和请求体，只保留方法与路径 | 已提交，待运行验证 |
| 认证日志脱敏 | 移除注册/登录控制器中打印请求体、密码及密码校验细节的调试日志 | 已提交，待运行验证 |
| 实名认证安全默认 | 未接入可信核验服务前，实名认证接口返回 HTTP 501，不再仅凭身份证格式/图片上传将账号自动标记为已实名；接口不再接收/存储身份证材料 | 已提交，待前端交互与服务接入 |
| 实名 API 路径 | 前端路径改为后端实际注册的 `/auth/verify-realname` | 已提交，待联调 |
| 401 跳转 | 前端未授权跳转从不存在的 `/login` 改为现有 `/auth` | 已提交，待联调 |
| 领养实名判断 | 领养控制器改为从数据库读取当前用户的实名状态和用户名，不再依赖 JWT 中未包含的资料字段 | 已提交，待集成测试 |
| 我的宠物列表 | 新增 `GET /pets/my` 前端 API，页面改为只读取当前用户宠物并按后端 `data` 响应结构解析 | 已提交，待联调 |
| 我的宠物删除 | 删除按钮现在调用后端 `DELETE /pets/:id`，不再只显示虚假的成功提示 | 已提交，待联调 |
| 宠物图片字段 | 我的宠物表单统一发送 `images`；后端支持 HTTPS 图片 URL 数组或实际上传文件，页面展示字段改为模型中的 `images` | 已提交，待验证 |

**安全说明：** 当前实名认证会明确不可用，直到接入真实、合规的身份核验服务。这是有意采用的 fail-closed 行为，不应为了让领养演示通过而恢复“模拟认证成功”。

**提交记录：** 本轮包含审计报告、路线图和上述代码修复；具体提交可在 GitHub 仓库 main 分支历史中查看。


### 2026-11-15：当前用户资料与寻回列表查询修复
已追加两项静态代码修复，均已提交到 `main` 并重新读取 GitHub 文件确认：

| 修复 | 修改内容 | 状态 |
|---|---|---|
| API-01 当前用户资料 | 新增专用 `getCurrentUserProfile`，从认证中间件提供的 `req.user.userId` 查询当前用户；`GET /api/users/me` 改为绑定该控制器，不再把无 `:id` 的路径交给读取 `req.params.id` 的公开资料控制器 | 已提交，待构建与认证接口测试 |
| 寻回“我的报告” | 移除 `getMyLostPets` 查询中模型不存在的 `type` 条件，按 `reporterId` 和可选 `status` 查询 | 已提交，待数据库接口测试 |

本轮同时确认：
- `LostPet.model.ts` 的 `reports` 嵌入式结构包含线索提交所需的 reporterId、location、time、description、images、status 字段；当前控制器写入结构与模型基本对应。
- `POST /api/lost-pets/:id/clue` 已配置认证和 `upload.array('clueImages', 3)`；详情接口响应为 `data.lostPet`，与详情页读取方式一致。
- Adoption 控制器已正确导入 `User`，实名状态数据库读取不存在缺失导入问题。
- 仍存在未解决的线索表单问题：页面收集的姓名、电话字段未随请求发送，当前后端嵌入式线索模型也未保存这两个字段；需要统一产品行为和数据契约后再修。
- `GET /api/users/:id` 仍是公开用户资料读取路径；需后续确认返回字段、隐私边界及页面使用场景。
- `getMyLostPets` 与上述接口修复尚未通过 TypeScript 构建、真实 MongoDB 请求或前端联调。

**提交记录：** 当前用户资料修复提交 `84a230ab7c79502de6929ff41a1851c213b9bfdc`；寻回列表查询修复提交 `827aae7c66292909d28821f9f5d81a91eae66589`。此前用户资料控制器新增提交为 `4783cfab1634db13bcda37a8367b246d4c1e5e35`。


### 2026-11-15：寻回列表真实状态筛选与错误呈现

- 寻回列表切换“走失报告/发现报告”时，分别请求后端 `status=lost` 与 `status=found`，不再让两个标签都请求走失数据。
- 移除该页面的模拟报告回退，API 失败时明确展示错误和重试入口，避免把演示数据当成真实用户报告。
- 已提交到 `main`（提交 `46dab31b53970ee777f5c46620e76a4badfa297f`），并重新读取 GitHub 文件确认修改存在；未运行前端构建或真实接口测试。


### 2026-11-15：寻回详情、线索与定位数据契约修复

本轮针对寻回模块继续核对模型、路由、控制器、创建表单、列表页和详情页，已提交以下静态代码修复：

| 修复 | 修改内容 | 状态 |
|---|---|---|
| 寻回详情字段 | 页面改为读取模型实际保存的 petName、breed、age、gender、color、features、contactPhone 等字段 | 已提交，待构建与接口验证 |
| 线索数量与时间线 | 详情页统一读取嵌入式 reports，不再读取模型不存在的 clues 字段；移除虚构的历史时间线和浏览量 | 已提交，待验证 |
| 线索表单 | 移除当前后端不会保存的姓名、电话和联系授权字段，避免误导提交者；保留地点、时间、描述 | 已提交，待验证 |
| 匹配展示 | 移除把 matches 嵌入式引用记录误当作完整宠物对象的详情卡片 | 已提交，待后续重新实现 |
| 虚假地理坐标 | 删除创建报告时写入的北京默认经纬度、城市和区县；城市/区县改为用户填写，坐标字段改为可选 | 已提交，待数据库验证 |
| 地理匹配与附近搜索 | 在地理编码未接入前，匹配和附近搜索明确返回 HTTP 501，不再根据虚构坐标计算距离；增加附近搜索路由 | 已提交，待 API 验证 |
| 线索地点 | 线索仅保存用户提供的地址文本，不再错误复制走失报告的坐标 | 已提交，待数据库验证 |
| 找到状态 | 模型增加 foundLocation、foundTime、currentStatus；控制器将确认找到请求映射为 found 状态并保存这些字段 | 已提交，待接口验证 |
| 寻回列表 | 使用模型中的 features 字段，移除不存在的 matchedPets 提示；“发现报告”改为“已找到” | 已提交，待验证 |
| API 类型 | 前端 LostPet/Clue 类型按后端模型调整，修正 species、reports、线索字段及可选坐标 | 已提交，待前端构建 |
| 图片上传请求 | 线索 FormData 交由浏览器设置 multipart boundary | 已提交，待上传验证 |

**重要限制：**
- 地理编码服务尚未接入，因此附近搜索和基于距离的自动匹配暂时不可用；这是为了避免错误定位误导用户，不代表该功能已完成。
- 从 Mongoose schema 移除 2dsphere 索引定义，不会自动保证既有 MongoDB 数据库中的旧索引已被删除。正式连接数据库后必须检查并按迁移方案处理旧索引。
- 确认找到字段目前只完成代码契约调整，尚未验证数据库保存、页面展示和权限边界。
- 本轮只进行了 GitHub 静态文件复核，未执行 TypeScript build、数据库迁移、真实 API 请求或浏览器端到端测试。

**本轮最后一次代码提交：** `db6cc7c478d6c6eac0393cf0ab3ae1bc73348416`。
