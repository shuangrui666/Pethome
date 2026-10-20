'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { getTrainingById, bookTraining } from '../../../../src/api/training'

interface TrainingDetail {
  _id: string
  trainerName: string
  trainerPhoto?: string
  stage: string
  location: string
  description: string
  certifications?: string[]
  price: number
  rating: number
  reviewCount: number
  availableSlots: number
  photos?: string[]
  schedule?: string[]
  requirements?: string[]
}

export default function TrainingBookPage() {
  const params = useParams()
  const router = useRouter()
  const trainingId = params.id as string

  const [training, setTraining] = useState<TrainingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [bookingData, setBookingData] = useState({
    petName: '',
    petBreed: '',
    petAge: '',
    selectedDate: '',
    selectedTime: '',
    notes: '',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadTrainingDetail()
  }, [trainingId])

  const loadTrainingDetail = async () => {
    try {
      setLoading(true)
      const data = await getTrainingById(trainingId)
      setTraining(data.training)
    } catch (error) {
      console.error('加载训狗服务详情失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      await bookTraining(trainingId, bookingData)
      alert('预约成功！我们会尽快与您联系确认。')
      router.push('/training')
    } catch (error) {
      console.error('预约失败:', error)
      alert('预约失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  const getStageLabel = (stage: string) => {
    const labels: any = {
      basic: '基础训练',
      intermediate: '进阶训练',
      advanced: '高级训练',
    }
    return labels[stage] || stage
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!training) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h3>未找到训狗服务</h3>
          <Link href="/training" className="btn btn-primary mt-3">
            返回训练列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <Link href="/training" className="btn btn-outline-secondary mb-3">
            ← 返回训练列表
          </Link>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-7 mb-4">
          <div className="card">
            {training.photos?.[0] && (
              <img
                src={training.photos[0]}
                className="card-img-top"
                alt={training.trainerName}
                style={{ height: '300px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h2 className="card-title mb-0">{training.trainerName}</h2>
                <span className="badge bg-primary">{getStageLabel(training.stage)}</span>
              </div>
              
              <p className="text-muted mb-3">
                📍 {training.location}
              </p>
              
              <p className="card-text">{training.description}</p>
              
              {training.certifications && training.certifications.length > 0 && (
                <div className="mb-3">
                  <h5>🏆 资质证书</h5>
                  <ul className="list-unstyled">
                    {training.certifications.map((cert, idx) => (
                      <li key={idx} className="mb-1">• {cert}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {training.schedule && training.schedule.length > 0 && (
                <div className="mb-3">
                  <h5>📅 可预约时间</h5>
                  <div className="row">
                    {training.schedule.map((slot, idx) => (
                      <div key={idx} className="col-md-6 mb-2">
                        <span className="badge bg-light text-dark">
                          {slot}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {training.requirements && training.requirements.length > 0 && (
                <div className="alert alert-info">
                  <h5 className="alert-heading">📝 训练要求</h5>
                  <ul className="mb-0">
                    {training.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title mb-4">预约训练</h3>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">价格</span>
                  <span className="fw-bold">¥{training.price}/次</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">评分</span>
                  <span>⭐ {training.rating.toFixed(1)} ({training.reviewCount}评价)</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">剩余名额</span>
                  <span className="badge bg-success">{training.availableSlots}个</span>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">宠物姓名 *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={bookingData.petName}
                    onChange={(e) => setBookingData({...bookingData, petName: e.target.value})}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">宠物品种 *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    value={bookingData.petBreed}
                    onChange={(e) => setBookingData({...bookingData, petBreed: e.target.value})}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">宠物年龄 *</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="例如：1 岁 3 个月"
                    value={bookingData.petAge}
                    onChange={(e) => setBookingData({...bookingData, petAge: e.target.value})}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">预约日期 *</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={bookingData.selectedDate}
                    onChange={(e) => setBookingData({...bookingData, selectedDate: e.target.value})}
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label">预约时间 *</label>
                  <select
                    className="form-select"
                    required
                    value={bookingData.selectedTime}
                    onChange={(e) => setBookingData({...bookingData, selectedTime: e.target.value})}
                  >
                    <option value="">请选择时间</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                    <option value="17:00">17:00</option>
                  </select>
                </div>
                
                <div className="mb-3">
                  <label className="form-label">备注说明</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={bookingData.notes}
                    onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                    placeholder="请描述宠物的性格、特殊情况等"
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting || training.availableSlots === 0}
                >
                  {submitting ? '预约中...' : '确认预约'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
