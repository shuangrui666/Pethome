'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ServiceDetailPage() {
  const params = useParams()
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [booking, setBooking] = useState({
    serviceName: '',
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    petName: '',
    petType: 'dog',
    breed: '',
    petAge: '',
    ownerName: '',
    phone: '',
    address: '',
    serviceNotes: '',
  })

  // 模拟数据 - 实际应从 API 获取
  const mockService = {
    _id: params.id,
    title: '专业上门遛狗服务',
    description: '专业的遛狗师提供上门遛狗服务，让您的爱宠得到充分的运动和陪伴',
    provider: {
      _id: 'provider1',
      name: '张遛狗师',
      avatar: 'https://via.placeholder.com/100',
      phone: '138-xxxx-xxxx',
      rating: 4.8,
      completedOrders: 356,
      experience: '5 年遛狗经验',
      certifications: ['宠物行为训练师证', '宠物急救证书'],
      bio: '热爱动物，专业遛狗师，5 年从业经验，服务过 300+ 只狗狗，熟悉各种犬类行为特点',
    },
    type: 'dog_walking',
    category: 'walking',
    images: [
      'https://via.placeholder.com/800x450?text=Service+1',
      'https://via.placeholder.com/800x450?text=Service+2',
      'https://via.placeholder.com/800x450?text=Service+3',
    ],
    rating: 4.8,
    reviewCount: 128,
    price: {
      basePrice: 50,
      unit: '次',
      duration: '30 分钟',
      extraFee: {
        '每增加 30 分钟': 30,
        '大型犬附加费': 20,
        '多只宠物优惠': '第二只半价',
      },
    },
    serviceArea: '浦东新区、黄浦区、徐汇区',
    availableTimes: [
      '07:00 - 09:00',
      '12:00 - 14:00',
      '17:00 - 20:00',
    ],
    services: [
      {
        _id: 's1',
        name: '基础遛狗服务',
        price: 50,
        unit: '次',
        duration: '30 分钟',
        description: '包括遛狗、喂食、清理粪便等基础服务',
        features: ['定时遛狗', '喂食喂水', '清理粪便', '发送遛狗照片'],
      },
      {
        _id: 's2',
        name: '加长遛狗服务',
        price: 80,
        unit: '次',
        duration: '60 分钟',
        description: '更长时间的户外活动和陪伴',
        features: ['长时间遛狗', '互动游戏', '喂食喂水', '清理粪便', '发送遛狗视频'],
      },
      {
        _id: 's3',
        name: '周末特别服务',
        price: 120,
        unit: '次',
        duration: '120 分钟',
        description: '周末公园游玩，让狗狗充分释放活力',
        features: ['公园游玩', '社交活动', '拍照录像', '喂食喂水', '详细活动报告'],
      },
    ],
    process: [
      { step: 1, title: '在线预约', description: '选择服务时间和类型，提交预约申请' },
      { step: 2, title: '确认订单', description: '服务提供者确认预约，发送确认通知' },
      { step: 3, title: '上门服务', description: '服务提供者按时上门，开始服务' },
      { step: 4, title: '服务完成', description: '服务结束后发送报告，确认完成' },
      { step: 5, title: '评价反馈', description: '对服务进行评价，帮助改进服务质量' },
    ],
    safetyMeasures: [
      { icon: '✅', title: '实名认证', description: '所有服务提供者均通过实名认证' },
      { icon: '📱', title: '实时定位', description: '服务过程中可实时查看位置' },
      { icon: '📸', title: '服务记录', description: '每次服务都会发送照片和视频记录' },
      { icon: '🛡️', title: '保险保障', description: '为每只宠物购买服务保险' },
      { icon: '📞', title: '紧急联系', description: '24 小时紧急联系通道' },
      { icon: '💬', title: '实时沟通', description: '服务过程中随时保持联系' },
    ],
    testimonials: [
      {
        owner: '李女士',
        pet: '旺财（金毛）',
        content: '张师傅非常专业，每次都会发照片和视频，旺财很喜欢他。服务也很准时，很放心。',
        rating: 5,
        date: '2024-01-20',
      },
      {
        owner: '王先生',
        pet: '豆豆（泰迪）',
        content: '工作忙的时候全靠这个服务，豆豆得到了很好的照顾。服务很细致，会一直用下去。',
        rating: 5,
        date: '2024-01-15',
      },
      {
        owner: '赵女士',
        pet: '球球（比熊）',
        content: '很专业的服务，遛狗师很耐心，球球回来很开心。价格也很合理，推荐！',
        rating: 4,
        date: '2024-01-10',
      },
    ],
    faqs: [
      {
        question: '如何确保宠物安全？',
        answer: '所有遛狗师都经过实名认证和专业培训，服务过程中会实时定位并发送照片视频，同时为每只宠物购买保险。',
      },
      {
        question: '可以定制服务时间吗？',
        answer: '可以，您可以在预约时选择具体时间，我们会尽量满足您的需求。',
      },
      {
        question: '如果宠物有特殊需求怎么办？',
        answer: '请在预约时备注说明，我们会提前告知服务提供者，并做好相应准备。',
      },
      {
        question: '如何支付？',
        answer: '支持微信支付、支付宝等多种支付方式，服务完成后确认支付。',
      },
    ],
  }

  const handleBookService = (service: any) => {
    setSelectedService(service._id)
    setBooking({
      serviceName: service.name,
      serviceType: service.category,
      appointmentDate: '',
      appointmentTime: '',
      petName: '',
      petType: 'dog',
      breed: '',
      petAge: '',
      ownerName: '',
      phone: '',
      address: '',
      serviceNotes: '',
    })
    setShowBookingForm(true)
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 调用预约 API
      // await createServiceBooking(mockService._id, booking)
      alert('预约申请已提交，服务提供者会尽快联系您确认！')
      setShowBookingForm(false)
      setSelectedService(null)
      setBooking({
        serviceName: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: '',
        petName: '',
        petType: 'dog',
        breed: '',
        petAge: '',
        ownerName: '',
        phone: '',
        address: '',
        serviceNotes: '',
      })
    } catch (error) {
      console.error('预约失败:', error)
      alert('提交失败，请稍后重试')
    }
  }

  const handleContactProvider = () => {
    alert(`联系电话：${mockService.provider.phone}`)
  }

  if (!mockService) {
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

  return (
    <div className="container py-5">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link href="/service" className="btn btn-outline-secondary">
          ← 返回服务列表
        </Link>
      </div>

      {/* 顶部信息 */}
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="mb-2">{mockService.title}</h1>
          <div className="text-muted mb-2">
            <span>⭐ {mockService.rating}</span>
            <span className="mx-2">|</span>
            <span>{mockService.reviewCount}条评价</span>
            <span className="mx-2">|</span>
            <span>{mockService.type === 'dog_walking' ? '上门遛狗' : '上门服务'}</span>
          </div>
          <p className="text-muted">{mockService.description}</p>
        </div>
        <div className="col-md-4 text-end">
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-lg" onClick={() => handleBookService(mockService.services[0])}>
              立即预约
            </button>
            <button className="btn btn-success btn-lg" onClick={handleContactProvider}>
              📞 联系服务者
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {/* 左侧内容 */}
        <div className="col-lg-8">
          {/* 服务提供者信息 */}
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">👤 服务提供者</h5>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={mockService.provider.avatar}
                    alt={mockService.provider.name}
                    className="rounded-circle mb-2"
                    style={{ width: '100px', height: '100px' }}
                  />
                  <h6 className="mb-0">{mockService.provider.name}</h6>
                  <small className="text-muted">{mockService.provider.experience}</small>
                </div>
                <div className="col-md-6">
                  <p className="mb-2"><strong>评分：</strong>⭐ {mockService.provider.rating}</p>
                  <p className="mb-2"><strong>完成订单：</strong>{mockService.provider.completedOrders}单</p>
                  <p className="mb-2"><strong>认证证书：</strong></p>
                  <div className="ms-4">
                    {mockService.provider.certifications.map((cert: string, index: number) => (
                      <div key={index}>✓ {cert}</div>
                    ))}
                  </div>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-outline-primary w-100 mb-2" onClick={handleContactProvider}>
                    📞 联系
                  </button>
                  <button className="btn btn-outline-success w-100" onClick={() => handleBookService(mockService.services[0])}>
                    预约
                  </button>
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-1"><strong>个人简介：</strong></p>
                <p className="text-muted mb-0">{mockService.provider.bio}</p>
              </div>
            </div>
          </div>

          {/* 图片展示 */}
          <div id="serviceCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
            <div className="carousel-inner rounded">
              {mockService.images.map((img: string, index: number) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={img} className="d-block w-100" alt={mockService.title} style={{ height: '400px', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#serviceCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#serviceCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>

          {/* 服务项目 */}
          <div className="card mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">🛎️ 服务项目</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {mockService.services.map((service: any) => (
                  <div className="col-md-12 mb-3" key={service._id}>
                    <div className="card h-100">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="d-flex justify-content-between align-items-start mb-2">
                              <h6 className="mb-0">{service.name}</h6>
                              <span className="badge bg-success">¥{service.price}/{service.unit}</span>
                            </div>
                            <p className="small text-muted mb-2">{service.description}</p>
                            <p className="small mb-2">⏱️ {service.duration}</p>
                            <div className="small">
                              <strong>服务特色：</strong>
                              <ul className="mb-0 ms-3">
                                {service.features.map((feature: string, index: number) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="col-md-6 d-flex align-items-center justify-content-center">
                            <button
                              className="btn btn-success btn-lg w-100"
                              onClick={() => handleBookService(service)}
                            >
                              立即预约
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 服务流程 */}
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">📋 服务流程</h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                {mockService.process.map((item: any, index: number) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="position-relative">
                      <div className="badge bg-info rounded-circle" style={{ width: '40px', height: '40px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                        {item.step}
                      </div>
                      <h6 className="mt-2 mb-1">{item.title}</h6>
                      <p className="small text-muted mb-0">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 安全保障 */}
          <div className="card mb-4">
            <div className="card-header bg-warning">
              <h5 className="mb-0">🛡️ 安全保障</h5>
            </div>
            <div className="card-body">
              <div className="row">
                {mockService.safetyMeasures.map((measure: any, index: number) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="text-center">
                      <div style={{ fontSize: '32px' }}>{measure.icon}</div>
                      <h6 className="mb-1">{measure.title}</h6>
                      <p className="small text-muted mb-0">{measure.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 用户评价 */}
          <div className="card mb-4">
            <div className="card-header bg-warning">
              <h5 className="mb-0">💬 用户评价</h5>
            </div>
            <div className="card-body">
              {mockService.testimonials.map((testimonial: any, index: number) => (
                <div className="mb-4 pb-4 border-bottom" key={index}>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <strong>{testimonial.owner}</strong>
                      <span className="text-muted small ms-2">({testimonial.pet})</span>
                    </div>
                    <div className="text-end">
                      <div>{'⭐'.repeat(testimonial.rating)}</div>
                      <small className="text-muted">{testimonial.date}</small>
                    </div>
                  </div>
                  <p className="text-muted mb-0">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 常见问题 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">❓ 常见问题</h5>
            </div>
            <div className="card-body">
              <div className="accordion" id="faqAccordion">
                {mockService.faqs.map((faq: any, index: number) => (
                  <div className="accordion-item" key={index}>
                    <h2 className="accordion-header" id={`heading${index}`}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${index}`}
                        aria-expanded="false"
                        aria-controls={`collapse${index}`}
                      >
                        {faq.question}
                      </button>
                    </h2>
                    <div
                      id={`collapse${index}`}
                      className="accordion-collapse collapse"
                      aria-labelledby={`heading${index}`}
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧信息栏 */}
        <div className="col-lg-4">
          {/* 价格信息 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">💰 价格信息</h5>
            </div>
            <div className="card-body">
              <div className="text-center mb-3">
                <h2 className="text-primary mb-0">¥{mockService.price.basePrice}</h2>
                <small className="text-muted">/{mockService.price.unit}</small>
              </div>
              <p className="small text-muted mb-2">基础服务：{mockService.price.duration}</p>
              <hr />
              <h6 className="mb-2">附加费用：</h6>
              {Object.entries(mockService.price.extraFee).map(([key, value]: [string, any], index: number) => (
                <div key={index} className="d-flex justify-content-between mb-1">
                  <span className="small">{key}</span>
                  <span className="small badge bg-secondary">+¥{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 服务区域 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📍 服务区域</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">{mockService.serviceArea}</p>
            </div>
          </div>

          {/* 可预约时间 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">🕐 可预约时间</h5>
            </div>
            <div className="card-body">
              {mockService.availableTimes.map((time: string, index: number) => (
                <div key={index} className="mb-2">
                  <span className="badge bg-primary">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 快速预约 */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">⚡ 快速预约</h5>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-primary" onClick={() => handleBookService(mockService.services[0])}>
                  预约基础遛狗
                </button>
                <button className="btn btn-outline-primary" onClick={() => handleBookService(mockService.services[1])}>
                  预约加长遛狗
                </button>
                <button className="btn btn-outline-success" onClick={() => handleBookService(mockService.services[2])}>
                  预约周末特别
                </button>
                <button className="btn btn-outline-secondary" onClick={handleContactProvider}>
                  📞 联系服务者
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 预约弹窗 */}
      {showBookingForm && (
        <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">📝 服务预约</h5>
                <button type="button" className="btn-close" onClick={() => setShowBookingForm(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="alert alert-info">
                    预约服务：<strong>{booking.serviceName}</strong><br />
                    服务提供者：{mockService.provider.name}
                  </div>

                  <h6 className="mb-3">预约时间</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="appointmentDate" className="form-label">预约日期 *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="appointmentDate"
                        value={booking.appointmentDate}
                        onChange={(e) => setBooking({ ...booking, appointmentDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="appointmentTime" className="form-label">预约时间 *</label>
                      <select
                        className="form-select"
                        id="appointmentTime"
                        value={booking.appointmentTime}
                        onChange={(e) => setBooking({ ...booking, appointmentTime: e.target.value })}
                        required
                      >
                        <option value="">请选择时间</option>
                        {mockService.availableTimes.map((time: string, index: number) => (
                          <option key={index} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <h6 className="mb-3">宠物信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="petName" className="form-label">宠物姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="petName"
                        value={booking.petName}
                        onChange={(e) => setBooking({ ...booking, petName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="petType" className="form-label">宠物类型 *</label>
                      <select
                        className="form-select"
                        id="petType"
                        value={booking.petType}
                        onChange={(e) => setBooking({ ...booking, petType: e.target.value })}
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
                        value={booking.breed}
                        onChange={(e) => setBooking({ ...booking, breed: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="petAge" className="form-label">年龄 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="petAge"
                        value={booking.petAge}
                        onChange={(e) => setBooking({ ...booking, petAge: e.target.value })}
                        placeholder="例如：2 岁"
                        required
                      />
                    </div>
                  </div>

                  <h6 className="mb-3">联系人信息</h6>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="ownerName" className="form-label">您的姓名 *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="ownerName"
                        value={booking.ownerName}
                        onChange={(e) => setBooking({ ...booking, ownerName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone" className="form-label">联系电话 *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={booking.phone}
                        onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">上门服务地址 *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={booking.address}
                      onChange={(e) => setBooking({ ...booking, address: e.target.value })}
                      placeholder="请提供详细地址"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="serviceNotes" className="form-label">备注说明</label>
                    <textarea
                      className="form-control"
                      id="serviceNotes"
                      rows={3}
                      value={booking.serviceNotes}
                      onChange={(e) => setBooking({ ...booking, serviceNotes: e.target.value })}
                      placeholder="如有特殊需求或注意事项，请在此说明"
                    />
                  </div>

                  <div className="alert alert-warning">
                    ⚠️ 预约成功后，服务提供者会尽快与您联系确认
                  </div>

                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success flex-grow-1">
                      提交预约
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowBookingForm(false)}
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
