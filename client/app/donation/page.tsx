'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getDonations, Donation } from '../../src/api/donation'

// 模拟捐赠项目数据
const mockDonations: Donation[] = [
  {
    _id: 'donation1',
    title: '救助受伤流浪狗医疗费用',
    description: '在路边发现一只被车撞伤的流浪狗，已经送到宠物医院治疗，需要筹集手术费和后续康复费用。狗狗很坚强，希望能给它一个活下去的机会！',
    targetAmount: 5000,
    amountRaised: 3200,
    beneficiaryId: 'shelter1',
    beneficiaryType: 'shelter',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    category: 'medical',
    status: 'active',
    endDate: '2025-12-31',
    donorCount: 45,
    createdAt: '2025-01-10',
    updatedAt: '2025-01-20',
    location: '北京市朝阳区',
  },
  {
    _id: 'donation2',
    title: '冬季流浪猫保暖物资采购',
    description: '冬天到了，我们需要为街头的流浪猫购买保暖垫、猫窝和保温灯。让这些小生命能温暖度过寒冬。每一份爱心都很重要！',
    targetAmount: 3000,
    amountRaised: 2800,
    beneficiaryId: 'shelter2',
    beneficiaryType: 'shelter',
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
    category: 'shelter',
    status: 'active',
    endDate: '2025-02-28',
    donorCount: 62,
    createdAt: '2025-01-05',
    updatedAt: '2025-01-20',
    location: '上海市浦东新区',
  },
  {
    _id: 'donation3',
    title: '流浪狗狗粮紧急补给',
    description: '收容所粮仓即将见底，需要紧急采购狗粮来喂养 50 多只流浪狗。优质狗粮能让它们更健康，更快找到领养家庭。',
    targetAmount: 8000,
    amountRaised: 5600,
    beneficiaryId: 'shelter3',
    beneficiaryType: 'shelter',
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    category: 'food',
    status: 'urgent',
    endDate: '2025-01-25',
    donorCount: 78,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-20',
    location: '广州市天河区',
  },
  {
    _id: 'donation4',
    title: '残疾狗狗康复训练费用',
    description: '这只小狗天生后腿残疾，我们正在为它筹集康复训练和定制轮椅的费用。相信通过努力，它也能像其他狗狗一样快乐奔跑！',
    targetAmount: 6000,
    amountRaised: 4500,
    beneficiaryId: 'individual1',
    beneficiaryType: 'individual',
    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
    category: 'medical',
    status: 'active',
    endDate: '2025-03-15',
    donorCount: 56,
    createdAt: '2025-01-08',
    updatedAt: '2025-01-20',
    location: '深圳市南山区',
  },
  {
    _id: 'donation5',
    title: '流浪动物绝育公益项目',
    description: '从源头控制流浪动物数量，我们计划为 100 只流浪猫狗提供免费绝育服务。科学救助，负责任地关爱生命。',
    targetAmount: 15000,
    amountRaised: 12000,
    beneficiaryId: 'org1',
    beneficiaryType: 'organization',
    photos: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800'],
    category: 'medical',
    status: 'active',
    endDate: '2025-06-30',
    donorCount: 134,
    createdAt: '2024-12-20',
    updatedAt: '2025-01-20',
    location: '杭州市西湖区',
  },
  {
    _id: 'donation6',
    title: '救助站改造升级计划',
    description: '现有救助站设施老旧，我们需要筹集资金进行改造，包括改善通风系统、增加活动场地、升级医疗设备等，给毛孩子们更好的生活环境。',
    targetAmount: 50000,
    amountRaised: 28000,
    beneficiaryId: 'org2',
    beneficiaryType: 'organization',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    category: 'shelter',
    status: 'active',
    endDate: '2025-08-01',
    donorCount: 203,
    createdAt: '2024-11-15',
    updatedAt: '2025-01-20',
    location: '成都市武侯区',
  },
  {
    _id: 'donation7',
    title: '被遗弃老年犬临终关怀',
    description: '15 岁的老狗豆豆被主人遗弃，现在需要筹集费用为它提供最好的临终关怀服务，让它能在爱与温暖中度过最后时光。',
    targetAmount: 3000,
    amountRaised: 2950,
    beneficiaryId: 'shelter4',
    beneficiaryType: 'shelter',
    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    category: 'medical',
    status: 'completed',
    endDate: '2025-01-18',
    donorCount: 89,
    createdAt: '2024-12-25',
    updatedAt: '2025-01-18',
    location: '重庆市渝中区',
  },
]

export default function DonationPage() {
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadDonations()
  }, [statusFilter])

  const loadDonations = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (statusFilter !== 'all') params.status = statusFilter

      const data = await getDonations(params)
      const result = data.donations || []
      // 如果 API 返回空数组，使用模拟数据
      setDonations(result.length > 0 ? result : mockDonations)
    } catch (error) {
      console.error('加载捐赠项目失败:', error)
      // API 失败时使用模拟数据
      setDonations(mockDonations)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      ongoing: 'bg-success',
      completed: 'bg-secondary',
      urgent: 'bg-danger',
    }
    const labels: any = {
      ongoing: '进行中',
      completed: '已完成',
      urgent: '紧急',
    }
    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const getProgressPercentage = (raised: number, target: number) => {
    if (target === 0) return 0
    return Math.min(Math.round((raised / target) * 100), 100)
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">❤️ 捐赠流浪动物</h1>
          <p className="lead text-muted">
            您的每一份爱心，都能帮助流浪动物找到温暖的家
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              className={`btn ${statusFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('all')}
            >
              全部
            </button>
            <button
              className={`btn ${statusFilter === 'ongoing' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('ongoing')}
            >
              🟢 进行中
            </button>
            <button
              className={`btn ${statusFilter === 'urgent' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('urgent')}
            >
              🔴 紧急
            </button>
            <button
              className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('completed')}
            >
              ⚪ 已完成
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/donation/create" className="btn btn-success">
            ❤️ 发起捐赠
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : donations.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无捐赠项目</h3>
          <p className="text-muted">成为第一个发起捐赠的人吧！</p>
          <Link href="/donation/create" className="btn btn-primary">
            发起捐赠
          </Link>
        </div>
      ) : (
        <div className="row">
          {donations.map((donation) => {
            const progress = getProgressPercentage(
              donation.amountRaised || 0,
              donation.targetAmount || 1
            )
            
            return (
              <div key={donation._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  {donation.photos?.[0] && (
                    <img
                      src={donation.photos[0]}
                      className="card-img-top"
                      alt={donation.title}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{donation.title}</h5>
                      {getStatusBadge(donation.status)}
                    </div>
                    <p className="text-muted mb-2">
                      <small>📍 {donation.location || '线上'}</small>
                    </p>
                    <p className="card-text">
                      {donation.description?.substring(0, 100)}...
                    </p>
                    
                    {/* 进度条 */}
                    <div className="mb-2">
                      <div className="d-flex justify-content-between mb-1">
                        <small className="text-muted">
                          已筹集：¥{(donation.amountRaised || 0).toFixed(0)}
                        </small>
                        <small className="text-muted">
                          目标：¥{(donation.targetAmount || 0).toFixed(0)}
                        </small>
                      </div>
                      <div className="progress" style={{ height: '20px' }}>
                        <div
                          className={`progress-bar ${donation.status === 'urgent' ? 'bg-danger' : 'bg-success'}`}
                          role="progressbar"
                          style={{ width: `${progress}%` }}
                          aria-valuenow={progress}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          {progress}%
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between mt-2">
                      <span className="text-muted">
                        👥 {donation.donorCount || 0} 位捐赠者
                      </span>
                      <span className="text-muted">
                        🕐 {new Date(donation.createdAt).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
                    
                    {donation.expireAt && (
                      <div className="alert alert-warning mb-0 mt-2">
                        <small>⏰ 截止日期：{new Date(donation.expireAt).toLocaleDateString('zh-CN')}</small>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <Link
                      href={`/donation/${donation._id}`}
                      className="btn btn-outline-primary w-100 mb-2"
                    >
                      查看详情
                    </Link>
                    <Link
                      href={`/donation/${donation._id}/donate`}
                      className="btn btn-primary w-100"
                    >
                      立即捐赠
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* 收容所列表 */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="mb-4">🏠 合作收容所</h2>
        </div>
      </div>
      
      <div className="row">
        {[1, 2, 3].map((i) => (
          <div key={i} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-2">
                  爱心宠物收容所 {i}
                </h5>
                <p className="text-muted mb-2">
                  <small>📍 广州市天河区示例路 {i}号</small>
                </p>
                <p className="card-text">
                  我们致力于救助流浪动物，为它们提供暂时的庇护和医疗照顾，帮助它们找到温暖的家。
                </p>
                <div className="d-flex justify-content-between">
                  <span className="text-muted">
                    🐕 当前收容：{20 + i * 5}只
                  </span>
                  <span className="text-muted">
                    ❤️ 已成功领养：{50 + i * 10}只
                  </span>
                </div>
              </div>
              <div className="card-footer bg-transparent">
                <Link
                  href={`/donation/shelter/${i}`}
                  className="btn btn-outline-primary w-100"
                >
                  了解更多
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
