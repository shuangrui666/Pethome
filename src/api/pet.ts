import api from './axios'

export interface Pet {
  _id: string
  name: string
  species: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  gender: 'male' | 'female'
  color?: string
  weight?: number
  images: string[]
  description: string
  location: {
    type: 'Point'
    coordinates: [number, number] // [longitude, latitude]
  }
  address: string
  ownerId: string
  isAvailable: boolean
  isAdoptable: boolean
  sterilized?: boolean
  vaccinated?: boolean
  microchipped?: boolean
  createdAt: string
  updatedAt: string
}

// 创建宠物
export const createPet = async (data: Partial<Pet>) => {
  const response = await api.post('/pets', data)
  return response.data
}

// 获取宠物列表
export const getPets = async (params?: {
  type?: string
  isAdoptable?: boolean
  page?: number
  limit?: number
}) => {
  const response = await api.get('/pets', { params })
  return response.data
}

// 获取单个宠物
export const getPetById = async (petId: string) => {
  const response = await api.get(`/pets/${petId}`)
  return response.data.data
}

// 更新宠物
export const updatePet = async (petId: string, data: Partial<Pet>) => {
  const response = await api.put(`/pets/${petId}`, data)
  return response.data
}

// 删除宠物
export const deletePet = async (petId: string) => {
  const response = await api.delete(`/pets/${petId}`)
  return response.data
}

// 搜索附近的宠物
export const findNearbyPets = async (
  longitude: number,
  latitude: number,
  distance: number = 10 // km
) => {
  const response = await api.get('/pets/nearby', {
    params: { longitude, latitude, distance },
  })
  return response.data
}

// 获取可领养的宠物
export const getAdoptablePets = async () => {
  const response = await api.get('/pets/adoptable')
  return response.data
}

// 更新宠物状态
export const updatePetStatus = async (petId: string, isAvailable: boolean) => {
  const response = await api.patch(`/pets/${petId}/status`, { isAvailable })
  return response.data
}
