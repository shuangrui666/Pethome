'use client'

import React, { useState } from 'react'

interface YuebanPost {
  id: number
  title: string
  description: string
  petType: string
  petName: string
  petImage: string
  location: string
  date: string
  time: string
  maxParticipants: number
  currentParticipants: number
  tags: string[]
  image: string
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  participants: Array<{
    name: string
    avatar: string
    petName: string
    petType: string
  }>
}

export default function TongchengYuebanModule() {
  const [activeTab, setActiveTab] = useState<'list' | 'publish'>('list')
  const [selectedPost, setSelectedPost] = useState<YuebanPost | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [joinForm, setJoinForm] = useState({
    name: '',
    petName: '',
    petType: '',
    notes: ''
  })

  const yuebanPosts: YuebanPost[] = [
    {
      id: 1,
      title: '周末朝阳公园遛狗约伴',
      description: '周六上午带我家金毛去朝阳公园散步，有同样爱狗的小伙伴一起吗？可以互相交流养狗经验，让狗狗们一起玩耍！',
      petType: '狗',
      petName: '豆豆',
      petImage: '🐕',
      location: '朝阳公园',
      date: '2025-10-12',
      time: '09:00-11:00',
      maxParticipants: 5,
      currentParticipants: 3,
      tags: ['遛狗', '社交', '公园'],
      image: '🌳',
      author: {
        name: '小美',
        avatar: '👧',
        verified: true
      },
      participants: [
        { name: '小明', avatar: '👦', petName: '旺财', petType: '狗' },
        { name: '小红', avatar: '👩', petName: '雪球', petType: '狗' },
        { name: '小李', avatar: '🧑', petName: '小黑', petType: '狗' }
      ]
    },
    {
      id: 2,
      title: '海淀区宠物友好咖啡馆聚会',
      description: '发现一家超棒的宠物友好咖啡馆，带毛孩子们一起去放松一下吧！店里还有宠物零食和玩具。',
      petType: '猫/狗',
      petName: '咪咪',
      petImage: '🐱',
      location: '海淀区五道口',
      date: '2025-10-13',
      time: '14:00-16:00',
      maxParticipants: 8,
      currentParticipants: 5,
      tags: ['咖啡馆', '社交', '休闲'],
      image: '☕',
      author: {
        name: '阿强',
        avatar: '🧑',
        verified: true
      },
      participants: [
        { name: '小张', avatar: '👨', petName: '花花', petType: '猫' },
        { name: '小王', avatar: '👩', petName: '大黄', petType: '狗' },
        { name: '小刘', avatar: '👧', petName: '小白', petType: '猫' },
        { name: '小陈', avatar: '👦', petName: '豆豆', petType: '狗' },
        { name: '小杨', avatar: '🧑', petName: '墨墨', petType: '猫' }
      ]
    },
    {
      id: 3,
      title: '奥森公园宠物跑步活动',
      description: '每天早上在奥林匹克森林公园跑步，欢迎带宠物一起加入！适合精力充沛的狗狗，让我们一起健康运动吧。',
      petType: '狗',
      petName: '闪电',
      petImage: '🐕',
      location: '奥林匹克森林公园',
      date: '2025-10-14',
      time: '06:30-08:00',
      maxParticipants: 10,
      currentParticipants: 6,
      tags: ['跑步', '运动', '健康'],
      image: '🏃',
      author: {
        name: '运动达人',
        avatar: '💪',
        verified: true
      },
      participants: [
        { name: '阿伟', avatar: '👨', petName: '飞飞', petType: '狗' },
        { name: '丽丽', avatar: '👩', petName: '奔奔', petType: '狗' },
        { name: '强强', avatar: '🧑', petName: '快快', petType: '狗' },
        { name: '美美', avatar: '👧', petName: '跳跳', petType: '狗' },
        { name: '壮壮', avatar: '👦', petName: '跑跑', petType: '狗' },
        { name: '甜甜', avatar: '👩', petName: '球球', petType: '狗' }
      ]
    },
    {
      id: 4,
      title: '周末宠物亲子活动',
      description: '组织一场宠物和小朋友的互动活动，让孩子们和宠物一起玩耍，培养爱心和责任感。',
      petType: '猫/狗',
      petName: '糖糖',
      petImage: '🐱',
      location: '顺义区宠物乐园',
      date: '2025-10-15',
      time: '10:00-15:00',
      maxParticipants: 15,
      currentParticipants: 8,
      tags: ['亲子', '互动', '教育'],
      image: '🎪',
      author: {
        name: '爱心妈妈',
        avatar: '👩‍👧',
        verified: true
      },
      participants: [
        { name: '张妈妈', avatar: '👩', petName: '豆豆', petType: '狗' },
        { name: '李爸爸', avatar: '👨', petName: '咪咪', petType: '猫' },
        { name: '王妈妈', avatar: '👩', petName: '花花', petType: '猫' },
        { name: '赵爸爸', avatar: '👨', petName: '旺财', petType: '狗' },
        { name: '刘妈妈', avatar: '👧', petName: '雪球', petType: '狗' },
        { name: '陈爸爸', avatar: '🧑', petName: '小黑', petType: '狗' },
        { name: '杨妈妈', avatar: '👩', petName: '小白', petType: '猫' },
        { name: '黄爸爸', avatar: '👨', petName: '大黄', petType: '狗' }
      ]
    }
  ]

  const handleJoinClick = (post: YuebanPost) => {
    setSelectedPost(post)
    setShowJoinModal(true)
  }

  const handleJoinSubmit = () => {
    // 模拟加入成功
    setShowJoinModal(false)
    setJoinForm({ name: '', petName: '', petType: '', notes: '' })
    alert('🎉 加入成功！期待和你一起玩耍~')
  }

  const handleDetailClick = (post: YuebanPost) => {
    setSelectedPost(post)
    setShowDetailModal(true)
  }

  const styles: any = {
    moduleContainer: {
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '40px',
      position: 'relative',
      overflow: 'hidden',
    },
    moduleHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      marginBottom: '30px',
      color: '#fff',
    },
    moduleIcon: {
      fontSize: '48px',
      animation: 'float 3s ease-in-out infinite',
    },
    moduleTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: 0,
    },
    moduleSubtitle: {
      fontSize: '14px',
      margin: '5px 0 0 0',
      opacity: 0.9,
    },
    tabContainer: {
      display: 'flex',
      gap: '10px',
      marginBottom: '20px',
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '15px',
      padding: '10px',
    },
    tab: (isActive: boolean) => ({
      flex: 1,
      padding: '12px 20px',
      border: 'none',
      borderRadius: '10px',
      background: isActive ? '#fff' : 'transparent',
      color: isActive ? '#FF6B9D' : '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    }),
    postCard: {
      background: '#fff',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    postHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '12px',
    },
    authorAvatar: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
    },
    authorInfo: {
      flex: 1,
    },
    authorName: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
    },
    verifiedBadge: {
      display: 'inline-block',
      background: '#4CAF50',
      color: '#fff',
      borderRadius: '50%',
      width: '16px',
      height: '16px',
      fontSize: '10px',
      textAlign: 'center',
      lineHeight: '16px',
      marginLeft: '5px',
    },
    postTime: {
      fontSize: '12px',
      color: '#999',
    },
    postTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '8px',
    },
    postDescription: {
      fontSize: '14px',
      color: '#666',
      lineHeight: '1.6',
      marginBottom: '12px',
    },
    postMeta: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '15px',
      marginBottom: '12px',
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      fontSize: '13px',
      color: '#666',
    },
    tagsContainer: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: '12px',
    },
    tag: {
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
    },
    participantsContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '15px',
    },
    participantAvatars: {
      display: 'flex',
      alignItems: 'center',
    },
    participantAvatar: (index: number) => ({
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
      marginLeft: index > 0 ? '-10px' : '0',
      border: '2px solid #fff',
    }),
    participantCount: {
      fontSize: '12px',
      color: '#666',
      marginLeft: '10px',
    },
    actionButtons: {
      display: 'flex',
      gap: '10px',
    },
    joinButton: {
      flex: 1,
      padding: '10px 20px',
      border: 'none',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    detailButton: {
      padding: '10px 20px',
      border: '2px solid #FF6B9D',
      borderRadius: '10px',
      background: 'transparent',
      color: '#FF6B9D',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    modalContent: {
      background: '#fff',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
    },
    modalTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    formLabel: {
      display: 'block',
      fontSize: '14px',
      fontWeight: '600',
      color: '#333',
      marginBottom: '5px',
    },
    formInput: {
      width: '100%',
      padding: '10px 15px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '14px',
      outline: 'none',
      transition: 'border-color 0.3s ease',
    },
    formTextarea: {
      width: '100%',
      padding: '10px 15px',
      border: '2px solid #eee',
      borderRadius: '10px',
      fontSize: '14px',
      outline: 'none',
      minHeight: '80px',
      resize: 'vertical',
      fontFamily: 'inherit',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      border: 'none',
      borderRadius: '10px',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #FF8E53 100%)',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'transform 0.3s ease',
    },
    closeButton: {
      padding: '10px 20px',
      border: '2px solid #ccc',
      borderRadius: '10px',
      background: '#fff',
      color: '#666',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      marginRight: '10px',
    },
    modalActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: '#fff',
    },
    emptyIcon: {
      fontSize: '64px',
      marginBottom: '20px',
    },
    emptyText: {
      fontSize: '16px',
      opacity: 0.9,
    },
  }

  return (
    <div style={styles.moduleContainer}>
      <div style={styles.moduleHeader}>
        <div style={styles.moduleIcon}>🤝</div>
        <div>
          <h2 style={styles.moduleTitle}>同城约伴</h2>
          <p style={styles.moduleSubtitle}>寻找同城宠友，一起带毛孩子快乐玩耍</p>
        </div>
      </div>

      <div style={styles.tabContainer}>
        <button
          style={styles.tab(activeTab === 'list')}
          onClick={() => setActiveTab('list')}
        >
          📋 活动列表
        </button>
        <button
          style={styles.tab(activeTab === 'publish')}
          onClick={() => setActiveTab('publish')}
        >
          ✏️ 发布活动
        </button>
      </div>

      {activeTab === 'list' && (
        <div>
          {yuebanPosts.map((post) => (
            <div
              key={post.id}
              style={styles.postCard}
              onClick={() => handleDetailClick(post)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <div style={styles.postHeader}>
                <div style={styles.authorAvatar}>{post.author.avatar}</div>
                <div style={styles.authorInfo}>
                  <div style={styles.authorName}>
                    {post.author.name}
                    {post.author.verified && (
                      <span style={styles.verifiedBadge}>✓</span>
                    )}
                  </div>
                  <div style={styles.postTime}>{post.date} {post.time}</div>
                </div>
              </div>

              <h3 style={styles.postTitle}>{post.title}</h3>
              <p style={styles.postDescription}>{post.description}</p>

              <div style={styles.postMeta}>
                <div style={styles.metaItem}>
                  <span>{post.image}</span>
                  <span>{post.petType}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>📍</span>
                  <span>{post.location}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>👥</span>
                  <span>{post.currentParticipants}/{post.maxParticipants}人</span>
                </div>
              </div>

              <div style={styles.tagsContainer}>
                {post.tags.map((tag, index) => (
                  <span key={index} style={styles.tag}>#{tag}</span>
                ))}
              </div>

              <div style={styles.participantsContainer}>
                <span style={{ fontSize: '14px', color: '#666' }}>已加入：</span>
                <div style={styles.participantAvatars}>
                  {post.participants.slice(0, 4).map((p, index) => (
                    <div key={index} style={styles.participantAvatar(index)}>
                      {p.avatar}
                    </div>
                  ))}
                </div>
                <span style={styles.participantCount}>
                  {post.participants.length}人已加入
                </span>
              </div>

              <div style={styles.actionButtons}>
                <button
                  style={styles.detailButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDetailClick(post)
                  }}
                >
                  查看详情
                </button>
                <button
                  style={styles.joinButton}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleJoinClick(post)
                  }}
                >
                  {post.currentParticipants >= post.maxParticipants ? '已满员' : '加入活动'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'publish' && (
        <div style={{ background: '#fff', borderRadius: '15px', padding: '30px' }}>
          <h3 style={{ ...styles.modalTitle, marginBottom: '25px' }}>发布同城约伴活动</h3>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>活动标题</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="例如：周末朝阳公园遛狗约伴"
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>活动描述</label>
            <textarea
              style={styles.formTextarea}
              placeholder="描述你的活动安排，让其他人了解活动内容..."
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>宠物类型</label>
            <select style={styles.formInput}>
              <option value="">请选择</option>
              <option value="狗">🐕 狗</option>
              <option value="猫">🐱 猫</option>
              <option value="猫/狗">🐱🐕 猫/狗</option>
              <option value="其他">🐾 其他</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>活动地点</label>
            <input
              type="text"
              style={styles.formInput}
              placeholder="例如：朝阳公园"
            />
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.formLabel}>活动日期</label>
              <input
                type="date"
                style={styles.formInput}
              />
            </div>
            <div style={{ ...styles.formGroup, flex: 1 }}>
              <label style={styles.formLabel}>活动时间</label>
              <input
                type="time"
                style={styles.formInput}
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.formLabel}>最多参与人数</label>
            <input
              type="number"
              style={styles.formInput}
              placeholder="5"
              min="1"
              max="20"
            />
          </div>
          <button style={styles.submitButton}>发布活动</button>
        </div>
      )}

      {/* 加入活动弹窗 */}
      {showJoinModal && selectedPost && (
        <div style={styles.modalOverlay} onClick={() => setShowJoinModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>加入活动</h3>
            <p style={{ marginBottom: '20px', color: '#666' }}>
              加入 <strong>{selectedPost.title}</strong>
            </p>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>你的姓名</label>
              <input
                type="text"
                style={styles.formInput}
                value={joinForm.name}
                onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                placeholder="请输入你的姓名"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>宠物名字</label>
              <input
                type="text"
                style={styles.formInput}
                value={joinForm.petName}
                onChange={(e) => setJoinForm({ ...joinForm, petName: e.target.value })}
                placeholder="你家毛孩子的名字"
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>宠物类型</label>
              <select
                style={styles.formInput}
                value={joinForm.petType}
                onChange={(e) => setJoinForm({ ...joinForm, petType: e.target.value })}
              >
                <option value="">请选择</option>
                <option value="狗">🐕 狗</option>
                <option value="猫">🐱 猫</option>
                <option value="其他">🐾 其他</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.formLabel}>备注（可选）</label>
              <textarea
                style={styles.formTextarea}
                value={joinForm.notes}
                onChange={(e) => setJoinForm({ ...joinForm, notes: e.target.value })}
                placeholder="有什么想说的吗？"
              />
            </div>
            <div style={styles.modalActions}>
              <button style={styles.closeButton} onClick={() => setShowJoinModal(false)}>
                取消
              </button>
              <button style={styles.joinButton} onClick={handleJoinSubmit}>
                确认加入
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 活动详情弹窗 */}
      {showDetailModal && selectedPost && (
        <div style={styles.modalOverlay} onClick={() => setShowDetailModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>{selectedPost.title}</h3>
            <div style={{ marginBottom: '20px' }}>
              <div style={styles.postMeta}>
                <div style={styles.metaItem}>
                  <span>{selectedPost.image}</span>
                  <span>{selectedPost.petType}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>📍</span>
                  <span>{selectedPost.location}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>📅</span>
                  <span>{selectedPost.date}</span>
                </div>
                <div style={styles.metaItem}>
                  <span>⏰</span>
                  <span>{selectedPost.time}</span>
                </div>
              </div>
            </div>
            <p style={{ ...styles.postDescription, marginBottom: '20px' }}>
              {selectedPost.description}
            </p>
            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '10px' }}>
                参与者列表
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {selectedPost.participants.map((p, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#f5f5f5',
                      padding: '8px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    <span>{p.avatar}</span>
                    <span style={{ fontSize: '14px' }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      ({p.petName} - {p.petType})
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div style={styles.modalActions}>
              <button style={styles.closeButton} onClick={() => setShowDetailModal(false)}>
                关闭
              </button>
              <button
                style={styles.joinButton}
                onClick={() => {
                  setShowDetailModal(false)
                  handleJoinClick(selectedPost)
                }}
              >
                加入活动
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        input:focus, textarea:focus, select:focus {
          border-color: #FF6B9D !important;
        }
        button:hover {
          transform: translateY(-2px) !important;
        }
        button:active {
          transform: translateY(0) !important;
        }
      `}</style>
    </div>
  )
}
