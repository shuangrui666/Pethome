'use client'

import { useState } from 'react'

export default function NotificationsSettingsPage() {
  const [notifications, setNotifications] = useState({
    orderConfirmed: true,
    orderCompleted: true,
    appointmentConfirmed: true,
    appointmentReminder: true,
    newMessage: true,
    newComment: false,
    promotion: false,
    systemUpdate: true,
    emailNotification: true,
    smsNotification: false,
    pushNotification: true,
  })

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const saveSettings = async () => {
    try {
      // TODO: 调用保存通知设置 API
      // await updateNotificationSettings(notifications)
      alert('通知设置已保存')
    } catch (error) {
      console.error('保存设置失败:', error)
      alert('保存失败，请稍后重试')
    }
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="display-5 mb-4">🔔 通知设置</h1>
          <p className="lead text-muted mb-5">管理您的通知偏好和提醒方式</p>

          {/* 订单相关通知 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📦 订单通知</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="orderConfirmed"
                  checked={notifications.orderConfirmed}
                  onChange={() => handleToggle('orderConfirmed')}
                />
                <label className="form-check-label" htmlFor="orderConfirmed">
                  <strong>订单确认</strong>
                  <p className="text-muted small mb-0">当订单被商家确认时通知我</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="orderCompleted"
                  checked={notifications.orderCompleted}
                  onChange={() => handleToggle('orderCompleted')}
                />
                <label className="form-check-label" htmlFor="orderCompleted">
                  <strong>订单完成</strong>
                  <p className="text-muted small mb-0">当订单完成时通知我</p>
                </label>
              </div>
            </div>
          </div>

          {/* 预约相关通知 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📅 预约通知</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="appointmentConfirmed"
                  checked={notifications.appointmentConfirmed}
                  onChange={() => handleToggle('appointmentConfirmed')}
                />
                <label className="form-check-label" htmlFor="appointmentConfirmed">
                  <strong>预约确认</strong>
                  <p className="text-muted small mb-0">当预约被确认时通知我</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="appointmentReminder"
                  checked={notifications.appointmentReminder}
                  onChange={() => handleToggle('appointmentReminder')}
                />
                <label className="form-check-label" htmlFor="appointmentReminder">
                  <strong>预约提醒</strong>
                  <p className="text-muted small mb-0">预约开始前 1 小时提醒我</p>
                </label>
              </div>
            </div>
          </div>

          {/* 社交通知 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">💬 社交通知</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newMessage"
                  checked={notifications.newMessage}
                  onChange={() => handleToggle('newMessage')}
                />
                <label className="form-check-label" htmlFor="newMessage">
                  <strong>新消息</strong>
                  <p className="text-muted small mb-0">收到新消息时通知我</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newComment"
                  checked={notifications.newComment}
                  onChange={() => handleToggle('newComment')}
                />
                <label className="form-check-label" htmlFor="newComment">
                  <strong>新评论</strong>
                  <p className="text-muted small mb-0">帖子收到新评论时通知我</p>
                </label>
              </div>
            </div>
          </div>

          {/* 营销通知 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📢 营销通知</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="promotion"
                  checked={notifications.promotion}
                  onChange={() => handleToggle('promotion')}
                />
                <label className="form-check-label" htmlFor="promotion">
                  <strong>促销信息</strong>
                  <p className="text-muted small mb-0">接收优惠活动和促销信息</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="systemUpdate"
                  checked={notifications.systemUpdate}
                  onChange={() => handleToggle('systemUpdate')}
                />
                <label className="form-check-label" htmlFor="systemUpdate">
                  <strong>系统更新</strong>
                  <p className="text-muted small mb-0">接收平台更新和功能通知</p>
                </label>
              </div>
            </div>
          </div>

          {/* 通知渠道 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📱 通知渠道</h5>
            </div>
            <div className="card-body">
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotification"
                  checked={notifications.emailNotification}
                  onChange={() => handleToggle('emailNotification')}
                />
                <label className="form-check-label" htmlFor="emailNotification">
                  <strong>邮件通知</strong>
                  <p className="text-muted small mb-0">通过电子邮件接收通知</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="smsNotification"
                  checked={notifications.smsNotification}
                  onChange={() => handleToggle('smsNotification')}
                />
                <label className="form-check-label" htmlFor="smsNotification">
                  <strong>短信通知</strong>
                  <p className="text-muted small mb-0">通过短信接收重要通知</p>
                </label>
              </div>
              
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="pushNotification"
                  checked={notifications.pushNotification}
                  onChange={() => handleToggle('pushNotification')}
                />
                <label className="form-check-label" htmlFor="pushNotification">
                  <strong>推送通知</strong>
                  <p className="text-muted small mb-0">在设备上接收推送通知</p>
                </label>
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
