import api from './axios'

export interface Donation {
  _id: string
  title: string
  description: string
  targetAmount: number
  raisedAmount: number
  beneficiaryId: string
  beneficiaryType: 'shelter' | 'individual' | 'organization'
  beneficiary?: any
  photos?: string[]
  category: 'food' | 'medical' | 'shelter' | 'rescue' | 'other'
  status: 'active' | 'completed' | 'cancelled'
  endDate: string
  donorCount: number
  createdAt: string
  updatedAt: string
}

export interface DonationRecord {
  _id: string
  donationId: string
  donorId: string
  donor?: any
  amount: number
  paymentMethod: 'wechat' | 'alipay' | 'card' | 'cash'
  message?: string
  anonymous: boolean
  status: 'pending' | 'completed' | 'refunded'
  transactionId?: string
  createdAt: string
}

export interface Shelter {
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
  needs: string[]
  capacity: number
  currentCount: number
  rating: number
  reviewCount: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

// 创建捐赠项目
export const createDonation = async (data: Partial<Donation>) => {
  const response = await api.post('/donations', data)
  return response.data
}

// 获取捐赠项目列表
export const getDonations = async (params?: {
  category?: string
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/donations', { params })
  return response.data
}

// 获取单个捐赠项目
export const getDonationById = async (donationId: string) => {
  const response = await api.get(`/donations/${donationId}`)
  return response.data
}

// 更新捐赠项目
export const updateDonation = async (donationId: string, data: Partial<Donation>) => {
  const response = await api.put(`/donations/${donationId}`, data)
  return response.data
}

// 删除捐赠项目
export const deleteDonation = async (donationId: string) => {
  const response = await api.delete(`/donations/${donationId}`)
  return response.data
}

// 捐赠
export const donate = async (
  donationId: string,
  data: {
    amount: number
    paymentMethod: 'wechat' | 'alipay' | 'card' | 'cash'
    message?: string
    anonymous?: boolean
  }
) => {
  const response = await api.post(`/donations/${donationId}/donate`, data)
  return response.data
}

// 获取我的捐赠记录
export const getMyDonations = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/donations/my-donations', { params })
  return response.data
}

// 获取捐赠项目的捐赠记录
export const getDonationRecords = async (donationId: string) => {
  const response = await api.get(`/donations/${donationId}/records`)
  return response.data
}

// 创建收容所
export const createShelter = async (data: Partial<Shelter>) => {
  const response = await api.post('/shelters', data)
  return response.data
}

// 获取收容所列表
export const getShelters = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/shelters', { params })
  return response.data
}

// 获取单个收容所
export const getShelterById = async (shelterId: string) => {
  const response = await api.get(`/shelters/${shelterId}`)
  return response.data
}

// 更新收容所
export const updateShelter = async (shelterId: string, data: Partial<Shelter>) => {
  const response = await api.put(`/shelters/${shelterId}`, data)
  return response.data
}

// 删除收容所
export const deleteShelter = async (shelterId: string) => {
  const response = await api.delete(`/shelters/${shelterId}`)
  return response.data
}

// 获取收容所的需求
export const getShelterNeeds = async (shelterId: string) => {
  const response = await api.get(`/shelters/${shelterId}/needs`)
  return response.data
}

// 更新收容所需求
export const updateShelterNeeds = async (
  shelterId: string,
  needs: string[]
) => {
  const response = await api.patch(`/shelters/${shelterId}/needs`, { needs })
  return response.data
}

// 搜索附近收容所
export const findNearbyShelters = async (
  longitude: number,
  latitude: number,
  distance: number = 10
) => {
  const response = await api.get('/shelters/nearby', {
    params: { longitude, latitude, distance },
  })
  return response.data
}
