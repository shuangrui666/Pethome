import api from './axios'

export interface LoginData {
  usernameOrEmail: string
  password: string
}

export interface RegisterData {
  username: string
  email?: string
  password: string
  phone?: string
  role?: 'user' | 'admin' | 'shop' | 'kindergarten' | 'base'
}

export interface UserData {
  _id: string
  name: string
  email: string
  phone: string
  role: string
  avatar?: string
  verified?: boolean
  address?: string
  createdAt: string
}

// 注册
export const register = async (data: RegisterData) => {
  const response = await api.post('/auth/register', data)
  if (response.data.success) {
    return {
      token: response.data.data.token,
      user: response.data.data.user,
    }
  }
  throw new Error(response.data.message || '注册失败')
}

// 登录
export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data)
  if (response.data.success) {
    return {
      token: response.data.data.token,
      user: response.data.data.user,
    }
  }
  throw new Error(response.data.message || '登录失败')
}

// 登出
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}

// 获取当前用户信息
export const getMe = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// 更新用户资料
export const updateProfile = async (data: Partial<UserData>) => {
  const response = await api.put('/auth/profile', data)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// 实名认证
export const verifyIdentity = async (data: {
  idCard: string
  realName: string
  idCardFront: string
  idCardBack: string
}) => {
  const response = await api.post('/auth/verify', data)
  return response.data
}

// 获取用户信息
export const getUserById = async (userId: string) => {
  const response = await api.get(`/users/${userId}`)
  return response.data
}

// 更新用户信息
export const updateUser = async (userId: string, data: Partial<UserData>) => {
  const response = await api.put(`/users/${userId}`, data)
  return response.data
}

// 删除用户
export const deleteUser = async (userId: string) => {
  const response = await api.delete(`/users/${userId}`)
  return response.data
}

// 获取所有用户列表
export const getUsers = async () => {
  const response = await api.get('/users')
  return response.data
}
