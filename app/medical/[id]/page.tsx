'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaStethoscope, FaPaw, FaClock, FaMapMarkerAlt, FaUserMd, FaStar, FaCheckCircle, FaPhone, FaEnvelope, FaCalendarAlt, FaSyringe, FaCapsules, FaTooth, FaHeartbeat } from 'react-icons/fa';
import { BsPlusCircle } from 'react-icons/bs';

export default function MedicalDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [appointmentData, setAppointmentData] = useState({
    serviceType: '',
    appointmentDate: '',
    appointmentTime: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAge: '',
    petWeight: '',
    symptoms: '',
    medicalHistory: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    notes: ''
  });

  // 模拟医疗服务数据
  const medical = {
    _id: id,
    title: '宠物综合健康检查服务',
    description: '专业宠物医院提供全面的健康检查、诊断和治疗服务。配备先进医疗设备，经验丰富的兽医团队，为您的宠物健康保驾护航。',
    clinic: {
      name: '宠爱宠物医院',
      logo: '/images/clinic-logo.jpg',
      rating: 4.8,
      totalReviews: 523,
      experience: '15 年',
      certifications: ['动物医院执业许可证', 'ISO9001 质量管理体系', '中国宠物医疗协会会员单位'],
      introduction: '宠爱宠物医院成立于 2009 年，拥有 15 年专业宠物医疗服务经验。医院配备先进医疗设备，包括 X 光机、B 超、血液分析仪等。拥有 10 名经验丰富的执业兽医，24 小时急诊服务。',
      address: '北京市朝阳区宠物医疗中心 1 楼',
      phone: '010-8888-8888',
      email: 'contact@lovingpet.com',
      workingHours: '09:00-21:00（全年无休）',
      doctors: [
        {
          name: '李医生',
          avatar: '/images/doctor-li.jpg',
          title: '主治医师',
          specialty: '内科、外科',
          experience: '12 年经验',
          description: '擅长宠物内科疾病诊断和治疗，外科手术经验丰富。'
        },
        {
          name: '王医生',
          avatar: '/images/doctor-wang.jpg',
          title: '副主任医师',
          specialty: '皮肤科、眼科',
          experience: '10 年经验',
          description: '专攻宠物皮肤疾病和眼部疾病治疗。'
        },
        {
          name: '张医生',
          avatar: '/images/doctor-zhang.jpg',
          title: '主治医师',
          specialty: '牙科、骨科',
          experience: '8 年经验',
          description: '擅长宠物牙科治疗和骨科手术。'
        }
      ]
    },
    services: [
      {
        id: 1,
        name: '基础健康检查',
        icon: FaStethoscope,
        price: 100,
        duration: '30 分钟',
        description: '全面身体检查，包括体温、心率、呼吸、口腔、耳朵、眼睛等',
        includes: ['体温测量', '心肺听诊', '口腔检查', '耳朵检查', '眼睛检查', '皮肤检查', '体重测量']
      },
      {
        id: 2,
        name: '血液检查',
        icon: FaSyringe,
        price: 300,
        duration: '1 小时',
        description: '血常规检查，了解宠物整体健康状况',
        includes: ['血常规', '生化检查', '肝功能', '肾功能', '血糖检测']
      },
      {
        id: 3,
        name: '疫苗接种',
        icon: FaSyringe,
        price: 150,
        duration: '30 分钟',
        description: '提供多种宠物疫苗接种服务',
        includes: ['狂犬疫苗', '多联疫苗', '疫苗咨询', '接种记录卡']
      },
      {
        id: 4,
        name: '牙科清洁',
        icon: FaTooth,
        price: 800,
        duration: '2 小时',
        description: '专业牙齿清洁，预防口腔疾病',
        includes: ['超声波洁牙', '牙齿抛光', '口腔检查', '口腔护理建议']
      },
      {
        id: 5,
        name: 'X 光检查',
        icon: FaHeartbeat,
        price: 400,
        duration: '1 小时',
        description: 'X 光影像检查，诊断骨骼和内脏问题',
        includes: ['X 光拍摄', '影像分析', '诊断报告', '医生解读']
      },
      {
        id: 6,
        name: 'B 超检查',
        icon: FaHeartbeat,
        price: 500,
        duration: '1 小时',
        description: '超声波检查，观察内脏器官状况',
        includes: ['B 超检查', '影像分析', '诊断报告', '医生解读']
      }
    ],
    medications: [
      {
        name: '驱虫药',
        price: 80,
        description: '内外同驱，全面保护',
        category: '驱虫药'
      },
      {
        name: '抗生素',
        price: 120,
        description: '广谱抗菌，治疗感染',
        category: '抗生素'
      },
      {
        name: '消炎药',
        price: 100,
        description: '缓解炎症，减轻疼痛',
        category: '消炎药'
      },
      {
        name: '维生素补充剂',
        price: 150,
        description: '增强免疫力，补充营养',
        category: '营养品'
      }
    ],
    images: [
      '/images/medical-1.jpg',
      '/images/medical-2.jpg',
      '/images/medical-3.jpg'
    ],
    reviews: [
      {
        id: 1,
        userName: '陈女士',
        userAvatar: '/images/user1.jpg',
        rating: 5,
        comment: '李医生非常专业，我家狗狗生病很快就治好了。医院环境也很好，设备先进。',
        date: '2024-01-15'
      },
      {
        id: 2,
        userName: '刘先生',
        userAvatar: '/images/user2.jpg',
        rating: 5,
        comment: '服务态度很好，医生耐心解答所有问题。价格也很合理，推荐！',
        date: '2024-01-10'
      },
      {
        id: 3,
        userName: '赵女士',
        userAvatar: '/images/user3.jpg',
        rating: 4,
        comment: '医院很专业，就是周末人比较多，需要排队。建议提前预约。',
        date: '2024-01-05'
      }
    ],
    faqs: [
      {
        question: '宠物看病需要预约吗？',
        answer: '建议提前预约，特别是周末和节假日。急诊情况可以直接到店，我们有 24 小时急诊服务。'
      },
      {
        question: '看病前需要做什么准备？',
        answer: '如果是空腹检查（如血液检查），请提前 8 小时不要喂食。带上宠物的疫苗接种记录和以往的病历资料。'
      },
      {
        question: '医疗费用如何支付？',
        answer: '支持现金、微信、支付宝、银行卡等多种支付方式。部分项目可以分期付款。'
      },
      {
        question: '诊后需要复查吗？',
        answer: '根据病情，医生会告知是否需要复查。我们会建立宠物健康档案，定期提醒复查和疫苗接种。'
      }
    ],
    totalAppointments: 2156,
    successRate: '98%'
  };

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('预约信息:', appointmentData);
    alert('预约提交成功！医院会在 1 小时内与您联系确认。');
    setShowAppointmentModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setAppointmentData({
      ...appointmentData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20 pb-12">
      {/* 面包屑导航 */}
      <div className="bg-light py-3">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item"><Link href="/">首页</Link></li>
              <li className="breadcrumb-item"><Link href="/medical">宠物医疗</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{medical.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mt-4">
        {/* 顶部信息 */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <h1 className="h3 mb-2">{medical.title}</h1>
                <div className="d-flex align-items-center text-muted mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  <span className="me-3">{medical.clinic.address}</span>
                  <FaClock className="me-2" />
                  <span>{medical.clinic.workingHours}</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center text-warning me-3">
                    <FaStar className="me-1" />
                    <span className="fw-bold">{medical.clinic.rating}</span>
                    <span className="text-muted ms-1">({medical.clinic.totalReviews}条评价)</span>
                  </div>
                  <div className="d-flex align-items-center text-success">
                    <FaCheckCircle className="me-1" />
                    <span>治愈率 {medical.successRate}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link href="/medical" className="btn btn-outline-secondary">
                  返回列表
                </Link>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAppointmentModal(true)}
                >
                  <FaCalendarAlt className="me-2" />
                  立即预约
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* 左侧内容 */}
          <div className="col-lg-8">
            {/* 医院信息 */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '60px', height: '60px' }}>
                    <FaUserMd className="text-primary" size={32} />
                  </div>
                  <div>
                    <h3 className="h5 mb-1">{medical.clinic.name}</h3>
                    <span className="badge bg-success">{medical.clinic.experience}经验</span>
                  </div>
                </div>
                <p className="text-muted mb-3">{medical.description}</p>
                <p className="text-muted small mb-0">{medical.clinic.introduction}</p>
              </div>
            </div>

            {/* 服务项目 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">服务项目</h3>
                <div className="row">
                  {medical.services.map((service) => (
                    <div className="col-md-6 mb-3" key={service.id}>
                      <div className="card h-100 hover-shadow">
                        <div className="card-body">
                          <div className="d-flex align-items-start mb-3">
                            <div className="bg-primary bg-opacity-10 rounded p-2 me-3">
                              <service.icon className="text-primary" size={24} />
                            </div>
                            <div className="flex-grow-1">
                              <h5 className="card-title h6 mb-1">{service.name}</h5>
                              <span className="text-muted small"><FaClock className="me-1" />{service.duration}</span>
                            </div>
                          </div>
                          <p className="card-text text-muted small mb-3">{service.description}</p>
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">包含项目：</small>
                            <div className="d-flex flex-wrap gap-1">
                              {service.includes.map((item, index) => (
                                <span key={index} className="badge bg-light text-dark">
                                  <FaCheckCircle className="me-1 text-success" size={10} />{item}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0 text-primary">¥{service.price}</span>
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => setShowAppointmentModal(true)}
                            >
                              预约此服务
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 药品推荐 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">常用药品</h3>
                <div className="row">
                  {medical.medications.map((medication, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="card-title mb-0">{medication.name}</h6>
                            <span className="badge bg-info">{medication.category}</span>
                          </div>
                          <p className="text-muted small mb-2">{medication.description}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h6 mb-0 text-primary">¥{medication.price}</span>
                            <button className="btn btn-sm btn-outline-primary">
                              <BsPlusCircle className="me-1" />咨询
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 医生团队 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">医生团队</h3>
                <div className="row">
                  {medical.clinic.doctors.map((doctor, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div className="card h-100 text-center">
                        <div className="card-body">
                          <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                            <FaUserMd className="text-primary" size={40} />
                          </div>
                          <h6 className="card-title mb-1">{doctor.name}</h6>
                          <span className="badge bg-primary mb-2">{doctor.title}</span>
                          <p className="text-muted small mb-2">{doctor.specialty}</p>
                          <p className="text-muted small mb-0">{doctor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 用户评价 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">用户评价</h3>
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <div className="d-flex align-items-center text-warning me-3">
                      <FaStar className="me-1" />
                      <span className="h4 mb-0">{medical.clinic.rating}</span>
                    </div>
                    <span className="text-muted">{medical.clinic.totalReviews}条评价</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <hr />
                {medical.reviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <FaUserMd className="text-muted" size={24} />
                        </div>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">{review.userName}</h6>
                            <div className="d-flex align-items-center text-warning">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={`me-1 ${i < review.rating ? 'text-warning' : 'text-muted'}`} size={12} />
                              ))}
                            </div>
                          </div>
                          <small className="text-muted">{review.date}</small>
                        </div>
                        <p className="text-muted mt-2 mb-0">{review.comment}</p>
                      </div>
                    </div>
                    {review.id < medical.reviews.length && <hr />}
                  </div>
                ))}
              </div>
            </div>

            {/* 常见问题 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">常见问题</h3>
                <div className="accordion" id="medicalFaqAccordion">
                  {medical.faqs.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`medical-faq-heading-${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#medical-faq-collapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`medical-faq-collapse-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`medical-faq-collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`medical-faq-heading-${index}`}
                        data-bs-parent="#medicalFaqAccordion"
                      >
                        <div className="accordion-body text-muted">
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
            {/* 预约信息 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-3">快速预约</h3>
                <div className="mb-3">
                  <small className="text-muted d-block mb-2">已服务客户：</small>
                  <span className="h4 text-primary">{medical.totalAppointments}</span>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-2">治愈成功率：</small>
                  <span className="h4 text-success">{medical.successRate}</span>
                </div>
                <button 
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => setShowAppointmentModal(true)}
                >
                  <FaCalendarAlt className="me-2" />
                  立即预约
                </button>
                <button className="btn btn-outline-secondary w-100">
                  <FaPhone className="me-2" />
                  电话咨询
                </button>
              </div>
            </div>

            {/* 医院信息 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-3">医院信息</h3>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">地址：</small>
                  <div className="d-flex align-items-center">
                    <FaMapMarkerAlt className="text-primary me-2" size={16} />
                    <small>{medical.clinic.address}</small>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">电话：</small>
                  <div className="d-flex align-items-center">
                    <FaPhone className="text-primary me-2" size={16} />
                    <small>{medical.clinic.phone}</small>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted d-block mb-1">邮箱：</small>
                  <div className="d-flex align-items-center">
                    <FaEnvelope className="text-primary me-2" size={16} />
                    <small>{medical.clinic.email}</small>
                  </div>
                </div>
                <div>
                  <small className="text-muted d-block mb-1">营业时间：</small>
                  <div className="d-flex align-items-center">
                    <FaClock className="text-primary me-2" size={16} />
                    <small>{medical.clinic.workingHours}</small>
                  </div>
                </div>
              </div>
            </div>

            {/* 资质证书 */}
            <div className="card">
              <div className="card-body">
                <h3 className="h5 mb-3">资质证书</h3>
                <div className="d-flex flex-wrap gap-2">
                  {medical.clinic.certifications.map((cert, index) => (
                    <span key={index} className="badge bg-light text-dark">
                      <FaCheckCircle className="me-1 text-success" size={10} />{cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 预约弹窗 */}
      {showAppointmentModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">预约医疗服务</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowAppointmentModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAppointmentSubmit}>
                  <div className="mb-3">
                    <label className="form-label">选择服务项目 <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      name="serviceType"
                      value={appointmentData.serviceType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">请选择服务项目</option>
                      {medical.services.map((service) => (
                        <option key={service.id} value={service.name}>
                          {service.name} - ¥{service.price} ({service.duration})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">预约日期 <span className="text-danger">*</span></label>
                      <input 
                        type="date" 
                        className="form-control"
                        name="appointmentDate"
                        value={appointmentData.appointmentDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">预约时间 <span className="text-danger">*</span></label>
                      <input 
                        type="time" 
                        className="form-control"
                        name="appointmentTime"
                        value={appointmentData.appointmentTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <hr />
                  <h6 className="mb-3"><FaPaw className="me-2" />宠物信息</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物姓名 <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="petName"
                        value={appointmentData.petName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物类型 <span className="text-danger">*</span></label>
                      <select 
                        className="form-select"
                        name="petType"
                        value={appointmentData.petType}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">请选择类型</option>
                        <option value="dog">狗狗</option>
                        <option value="cat">猫咪</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物品种</label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="petBreed"
                        value={appointmentData.petBreed}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物年龄</label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="petAge"
                        value={appointmentData.petAge}
                        onChange={handleInputChange}
                        placeholder="例如：2 岁"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">宠物体重</label>
                    <input 
                      type="text" 
                      className="form-control"
                      name="petWeight"
                      value={appointmentData.petWeight}
                      onChange={handleInputChange}
                      placeholder="例如：15kg"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">症状描述 <span className="text-danger">*</span></label>
                    <textarea 
                      className="form-control"
                      name="symptoms"
                      value={appointmentData.symptoms}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      placeholder="请详细描述宠物的症状..."
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">既往病史</label>
                    <textarea 
                      className="form-control"
                      name="medicalHistory"
                      value={appointmentData.medicalHistory}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="是否有过敏史、慢性疾病等..."
                    ></textarea>
                  </div>
                  <hr />
                  <h6 className="mb-3"><FaUserMd className="me-2" />联系人信息</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">您的姓名 <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="ownerName"
                        value={appointmentData.ownerName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">联系电话 <span className="text-danger">*</span></label>
                      <input 
                        type="tel" 
                        className="form-control"
                        name="ownerPhone"
                        value={appointmentData.ownerPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">电子邮箱</label>
                    <input 
                      type="email" 
                      className="form-control"
                      name="ownerEmail"
                      value={appointmentData.ownerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">备注说明</label>
                    <textarea 
                      className="form-control"
                      name="notes"
                      value={appointmentData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="其他需要说明的信息..."
                    ></textarea>
                  </div>
                  <div className="alert alert-info">
                    <small>
                      <FaCalendarAlt className="me-1" />
                      提交预约后，医院会在 1 小时内与您联系确认。紧急情况请直接拨打急诊电话。
                    </small>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowAppointmentModal(false)}
                    >
                      取消
                    </button>
                    <button type="submit" className="btn btn-primary">
                      提交预约
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAppointmentModal && (
        <div 
          className="modal-backdrop fade show" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={() => setShowAppointmentModal(false)}
        ></div>
      )}
    </div>
  );
}
