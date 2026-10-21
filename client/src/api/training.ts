import api from './axios'

export interface Training {
  _id: string
  title: string
  description: string
  trainerId: string
  trainer?: any
  type: 'obedience' | 'behavior' | 'agility' | 'socialization' | 'puppy' | 'advanced'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: number // weeks
  sessionsPerWeek: number
  sessionDuration: number // minutes
  price: number
  photos?: string[]
  location: {
    type: 'Point'
    coordinates: [number, number]
  }
  address: string
  maxStudents: number
  currentStudents: number
  available: boolean
  rating: number
  reviewCount: number
  curriculum: TrainingStage[]
  createdAt: string
  updatedAt: string
}

export interface TrainingStage {
  stage: number
  title: string
  objectives: string[]
  duration: number // weeks
  content: string[]
}

export interface TrainingEnrollment {
  _id: string
  trainingId: string
  training?: any
  petId: string
  pet?: any
  ownerId: string
  ownerName: string
  ownerPhone: string
  startDate: string
  status: 'pending' | 'active' | 'completed' | 'cancelled'
  progress: number // percentage
  notes?: string
  paymentStatus: 'pending' | 'paid' | 'refunded'
  createdAt: string
  updatedAt: string
}

export interface TrainingSession {
  _id: string
  trainingId: string
  sessionNumber: number
  date: string
  time: string
  duration: number // minutes
  content: string
  completed: boolean
  notes?: string
  photos?: string[]
  createdAt: string
  updatedAt: string
}

export interface TrainingProgress {
  _id: string
  enrollmentId: string
  sessionNumber: number
  completed: boolean
  notes?: string
  photos?: string[]
  completedAt?: string
  createdAt: string
  updatedAt: string
}

// 创建培训课程
export const createTraining = async (data: Partial<Training>) => {
  const response = await api.post('/training', data)
  return response.data
}

// 获取培训课程列表
export const getTrainings = async (params?: {
  type?: string
  level?: string
  available?: boolean
  page?: number
  limit?: number
}) => {
  const response = await api.get('/training', { params })
  return response.data
}

// 获取单个培训课程
export const getTrainingById = async (trainingId: string) => {
  const response = await api.get(`/training/${trainingId}`)
  return response.data
}

// 更新培训课程
export const updateTraining = async (trainingId: string, data: Partial<Training>) => {
  const response = await api.put(`/training/${trainingId}`, data)
  return response.data
}

// 删除培训课程
export const deleteTraining = async (trainingId: string) => {
  const response = await api.delete(`/training/${trainingId}`)
  return response.data
}

// 报名培训
export const enrollTraining = async (
  trainingId: string,
  data: {
    petId: string
    startDate: string
    notes?: string
  }
) => {
  const response = await api.post(`/training/${trainingId}/enroll`, data)
  return response.data
}

// 获取我的培训报名
export const getMyEnrollments = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/training/my-enrollments', { params })
  return response.data
}

// 获取培训课程的报名列表
export const getEnrollments = async (trainingId: string) => {
  const response = await api.get(`/training/${trainingId}/enrollments`)
  return response.data
}

// 更新报名状态
export const updateEnrollmentStatus = async (
  trainingId: string,
  enrollmentId: string,
  status: TrainingEnrollment['status']
) => {
  const response = await api.patch(
    `/training/${trainingId}/enrollments/${enrollmentId}/status`,
    { status }
  )
  return response.data
}

// 取消报名
export const cancelEnrollment = async (trainingId: string, enrollmentId: string) => {
  const response = await api.delete(
    `/training/${trainingId}/enrollments/${enrollmentId}`
  )
  return response.data
}

// 创建培训课程安排
export const createTrainingSession = async (
  trainingId: string,
  data: {
    sessionNumber: number
    date: string
    time: string
    duration: number
    content: string
  }
) => {
  const response = await api.post(`/training/${trainingId}/sessions`, data)
  return response.data
}

// 获取培训课程安排
export const getTrainingSessions = async (trainingId: string) => {
  const response = await api.get(`/training/${trainingId}/sessions`)
  return response.data
}

// 更新课程安排
export const updateTrainingSession = async (
  trainingId: string,
  sessionId: string,
  data: Partial<TrainingSession>
) => {
  const response = await api.patch(
    `/training/${trainingId}/sessions/${sessionId}`,
    data
  )
  return response.data
}

// 标记课程完成
export const completeSession = async (
  trainingId: string,
  sessionId: string,
  data?: { notes?: string; photos?: string[] }
) => {
  const response = await api.patch(
    `/training/${trainingId}/sessions/${sessionId}/complete`,
    data
  )
  return response.data
}

// 更新培训进度
export const updateProgress = async (
  enrollmentId: string,
  data: {
    sessionNumber: number
    completed: boolean
    notes?: string
    photos?: string[]
  }
) => {
  const response = await api.post(`/training/progress/${enrollmentId}`, data)
  return response.data
}

// 获取培训进度
export const getProgress = async (enrollmentId: string) => {
  const response = await api.get(`/training/progress/${enrollmentId}`)
  return response.data
}

// 搜索附近培训
export const findNearbyTrainings = async (
  longitude: number,
  latitude: number,
  distance: number = 10,
  type?: string
) => {
  const response = await api.get('/training/nearby', {
    params: { longitude, latitude, distance, type },
  })
  return response.data
}
