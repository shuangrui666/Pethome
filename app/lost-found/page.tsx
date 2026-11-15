'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getLostPets, LostPet } from '../../src/api/lostPet'

export default function LostFoundPage() {
  const [lostPets, setLostPets] = useState<LostPet[]>([])
  const [foundPets, setFoundPets] = useState<LostPet[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [tab, setTab] = useState<'lost' | 'found'>('lost')

  useEffect(() => {
    loadLostPets()
  }, [tab])

  const loadLostPets = async () => {
    try {
      setLoading(true)
      setLoadError(null)
      // 走失和已找到报告分别请求真实状态，不使用模拟数据冒充业务记录。
      const response = await getLostPets({ status: tab })
      if (!response.success || !Array.isArray(response.data)) {
        throw new Error(response.message || '服务器返回的数据格式不正确')
      }
      if (tab === 'lost') {
        setLostPets(response.data)
      } else {
        setFoundPets(response.data)
      }
    } catch (error: any) {
      console.error('加载寻回信息失败:', error)
      setLoadError(error.response?.data?.message || error.message || '加载失败，请稍后重试')
      if (tab === 'lost') {
        setLostPets([])
      } else {
        setFoundPets([])
      }
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      lost: 'bg-danger',
      found: 'bg-success',
      closed: 'bg-secondary',
    }
    const labels: any = {
      lost: '寻找中',
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
                🎉 已找到
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <Link href="/lost-found/create" className="btn btn-success">
            📝 发布走失报告
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : loadError ? (
        <div className="alert alert-danger text-center" role="alert">
          <p className="mb-2">加载报告失败：{loadError}</p>
          <button className="btn btn-outline-danger" onClick={loadLostPets}>重试</button>
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
                    {item.features?.substring(0, 80) || ''}...
                  </p>
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
