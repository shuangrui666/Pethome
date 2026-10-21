'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getServices, Service } from '../../src/api/service'

// 模拟上门服务数据
const mockServices: Service[] = [
  {
    _id: 'service1',
    providerId: 'user1',
    providerName: '小李宠物服务',
    description: '专业遛狗师，5 年经验，热爱动物，耐心细心。可提供上门遛狗、喂食、清洁等服务。节假日正常服务！',
    serviceType: 'walking',
    price: 50,
    durationMinutes: 60,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    rating: 4.8,
    reviewCount: 126,
    availableSlots: 5,
    specialties: ['大型犬', '老年犬', '基础训练'],
    createdAt: '2024-12-01',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service2',
    providerId: 'user2',
    providerName: '爱心小喵',
    description: '猫咪专家长期照顾流浪猫，经验丰富。可提供上门喂食、换水、清理猫砂、陪玩等服务。出差旅行首选！',
    serviceType: 'feeding',
    price: 40,
    durationMinutes: 30,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
    rating: 4.9,
    reviewCount: 89,
    availableSlots: 8,
    specialties: ['猫咪行为', '多猫家庭', '老年猫'],
    createdAt: '2024-11-15',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service3',
    providerId: 'user3',
    providerName: '洁宠家政',
    description: '专业宠物家庭清洁服务，使用宠物安全的清洁剂，彻底清理毛发、异味、消毒杀菌。让家焕然一新！',
    serviceType: 'cleaning',
    price: 200,
    durationMinutes: 120,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    rating: 4.7,
    reviewCount: 54,
    availableSlots: 3,
    specialties: ['深度清洁', '除螨消毒', '异味处理'],
    createdAt: '2024-10-20',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service4',
    providerId: 'user4',
    providerName: '狗狗乐园',
    description: '资深训犬师提供上门遛狗服务，边遛狗边进行基础训练。让您的狗狗既锻炼身体又学会礼仪！',
    serviceType: 'walking',
    price: 80,
    durationMinutes: 90,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
    rating: 4.9,
    reviewCount: 203,
    availableSlots: 4,
    specialties: ['训犬', '行为矫正', '社交训练'],
    createdAt: '2024-09-10',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service5',
    providerId: 'user5',
    providerName: '宠物保姆小王',
    description: '全职宠物保姆，可长期或短期服务。遛狗、喂食、清洁、陪玩全包。出差、旅游、加班都不怕！',
    serviceType: 'all',
    price: 60,
    durationMinutes: 60,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800'],
    rating: 4.8,
    reviewCount: 167,
    availableSlots: 6,
    specialties: ['综合服务', '夜间照顾', '紧急响应'],
    createdAt: '2024-08-05',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service6',
    providerId: 'user6',
    providerName: '喵星人守护者',
    description: '专注猫咪服务 8 年，可提供日常喂食、换水、清理、陪玩、喂药等服务。理解猫咪习性，温柔耐心。',
    serviceType: 'feeding',
    price: 45,
    durationMinutes: 40,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    rating: 5.0,
    reviewCount: 78,
    availableSlots: 7,
    specialties: ['喂药护理', '行为观察', '多猫家庭'],
    createdAt: '2024-11-28',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'service7',
    providerId: 'user7',
    providerName: '宠物清洁专家',
    description: '专业宠物家庭清洁，使用进口宠物安全清洁剂。深度清洁、消毒除味、除螨杀菌，全方位呵护宠物健康。',
    serviceType: 'cleaning',
    price: 250,
    durationMinutes: 150,
    location: '广州市天河区',
    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    rating: 4.8,
    reviewCount: 92,
    availableSlots: 2,
    specialties: ['宠物安全清洁剂', '深度除螨', '异味彻底清除'],
    createdAt: '2024-10-15',
    updatedAt: '2025-01-20',
  },
]

export default function ServicePage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [distanceFilter, setDistanceFilter] = useState<string>('all')

  useEffect(() => {
    loadServices()
  }, [typeFilter, distanceFilter])

  const loadServices = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (typeFilter !== 'all') params.serviceType = typeFilter
      if (distanceFilter !== 'all') params.radius = parseInt(distanceFilter)

      const data = await getServices(params)
      const result = data.services || []
      // 如果 API 返回空数组，使用模拟数据
      setServices(result.length > 0 ? result : mockServices)
    } catch (error) {
      console.error('加载上门服务失败:', error)
      // API 失败时使用模拟数据
      setServices(mockServices)
    } finally {
      setLoading(false)
    }
  }

  const getServiceTypeBadge = (serviceType: string) => {
    const badges: any = {
      walking: 'bg-success',
      feeding: 'bg-warning',
      cleaning: 'bg-info',
      all: 'bg-secondary',
    }
    const labels: any = {
      walking: '上门遛狗',
      feeding: '上门喂食',
      cleaning: '上门清洁',
      all: '全部服务',
    }
    return (
      <span className={`badge ${badges[serviceType] || 'bg-secondary'}`}>
        {labels[serviceType] || serviceType}
      </span>
    )
  }

  const getServiceTypeIcon = (serviceType: string) => {
    const icons: any = {
      walking: '🐕',
      feeding: '🍖',
      cleaning: '🧹',
    }
    return icons[serviceType] || '📦'
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🏠 上门宠物服务</h1>
          <p className="lead text-muted">
            专业服务人员上门，让您的宠物在家也能享受贴心照顾
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3 mb-md-0">
          <label className="form-label">服务类型</label>
          <select
            className="form-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">全部服务</option>
            <option value="walking">上门遛狗</option>
            <option value="feeding">上门喂食</option>
            <option value="cleaning">上门清洁</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">服务范围</label>
          <select
            className="form-select"
            value={distanceFilter}
            onChange={(e) => setDistanceFilter(e.target.value)}
          >
            <option value="all">全部范围</option>
            <option value="3">3 公里内</option>
            <option value="5">5 公里内</option>
            <option value="10">10 公里内</option>
            <option value="20">20 公里内</option>
          </select>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/service/create" className="btn btn-success">
            📝 注册服务提供商
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无上门服务</h3>
          <p className="text-muted">成为第一个提供上门服务的宠物爱好者吧！</p>
          <Link href="/service/create" className="btn btn-primary">
            注册服务
          </Link>
        </div>
      ) : (
        <div className="row">
          {services.map((service) => (
            <div key={service._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {service.photos?.[0] && (
                  <img
                    src={service.photos[0]}
                    className="card-img-top"
                    alt={service.providerName}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{service.providerName}</h5>
                    {getServiceTypeBadge(service.serviceType)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>📍 {service.location}</small>
                  </p>
                  {service.distance && (
                    <p className="text-muted mb-2">
                      <small>📏 距离您：{service.distance.toFixed(1)}公里</small>
                    </p>
                  )}
                  <p className="card-text">
                    {service.description?.substring(0, 100)}...
                  </p>
                  
                  <div className="mb-2">
                    <small className="text-muted d-block">🕐 服务时长:</small>
                    <small className="d-block ms-3 text-muted">
                      • 每次 {service.durationMinutes || 30} 分钟
                    </small>
                  </div>
                  
                  {service.specialties && service.specialties.length > 0 && (
                    <div className="mb-2">
                      <small className="text-muted d-block">⭐ 擅长:</small>
                      {service.specialties.slice(0, 3).map((spec, idx) => (
                        <small key={idx} className="d-block ms-3">
                          • {spec}
                        </small>
                      ))}
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                      💰 价格：¥{service.price}/次
                    </span>
                    <span className="text-muted">
                      ⭐ {service.rating.toFixed(1)} ({service.reviewCount}评价)
                    </span>
                  </div>
                  
                  {service.availableSlots && service.availableSlots > 0 && (
                    <div className="alert alert-info mb-0">
                      <small>📅 今日剩余名额：{service.availableSlots}</small>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/service/${service._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/service/${service._id}/book`}
                    className="btn btn-primary w-100"
                  >
                    预约服务
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 服务说明 */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title mb-4">📋 服务说明</h3>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <h5>🐕 上门遛狗</h5>
                  <p className="text-muted mb-0">
                    专业遛狗师上门，为您的爱犬提供散步、玩耍和基础训练服务。
                    适合工作繁忙的宠物主人。
                  </p>
                </div>
                <div className="col-md-4 mb-3">
                  <h5>🍖 上门喂食</h5>
                  <p className="text-muted mb-0">
                    出差或旅行时，服务人员上门喂食、换水、清理猫砂盆，
                    确保宠物基本生活需求。
                  </p>
                </div>
                <div className="col-md-4 mb-3">
                  <h5>🧹 上门清洁</h5>
                  <p className="text-muted mb-0">
                    专业清洁人员上门清理宠物活动区域，消毒除味，
                    保持家居环境卫生。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
