'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getKindergartens, Kindergarten } from '../../src/api/kindergarten'

// 模拟幼儿园数据
const mockKindergartens: Kindergarten[] = [
  {
    _id: '1',
    name: '快乐狗狗幼儿园',
    description: '专业照顾 2-12 个月幼犬，提供科学喂养、社交训练、每日活动报告。配备专业训犬师和 24 小时监控，让您的爱犬在安全愉快的环境中成长。',
    address: '北京市朝阳区幸福路 123 号',
    price: 150,
    ageGroup: 'puppy',
    capacity: 20,
    availableSpots: 5,
    rating: 4.8,
    reviewCount: 156,
    photos: ['https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800'],
    amenities: ['空调房', '监控直播', '每日活动报告', '专业训犬师', '户外操场'],
    isAvailable: true,
    owner: { _id: 'owner1', name: '张老师' }
  },
  {
    _id: '2',
    name: '萌犬学园',
    description: '专注于青少年犬行为训练和社交培养，1-3 岁狗狗的最佳选择。提供个性化训练方案，纠正不良行为，培养良好习惯。',
    address: '上海市浦东新区萌宠街 456 号',
    price: 180,
    ageGroup: 'junior',
    capacity: 15,
    availableSpots: 3,
    rating: 4.9,
    reviewCount: 203,
    photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800'],
    amenities: ['行为训练', '监控直播', '营养餐食', '室内游乐场', '洗澡服务'],
    isAvailable: true,
    owner: { _id: 'owner2', name: '李老师' }
  },
  {
    _id: '3',
    name: '狗狗欢乐营',
    description: '成犬专属看护服务，适合 3-8 岁活跃狗狗。提供充足的运动空间、团体游戏、专业看护。让您的爱犬在玩耍中保持健康活力。',
    address: '广州市天河区阳光大道 789 号',
    price: 120,
    ageGroup: 'adult',
    capacity: 25,
    availableSpots: 8,
    rating: 4.7,
    reviewCount: 178,
    photos: ['https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800'],
    amenities: ['大型操场', '监控直播', '团体游戏', '游泳池', '休息区'],
    isAvailable: true,
    owner: { _id: 'owner3', name: '王老师' }
  },
  {
    _id: '4',
    name: '夕阳红狗狗之家',
    description: '专为老年犬设计的温馨看护环境，8 岁以上狗狗的第二个家。提供温和活动、特殊饮食、医疗监护，让老年犬安享晚年。',
    address: '深圳市南山区温馨路 321 号',
    price: 200,
    ageGroup: 'senior',
    capacity: 10,
    availableSpots: 2,
    rating: 4.9,
    reviewCount: 89,
    photos: ['https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800'],
    amenities: ['软垫休息区', '医疗监护', '特殊饮食', '温和活动', '24 小时护理'],
    isAvailable: true,
    owner: { _id: 'owner4', name: '陈医生' }
  },
  {
    _id: '5',
    name: '全年龄段宠物乐园',
    description: '适合所有年龄段狗狗的综合性看护中心。根据年龄和性格分组管理，提供差异化服务。专业团队确保每只狗狗都能获得最适合的照顾。',
    address: '杭州市西湖区幸福路 666 号',
    price: 160,
    ageGroup: 'all',
    capacity: 30,
    availableSpots: 10,
    rating: 4.6,
    reviewCount: 245,
    photos: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800'],
    amenities: ['分组管理', '监控直播', '户外活动', '营养配餐', '训练课程'],
    isAvailable: true,
    owner: { _id: 'owner5', name: '刘老师' }
  }
]

export default function KindergartenPage() {
  const [kindergartens, setKindergartens] = useState<Kindergarten[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadKindergartens()
  }, [])

  const loadKindergartens = async () => {
    try {
      setLoading(true)
      const data = await getKindergartens({ available: true })
      const result = data.kindergartens || []
      // 如果 API 返回空数组，使用模拟数据
      setKindergartens(result.length > 0 ? result : mockKindergartens)
    } catch (error) {
      console.error('加载幼儿园信息失败:', error)
      // API 失败时使用模拟数据
      setKindergartens(mockKindergartens)
    } finally {
      setLoading(false)
    }
  }

  const getAgeGroupBadge = (ageGroup: string) => {
    const badges: any = {
      puppy: 'bg-info',
      junior: 'bg-success',
      adult: 'bg-primary',
      senior: 'bg-warning',
      all: 'bg-secondary',
    }
    const labels: any = {
      puppy: '幼犬班',
      junior: '青少年班',
      adult: '成犬班',
      senior: '老年犬班',
      all: '全年龄段',
    }
    return (
      <span className={`badge ${badges[ageGroup] || 'bg-secondary'}`}>
        {labels[ageGroup] || ageGroup}
      </span>
    )
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🎓 狗狗幼儿园</h1>
          <p className="lead text-muted">
            为您的爱犬提供专业的看护和社交环境，24 小时实时监控
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/kindergarten/create" className="btn btn-success">
            🏫 注册幼儿园
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : kindergartens.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无幼儿园信息</h3>
          <p className="text-muted">成为第一个注册的幼儿园吧！</p>
          <Link href="/kindergarten/create" className="btn btn-primary">
            注册幼儿园
          </Link>
        </div>
      ) : (
        <div className="row">
          {kindergartens.map((kg) => (
            <div key={kg._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {kg.photos?.[0] && (
                  <img
                    src={kg.photos[0]}
                    className="card-img-top"
                    alt={kg.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title mb-2">{kg.name}</h5>
                  <div className="mb-2">
                    {getAgeGroupBadge(kg.ageGroup)}
                  </div>
                  <p className="text-muted mb-2">
                    <small>📍 {kg.address}</small>
                  </p>
                  <p className="card-text">
                    {kg.description?.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">
                      💰 价格：¥{kg.price}/天
                    </span>
                    <span className="text-muted">
                      ⭐ {kg.rating.toFixed(1)} ({kg.reviewCount}评价)
                    </span>
                  </div>
                  <div className="alert alert-success mb-0">
                    <small>📹 实时监控可用</small>
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <Link
                    href={`/kindergarten/${kg._id}`}
                    className="btn btn-outline-primary w-100 mb-2"
                  >
                    查看详情
                  </Link>
                  <Link
                    href={`/kindergarten/${kg._id}/enroll`}
                    className="btn btn-primary w-100"
                  >
                    预约入园
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
