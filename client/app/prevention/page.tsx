'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Shield, MapPin, Bell, Smartphone, Wifi, Battery } from 'lucide-react'

interface SafetyDevice {
  _id: string
  name: string
  deviceType: 'collar' | 'tag' | 'tracker'
  status: 'active' | 'inactive' | 'low-battery'
  location?: {
    latitude: number
    longitude: number
    address: string
    updatedAt: string
  }
  batteryLevel: number
  settings: {
    geofenceEnabled: boolean
    realTimeTracking: boolean
    alertEnabled: boolean
  }
}

// 模拟防走失防护设备数据
const mockSafetyDevices: SafetyDevice[] = [
  {
    _id: 'dev1',
    name: '旺财的 GPS 智能项圈',
    deviceType: 'collar',
    status: 'active',
    location: {
      latitude: 23.1291,
      longitude: 113.2644,
      address: '广州市天河区天河公园',
      updatedAt: '2025-01-20T10:30:00Z',
    },
    batteryLevel: 85,
    settings: {
      geofenceEnabled: true,
      realTimeTracking: true,
      alertEnabled: true,
    },
  },
  {
    _id: 'dev2',
    name: '小花的防走失定位牌',
    deviceType: 'tag',
    status: 'active',
    location: {
      latitude: 23.1167,
      longitude: 113.3256,
      address: '广州市天河区珠江新城',
      updatedAt: '2025-01-20T10:28:00Z',
    },
    batteryLevel: 92,
    settings: {
      geofenceEnabled: true,
      realTimeTracking: false,
      alertEnabled: true,
    },
  },
  {
    _id: 'dev3',
    name: '豆豆的实时追踪器',
    deviceType: 'tracker',
    status: 'low-battery',
    location: {
      latitude: 23.0356,
      longitude: 113.3089,
      address: '广州市番禺区大石镇',
      updatedAt: '2025-01-20T09:15:00Z',
    },
    batteryLevel: 15,
    settings: {
      geofenceEnabled: false,
      realTimeTracking: true,
      alertEnabled: true,
    },
  },
  {
    _id: 'dev4',
    name: '球球的 GPS 项圈 Pro',
    deviceType: 'collar',
    status: 'active',
    location: {
      latitude: 23.0989,
      longitude: 113.3234,
      address: '广州市海珠区客村',
      updatedAt: '2025-01-20T10:25:00Z',
    },
    batteryLevel: 78,
    settings: {
      geofenceEnabled: true,
      realTimeTracking: true,
      alertEnabled: true,
    },
  },
  {
    _id: 'dev5',
    name: '咪咪的轻量定位器',
    deviceType: 'tag',
    status: 'inactive',
    batteryLevel: 5,
    settings: {
      geofenceEnabled: false,
      realTimeTracking: false,
      alertEnabled: false,
    },
  },
  {
    _id: 'dev6',
    name: '可乐的防水追踪器',
    deviceType: 'tracker',
    status: 'active',
    location: {
      latitude: 23.1256,
      longitude: 113.2645,
      address: '广州市越秀区公园前',
      updatedAt: '2025-01-20T10:20:00Z',
    },
    batteryLevel: 65,
    settings: {
      geofenceEnabled: true,
      realTimeTracking: true,
      alertEnabled: true,
    },
  },
  {
    _id: 'dev7',
    name: '黑黑的智能项圈',
    deviceType: 'collar',
    status: 'active',
    location: {
      latitude: 23.1789,
      longitude: 113.2678,
      address: '广州市白云区江夏',
      updatedAt: '2025-01-20T10:18:00Z',
    },
    batteryLevel: 88,
    settings: {
      geofenceEnabled: true,
      realTimeTracking: true,
      alertEnabled: true,
    },
  },
]

export default function PreventionPage() {
  const [devices, setDevices] = useState<SafetyDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null)

  useEffect(() => {
    loadDevices()
  }, [])

  const loadDevices = async () => {
    try {
      setLoading(true)
      // TODO: 调用后端 API 获取防护设备列表
      // const response = await getSafetyDevices()

      // 使用模拟数据
      setDevices(mockSafetyDevices)
    } catch (error) {
      console.error('加载防护设备失败:', error)
      // fallback 到模拟数据
      setDevices(mockSafetyDevices)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return { bg: '#d1fae5', color: '#10b981', text: '正常' }
      case 'inactive':
        return { bg: '#fee2e2', color: '#ef4444', text: '离线' }
      case 'low-battery':
        return { bg: '#fef3c7', color: '#f59e0b', text: '低电量' }
      default:
        return { bg: '#e5e7eb', color: '#6b7280', text: '未知' }
    }
  }

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'collar':
        return '🦮'
      case 'tag':
        return '🏷️'
      case 'tracker':
        return '📍'
      default:
        return '🔧'
    }
  }

  const formatLocationTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    
    if (minutes < 1) return '刚刚'
    if (minutes < 60) return `${minutes}分钟前`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}小时前`
    return date.toLocaleDateString('zh-CN')
  }

  return (
    <div className="prevention-page">
      {/* 顶部导航 */}
      <div className="top-nav">
        <Link href="/" className="back-btn">
          <ChevronLeft size={20} />
          <span>返回首页</span>
        </Link>
        <h1 className="page-title">防走失防护</h1>
      </div>

      {/* 防护概览 */}
      <div className="overview-section">
        <div className="overview-card">
          <div className="overview-icon-wrapper">
            <Shield size={32} color="#667eea" />
          </div>
          <div className="overview-content">
            <h2 className="overview-title">智能防护系统</h2>
            <p className="overview-subtitle">24 小时实时监控，守护毛孩子安全</p>
          </div>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number">{devices.filter(d => d.status === 'active').length}</span>
            <span className="stat-label">在线设备</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{devices.length}</span>
            <span className="stat-label">总设备数</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">0</span>
            <span className="stat-label">异常警报</span>
          </div>
        </div>
      </div>

      {/* 设备列表 */}
      <div className="devices-section">
        <div className="section-header">
          <h2 className="section-title">我的设备</h2>
          <Link href="/prevention/add" className="add-device-btn">
            <span className="btn-icon">+</span>
            <span>添加设备</span>
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">📡</div>
            <p>加载设备中...</p>
          </div>
        ) : devices.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>暂无防护设备</h3>
            <p>添加智能设备，实时守护宠物安全</p>
            <Link href="/prevention/add" className="empty-btn">
              添加设备
            </Link>
          </div>
        ) : (
          <div className="devices-list">
            {devices.map((device) => {
              const statusInfo = getStatusColor(device.status)
              const isSelected = selectedDevice === device._id
              
              return (
                <div
                  key={device._id}
                  className={`device-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedDevice(device._id)}
                >
                  <div className="device-header">
                    <div className="device-icon">
                      {getDeviceTypeIcon(device.deviceType)}
                    </div>
                    <div className="device-info">
                      <h3 className="device-name">{device.name}</h3>
                      <div className="device-status">
                        <span
                          className="status-badge"
                          style={{
                            backgroundColor: statusInfo.bg,
                            color: statusInfo.color,
                          }}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="device-details">
                    {/* 电量 */}
                    <div className="detail-item">
                      <Battery size={16} />
                      <span className="detail-label">电量</span>
                      <div className="battery-bar">
                        <div
                          className={`battery-level ${device.batteryLevel < 20 ? 'low' : ''}`}
                          style={{ width: `${device.batteryLevel}%` }}
                        ></div>
                      </div>
                      <span className="detail-value">{device.batteryLevel}%</span>
                    </div>

                    {/* 位置信息 */}
                    {device.location && (
                      <div className="detail-item full-width">
                        <MapPin size={16} />
                        <span className="detail-label">当前位置</span>
                        <span className="detail-value location-text">
                          {device.location.address}
                        </span>
                        <span className="detail-time">
                          {formatLocationTime(device.location.updatedAt)}
                        </span>
                      </div>
                    )}

                    {/* 设置状态 */}
                    <div className="settings-grid">
                      <div className="setting-item">
                        <div className={`setting-icon ${device.settings.geofenceEnabled ? 'active' : ''}`}>
                          <MapPin size={14} />
                        </div>
                        <span className="setting-label">电子围栏</span>
                        <div className={`setting-indicator ${device.settings.geofenceEnabled ? 'on' : 'off'}`}></div>
                      </div>
                      <div className="setting-item">
                        <div className={`setting-icon ${device.settings.realTimeTracking ? 'active' : ''}`}>
                          <Smartphone size={14} />
                        </div>
                        <span className="setting-label">实时定位</span>
                        <div className={`setting-indicator ${device.settings.realTimeTracking ? 'on' : 'off'}`}></div>
                      </div>
                      <div className="setting-item">
                        <div className={`setting-icon ${device.settings.alertEnabled ? 'active' : ''}`}>
                          <Bell size={14} />
                        </div>
                        <span className="setting-label">异常警报</span>
                        <div className={`setting-indicator ${device.settings.alertEnabled ? 'on' : 'off'}`}></div>
                      </div>
                    </div>
                  </div>

                  <div className="device-actions">
                    <button className="action-btn primary">
                      <MapPin size={16} />
                      <span>查看位置</span>
                    </button>
                    <button className="action-btn secondary">
                      <Bell size={16} />
                      <span>设置提醒</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* 防护指南 */}
      <div className="guide-section">
        <h2 className="section-title">防走失小贴士</h2>
        <div className="guide-grid">
          <div className="guide-card">
            <div className="guide-icon">🏠</div>
            <h3>设置电子围栏</h3>
            <p>在常去区域设置安全范围，宠物离开时立即收到提醒</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">📱</div>
            <h3>开启实时定位</h3>
            <p>随时查看宠物位置，确保在视线范围内活动</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🔔</div>
            <h3>设置异常警报</h3>
            <p>设备离线、电量低、离开安全区时及时通知</p>
          </div>
          <div className="guide-card">
            <div className="guide-icon">🔋</div>
            <h3>定期充电</h3>
            <p>保持设备电量充足，确保持续防护不中断</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .prevention-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          padding-bottom: 40px;
        }

        .top-nav {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 8px;
          transition: background 0.2s;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #fff;
        }

        .page-title {
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          flex: 1;
        }

        /* 概览区域 */
        .overview-section {
          padding: 20px;
        }

        .overview-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          color: #fff;
          margin-bottom: 20px;
        }

        .overview-icon-wrapper {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .overview-content {
          flex: 1;
        }

        .overview-title {
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 4px;
        }

        .overview-subtitle {
          font-size: 13px;
          opacity: 0.9;
          margin: 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .stat-card {
          background: #fff;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .stat-number {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #667eea;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #999;
        }

        /* 设备区域 */
        .devices-section {
          padding: 0 20px 20px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0;
        }

        .add-device-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .add-device-btn:hover {
          transform: translateY(-2px);
          color: #fff;
        }

        .btn-icon {
          font-size: 16px;
          font-weight: 700;
        }

        /* 加载状态 */
        .loading-state {
          background: #fff;
          border-radius: 16px;
          padding: 60px 20px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .loading-spinner {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .loading-state p {
          color: #999;
          font-size: 14px;
          margin: 0;
        }

        /* 空状态 */
        .empty-state {
          background: #fff;
          border-radius: 16px;
          padding: 60px 20px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .empty-state h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px;
        }

        .empty-state p {
          font-size: 14px;
          color: #999;
          margin: 0 0 20px;
        }

        .empty-btn {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 12px 32px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s;
        }

        .empty-btn:hover {
          transform: translateY(-2px);
          color: #fff;
        }

        /* 设备列表 */
        .devices-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .device-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.2s;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .device-card:hover {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .device-card.selected {
          border-color: #667eea;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
        }

        .device-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .device-icon {
          font-size: 32px;
        }

        .device-info {
          flex: 1;
        }

        .device-name {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin: 0 0 4px;
        }

        .device-status {
          display: flex;
          align-items: center;
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .device-details {
          margin-bottom: 16px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          color: #666;
        }

        .detail-item.full-width {
          flex-wrap: wrap;
        }

        .detail-label {
          font-size: 13px;
          color: #999;
          min-width: 60px;
        }

        .detail-value {
          font-size: 13px;
          color: #333;
          flex: 1;
        }

        .location-text {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .detail-time {
          font-size: 12px;
          color: #999;
          margin-left: 8px;
        }

        /* 电池条 */
        .battery-bar {
          flex: 1;
          height: 8px;
          background: #e9ecef;
          border-radius: 4px;
          overflow: hidden;
          margin: 0 8px;
        }

        .battery-level {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 4px;
          transition: width 0.3s;
        }

        .battery-level.low {
          background: linear-gradient(135deg, #ef4444 0%, #f87171 100%);
        }

        /* 设置网格 */
        .settings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }

        .setting-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .setting-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f0f0f0;
          color: #999;
        }

        .setting-icon.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
        }

        .setting-label {
          font-size: 11px;
          color: #666;
        }

        .setting-indicator {
          width: 36px;
          height: 20px;
          border-radius: 10px;
          background: #e9ecef;
          position: relative;
        }

        .setting-indicator.on {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .setting-indicator::after {
          content: '';
          position: absolute;
          width: 16px;
          height: 16px;
          background: #fff;
          border-radius: 50%;
          top: 2px;
          left: 2px;
          transition: left 0.2s;
        }

        .setting-indicator.on::after {
          left: 18px;
        }

        /* 操作按钮 */
        .device-actions {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f0f0f0;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 10px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
          color: #fff;
        }

        .action-btn.secondary {
          background: #fff;
          color: #667eea;
          border: 2px solid #667eea;
        }

        .action-btn.secondary:hover {
          background: #f8f9ff;
          color: #667eea;
        }

        /* 防护指南 */
        .guide-section {
          padding: 20px;
        }

        .guide-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-top: 16px;
        }

        .guide-card {
          background: #fff;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .guide-icon {
          font-size: 32px;
          margin-bottom: 12px;
        }

        .guide-card h3 {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px;
        }

        .guide-card p {
          font-size: 12px;
          color: #999;
          line-height: 1.5;
          margin: 0;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .settings-grid {
            grid-template-columns: 1fr;
          }

          .guide-grid {
            grid-template-columns: 1fr;
          }

          .device-actions {
            flex-direction: column;
          }

          .top-nav {
            padding: 12px 16px;
          }

          .page-title {
            font-size: 18px;
          }

          .overview-section,
          .devices-section,
          .guide-section {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  )
}
