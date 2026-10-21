'use client';

import { useState } from 'react';

export interface Medicine {
  id: number;
  name: string;
  category: 'vaccine' | 'deworming' | 'treatment' | 'supplement' | 'first-aid';
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  stock: number;
  rating: number;
  sales: number;
  tags: string[];
}

export interface CartItem {
  medicine: Medicine;
  quantity: number;
}

export default function ChongwuYiyaoModule() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'consult' | 'cart'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const medicines: Medicine[] = [
    {
      id: 1,
      name: '猫咪综合疫苗套装',
      category: 'vaccine',
      description: '包含猫三联疫苗，预防猫瘟、猫疱疹病毒和猫杯状病毒',
      price: 168,
      originalPrice: 198,
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=300&fit=crop',
      stock: 156,
      rating: 4.9,
      sales: 2341,
      tags: ['热销', '必备'],
    },
    {
      id: 2,
      name: '狗狗体外驱虫药',
      category: 'deworming',
      description: '有效驱除跳蚤、蜱虫等体外寄生虫，按月使用',
      price: 89,
      originalPrice: 109,
      image: 'https://images.unsplash.com/photo-1555532538-c833dd20ff9f?w=400&h=300&fit=crop',
      stock: 234,
      rating: 4.8,
      sales: 1876,
      tags: ['驱虫', '月度'],
    },
    {
      id: 3,
      name: '宠物益生菌粉',
      category: 'supplement',
      description: '调理肠胃，改善消化，增强免疫力',
      price: 128,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      stock: 89,
      rating: 4.7,
      sales: 1234,
      tags: ['营养', '肠胃'],
    },
    {
      id: 4,
      name: '宠物急救包',
      category: 'first-aid',
      description: '包含绷带、消毒液、体温计等基础急救用品',
      price: 158,
      originalPrice: 188,
      image: 'https://images.unsplash.com/photo-1584820927997-cb6ac861f9b0?w=400&h=300&fit=crop',
      stock: 67,
      rating: 4.9,
      sales: 892,
      tags: ['急救', '必备'],
    },
    {
      id: 5,
      name: '犬瘟热治疗药物',
      category: 'treatment',
      description: '针对犬瘟热的综合治疗方案，需兽医指导使用',
      price: 368,
      image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=400&h=300&fit=crop',
      stock: 34,
      rating: 4.6,
      sales: 456,
      tags: ['治疗', '处方'],
    },
    {
      id: 6,
      name: '猫咪体内驱虫药',
      category: 'deworming',
      description: '驱除蛔虫、钩虫等体内寄生虫',
      price: 68,
      originalPrice: 78,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      stock: 178,
      rating: 4.8,
      sales: 1567,
      tags: ['驱虫', '安全'],
    },
    {
      id: 7,
      name: '宠物维生素片',
      category: 'supplement',
      description: '补充多种维生素，促进毛发健康和生长发育',
      price: 98,
      image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=300&fit=crop',
      stock: 145,
      rating: 4.7,
      sales: 987,
      tags: ['营养', '美毛'],
    },
    {
      id: 8,
      name: '狗狗狂犬疫苗',
      category: 'vaccine',
      description: '预防狂犬病，法律要求的必打疫苗',
      price: 58,
      image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=300&fit=crop',
      stock: 267,
      rating: 4.9,
      sales: 3456,
      tags: ['疫苗', '法定'],
    },
  ];

  const categories = [
    { key: 'all', label: '全部', icon: '🏷️' },
    { key: 'vaccine', label: '疫苗', icon: '💉' },
    { key: 'deworming', label: '驱虫', icon: '🐛' },
    { key: 'treatment', label: '治疗', icon: '💊' },
    { key: 'supplement', label: '营养', icon: '🌟' },
    { key: 'first-aid', label: '急救', icon: '🚑' },
  ];

  const filteredMedicines = medicines.filter(medicine => {
    const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
    const matchesSearch = medicine.name.includes(searchQuery) || 
                         medicine.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const addToCart = (medicine: Medicine) => {
    const existingItem = cart.find(item => item.medicine.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.medicine.id === medicine.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId: number) => {
    setCart(cart.filter(item => item.medicine.id !== medicineId));
  };

  const updateQuantity = (medicineId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(cart.map(item => 
      item.medicine.id === medicineId ? { ...item, quantity } : item
    ));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleDetailClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setDetailModalOpen(true);
  };

  const handleConsultSubmit = () => {
    // 提交咨询逻辑
    setConsultModalOpen(false);
  };

  return (
    <div className="community-module">
      <style jsx>{`
        .community-module {
          margin-bottom: 24px;
          border-radius: 20px;
          background: linear-gradient(135deg, #fff5f8 0%, #fff0e6 100%);
          padding: 24px;
          box-shadow: 0 8px 32px rgba(255, 107, 157, 0.15);
        }
        .module-header {
          text-align: center;
          margin-bottom: 24px;
        }
        .module-title {
          font-size: 28px;
          font-weight: bold;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .module-subtitle {
          font-size: 14px;
          color: #999;
        }
        .tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
          justify-content: center;
        }
        .tab {
          padding: 10px 24px;
          border-radius: 25px;
          border: 2px solid #FF6B9D;
          background: white;
          color: #FF6B9D;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          position: relative;
        }
        .tab.active {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
        }
        .tab:hover:not(.active) {
          background: #fff5f8;
        }
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: #FF5252;
          color: white;
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 10px;
          min-width: 18px;
          text-align: center;
        }
        .search-bar {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }
        .search-input {
          flex: 1;
          padding: 12px 20px;
          border: 2px solid #FFD1DC;
          border-radius: 25px;
          font-size: 14px;
          background: white;
        }
        .search-input:focus {
          outline: none;
          border-color: #FF6B9D;
        }
        .search-btn {
          padding: 12px 30px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 25px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }
        .category-filter {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .category-tag {
          padding: 6px 16px;
          border-radius: 20px;
          border: 1px solid #FFD1DC;
          background: white;
          color: #666;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .category-tag.active {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border-color: transparent;
        }
        .medicine-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 20px;
        }
        .medicine-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(255, 107, 157, 0.1);
          transition: all 0.3s;
          cursor: pointer;
        }
        .medicine-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(255, 107, 157, 0.2);
        }
        .medicine-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
          position: relative;
        }
        .medicine-tags {
          position: absolute;
          top: 10px;
          left: 10px;
          display: flex;
          gap: 6px;
        }
        .medicine-tag {
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: #FF6B9D;
        }
        .medicine-content {
          padding: 16px;
        }
        .medicine-name {
          font-size: 15px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
          line-height: 1.4;
        }
        .medicine-desc {
          font-size: 12px;
          color: #999;
          margin-bottom: 12px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .medicine-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .medicine-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #FFB800;
        }
        .medicine-sales {
          font-size: 12px;
          color: #999;
        }
        .medicine-price-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 12px;
        }
        .medicine-price {
          font-size: 20px;
          font-weight: bold;
          color: #FF6B9D;
        }
        .medicine-original-price {
          font-size: 13px;
          color: #999;
          text-decoration: line-through;
        }
        .medicine-stock {
          font-size: 12px;
          color: #4CAF50;
          margin-bottom: 12px;
        }
        .medicine-actions {
          display: flex;
          gap: 8px;
        }
        .add-cart-btn {
          flex: 1;
          padding: 10px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .add-cart-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
        }
        .detail-btn {
          padding: 10px 16px;
          background: white;
          color: #FF6B9D;
          border: 2px solid #FF6B9D;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .detail-btn:hover {
          background: #fff5f8;
        }
        .cart-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .cart-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: white;
          border-radius: 12px;
          margin-bottom: 12px;
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.1);
        }
        .cart-item-image {
          width: 100px;
          height: 100px;
          border-radius: 8px;
          object-fit: cover;
        }
        .cart-item-content {
          flex: 1;
        }
        .cart-item-name {
          font-size: 15px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }
        .cart-item-price {
          font-size: 18px;
          font-weight: bold;
          color: #FF6B9D;
          margin-bottom: 12px;
        }
        .cart-item-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .quantity-btn {
          width: 30px;
          height: 30px;
          border: 2px solid #FFD1DC;
          border-radius: 6px;
          background: white;
          color: #FF6B9D;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .quantity-btn:hover {
          background: #fff5f8;
        }
        .quantity-display {
          font-size: 16px;
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }
        .remove-btn {
          margin-left: auto;
          padding: 6px 12px;
          background: #FF5252;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
        }
        .cart-summary {
          background: white;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
          box-shadow: 0 2px 10px rgba(255, 107, 157, 0.1);
        }
        .cart-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .total-label {
          font-size: 16px;
          color: #666;
        }
        .total-amount {
          font-size: 24px;
          font-weight: bold;
          color: #FF6B9D;
        }
        .checkout-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .checkout-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }
        .consult-form {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 20px rgba(255, 107, 157, 0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }
        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #FFD1DC;
          border-radius: 12px;
          font-size: 14px;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: #FF6B9D;
        }
        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #FFD1DC;
          border-radius: 12px;
          font-size: 14px;
          box-sizing: border-box;
          background: white;
        }
        .form-select:focus {
          outline: none;
          border-color: #FF6B9D;
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .submit-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
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
          animation: fadeIn 0.3s;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 32px;
          max-width: 600px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s;
          position: relative;
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 24px;
          color: #999;
          cursor: pointer;
          background: none;
          border: none;
        }
        .modal-close:hover {
          color: #FF6B9D;
        }
        .detail-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 20px;
        }
        .detail-title {
          font-size: 22px;
          font-weight: bold;
          color: #333;
          margin-bottom: 12px;
        }
        .detail-description {
          font-size: 14px;
          color: #666;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .detail-meta {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin-bottom: 20px;
          padding: 16px;
          background: #fff5f8;
          border-radius: 12px;
        }
        .meta-item {
          font-size: 13px;
          color: #666;
        }
        .meta-value {
          font-weight: 600;
          color: #333;
        }
      `}</style>

      <div className="module-header">
        <h2 className="module-title">💊 宠物医药</h2>
        <p className="module-subtitle">专业宠物药品和营养品，为爱宠健康保驾护航</p>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'catalog' ? 'active' : ''}`}
          onClick={() => setActiveTab('catalog')}
        >
          药品目录
        </div>
        <div
          className={`tab ${activeTab === 'consult' ? 'active' : ''}`}
          onClick={() => setActiveTab('consult')}
        >
          在线咨询
        </div>
        <div
          className={`tab ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => setActiveTab('cart')}
        >
          购物车
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </div>
      </div>

      {activeTab === 'catalog' && (
        <>
          <div className="search-bar">
            <input
              type="text"
              className="search-input"
              placeholder="搜索药品名称或功效..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">搜索</button>
          </div>

          <div className="category-filter">
            {categories.map(cat => (
              <div
                key={cat.key}
                className={`category-tag ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.icon} {cat.label}
              </div>
            ))}
          </div>

          <div className="medicine-grid">
            {filteredMedicines.map(medicine => (
              <div key={medicine.id} className="medicine-card" onClick={() => handleDetailClick(medicine)}>
                <div className="medicine-image">
                  <img src={medicine.image} alt={medicine.name} />
                  <div className="medicine-tags">
                    {medicine.tags.map((tag, index) => (
                      <span key={index} className="medicine-tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="medicine-content">
                  <h3 className="medicine-name">{medicine.name}</h3>
                  <p className="medicine-desc">{medicine.description}</p>
                  
                  <div className="medicine-meta">
                    <div className="medicine-rating">
                      <span>⭐</span>
                      <span>{medicine.rating}</span>
                    </div>
                    <div className="medicine-sales">已售 {medicine.sales}</div>
                  </div>

                  <div className="medicine-price-row">
                    <span className="medicine-price">¥{medicine.price}</span>
                    {medicine.originalPrice && (
                      <span className="medicine-original-price">¥{medicine.originalPrice}</span>
                    )}
                  </div>

                  <div className="medicine-stock">
                    ✓ 库存 {medicine.stock} 件
                  </div>

                  <div className="medicine-actions">
                    <button 
                      className="add-cart-btn"
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(medicine);
                      }}
                    >
                      加入购物车
                    </button>
                    <button 
                      className="detail-btn"
                      onClick={e => {
                        e.stopPropagation();
                        handleDetailClick(medicine);
                      }}
                    >
                      详情
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === 'consult' && (
        <div className="consult-form">
          <div className="form-group">
            <label className="form-label">宠物类型</label>
            <select className="form-select">
              <option value="cat">猫咪</option>
              <option value="dog">狗狗</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">宠物年龄</label>
            <input
              type="text"
              className="form-input"
              placeholder="例如：2 岁 3 个月"
            />
          </div>

          <div className="form-group">
            <label className="form-label">咨询类型</label>
            <select className="form-select">
              <option value="symptom">症状咨询</option>
              <option value="medicine">用药咨询</option>
              <option value="vaccine">疫苗咨询</option>
              <option value="nutrition">营养咨询</option>
              <option value="other">其他</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">详细描述</label>
            <textarea
              className="form-input form-textarea"
              placeholder="请详细描述宠物的症状或您的问题..."
            />
          </div>

          <button className="submit-btn" onClick={handleConsultSubmit}>
            提交咨询
          </button>
        </div>
      )}

      {activeTab === 'cart' && (
        <div className="cart-content">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#999' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontSize: '16px' }}>购物车是空的</p>
              <p style={{ fontSize: '13px', marginTop: '8px' }}>快去挑选需要的宠物药品吧~</p>
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div key={item.medicine.id} className="cart-item">
                  <img 
                    src={item.medicine.image} 
                    alt={item.medicine.name} 
                    className="cart-item-image"
                  />
                  <div className="cart-item-content">
                    <div className="cart-item-name">{item.medicine.name}</div>
                    <div className="cart-item-price">¥{item.medicine.price}</div>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.medicine.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.medicine.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="remove-btn"
                        onClick={() => removeFromCart(item.medicine.id)}
                      >
                        删除
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <div className="cart-total">
                  <span className="total-label">合计 ({cartCount} 件商品)</span>
                  <span className="total-amount">¥{cartTotal}</span>
                </div>
                <button className="checkout-btn">立即结算</button>
              </div>
            </>
          )}
        </div>
      )}

      {detailModalOpen && selectedMedicine && (
        <div className="modal-overlay" onClick={() => setDetailModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setDetailModalOpen(false)}
            >
              ×
            </button>

            <img 
              src={selectedMedicine.image} 
              alt={selectedMedicine.name} 
              className="detail-image"
            />

            <h3 className="detail-title">{selectedMedicine.name}</h3>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-value">¥{selectedMedicine.price}</span>
                {selectedMedicine.originalPrice && (
                  <span style={{ marginLeft: '8px', textDecoration: 'line-through', color: '#999' }}>
                    ¥{selectedMedicine.originalPrice}
                  </span>
                )}
              </div>
              <div className="meta-item">
                评分：<span className="meta-value">⭐ {selectedMedicine.rating}</span>
              </div>
              <div className="meta-item">
                销量：<span className="meta-value">{selectedMedicine.sales}</span>
              </div>
              <div className="meta-item">
                库存：<span className="meta-value">{selectedMedicine.stock} 件</span>
              </div>
            </div>

            <p className="detail-description">
              <strong>商品描述：</strong>{selectedMedicine.description}
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                className="add-cart-btn"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(selectedMedicine);
                  setDetailModalOpen(false);
                }}
              >
                加入购物车
              </button>
              <button 
                className="detail-btn"
                style={{ flex: 1 }}
                onClick={() => {
                  addToCart(selectedMedicine);
                  setDetailModalOpen(false);
                }}
              >
                立即购买
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
