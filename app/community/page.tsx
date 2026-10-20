'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPosts, Post } from '../../src/api/post'

// 模拟社区帖子数据
const mockPosts: Post[] = [
  {
    _id: 'post1',
    title: '新手养狗必看！我的 30 天养狗经验总结',
    content: '刚接回豆豆的时候真的手忙脚乱，现在总结了一些经验分享给大家：1. 第一天不要洗澡，让它适应环境；2. 准备合适的狗粮，从小颗粒开始；3. 每天定时定量喂食... ',
    category: 'feeding',
    author: {
      _id: 'user1',
      username: '豆豆妈妈',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'],
    likes: ['user1', 'user2', 'user3'],
    viewCount: 1256,
    createdAt: '2025-01-18',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'post2',
    title: '猫咪突然不吃饭怎么办？我的亲身经历',
    content: '昨天开始咪咪突然不吃猫粮了，急死我了。尝试了各种方法，最后发现是猫粮变质了！提醒大家一定要检查食物的保质期，还有猫碗要每天清洗... ',
    category: 'health',
    author: {
      _id: 'user2',
      username: '喵星人铲屎官',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
    likes: ['user1', 'user5'],
    viewCount: 892,
    createdAt: '2025-01-17',
    updatedAt: '2025-01-19',
  },
  {
    _id: 'post3',
    title: '狗狗训练小技巧：如何教狗狗握手',
    content: '训练豆豆握手花了两周时间，分享一些心得：1. 选择安静的环境；2. 用零食引导；3. 每次训练不超过 10 分钟；4. 多鼓励少惩罚。现在豆豆已经会握手、作揖、打滚了！ ',
    category: 'training',
    author: {
      _id: 'user3',
      username: '训练师小王',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800'],
    likes: ['user1', 'user2', 'user4', 'user6'],
    viewCount: 2341,
    createdAt: '2025-01-16',
    updatedAt: '2025-01-18',
  },
  {
    _id: 'post4',
    title: '分享几款好用的宠物用品',
    content: '用了一段时间的自动喂食器、饮水机、猫砂盆，来给大家做个评测。自动喂食器推荐小米的，性价比高；饮水机选有过滤功能的；猫砂盆一定要选空间大的... ',
    category: 'product',
    author: {
      _id: 'user4',
      username: '宠物用品测评师',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    likes: ['user1', 'user3', 'user5', 'user7'],
    viewCount: 3567,
    createdAt: '2025-01-15',
    updatedAt: '2025-01-17',
  },
  {
    _id: 'post5',
    title: '狗狗分离焦虑怎么办？',
    content: '豆豆刚到家的时候，我每次出门它都会叫。后来我用了这些方法：1. 出门前让它运动消耗体力；2. 留下有主人气味的衣服；3. 放轻音乐；4. 不要出门回家时太热情。现在好多了！ ',
    category: 'behavior',
    author: {
      _id: 'user5',
      username: '爱心主人',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    likes: ['user2', 'user4'],
    viewCount: 1678,
    createdAt: '2025-01-14',
    updatedAt: '2025-01-16',
  },
  {
    _id: 'post6',
    title: '我和流浪猫的故事',
    content: '三年前在小区门口捡到了这只小橘猫，当时它才两个月大，瘦骨嶙峋。现在已经是 10 斤重的胖橘了。分享我们之间的点点滴滴... ',
    category: 'story',
    author: {
      _id: 'user6',
      username: '流浪猫救助人',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=800'],
    likes: ['user1', 'user2', 'user3', 'user4', 'user5'],
    viewCount: 4521,
    createdAt: '2025-01-13',
    updatedAt: '2025-01-15',
  },
  {
    _id: 'post7',
    title: '猫咪换粮攻略',
    content: '给猫咪换粮一定要循序渐进！我用了 7 天时间：第 1-2 天 75% 旧粮 +25% 新粮；第 3-4 天 50%+50%；第 5-6 天 25%+75%；第 7 天完全换新的。期间注意观察便便情况... ',
    category: 'feeding',
    author: {
      _id: 'user7',
      username: '科学养猫',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    },
    photos: ['https://images.unsplash.com/photo-1574158622682-e40e69881006?w=800'],
    likes: ['user1', 'user3', 'user6'],
    viewCount: 2156,
    createdAt: '2025-01-12',
    updatedAt: '2025-01-14',
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState<string>('all')

  useEffect(() => {
    loadPosts()
  }, [category])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (category !== 'all') params.category = category

      const data = await getPosts(params)
      const result = data.data || []
      // 如果 API 返回空数组，使用模拟数据
      setPosts(result.length > 0 ? result : mockPosts)
    } catch (error) {
      console.error('加载社区帖子失败:', error)
      // API 失败时使用模拟数据
      setPosts(mockPosts)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryInfo = (category: string) => {
    const config: any = {
      all: { label: '全部', color: '#6366f1', bg: '#eef2ff' },
      feeding: { label: '喂养', color: '#f59e0b', bg: '#fef3c7' },
      training: { label: '训练', color: '#10b981', bg: '#d1fae5' },
      health: { label: '健康', color: '#ef4444', bg: '#fee2e2' },
      behavior: { label: '行为', color: '#8b5cf6', bg: '#ede9fe' },
      product: { label: '好物', color: '#ec4899', bg: '#fce7f3' },
      story: { label: '故事', color: '#f97316', bg: '#ffedd5' },
    }
    return config[category] || config.all
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(hours / 24)

    if (hours < 1) return '刚刚'
    if (hours < 24) return `${hours}小时前`
    if (days < 7) return `${days}天前`
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="community-page">
      {/* 顶部横幅 */}
      <div className="hero-section">
        <div className="hero-bg-decoration">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-icon-wrapper">
              <span className="hero-icon">🐾</span>
            </div>
            <h1 className="hero-title">萌宠社区</h1>
            <p className="hero-subtitle">与百万宠主分享养宠经验，记录毛孩子的快乐时光</p>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">10W+</span>
                <span className="stat-label">帖子</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5W+</span>
                <span className="stat-label">宠主</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">100W+</span>
                <span className="stat-label">互动</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container main-content">
        {/* 分类导航 */}
        <div className="category-nav">
          <div className="category-list">
            {['all', 'feeding', 'training', 'health', 'behavior', 'product', 'story'].map((cat) => {
              const info = getCategoryInfo(cat)
              const isActive = category === cat
              return (
                <button
                  key={cat}
                  className={`category-tab ${isActive ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                  style={{
                    backgroundColor: isActive ? info.color : 'transparent',
                    color: isActive ? '#fff' : info.color,
                    borderColor: isActive ? info.color : info.bg,
                  }}
                >
                  <span className="tab-label">{info.label}</span>
                  {isActive && <span className="tab-indicator"></span>}
                </button>
              )
            })}
          </div>
          <Link href="/community/create" className="publish-btn">
            <span className="btn-icon">✏️</span>
            <span className="btn-text">发布</span>
          </Link>
        </div>

        {/* 帖子列表 */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-paw">🐾</div>
            </div>
            <p className="loading-text">加载中...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-illustration">
              <span className="empty-pet-1">🐱</span>
              <span className="empty-pet-2">🐶</span>
            </div>
            <h3 className="empty-title">这里空空如也</h3>
            <p className="empty-subtitle">成为第一个分享的人吧！</p>
            <Link href="/community/create" className="empty-btn">
              <span>✨ 发布第一篇帖子</span>
            </Link>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => {
              const catInfo = getCategoryInfo(post.category)
              return (
                <article key={post._id} className="post-card">
                  {post.photos?.[0] && (
                    <div className="post-image-wrapper">
                      <img src={post.photos[0]} alt={post.title} className="post-image" />
                      <div className="image-overlay">
                        <span className="view-hint">点击查看</span>
                      </div>
                    </div>
                  )}
                  <div className="post-content">
                    <div className="post-header">
                      <span
                        className="post-category"
                        style={{ backgroundColor: catInfo.bg, color: catInfo.color }}
                      >
                        {catInfo.label}
                      </span>
                      <span className="post-time">{formatDate(post.createdAt)}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">
                      {post.content?.substring(0, 120)}
                      {post.content?.length > 120 ? '...' : ''}
                    </p>
                    <div className="post-footer">
                      <div className="post-author">
                        <div className="author-avatar">
                          {post.author?.username?.[0] || 'U'}
                        </div>
                        <span className="author-name">{post.author?.username || '匿名用户'}</span>
                      </div>
                      <div className="post-actions">
                        <span className="action-item">
                          <span className="action-icon">❤️</span>
                          <span>{post.likes?.length || 0}</span>
                        </span>
                        <span className="action-item">
                          <span className="action-icon">👁️</span>
                          <span>{post.viewCount || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href={`/community/${post._id}`} className="post-link-overlay"></Link>
                </article>
              )
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        /* 全局字体 */
        .community-page {
          min-height: 100vh;
          background: #fafbfc;
          font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
        }

        /* 顶部横幅 */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 60px 0 80px;
          overflow: hidden;
        }

        .hero-bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
        }

        .circle-1 {
          width: 300px;
          height: 300px;
          top: -100px;
          right: -50px;
        }

        .circle-2 {
          width: 200px;
          height: 200px;
          bottom: 50px;
          left: 10%;
        }

        .circle-3 {
          width: 150px;
          height: 150px;
          top: 30%;
          right: 20%;
        }

        .hero-content {
          position: relative;
          text-align: center;
          color: #fff;
        }

        .hero-icon-wrapper {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          backdrop-filter: blur(10px);
        }

        .hero-icon {
          font-size: 40px;
        }

        .hero-title {
          font-size: 42px;
          font-weight: 700;
          margin: 0 0 16px;
          letter-spacing: 2px;
        }

        .hero-subtitle {
          font-size: 16px;
          opacity: 0.9;
          margin: 0 0 30px;
          font-weight: 400;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 16px;
          padding: 20px 40px;
          backdrop-filter: blur(10px);
          display: inline-flex;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
        }

        .stat-label {
          font-size: 12px;
          opacity: 0.8;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 255, 255, 0.3);
        }

        /* 主内容区 */
        .main-content {
          margin-top: -40px;
          padding-bottom: 60px;
          position: relative;
          z-index: 1;
        }

        /* 分类导航 */
        .category-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #fff;
          border-radius: 16px;
          padding: 16px 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          margin-bottom: 32px;
        }

        .category-list {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          flex: 1;
        }

        .category-tab {
          padding: 10px 20px;
          border-radius: 12px;
          border: 2px solid;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .category-tab:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .category-tab.active {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .tab-label {
          font-weight: 600;
        }

        .tab-indicator {
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
        }

        .publish-btn {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          white-space: nowrap;
        }

        .publish-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          color: #fff;
        }

        .btn-icon {
          font-size: 16px;
        }

        /* 帖子网格 */
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }

        .post-card {
          background: #fff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .post-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .post-image-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .post-card:hover .post-image {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .post-card:hover .image-overlay {
          opacity: 1;
        }

        .view-hint {
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          background: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
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
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
        }

        .post-time {
          font-size: 12px;
          color: #999;
        }

        .post-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 10px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-excerpt {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .post-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }

        .post-author {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .author-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
        }

        .author-name {
          font-size: 13px;
          color: #666;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .post-actions {
          display: flex;
          gap: 16px;
        }

        .action-item {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: #999;
        }

        .action-icon {
          font-size: 14px;
        }

        .post-link-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* 加载状态 */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 20px;
        }

        .loading-spinner {
          position: relative;
          width: 60px;
          height: 60px;
          margin-bottom: 20px;
        }

        .spinner-ring {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px solid transparent;
          border-top-color: #667eea;
          border-radius: 50%;
          animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }

        .spinner-ring:nth-child(2) {
          border-top-color: #764ba2;
          animation-delay: -0.75s;
        }

        .spinner-ring:nth-child(3) {
          border-top-color: #f093fb;
          animation-delay: -1.5s;
        }

        .spinner-paw {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loading-text {
          color: #999;
          font-size: 14px;
          margin: 0;
        }

        /* 空状态 */
        .empty-state {
          background: #fff;
          border-radius: 16px;
          padding: 80px 20px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .empty-illustration {
          position: relative;
          height: 120px;
          margin-bottom: 24px;
        }

        .empty-pet-1, .empty-pet-2 {
          position: absolute;
          font-size: 60px;
          animation: float 3s ease-in-out infinite;
        }

        .empty-pet-1 {
          left: 35%;
          top: 20px;
        }

        .empty-pet-2 {
          right: 35%;
          top: 30px;
          animation-delay: 1.5s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .empty-title {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px;
        }

        .empty-subtitle {
          font-size: 14px;
          color: #999;
          margin: 0 0 24px;
        }

        .empty-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: #fff;
          padding: 12px 32px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .empty-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
          color: #fff;
        }

        /* 响应式 */
        @media (max-width: 768px) {
          .hero-title {
            font-size: 28px;
          }

          .hero-subtitle {
            font-size: 14px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 10px;
            padding: 16px 24px;
          }

          .stat-divider {
            width: 30px;
            height: 1px;
          }

          .category-nav {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
          }

          .category-list {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 8px;
          }

          .publish-btn {
            width: 100%;
            justify-content: center;
          }

          .posts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
