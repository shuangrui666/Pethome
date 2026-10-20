'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { createService } from '@/src/api/service'
import { getPets } from '@/src/api/pet'
import { getMe } from '@/src/api/auth'

interface Shop {
  _id: string
  name: string
  description: string
  type: string
  address: string
  phone: string
  email: string
  images: string[]
  rating: number
  reviewCount: number
  businessHours: {
    weekday: string
    weekend: string
  }
  services: Array<{
    _id: string
    name: string
    category: string
    price: number
    unit: string
    description: string
    duration: string
    images: string[]
  }>
  facilities: Array<{
    name: string
    icon: string
    description: string
  }>
  team: Array<{
    name: string
    role: string
    avatar: string
    experience: string
  }>
  testimonials: Array<{
    owner: string
    pet: string
    content: string
    rating: number
    date: string
  }>
  certifications: string[]
  promotions: Array<{
    title: string
    description: string
    validUntil: string
  }>
}

export default function ShopDetailPage() {
  const params = useParams()
  const [shop, setShop] = useState<Shop | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)
  const [pets, setPets] = useState<any[]>([])
  const [selectedPetId, setSelectedPetId] = useState<string>('')
  const [booking, setBooking] = useState({
    serviceName: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    petName: '',
    petType: 'dog',
    breed: '',
    ownerName: '',
    phone: '',
    notes: '',
  })

  // 完整的 7 个店铺模拟数据
  const mockShops: Shop[] = [
    {
      _id: '1',
      name: '宠爱有家宠物美容店',
      description: '专业宠物美容、医疗、寄养一站式服务，为您的爱宠提供高品质的护理体验。',
      type: 'pet_shop',
      address: '上海市浦东新区 xx 路 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'shop@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=450&fit=crop',
      ],
      rating: 4.7,
      reviewCount: 238,
      businessHours: {
        weekday: '09:00 - 20:00',
        weekend: '09:00 - 18:00',
      },
      services: [
        {
          _id: '1',
          name: '宠物美容',
          category: 'grooming',
          price: 150,
          unit: '次',
          description: '包括洗澡、剪毛、修指甲、清洁耳朵等全套美容服务',
          duration: '2-3 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '宠物寄养',
          category: 'boarding',
          price: 120,
          unit: '天',
          description: '舒适的寄养环境，24 小时监控，定时喂食和遛弯',
          duration: '按天计算',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
        {
          _id: '3',
          name: '宠物医疗',
          category: 'medical',
          price: 200,
          unit: '次',
          description: '基础健康检查、疫苗接种、疾病诊断等服务',
          duration: '30-60 分钟',
          images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop'],
        },
        {
          _id: '4',
          name: '宠物洗澡',
          category: 'grooming',
          price: 80,
          unit: '次',
          description: '专业宠物洗澡，使用高品质宠物专用洗护产品',
          duration: '1-2 小时',
          images: ['https://images.unsplash.com/photo-1585847357151-2a871595b4c4?w=300&h=200&fit=crop'],
        },
        {
          _id: '5',
          name: '宠物 SPA',
          category: 'grooming',
          price: 280,
          unit: '次',
          description: '高端宠物 SPA 护理，包括按摩、精油浴、毛发护理等',
          duration: '3-4 小时',
          images: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=300&h=200&fit=crop'],
        },
        {
          _id: '6',
          name: '宠物训练',
          category: 'training',
          price: 300,
          unit: '次',
          description: '基础服从训练、行为矫正等专业训练服务',
          duration: '1 小时',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '独立美容间', icon: '🚿', description: '每个宠物都有独立的美容空间' },
        { name: '24 小时监控', icon: '📹', description: '全程监控，随时查看宠物状态' },
        { name: '专业设备', icon: '🔧', description: '进口美容设备和医疗仪器' },
        { name: '舒适寄养区', icon: '🏠', description: '宽敞舒适的寄养环境' },
        { name: '户外活动区', icon: '🌳', description: '专门的户外活动场地' },
        { name: '休息等待区', icon: '☕', description: '主人等待的舒适区域' },
      ],
      team: [
        { name: '陈美容师', role: '高级美容师', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', experience: '10 年经验' },
        { name: '刘医生', role: '执业兽医', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', experience: '15 年经验' },
        { name: '王训练师', role: '专业训练师', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', experience: '8 年经验' },
      ],
      testimonials: [
        {
          owner: '赵女士',
          pet: '球球（比熊）',
          content: '美容师非常专业，球球做完美容后漂亮多了！服务也很贴心，会推荐给朋友。',
          rating: 5,
          date: '2024-01-15',
        },
        {
          owner: '钱先生',
          pet: '乐乐（金毛）',
          content: '寄养服务很好，乐乐在这里住了一周，回来时状态很好。监控很清晰，可以随时查看。',
          rating: 5,
          date: '2024-01-10',
        },
        {
          owner: '孙女士',
          pet: '豆豆（泰迪）',
          content: '医疗检查很仔细，医生很耐心。价格也很合理，是值得信赖的宠物店。',
          rating: 4,
          date: '2024-01-05',
        },
      ],
      certifications: [
        '宠物服务经营许可证',
        '动物防疫合格证',
        '宠物美容师资格证书',
        '执业兽医资格证书',
      ],
      promotions: [
        {
          title: '新客优惠',
          description: '首次到店享受 8 折优惠',
          validUntil: '2024-12-31',
        },
        {
          title: '会员折扣',
          description: '充值 1000 元送 200 元',
          validUntil: '2024-06-30',
        },
      ],
    },
    {
      _id: '2',
      name: '萌宠乐园宠物中心',
      description: '温馨如家的宠物服务中心，提供全方位的宠物护理和娱乐设施。',
      type: 'pet_shop',
      address: '上海市徐汇区 xx 大街 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'mengchong@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&h=450&fit=crop',
      ],
      rating: 4.8,
      reviewCount: 312,
      businessHours: {
        weekday: '08:00 - 21:00',
        weekend: '08:00 - 22:00',
      },
      services: [
        {
          _id: '1',
          name: '宠物美容',
          category: 'grooming',
          price: 160,
          unit: '次',
          description: '专业美容造型设计，让宠物焕然一新',
          duration: '2-3 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '宠物寄养',
          category: 'boarding',
          price: 150,
          unit: '天',
          description: '豪华寄养套房，每日拍照反馈',
          duration: '按天计算',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
        {
          _id: '3',
          name: '宠物派对',
          category: 'entertainment',
          price: 500,
          unit: '场',
          description: '为宠物举办生日派对、聚会等活动',
          duration: '3-4 小时',
          images: ['https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '室内游乐场', icon: '🎾', description: '大型室内宠物游乐场地' },
        { name: '游泳池', icon: '🏊', description: '专业宠物游泳训练' },
        { name: '摄影棚', icon: '📸', description: '宠物专业摄影服务' },
        { name: '休息区', icon: '🛋️', description: '主人休闲咖啡厅' },
      ],
      team: [
        { name: '李美容师', role: '造型师', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop', experience: '8 年经验' },
        { name: '张教练', role: '训练师', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop', experience: '12 年经验' },
      ],
      testimonials: [
        {
          owner: '周女士',
          pet: '糖糖（柯基）',
          content: '这里的环境太好了，糖糖每次来都玩得不想走！',
          rating: 5,
          date: '2024-01-20',
        },
      ],
      certifications: ['宠物服务经营许可证', '动物防疫合格证'],
      promotions: [
        {
          title: '体验套餐',
          description: '首次体验 5 折优惠',
          validUntil: '2024-12-31',
        },
      ],
    },
    {
      _id: '3',
      name: '汪星人精品店',
      description: '专注狗狗服务的精品店，提供高端宠物用品和专业服务。',
      type: 'pet_shop',
      address: '上海市长宁区 xx 路 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'wangxing@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=450&fit=crop',
      ],
      rating: 4.9,
      reviewCount: 186,
      businessHours: {
        weekday: '10:00 - 20:00',
        weekend: '10:00 - 21:00',
      },
      services: [
        {
          _id: '1',
          name: '高端美容',
          category: 'grooming',
          price: 300,
          unit: '次',
          description: '进口护理产品，专业造型设计',
          duration: '3-4 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '宠物摄影',
          category: 'photography',
          price: 800,
          unit: '套',
          description: '专业宠物摄影，精修 20 张',
          duration: '2 小时',
          images: ['https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '精品展示区', icon: '🛍️', description: '进口宠物用品' },
        { name: '美容沙龙', icon: '💇', description: '高端美容服务' },
        { name: '摄影棚', icon: '📷', description: '专业摄影设备' },
      ],
      team: [
        { name: '王造型师', role: '首席造型师', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop', experience: '15 年经验' },
      ],
      testimonials: [
        {
          owner: '吴先生',
          pet: '布丁（法斗）',
          content: '服务非常专业，造型效果超出预期！',
          rating: 5,
          date: '2024-01-18',
        },
      ],
      certifications: ['宠物服务经营许可证'],
      promotions: [],
    },
    {
      _id: '4',
      name: '喵星球宠物会所',
      description: '专为猫咪打造的精品会所，提供全方位的猫咪护理服务。',
      type: 'pet_shop',
      address: '上海市静安区 xx 路 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'miaoz@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1495360019602-e05980bf6794?w=800&h=450&fit=crop',
      ],
      rating: 4.6,
      reviewCount: 156,
      businessHours: {
        weekday: '09:30 - 20:30',
        weekend: '09:30 - 21:30',
      },
      services: [
        {
          _id: '1',
          name: '猫咪美容',
          category: 'grooming',
          price: 120,
          unit: '次',
          description: '专业猫咪美容，温和护理',
          duration: '1-2 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '猫咪寄养',
          category: 'boarding',
          price: 100,
          unit: '天',
          description: '独立猫房，24 小时监控',
          duration: '按天计算',
          images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '独立猫房', icon: '🏠', description: '每只猫咪独立空间' },
        { name: '攀爬架', icon: '🌲', description: '猫咪游乐设施' },
        { name: '监控室', icon: '📹', description: '随时查看猫咪状态' },
      ],
      team: [
        { name: '林美容师', role: '猫咪专家', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop', experience: '7 年经验' },
      ],
      testimonials: [
        {
          owner: '郑女士',
          pet: '咪咪（英短）',
          content: '对猫咪很专业，环境也很干净！',
          rating: 5,
          date: '2024-01-16',
        },
      ],
      certifications: ['宠物服务经营许可证', '动物防疫合格证'],
      promotions: [
        {
          title: '新猫到店',
          description: '首单 7 折优惠',
          validUntil: '2024-12-31',
        },
      ],
    },
    {
      _id: '5',
      name: '宠物乐园综合服务中心',
      description: '大型综合性宠物服务中心，提供一站式宠物护理、医疗、训练服务。',
      type: 'pet_shop',
      address: '上海市闵行区 xx 路 xx 号',
      phone: '021-xxxx-xxxx',
      email: '乐园@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1560743641-691c7705cf91?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=800&h=450&fit=crop',
      ],
      rating: 4.8,
      reviewCount: 428,
      businessHours: {
        weekday: '08:00 - 20:00',
        weekend: '08:00 - 20:00',
      },
      services: [
        {
          _id: '1',
          name: '综合美容',
          category: 'grooming',
          price: 140,
          unit: '次',
          description: '全套美容服务',
          duration: '2-3 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '宠物医疗',
          category: 'medical',
          price: 250,
          unit: '次',
          description: '专业兽医团队',
          duration: '30-60 分钟',
          images: ['https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&h=200&fit=crop'],
        },
        {
          _id: '3',
          name: '行为训练',
          category: 'training',
          price: 350,
          unit: '次',
          description: '专业行为矫正',
          duration: '1 小时',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '大型户外活动区', icon: '🌳', description: '500 平米户外活动场地' },
        { name: '医疗中心', icon: '🏥', description: '专业医疗设备' },
        { name: '寄养区', icon: '🏨', description: '豪华寄养套房' },
        { name: '训练场', icon: '🎯', description: '专业训练设施' },
      ],
      team: [
        { name: '赵医生', role: '首席兽医', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop', experience: '20 年经验' },
        { name: '孙训练师', role: '训练主管', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop', experience: '10 年经验' },
      ],
      testimonials: [
        {
          owner: '马先生',
          pet: '大黄（拉布拉多）',
          content: '一站式服务很方便，狗狗在这里玩得很开心！',
          rating: 5,
          date: '2024-01-22',
        },
      ],
      certifications: ['宠物服务经营许可证', '动物防疫合格证', '医疗机构执业许可证'],
      promotions: [
        {
          title: '会员卡',
          description: '充 2000 送 500',
          validUntil: '2024-12-31',
        },
      ],
    },
    {
      _id: '6',
      name: '爱宠小屋',
      description: '温馨小型宠物店，提供贴心的宠物护理服务。',
      type: 'pet_shop',
      address: '上海市黄浦区 xx 街 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'aichao@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=450&fit=crop',
      ],
      rating: 4.5,
      reviewCount: 98,
      businessHours: {
        weekday: '09:00 - 19:00',
        weekend: '09:00 - 18:00',
      },
      services: [
        {
          _id: '1',
          name: '基础美容',
          category: 'grooming',
          price: 100,
          unit: '次',
          description: '基础洗澡美容',
          duration: '1-2 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '寄养服务',
          category: 'boarding',
          price: 80,
          unit: '天',
          description: '温馨寄养环境',
          duration: '按天计算',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '美容间', icon: '🚿', description: '舒适美容空间' },
        { name: '寄养区', icon: '🏠', description: '温馨寄养环境' },
      ],
      team: [
        { name: '小美', role: '美容师', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop', experience: '5 年经验' },
      ],
      testimonials: [
        {
          owner: '李女士',
          pet: '小白（泰迪）',
          content: '小店很温馨，服务也很贴心！',
          rating: 5,
          date: '2024-01-14',
        },
      ],
      certifications: ['宠物服务经营许可证'],
      promotions: [],
    },
    {
      _id: '7',
      name: '宠物星球旗舰店',
      description: '高端宠物服务旗舰店，提供最优质的宠物护理和娱乐体验。',
      type: 'pet_shop',
      address: '上海市浦东新区 xx 大道 xx 号',
      phone: '021-xxxx-xxxx',
      email: 'planet@pethome.com',
      images: [
        'https://images.unsplash.com/photo-1560743641-691c7705cf91?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=800&h=450&fit=crop',
        'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=800&h=450&fit=crop',
      ],
      rating: 4.9,
      reviewCount: 562,
      businessHours: {
        weekday: '09:00 - 22:00',
        weekend: '09:00 - 23:00',
      },
      services: [
        {
          _id: '1',
          name: '至尊美容',
          category: 'grooming',
          price: 500,
          unit: '次',
          description: '顶级护理产品，明星造型师',
          duration: '4-5 小时',
          images: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=300&h=200&fit=crop'],
        },
        {
          _id: '2',
          name: '豪华寄养',
          category: 'boarding',
          price: 300,
          unit: '天',
          description: '套房寄养，每日视频反馈',
          duration: '按天计算',
          images: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop'],
        },
        {
          _id: '3',
          name: '宠物 SPA',
          category: 'spa',
          price: 680,
          unit: '次',
          description: '全方位 SPA 护理',
          duration: '4-6 小时',
          images: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=300&h=200&fit=crop'],
        },
      ],
      facilities: [
        { name: '豪华 SPA 中心', icon: '💆', description: '专业 SPA 护理' },
        { name: '室内泳池', icon: '🏊', description: '恒温宠物泳池' },
        { name: '豪华寄养套房', icon: '🏨', description: '五星级寄养环境' },
        { name: '娱乐中心', icon: '🎮', description: '宠物娱乐设施' },
        { name: '咖啡厅', icon: '☕', description: '主人休闲区' },
      ],
      team: [
        { name: '陈总监', role: '首席美容师', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop', experience: '20 年经验' },
        { name: '张医生', role: '兽医顾问', avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop', experience: '25 年经验' },
        { name: '李经理', role: '服务总监', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop', experience: '15 年经验' },
      ],
      testimonials: [
        {
          owner: '王总',
          pet: '公爵（阿拉斯加）',
          content: '服务无可挑剔，公爵在这里享受到了五星级的待遇！',
          rating: 5,
          date: '2024-01-25',
        },
      ],
      certifications: ['宠物服务经营许可证', '动物防疫合格证', '高端宠物服务认证'],
      promotions: [
        {
          title: 'VIP 会员',
          description: '充值 10000 送 3000',
          validUntil: '2024-12-31',
        },
      ],
    },
  ]

  // 根据路由参数动态加载店铺数据
  useEffect(() => {
    setLoading(true)
    const shopId = params.id as string
    const foundShop = mockShops.find((s) => s._id === shopId)
    setShop(foundShop || null)
    setLoading(false)
  }, [params.id])

  // 获取当前用户信息和宠物列表
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const userData = await getMe()
          setUser(userData.data || userData)
          
          // 获取用户宠物列表
          const petsData = await getPets()
          setPets(petsData.data || petsData)
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
      }
    }
    fetchUserInfo()
  }, [])

  const handleBookService = (service: any) => {
    setSelectedService(service._id)
    setBooking({
      serviceName: service.name,
      serviceType: service.category,
      appointmentDate: '',
      appointmentTime: '',
      petName: '',
      petType: 'dog',
      breed: '',
      ownerName: '',
      phone: '',
      notes: '',
    })
    setShowBookingForm(true)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!user || !shop) {
        alert('用户信息或店铺信息未加载，请稍后重试')
        return
      }

      if (!selectedPetId) {
        alert('请选择宠物')
        return
      }

      // 服务类型映射（前端服务类型→后端验证器接受的格式）
      const serviceTypeMap: { [key: string]: string } = {
        'dog-walking': 'walk',
        'grooming-home': 'grooming',
        'grooming-shop': 'grooming',
        'boarding': 'boarding',
      }

      // 将前端表单字段映射为后端格式
      const serviceData = {
        serviceType: serviceTypeMap[booking.serviceType] || 'grooming',
        providerId: shop._id,
        petId: selectedPetId,
        serviceDate: booking.appointmentDate,
        serviceTime: booking.appointmentTime,
        address: shop.address,
        specialRequirements: booking.notes,
        duration: 60,
      }

      // 调用预约 API
      await createService(serviceData)
      
      alert('预约成功！工作人员会尽快与您联系确认！')
      setShowBookingForm(false)
      setSelectedService(null)
      setBooking({
        serviceName: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: '',
        petName: '',
        petType: 'dog',
        breed: '',
        ownerName: '',
        phone: '',
        notes: '',
      })
      setSelectedPetId('')
    } catch (error: any) {
      console.error('预约失败:', error)
      const message = error.response?.data?.message || error.message || '提交失败，请稍后重试'
      alert(`提交失败：${message}`)
    }
  }

  const handleWatchLive = () => {
    alert('实时监控功能即将上线！')
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!shop) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-3">😕 店铺未找到</h2>
          <p className="text-muted mb-4">抱歉，您访问的店铺不存在或已被移除。</p>
          <Link href="/shop" className="btn btn-primary">
            ← 返回宠物店列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link href="/shop" className="btn btn-outline-secondary">
          ← 返回宠物店列表
        </Link>
      </div>

      {/* 顶部信息 */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-2">{shop.name}</h1>
          <div className="text-muted mb-2">
            <span>⭐ {shop.rating}</span>
            <span className="mx-2">|</span>
            <span>{shop.reviewCount}条评价</span>
            <span className="mx-2">|</span>
            <span>{shop.type === 'pet_shop' ? '宠物店' : '服务中心'}</span>
          </div>
          <p className="text-muted">{shop.description}</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg" onClick={handleWatchLive}>
              📹 实时监控
            </button>
            <a href={`tel:${shop.phone}`} className="btn btn-success btn-lg">
              📞 电话咨询
            </a>
          </div>
        </div>
      </div>

      {/* 图片轮播 */}
      <div id="shopCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
        <div className="carousel-inner rounded">
          {shop.images.map((img: string, index: number) => (
            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={img} className="d-block w-100" alt={shop.name} style={{ height: '500px', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#shopCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#shopCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>

      <div className="row">
        {/* 左侧内容 */}
        <div className="col-lg-8">
          {/* 优惠信息 */}
          {shop.promotions.length > 0 && (
            <div className="card mb-4 border-warning">
              <div className="card-header bg-warning">
                <h5 className="mb-0">🎉 优惠活动</h5>
              </div>
              <div className="card-body">
                <div className="row">
                  {shop.promotions.map((promo: any, index: number) => (
                    <div className="col-md-6 mb-2" key={index}>
                      <div className="alert alert-warning mb-0">
                        <strong>{promo.title}</strong>
                        <p className="mb-1 small">{promo.description}</p>
                        <small className="text-muted">有效期：{promo.validUntil}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 服务项目 */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">🛎️ 服务项目</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {shop.services.map((service: any) => (
                  <div className="col-md-6 mb-3" key={service._id}>
                    <div className="card h-100">
                      {service.images && service.images.length > 0 && (
                        <img src={service.images[0]} className="card-img-top" alt={service.name} style={{ height: '150px', objectFit: 'cover' }} />
                      )}
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="mb-0">{service.name}</h6>
                          <span className="badge bg-primary">¥{service.price}/{service.unit}</span>
                        </div>
                        <p className="small text-muted mb-2">{service.description}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">⏱️ {service.duration}</small>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => handleBookService(service)}
                          >
                            立即预约
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 设施 */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🏪 设施服务</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {shop.facilities.map((facility: any, index: number) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="text-center">
                      <div style={{ fontSize: '36px' }}>{facility.icon}</div>
                      <h6 className="mb-1">{facility.name}</h6>
                      <p className="small text-muted mb-0">{facility.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 专业团队 */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">👥 专业团队</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {shop.team.map((member: any, index: number) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="text-center">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="rounded-circle mb-2"
                        style={{ width: '80px', height: '80px' }}
                      />
                      <h6 className="mb-1">{member.name}</h6>
                      <p className="small text-muted mb-0">{member.role}</p>
                      <small className="badge bg-info">{member.experience}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 用户评价 */}
          <div className="card mb-4">
            <div className="card-header bg-warning">
              <h5 className="mb-0">💬 用户评价</h5>
            </div>
            <div className="card-body">
              {shop.testimonials.map((testimonial: any, index: number) => (
                <div className="mb-4 pb-4 border-bottom" key={index}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{testimonial.owner}</strong>
                      <span className="text-muted small ms-2">({testimonial.pet})</span>
                    </div>
                    <div className="text-end">
                      <div>{'⭐'.repeat(testimonial.rating)}</div>
                      <small className="text-muted">{testimonial.date}</small>
                    </div>
                  </div>
                  <p className="text-muted mb-0">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧信息栏 */}
        <div className="col-lg-4">
          {/* 联系方式 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📞 联系方式</h5>
            </div>
            <div className="card-body">
              <p className="mb-2"><strong>📍 地址：</strong>{shop.address}</p>
              <p className="mb-2"><strong>📞 电话：</strong>{shop.phone}</p>
              <p className="mb-2"><strong>📧 邮箱：</strong>{shop.email}</p>
              <p className="mb-0"><strong>🕐 营业时间：</strong><br />
                <small className="text-muted">{shop.businessHours}</small>
              </p>
            </div>
          </div>

          {/* 资质证书 */}
          {shop.certifications.length > 0 && (
            <div className="card mb-4">
              <div className="card-header bg-light">
                <h5 className="mb-0">📜 资质证书</h5>
              </div>
              <div className="card-body">
                <ul className="mb-0">
                  {shop.certifications.map((cert: any, index: number) => (
                    <li key={index} className="mb-2">✓ {cert.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 快速预约 */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">⚡ 快速预约</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => handleBookService(shop.services[0])}>
                  预约{shop.services[0].name}
                </button>
                <button className="btn btn-outline-primary" onClick={() => handleBookService(shop.services[1])}>
                  预约{shop.services[1].name}
                </button>
                <button className="btn btn-outline-success" onClick={handleWatchLive}>
                  📹 实时监控
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 预约弹窗 */}
      {showBookingForm && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📝 服务预约</h5>
                <button type="button" className="btn-close" onClick={() => setShowBookingForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="alert alert-info">
                    预约服务：<strong>{booking.serviceName}</strong>
                  </div>

                  <h6 className="mb-3">预约时间</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="appointmentDate" className="form-label">预约日期 *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        value={booking.appointmentDate}
                        onChange={(e) => setBooking({ ...booking, appointmentDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="appointmentTime" className="form-label">预约时间 *</label>
                      <input
                        type="time"
                        className="form-control"
                        id="appointmentTime"
                        value={booking.appointmentTime}
                        onChange={(e) => setBooking({ ...booking, appointmentTime: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <h6 className="mb-3">宠物信息</h6>
                  <div className="mb-3">
                    <label htmlFor="petSelect" className="form-label">选择宠物 *</label>
                    <select
                      className="form-select"
                      id="petSelect"
                      value={selectedPetId}
                      onChange={(e) => {
                        const pet = pets.find(p => p._id === e.target.value)
                        setSelectedPetId(e.target.value)
                        if (pet) {
                          setBooking({
                            ...booking,
                            petName: pet.name,
                            petType: pet.species === 'cat' ? 'cat' : 'dog',
                            breed: pet.breed || '混血',
                          })
                        }
                      }}
                      required
                    >
                      <option value="">请选择宠物</option>
                      {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {pet.name} ({pet.breed || '混血'})
                        </option>
                      ))}
                    </select>
                    {pets.length === 0 && (
                      <div className="form-text text-muted">您还没有添加宠物，请先手动填写宠物信息</div>
                    )}
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="petName" className="form-label">宠物姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="petName"
                        value={booking.petName}
                        onChange={(e) => setBooking({ ...booking, petName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="petType" className="form-label">宠物类型 *</label>
                      <select
                        className="form-select"
                        id="petType"
                        value={booking.petType}
                        onChange={(e) => setBooking({ ...booking, petType: e.target.value })}
                        required
                      >
                        <option value="dog">狗狗</option>
                        <option value="cat">猫咪</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="breed" className="form-label">品种 *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="breed"
                      value={booking.breed}
                      onChange={(e) => setBooking({ ...booking, breed: e.target.value })}
                      required
                    />
                  </div>

                  <h6 className="mb-3">联系人信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="ownerName" className="form-label">您的姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="ownerName"
                        value={booking.ownerName || (user ? (user.name || user.username) : '')}
                        onChange={(e) => setBooking({ ...booking, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">联系电话 *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={booking.phone || (user?.phone || '')}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">备注说明</label>
                    <textarea
                      className="form-control"
                      id="notes"
                      rows={3}
                      value={booking.notes}
                      onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                      placeholder="如有特殊需求或注意事项，请在此说明"
                    />
                  </div>

                  <div className="alert alert-warning">
                    ⚠️ 预约成功后，工作人员会尽快与您联系确认
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1">
                      提交预约
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowBookingForm(false)}
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
