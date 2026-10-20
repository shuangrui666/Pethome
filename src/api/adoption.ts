import api from './axios'

export interface Adoption {
  _id: string
  petId: string
  pet?: any
  applicantId: string
  applicant?: any
  applicantName?: string
  applicantPhone?: string
  applicantEmail?: string
  applicantAddress?: string
  livingSituation: 'own-house' | 'rent-house' | 'dormitory' | 'with-parents'
  otherPets: boolean
  familySupport: boolean
  experience: string
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'
  reviewComment?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

// 模拟宠物数据
const mockPetsData: Record<string, any> = {
  'pet1': {
    _id: 'pet1',
    name: '豆豆',
    species: 'dog',
    breed: '金毛',
    age: 2,
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
    description: '性格温顺，聪明听话，已经绝育和接种疫苗。',
  },
  'pet2': {
    _id: 'pet2',
    name: '小花',
    species: 'cat',
    breed: '中华田园猫',
    age: 1,
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
    description: '活泼可爱，喜欢撒娇，会用猫砂。',
  },
  'pet3': {
    _id: 'pet3',
    name: '旺财',
    species: 'dog',
    breed: '柯基',
    age: 3,
    images: ['https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800'],
    description: '精力充沛，喜欢玩耍，已经训练过基本指令。',
  },
  'pet4': {
    _id: 'pet4',
    name: '咪咪',
    species: 'cat',
    breed: '英短',
    age: 2,
    images: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800'],
    description: '安静温顺，适合室内饲养，已经绝育。',
  },
  'pet5': {
    _id: 'pet5',
    name: '球球',
    species: 'dog',
    breed: '比熊',
    age: 1,
    images: ['https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?w=800'],
    description: '小巧可爱，不掉毛，适合公寓饲养。',
  },
  'pet6': {
    _id: 'pet6',
    name: '黑宝',
    species: 'dog',
    breed: '拉布拉多',
    age: 4,
    images: ['https://images.unsplash.com/photo-1591015307520-3ef36fd7b515?w=800'],
    description: '忠诚护主，性格稳定，适合有院子家庭。',
  },
  'pet7': {
    _id: 'pet7',
    name: '雪球',
    species: 'cat',
    breed: '布偶猫',
    age: 2,
    images: ['https://images.unsplash.com/photo-1561948955-570b270e7c36?w=800'],
    description: '颜值超高，性格温顺，喜欢被抱。',
  },
}

// 模拟申请人数据
const mockApplicantsData: Record<string, any> = {
  'user1': {
    _id: 'user1',
    username: '张小姐',
    phone: '13800138001',
    email: 'user1@example.com',
    realName: '张女士',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    bio: '在广州生活五年，有稳定的工作和家庭',
  },
  'user2': {
    _id: 'user2',
    username: '李先生',
    phone: '13800138002',
    email: 'user2@example.com',
    realName: '李先生',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    bio: '有丰富的养狗经验，之前养过两只金毛',
  },
  'user3': {
    _id: 'user3',
    username: '王太太',
    phone: '13800138003',
    email: 'user3@example.com',
    realName: '王女士',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    bio: '兽医专业，有专业的养宠知识和经验',
  },
  'user4': {
    _id: 'user4',
    username: '陈先生',
    phone: '13800138004',
    email: 'user4@example.com',
    realName: '陈先生',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: '退休人士，有时间照顾宠物',
  },
  'user5': {
    _id: 'user5',
    username: '刘小姐',
    phone: '13800138005',
    email: 'user5@example.com',
    realName: '刘女士',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    bio: '兽医专业毕业，在宠物医院工作',
  },
  'user6': {
    _id: 'user6',
    username: '赵先生',
    phone: '13800138006',
    email: 'user6@example.com',
    realName: '赵先生',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    bio: '单身一人，希望有宠物陪伴',
  },
  'user7': {
    _id: 'user7',
    username: '周太太',
    phone: '13800138007',
    email: 'user7@example.com',
    realName: '周女士',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    bio: '有两个孩子，都特别喜欢小动物',
  },
}

// 模拟数据 - 领养详情
const mockAdoptionDetails: Record<string, Adoption> = {
  '1': {
    _id: '1',
    petId: mockPetsData['pet1'],
    applicantId: mockApplicantsData['user1'],
    reason: '我一直想养一只温顺的猫咪，这只小橘猫看起来很可爱。我有稳定的工作和收入，家里有足够的空间，家人也很支持我养宠物。',
    contactPhone: '13800138001',
    contactEmail: 'user1@example.com',
    livingCondition: '自有住房，两室一厅，有独立的阳台和宠物活动空间',
    hasOtherPets: false,
    familySupport: true,
    status: 'pending',
    createdAt: '2026-09-25T10:00:00.000Z',
    updatedAt: '2026-09-25T10:00:00.000Z',
  },
  '2': {
    _id: '2',
    petId: mockPetsData['pet2'],
    applicantId: mockApplicantsData['user2'],
    reason: '我已经有丰富的养狗经验，之前养过两只金毛。这只小狗看起来很健康，我想给它一个温暖的家。',
    contactPhone: '13800138002',
    contactEmail: 'user2@example.com',
    livingCondition: '租房，一室一厅，小区环境好，附近有公园可以遛狗',
    hasOtherPets: true,
    familySupport: true,
    status: 'approved',
    createdAt: '2026-09-24T14:30:00.000Z',
    updatedAt: '2026-09-25T09:00:00.000Z',
  },
  '3': {
    _id: '3',
    petId: mockPetsData['pet3'],
    applicantId: mockApplicantsData['user3'],
    reason: '我是一名兽医，有专业的养宠知识和经验。这只小猫需要特别的照顾，我相信我能给它最好的护理。',
    contactPhone: '13800138003',
    contactEmail: 'user3@example.com',
    livingCondition: '自有住房，三室一厅，有专门的宠物房间',
    hasOtherPets: true,
    familySupport: true,
    status: 'pending',
    createdAt: '2026-09-26T16:20:00.000Z',
    updatedAt: '2026-09-26T16:20:00.000Z',
  },
  '4': {
    _id: '4',
    petId: mockPetsData['pet4'],
    applicantId: mockApplicantsData['user4'],
    reason: '退休后有时间照顾宠物，这只拉布拉多看起来很活泼，正好陪我一起散步锻炼。',
    contactPhone: '13800138004',
    contactEmail: 'user4@example.com',
    livingCondition: '自有住房，一楼带院子，非常适合养狗',
    hasOtherPets: false,
    familySupport: true,
    status: 'pending',
    createdAt: '2026-09-27T09:15:00.000Z',
    updatedAt: '2026-09-27T09:15:00.000Z',
  },
  '5': {
    _id: '5',
    petId: mockPetsData['pet5'],
    applicantId: mockApplicantsData['user5'],
    reason: '我住在广州天河区，工作稳定，周末有时间陪伴宠物。这只小奶猫很可爱，想给它一个家。',
    contactPhone: '13800138005',
    contactEmail: 'user5@example.com',
    livingCondition: '租房，一居室，已经为宠物准备了安全的活动空间',
    hasOtherPets: false,
    familySupport: true,
    status: 'rejected',
    reviewComment: '居住空间较小，建议考虑更小的宠物',
    reviewedBy: '管理员',
    reviewedAt: '2026-09-27T15:00:00.000Z',
    createdAt: '2026-09-27T11:00:00.000Z',
    updatedAt: '2026-09-27T15:00:00.000Z',
  },
  '6': {
    _id: '6',
    petId: mockPetsData['pet6'],
    applicantId: mockApplicantsData['user6'],
    reason: '我是宠物爱好者，已经养了 3 只猫，这只美短看起来很健康，想给它找个好主人。',
    contactPhone: '13800138006',
    contactEmail: 'user6@example.com',
    livingCondition: '自有住房，大户型，有专门的猫房',
    hasOtherPets: true,
    familySupport: true,
    status: 'pending',
    createdAt: '2026-09-28T10:30:00.000Z',
    updatedAt: '2026-09-28T10:30:00.000Z',
  },
  '7': {
    _id: '7',
    petId: mockPetsData['pet7'],
    applicantId: mockApplicantsData['user7'],
    reason: '我在广州海珠区工作，每天回家可以陪伴宠物。这只边牧很聪明，我想训练它成为我的伙伴。',
    contactPhone: '13800138007',
    contactEmail: 'user7@example.com',
    livingCondition: '租房，两室一厅，小区附近有宠物公园',
    hasOtherPets: false,
    familySupport: true,
    status: 'completed',
    reviewedBy: '管理员',
    reviewedAt: '2026-09-28T14:00:00.000Z',
    createdAt: '2026-09-26T08:00:00.000Z',
    updatedAt: '2026-09-28T14:00:00.000Z',
  },
}

// 获取领养申请列表（需要认证）
export const getAdoptions = async (params?: {
  status?: string
  page?: number
  limit?: number
  petType?: string
}) => {
  const response = await api.get('/adoption', { params })
  // 后端返回 { success: true, adoptions: [...], pets: [...] }
  return {
    adoptions: response.data.adoptions || [],
    pets: response.data.pets || []
  }
}

// 创建领养申请
export const createAdoptionApplication = async (data: {
  petId: string
  reason: string
  applicantPhone: string
  applicantEmail: string
  applicantAddress: string
  livingSituation: 'own-house' | 'rent-house' | 'dormitory' | 'with-parents'
  otherPets: boolean
  familySupport: boolean
  experience: string
}) => {
  const response = await api.post('/adoption', data)
  return response.data
}

// 获取我的领养申请
export const getMyAdoptions = async (params?: {
  status?: string
  page?: number
  limit?: number
}) => {
  const response = await api.get('/adoption/my', { params })
  return response.data
}

// 获取领养申请详情
export const getAdoptionById = async (adoptionId: string) => {
  try {
    const response = await api.get(`/adoption/${adoptionId}`)
    return response.data
  } catch (error) {
    // Fallback 到模拟数据
    console.warn(`API 调用失败，使用模拟数据：${adoptionId}`)
    const mockData = mockAdoptionDetails[adoptionId]
    if (mockData) {
      return {
        success: true,
        data: mockData,
      }
    }
    throw new Error('未找到领养申请信息')
  }
}

// 审核领养申请（管理员/宠物主人）
export const reviewAdoption = async (
  adoptionId: string,
  status: 'approved' | 'rejected',
  comment?: string
) => {
  const response = await api.patch(`/adoption/${adoptionId}/review`, {
    status,
    comment,
  })
  return response.data
}

// 撤回领养申请
export const cancelAdoption = async (adoptionId: string) => {
  const response = await api.patch(`/adoption/${adoptionId}/cancel`)
  return response.data
}

// 完成领养
export const completeAdoption = async (adoptionId: string) => {
  const response = await api.patch(`/adoption/${adoptionId}/complete`)
  return response.data
}

// 获取待审核数量
export const getPendingCount = async () => {
  const response = await api.get('/adoption/pending-count')
  return response.data
}

// 获取宠物的领养申请列表
export const getPetAdoptions = async (petId: string) => {
  const response = await api.get(`/pets/${petId}/adoptions`)
  return response.data
}
