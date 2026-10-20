'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getAdoptionById } from '@/src/api/adoption'

interface ApplicantInfo {
  _id: string
  username: string
  phone?: string
  email?: string
  realName?: string
  avatar?: string
  bio?: string
}

interface PetInfo {
  _id: string
  name: string
  species: 'dog' | 'cat' | 'other'
  breed: string
  age: number
  images: string[]
  description: string
}

interface AdoptionDetail {
  _id: string
  petId: PetInfo
  applicantId: ApplicantInfo
  reason: string
  contactPhone: string
  contactEmail: string
  livingCondition: string
  hasOtherPets: boolean
  familySupport: boolean
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled'
  reviewComment?: string
  reviewedBy?: string
  reviewedAt?: string
  createdAt: string
  updatedAt: string
}

export default function AdoptionDetailPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adoption, setAdoption] = useState<AdoptionDetail | null>(null)
  const [application, setApplication] = useState({
    name: '',
    phone: '',
    address: '',
    reason: '',
    petExperience: '',
    housingType: 'rented',
    otherPets: false,
    familyApproval: true,
  })

  useEffect(() => {
    const fetchAdoptionDetail = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getAdoptionById(params.id as string)
        
        // 后端返回格式：{ success: true, data: application }
        const adoptionData: AdoptionDetail = {
          _id: response.data._id,
          petId: response.data.petId,
          applicantId: response.data.applicantId,
          reason: response.data.reason,
          contactPhone: response.data.contactPhone || '',
          contactEmail: response.data.contactEmail || '',
          livingCondition: response.data.livingCondition || '',
          hasOtherPets: response.data.hasOtherPets || false,
          familySupport: response.data.familySupport || false,
          status: response.data.status || 'pending',
          reviewComment: response.data.reviewComment,
          reviewedBy: response.data.reviewedBy,
          reviewedAt: response.data.reviewedAt,
          createdAt: response.data.createdAt,
          updatedAt: response.data.updatedAt,
        }
        
        setAdoption(adoptionData)
      } catch (err: any) {
        console.error('获取领养详情失败:', err)
        setError(err.response?.data?.message || '获取领养详情失败')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchAdoptionDetail()
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 调用提交领养申请 API
      // await submitAdoptionApplication(params.id, application)
      alert('领养申请已提交，请等待审核')
    } catch (error) {
      console.error('提交申请失败:', error)
      alert('提交失败，请稍后重试')
    }
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

  if (error || !adoption) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            {error || '未找到领养申请信息'}
          </div>
          <Link href="/adoption" className="btn btn-outline-secondary mt-3">
            ← 返回领养列表
          </Link>
        </div>
      </div>
    )
  }

  // 审核状态映射
  const statusConfig = {
    pending: { text: '待审核', color: 'warning' },
    approved: { text: '已通过', color: 'success' },
    rejected: { text: '已拒绝', color: 'danger' },
    completed: { text: '已完成', color: 'primary' },
    cancelled: { text: '已取消', color: 'secondary' },
  }

  return (
    <div className="container py-5">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link href="/adoption" className="btn btn-outline-secondary">
          ← 返回领养列表
        </Link>
      </div>

      <div className="row">
        {/* 左侧：领养申请详情 */}
        <div className="col-lg-7">
          {/* 宠物信息卡片 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h3 className="mb-0">🐾 宠物信息</h3>
            </div>
            <div className="card-body">
              {adoption.petId && (
                <>
                  {/* 宠物图片 */}
                  {adoption.petId.images && adoption.petId.images.length > 0 && (
                    <div id="petCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
                      <div className="carousel-inner rounded">
                        {adoption.petId.images.map((img: string, index: number) => (
                          <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img src={img} className="d-block w-100" alt={adoption.petId.name} style={{ height: '300px', objectFit: 'cover' }} />
                          </div>
                        ))}
                      </div>
                      <button className="carousel-control-prev" type="button" data-bs-target="#petCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      </button>
                      <button className="carousel-control-next" type="button" data-bs-target="#petCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      </button>
                    </div>
                  )}

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p className="mb-1"><strong>名字：</strong>{adoption.petId.name}</p>
                      <p className="mb-1"><strong>品种：</strong>{adoption.petId.breed}</p>
                      <p className="mb-1"><strong>种类：</strong>{adoption.petId.species === 'dog' ? '狗狗' : adoption.petId.species === 'cat' ? '猫咪' : '其他'}</p>
                    </div>
                    <div className="col-md-6">
                      <p className="mb-1"><strong>年龄：</strong>{adoption.petId.age} {adoption.petId.age ? (adoption.petId.age >= 1 ? '岁' : '个月') : '未知'}</p>
                    </div>
                  </div>

                  {/* 宠物介绍 */}
                  <h5 className="mb-3">📝 宠物介绍</h5>
                  <p className="text-muted">{adoption.petId.description || '暂无介绍'}</p>
                </>
              )}
            </div>
          </div>

          {/* 申请人信息卡片 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">👤 申请人信息</h5>
            </div>
            <div className="card-body">
              {adoption.applicantId && (
                <>
                  <div className="d-flex align-items-center mb-3">
                    {adoption.applicantId.avatar && (
                      <img src={adoption.applicantId.avatar} alt="头像" className="rounded-circle me-3" style={{ width: '60px', height: '60px' }} />
                    )}
                    <div className="flex-grow-1">
                      <h6 className="mb-1">{adoption.applicantId.username || '匿名用户'}</h6>
                      {adoption.applicantId.realName && <p className="mb-0 text-muted small">真实姓名：{adoption.applicantId.realName}</p>}
                    </div>
                  </div>
                  {adoption.contactPhone && <p className="mb-2"><strong>📞 联系电话：</strong>{adoption.contactPhone}</p>}
                  {adoption.contactEmail && <p className="mb-2"><strong>📧 邮箱：</strong>{adoption.contactEmail}</p>}
                </>
              )}
            </div>
          </div>

          {/* 领养理由卡片 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">💭 领养理由</h5>
            </div>
            <div className="card-body">
              <p className="mb-3">{adoption.reason || '暂无说明'}</p>
              
              {/* 养宠环境信息 */}
              <h6 className="mb-3">🏠 养宠环境</h6>
              <p className="mb-2"><strong>居住条件：</strong>{adoption.livingCondition || '未填写'}</p>
              <p className="mb-2"><strong>家中已有宠物：</strong>{adoption.hasOtherPets ? '是' : '否'}</p>
              <p className="mb-2"><strong>家人支持：</strong>{adoption.familySupport ? '是' : '否'}</p>
            </div>
          </div>

          {/* 审核信息卡片 */}
          {adoption.status !== 'pending' && (
            <div className="card">
              <div className="card-header bg-light">
                <h5 className="mb-0">📋 审核信息</h5>
              </div>
              <div className="card-body">
                {adoption.reviewedById && <p className="mb-2"><strong>审核人：</strong>{adoption.reviewedBy}</p>}
                {adoption.reviewedAt && <p className="mb-2"><strong>审核时间：</strong>{new Date(adoption.reviewedAt).toLocaleString('zh-CN')}</p>}
                {adoption.reviewComment && (
                  <>
                    <h6 className="mb-2">审核意见：</h6>
                    <p className="text-muted">{adoption.reviewComment}</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 右侧：领养申请表单 */}
        <div className="col-lg-5">
          <div className="card sticky-top" style={{ top: '80px' }}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">📋 申请领养</h5>
            </div>
            <div className="card-body">
              {/* 审核状态提示 */}
              {adoption.status !== 'pending' && (
                <div className={`alert alert-${statusConfig[adoption.status].color} mb-3`} role="alert">
                  <strong>当前状态：</strong>{statusConfig[adoption.status].text}
                </div>
              )}
              
              {adoption.status === 'approved' ? (
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5>恭喜！您的领养申请已通过</h5>
                  <p className="text-muted">请联系救助机构安排领养事宜</p>
                  <Link href="/contact" className="btn btn-primary">
                    联系救助机构
                  </Link>
                </div>
              ) : adoption.status === 'rejected' ? (
                <div className="text-center">
                  <div className="mb-3">
                    <i className="bi bi-x-circle-fill text-danger" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5>很抱歉，您的领养申请未通过</h5>
                  <p className="text-muted">您可以修改信息后重新申请</p>
                  <button type="button" className="btn btn-outline-primary" onClick={() => window.location.reload()}>
                    重新申请
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* 申请人信息 */}
                  <h6 className="mb-3">👤 申请人信息</h6>
                  
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">姓名 <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={application.name}
                      onChange={(e) => setApplication({ ...application, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">联系电话 <span className="text-danger">*</span></label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      value={application.phone}
                      onChange={(e) => setApplication({ ...application, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">居住地址 <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows={2}
                      value={application.address}
                      onChange={(e) => setApplication({ ...application, address: e.target.value })}
                      required
                    />
                  </div>

                  {/* 养宠环境 */}
                  <h6 className="mb-3 mt-4">🏠 养宠环境</h6>
                  
                  <div className="mb-3">
                    <label htmlFor="housingType" className="form-label">住房类型</label>
                    <select
                      className="form-select"
                      id="housingType"
                      value={application.housingType}
                      onChange={(e) => setApplication({ ...application, housingType: e.target.value })}
                    >
                      <option value="owned">自有住房</option>
                      <option value="rented">租房</option>
                      <option value="dormitory">宿舍</option>
                      <option value="other">其他</option>
                    </select>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="otherPets"
                      checked={application.otherPets}
                      onChange={(e) => setApplication({ ...application, otherPets: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="otherPets">
                      家中已有其他宠物
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="familyApproval"
                      checked={application.familyApproval}
                      onChange={(e) => setApplication({ ...application, familyApproval: e.target.checked })}
                      required
                    />
                    <label className="form-check-label" htmlFor="familyApproval">
                      家人同意养宠 <span className="text-danger">*</span>
                    </label>
                  </div>

                  {/* 领养理由 */}
                  <h6 className="mb-3 mt-4">💭 领养理由</h6>
                  
                  <div className="mb-3">
                    <label htmlFor="reason" className="form-label">为什么想领养这只宠物？</label>
                    <textarea
                      className="form-control"
                      id="reason"
                      rows={3}
                      value={application.reason}
                      onChange={(e) => setApplication({ ...application, reason: e.target.value })}
                      placeholder="请简述您想领养的原因和计划"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="petExperience" className="form-label">养宠经验</label>
                    <textarea
                      className="form-control"
                      id="petExperience"
                      rows={2}
                      value={application.petExperience}
                      onChange={(e) => setApplication({ ...application, petExperience: e.target.value })}
                      placeholder="请简述您的养宠经验"
                    />
                  </div>

                  {/* 提交按钮 */}
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      提交领养申请
                    </button>
                  </div>

                  <p className="text-muted small mt-3 mb-0">
                    <small>提交后，救助机构将在 3 个工作日内联系您进行审核。</small>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-4">
                  <h3 className="mb-0">{new Date(adoption.createdAt).toLocaleDateString('zh-CN')}</h3>
                  <p className="text-muted mb-0">📅 申请时间</p>
                </div>
                <div className="col-md-4">
                  <h3 className="mb-0">{new Date(adoption.updatedAt).toLocaleDateString('zh-CN')}</h3>
                  <p className="text-muted mb-0">🔄 更新时间</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
