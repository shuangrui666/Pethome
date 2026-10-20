'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getLostPets, LostPet } from '../../src/api/lostPet'

// 模拟走失寻回数据（与 API 返回格式一致：images + lostLocation 嵌套对象 + lostTime + contactPhone + contactWechat）
const mockLostPets: LostPet[] = [
  {
    _id: 'mock001',
    petName: '豆豆',
    petType: 'dog',
    breed: '金毛寻回犬',
    age: 2,
    gender: 'male',
    color: '金色',
    features: '脖子上戴着红色项圈，尾巴末端有一撮白毛',
    description: '2025 年 1 月 18 日下午在天河区珠江新城附近走失，性格温顺，叫名字会有反应。如有看到请联系我们，必有重谢！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.3212, 23.1136],
      address: '广州市天河区珠江新城',
      city: '广州市',
      district: '天河区',
    },
    lostTime: '2025-01-18T14:30:00Z',
    contactPhone: '138****5678',
    contactWechat: 'zhangsan2025',
    images: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=800'],
    reward: 2000,
    status: 'lost',
    reporterId: 'user1',
    createdAt: '2025-01-18',
    updatedAt: '2025-01-20',
  },
  {
    _id: 'mock002',
    petName: '咪咪',
    petType: 'cat',
    breed: '橘猫',
    age: 1,
    gender: 'female',
    color: '橘色',
    features: '左耳尖有一点缺角，肚子有一小块毛是白色的',
    description: '1 月 17 日晚从阳台跑出去了，很胆小，叫名字不会回应。小区是广州天河公园附近，麻烦邻居们帮忙留意一下！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.3512, 23.1208],
      address: '广州市天河区天河公园',
      city: '广州市',
      district: '天河区',
    },
    lostTime: '2025-01-17T20:00:00Z',
    contactPhone: '139****1234',
    contactWechat: 'lisi8888',
    images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800'],
    reward: 1000,
    status: 'lost',
    reporterId: 'user2',
    createdAt: '2025-01-17',
    updatedAt: '2025-01-19',
  },
  {
    _id: 'mock003',
    petName: '旺财',
    petType: 'dog',
    breed: '中华田园犬',
    age: 5,
    gender: 'male',
    color: '黄褐色',
    features: '体型中等，耳朵竖立，尾巴向上卷曲',
    description: '1 月 16 日在番禺区大石镇附近走失，平时很乖不会乱跑。可能是被什么东西吓到了。家人都很着急，拜托大家帮忙！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.3089, 23.0356],
      address: '广州市番禺区大石镇',
      city: '广州市',
      district: '番禺区',
    },
    lostTime: '2025-01-16T10:15:00Z',
    contactPhone: '136****9876',
    contactWechat: 'wangwei123',
    images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800'],
    reward: 1500,
    status: 'lost',
    reporterId: 'user3',
    createdAt: '2025-01-16',
    updatedAt: '2025-01-18',
  },
  {
    _id: 'mock004',
    petName: '雪球',
    petType: 'cat',
    breed: '英国短毛猫',
    age: 3,
    gender: 'female',
    color: '白色',
    features: '纯白色，蓝眼睛，体型圆润',
    description: '1 月 15 日从家里溜出去了，在广州海珠区客村附近。非常胆小，看到陌生人会躲起来。有线索请一定联系我们！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.3234, 23.0989],
      address: '广州市海珠区客村',
      city: '广州市',
      district: '海珠区',
    },
    lostTime: '2025-01-15T16:45:00Z',
    contactPhone: '137****4567',
    contactWechat: 'chenxi9999',
    images: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800'],
    reward: 3000,
    status: 'lost',
    reporterId: 'user4',
    createdAt: '2025-01-15',
    updatedAt: '2025-01-17',
  },
  {
    _id: 'mock005',
    petName: '可乐',
    petType: 'dog',
    breed: '柯基犬',
    age: 1.5,
    gender: 'male',
    color: '黄白相间',
    features: '短腿大屁股，走路摇摇晃晃很可爱',
    description: '1 月 14 日在越秀区公园前地铁站附近走失，可能是在遛狗时挣脱了。性格活泼，看到零食会跑过来。有看到请告知！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.2645, 23.1256],
      address: '广州市越秀区公园前',
      city: '广州市',
      district: '越秀区',
    },
    lostTime: '2025-01-14T11:20:00Z',
    contactPhone: '135****7890',
    contactWechat: 'liuqiang666',
    images: ['https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800'],
    reward: 2500,
    status: 'found',
    reporterId: 'user5',
    createdAt: '2025-01-14',
    updatedAt: '2025-01-16',
  },
  {
    _id: 'mock006',
    petName: '小黑',
    petType: 'cat',
    breed: '黑猫',
    age: 2,
    gender: 'male',
    color: '黑色',
    features: '全身乌黑，四只爪子是白色的，像戴了白手套',
    description: '1 月 13 日在白云区江夏附近走失，是领养的流浪猫，对家人很重要。如有好心人收留或看到，万分感谢！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.2678, 23.1789],
      address: '广州市白云区江夏',
      city: '广州市',
      district: '白云区',
    },
    lostTime: '2025-01-13T09:00:00Z',
    contactPhone: '134****2345',
    contactWechat: 'zhaoming777',
    images: ['https://images.unsplash.com/photo-1513245543132-31f507447b27?w=800'],
    reward: 1000,
    status: 'lost',
    reporterId: 'user6',
    createdAt: '2025-01-13',
    updatedAt: '2025-01-15',
  },
  {
    _id: 'mock007',
    petName: '布丁',
    petType: 'dog',
    breed: '泰迪犬',
    age: 4,
    gender: 'female',
    color: '棕色',
    features: '小型泰迪，毛发修剪得很整齐，戴着粉色项圈',
    description: '1 月 12 日在南沙区蕉门河附近走失，年纪大了行动缓慢，可能是自己迷路了。家人非常着急，恳请大家帮忙留意！',
    lostLocation: {
      type: 'Point',
      coordinates: [113.5234, 22.7889],
      address: '广州市南沙区蕉门河',
      city: '广州市',
      district: '南沙区',
    },
    lostTime: '2025-01-12T15:30:00Z',
    contactPhone: '133****6789',
    contactWechat: 'huangayi555',
    images: ['https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800'],
    reward: 1800,
    status: 'lost',
    reporterId: 'user7',
    createdAt: '2025-01-12',
    updatedAt: '2025-01-14',
  },
]

export default function LostFoundPage() {
  const [lostPets, setLostPets] = useState<LostPet[]>([])
  const [foundPets, setFoundPets] = useState<LostPet[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'lost' | 'found'>('lost')

  useEffect(() => {
    loadLostPets()
  }, [tab])

  const loadLostPets = async () => {
    try {
      setLoading(true)
      const response = await getLostPets({ status: 'lost' })
      // 后端返回格式：{success: true, data: [...], pagination: {...}}
      const pets = response.success ? response.data : []
      if (tab === 'lost') {
        setLostPets(pets)
      } else {
        setFoundPets(pets)
      }
    } catch (error) {
      console.error('加载走失信息失败:', error)
      // API 失败时回退到模拟数据
      if (tab === 'lost') {
        setLostPets(mockLostPets.filter(p => p.petType === 'dog'))
      } else {
        setFoundPets(mockLostPets.filter(p => p.petType === 'cat'))
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      active: 'bg-danger',
      found: 'bg-success',
      closed: 'bg-secondary',
    }
    const labels: any = {
      active: '寻找中',
      found: '已找到',
      closed: '已关闭',
    }
    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🔍 走失寻回</h1>
          <p className="lead text-muted">
            帮助走失的宠物回家，您的线索可能让一个家庭重聚
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${tab === 'lost' ? 'active' : ''}`}
                onClick={() => setTab('lost')}
              >
                😢 走失报告
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${tab === 'found' ? 'active' : ''}`}
                onClick={() => setTab('found')}
              >
                🎉 发现报告
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/lost-found/create" className="btn btn-success">
            📝 发布{tab === 'lost' ? '走失' : '发现'}报告
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : (tab === 'lost' ? lostPets : foundPets).length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无{tab === 'lost' ? '走失' : '发现'}报告</h3>
          <p className="text-muted">成为第一个发布报告的人吧！</p>
          <Link href="/lost-found/create" className="btn btn-primary">
            发布报告
          </Link>
        </div>
      ) : (
        <div className="row">
          {(tab === 'lost' ? lostPets : foundPets).map((item) => (
            <div key={item._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {item.images?.[0] && (
                  <img
                    src={item.images[0]}
                    className="card-img-top"
                    alt={item.petName}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{item.petName}</h5>
                    {getStatusBadge(item.status)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>
                      📍 {item.lostLocation?.address || '位置未知'}
                    </small>
                  </p>
                  <p className="text-muted mb-2">
                    <small>
                      🕐 {new Date(item.lostTime).toLocaleString('zh-CN')}
                    </small>
                  </p>
                  <p className="card-text">
                    {item.description?.substring(0, 80) || ''}...
                  </p>
                  {item.matchedPets !== undefined && item.matchedPets.length > 0 && (
                    <div className="alert alert-warning mb-0">
                      <small>🤖 智能匹配到 {item.matchedPets.length} 条相似记录</small>
                    </div>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/lost-found/${item._id}`}
                    className="btn btn-outline-primary w-100"
                  >
                    查看详情
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
