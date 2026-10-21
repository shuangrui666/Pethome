'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import {
  getKindergartenById,
  enrollPet,
  Kindergarten,
} from '../../../../src/api/kindergarten'
import { getPets, Pet } from '../../../../src/api/pet'

export default function EnrollmentPage() {
  const router = useRouter()
  const params = useParams()
  const kindergartenId = params.id as string

  const [kindergarten, setKindergarten] = useState<Kindergarten | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState(false)
  const [pets, setPets] = useState<Pet[]>([])
  const [loadingPets, setLoadingPets] = useState(false)

  const [formData, setFormData] = useState({
    petId: '',
    petName: '',
    petType: 'dog',
    petPhoto: '',
    ownerName: '',
    ownerPhone: '',
    startDate: '',
    notes: '',
  })

  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    loadKindergarten()
  }, [kindergartenId])

  const loadKindergarten = async () => {
    try {
      setLoading(true)
      const data = await getKindergartenById(kindergartenId)
      setKindergarten(data.kindergarten || data)
      // 加载宠物列表
      await loadPets()
    } catch (error) {
      console.error('加载幼儿园信息失败:', error)
      setError('无法加载幼儿园信息，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const loadPets = async () => {
    try {
      setLoadingPets(true)
      const data = await getPets()
      const petList = data.data || data || []
      setPets(petList)
    } catch (error) {
      console.error('加载宠物列表失败:', error)
      // 不显示错误，允许用户手动输入
    } finally {
      setLoadingPets(false)
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.petId) {
      newErrors.petId = '请选择宠物'
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = '请输入主人姓名'
    }

    if (!formData.ownerPhone.trim()) {
      newErrors.ownerPhone = '请输入联系电话'
    } else if (!/^1[3-9]\d{9}$/.test(formData.ownerPhone)) {
      newErrors.ownerPhone = '请输入有效的手机号码'
    }

    if (!formData.startDate) {
      newErrors.startDate = '请选择入园日期'
    } else {
      const selectedDate = new Date(formData.startDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.startDate = '入园日期不能早于今天'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!validateForm()) {
      return
    }

    try {
      setSubmitting(true)
      // 只发送 petId、startDate 和 notes 给后端
      await enrollPet(kindergartenId, {
        petId: formData.petId,
        startDate: formData.startDate,
        notes: formData.notes,
      })
      setSuccess(true)
      setTimeout(() => {
        router.push(`/kindergarten/${kindergartenId}`)
      }, 2000)
    } catch (err: any) {
      console.error('预约失败:', err)
      setError(err.response?.data?.message || '预约失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // 清除错误提示
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }))
    }
  }

  const handlePetSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const petId = e.target.value
    setFormData((prev) => ({ ...prev, petId }))
    // 清除错误提示
    if (errors.petId) {
      setErrors((prev: any) => ({ ...prev, petId: '' }))
    }

    // 选择宠物后自动填充宠物信息
    const selectedPet = pets.find(p => p._id === petId)
    if (selectedPet) {
      setFormData((prev) => ({
        ...prev,
        petId: selectedPet._id,
        petName: selectedPet.name,
        petType: selectedPet.species,
        petPhoto: selectedPet.images?.[0] || '',
      }))
    }
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

  if (!kindergarten) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h3>幼儿园不存在</h3>
          <Link href="/kindergarten" className="btn btn-primary mt-3">
            返回幼儿园列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/kindergarten">幼儿园列表</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/kindergarten/${kindergartenId}`}>{kindergarten.name}</Link>
              </li>
              <li className="breadcrumb-item active">预约入园</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">🎓 预约入园 - {kindergarten.name}</h4>
            </div>
            <div className="card-body">
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>预约成功！</strong> 我们将尽快与您联系确认详情。
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                  ></button>
                </div>
              )}

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  <strong>预约失败：</strong> {error}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                  ></button>
                </div>
              )}

              <div className="alert alert-info mb-4">
                <h6 className="alert-heading">📋 预约须知：</h6>
                <ul className="mb-0 small">
                  <li>请确保提供的联系方式准确无误</li>
                  <li>入园日期请选择未来日期</li>
                  <li>我们会在工作日内尽快与您确认预约</li>
                  <li>价格：¥{kindergarten.priceRange || '面议'}/天</li>
                </ul>
              </div>

              <form onSubmit={handleSubmit}>
                <h5 className="mb-3">🐕 宠物信息</h5>
                
                {pets.length > 0 ? (
                  <div className="mb-3">
                    <label htmlFor="petId" className="form-label">
                      选择宠物 <span className="text-danger">*</span>
                    </label>
                    <select
                      className={`form-select ${errors.petId ? 'is-invalid' : ''}`}
                      id="petId"
                      name="petId"
                      value={formData.petId}
                      onChange={handlePetSelect}
                    >
                      <option value="">请选择宠物</option>
                      {pets.map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {pet.name} ({pet.species === 'dog' ? '狗狗' : pet.species === 'cat' ? '猫咪' : pet.species})
                          - {pet.breed}
                        </option>
                      ))}
                    </select>
                    {errors.petId && (
                      <div className="invalid-feedback">{errors.petId}</div>
                    )}
                    <div className="form-text">
                      选择已有宠物后，下方信息将自动填充
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning mb-3">
                    <small>
                      📝 您还没有添加宠物，请手动填写下方宠物信息
                    </small>
                  </div>
                )}

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="petName" className="form-label">
                      宠物名字
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleChange}
                      placeholder="请输入宠物名字"
                      readOnly={formData.petId ? true : false}
                    />
                    <div className="form-text">
                      {formData.petId ? '已选择宠物，信息不可修改' : '请输入宠物名字'}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="petType" className="form-label">
                      宠物类型
                    </label>
                    <select
                      className="form-select"
                      id="petType"
                      name="petType"
                      value={formData.petType}
                      onChange={handleChange}
                      disabled={formData.petId ? true : false}
                    >
                      <option value="dog">狗狗</option>
                      <option value="cat">猫咪</option>
                      <option value="other">其他</option>
                    </select>
                    {formData.petId && (
                      <div className="form-text">已选择宠物，类型不可修改</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="petPhoto" className="form-label">
                    宠物照片链接（可选）
                  </label>
                  <input
                    type="url"
                    className="form-control"
                    id="petPhoto"
                    name="petPhoto"
                    value={formData.petPhoto}
                    onChange={handleChange}
                    placeholder="https://example.com/pet-photo.jpg"
                  />
                  <div className="form-text">
                    请输入宠物照片的 URL 链接
                  </div>
                </div>

                <hr className="my-4" />

                <h5 className="mb-3">👤 主人信息</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="ownerName" className="form-label">
                      主人姓名 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.ownerName ? 'is-invalid' : ''}`}
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      placeholder="请输入您的姓名"
                    />
                    {errors.ownerName && (
                      <div className="invalid-feedback">{errors.ownerName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="ownerPhone" className="form-label">
                      联系电话 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.ownerPhone ? 'is-invalid' : ''}`}
                      id="ownerPhone"
                      name="ownerPhone"
                      value={formData.ownerPhone}
                      onChange={handleChange}
                      placeholder="请输入手机号码"
                    />
                    {errors.ownerPhone && (
                      <div className="invalid-feedback">{errors.ownerPhone}</div>
                    )}
                  </div>
                </div>

                <hr className="my-4" />

                <h5 className="mb-3">📅 预约信息</h5>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="startDate" className="form-label">
                      入园日期 <span className="text-danger">*</span>
                    </label>
                    <input
                      type="date"
                      className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                    {errors.startDate && (
                      <div className="invalid-feedback">{errors.startDate}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    备注说明（可选）
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    rows={3}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="请说明特殊需求或注意事项（如宠物性格、饮食习惯、过敏信息等）"
                  ></textarea>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link
                    href={`/kindergarten/${kindergartenId}`}
                    className="btn btn-secondary"
                  >
                    取消
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>
                        提交中...
                      </>
                    ) : (
                      '提交预约'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
