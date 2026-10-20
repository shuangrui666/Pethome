'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUserProfile, updateUserProfile, User } from '../../src/api/auth'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    avatar: '',
  })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      setLoading(true)
      const data = await getUserProfile()
      setUser(data.user)
      setFormData({
        username: data.user.username || '',
        email: data.user.email || '',
        phone: data.user.phone || '',
        avatar: data.user.avatar || '',
      })
    } catch (error) {
      console.error('加载用户信息失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateUserProfile(formData)
      alert('资料更新成功！')
      setEditing(false)
      loadProfile()
    } catch (error) {
      console.error('更新资料失败:', error)
      alert('更新失败，请稍后重试')
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

  if (!user) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h3>未登录</h3>
          <p className="text-muted">请先登录以访问个人中心</p>
          <Link href="/auth/login" className="btn btn-primary">
            去登录
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">👤 个人中心</h1>
        </div>
      </div>

      <div className="row">
        {/* 左侧信息卡片 */}
        <div className="col-lg-4 mb-4">
          <div className="card">
            <div className="card-body text-center">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="rounded-circle mb-3"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
              ) : (
                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mb-3 mx-auto"
                  style={{ width: '120px', height: '120px', fontSize: '3rem' }}>
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              )}
              <h4 className="card-title mb-1">{user.username}</h4>
              <p className="text-muted mb-3">
                {user.role === 'user' && '普通用户'}
                {user.role === 'shop' && '宠物店'}
                {user.role === 'kindergarten' && '幼儿园'}
                {user.role === 'base' && '收容所'}
                {user.role === 'admin' && '管理员'}
              </p>
              
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setEditing(true)}
                >
                  ✏️ 编辑资料
                </button>
                <Link href="/my-pets" className="btn btn-outline-secondary">
                  🐕 我的宠物
                </Link>
                <Link href="/my-orders" className="btn btn-outline-secondary">
                  📋 我的订单
                </Link>
                <Link href="/my-appointments" className="btn btn-outline-secondary">
                  📅 我的预约
                </Link>
              </div>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="card mt-3">
            <div className="card-header">
              <h5 className="mb-0">📊 我的数据</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <h4 className="mb-0">2</h4>
                  <small className="text-muted">宠物</small>
                </div>
                <div className="col-4">
                  <h4 className="mb-0">5</h4>
                  <small className="text-muted">订单</small>
                </div>
                <div className="col-4">
                  <h4 className="mb-0">3</h4>
                  <small className="text-muted">收藏</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧详细信息 */}
        <div className="col-lg-8">
          {editing ? (
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">✏️ 编辑个人资料</h5>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setEditing(false)}
                >
                  取消
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">用户名</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">邮箱</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">手机号</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="11 位手机号"
                    />
                  </div>
                  
                  <div className="mb-3">
                    <label className="form-label">头像 URL</label>
                    <input
                      type="url"
                      className="form-control"
                      value={formData.avatar}
                      onChange={(e) => setFormData({...formData, avatar: e.target.value})}
                      placeholder="头像图片链接"
                    />
                  </div>
                  
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      保存修改
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="mb-0">📝 基本信息</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-md-4 text-muted">用户名</div>
                    <div className="col-md-8">{user.username}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 text-muted">邮箱</div>
                    <div className="col-md-8">{user.email}</div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-4 text-muted">手机号</div>
                    <div className="col-md-8">{user.phone || '未设置'}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 text-muted">注册时间</div>
                    <div className="col-md-8">
                      {new Date(user.createdAt).toLocaleDateString('zh-CN')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-header">
                  <h5 className="mb-0">🔔 消息通知</h5>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex justify-content-between">
                        <strong>订单状态更新</strong>
                        <small className="text-muted">2 小时前</small>
                      </div>
                      <p className="mb-0 small">您的上门遛狗服务已确认</p>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex justify-content-between">
                        <strong>新消息</strong>
                        <small className="text-muted">昨天</small>
                      </div>
                      <p className="mb-0 small">训练师回复了您的预约请求</p>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                      <div className="d-flex justify-content-between">
                        <strong>系统通知</strong>
                        <small className="text-muted">3 天前</small>
                      </div>
                      <p className="mb-0 small">平台活动：新用户注册送优惠券</p>
                    </a>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">⚙️ 账户设置</h5>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <Link href="/profile/security" className="list-group-item list-group-item-action">
                      🔐 密码与安全
                      <span className="float-end text-muted">›</span>
                    </Link>
                    <Link href="/profile/notifications" className="list-group-item list-group-item-action">
                      🔔 通知设置
                      <span className="float-end text-muted">›</span>
                    </Link>
                    <Link href="/profile/privacy" className="list-group-item list-group-item-action">
                      🔒 隐私设置
                      <span className="float-end text-muted">›</span>
                    </Link>
                    <a href="#" className="list-group-item list-group-item-action text-danger">
                      🚪 退出登录
                      <span className="float-end text-muted">›</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
