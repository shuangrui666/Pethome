'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTrainings, Training } from '../../src/api/training'

// 模拟训狗服务数据
const mockTrainings: Training[] = [
  {
    _id: 'training1',
    trainerName: '王教练',
    description: '10 年专业训犬经验，国际认证训犬师。擅长正面强化训练法，让狗狗在快乐中学习。',
    location: '北京市朝阳区训练基地',
    stage: 'basic',
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'],
    price: 200,
    rating: 4.9,
    reviewCount: 156,
    availableSlots: 5,
    certifications: ['国际认证训犬师', '动物行为学学士', '正面训练认证']
  },
  {
    _id: 'training2',
    trainerName: '李教练',
    description: '专业服从性训练，解决狗狗行为问题。包括爆冲、乱叫、攻击等行为矫正。',
    location: '上海市浦东新区训练中心',
    stage: 'intermediate',
    photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
    price: 300,
    rating: 4.8,
    reviewCount: 203,
    availableSlots: 3,
    certifications: ['高级训犬师资格', '行为矫正专家']
  },
  {
    _id: 'training3',
    trainerName: '张教练',
    description: '高级专业技能训练，敏捷训练、搜救训练、护卫训练。适合有基础的狗狗挑战自我。',
    location: '广州市天河区训练场',
    stage: 'advanced',
    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
    price: 500,
    rating: 4.9,
    reviewCount: 89,
    availableSlots: 2,
    certifications: ['敏捷训练大师', '搜救犬训练师', '护卫犬专业认证']
  },
  {
    _id: 'training4',
    trainerName: '刘教练',
    description: '幼犬基础训练，从小培养良好习惯。社会化训练、定点大小便、基础指令等。',
    location: '深圳市南山区幼犬培训中心',
    stage: 'basic',
    photos: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800'],
    price: 180,
    rating: 4.7,
    reviewCount: 178,
    availableSlots: 8,
    certifications: ['幼犬训练专家', '动物行为咨询师']
  },
  {
    _id: 'training5',
    trainerName: '陈教练',
    description: '宠物行为矫正专家，解决各种顽固行为问题。耐心专业，效果显著。',
    location: '杭州市西湖区行为矫正中心',
    stage: 'intermediate',
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    price: 350,
    rating: 4.8,
    reviewCount: 145,
    availableSlots: 4,
    certifications: ['行为矫正高级认证', '宠物心理学硕士']
  },
  {
    _id: 'training6',
    trainerName: '赵教练',
    description: '专业敏捷训练，让狗狗在障碍赛中展现速度与激情。适合活跃好动的狗狗。',
    location: '成都市武侯区敏捷训练基地',
    stage: 'advanced',
    photos: ['https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800'],
    price: 450,
    rating: 4.9,
    reviewCount: 112,
    availableSlots: 3,
    certifications: ['敏捷训练冠军教练', '犬类运动专家']
  },
  {
    _id: 'training7',
    trainerName: '孙教练',
    description: '综合训练服务，从基础到高级一站式培训。根据狗狗特点定制个性化训练方案。',
    location: '重庆市渝中区综合训练中心',
    stage: 'basic',
    photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    price: 220,
    rating: 4.7,
    reviewCount: 167,
    availableSlots: 6,
    certifications: ['高级训犬师', '综合训练认证', '正面训练专家']
  },
]

export default function TrainingPage() {
  const [trainingServices, setTrainingServices] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)
  const [stageFilter, setStageFilter] = useState<string>('all')

  useEffect(() => {
    loadTrainings()
  }, [stageFilter])

  const loadTrainings = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (stageFilter !== 'all') params.stage = stageFilter

      const data = await getTrainings(params)
      const result = data.trainings || []
      // 如果 API 返回空数组，使用模拟数据
      setTrainingServices(result.length > 0 ? result : mockTrainings)
    } catch (error) {
      console.error('加载训狗服务失败:', error)
      // API 失败时使用模拟数据
      setTrainingServices(mockTrainings)
    } finally {
      setLoading(false)
    }
  }

  const getStageBadge = (stage: string) => {
    const badges: any = {
      basic: 'bg-success',
      intermediate: 'bg-warning',
      advanced: 'bg-danger',
      all: 'bg-secondary',
    }
    const labels: any = {
      basic: '基础训练',
      intermediate: '进阶训练',
      advanced: '高级训练',
      all: '全部阶段',
    }
    return (
      <span className={`badge ${badges[stage] || 'bg-secondary'}`}>
        {labels[stage] || stage}
      </span>
    )
  }

  const getStageDescription = (stage: string) => {
    const descriptions: any = {
      basic: '坐姿、卧姿、等待、召回等基础指令',
      intermediate: '随行、拒食、定点大小便等行为训练',
      advanced: '护卫、搜救、敏捷等专业技能训练',
    }
    return descriptions[stage] || ''
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🎾 训狗服务</h1>
          <p className="lead text-muted">
            专业训犬师提供分阶段训练服务，培养优秀狗狗
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              className={`btn ${stageFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStageFilter('all')}
            >
              全部
            </button>
            <button
              className={`btn ${stageFilter === 'basic' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStageFilter('basic')}
            >
              🟢 基础训练
            </button>
            <button
              className={`btn ${stageFilter === 'intermediate' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStageFilter('intermediate')}
            >
              🟡 进阶训练
            </button>
            <button
              className={`btn ${stageFilter === 'advanced' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStageFilter('advanced')}
            >
              🔴 高级训练
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/training/create" className="btn btn-success">
            🎾 注册训狗服务
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : trainingServices.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无训狗服务</h3>
          <p className="text-muted">成为第一个提供训狗服务的训犬师吧！</p>
          <Link href="/training/create" className="btn btn-primary">
            注册服务
          </Link>
        </div>
      ) : (
        <div className="row">
          {trainingServices.map((training) => (
            <div key={training._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {training.photos?.[0] && (
                  <img
                    src={training.photos[0]}
                    className="card-img-top"
                    alt={training.trainerName}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{training.trainerName}</h5>
                    {getStageBadge(training.stage)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>📍 {training.location}</small>
                  </p>
                  <p className="card-text">
                    {training.description?.substring(0, 100)}...
                  </p>
                  
                  <div className="mb-2">
                    <small className="text-muted d-block">📝 训练内容:</small>
                    <small className="d-block ms-3 text-muted">
                      {getStageDescription(training.stage)}
                    </small>
                  </div>
                  
                  {training.certifications && training.certifications.length > 0 && (
                    <div className="mb-2">
                      <small className="text-muted d-block">🏆 资质证书:</small>
                      {training.certifications.map((cert, idx) => (
                        <small key={idx} className="d-block ms-3">
                          • {cert}
                        </small>
                      ))}
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                      💰 价格：¥{training.price}/次
                    </span>
                    <span className="text-muted">
                      ⭐ {training.rating.toFixed(1)} ({training.reviewCount}评价)
                    </span>
                  </div>
                  
                  {training.availableSlots && training.availableSlots > 0 && (
                    <div className="alert alert-info mb-0">
                      <small>📅 剩余名额：{training.availableSlots}</small>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/training/${training._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/training/${training._id}/book`}
                    className="btn btn-primary w-100"
                  >
                    预约训练
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
