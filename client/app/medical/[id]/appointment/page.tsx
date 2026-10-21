'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getClinicById, createAppointment, Clinic, Appointment } from '../../../../src/api/medical'

export default function AppointmentPage() {
  const router = useRouter()
  const params = useParams()
  const clinicId = params.id as string

  const [clinic, setClinic] = useState<Clinic | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [formData, setFormData] = useState({
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    petName: '',
    petType: 'dog',
    petAge: '',
    petWeight: '',
    symptoms: '',
    contactPhone: '',
    contactEmail: '',
    notes: '',
  })

  useEffect(() => {
    loadClinic()
  }, [clinicId])

  const loadClinic = async () => {
    try {
      setLoading(true)
      const data = await getClinicById(clinicId)
      const clinicData = data.clinic || data
      setClinic(clinicData)
      
      // 如果有医生信息，自动填充
      if (clinicData.doctorInfo?.doctorName) {
        setFormData(prev => ({
          ...prev,
          doctorName: clinicData.doctorInfo.doctorName
        }))
      }
    } catch (error) {
      console.error('加载宠物医院信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const appointmentData: Partial<Appointment> = {
        clinicId,
        doctorName: formData.doctorName,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        petInfo: {
          name: formData.petName,
          type: formData.petType,
          age: formData.petAge,
          weight: formData.petWeight,
        },
        symptoms: formData.symptoms,
        contactInfo: {
          phone: formData.contactPhone,
          email: formData.contactEmail,
        },
        notes: formData.notes,
        status: 'pending',
      }

      await createAppointment(appointmentData)
      setSubmitSuccess(true)
      
      // 3 秒后跳转回医院详情页
      setTimeout(() => {
        router.push(`/medical/${clinicId}`)
      }, 3000)
    } catch (error) {
      console.error('提交预约失败:', error)
      alert('预约提交失败，请稍后重试')
    } finally {
      setSubmitting(false)
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

  if (!clinic) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h3>宠物医院不存在</h3>
          <Link href="/medical" className="btn btn-primary mt-3">
            返回宠物医疗
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
                <Link href="/medical">宠物医疗</Link>
              </li>
              <li className="breadcrumb-item">
                <Link href={`/medical/${clinicId}`}>{clinic.name}</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">预约挂号</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">📅 预约挂号 - {clinic.name}</h3>
            </div>
            <div className="card-body">
              {submitSuccess ? (
                <div className="text-center py-5">
                  <div className="mb-4">
                    <svg className="bi bi-check-circle text-success" width="80" height="80" fill="currentColor">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                    </svg>
                  </div>
                  <h4>预约提交成功！</h4>
                  <p className="text-muted">我们会尽快与您联系确认预约事宜</p>
                  <Link href={`/medical/${clinicId}`} className="btn btn-primary">
                    返回医院详情
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* 医生信息 */}
                  <h5 className="mb-3">👨‍⚕️ 选择医生</h5>
                  <div className="mb-3">
                    <label htmlFor="doctorName" className="form-label">医生姓名 <span className="text-danger">*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="doctorName"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      required
                      placeholder="请输入医生姓名"
                    />
                  </div>

                  {/* 预约时间 */}
                  <h5 className="mb-3 mt-4">🕐 预约时间</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="appointmentDate" className="form-label">预约日期 <span className="text-danger">*</span></label>
                      <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        name="appointmentDate"
                        value={formData.appointmentDate}
                        onChange={handleChange}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="appointmentTime" className="form-label">预约时间 <span className="text-danger">*</span></label>
                      <input
                        type="time"
                        className="form-control"
                        id="appointmentTime"
                        name="appointmentTime"
                        value={formData.appointmentTime}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* 宠物信息 */}
                  <h5 className="mb-3 mt-4">🐾 宠物信息</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="petName" className="form-label">宠物姓名 <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        id="petName"
                        name="petName"
                        value={formData.petName}
                        onChange={handleChange}
                        required
                        placeholder="请输入宠物姓名"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="petType" className="form-label">宠物类型 <span className="text-danger">*</span></label>
                      <select
                        className="form-select"
                        id="petType"
                        name="petType"
                        value={formData.petType}
                        onChange={handleChange}
                        required
                      >
                        <option value="dog">🐕 狗</option>
                        <option value="cat">🐱 猫</option>
                        <option value="bird">🦜 鸟</option>
                        <option value="rabbit">🐰 兔子</option>
                        <option value="other">🐾 其他</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="petAge" className="form-label">年龄 <span className="text-danger">*</span></label>
                      <input
                        type="text"
                        className="form-control"
                        id="petAge"
                        name="petAge"
                        value={formData.petAge}
                        onChange={handleChange}
                        required
                        placeholder="例如：2 岁"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="petWeight" className="form-label">体重</label>
                      <input
                        type="text"
                        className="form-control"
                        id="petWeight"
                        name="petWeight"
                        value={formData.petWeight}
                        onChange={handleChange}
                        placeholder="例如：10kg"
                      />
                    </div>
                  </div>

                  {/* 症状描述 */}
                  <h5 className="mb-3 mt-4">🏥 症状描述</h5>
                  <div className="mb-3">
                    <label htmlFor="symptoms" className="form-label">主要症状 <span className="text-danger">*</span></label>
                    <textarea
                      className="form-control"
                      id="symptoms"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      rows={4}
                      required
                      placeholder="请详细描述宠物的症状，如：食欲不振、呕吐、咳嗽等"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="notes" className="form-label">其他备注</label>
                    <textarea
                      className="form-control"
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      rows={2}
                      placeholder="其他需要说明的信息"
                    ></textarea>
                  </div>

                  {/* 联系方式 */}
                  <h5 className="mb-3 mt-4">📞 联系方式</h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contactPhone" className="form-label">联系电话 <span className="text-danger">*</span></label>
                      <input
                        type="tel"
                        className="form-control"
                        id="contactPhone"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        required
                        placeholder="请输入联系电话"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="contactEmail" className="form-label">电子邮箱</label>
                      <input
                        type="email"
                        className="form-control"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="请输入电子邮箱"
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={submitting}
                    >
                      {submitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          提交中...
                        </>
                      ) : (
                        '确认预约'
                      )}
                    </button>
                    <Link href={`/medical/${clinicId}`} className="btn btn-outline-secondary">
                      取消预约
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
