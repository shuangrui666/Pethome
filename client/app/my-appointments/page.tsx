'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Appointment {
  _id: string
  type: 'service' | 'shop' | 'kindergarten' | 'training' | 'medical'
  serviceName: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  appointmentDate: string
  appointmentTime: string
  providerName: string
  petName: string
  notes?: string
}

export default function MyAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadAppointments()
  }, [statusFilter])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      // TODO: 调用实际的 API
      // const data = await getAppointments({ status: statusFilter !== 'all' ? statusFilter : undefined })
      
      // 模拟数据
      const mockAppointments: Appointment[] = [
        {
          _id: '1',
          type: 'service',
          serviceName: '上门遛狗',
          status: 'confirmed',
          appointmentDate: '2024-01-20',
          appointmentTime: '17:00',
          providerName: '张三',
          petName: '旺财',
          notes: '请在小区门口见面',
        },
        {
          _id: '2',
          type: 'shop',
          serviceName: '宠物美容',
          status: 'pending',
          appointmentDate: '2024-01-22',
          appointmentTime: '14:00',
          providerName: '宠爱生活美容店',
          petName: '小白',
          notes: '需要修剪毛发',
        },
        {
          _id: '3',
          type: 'kindergarten',
          serviceName: '日托服务',
          status: 'completed',
          appointmentDate: '2024-01-18',
          appointmentTime: '09:00',
          providerName: '快乐狗狗幼儿园',
          petName: '旺财',
          notes: '一周日托',
        },
        {
          _id: '4',
          type: 'training',
          serviceName: '基础训练',
          status: 'confirmed',
          appointmentDate: '2024-01-25',
          appointmentTime: '10:00',
          providerName: '李教练',
          petName: '旺财',
          notes: '第一次课程',
        },
        {
          _id: '5',
          type: 'medical',
          serviceName: '疫苗接种',
          status: 'cancelled',
          appointmentDate: '2024-01-15',
          appointmentTime: '15:00',
          providerName: '宠物医院',
          petName: '小白',
          notes: '年度疫苗',
        },
      ]
      
      const filteredAppointments = statusFilter === 'all'
        ? mockAppointments
        : mockAppointments.filter(app => app.status === statusFilter)
      
      setAppointments(filteredAppointments)
    } catch (error) {
      console.error('加载预约列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: 'bg-warning',
      confirmed: 'bg-info',
      cancelled: 'bg-danger',
      completed: 'bg-success',
    }
    const labels: any = {
      pending: '待确认',
      confirmed: '已确认',
      cancelled: '已取消',
      completed: '已完成',
    }
    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'service': return '🚶'
      case 'shop': return '💇'
      case 'kindergarten': return '🎒'
      case 'training': return '🎾'
      case 'medical': return '🏥'
      default: return '📅'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'service': return '上门服务'
      case 'shop': return '宠物店'
      case 'kindergarten': return '幼儿园'
      case 'training': return '训练'
      case 'medical': return '医疗'
      default: return type
    }
  }

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('确定要取消这个预约吗？')) return
    try {
      // TODO: 调用取消预约 API
      alert('预约已取消')
      loadAppointments()
    } catch (error) {
      console.error('取消预约失败:', error)
      alert('取消失败，请稍后重试')
    }
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">📅 我的预约</h1>
          <p className="lead text-muted">管理您的所有服务预约</p>
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
              className={`btn ${statusFilter === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('pending')}
            >
              待确认
            </button>
            <button
              className={`btn ${statusFilter === 'confirmed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('confirmed')}
            >
              已确认
            </button>
            <button
              className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('completed')}
            >
              已完成
            </button>
            <button
              className={`btn ${statusFilter === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('cancelled')}
            >
              已取消
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '4rem' }}>📅</div>
          <h3>暂无预约</h3>
          <p className="text-muted">您还没有任何预约</p>
          <Link href="/service" className="btn btn-primary">
            预约服务
          </Link>
        </div>
      ) : (
        <div className="row">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="col-12 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-md-8">
                      <div className="d-flex align-items-start mb-2">
                        <span className="me-2" style={{ fontSize: '1.5rem' }}>
                          {getTypeIcon(appointment.type)}
                        </span>
                        <div className="flex-grow-1">
                          <h5 className="mb-1">{appointment.serviceName}</h5>
                          <small className="text-muted">
                            {getTypeText(appointment.type)} · 服务宠物：{appointment.petName}
                          </small>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <span className="badge bg-light text-dark me-2">
                          📆 {new Date(appointment.appointmentDate).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="badge bg-light text-dark">
                          ⏰ {appointment.appointmentTime}
                        </span>
                      </div>
                      
                      {appointment.notes && (
                        <p className="text-muted small mb-0">
                          备注：{appointment.notes}
                        </p>
                      )}
                    </div>
                    
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <div className="mb-2">
                        {getStatusBadge(appointment.status)}
                      </div>
                      <div className="small text-muted mb-2">
                        提供商：{appointment.providerName}
                      </div>
                      <div className="d-grid gap-2">
                        {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancelAppointment(appointment._id)}
                          >
                            取消预约
                          </button>
                        )}
                        {appointment.status === 'completed' && (
                          <Link
                            href={`/appointments/${appointment._id}/review`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            评价
                          </Link>
                        )}
                        <Link
                          href={`/appointments/${appointment._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          查看详情
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
