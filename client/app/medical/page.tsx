'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getClinics, Clinic } from '../../src/api/medical'

// 模拟宠物医院数据
const mockClinics: Clinic[] = [
  {
    _id: 'medical1',
    name: '仁爱宠物医院',
    description: '20 年老牌宠物医院，资深兽医团队，提供全面的健康检查、疫苗接种、疾病治疗等服务。',
    address: '北京市朝阳区健康大道 100 号',
    serviceType: 'consultation',
    photos: ['https://picsum.photos/800/600?random=10'],
    rating: 4.9,
    reviewCount: 523,
    is24Hours: false,
    doctorInfo: {
      doctorName: '张医生',
      title: '主任医师',
      experience: 20
    }
  },
  {
    _id: 'medical2',
    name: '宠物急诊中心',
    description: '24 小时急诊服务，随时为您的宠物提供紧急医疗救助。配备先进急救设备，专业急诊团队。',
    address: '上海市浦东新区急诊路 200 号',
    serviceType: 'emergency',
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    rating: 4.8,
    reviewCount: 412,
    is24Hours: true,
  },
  {
    _id: 'medical3',
    name: '健康宠物体检中心',
    description: '专业宠物体检机构，提供全面的健康评估和预防医学服务。科学体检方案，让宠物远离疾病。',
    address: '广州市天河区体检街 300 号',
    serviceType: 'checkup',
    photos: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800'],
    rating: 4.7,
    reviewCount: 289,
    is24Hours: false,
    checkupPackages: [
      { name: '基础体检套餐', price: 380 },
      { name: '全面体检套餐', price: 680 },
      { name: '老年犬/猫专项体检', price: 880 },
    ]
  },
  {
    _id: 'medical4',
    name: '爱宠疫苗接种站',
    description: '专业疫苗接种服务，进口疫苗保证，建立完整免疫档案。定期提醒，让宠物拥有健全免疫力。',
    address: '深圳市南山区疫苗路 400 号',
    serviceType: 'vaccination',
    photos: ['https://images.unsplash.com/photo-1544568100-847a948585b9?w=800'],
    rating: 4.8,
    reviewCount: 356,
    is24Hours: false,
  },
  {
    _id: 'medical5',
    name: '宠物外科专科医院',
    description: '专注宠物外科手术，微创手术技术，麻醉监护系统。经验丰富的外科团队，为宠物手术安全保驾护航。',
    address: '杭州市西湖区手术街 500 号',
    serviceType: 'surgery',
    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    rating: 4.9,
    reviewCount: 267,
    is24Hours: false,
  },
  {
    _id: 'medical6',
    name: '综合宠物医疗中心',
    description: '一站式宠物医疗服务，内科、外科、牙科、眼科、皮肤科全覆盖。先进设备，专业团队。',
    address: '成都市武侯区医疗街 600 号',
    serviceType: 'consultation',
    photos: ['https://picsum.photos/800/600?random=20'],
    rating: 4.7,
    reviewCount: 445,
    is24Hours: true,
    doctorInfo: {
      doctorName: '李医生',
      title: '副主任医师',
      experience: 15
    }
  },
  {
    _id: 'medical7',
    name: '宠物健康管理中心',
    description: '预防为主，治疗为辅。提供健康咨询、营养指导、行为训练等全方位健康管理服务。',
    address: '重庆市渝中区健康街 700 号',
    serviceType: 'checkup',
    photos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800'],
    rating: 4.6,
    reviewCount: 198,
    is24Hours: false,
    checkupPackages: [
      { name: '幼宠体检套餐', price: 280 },
      { name: '成宠体检套餐', price: 480 },
      { name: '孕宠专项检查', price: 580 },
    ]
  },
]

export default function MedicalPage() {
  const [medicalClinics, setMedicalClinics] = useState<Clinic[]>([])
  const [loading, setLoading] = useState(true)
  const [serviceFilter, setServiceFilter] = useState<string>('all')

  useEffect(() => {
    loadMedicals()
  }, [serviceFilter])

  const loadMedicals = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (serviceFilter !== 'all') params.emergency = serviceFilter === 'emergency'

      const data = await getClinics(params)
      const result = data.clinics || []
      // 如果 API 返回空数组，使用模拟数据
      setMedicalClinics(result.length > 0 ? result : mockClinics)
    } catch (error) {
      console.error('加载宠物医院信息失败:', error)
      // API 失败时使用模拟数据
      setMedicalClinics(mockClinics)
    } finally {
      setLoading(false)
    }
  }

  const getServiceBadge = (serviceType: string) => {
    const badges: any = {
      consultation: 'bg-primary',
      surgery: 'bg-danger',
      vaccination: 'bg-success',
      checkup: 'bg-info',
      emergency: 'bg-warning',
      all: 'bg-secondary',
    }
    const labels: any = {
      consultation: '门诊',
      surgery: '手术',
      vaccination: '疫苗',
      checkup: '体检',
      emergency: '急诊',
      all: '综合服务',
    }
    return (
      <span className={`badge ${badges[serviceType] || 'bg-secondary'}`}>
        {labels[serviceType] || serviceType}
      </span>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🏥 宠物医疗</h1>
          <p className="lead text-muted">
            专业的宠物医疗服务，守护爱宠健康
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              className={`btn ${serviceFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('all')}
            >
              全部
            </button>
            <button
              className={`btn ${serviceFilter === 'consultation' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('consultation')}
            >
              🩺 门诊
            </button>
            <button
              className={`btn ${serviceFilter === 'surgery' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('surgery')}
            >
              🔪 手术
            </button>
            <button
              className={`btn ${serviceFilter === 'vaccination' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('vaccination')}
            >
              💉 疫苗
            </button>
            <button
              className={`btn ${serviceFilter === 'checkup' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('checkup')}
            >
              📋 体检
            </button>
            <button
              className={`btn ${serviceFilter === 'emergency' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('emergency')}
            >
              🚨 急诊
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/medical/create" className="btn btn-success">
            🏪 注册宠物医院
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : medicalClinics.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无宠物医院信息</h3>
          <p className="text-muted">成为第一个注册的宠物医院吧！</p>
          <Link href="/medical/create" className="btn btn-primary">
            注册医院
          </Link>
        </div>
      ) : (
        <div className="row">
          {medicalClinics.map((clinic) => (
            <div key={clinic._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {clinic.photos?.[0] && (
                  <img
                    src={clinic.photos[0]}
                    className="card-img-top"
                    alt={clinic.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{clinic.name}</h5>
                    {getServiceBadge(clinic.serviceType)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>📍 {clinic.address}</small>
                  </p>
                  <p className="card-text">
                    {clinic.description?.substring(0, 100)}...
                  </p>
                  
                  {clinic.serviceType === 'consultation' && clinic.doctorInfo && (
                    <div className="mb-2">
                      <small className="text-muted d-block">👨‍⚕️ 医生信息:</small>
                      <small className="d-block ms-3">
                        • {clinic.doctorInfo.doctorName} - {clinic.doctorInfo.title}
                      </small>
                      <small className="d-block ms-3">
                        • 从业经验：{clinic.doctorInfo.experience}年
                      </small>
                    </div>
                  )}
                  
                  {clinic.serviceType === 'checkup' && clinic.checkupPackages && (
                    <div className="mb-2">
                      <small className="text-muted d-block">📋 体检套餐:</small>
                      {clinic.checkupPackages.map((pkg, idx) => (
                        <small key={idx} className="d-block ms-3">
                          • {pkg.name} - ¥{pkg.price}
                        </small>
                      ))}
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mt-2">
                    <span className="text-muted">
                      ⭐ {clinic.rating.toFixed(1)} ({clinic.reviewCount}评价)
                    </span>
                    {clinic.is24Hours && (
                      <span className="badge bg-danger">
                        🚨 24 小时营业
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/medical/${clinic._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/medical/${clinic._id}/appointment`}
                    className="btn btn-primary w-100"
                  >
                    预约挂号
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
