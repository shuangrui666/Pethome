'use client';

import { useState } from 'react';

interface TrainingPost {
  id: number;
  trainerName: string;
  trainerAvatar: string;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  studentCount: number;
  image: string;
  tags: string[];
  isAvailable: boolean;
}

interface BookingModal {
  isOpen: boolean;
  post: TrainingPost | null;
}

const XungouModule = () => {
  const [activeTab, setActiveTab] = useState<'list' | 'publish'>('list');
  const [bookingModal, setBookingModal] = useState<BookingModal>({ isOpen: false, post: null });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [bookingForm, setBookingForm] = useState({
    date: '',
    time: '',
    petName: '',
    petType: '',
    problem: '',
    contact: '',
  });

  const categories = [
    { value: 'all', label: '全部', icon: '🏆' },
    { value: 'basic', label: '基础训练', icon: '🎓' },
    { value: 'behavior', label: '行为矫正', icon: '✨' },
    { value: 'agility', label: '敏捷训练', icon: '🏃' },
    { value: 'obedience', label: '服从训练', icon: '👔' },
    { value: 'social', label: '社交训练', icon: '🤝' },
  ];

  const trainingPosts: TrainingPost[] = [
    {
      id: 1,
      trainerName: '王教练',
      trainerAvatar: '👨‍🏫',
      title: '幼犬基础训练课程',
      description: '专为 3-6 个月幼犬设计的基础训练，包括坐下、握手、定点大小便等基础指令',
      category: 'basic',
      price: 800,
      duration: '4 周',
      location: '朝阳区训练基地',
      rating: 4.9,
      studentCount: 156,
      image: '🐕',
      tags: ['幼犬', '基础指令', '定点训练'],
      isAvailable: true,
    },
    {
      id: 2,
      trainerName: '李教练',
      trainerAvatar: '👩‍🏫',
      title: '狗狗行为矫正服务',
      description: '解决乱叫、扑人、咬东西等行为问题，科学矫正方法',
      category: 'behavior',
      price: 1200,
      duration: '6 周',
      location: '上门训练',
      rating: 4.8,
      studentCount: 89,
      image: '🐩',
      tags: ['行为矫正', '上门', '个性化'],
      isAvailable: true,
    },
    {
      id: 3,
      trainerName: '张教练',
      trainerAvatar: '👨‍🏫',
      title: '敏捷训练进阶课程',
      description: '提升狗狗的敏捷度和协调性，包含障碍跨越、隧道穿越等项目',
      category: 'agility',
      price: 1500,
      duration: '8 周',
      location: '海淀区训练场',
      rating: 4.9,
      studentCount: 67,
      image: '🐕‍🦺',
      tags: ['敏捷', '运动', '进阶'],
      isAvailable: true,
    },
    {
      id: 4,
      trainerName: '赵教练',
      trainerAvatar: '👩‍🏫',
      title: '服从训练高级班',
      description: '强化狗狗的服从性，适用于工作犬和展示犬训练',
      category: 'obedience',
      price: 2000,
      duration: '10 周',
      location: '丰台区训练中心',
      rating: 4.7,
      studentCount: 45,
      image: '🦮',
      tags: ['服从', '高级', '专业'],
      isAvailable: true,
    },
    {
      id: 5,
      trainerName: '刘教练',
      trainerAvatar: '👨‍🏫',
      title: '狗狗社交训练',
      description: '帮助狗狗更好地与其他狗狗和人类互动，改善社交能力',
      category: 'social',
      price: 600,
      duration: '4 周',
      location: '朝阳区训练基地',
      rating: 4.6,
      studentCount: 112,
      image: '🐶',
      tags: ['社交', '群体训练', '友好'],
      isAvailable: true,
    },
    {
      id: 6,
      trainerName: '陈教练',
      trainerAvatar: '👩‍🏫',
      title: '家庭宠物犬综合训练',
      description: '适合家庭宠物的综合训练课程，包含基础指令和行为管理',
      category: 'basic',
      price: 1000,
      duration: '6 周',
      location: '东城区训练室',
      rating: 4.8,
      studentCount: 203,
      image: '🐕',
      tags: ['家庭宠物', '综合', '实用'],
      isAvailable: true,
    },
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? trainingPosts 
    : trainingPosts.filter(post => post.category === selectedCategory);

  const handleBookClick = (post: TrainingPost) => {
    setBookingModal({ isOpen: true, post });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`预约成功！\n课程：${bookingModal.post?.title}\n日期：${bookingForm.date}\n时间：${bookingForm.time}\n我们会尽快与您联系确认`);
    setBookingModal({ isOpen: false, post: null });
    setBookingForm({ date: '', time: '', petName: '', petType: '', problem: '', contact: '' });
  };

  return (
    <div className="xungou-module">
      <style jsx>{`
        .xungou-module {
          background: linear-gradient(135deg, #fff5f7 0%, #fff0f3 100%);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.15);
        }

        .module-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .module-title {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 10px;
        }

        .module-subtitle {
          font-size: 16px;
          color: #888;
        }

        .tabs {
          display: flex;
          gap: 15px;
          margin-bottom: 30px;
          justify-content: center;
        }

        .tab {
          padding: 12px 30px;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          background: #fff;
          color: #666;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .tab.active {
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          color: #fff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .category-filter {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-btn {
          padding: 10px 20px;
          border: 2px solid #FFD6E5;
          border-radius: 20px;
          background: #fff;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .category-btn:hover {
          border-color: #FF6B9D;
          transform: translateY(-2px);
        }

        .category-btn.active {
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          border-color: transparent;
          color: #fff;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 25px;
        }

        .post-card {
          background: #fff;
          border-radius: 18px;
          padding: 25px;
          box-shadow: 0 4px 16px rgba(255, 107, 157, 0.12);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .post-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 24px rgba(255, 107, 157, 0.2);
        }

        .post-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .trainer-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FFD6E5, #FFE5D9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
        }

        .trainer-info {
          flex: 1;
        }

        .trainer-name {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 4px;
        }

        .trainer-rating {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: #FFA726;
        }

        .post-image {
          font-size: 80px;
          text-align: center;
          margin-bottom: 20px;
        }

        .post-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .post-description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 15px;
        }

        .post-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .tag {
          padding: 6px 14px;
          background: #FFF0F5;
          color: #FF6B9D;
          border-radius: 15px;
          font-size: 12px;
          font-weight: 500;
        }

        .post-details {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-top: 20px;
          border-top: 1px solid #F0F0F0;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .detail-label {
          font-size: 12px;
          color: #999;
        }

        .detail-value {
          font-size: 14px;
          font-weight: 600;
          color: #666;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .price {
          font-size: 24px;
          font-weight: bold;
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .price-unit {
          font-size: 14px;
          color: #999;
        }

        .book-btn {
          padding: 12px 30px;
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          color: #fff;
          border: none;
          border-radius: 25px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
        }

        .book-btn.disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .publish-form {
          max-width: 600px;
          margin: 0 auto;
          background: #fff;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 4px 16px rgba(255, 107, 157, 0.12);
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-label {
          display: block;
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 10px;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 14px;
          border: 2px solid #F0F0F0;
          border-radius: 12px;
          font-size: 15px;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          outline: none;
          border-color: #FF6B9D;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.1);
        }

        .form-textarea {
          min-height: 120px;
          resize: vertical;
        }

        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #FF6B9D, #FF8E53);
          color: #fff;
          border: none;
          border-radius: 12px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(255, 107, 157, 0.3);
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

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 25px;
          text-align: center;
        }

        .modal-close {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 28px;
          color: #999;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .modal-close:hover {
          color: #FF6B9D;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #999;
        }

        .empty-icon {
          font-size: 80px;
          margin-bottom: 20px;
        }

        .empty-text {
          font-size: 18px;
        }
      `}</style>

      <div className="module-header">
        <h2 className="module-title">🐕 训狗服务</h2>
        <p className="module-subtitle">专业训犬师在线预约，让您的狗狗更乖巧</p>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => setActiveTab('list')}
        >
          课程列表
        </button>
        <button 
          className={`tab ${activeTab === 'publish' ? 'active' : ''}`}
          onClick={() => setActiveTab('publish')}
        >
          发布课程
        </button>
      </div>

      {activeTab === 'list' && (
        <>
          <div className="category-filter">
            {categories.map(cat => (
              <button
                key={cat.value}
                className={`category-btn ${selectedCategory === cat.value ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.value)}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="posts-grid">
            {filteredPosts.map(post => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="trainer-avatar">{post.trainerAvatar}</div>
                  <div className="trainer-info">
                    <div className="trainer-name">{post.trainerName}</div>
                    <div className="trainer-rating">
                      <span>⭐</span>
                      <span>{post.rating}</span>
                      <span>·</span>
                      <span>{post.studentCount}学员</span>
                    </div>
                  </div>
                </div>

                <div className="post-image">{post.image}</div>

                <h3 className="post-title">{post.title}</h3>
                <p className="post-description">{post.description}</p>

                <div className="post-tags">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="post-details">
                  <div className="detail-item">
                    <span className="detail-label">时长</span>
                    <span className="detail-value">{post.duration}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">地点</span>
                    <span className="detail-value">{post.location}</span>
                  </div>
                </div>

                <div className="post-footer">
                  <div className="price">
                    ¥{post.price}
                    <span className="price-unit">/课程</span>
                  </div>
                  <button 
                    className={`book-btn ${!post.isAvailable ? 'disabled' : ''}`}
                    onClick={() => handleBookClick(post)}
                    disabled={!post.isAvailable}
                  >
                    {post.isAvailable ? '立即预约' : '已满员'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <div className="empty-text">暂无该类别的训练课程</div>
            </div>
          )}
        </>
      )}

      {activeTab === 'publish' && (
        <div className="publish-form">
          <form>
            <div className="form-group">
              <label className="form-label">课程标题</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="请输入课程标题"
              />
            </div>

            <div className="form-group">
              <label className="form-label">课程描述</label>
              <textarea 
                className="form-textarea"
                placeholder="请详细描述课程内容、适合对象等"
              />
            </div>

            <div className="form-group">
              <label className="form-label">训练类别</label>
              <select className="form-select">
                <option value="basic">基础训练</option>
                <option value="behavior">行为矫正</option>
                <option value="agility">敏捷训练</option>
                <option value="obedience">服从训练</option>
                <option value="social">社交训练</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">课程价格 (元)</label>
              <input 
                type="number" 
                className="form-input"
                placeholder="请输入课程价格"
              />
            </div>

            <div className="form-group">
              <label className="form-label">课程时长</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="例如：4 周、8 周"
              />
            </div>

            <div className="form-group">
              <label className="form-label">训练地点</label>
              <input 
                type="text" 
                className="form-input"
                placeholder="请输入训练地点"
              />
            </div>

            <button type="submit" className="submit-btn">
              发布课程
            </button>
          </form>
        </div>
      )}

      {bookingModal.isOpen && bookingModal.post && (
        <div className="modal-overlay" onClick={() => setBookingModal({ isOpen: false, post: null })}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setBookingModal({ isOpen: false, post: null })}>&times;</span>
            <h3 className="modal-title">预约课程</h3>
            
            <form onSubmit={handleBookingSubmit}>
              <div className="form-group">
                <label className="form-label">狗狗姓名</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={bookingForm.petName}
                  onChange={e => setBookingForm({ ...bookingForm, petName: e.target.value })}
                  placeholder="请输入狗狗姓名"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">狗狗品种</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={bookingForm.petType}
                  onChange={e => setBookingForm({ ...bookingForm, petType: e.target.value })}
                  placeholder="请输入狗狗品种"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">希望训练日期</label>
                <input 
                  type="date" 
                  className="form-input"
                  value={bookingForm.date}
                  onChange={e => setBookingForm({ ...bookingForm, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">希望训练时间</label>
                <select 
                  className="form-select"
                  value={bookingForm.time}
                  onChange={e => setBookingForm({ ...bookingForm, time: e.target.value })}
                  required
                >
                  <option value="">请选择时间</option>
                  <option value="上午 9:00-12:00">上午 9:00-12:00</option>
                  <option value="下午 14:00-17:00">下午 14:00-17:00</option>
                  <option value="晚上 18:00-20:00">晚上 18:00-20:00</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">训练需求描述</label>
                <textarea 
                  className="form-textarea"
                  value={bookingForm.problem}
                  onChange={e => setBookingForm({ ...bookingForm, problem: e.target.value })}
                  placeholder="请描述您希望训练的内容或狗狗目前存在的问题"
                />
              </div>

              <div className="form-group">
                <label className="form-label">联系方式</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={bookingForm.contact}
                  onChange={e => setBookingForm({ ...bookingForm, contact: e.target.value })}
                  placeholder="请输入您的电话或微信"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                提交预约
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default XungouModule;
