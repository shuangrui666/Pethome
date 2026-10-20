'use client';

import { useState } from 'react';

export interface Donation {
  id: number;
  title: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  image: string;
  endDate: string;
  donorCount: number;
  category: 'food' | 'medical' | 'shelter' | 'rescue';
}

export interface DonationRecord {
  id: number;
  donationId: number;
  amount: number;
  donorName: string;
  message: string;
  date: string;
}

export default function ZizhuangLiumangModule() {
  const [activeTab, setActiveTab] = useState<'list' | 'publish'>('list');
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationMessage, setDonationMessage] = useState('');
  const [donorName, setDonorName] = useState('');

  const donationPosts: Donation[] = [
    {
      id: 1,
      title: '流浪猫粮资助计划',
      description: '为社区流浪猫咪提供每日猫粮，让它们不再挨饿',
      targetAmount: 5000,
      raisedAmount: 3280,
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
      endDate: '2025-12-31',
      donorCount: 156,
      category: 'food',
    },
    {
      id: 2,
      title: '流浪狗医疗救助',
      description: '为受伤的流浪狗提供医疗救治和康复护理',
      targetAmount: 10000,
      raisedAmount: 6450,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop',
      endDate: '2025-11-30',
      donorCount: 243,
      category: 'medical',
    },
    {
      id: 3,
      title: '冬日庇护所建设',
      description: '为流浪动物建造温暖的冬季庇护所',
      targetAmount: 8000,
      raisedAmount: 2100,
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
      endDate: '2025-10-15',
      donorCount: 89,
      category: 'shelter',
    },
    {
      id: 4,
      title: '紧急救援行动基金',
      description: '用于紧急情况下的流浪动物救援和转运',
      targetAmount: 15000,
      raisedAmount: 9800,
      image: 'https://images.unsplash.com/photo-1599443015574-be5fe8a05783?w=400&h=300&fit=crop',
      endDate: '2026-01-31',
      donorCount: 412,
      category: 'rescue',
    },
  ];

  const categoryTags = [
    { key: 'all', label: '全部', icon: '🎯' },
    { key: 'food', label: '食物资助', icon: '🍖' },
    { key: 'medical', label: '医疗救助', icon: '💊' },
    { key: 'shelter', label: '庇护所', icon: '🏠' },
    { key: 'rescue', label: '紧急救援', icon: '🚑' },
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDonations = selectedCategory === 'all'
    ? donationPosts
    : donationPosts.filter(d => d.category === selectedCategory);

  const handleDonationClick = (donation: Donation) => {
    setSelectedDonation(donation);
    setDonationModalOpen(true);
  };

  const handleDonationSubmit = () => {
    // 提交捐赠逻辑
    setDonationModalOpen(false);
    setDonationAmount(10);
    setDonationMessage('');
    setDonorName('');
    setSelectedDonation(null);
  };

  const progressColor = (ratio: number) => {
    if (ratio >= 1) return '#4CAF50';
    if (ratio >= 0.5) return '#FF9800';
    return '#FF6B9D';
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
        }
        .tab.active {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
        }
        .tab:hover:not(.active) {
          background: #fff5f8;
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
        .donation-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .donation-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(255, 107, 157, 0.1);
          transition: all 0.3s;
          cursor: pointer;
        }
        .donation-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(255, 107, 157, 0.2);
        }
        .donation-image {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        .donation-content {
          padding: 16px;
        }
        .donation-title {
          font-size: 16px;
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }
        .donation-description {
          font-size: 13px;
          color: #666;
          margin-bottom: 12px;
          line-height: 1.5;
        }
        .progress-bar {
          height: 8px;
          background: #f0f0f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }
        .progress-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.5s;
        }
        .donation-stats {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
          margin-bottom: 8px;
        }
        .donation-amount {
          font-size: 18px;
          font-weight: bold;
          color: #FF6B9D;
          margin-bottom: 4px;
        }
        .donation-donors {
          font-size: 12px;
          color: #999;
        }
        .donation-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }
        .days-left {
          font-size: 12px;
          color: #FF8E53;
          font-weight: 600;
        }
        .donate-btn {
          padding: 8px 20px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .donate-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
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
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s;
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .modal-title {
          font-size: 22px;
          font-weight: bold;
          color: #333;
          margin-bottom: 16px;
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
        .amount-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 20px;
        }
        .amount-option {
          padding: 12px;
          border: 2px solid #FFD1DC;
          border-radius: 12px;
          background: white;
          color: #666;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .amount-option.active {
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border-color: transparent;
        }
        .amount-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #FFD1DC;
          border-radius: 12px;
          font-size: 16px;
          margin-bottom: 16px;
          box-sizing: border-box;
        }
        .amount-input:focus {
          outline: none;
          border-color: #FF6B9D;
        }
        .message-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #FFD1DC;
          border-radius: 12px;
          font-size: 14px;
          margin-bottom: 16px;
          min-height: 100px;
          resize: vertical;
          box-sizing: border-box;
        }
        .message-input:focus {
          outline: none;
          border-color: #FF6B9D;
        }
        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
        }
        .submit-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 6px 20px rgba(255, 107, 157, 0.4);
        }
        .publish-form {
          max-width: 600px;
          margin: 0 auto;
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
      `}</style>

      <div className="module-header">
        <h2 className="module-title">🏠 资助流浪基地</h2>
        <p className="module-subtitle">为流浪动物献出一份爱心，帮助它们找到温暖的家</p>
      </div>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          资助项目
        </div>
        <div
          className={`tab ${activeTab === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveTab('publish')}
        >
          发布资助
        </div>
      </div>

      {activeTab === 'list' && (
        <>
          <div className="category-filter">
            {categoryTags.map(cat => (
              <div
                key={cat.key}
                className={`category-tag ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                {cat.icon} {cat.label}
              </div>
            ))}
          </div>

          <div className="donation-grid">
            {filteredDonations.map(donation => {
              const progressRatio = Math.min(donation.raisedAmount / donation.targetAmount, 1);
              const daysLeft = Math.ceil(
                (new Date(donation.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div key={donation.id} className="donation-card" onClick={() => handleDonationClick(donation)}>
                  <img src={donation.image} alt={donation.title} className="donation-image" />
                  <div className="donation-content">
                    <h3 className="donation-title">{donation.title}</h3>
                    <p className="donation-description">{donation.description}</p>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${progressRatio * 100}%`,
                          background: progressColor(progressRatio),
                        }}
                      />
                    </div>

                    <div className="donation-stats">
                      <span>已筹集：¥{donation.raisedAmount.toLocaleString()}</span>
                      <span>目标：¥{donation.targetAmount.toLocaleString()}</span>
                    </div>

                    <div className="donation-amount">
                      ¥{(donation.targetAmount - donation.raisedAmount).toLocaleString()} 还需
                    </div>
                    <div className="donation-donors">
                      👥 {donation.donorCount} 位爱心人士
                    </div>

                    <div className="donation-footer">
                      <span className="days-left">⏰ 剩余 {daysLeft} 天</span>
                      <button className="donate-btn">立即资助</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {activeTab === 'publish' && (
        <div className="publish-form">
          <div className="form-group">
            <label className="form-label">资助项目名称</label>
            <input
              type="text"
              className="form-input"
              placeholder="例如：社区流浪猫绝育计划"
            />
          </div>

          <div className="form-group">
            <label className="form-label">项目类别</label>
            <select className="form-select">
              <option value="food">食物资助</option>
              <option value="medical">医疗救助</option>
              <option value="shelter">庇护所建设</option>
              <option value="rescue">紧急救援</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">项目描述</label>
            <textarea
              className="form-input form-textarea"
              placeholder="请详细描述资助项目的目的、用途和预期效果..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">目标金额 (元)</label>
            <input
              type="number"
              className="form-input"
              placeholder="请输入目标金额"
            />
          </div>

          <div className="form-group">
            <label className="form-label">截止日期</label>
            <input
              type="date"
              className="form-input"
            />
          </div>

          <button className="submit-btn">发布资助项目</button>
        </div>
      )}

      {donationModalOpen && selectedDonation && (
        <div className="modal-overlay" onClick={() => setDonationModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setDonationModalOpen(false)}
            >
              ×
            </button>

            <h3 className="modal-title">{selectedDonation.title}</h3>

            <div className="progress-bar" style={{ marginBottom: '20px' }}>
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(selectedDonation.raisedAmount / selectedDonation.targetAmount, 1) * 100}%`,
                  background: progressColor(selectedDonation.raisedAmount / selectedDonation.targetAmount),
                }}
              />
            </div>

            <div className="donation-stats" style={{ marginBottom: '20px' }}>
              <span>已筹集：¥{selectedDonation.raisedAmount.toLocaleString()}</span>
              <span>目标：¥{selectedDonation.targetAmount.toLocaleString()}</span>
            </div>

            <p style={{ color: '#666', fontSize: '14px', marginBottom: '24px' }}>
              {selectedDonation.description}
            </p>

            <label className="form-label">选择捐赠金额</label>
            <div className="amount-options">
              {[10, 50, 100, 200, 500, 1000].map(amount => (
                <div
                  key={amount}
                  className={`amount-option ${donationAmount === amount ? 'active' : ''}`}
                  onClick={() => setDonationAmount(amount)}
                >
                  ¥{amount}
                </div>
              ))}
            </div>

            <label className="form-label">自定义金额</label>
            <input
              type="number"
              className="amount-input"
              value={donationAmount}
              onChange={e => setDonationAmount(Number(e.target.value))}
              placeholder="请输入捐赠金额"
            />

            <label className="form-label">您的姓名 (可选)</label>
            <input
              type="text"
              className="amount-input"
              value={donorName}
              onChange={e => setDonorName(e.target.value)}
              placeholder="留下您的名字"
            />

            <label className="form-label">爱心寄语 (可选)</label>
            <textarea
              className="message-input"
              value={donationMessage}
              onChange={e => setDonationMessage(e.target.value)}
              placeholder="写下您的祝福或鼓励..."
            />

            <button className="submit-btn" onClick={handleDonationSubmit}>
              确认捐赠 ¥{donationAmount}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
