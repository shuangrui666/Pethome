'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getKindergartenById, Kindergarten } from '../../../src/api/kindergarten'

// 完整的幼儿园模拟数据（与列表页保持一致）
const mockKindergartens: Kindergarten[] = [
  {
    _id: '1',
    name: '快乐狗狗幼儿园',
    description: '专业照顾 2-12 个月幼犬，提供科学喂养、社交训练、每日活动报告。配备专业训犬师和 24 小时监控，让您的爱犬在安全愉快的环境中成长。',
    address: '北京市朝阳区幸福路 123 号',
    location: { type: 'Point', coordinates: [116.4074, 39.9042] },
    phone: '010-8888-8888',
    email: 'happy@pethome.com',
    photos: [
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
      'https://images.unsplash.com/photo-1560743641-3914f2c45636?w=800',
      'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
    ],
    facilities: ['空调房', '监控直播', '每日活动报告', '专业训犬师', '户外操场'],
    priceRange: '150 元/天',
    rating: 4.8,
    reviewCount: 156,
    availableSlots: 5,
    certifications: ['动物防疫合格证', '宠物服务机构资质', 'ISO9001 质量认证'],
    operatingHours: '周一至周日 8:00-20:00',
    owner_id: 'owner1',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    _id: '2',
    name: '萌犬学园',
    description: '专注于青少年犬行为训练和社交培养，1-3 岁狗狗的最佳选择。提供个性化训练方案，纠正不良行为，培养良好习惯。',
    address: '上海市浦东新区萌宠街 456 号',
    location: { type: 'Point', coordinates: [121.4737, 31.2304] },
    phone: '021-7777-7777',
    email: 'meng@pethome.com',
    photos: [
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800',
      'https://images.unsplash.com/photo-1598136490991-2f7f943d1880?w=800',
    ],
    facilities: ['行为训练', '监控直播', '营养餐食', '室内游乐场', '洗澡服务'],
    priceRange: '180 元/天',
    rating: 4.9,
    reviewCount: 203,
    availableSlots: 3,
    certifications: ['动物防疫合格证', '宠物服务机构资质', '专业训犬认证'],
    operatingHours: '周一至周日 7:30-20:30',
    owner_id: 'owner2',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    _id: '3',
    name: '狗狗欢乐营',
    description: '成犬专属看护服务，适合 3-8 岁活跃狗狗。提供充足的运动空间、团体游戏、专业看护。让您的爱犬在玩耍中保持健康活力。',
    address: '广州市天河区阳光大道 789 号',
    location: { type: 'Point', coordinates: [113.2644, 23.1291] },
    phone: '020-6666-6666',
    email: 'happy@pethome.com',
    photos: [
      'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=800',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
      'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=800',
    ],
    facilities: ['大型操场', '监控直播', '团体游戏', '游泳池', '休息区'],
    priceRange: '120 元/天',
    rating: 4.7,
    reviewCount: 178,
    availableSlots: 8,
    certifications: ['动物防疫合格证', '宠物服务机构资质', '大型犬服务认证'],
    operatingHours: '周一至周日 8:00-19:00',
    owner_id: 'owner3',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    _id: '4',
    name: '夕阳红狗狗之家',
    description: '专为老年犬设计的温馨看护环境，8 岁以上狗狗的第二个家。提供温和活动、特殊饮食、医疗监护，让老年犬安享晚年。',
    address: '深圳市南山区温馨路 321 号',
    location: { type: 'Point', coordinates: [114.0579, 22.5431] },
    phone: '0755-5555-5555',
    email: 'sunset@pethome.com',
    photos: [
      'https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800',
      'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800',
      'https://images.unsplash.com/photo-1563889958749-625d8fbbe416?w=800',
    ],
    facilities: ['软垫休息区', '医疗监护', '特殊饮食', '温和活动', '24 小时护理'],
    priceRange: '200 元/天',
    rating: 4.9,
    reviewCount: 89,
    availableSlots: 2,
    certifications: ['动物防疫合格证', '宠物服务机构资质', '老年犬护理认证'],
    operatingHours: '周一至周日 24 小时',
    owner_id: 'owner4',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    _id: '5',
    name: '全年龄段宠物乐园',
    description: '适合所有年龄段狗狗的综合性看护中心。根据年龄和性格分组管理，提供差异化服务。专业团队确保每只狗狗都能获得最适合的照顾。',
    address: '杭州市西湖区幸福路 666 号',
    location: { type: 'Point', coordinates: [120.1551, 30.2741] },
    phone: '0571-4444-4444',
    email: 'allage@pethome.com',
    photos: [
      'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=800',
      'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
      'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800',
    ],
    facilities: ['分组管理', '监控直播', '户外活动', '营养配餐', '训练课程'],
    priceRange: '160 元/天',
    rating: 4.6,
    reviewCount: 245,
    availableSlots: 10,
    certifications: ['动物防疫合格证', '宠物服务机构资质', '综合服务认证'],
    operatingHours: '周一至周日 7:00-21:00',
    owner_id: 'owner5',
    status: 'active',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
]

export default function KindergartenDetailPage() {
  const params = useParams()
  const [kindergarten, setKindergarten] = useState<Kindergarten | null>(null)
  const [loading, setLoading] = useState(true)
  const [enrollment, setEnrollment] = useState({
    petName: '',
    petType: 'dog',
    breed: '',
    age: '',
    ownerName: '',
    phone: '',
    startDate: '',
    endDate: '',
    serviceType: 'full_day',
    specialNeeds: '',
    emergencyContact: '',
  })
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)

  useEffect(() => {
    loadKindergarten()
  }, [params.id])

  const loadKindergarten = async () => {
    try {
      setLoading(true)
      // 尝试从 API 获取数据
      const response = await getKindergartenById(params.id as string)
      const data = response.kindergarten || response
      if (data && data._id) {
        setKindergarten(data)
      } else {
        // API 失败或数据无效，使用模拟数据
        const mockData = mockKindergartens.find((kg) => kg._id === params.id)
        setKindergarten(mockData || null)
      }
    } catch (error) {
      console.error('加载幼儿园信息失败:', error)
      // API 失败时使用模拟数据
      const mockData = mockKindergartens.find((kg) => kg._id === params.id)
      setKindergarten(mockData || null)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 调用报名 API
      // await enrollInKindergarten(params.id, enrollment)
      alert('报名申请已提交，工作人员会尽快联系您！')
      setShowEnrollmentForm(false)
      setEnrollment({
        petName: '',
        petType: 'dog',
        breed: '',
        age: '',
        ownerName: '',
        phone: '',
        startDate: '',
        endDate: '',
        serviceType: 'full_day',
        specialNeeds: '',
        emergencyContact: '',
      })
    } catch (error) {
      console.error('报名失败:', error)
      alert('提交失败，请稍后重试')
    }
  }

  const handleWatchLive = () => {
    // TODO: 跳转到实时监控页面
    alert('实时监控功能即将上线！')
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!kindergarten) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>幼儿园不存在</h2>
          <p className="text-muted">抱歉，您访问的幼儿园信息不存在或已被移除。</p>
          <Link href="/kindergarten" className="btn btn-primary mt-3">
            返回幼儿园列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link href="/kindergarten" className="btn btn-outline-secondary">
          ← 返回幼儿园列表
        </Link>
      </div>

      {/* 顶部信息 */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-2">{kindergarten.name}</h1>
          <div className="text-muted mb-2">
            <span>⭐ {kindergarten.rating}</span>
            <span className="mx-2">|</span>
            <span>{kindergarten.reviewCount}条评价</span>
            <span className="mx-2">|</span>
            <span>剩余{kindergarten.availableSlots}个名额</span>
          </div>
          <p className="text-muted">{kindergarten.description}</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg" onClick={handleWatchLive}>
              📹 实时监控
            </button>
            <button className="btn btn-success btn-lg" onClick={() => setShowEnrollmentForm(true)}>
              立即报名
            </button>
          </div>
        </div>
      </div>

      {/* 图片轮播 */}
      {kindergarten.photos && kindergarten.photos.length > 0 && (
        <div id="kindergartenCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner rounded">
            {kindergarten.photos.map((img: string, index: number) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                <img src={img} className="d-block w-100" alt={kindergarten.name} style={{ height: '500px', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#kindergartenCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#kindergartenCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      )}

      <div className="row">
        {/* 左侧内容 */}
        <div className="col-lg-8">
          {/* 设施和服务 */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">🏫 设施和服务</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {kindergarten.facilities.map((facility: string, index: number) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="text-center">
                      <div style={{ fontSize: '24px' }}>✅</div>
                      <h6 className="mb-0">{facility}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 服务价格 */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">💰 服务价格</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-success mb-0">
                💵 参考价格：{kindergarten.priceRange}
              </div>
            </div>
          </div>

          {/* 用户评价 */}
          <div className="card mb-4">
            <div className="card-header bg-warning">
              <h5 className="mb-0">💬 用户评价</h5>
            </div>
            <div className="card-body">
              <div className="text-center text-muted">
                <p>暂无用户评价，快来成为第一个评价的人吧！</p>
              </div>
            </div>
          </div>

          {/* 入园须知 */}
          <div className="card">
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">⚠️ 入园须知</h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li className="mb-2">入园前需完成疫苗接种并提供证明</li>
                <li className="mb-2">需进行健康检查，确保无传染病</li>
                <li className="mb-2">建议提前预约，特别是节假日</li>
                <li className="mb-2">如有特殊需求请提前告知</li>
                <li className="mb-2">接送需凭取宠卡，确保宠物安全</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 右侧信息栏 */}
        <div className="col-lg-4">
          {/* 联系方式 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📞 联系方式</h5>
            </div>
            <div className="card-body">
              <p className="mb-2"><strong>📍 地址：</strong>{kindergarten.address}</p>
              <p className="mb-2"><strong>📞 电话：</strong>{kindergarten.phone}</p>
              <p className="mb-2"><strong>📧 邮箱：</strong>{kindergarten.email}</p>
              <p className="mb-0"><strong>🕐 营业时间：</strong><br />
                <small className="text-muted">{kindergarten.operatingHours}</small>
              </p>
            </div>
          </div>

          {/* 容量状态 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📊 当前容量</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-success mb-0">
                ✅ 剩余{kindergarten.availableSlots}个名额
              </div>
            </div>
          </div>

          {/* 资质证书 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📜 资质证书</h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                {kindergarten.certifications.map((cert: string, index: number) => (
                  <li key={index} className="mb-2">✓ {cert}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 快速操作 */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">⚡ 快速操作</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => setShowEnrollmentForm(true)}>
                  立即报名
                </button>
                <button className="btn btn-outline-primary" onClick={handleWatchLive}>
                  📹 实时监控
                </button>
                <a href={`tel:${kindergarten.phone}`} className="btn btn-outline-success">
                  📞 电话咨询
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 报名弹窗 */}
      {showEnrollmentForm && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📝 报名申请</h5>
                <button type="button" className="btn-close" onClick={() => setShowEnrollmentForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleEnroll}>
                  <h6 className="mb-3">宠物信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="petName" className="form-label">宠物姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="petName"
                        value={enrollment.petName}
                        onChange={(e) => setEnrollment({ ...enrollment, petName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="petType" className="form-label">宠物类型 *</label>
                      <select
                        className="form-select"
                        id="petType"
                        value={enrollment.petType}
                        onChange={(e) => setEnrollment({ ...enrollment, petType: e.target.value })}
                        required
                      >
                        <option value="dog">狗狗</option>
                        <option value="cat">猫咪</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="breed" className="form-label">品种 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="breed"
                        value={enrollment.breed}
                        onChange={(e) => setEnrollment({ ...enrollment, breed: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="age" className="form-label">年龄 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="age"
                        value={enrollment.age}
                        onChange={(e) => setEnrollment({ ...enrollment, age: e.target.value })}
                        placeholder="例如：2 岁"
                        required
                      />
                    </div>
                  </div>

                  <h6 className="mb-3">主人信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="ownerName" className="form-label">您的姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="ownerName"
                        value={enrollment.ownerName}
                        onChange={(e) => setEnrollment({ ...enrollment, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">联系电话 *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={enrollment.phone}
                        onChange={(e) => setEnrollment({ ...enrollment, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <h6 className="mb-3">托管信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="startDate" className="form-label">开始日期 *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        value={enrollment.startDate}
                        onChange={(e) => setEnrollment({ ...enrollment, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="endDate" className="form-label">结束日期 *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="endDate"
                        value={enrollment.endDate}
                        onChange={(e) => setEnrollment({ ...enrollment, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serviceType" className="form-label">服务类型 *</label>
                    <select
                      className="form-select"
                      id="serviceType"
                      value={enrollment.serviceType}
                      onChange={(e) => setEnrollment({ ...enrollment, serviceType: e.target.value })}
                      required
                    >
                      <option value="full_day">全日制托管（150 元/天）</option>
                      <option value="half_day">半日制托管（80 元/天）</option>
                      <option value="weekend">周末托管（280 元/天）</option>
                      <option value="vacation">假期托管（1200 元/周）</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="specialNeeds" className="form-label">特殊需求</label>
                    <textarea
                      className="form-control"
                      id="specialNeeds"
                      rows={3}
                      value={enrollment.specialNeeds}
                      onChange={(e) => setEnrollment({ ...enrollment, specialNeeds: e.target.value })}
                      placeholder="如饮食禁忌、健康状况、特殊习惯等"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="emergencyContact" className="form-label">紧急联系人 *</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="emergencyContact"
                      value={enrollment.emergencyContact}
                      onChange={(e) => setEnrollment({ ...enrollment, emergencyContact: e.target.value })}
                      required
                    />
                  </div>

                  <div className="alert alert-warning">
                    ⚠️ 报名成功后，工作人员会尽快与您联系确认详细信息
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1">
                      提交报名申请
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowEnrollmentForm(false)}
                    >
                      取消
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
