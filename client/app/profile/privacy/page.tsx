'use client'

import { useState } from 'react'

export default function PrivacySettingsPage() {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    allowFriendRequests: true,
    showMyPets: true,
    showMyActivity: false,
    locationSharing: 'friends',
    dataTracking: false,
  })

  const handleToggle = (key: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  const handleChange = (key: string, value: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = async () => {
    try {
      // TODO: 调用保存隐私设置 API
      // await updatePrivacySettings(privacySettings)
      alert('隐私设置已保存')
    } catch (error) {
      console.error('保存设置失败:', error)
      alert('保存失败，请稍后重试')
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-5 mb-4">🔒 隐私设置</h1>
          <p className="lead text-muted mb-5">管理您的隐私和个人信息可见性</p>

          {/* 个人资料可见性 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">👤 个人资料可见性</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="profileVisibility" className="form-label">
                  <strong>个人资料可见范围</strong>
                </label>
                <select
                  className="form-select"
                  id="profileVisibility"
                  value={privacySettings.profileVisibility}
                  onChange={(e) => handleChange('profileVisibility', e.target.value)}
                >
                  <option value="public">公开 - 所有人都可以看到</option>
                  <option value="friends">仅好友 - 只有好友可以看到</option>
                  <option value="private">私密 - 只有我自己可以看到</option>
                </select>
                <div className="form-text">
                  控制谁可以看到您的个人资料信息
                </div>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showEmail"
                  checked={privacySettings.showEmail}
                  onChange={() => handleToggle('showEmail')}
                />
                <label className="form-check-label" htmlFor="showEmail">
                  <strong>显示邮箱地址</strong>
                  <p className="text-muted small mb-0">允许其他人看到我的邮箱</p>
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPhone"
                  checked={privacySettings.showPhone}
                  onChange={() => handleToggle('showPhone')}
                />
                <label className="form-check-label" htmlFor="showPhone">
                  <strong>显示手机号码</strong>
                  <p className="text-muted small mb-0">允许其他人看到我的手机号</p>
                </label>
              </div>
            </div>
          </div>

          {/* 消息和互动 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">💬 消息和互动</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="allowMessages"
                  checked={privacySettings.allowMessages}
                  onChange={() => handleToggle('allowMessages')}
                />
                <label className="form-check-label" htmlFor="allowMessages">
                  <strong>允许接收消息</strong>
                  <p className="text-muted small mb-0">允许其他人给我发送私信</p>
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="allowFriendRequests"
                  checked={privacySettings.allowFriendRequests}
                  onChange={() => handleToggle('allowFriendRequests')}
                />
                <label className="form-check-label" htmlFor="allowFriendRequests">
                  <strong>允许好友请求</strong>
                  <p className="text-muted small mb-0">允许其他人添加我为好友</p>
                </label>
              </div>
            </div>
          </div>

          {/* 宠物和活动信息 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">🐕 宠物和活动信息</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showMyPets"
                  checked={privacySettings.showMyPets}
                  onChange={() => handleToggle('showMyPets')}
                />
                <label className="form-check-label" htmlFor="showMyPets">
                  <strong>显示我的宠物</strong>
                  <p className="text-muted small mb-0">在我的主页显示我养的宠物</p>
                </label>
              </div>

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showMyActivity"
                  checked={privacySettings.showMyActivity}
                  onChange={() => handleToggle('showMyActivity')}
                />
                <label className="form-check-label" htmlFor="showMyActivity">
                  <strong>显示我的活动</strong>
                  <p className="text-muted small mb-0">在我的主页显示我的动态和帖子</p>
                </label>
              </div>
            </div>
          </div>

          {/* 位置信息 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📍 位置信息</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="locationSharing" className="form-label">
                  <strong>位置信息共享</strong>
                </label>
                <select
                  className="form-select"
                  id="locationSharing"
                  value={privacySettings.locationSharing}
                  onChange={(e) => handleChange('locationSharing', e.target.value)}
                >
                  <option value="none">不共享</option>
                  <option value="friends">仅好友</option>
                  <option value="public">公开共享</option>
                </select>
                <div className="form-text">
                  控制谁可以看到您的位置信息
                </div>
              </div>
            </div>
          </div>

          {/* 数据使用 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📊 数据使用</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="dataTracking"
                  checked={privacySettings.dataTracking}
                  onChange={() => handleToggle('dataTracking')}
                />
                <label className="form-check-label" htmlFor="dataTracking">
                  <strong>允许数据追踪</strong>
                  <p className="text-muted small mb-0">
                    允许平台收集使用数据以改进服务
                  </p>
                </label>
              </div>

              <div className="alert alert-info mb-0">
                <small>
                  <strong>注意：</strong>我们尊重您的隐私选择。您可以随时在「数据导出」页面下载您的个人数据。
                </small>
              </div>
            </div>
          </div>

          {/* 保存按钮 */}
          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-lg"
              onClick={saveSettings}
            >
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
