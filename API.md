# PetHome API 文档

本文档记录了 PetHome 项目的所有 RESTful API 接口。

## 基础信息

- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`
- **认证方式**: JWT Bearer Token

---

## 认证接口 (Auth)

### POST /api/auth/register
用户注册

**请求体**:
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**响应**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### POST /api/auth/login
用户登录

**请求体**:
```json
{
  "email": "string",
  "password": "string"
}
```

**响应**:
```json
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

---

## 用户接口 (Users)

### GET /api/users/profile
获取用户个人信息（需要认证）

**Headers**: `Authorization: Bearer <token>`

**响应**:
```json
{
  "success": true,
  "user": {
    "id": "string",
    "username": "string",
    "email": "string",
    "phone": "string",
    "avatar": "string",
    "address": "string"
  }
}
```

### PUT /api/users/profile
更新用户个人信息

**Headers**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "username": "string",
  "phone": "string",
  "avatar": "string",
  "address": "string"
}
```

### PUT /api/users/password
修改密码

**Headers**: `Authorization: Bearer <token>`

**请求体**:
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

---

## 宠物接口 (Pets)

### GET /api/pets
获取宠物列表

**查询参数**:
- `page` (number): 页码，默认 1
- `limit` (number): 每页数量，默认 10
- `type` (string): 宠物类型（狗/猫/其他）
- `location` (string): 地理位置

**响应**:
```json
{
  "success": true,
  "pets": [...],
  "total": 100,
  "page": 1,
  "pages": 10
}
```

### GET /api/pets/:id
获取宠物详情

**响应**:
```json
{
  "success": true,
  "pet": {
    "id": "string",
    "name": "string",
    "type": "string",
    "breed": "string",
    "age": "number",
    "gender": "string",
    "color": "string",
    "weight": "number",
    "description": "string",
    "images": ["string"],
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "owner": {
      "id": "string",
      "username": "string",
      "avatar": "string"
    }
  }
}
```

### POST /api/pets
发布宠物信息（需要认证）

**Headers**: `Authorization: Bearer <token>`

**请求体**: 参考宠物详情结构

---

## 领养接口 (Adoption)

### GET /api/adoption
获取领养申请列表

### GET /api/adoption/:id
获取领养申请详情

### POST /api/adoption
提交领养申请

**请求体**:
```json
{
  "petId": "string",
  "applicantName": "string",
  "applicantPhone": "string",
  "applicantEmail": "string",
  "livingCondition": "string",
  "adoptionReason": "string",
  "hasOtherPets": "boolean"
}
```

### PUT /api/adoption/:id
更新领养申请状态（仅管理员）

**请求体**:
```json
{
  "status": "pending|approved|rejected"
}
```

---

## 走失宠物接口 (Lost-Pets)

### GET /api/lost-pets
获取走失宠物列表

**查询参数**:
- `page`: 页码
- `limit`: 每页数量
- `location`: 地理位置
- `status`: 状态（searching/found/resolved）

### POST /api/lost-pets
发布走失宠物信息

**请求体**:
```json
{
  "petName": "string",
  "petType": "string",
  "breed": "string",
  "color": "string",
  "lastSeenLocation": "string",
  "lastSeenTime": "date",
  "description": "string",
  "contactPhone": "string",
  "contactWeChat": "string",
  "reward": "number",
  "images": ["string"]
}
```

### PUT /api/lost-pets/:id
更新走失宠物状态

### POST /api/lost-pets/:id/clue
提交线索

**请求体**:
```json
{
  "clue": "string",
  "location": "string",
  "time": "date",
  "contactPhone": "string",
  "images": ["string"]
}
```

---

## 帖子接口 (Posts)

### GET /api/posts
获取社区帖子列表

### GET /api/posts/:id
获取帖子详情

### POST /api/posts
发布帖子

**请求体**:
```json
{
  "title": "string",
  "content": "string",
  "category": "string",
  "tags": ["string"],
  "images": ["string"]
}
```

### POST /api/posts/:id/comments
发表评论

### GET /api/posts/:id/likes
获取点赞列表

---

## 服务接口 (Services)

### GET /api/services
获取上门服务列表

### GET /api/services/:id
获取服务详情

### POST /api/services/:id/book
预约服务

**请求体**:
```json
{
  "serviceDate": "date",
  "serviceTime": "string",
  "address": "string",
  "notes": "string"
}
```

---

## 幼儿园接口 (Kindergarten)

### GET /api/kindergarten
获取幼儿园列表

### GET /api/kindergarten/:id
获取幼儿园详情

### POST /api/kindergarten/:id/enroll
报名幼儿园

**请求体**:
```json
{
  "petId": "string",
  "startDate": "date",
  "endDate": "date",
  "specialRequirements": "string"
}
```

---

## 店铺接口 (Shops)

### GET /api/shops
获取店铺列表

### GET /api/shops/:id
获取店铺详情

### GET /api/shops/:id/products
获取店铺商品列表

---

## 社交接口 (Social)

### GET /api/social/friends
获取好友列表

### POST /api/social/friends/request
发送好友请求

### PUT /api/social/friends/request/:id
处理好友请求

**请求体**:
```json
{
  "action": "accept|reject"
}
```

---

## 捐赠接口 (Donations)

### GET /api/donations
获取捐赠项目列表

### POST /api/donations
创建捐赠项目

### POST /api/donations/:id/donate
进行捐赠

**请求体**:
```json
{
  "amount": "number",
  "message": "string",
  "anonymous": "boolean"
}
```

---

## 医疗接口 (Medical)

### GET /api/medical
获取医院列表

### GET /api/medical/:id
获取医院详情

### GET /api/medical/:id/doctors
获取医生列表

### POST /api/medical/:id/appointment
预约就诊

**请求体**:
```json
{
  "doctorId": "string",
  "appointmentDate": "date",
  "appointmentTime": "string",
  "petId": "string",
  "symptoms": "string",
  "contactPhone": "string"
}
```

---

## 训狗接口 (Training)

### GET /api/training
获取训狗师列表

### GET /api/training/:id
获取训狗师详情

### POST /api/training/:id/book
预约训狗服务

**请求体**:
```json
{
  "trainingDate": "date",
  "trainingTime": "string",
  "trainingType": "string",
  "petId": "string",
  "trainingGoals": "string"
}
```

---

## 错误码说明

| 错误码 | 描述 |
|--------|------|
| 400 | 请求参数错误 |
| 401 | 未授权，需要登录 |
| 403 | 禁止访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

**错误响应格式**:
```json
{
  "success": false,
  "error": "错误描述",
  "code": "错误码"
}
```

---

## WebSocket 接口 (Socket.IO)

### 连接
```javascript
const socket = io('http://localhost:5000');
```

### 事件列表

#### 客户端 → 服务端

- `chat:message` - 发送聊天消息
- `notification:request` - 请求通知
- `typing:start` - 开始输入
- `typing:stop` - 停止输入

#### 服务端 → 客户端

- `chat:message` - 接收聊天消息
- `notification:new` - 新通知
- `typing:status` - 对方输入状态
- `friend:online` - 好友上线
- `friend:offline` - 好友下线

---

## 速率限制

- 普通接口：100 次/分钟
- 认证接口：10 次/分钟
- 文件上传：10 次/分钟

超过限制将返回 `429 Too Many Requests`。

---

## 文件上传

### 上传端点
所有支持图片上传的接口都使用 `multipart/form-data` 格式。

### 文件限制
- 最大文件大小：5MB
- 允许格式：JPG, PNG, GIF, WEBP
- 单次最多上传：10 张

---

*文档最后更新：2026 年*
