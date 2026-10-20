import api from './axios'

export interface MedicalRecord {
  _id: string
  petId: string
  pet?: any
  ownerId: string
  clinicId: string
  clinic?: any
  doctor?: string
  diagnosis: string
  symptoms: string[]
  treatment: string
  medications: Medication[]
  tests: Test[]
  visitDate: string
  followUpDate?: string
  totalCost: number
  notes?: string
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  price?: number
}

export interface Test {
  name: string
  result?: string
  status: 'pending' | 'completed' | 'cancelled'
  date?: string
  cost?: number
}

export interface Clinic {
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
  services: string[]
  workingHours: {
    day: string
    open: string
    close: string
  }[]
  doctors: Doctor[]
  rating: number
  reviewCount: number
  emergency: boolean
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Doctor {
  name: string
  specialty: string
  experience: number
  photo?: string
  available: boolean
}

export interface Medicine {
  _id: string
  name: string
  category: 'prescription' | 'otc' | 'supplement' | 'topical'
  description: string
  usage: string
  dosage: string
  sideEffects?: string[]
  contraindications?: string[]
  price: number
  stock: number
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface Appointment {
  _id: string
  clinicId: string
  clinic?: any
  petId: string
  pet?: any
  ownerId: string
  doctor?: string
  date: string
  time: string
  reason: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  createdAt: string
  updatedAt: string
}

// 创建医疗记录
export const createMedicalRecord = async (data: Partial<MedicalRecord>) => {
  const response = await api.post('/medical/records', data)
  return response.data
}

// 获取医疗记录列表
export const getMedicalRecords = async (params?: {
  petId?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/records', { params })
  return response.data
}

// 获取单个医疗记录
export const getMedicalRecordById = async (recordId: string) => {
  const response = await api.get(`/medical/records/${recordId}`)
  return response.data
}

// 更新医疗记录
export const updateMedicalRecord = async (
  recordId: string,
  data: Partial<MedicalRecord>
) => {
  const response = await api.put(`/medical/records/${recordId}`, data)
  return response.data
}

// 删除医疗记录
export const deleteMedicalRecord = async (recordId: string) => {
  const response = await api.delete(`/medical/records/${recordId}`)
  return response.data
}

// 获取我的宠物医疗记录
export const getMyMedicalRecords = async (params?: {
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/records/my-records', { params })
  return response.data
}

// 创建宠物医院/诊所
export const createClinic = async (data: Partial<Clinic>) => {
  const response = await api.post('/medical/clinics', data)
  return response.data
}

// 获取宠物医院/诊所列表
export const getClinics = async (params?: {
  emergency?: boolean
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/clinics', { params })
  return response.data
}

// 获取单个宠物医院/诊所
export const getClinicById = async (clinicId: string) => {
  const response = await api.get(`/medical/clinics/${clinicId}`)
  return response.data
}

// 更新宠物医院/诊所
export const updateClinic = async (clinicId: string, data: Partial<Clinic>) => {
  const response = await api.put(`/medical/clinics/${clinicId}`, data)
  return response.data
}

// 删除宠物医院/诊所
export const deleteClinic = async (clinicId: string) => {
  const response = await api.delete(`/medical/clinics/${clinicId}`)
  return response.data
}

// 预约就诊
export const createAppointment = async (data: {
  clinicId: string
  petId: string
  doctor?: string
  date: string
  time: string
  reason: string
  notes?: string
}) => {
  const response = await api.post('/medical/appointments', data)
  return response.data
}

// 获取我的预约
export const getMyAppointments = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/appointments/my-appointments', { params })
  return response.data
}

// 取消预约
export const cancelAppointment = async (appointmentId: string) => {
  const response = await api.delete(`/medical/appointments/${appointmentId}`)
  return response.data
}

// 获取药品列表
export const getMedicines = async (params?: {
  category?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/medicines', { params })
  return response.data
}

// 获取单个药品
export const getMedicineById = async (medicineId: string) => {
  const response = await api.get(`/medical/medicines/${medicineId}`)
  return response.data
}

// 搜索药品
export const searchMedicines = async (keyword: string, params?: {
  category?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/medical/medicines/search', {
    params: { keyword, ...params },
  })
  return response.data
}

// 获取推荐药品（基于诊断）
export const getRecommendedMedicines = async (diagnosis: string) => {
  const response = await api.get('/medical/medicines/recommend', {
    params: { diagnosis },
  })
  return response.data
}

// 搜索附近宠物医院
export const findNearbyClinics = async (
  longitude: number,
  latitude: number,
  distance: number = 10,
  emergency?: boolean
) => {
  const response = await api.get('/medical/clinics/nearby', {
    params: { longitude, latitude, distance, emergency },
  })
  return response.data
}
