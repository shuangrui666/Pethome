import api from './axios'

export interface LostPet {
  _id: string
  petName: string
  petType: 'dog' | 'cat' | 'other'
  breed: string
  color: string
  age: number
  gender: 'male' | 'female'
  images?: string[]
  description: string
  lostLocation: {
    type: 'Point'
    coordinates: [number, number]
    address: string
    city: string
    district: string
  }
  lostTime: string
  contactPhone: string
  contactWechat?: string
  reward?: number
  status: 'lost' | 'found' | 'returned' | 'closed'
  matchedPets?: string[]
  clues?: Clue[]
  reporterId: string
  createdAt: string
  updatedAt: string
}

export interface Clue {
  _id: string
  lostPetId: string
  clueType: 'sighting' | 'found' | 'other'
  description: string
  photo?: string
  location?: {
    type: 'Point'
    coordinates: [number, number]
  }
  address?: string
  time: string
  reporterName: string
  reporterPhone: string
  status: 'pending' | 'verified' | 'ignored'
  createdAt: string
}

// 创建走失宠物报告
export const createLostPet = async (data: Partial<LostPet> | FormData) => {
  // 如果是 FormData，让浏览器自动设置 content-type（包含正确的 boundary）
  const config: any = {}
  if (data instanceof FormData) {
    config.headers = {
      'Content-Type': undefined
    }
  }
  const response = await api.post('/lost-pets', data, config)
  return response.data
}

// 获取走失宠物列表
export const getLostPets = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/lost-pets', { params })
  return response.data
}

// 获取单个走失宠物
export const getLostPetById = async (lostPetId: string) => {
  const response = await api.get(`/lost-pets/${lostPetId}`)
  return response.data
}

// 更新走失宠物
export const updateLostPet = async (lostPetId: string, data: Partial<LostPet>) => {
  const response = await api.put(`/lost-pets/${lostPetId}`, data)
  return response.data
}

// 确认找到宠物
export const confirmFound = async (
  lostPetId: string,
  data: { foundLocation: string; foundTime: string; currentStatus: string }
) => {
  const response = await api.put(`/lost-pets/${lostPetId}/confirm-found`, data)
  return response.data
}

// 智能匹配相似宠物 (GET 请求)
export const matchLostPet = async (lostPetId: string) => {
  const response = await api.get(`/lost-pets/${lostPetId}/matches`)
  return response.data
}

// 我的走失报告
export const getMyLostPets = async () => {
  const response = await api.get('/lost-pets/my')
  return response.data
}

// 添加线索
export const addClue = async (
  lostPetId: string,
  data: FormData
) => {
  const response = await api.post(`/lost-pets/${lostPetId}/clue`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data
}

// 获取线索列表
export const getClues = async (lostPetId: string) => {
  // 线索通过 getLostPetById 返回，无需单独接口
  return getLostPetById(lostPetId)
}

// 搜索附近走失宠物
export const findNearbyLostPets = async (
  longitude: number,
  latitude: number,
  distance: number = 10
) => {
  const response = await api.get('/lost-pets/nearby', {
    params: { longitude, latitude, distance },
  })
  return response.data
}
