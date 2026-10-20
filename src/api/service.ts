import api from './axios'

export interface Service {
  _id: string
  type: 'dog-walking' | 'grooming' | 'boarding' | 'training' | 'medical' | 'other'
  title: string
  description: string
  providerId: string
  provider?: any
  price: number
  duration: number // minutes
  photos?: string[]
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  address: string
  available: boolean
  rating: number
  reviewCount: number
  createdAt: string
  updatedAt: string
}

export interface ServiceBooking {
  _id: string
  serviceId: string
  service?: any
  userId: string
  user?: any
  providerId: string
  provider?: any
  date: string
  time: string
  duration: number
  totalPrice: number
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  notes?: string
  review?: {
    rating: number
    comment: string
  }
  createdAt: string
  updatedAt: string
}

// 创建服务
export const createService = async (data: Partial<Service>) => {
  const response = await api.post('/services', data)
  return response.data
}

// 获取服务列表
export const getServices = async (params?: {
  type?: string
  available?: boolean
  page?: number
  limit?: number
}) => {
  const response = await api.get('/services', { params })
  return response.data
}

// 获取单个服务
export const getServiceById = async (serviceId: string) => {
  const response = await api.get(`/services/${serviceId}`)
  return response.data
}

// 更新服务
export const updateService = async (serviceId: string, data: Partial<Service>) => {
  const response = await api.put(`/services/${serviceId}`, data)
  return response.data
}

// 删除服务
export const deleteService = async (serviceId: string) => {
  const response = await api.delete(`/services/${serviceId}`)
  return response.data
}

// 创建服务预约
export const createBooking = async (data: {
  serviceId: string
  date: string
  time: string
  notes?: string
}) => {
  const response = await api.post('/bookings', data)
  return response.data
}

// 获取我的预约
export const getMyBookings = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/bookings/my-bookings', { params })
  return response.data
}

// 获取预约详情
export const getBookingById = async (bookingId: string) => {
  const response = await api.get(`/bookings/${bookingId}`)
  return response.data
}

// 确认预约
export const confirmBooking = async (bookingId: string) => {
  const response = await api.patch(`/bookings/${bookingId}/confirm`)
  return response.data
}

// 更新预约状态
export const updateBookingStatus = async (
  bookingId: string,
  status: ServiceBooking['status']
) => {
  const response = await api.patch(`/bookings/${bookingId}/status`, { status })
  return response.data
}

// 取消预约
export const cancelBooking = async (bookingId: string) => {
  const response = await api.delete(`/bookings/${bookingId}`)
  return response.data
}

// 完成服务
export const completeBooking = async (bookingId: string) => {
  const response = await api.patch(`/bookings/${bookingId}/complete`)
  return response.data
}

// 评价服务
export const reviewBooking = async (
  bookingId: string,
  data: { rating: number; comment: string }
) => {
  const response = await api.post(`/bookings/${bookingId}/review`, data)
  return response.data
}

// 搜索附近服务
export const findNearbyServices = async (
  longitude: number,
  latitude: number,
  distance: number = 10,
  type?: string
) => {
  const response = await api.get('/services/nearby', {
    params: { longitude, latitude, distance, type },
  })
  return response.data
}
