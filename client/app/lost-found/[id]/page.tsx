'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function LostPetDetailPage() {
  const params = useParams()
  const [lostPet, setLostPet] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tip, setTip] = useState({
    name: '',
    phone: '',
    location: '',
    time: '',
    description: '',
    contact: true,
  })
  const [showTipForm, setShowTipForm] = useState(false)

  // 从 API 获取走失宠物详情
  useEffect(() => {
    const fetchLostPetDetail = async () => {
      if (!params.id) {
        console.log('❌ 没有 params.id，跳过请求')
        return
      }

      const apiUrl = `http://localhost:5000/api/lost-pets/${params.id}`
      console.log('🔍 开始请求走失宠物详情:', apiUrl)

      try {
        setLoading(true)
        setError(null)

        const response = await fetch(apiUrl, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log('📡 响应状态:', response.status, response.ok)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('❌ 请求失败:', response.status, errorText)
          throw new Error(`请求失败：${response.status} ${errorText}`)
        }

        const responseData = await response.json()
        console.log('✅ 原始响应数据:', JSON.stringify(responseData, null, 2))

        if (responseData.success) {
          console.log('📦 responseData.data:', responseData.data)
          console.log('🐕 lostPet 数据:', responseData.data.lostPet)

          if (!responseData.data || !responseData.data.lostPet) {
            console.error('❌ 响应数据缺少 lostPet 字段')
            throw new Error('响应数据格式错误：缺少 lostPet 字段')
          }

          setLostPet(responseData.data.lostPet)
          console.log('✅ 成功设置 lostPet 状态')
        } else {
          console.error('❌ API 返回 success=false:', responseData.message)
          throw new Error(responseData.message || '无法加载宠物详情')
        }
      } catch (err) {
        console.error('❌ 获取走失宠物详情失败:', err)
        const errorMessage = err instanceof Error ? err.message : '加载失败，请稍后重试'
        setError(errorMessage)
      } finally {
        setLoading(false)
        console.log('🏁 加载完成，loading=false')
      }
    }

    fetchLostPetDetail()
  }, [params.id])

  const handleSubmitTip = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // TODO: 调用提交线索 API
      // await submitLostPetTip(params.id, tip)
      alert('线索提交成功，感谢帮助！')
      setShowTipForm(false)
      setTip({ name: '', phone: '', location: '', time: '', description: '', contact: true })
    } catch (error) {
      console.error('提交线索失败:', error)
      alert('提交失败，请稍后重试')
    }
  }

  const handleShare = () => {
    if (navigator.share && lostPet) {
      const petName = lostPet.petId?.name || '走失宠物'
      const breed = lostPet.petId?.breed || '宠物'
      navigator.share({
        title: `寻找走失宠物：${petName}`,
        text: `我在 PetHome 平台看到一只走失的${breed}，请帮忙扩散！`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('链接已复制到剪贴板')
    }
  }

  // 加载状态处理
  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
          <p className="mt-3 text-muted">正在加载宠物详情...</p>
        </div>
      </div>
    )
  }

  // 错误状态处理
  if (error) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-danger" role="alert">
            <h4 className="alert-heading">❌ 加载失败</h4>
            <p>{error}</p>
            <hr />
            <p className="mb-0">
              <Link href="/lost-found" className="btn btn-outline-secondary">
                ← 返回列表
              </Link>
              <button className="btn btn-primary ms-2" onClick={() => window.location.reload()}>
                🔄 刷新页面
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // lostPet 为空但无错误（数据不存在）
  if (!lostPet) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="alert alert-warning" role="alert">
            <h4 className="alert-heading">⚠️ 未找到宠物信息</h4>
            <p>该走失宠物记录不存在或已被删除。</p>
            <hr />
            <Link href="/lost-found" className="btn btn-outline-secondary">
              ← 返回列表
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      {/* 返回按钮 */}
      <div className="mb-4">
        <Link href="/lost-found" className="btn btn-outline-secondary">
          ← 返回寻回列表
        </Link>
      </div>

      {/* 紧急状态横幅 */}
      <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
        <span className="badge bg-danger me-2">紧急</span>
        <div>
          <strong>宠物走失中！</strong> 如果您有任何线索，请立即联系主人
        </div>
      </div>

      <div className="row">
        {/* 左侧：宠物信息 */}
        <div className="col-lg-8">
          {/* 图片 */}
          <div id="lostPetCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
            <div className="carousel-inner rounded">
              {(lostPet.petId?.images && lostPet.petId.images.length > 0
                ? lostPet.petId.images
                : lostPet.images || []
              ).map((img: string, index: number) => (
                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                  <img src={img} className="d-block w-100" alt={lostPet.petId?.name || '走失宠物'} style={{ height: '450px', objectFit: 'cover' }} />
                </div>
              ))}
              {(!lostPet.petId?.images || lostPet.petId.images.length === 0) && (!lostPet.images || lostPet.images.length === 0) && (
                <div className="carousel-item active">
                  <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '450px' }}>
                    <p className="text-muted">暂无宠物图片</p>
                  </div>
                </div>
              )}
            </div>
            {(lostPet.petId?.images && lostPet.petId.images.length > 0 || lostPet.images && lostPet.images.length > 0) && (<>
              <button className="carousel-control-prev" type="button" data-bs-target="#lostPetCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#lostPetCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </>)}
          </div>

          {/* 基本信息 */}
          <div className="card mb-4">
            <div className="card-header bg-danger text-white">
              <h2 className="mb-0">🔴 寻找：{lostPet.petId?.name || '未知宠物'}</h2>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="mb-1"><strong>品种：</strong>{lostPet.petId?.breed || '未知'}</p>
                  <p className="mb-1"><strong>年龄：</strong>{lostPet.petId?.age || '未知'}</p>
                  <p className="mb-1"><strong>性别：</strong>{lostPet.petId?.gender || '未知'}</p>
                  <p className="mb-1"><strong>毛色：</strong>{lostPet.petId?.color || '未知'}</p>
                </div>
                <div className="col-md-6">
                  <p className="mb-1"><strong>体重：</strong>{lostPet.petId?.weight || '未知'}</p>
                  <p className="mb-1"><strong>走失日期：</strong>{lostPet.lostTime ? new Date(lostPet.lostTime).toLocaleDateString() : '未知'}</p>
                  <p className="mb-1"><strong>走失时间：</strong>{lostPet.lostTime ? new Date(lostPet.lostTime).toLocaleTimeString() : '未知'}</p>
                  <p className="mb-1"><strong>走失地点：</strong>{lostPet.lostLocation?.address || lostPet.lostLocation || '未知'}</p>
                </div>
              </div>

              {/* 特征描述 */}
              <h5 className="mb-3">🎯 显著特征</h5>
              <p className="text-muted">{lostPet.petId?.description || '暂无描述'}</p>

              {/* 详细描述 */}
              <h5 className="mb-3">📝 详细描述</h5>
              <p className="text-muted">{lostPet.petId?.description || '暂无描述'}</p>

              {/* 悬赏信息 */}
              {lostPet.reward > 0 && (
                <div className="alert alert-warning d-flex align-items-center" role="alert">
                  <span className="badge bg-warning text-dark me-2">💰 悬赏</span>
                  <strong>提供有效线索并帮助找到宠物，酬金 {lostPet.reward} 元！</strong>
                </div>
              )}
            </div>
          </div>

          {/* 相似宠物匹配 */}
          {lostPet.matches && lostPet.matches.length > 0 && (
            <div className="card mb-4">
              <div className="card-header bg-info text-white">
                <h5 className="mb-0">🤖 AI 智能匹配 - 相似宠物</h5>
              </div>
              <div className="card-body">
                <p className="text-muted mb-3">系统自动匹配到以下相似的走失/被拾到宠物：</p>
                <div className="row">
                  {lostPet.matches.map((similar: any) => (
                    <div className="col-md-6 mb-3" key={similar._id}>
                      <div className="card border-info">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <h6 className="mb-0">{similar.name}</h6>
                            <span className="badge bg-info">{similar.similarity}% 相似</span>
                          </div>
                          <p className="mb-1 small">品种：{similar.breed}</p>
                          <p className="mb-1 small">地点：{similar.location}</p>
                          <p className="mb-2 small">日期：{similar.date}</p>
                          <Link href={`/lost-found/${similar._id}`} className="btn btn-sm btn-outline-info">
                            查看详情
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 提供线索 */}
          <div className="card">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">💡 提供线索</h5>
            </div>
            <div className="card-body">
              {!showTipForm ? (
                <div>
                  <p className="mb-3">如果您在附近看到过这只宠物，或者有任何线索，请告诉我们！您的帮助可能让它早日回家。</p>
                  <button className="btn btn-success btn-lg" onClick={() => setShowTipForm(true)}>
                    提交线索
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitTip}>
                  <div className="mb-3">
                    <label htmlFor="tipName" className="form-label">您的姓名</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipName"
                      value={tip.name}
                      onChange={(e) => setTip({ ...tip, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipPhone" className="form-label">联系电话</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="tipPhone"
                      value={tip.phone}
                      onChange={(e) => setTip({ ...tip, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipLocation" className="form-label">看到宠物的地点</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tipLocation"
                      value={tip.location}
                      onChange={(e) => setTip({ ...tip, location: e.target.value })}
                      placeholder="详细地址"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipTime" className="form-label">看到的时间</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="tipTime"
                      value={tip.time}
                      onChange={(e) => setTip({ ...tip, time: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tipDescription" className="form-label">详细描述</label>
                    <textarea
                      className="form-control"
                      id="tipDescription"
                      rows={4}
                      value={tip.description}
                      onChange={(e) => setTip({ ...tip, description: e.target.value })}
                      placeholder="请详细描述您看到宠物的情况，包括宠物的状态、行为等"
                      required
                    />
                  </div>
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="tipContact"
                      checked={tip.contact}
                      onChange={(e) => setTip({ ...tip, contact: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="tipContact">
                      允许主人联系我
                    </label>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-success">
                      提交线索
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setShowTipForm(false)}>
                      取消
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：操作栏 */}
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📞 联系主人</h5>
            </div>
            <div className="card-body text-center">
              <div className="mb-3">
                <img
                  src="https://via.placeholder.com/100"
                  alt={lostPet.reporterId?.username || '宠物主人'}
                  className="rounded-circle mb-2"
                  style={{ width: '80px', height: '80px' }}
                />
                <h6>{lostPet.reporterId?.username || '宠物主人'}</h6>
                {lostPet.reporterId?.verified && (
                  <span className="badge bg-primary">✓ 已认证</span>
                )}
              </div>
              <p className="mb-2"><strong>📞 电话：</strong>{lostPet.reporterId?.phone || '暂无'}</p>
              <div className="d-grid gap-2">
                {lostPet.reporterId?.phone ? (
                  <a href={`tel:${lostPet.reporterId.phone}`} className="btn btn-primary">
                    拨打电话
                  </a>
                ) : (
                  <button className="btn btn-primary" disabled>
                    暂无电话
                  </button>
                )}
                <button className="btn btn-outline-primary" onClick={handleShare}>
                  📤 分享扩散
                </button>
              </div>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h5 className="mb-0">📊 寻回进度</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <span>寻找进度</span>
                  <span>30%</span>
                </div>
                <div className="progress">
                  <div className="progress-bar bg-warning" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="row text-center">
                <div className="col-6">
                  <h4 className="mb-0">128</h4>
                  <small className="text-muted">👁️ 浏览</small>
                </div>
                <div className="col-6">
                  <h4 className="mb-0">{lostPet.clues?.length || 0}</h4>
                  <small className="text-muted">💡 线索</small>
                </div>
              </div>
            </div>
          </div>

          {/* 时间线 */}
          <div className="card">
            <div className="card-header bg-light">
              <h5 className="mb-0">📅 时间线</h5>
            </div>
            <div className="card-body">
              <div className="timeline">
                <div className="mb-3">
                  <small className="text-muted">{new Date(lostPet.lostTime).toLocaleString()}</small>
                  <p className="mb-0">发布寻宠信息</p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">2024-01-12</small>
                  <p className="mb-0">收到 5 条线索</p>
                </div>
                <div className="mb-3">
                  <small className="text-muted">2024-01-13</small>
                  <p className="mb-0">AI 匹配到 2 只相似宠物</p>
                </div>
                <div>
                  <small className="text-muted">今天</small>
                  <p className="mb-0">分享次数突破 100 次</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
