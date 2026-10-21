import api from './axios'
import { getSocket } from './socket'

export interface Shop {
  _id: string
  name: string
  description: string
  type: 'grooming' | 'boarding' | 'retail' | 'medical' | 'mixed'
  address: string
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  phone: string
  email?: string
  photos?: string[]
  services: ShopService[]
  priceRange: string
  workingHours: {
    day: string
    open: string
    close: string
  }[]
  rating: number
  reviewCount: number
  owner_id: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface ShopService {
  _id?: string
  name: string
  description: string
  price: number
  duration: number // minutes
}

export interface ShopReview {
  _id: string
  shopId: string
  userId: string
  userName: string
  rating: number
  comment: string
  createdAt: string
}

// 创建宠物店
export const createShop = async (data: Partial<Shop>) => {
  const response = await api.post('/shops', data)
  return response.data
}

// 获取宠物店列表
export const getShops = async (params?: {
  type?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/shops', { params })
  return response.data
}

// 获取单个宠物店
export const getShopById = async (shopId: string) => {
  const response = await api.get(`/shops/${shopId}`)
  return response.data
}

// 获取宠物店的服务列表
export const getShopServices = async (shopId?: string) => {
  if (shopId) {
    const response = await api.get(`/shops/${shopId}/services`)
    return response.data
  }
  // 如果没有 shopId，获取所有服务
  const response = await api.get('/shops/services')
  return response.data
}

// 更新宠物店
export const updateShop = async (shopId: string, data: Partial<Shop>) => {
  const response = await api.put(`/shops/${shopId}`, data)
  return response.data
}

// 删除宠物店
export const deleteShop = async (shopId: string) => {
  const response = await api.delete(`/shops/${shopId}`)
  return response.data
}

// 管理服务
export const addService = async (
  shopId: string,
  service: Omit<ShopService, '_id'>
) => {
  const response = await api.post(`/shops/${shopId}/services`, service)
  return response.data
}

export const updateService = async (
  shopId: string,
  serviceId: string,
  service: Partial<ShopService>
) => {
  const response = await api.patch(
    `/shops/${shopId}/services/${serviceId}`,
    service
  )
  return response.data
}

export const removeService = async (shopId: string, serviceId: string) => {
  const response = await api.delete(`/shops/${shopId}/services/${serviceId}`)
  return response.data
}

// 连接实时监控
export const connectToShopStream = (
  shopId: string,
  onStreamData: (data: any) => void
) => {
  const socket = getSocket()
  
  socket.on(`shop-${shopId}-stream`, onStreamData)
  
  return socket
}

// 断开实时监控
export const disconnectFromShopStream = (shopId: string) => {
  const socket = getSocket()
  socket.off(`shop-${shopId}-stream`)
}

// 添加评价
export const addShopReview = async (
  shopId: string,
  data: { rating: number; comment: string }
) => {
  const response = await api.post(`/shops/${shopId}/reviews`, data)
  return response.data
}

// 获取评价列表
export const getShopReviews = async (shopId: string) => {
  const response = await api.get(`/shops/${shopId}/reviews`)
  return response.data
}

// 搜索附近宠物店
export const findNearbyShops = async (
  longitude: number,
  latitude: number,
  distance: number = 10,
  type?: string
) => {
  const response = await api.get('/shops/nearby', {
    params: { longitude, latitude, distance, type },
  })
  return response.data
}
