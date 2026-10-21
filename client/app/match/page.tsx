'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, MapPin, Calendar, Users, Heart } from 'lucide-react'

interface MeetupPost {
  _id: string
  title: string
  description: string
  location: string
  date: string
  time: string
  maxParticipants: number
  currentParticipants: number
  image?: string
  category: string
  author: {
    username: string
    avatar?: string
  }
  createdAt: string
}

const mockMeetups: MeetupPost[] = [
  {
    _id: '1',
    title: '周末朝阳公园遛狗聚会',
    description: '欢迎带狗狗一起来朝阳公园玩耍，有草坪可以撒欢，认识更多狗友！',
    location: '北京市朝阳区朝阳公园',
    date: '2025-09-30',
    time: '10:00-14:00',
    maxParticipants: 20,
    currentParticipants: 12,
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    category: 'walking',
    author: { username: '旺财妈妈', avatar: 'W' },
    createdAt: '2025-09-28T10:00:00Z',
  },
  {
    _id: '2',
    title: '宠物友好餐厅探店',
    description: '发现一家超棒的宠物友好餐厅，带毛孩子一起去体验吧！',
    location: '上海市徐汇区武康路',
    date: '2025-10-01',
    time: '14:00-17:00',
    maxParticipants: 10,
    currentParticipants: 6,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
    category: 'park',
    author: { username: '喵星人', avatar: 'M' },
    createdAt: '2025-09-28T09:00:00Z',
  },
  {
    _id: '3',
    title: '新手训狗交流小组',
    description: '一起交流训狗经验，分享实用技巧，让毛孩子更听话！',
    location: '广州市天河区天河公园',
    date: '2025-10-02',
    time: '09:00-11:00',
    maxParticipants: 15,
    currentParticipants: 8,
    category: 'training',
    author: { username: '训犬达人', avatar: 'T' },
    createdAt: '2025-09-27T15:00:00Z',
  },
  {
    _id: '4',
    title: '广州天河宠物野餐会',
    description: '天朗气清，带上你的宠物一起来野餐吧！准备了很多宠物零食和玩具。',
    location: '广州市天河区珠江公园',
    date: '2025-10-05',
    time: '15:00-18:00',
    maxParticipants: 25,
    currentParticipants: 18,
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800',
    category: 'park',
    author: { username: '宠物爱好者', avatar: 'P' },
    createdAt: '2025-09-27T12:00:00Z',
  },
  {
    _id: '5',
    title: '狗狗敏捷训练体验课',
    description: '专业训犬师带队，体验狗狗敏捷训练，提升宠物体能和智力！',
    location: '北京市海淀区中关村森林公园',
    date: '2025-10-06',
    time: '09:00-12:00',
    maxParticipants: 12,
    currentParticipants: 9,
    category: 'training',
    author: { username: '敏捷教练', avatar: 'A' },
    createdAt: '2025-09-26T18:00:00Z',
  },
  {
    _id: '6',
    title: '宠物自驾旅行群 - 郊游',
    description: '周末一起自驾去郊区玩，宠物友好露营地，带上装备一起来！',
    location: '杭州市余杭区青山湖',
    date: '2025-10-12',
    time: '08:00-17:00',
    maxParticipants: 8,
    currentParticipants: 5,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800',
    category: 'travel',
    author: { username: '自驾达人', avatar: 'D' },
    createdAt: '2025-09-26T10:00:00Z',
  },
  {
    _id: '7',
    title: '宠物摄影外拍活动',
    description: '专业宠物摄影师带队，记录毛孩子最可爱的瞬间！自带零食和玩具。',
    location: '成都市武侯区锦城湖公园',
    date: '2025-10-13',
    time: '10:00-15:00',
    maxParticipants: 10,
    currentParticipants: 7,
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800',
    category: 'photo',
    author: { username: '宠物摄影师', avatar: 'S' },
    createdAt: '2025-09-25T14:00:00Z',
  },
]

export default function MatchPage() {
  const [posts, setPosts] = useState<MeetupPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: '全部', icon: '🎯' },
    { id: 'walking', label: '遛狗约伴', icon: '🐕' },
    { id: 'park', label: '公园聚会', icon: '🌳' },
    { id: 'training', label: '训练互助', icon: '🎓' },
    { id: 'travel', label: '宠物旅行', icon: '✈️' },
    { id: 'photo', label: '宠物摄影', icon: '📸' },
  ]

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = async () => {
    try {
      setLoading(true)
      // TODO: 调用后端 API 获取约伴帖子
      // const response = await getMeetupPosts({ category: selectedCategory })

      // 使用模拟数据
      setPosts(mockMeetups)
    } catch (error) {
      console.error('加载约伴帖子失败:', error)
      // fallback 到模拟数据
      setPosts(mockMeetups)
    } finally {
      setLoading(false)
    }
  }

  // 根据分类过滤帖子
  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })
  }

  const getCategoryLabel = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.label || '未知'
  }

  return (
    <div className="match-page">
      {/* 顶部导航 */}
      <div className="top-nav">
        <Link href="/" className="back-btn">
          <ChevronLeft size={20} />
          <span>返回首页</span>
        </Link>
        <h1 className="page-title">同城约伴</h1>
      </div>

      {/* 分类导航 */}
      <div className="category-scroll">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-chip ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            <span className="chip-icon">{cat.icon}</span>
            <span className="chip-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 发布按钮 */}
      <Link href="/match/create" className="publish-fab">
        <span className="fab-icon">+</span>
      </Link>

      {/* 帖子列表 */}
      <div className="posts-container">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner">🐾</div>
            <p>加载中...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3>暂无约伴活动</h3>
            <p>快来发布第一个活动吧！</p>
            <Link href="/match/create" className="empty-btn">
              发布活动
            </Link>
          </div>
        ) : (
          <div className="posts-list">
            {filteredPosts.map((post) => (
              <article key={post._id} className="post-card">
                {post.image && (
                  <div className="post-image">
                    <img src={post.image} alt={post.title} />
                  </div>
                )}
                <div className="post-content">
                  <div className="post-header">
                    <span className="post-category">
                      {getCategoryLabel(post.category)}
                    </span>
                    <span className="post-author">{post.author.username}</span>
                  </div>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  
                  <div className="post-info">
                    <div className="info-item">
                      <MapPin size={14} />
                      <span>{post.location}</span>
                    </div>
                    <div className="info-item">
                      <Calendar size={14} />
                      <span>{formatDate(post.date)} {post.time}</span>
                    </div>
                  </div>

                  <div className="post-participants">
                    <div className="participant-info">
                      <Users size={14} />
                      <span>
                        {post.currentParticipants}/{post.maxParticipants} 人参加
                      </span>
                    </div>
                    <div className="participant-progress">
                      <div 
                        className="progress-bar"
                        style={{
                          width: `${(post.currentParticipants / post.maxParticipants) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="post-actions">
                    <button className="join-btn">
                      <Heart size={16} />
                      <span>报名参加</span>
                    </button>
                  </div>
                </div>
                <Link href={`/match/${post._id}`} className="post-overlay"></Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .match-page {
          min-height: 100vh;
          background: #f8f9fa;
          font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
          padding-bottom: 80px;
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

        .category-scroll {
          background: #fff;
          padding: 16px 20px;
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scrollbar-width: none;
          border-bottom: 1px solid #e9ecef;
        }

        .category-scroll::-webkit-scrollbar {
          display: none;
        }

        .category-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 16px;
          border-radius: 20px;
          border: 2px solid #e9ecef;
          background: #fff;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s;
        }

        .category-chip:hover {
          border-color: #667eea;
          background: #f8f9ff;
        }

        .category-chip.active {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-color: transparent;
          color: #fff;
        }

        .chip-icon {
          font-size: 16px;
        }

        .chip-label {
          font-weight: 500;
        }

        .publish-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
          cursor: pointer;
          transition: transform 0.2s;
          z-index: 50;
        }

        .publish-fab:hover {
          transform: scale(1.1);
        }

        .fab-icon {
          color: #fff;
          font-size: 28px;
          font-weight: 300;
        }

        .posts-container {
          padding: 20px;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }

        .loading-spinner {
          font-size: 48px;
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

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

        .posts-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 20px;
        }

        .post-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
          cursor: pointer;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .post-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .post-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }

        .post-card:hover .post-image img {
          transform: scale(1.05);
        }

        .post-content {
          padding: 20px;
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .post-category {
          background: #eef2ff;
          color: #667eea;
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .post-author {
          font-size: 13px;
          color: #999;
        }

        .post-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 8px;
          line-height: 1.5;
        }

        .post-description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #666;
        }

        .post-participants {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .participant-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #666;
          flex-shrink: 0;
        }

        .participant-progress {
          flex: 1;
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 3px;
          transition: width 0.3s;
        }

        .post-actions {
          display: flex;
          gap: 12px;
        }

        .join-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .join-btn:hover {
          transform: translateY(-2px);
          color: #fff;
        }

        .post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .posts-list {
            grid-template-columns: 1fr;
          }

          .top-nav {
            padding: 12px 16px;
          }

          .page-title {
            font-size: 18px;
          }

          .category-scroll {
            padding: 12px 16px;
          }

          .posts-container {
            padding: 16px;
          }

          .publish-fab {
            bottom: 20px;
            right: 20px;
            width: 52px;
            height: 52px;
          }
        }
      `}</style>
    </div>
  )
}
