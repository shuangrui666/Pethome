'use client'

import React, { useState, useEffect } from 'react'
import { getShops, getShopServices, Shop, ShopService } from '../../src/api/shop'

interface PetShop {
  id: number
  name: string
  logo: string
  rating: number
  reviewCount: number
  distance: string
  tags: string[]
  services: string[]
  image: string
  phone: string
  address: string
  openTime: string
}

interface Service {
  id: number
  name: string
  price: string
  duration: string
  description: string
  image: string
}

export default function PetShopModule() {
  const [activeTab, setActiveTab] = useState<'shops' | 'services' | 'products'>('shops')
  const [selectedShop, setSelectedShop] = useState<PetShop | null>(null)
  const [showShopDetail, setShowShopDetail] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [bookingForm, setBookingForm] = useState({
    serviceName: '',
    shopName: '',
    date: '',
    time: '',
    petName: '',
    petType: '',
    notes: ''
  })
  
  // Backend API state
  const [shops, setShops] = useState<Shop[]>([])
  const [shopServices, setShopServices] = useState<ShopService[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch shops and services from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [shopsRes, servicesRes] = await Promise.all([
          getShops(),
          getShopServices()
        ])
        setShops(shopsRes.data || [])
        setShopServices(servicesRes.data || [])
      } catch (err: any) {
        console.error('Failed to fetch pet shops:', err)
        setError(err.message || '获取宠物店数据失败')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Default mock data as fallback
  const defaultPetShops: PetShop[] = [
    {
      id: 1,
      name: '萌宠乐园宠物店',
      logo: '🐾',
      rating: 4.8,
      reviewCount: 256,
      distance: '1.2km',
      tags: ['宠物活体', '宠物用品', '美容洗澡'],
      services: ['宠物销售', '用品售卖', '美容服务', '寄养服务'],
      image: '🏪',
      phone: '010-88888888',
      address: '北京市朝阳区幸福路 123 号',
      openTime: '09:00-21:00'
    },
    {
      id: 2,
      name: '汪星人之家',
      logo: '🐕',
      rating: 4.9,
      reviewCount: 389,
      distance: '2.5km',
      tags: ['狗狗活体', '训练服务', '宠物医疗'],
      services: ['幼犬销售', '训练课程', '医疗咨询', '宠物用品'],
      image: '🏬',
      phone: '010-88888889',
      address: '北京市朝阳区阳光大道 456 号',
      openTime: '08:30-20:30'
    },
    {
      id: 3,
      name: '喵星球宠物生活馆',
      logo: '🐱',
      rating: 4.7,
      reviewCount: 178,
      distance: '3.1km',
      tags: ['猫咪活体', '猫粮猫砂', '猫咪美容'],
      services: ['猫咪销售', '猫用品', '美容洗澡', '宠物寄养'],
      image: '🏢',
      phone: '010-88888890',
      address: '北京市朝阳区猫咪街 789 号',
      openTime: '10:00-22:00'
    },
    {
      id: 4,
      name: '宠物总动员',
      logo: '🎪',
      rating: 4.6,
      reviewCount: 445,
      distance: '4.0km',
      tags: ['全品类', '大型超市', '自助购物'],
      services: ['活体销售', '用品超市', '美容 SPA', '宠物婚礼'],
      image: '🏭',
      phone: '010-88888891',
      address: '北京市朝阳区宠物大道 100 号',
      openTime: '09:00-21:30'
    }
  ]

  // Default mock services
  const defaultServices: Service[] = [
    {
      id: 1,
      name: '宠物美容套餐',
      price: '¥168 起',
      duration: '2 小时',
      description: '包含洗澡、修剪、吹风、美容造型',
      image: '✂️'
    },
    {
      id: 2,
      name: '宠物寄养服务',
      price: '¥88/天',
      duration: '24 小时',
      description: '温馨笼子，定时喂食，陪伴玩耍',
      image: '🏠'
    },
    {
      id: 3,
      name: '宠物摄影',
      price: '¥399 起',
      duration: '3 小时',
      description: '专业摄影团队，多套场景，精修照片',
      image: '📸'
    },
    {
      id: 4,
      name: '宠物派对',
      price: '¥1288 起',
      duration: '半天',
      description: '宠物生日派对，主题布置，活动策划',
      image: '🎉'
    }
  ]

  // Default mock products
  const defaultProducts = [
    { id: 1, name: '天然狗粮 15kg', price: '¥399', category: '食品', image: '🥫' },
    { id: 2, name: '猫砂盆大号', price: '¥128', category: '用品', image: '🚽' },
    { id: 3, name: '宠物美容套装', price: '¥258', category: '美容', image: '💇' },
    { id: 4, name: '智能喂食器', price: '¥599', category: '智能', image: '🤖' },
    { id: 5, name: '宠物窝垫', price: '¥168', category: '用品', image: '🛏️' },
    { id: 6, name: '磨牙玩具套装', price: '¥68', category: '玩具', image: '🎾' }
  ]

  // Display data with fallback to defaults
  const displayShops = shops.length > 0 ? shops : defaultPetShops
  const displayServices = shopServices.length > 0 ? shopServices : defaultServices
  const displayProducts = defaultProducts  // Products will remain as defaults for now

  const handleBookService = (shop: PetShop, service: string) => {
    setSelectedShop(shop)
    setBookingForm({
      ...bookingForm,
      serviceName: service,
      shopName: shop.name
    })
    setShowBookingModal(true)
  }

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setShowProductModal(true)
  }

  const handleAddToCart = (product: any) => {
    setCart(prev => [...prev, product])
    alert(`已添加 "${product.name}" 到购物车！`)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`预约成功！\n店铺：${bookingForm.shopName}\n服务：${bookingForm.serviceName}\n日期：${bookingForm.date}\n时间：${bookingForm.time}`)
    setShowBookingModal(false)
    setBookingForm({
      serviceName: '',
      shopName: '',
      date: '',
      time: '',
      petName: '',
      petType: '',
      notes: ''
    })
  }

  const tabItems = [
    { id: 'shops', label: '宠物店铺', icon: '🏪' },
    { id: 'services', label: '特色服务', icon: '🎯' },
    { id: 'products', label: '热门商品', icon: '🛍️' }
  ]

  return (
    <div className="petshop-module">
      <div className="module-header">
        <div className="header-content">
          <h2 className="module-title">
            <span className="title-icon">🏪</span>
            宠物店铺
          </h2>
          <p className="module-subtitle">
            发现附近优质宠物店，为爱宠挑选最好的商品和服务
          </p>
        </div>
      </div>

      {/* 标签导航 */}
      <div className="tab-nav">
        {tabItems.map((tab) => (
          <button
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id as any)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 宠物店铺列表 */}
      {activeTab === 'shops' && (
        <div className="shops-content">
          {loading && <div className="loading-state">加载中...</div>}
          {error && <div className="error-state">{error}<button onClick={() => window.location.reload()}>重试</button></div>}
          <div className="shop-grid">
            {displayShops.map((shop, index) => (
              <div
                key={shop.id}
                className="shop-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="shop-header">
                  <div className="shop-logo">{shop.logo}</div>
                  <div className="shop-info">
                    <h3 className="shop-name">{shop.name}</h3>
                    <div className="shop-meta">
                      <span className="shop-rating">
                        ⭐ {shop.rating}
                        <span className="review-count"> ({shop.reviewCount}评价)</span>
                      </span>
                      <span className="shop-distance">📍 {shop.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="shop-tags">
                  {shop.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="shop-services">
                  <div className="section-title">主要服务</div>
                  <div className="service-list">
                    {shop.services.slice(0, 3).map((service, i) => (
                      <div key={i} className="service-item">
                        <span className="service-dot">•</span>
                        <span>{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="shop-footer">
                  <div className="shop-hours">
                    <span className="hours-label">🕐</span>
                    <span>{shop.openTime}</span>
                  </div>
                  <div className="shop-actions">
                    <button className="btn-secondary" onClick={() => {
                      setSelectedShop(shop)
                      setShowShopDetail(true)
                    }}>
                      查看详情
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => handleBookService(shop, '咨询')}
                    >
                      预约
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 特色服务 */}
      {activeTab === 'services' && (
        <div className="services-content">
          {loading && <div className="loading-state">加载中...</div>}
          {error && <div className="error-state">{error}<button onClick={() => window.location.reload()}>重试</button></div>}
          <div className="services-grid">
            {displayServices.map((service, index) => (
              <div
                key={service.id}
                className="service-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon">{service.image}</div>
                <h3 className="service-name">{service.name}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-meta">
                  <span className="service-price">{service.price}</span>
                  <span className="service-duration">⏱️ {service.duration}</span>
                </div>
                <button
                  className="btn-primary full-width"
                  onClick={() => handleBookService(displayShops[0], service.name)}
                >
                  立即预约
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 热门商品 */}
      {activeTab === 'products' && (
        <div className="products-content">
          {loading && <div className="loading-state">加载中...</div>}
          {error && <div className="error-state">{error}<button onClick={() => window.location.reload()}>重试</button></div>}
          <div className="products-grid">
            {displayProducts.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleProductClick(product)}
              >
                <div className="product-image">{product.image}</div>
                <div className="product-info">
                  <h4 className="product-name">{product.name}</h4>
                  <span className="product-category">{product.category}</span>
                </div>
                <div className="product-footer">
                  <span className="product-price">{product.price}</span>
                  <button
                    className="btn-secondary btn-small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    加入购物车
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 店铺详情弹窗 */}
      {showShopDetail && selectedShop && (
        <div className="modal-overlay" onClick={() => setShowShopDetail(false)}>
          <div className="modal-content shop-detail" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowShopDetail(false)}>
              ✕
            </button>
            
            <div className="shop-detail-header">
              <div className="detail-logo">{selectedShop.logo}</div>
              <h3 className="detail-name">{selectedShop.name}</h3>
              <div className="detail-rating">
                ⭐ {selectedShop.rating} 
                <span> ({selectedShop.reviewCount}条评价)</span>
              </div>
            </div>

            <div className="shop-detail-body">
              <div className="detail-section">
                <h4>📍 地址</h4>
                <p>{selectedShop.address}</p>
              </div>

              <div className="detail-section">
                <h4>📞 电话</h4>
                <p>{selectedShop.phone}</p>
              </div>

              <div className="detail-section">
                <h4>🕐 营业时间</h4>
                <p>{selectedShop.openTime}</p>
              </div>

              <div className="detail-section">
                <h4>🏷️ 标签</h4>
                <div className="detail-tags">
                  {selectedShop.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>🎯 服务项目</h4>
                <div className="detail-services">
                  {selectedShop.services.map((service, i) => (
                    <div key={i} className="service-item">
                      <span className="service-dot">•</span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-primary full-width"
                onClick={() => {
                  setShowShopDetail(false)
                  handleBookService(selectedShop, '到店咨询')
                }}
              >
                预约到店
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 预约弹窗 */}
      {showBookingModal && (
        <div className="modal-overlay" onClick={() => setShowBookingModal(false)}>
          <div className="modal-content booking-form" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowBookingModal(false)}>
              ✕
            </button>
            
            <h3 className="modal-title">预约服务</h3>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label>店铺名称</label>
                <input
                  type="text"
                  value={bookingForm.shopName}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>服务项目</label>
                <input
                  type="text"
                  value={bookingForm.serviceName}
                  readOnly
                  className="form-control"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>预约日期 *</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>预约时间 *</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="form-control"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>狗狗姓名 *</label>
                  <input
                    type="text"
                    value={bookingForm.petName}
                    onChange={(e) => setBookingForm({ ...bookingForm, petName: e.target.value })}
                    className="form-control"
                    placeholder="请输入狗狗名字"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>犬种</label>
                  <input
                    type="text"
                    value={bookingForm.petType}
                    onChange={(e) => setBookingForm({ ...bookingForm, petType: e.target.value })}
                    className="form-control"
                    placeholder="例如：金毛"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>备注说明</label>
                <textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  className="form-control"
                  rows={3}
                  placeholder="请说明您的特殊需求..."
                />
              </div>

              <button type="submit" className="btn-primary full-width">
                提交预约
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showProductModal && selectedProduct && (
        <div className="modal-overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowProductModal(false)}>
              ✕
            </button>
            <div className="product-detail">
              <div className="product-image-large">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="product-info">
                <h3>{selectedProduct.name}</h3>
                <p className="category-tag">{selectedProduct.category}</p>
                <p className="price">¥{selectedProduct.price}</p>
                <p className="description">高品质宠物用品，为您的爱宠提供最佳选择。</p>
                <button className="btn-primary" onClick={() => handleAddToCart(selectedProduct)}>
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Display */}
      {cart.length > 0 && (
        <div className="cart-display">
          <h4>购物车 ({cart.length})</h4>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - ¥{item.price}
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        .petshop-module {
          width: 100%;
        }

        .module-header {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          padding: 32px;
          border-radius: 20px 20px 0 0;
          margin: 0;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .module-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0 0 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .title-icon {
          font-size: 32px;
        }

        .module-subtitle {
          font-size: 15px;
          opacity: 0.95;
          margin: 0;
          line-height: 1.6;
        }

        .tab-nav {
          display: flex;
          gap: 12px;
          padding: 20px;
          background: white;
          border-bottom: 1px solid #eee;
        }

        .tab-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 2px solid transparent;
          border-radius: 12px;
          background: transparent;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-weight: 600;
          color: #666;
        }

        .tab-item:hover {
          background: #fff0f5;
          color: #FF6B9D;
        }

        .tab-item.active {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border-color: transparent;
        }

        .tab-icon {
          font-size: 20px;
        }

        .tab-label {
          white-space: nowrap;
        }

        .shops-content,
        .services-content,
        .products-content {
          padding: 24px;
          background: #fafafa;
        }

        .shop-grid,
        .services-grid,
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .shop-card,
        .service-card,
        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          animation: slideIn 0.5s ease;
        }

        .shop-card:hover,
        .service-card:hover,
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.15);
        }

        .shop-header {
          display: flex;
          gap: 16px;
          padding: 20px;
          background: linear-gradient(135deg, #fff0f5 0%, #fff5f8 100%);
        }

        .shop-logo {
          font-size: 48px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }

        .shop-info {
          flex: 1;
        }

        .shop-name {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #333;
        }

        .shop-meta {
          display: flex;
          gap: 16px;
          align-items: center;
          font-size: 14px;
          color: #666;
        }

        .shop-rating {
          font-weight: 600;
          color: #FF8E53;
        }

        .review-count {
          font-weight: normal;
          color: #999;
        }

        .shop-distance {
          color: #999;
        }

        .shop-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          padding: 0 20px 16px;
        }

        .tag {
          background: linear-gradient(135deg, #FFE5EC 0%, #FFF0F5 100%);
          color: #FF6B9D;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .shop-services {
          padding: 0 20px 16px;
        }

        .section-title {
          font-size: 14px;
          font-weight: 700;
          color: #666;
          margin-bottom: 12px;
        }

        .service-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .service-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #555;
        }

        .service-dot {
          color: #FF6B9D;
          font-weight: bold;
        }

        .shop-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          background: #fafafa;
          border-top: 1px solid #eee;
        }

        .shop-hours {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #666;
        }

        .shop-actions {
          display: flex;
          gap: 12px;
        }

        .service-card {
          text-align: center;
          padding: 32px 24px;
        }

        .service-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .service-name {
          font-size: 20px;
          font-weight: 700;
          margin: 0 0 8px;
          color: #333;
        }

        .service-desc {
          font-size: 14px;
          color: #666;
          margin: 0 0 16px;
          line-height: 1.6;
        }

        .service-meta {
          display: flex;
          justify-content: center;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
        }

        .service-price {
          font-size: 24px;
          font-weight: 700;
          color: #FF6B9D;
        }

        .service-duration {
          font-size: 14px;
          color: #999;
        }

        .product-card {
          padding: 20px;
        }

        .product-image {
          font-size: 64px;
          text-align: center;
          margin-bottom: 16px;
        }

        .product-info {
          margin-bottom: 16px;
        }

        .product-name {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 6px;
          color: #333;
        }

        .product-category {
          font-size: 13px;
          color: #999;
          background: #f5f5f5;
          padding: 4px 12px;
          border-radius: 12px;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: #FF6B9D;
        }

        .btn-primary {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }

        .btn-secondary {
          background: white;
          color: #FF6B9D;
          border: 2px solid #FF6B9D;
          padding: 10px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-secondary:hover {
          background: #fff0f5;
        }

        .btn-small {
          padding: 8px 16px;
          font-size: 13px;
        }

        .full-width {
          width: 100%;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideUp 0.3s ease;
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 1;
        }

        .shop-detail-header {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          padding: 32px;
          text-align: center;
          border-radius: 20px 20px 0 0;
        }

        .detail-logo {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .detail-name {
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .detail-rating {
          font-size: 16px;
          opacity: 0.95;
        }

        .shop-detail-body {
          padding: 24px;
        }

        .detail-section {
          margin-bottom: 24px;
        }

        .detail-section h4 {
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 12px;
          color: #333;
        }

        .detail-section p {
          font-size: 14px;
          color: #666;
          margin: 0;
          line-height: 1.6;
        }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .detail-services {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .modal-footer {
          padding: 20px 24px;
          border-top: 1px solid #eee;
        }

        .booking-form {
          max-width: 500px;
        }

        .modal-title {
          font-size: 22px;
          font-weight: 700;
          margin: 0 0 24px;
          color: #333;
          text-align: center;
          padding-top: 16px;
        }

        form {
          padding: 0 24px 24px;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          color: #333;
        }

        .form-control {
          width: 100%;
          padding: 12px;
          border: 2px solid #eee;
          border-radius: 10px;
          font-size: 14px;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        .form-control:focus {
          outline: none;
          border-color: #FF6B9D;
        }

        .form-control[readOnly] {
          background: #f9f9f9;
          color: #666;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        textarea {
          resize: vertical;
          font-family: inherit;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .module-title {
            font-size: 24px;
          }

          .tab-nav {
            flex-wrap: wrap;
          }

          .tab-item {
            padding: 10px 16px;
            font-size: 14px;
          }

          .shop-grid,
          .services-grid,
          .products-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .shop-header {
            padding: 16px;
          }

          .shop-logo {
            width: 60px;
            height: 60px;
            font-size: 40px;
          }

          .shop-name {
            font-size: 18px;
          }

          .shop-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .shop-actions {
            width: 100%;
            justify-content: space-between;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .product-detail {
            display: grid;
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .product-image-large {
            border-radius: 12px;
            overflow: hidden;
            background: #f5f5f5;
          }

          .product-image-large img {
            width: 100%;
            height: auto;
            display: block;
          }

          .product-info h3 {
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 12px;
            color: #333;
          }

          .product-info .category-tag {
            display: inline-block;
            background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
            color: white;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
            margin-bottom: 16px;
          }

          .product-info .price {
            font-size: 28px;
            font-weight: 700;
            color: #FF6B9D;
            margin: 16px 0;
          }

          .product-info .description {
            color: #666;
            line-height: 1.6;
            margin-bottom: 24px;
          }

          .cart-display {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 24px 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          }

          .cart-display h4 {
            margin: 0 0 16px;
            font-size: 18px;
            font-weight: 600;
            color: #333;
          }

          .cart-display ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .cart-display li {
            padding: 12px 0;
            border-bottom: 1px solid #eee;
            color: #666;
          }

          .cart-display li:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  )
}
