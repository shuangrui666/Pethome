'use client'

import { useState } from 'react'

export default function SecuritySettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      alert('新密码和确认密码不一致')
      return
    }
    if (newPassword.length < 6) {
      alert('密码长度至少 6 位')
      return
    }
    
    try {
      setLoading(true)
      // TODO: 调用修改密码 API
      // await changePassword({ currentPassword, newPassword })
      alert('密码修改成功')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('修改密码失败:', error)
      alert('修改失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-5 mb-4">🔒 安全设置</h1>
          <p className="lead text-muted mb-5">管理您的账户安全选项</p>

          {/* 修改密码 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">🔑 修改密码</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handlePasswordChange}>
                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    当前密码
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    新密码
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                  <div className="form-text">密码长度至少 6 位</div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    确认新密码
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? '修改中...' : '修改密码'}
                </button>
              </form>
            </div>
          </div>

          {/* 登录设备管理 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📱 登录设备管理</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                查看和管理您已登录的设备，可以移除不信任的设备
              </p>
              
              <div className="list-group">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">当前设备</h6>
                    <small className="text-muted">
                      Chrome 120 on Windows 11 · 最近登录：刚刚
                    </small>
                  </div>
                  <span className="badge bg-success">使用中</span>
                </div>
                
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">iPhone 14 Pro</h6>
                    <small className="text-muted">
                      Safari · 最近登录：2024-01-15 14:30
                    </small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm">
                    移除
                  </button>
                </div>
                
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="mb-1">iPad Air</h6>
                    <small className="text-muted">
                      Safari · 最近登录：2024-01-10 09:15
                    </small>
                  </div>
                  <button className="btn btn-outline-danger btn-sm">
                    移除
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 登录历史记录 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📊 登录历史</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>时间</th>
                      <th>设备</th>
                      <th>位置</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2024-01-19 10:30</td>
                      <td>Chrome 120 on Windows 11</td>
                      <td>上海，中国</td>
                      <td><span className="badge bg-success">成功</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-18 15:20</td>
                      <td>Safari on iPhone 14 Pro</td>
                      <td>上海，中国</td>
                      <td><span className="badge bg-success">成功</span></td>
                    </tr>
                    <tr>
                      <td>2024-01-17 09:45</td>
                      <td>Chrome 119 on Windows 11</td>
                      <td>上海，中国</td>
                      <td><span className="badge bg-success">成功</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-outline-primary btn-sm">
                查看更多
              </button>
            </div>
          </div>

          {/* 双重认证 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">🛡️ 双重认证 (2FA)</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-3">
                启用双重认证可以为您的账户提供额外的安全保护
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-1">短信验证</h6>
                  <small className="text-muted">
                    登录时发送验证码到手机
                  </small>
                </div>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="sms2fa"
                  />
                  <label className="form-check-label" htmlFor="sms2fa">
                    未启用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
