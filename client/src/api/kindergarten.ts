import api from './axios'
import { getSocket } from './socket'

export interface Kindergarten {
  _id: string
  name: string
  description: string
  address: string
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  phone: string
  email?: string
  photos?: string[]
  facilities: string[]
  priceRange: string
  rating: number
  reviewCount: number
  availableSlots: number
  certifications?: string[]
  operatingHours?: string
  owner_id: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Enrollment {
  _id: string
  kindergartenId: string
  petName: string
  petType: string
  petPhoto?: string
  ownerId: string
  ownerName: string
  ownerPhone: string
  startDate: string
  endDate?: string
  status: 'active' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Review {
  _id: string
  kindergartenId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// 创建幼儿园
export const createKindergarten = async (data: Partial<Kindergarten>) => {
  const response = await api.post('/kindergartens', data)
  return response.data
}

// 获取幼儿园列表
export const getKindergartens = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/kindergartens', { params })
  return response.data
}

// 获取单个幼儿园
export const getKindergartenById = async (kindergartenId: string) => {
  const response = await api.get(`/kindergartens/${kindergartenId}`)
  return response.data
}

// 更新幼儿园
export const updateKindergarten = async (
  kindergartenId: string,
  data: Partial<Kindergarten>
) => {
  const response = await api.put(`/kindergartens/${kindergartenId}`, data)
  return response.data
}

// 删除幼儿园
export const deleteKindergarten = async (kindergartenId: string) => {
  const response = await api.delete(`/kindergartens/${kindergartenId}`)
  return response.data
}

// 入园
export const enrollPet = async (
  kindergartenId: string,
  data: {
    petName: string
    petType: string
    petPhoto?: string
    ownerName: string
    ownerPhone: string
    startDate: string
    notes?: string
  }
) => {
  const response = await api.post(`/kindergartens/${kindergartenId}/enroll`, data)
  return response.data
}

// 退园
export const withdrawPet = async (
  kindergartenId: string,
  enrollmentId: string,
  data?: { endDate?: string; notes?: string }
) => {
  const response = await api.patch(
    `/kindergartens/${kindergartenId}/withdraw/${enrollmentId}`,
    data
  )
  return response.data
}

// 获取我的宠物入园信息
export const getMyEnrollments = async () => {
  const response = await api.get('/kindergartens/my-enrollments')
  return response.data
}

// 获取幼儿园的入园列表
export const getEnrollments = async (kindergartenId: string) => {
  const response = await api.get(`/kindergartens/${kindergartenId}/enrollments`)
  return response.data
}

// 连接实时监控
export const connectToLiveStream = (
  kindergartenId: string,
  onStreamData: (data: any) => void
) => {
  const socket = getSocket()
  
  socket.on(`kindergarten-${kindergartenId}-stream`, onStreamData)
  
  return socket
}

// 断开实时监控
export const disconnectFromLiveStream = (kindergartenId: string) => {
  const socket = getSocket()
  socket.off(`kindergarten-${kindergartenId}-stream`)
}

// 添加评价
export const addReview = async (
  kindergartenId: string,
  data: { rating: number; comment: string }
) => {
  const response = await api.post(`/kindergartens/${kindergartenId}/reviews`, data)
  return response.data
}

// 获取评价列表
export const getReviews = async (kindergartenId: string) => {
  const response = await api.get(`/kindergartens/${kindergartenId}/reviews`)
  return response.data
}

// 搜索附近幼儿园
export const findNearbyKindergartens = async (
  longitude: number,
  latitude: number,
  distance: number = 10
) => {
  const response = await api.get('/kindergartens/nearby', {
    params: { longitude, latitude, distance },
  })
  return response.data
}
