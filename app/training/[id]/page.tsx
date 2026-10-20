'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FaStar, FaMapMarkerAlt, FaClock, FaUser, FaPhone, FaEnvelope, FaCertificate, FaCheckCircle, FaCalendarAlt, FaPaw } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';

export default function TrainingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingData, setBookingData] = useState({
    trainingPhase: '',
    trainingDate: '',
    trainingTime: '',
    petName: '',
    petType: '',
    petBreed: '',
    petAge: '',
    petBehavior: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    notes: ''
  });

  // 模拟训练课程数据
  const training = {
    _id: id,
    title: '狗狗基础行为训练课程',
    description: '专业训犬师一对一指导，帮助您的爱犬建立良好的行为习惯，解决常见行为问题。采用正向强化训练方法，让训练过程愉快而有效。',
    trainer: {
      name: '张教练',
      avatar: '/images/trainer-zhang.jpg',
      rating: 4.9,
      totalReviews: 156,
      experience: '8 年',
      certifications: ['CKU 认证训犬师', '宠物行为矫正师', '动物心理学硕士'],
      introduction: '8 年专业训犬经验，累计训练超过 500 只狗狗。擅长解决攻击性、分离焦虑、过度吠叫等行为问题。坚信每只狗狗都可以被理解和引导。'
    },
    images: [
      '/images/training-1.jpg',
      '/images/training-2.jpg',
      '/images/training-3.jpg'
    ],
    phases: [
      {
        name: '基础服从训练',
        duration: '4 周',
        price: 1200,
        description: '学习基本指令：坐下、趴下、等待、过来、随行等',
        skills: ['坐下', '趴下', '等待', '过来', '随行', '禁止'],
        level: '初级'
      },
      {
        name: '社交行为训练',
        duration: '4 周',
        price: 1400,
        description: '改善与人和动物的社交行为，减少攻击性和恐惧反应',
        skills: ['友好社交', '减少攻击', '克服恐惧', '公共场所礼仪'],
        level: '中级'
      },
      {
        name: '高级技能训练',
        duration: '4 周',
        price: 1600,
        description: '学习复杂技能和游戏，增强与主人的互动和信任',
        skills: ['物品取回', '翻滚', '装死', '跳圈', '寻宝游戏'],
        level: '高级'
      }
    ],
    location: '北京市朝阳区宠物训练中心',
    availableDays: ['周一', '周三', '周五', '周六', '周日'],
    availableTimeSlots: ['09:00-10:00', '10:30-11:30', '14:00-15:00', '15:30-16:30', '17:00-18:00'],
    reviews: [
      {
        id: 1,
        userName: '李女士',
        userAvatar: '/images/user1.jpg',
        rating: 5,
        comment: '张教练非常专业，我家金毛经过训练后乖了很多，现在可以自如地坐下、等待，出门也听话多了！',
        date: '2024-01-10'
      },
      {
        id: 2,
        userName: '王先生',
        userAvatar: '/images/user2.jpg',
        rating: 5,
        comment: '之前我家狗狗见到人就扑，经过社交训练后改善了很多。教练很有耐心，方法也很科学。',
        date: '2024-01-05'
      },
      {
        id: 3,
        userName: '张女士',
        userAvatar: '/images/user3.jpg',
        rating: 4,
        comment: '训练效果不错，狗狗学会了基本指令。就是时间有点紧张，希望能增加更多时段。',
        date: '2023-12-28'
      }
    ],
    faqs: [
      {
        question: '训练前需要做什么准备？',
        answer: '请确保狗狗身体健康，训练当天带上狗狗喜欢的零食和玩具。建议提前 1 小时不要喂食，这样训练时狗狗会更专注。'
      },
      {
        question: '主人需要参与训练吗？',
        answer: '是的，主人的参与非常重要。我们会教导您如何在家继续训练，确保训练效果能够持续。'
      },
      {
        question: '多大的狗狗可以开始训练？',
        answer: '建议 3 个月以上的狗狗开始基础训练。年龄不是问题，成年犬甚至老年犬也可以学习新技能。'
      },
      {
        question: '如果狗狗有特殊行为问题怎么办？',
        answer: '我们提供个性化的训练方案。请在预约时详细说明狗狗的行为问题，我们会安排专门的训练计划。'
      }
    ],
    totalBookings: 328,
    successRate: '95%'
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 调用 API 提交预约
    console.log('预约信息:', bookingData);
    alert('预约提交成功！我们会尽快与您联系确认。');
    setShowBookingModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setBookingData({
      ...bookingData,
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
              <li className="breadcrumb-item"><Link href="/training">训狗服务</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{training.title}</li>
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
                <h1 className="h3 mb-2">{training.title}</h1>
                <div className="d-flex align-items-center text-muted mb-2">
                  <FaMapMarkerAlt className="me-2" />
                  <span className="me-3">{training.location}</span>
                  <FaClock className="me-2" />
                  <span>可预约时间：{training.availableDays.join('、')}</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="d-flex align-items-center text-warning me-3">
                    <FaStar className="me-1" />
                    <span className="fw-bold">{training.trainer.rating}</span>
                    <span className="text-muted ms-1">({training.trainer.totalReviews}条评价)</span>
                  </div>
                  <div className="d-flex align-items-center text-success">
                    <FaCheckCircle className="me-1" />
                    <span>成功率 {training.successRate}</span>
                  </div>
                </div>
              </div>
              <div className="d-flex gap-2">
                <Link href="/training" className="btn btn-outline-secondary">
                  返回列表
                </Link>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowBookingModal(true)}
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
            {/* 课程描述 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-3">课程介绍</h3>
                <p className="text-muted mb-0">{training.description}</p>
              </div>
            </div>

            {/* 训练阶段 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">训练阶段</h3>
                <div className="row">
                  {training.phases.map((phase, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div className="card h-100 border-primary">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className={`badge bg-${index === 0 ? 'primary' : index === 1 ? 'warning' : 'danger'}`}>
                              {phase.level}
                            </span>
                            <span className="text-muted"><FaClock className="me-1" />{phase.duration}</span>
                          </div>
                          <h5 className="card-title h6 mb-2">{phase.name}</h5>
                          <p className="card-text text-muted small mb-3">{phase.description}</p>
                          <div className="mb-3">
                            <small className="text-muted d-block mb-2">掌握技能：</small>
                            <div className="d-flex flex-wrap gap-1">
                              {phase.skills.map((skill, skillIndex) => (
                                <span key={skillIndex} className="badge bg-light text-dark">
                                  <FaPaw className="me-1" />{skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="h5 mb-0 text-primary">¥{phase.price}</span>
                            <button 
                              className="btn btn-sm btn-primary"
                              onClick={() => setShowBookingModal(true)}
                            >
                              选择此阶段
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 训练师信息 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">训练师信息</h3>
                <div className="d-flex">
                  <div className="flex-shrink-0">
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                      <FaUser className="text-muted" size={40} />
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{training.trainer.name}</h5>
                        <div className="d-flex align-items-center text-warning mb-2">
                          <FaStar className="me-1" />
                          <span className="fw-bold">{training.trainer.rating}</span>
                          <span className="text-muted ms-1">({training.trainer.totalReviews}条评价)</span>
                        </div>
                      </div>
                      <span className="badge bg-success">{training.trainer.experience}经验</span>
                    </div>
                    <p className="text-muted small mb-2">{training.trainer.introduction}</p>
                    <div className="mt-2">
                      <small className="text-muted d-block mb-1">资质证书：</small>
                      <div className="d-flex flex-wrap gap-2">
                        {training.trainer.certifications.map((cert, index) => (
                          <span key={index} className="badge bg-light text-dark">
                            <FaCertificate className="me-1" />{cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
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
                      <span className="h4 mb-0">{training.trainer.rating}</span>
                    </div>
                    <span className="text-muted">{training.trainer.totalReviews}条评价</span>
                  </div>
                  <div className="progress" style={{ height: '8px' }}>
                    <div className="progress-bar bg-warning" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <hr />
                {training.reviews.map((review) => (
                  <div key={review.id} className="mb-4">
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: '48px', height: '48px' }}>
                          <FaUser className="text-muted" size={24} />
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
                    {review.id < training.reviews.length && <hr />}
                  </div>
                ))}
              </div>
            </div>

            {/* 常见问题 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-4">常见问题</h3>
                <div className="accordion" id="trainingFaqAccordion">
                  {training.faqs.map((faq, index) => (
                    <div className="accordion-item" key={index}>
                      <h2 className="accordion-header" id={`faq-heading-${index}`}>
                        <button
                          className="accordion-button collapsed"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#faq-collapse-${index}`}
                          aria-expanded="false"
                          aria-controls={`faq-collapse-${index}`}
                        >
                          {faq.question}
                        </button>
                      </h2>
                      <div
                        id={`faq-collapse-${index}`}
                        className="accordion-collapse collapse"
                        aria-labelledby={`faq-heading-${index}`}
                        data-bs-parent="#trainingFaqAccordion"
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
            {/* 价格信息 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-3">价格信息</h3>
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">基础训练</span>
                    <span>¥1200</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">社交训练</span>
                    <span>¥1400</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span className="text-muted">高级训练</span>
                    <span>¥1600</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">总计</span>
                    <span className="fw-bold text-primary">¥1200 - ¥1600</span>
                  </div>
                </div>
                <div className="mb-3">
                  <small className="text-muted">
                    <FaCheckCircle className="me-1 text-success" />
                    已服务 {training.totalBookings} 位客户
                  </small>
                </div>
                <button 
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => setShowBookingModal(true)}
                >
                  <FaCalendarAlt className="me-2" />
                  立即预约
                </button>
                <button className="btn btn-outline-secondary w-100">
                  <FaPhone className="me-2" />
                  联系训练师
                </button>
              </div>
            </div>

            {/* 训练师联系方式 */}
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="h5 mb-3">联系方式</h3>
                <div className="d-flex align-items-center mb-3">
                  <FaUser className="text-primary me-3" size={20} />
                  <div>
                    <div className="text-muted small">训练师</div>
                    <div className="fw-bold">{training.trainer.name}</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <FaPhone className="text-primary me-3" size={20} />
                  <div>
                    <div className="text-muted small">电话</div>
                    <div>138-****-****</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <FaEnvelope className="text-primary me-3" size={20} />
                  <div>
                    <div className="text-muted small">邮箱</div>
                    <div>trainer@pethome.com</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 可预约时间 */}
            <div className="card">
              <div className="card-body">
                <h3 className="h5 mb-3">可预约时间</h3>
                <div className="mb-3">
                  <small className="text-muted d-block mb-2">可预约日期：</small>
                  <div className="d-flex flex-wrap gap-1">
                    {training.availableDays.map((day, index) => (
                      <span key={index} className="badge bg-light text-dark">{day}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <small className="text-muted d-block mb-2">时间段：</small>
                  <div className="d-flex flex-wrap gap-1">
                    {training.availableTimeSlots.map((slot, index) => (
                      <span key={index} className="badge bg-light text-dark">{slot}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 预约弹窗 */}
      {showBookingModal && (
        <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">预约训练课程</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowBookingModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleBookingSubmit}>
                  <div className="mb-3">
                    <label className="form-label">选择训练阶段 <span className="text-danger">*</span></label>
                    <select 
                      className="form-select"
                      name="trainingPhase"
                      value={bookingData.trainingPhase}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">请选择训练阶段</option>
                      {training.phases.map((phase, index) => (
                        <option key={index} value={phase.name}>
                          {phase.name} - ¥{phase.price} ({phase.duration})
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
                        name="trainingDate"
                        value={bookingData.trainingDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">预约时间 <span className="text-danger">*</span></label>
                      <select 
                        className="form-select"
                        name="trainingTime"
                        value={bookingData.trainingTime}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">请选择时间</option>
                        {training.availableTimeSlots.map((slot, index) => (
                          <option key={index} value={slot}>{slot}</option>
                        ))}
                      </select>
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
                        value={bookingData.petName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物类型 <span className="text-danger">*</span></label>
                      <select 
                        className="form-select"
                        name="petType"
                        value={bookingData.petType}
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
                        value={bookingData.petBreed}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物年龄</label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="petAge"
                        value={bookingData.petAge}
                        onChange={handleInputChange}
                        placeholder="例如：1 岁 3 个月"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">行为描述/训练目标</label>
                    <textarea 
                      className="form-control"
                      name="petBehavior"
                      value={bookingData.petBehavior}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="请描述您希望训练的具体内容或狗狗当前的行为问题..."
                    ></textarea>
                  </div>
                  <hr />
                  <h6 className="mb-3"><FaUser className="me-2" />联系人信息</h6>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">您的姓名 <span className="text-danger">*</span></label>
                      <input 
                        type="text" 
                        className="form-control"
                        name="ownerName"
                        value={bookingData.ownerName}
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
                        value={bookingData.ownerPhone}
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
                      value={bookingData.ownerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">备注说明</label>
                    <textarea 
                      className="form-control"
                      name="notes"
                      value={bookingData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      placeholder="其他需要说明的信息..."
                    ></textarea>
                  </div>
                  <div className="alert alert-info">
                    <small>
                      <FaCalendarAlt className="me-1" />
                      提交预约后，训练师会在 24 小时内与您联系确认具体安排。
                    </small>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={() => setShowBookingModal(false)}
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

      {showBookingModal && (
        <div 
          className="modal-backdrop fade show" 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1040 }}
          onClick={() => setShowBookingModal(false)}
        ></div>
      )}
    </div>
  );
}
