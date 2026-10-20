'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getShops, Shop } from '../../src/api/shop'

// 模拟宠物店数据
const mockShops: Shop[] = [
  {
    _id: 'shop1',
    name: '萌宠美容会所',
    description: '专业宠物美容师团队，提供洗澡、剪毛、造型设计等服务。使用进口宠物专用洗护用品，让您的爱宠焕然一新。',
    address: '北京市朝阳区宠物街 123 号',
    serviceType: 'grooming',
    photos: ['https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=800'],
    rating: 4.8,
    reviewCount: 328,
    hasMonitoring: true,
    groomingServices: [
      { name: '小型犬洗澡剪毛', price: 120 },
      { name: '大型犬洗澡剪毛', price: 180 },
      { name: '宠物洗澡', price: 60 },
      { name: '宠物造型设计', price: 200 },
    ]
  },
  {
    _id: 'shop2',
    name: '温馨宠物寄养中心',
    description: '24 小时监控，空调恒温环境，提供舒适的寄养空间。专业护理团队，每日遛狗、喂食、互动游戏，让您的宠物度过愉快的假期。',
    address: '上海市浦东新区幸福路 456 号',
    serviceType: 'boarding',
    photos: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800'],
    rating: 4.9,
    reviewCount: 256,
    hasMonitoring: true,
    boardingPrice: { regular: 100, vip: 200 }
  },
  {
    _id: 'shop3',
    name: '爱宠动物医院',
    description: '资深兽医团队，提供全面的健康检查、疫苗接种、疾病治疗、外科手术等服务。配备先进医疗设备，为宠物健康保驾护航。',
    address: '广州市天河区医疗大道 789 号',
    serviceType: 'medical',
    photos: ['https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800'],
    rating: 4.9,
    reviewCount: 412,
    hasMonitoring: false,
  },
  {
    _id: 'shop4',
    name: '彩虹宠物美容工作室',
    description: '个性化宠物美容服务，擅长创意造型和染色。温和手法，让宠物在轻松愉快的氛围中变美。',
    address: '深圳市南山区创意园 321 号',
    serviceType: 'grooming',
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    rating: 4.7,
    reviewCount: 189,
    hasMonitoring: true,
    groomingServices: [
      { name: '宠物洗澡', price: 50 },
      { name: '宠物剪毛', price: 100 },
      { name: '宠物染色', price: 150 },
      { name: '宠物 SPA', price: 280 },
    ]
  },
  {
    _id: 'shop5',
    name: 'VIP 宠物豪华寄养酒店',
    description: '豪华单间套房，每日三次遛狗，营养餐食配送，视频直播监控。让宠物享受五星级的寄养体验。',
    address: '杭州市西湖区豪华路 666 号',
    serviceType: 'boarding',
    photos: ['https://images.unsplash.com/photo-1544568100-847a948585b9?w=800'],
    rating: 4.8,
    reviewCount: 178,
    hasMonitoring: true,
    boardingPrice: { regular: 150, vip: 300 }
  },
  {
    _id: 'shop6',
    name: '宠物全科医院',
    description: '综合性宠物医院，提供内科、外科、牙科、皮肤科等全方位医疗服务。急诊 24 小时待命。',
    address: '成都市武侯区健康路 888 号',
    serviceType: 'medical',
    photos: ['https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800'],
    rating: 4.7,
    reviewCount: 356,
    hasMonitoring: true,
  },
  {
    _id: 'shop7',
    name: '精致宠物护理中心',
    description: '一站式宠物服务，美容、寄养、医疗、训练应有尽有。专业团队，贴心服务，让宠物享受全方位照顾。',
    address: '重庆市渝中区综合服务街 999 号',
    serviceType: 'grooming',
    photos: ['https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800'],
    rating: 4.6,
    reviewCount: 267,
    hasMonitoring: true,
    groomingServices: [
      { name: '基础美容套餐', price: 150 },
      { name: '高级美容套餐', price: 250 },
      { name: '宠物美甲', price: 30 },
      { name: '宠物耳部清洁', price: 20 },
    ]
  },
]

export default function ShopPage() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [serviceFilter, setServiceFilter] = useState<string>('all')

  useEffect(() => {
    loadShops()
  }, [serviceFilter])

  const loadShops = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (serviceFilter !== 'all') params.serviceType = serviceFilter
      
      const data = await getShops(params)
      const result = data.shops || []
      // 如果 API 返回空数组，使用模拟数据
      setShops(result.length > 0 ? result : mockShops)
    } catch (error) {
      console.error('加载宠物店信息失败:', error)
      // API 失败时使用模拟数据
      setShops(mockShops)
    } finally {
      setLoading(false)
    }
  }

  const getServiceBadge = (serviceType: string) => {
    const badges: any = {
      grooming: 'bg-primary',
      boarding: 'bg-success',
      medical: 'bg-danger',
      training: 'bg-warning',
      all: 'bg-info',
    }
    const labels: any = {
      grooming: '美容',
      boarding: '寄养',
      medical: '医疗',
      training: '训练',
      all: '综合服务',
    }
    return (
      <span className={`badge ${badges[serviceType] || 'bg-secondary'}`}>
        {labels[serviceType] || serviceType}
      </span>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🏪 宠物店</h1>
          <p className="lead text-muted">
            专业的美容、寄养、医疗服务，为您的宠物提供全方位呵护
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              className={`btn ${serviceFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('all')}
            >
              全部
            </button>
            <button
              className={`btn ${serviceFilter === 'grooming' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('grooming')}
            >
              💇 美容
            </button>
            <button
              className={`btn ${serviceFilter === 'boarding' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('boarding')}
            >
              🏠 寄养
            </button>
            <button
              className={`btn ${serviceFilter === 'medical' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setServiceFilter('medical')}
            >
              🏥 医疗
            </button>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/shop/create" className="btn btn-success">
            🏪 注册宠物店
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : shops.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无宠物店信息</h3>
          <p className="text-muted">成为第一个注册的宠物店吧！</p>
          <Link href="/shop/create" className="btn btn-primary">
            注册宠物店
          </Link>
        </div>
      ) : (
        <div className="row">
          {shops.map((shop) => (
            <div key={shop._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {shop.photos?.[0] && (
                  <img
                    src={shop.photos[0]}
                    className="card-img-top"
                    alt={shop.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{shop.name}</h5>
                    {getServiceBadge(shop.serviceType)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>📍 {shop.address}</small>
                  </p>
                  <p className="card-text">
                    {shop.description?.substring(0, 100)}...
                  </p>
                  
                  {shop.serviceType === 'grooming' && shop.groomingServices && (
                    <div className="mb-2">
                      <small className="text-muted d-block">💇 美容服务:</small>
                      {shop.groomingServices.map((service, idx) => (
                        <small key={idx} className="d-block ms-3">
                          • {service.name} - ¥{service.price}
                        </small>
                      ))}
                    </div>
                  )}
                  
                  {shop.serviceType === 'boarding' && (
                    <div className="mb-2">
                      <small className="text-muted d-block">🏠 寄养价格:</small>
                      <small className="d-block ms-3">
                        • 普通间：¥{shop.boardingPrice?.regular || 0}/天
                      </small>
                      <small className="d-block ms-3">
                        • VIP 间：¥{shop.boardingPrice?.vip || 0}/天
                      </small>
                    </div>
                  )}
                  
                  <div className="d-flex justify-content-between mt-2">
                    <span className="text-muted">
                      ⭐ {shop.rating.toFixed(1)} ({shop.reviewCount}评价)
                    </span>
                    {shop.hasMonitoring && (
                      <span className="badge bg-success">
                        📹 实时监控
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/shop/${shop._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/shop/${shop._id}/booking`}
                    className="btn btn-primary w-100"
                  >
                    预约服务
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
