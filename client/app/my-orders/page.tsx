'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Order {
  _id: string
  type: 'service' | 'shop' | 'kindergarten' | 'training' | 'medical'
  serviceName: string
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'
  totalAmount: number
  orderDate: string
  serviceDate?: string
  providerName: string
  description?: string
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadOrders()
  }, [statusFilter])

  const loadOrders = async () => {
    try {
      setLoading(true)
      // TODO: 调用实际的 API
      // const data = await getMyOrders({ status: statusFilter !== 'all' ? statusFilter : undefined })
      
      // 模拟数据
      const mockOrders: Order[] = [
        {
          _id: '1',
          type: 'service',
          serviceName: '上门遛狗服务',
          status: 'completed',
          totalAmount: 150,
          orderDate: '2024-01-15',
          serviceDate: '2024-01-16',
          providerName: '张三',
          description: '每天下午 5 点遛狗 1 小时',
        },
        {
          _id: '2',
          type: 'shop',
          serviceName: '宠物美容',
          status: 'confirmed',
          totalAmount: 280,
          orderDate: '2024-01-18',
          serviceDate: '2024-01-20',
          providerName: '宠爱生活美容店',
          description: '全身洗澡 + 美容修剪',
        },
        {
          _id: '3',
          type: 'kindergarten',
          serviceName: '狗狗幼儿园日托',
          status: 'in-progress',
          totalAmount: 200,
          orderDate: '2024-01-10',
          serviceDate: '2024-01-19',
          providerName: '快乐狗狗幼儿园',
          description: '工作日日托服务',
        },
        {
          _id: '4',
          type: 'training',
          serviceName: '基础训练课程',
          status: 'pending',
          totalAmount: 500,
          orderDate: '2024-01-17',
          serviceDate: '2024-01-22',
          providerName: '李教练',
          description: '5 节基础训练课',
        },
        {
          _id: '5',
          type: 'medical',
          serviceName: '宠物体检',
          status: 'cancelled',
          totalAmount: 380,
          orderDate: '2024-01-05',
          serviceDate: '2024-01-08',
          providerName: '宠物医院',
          description: '年度健康体检',
        },
      ]
      
      const filteredOrders = statusFilter === 'all'
        ? mockOrders
        : mockOrders.filter(order => order.status === statusFilter)
      
      setOrders(filteredOrders)
    } catch (error) {
      console.error('加载订单列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: 'bg-warning',
      confirmed: 'bg-info',
      'in-progress': 'bg-primary',
      completed: 'bg-success',
      cancelled: 'bg-danger',
    }
    const labels: any = {
      pending: '待确认',
      confirmed: '已确认',
      'in-progress': '进行中',
      completed: '已完成',
      cancelled: '已取消',
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
      default: return '📋'
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

  const handleCancelOrder = async (orderId: string) => {
    if (!confirm('确定要取消这个订单吗？')) return
    try {
      // TODO: 调用取消订单 API
      alert('订单已取消')
      loadOrders()
    } catch (error) {
      console.error('取消订单失败:', error)
      alert('取消失败，请稍后重试')
    }
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">📋 我的订单</h1>
          <p className="lead text-muted">查看所有服务订单和状态</p>
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
              className={`btn ${statusFilter === 'in-progress' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('in-progress')}
            >
              进行中
            </button>
            <button
              className={`btn ${statusFilter === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setStatusFilter('completed')}
            >
              已完成
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
      ) : orders.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '4rem' }}>📦</div>
          <h3>暂无订单</h3>
          <p className="text-muted">您还没有任何订单</p>
          <Link href="/service" className="btn btn-primary">
            浏览服务
          </Link>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="row align-items-start">
                    <div className="col-md-8">
                      <div className="d-flex align-items-start mb-2">
                        <span className="me-2" style={{ fontSize: '1.5rem' }}>
                          {getTypeIcon(order.type)}
                        </span>
                        <div className="flex-grow-1">
                          <h5 className="mb-1">{order.serviceName}</h5>
                          <small className="text-muted">
                            {getTypeText(order.type)} · 提供商：{order.providerName}
                          </small>
                        </div>
                      </div>
                      
                      {order.description && (
                        <p className="text-muted small mb-2">
                          {order.description}
                        </p>
                      )}
                      
                      <div className="small text-muted">
                        <div>订单日期：{new Date(order.orderDate).toLocaleDateString('zh-CN')}</div>
                        {order.serviceDate && (
                          <div>服务日期：{new Date(order.serviceDate).toLocaleDateString('zh-CN')}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <h4 className="text-primary mb-2">
                        ¥{order.totalAmount.toFixed(2)}
                      </h4>
                      <div className="mb-2">
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="d-grid gap-2">
                        {order.status === 'pending' || order.status === 'confirmed' ? (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            取消订单
                          </button>
                        ) : null}
                        {order.status === 'completed' ? (
                          <Link
                            href={`/orders/${order._id}/review`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            评价服务
                          </Link>
                        ) : null}
                        <Link
                          href={`/orders/${order._id}`}
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
