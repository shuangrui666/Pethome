'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getAdoptions } from '../../src/api/adoption'

interface Adoption {
  _id: string
  petId: Pet | string
  applicantName: string
  applicantContact: string
  reason: string
  status: string
  createdAt: string
  updatedAt: string
}

interface Pet {
  _id: string
  name: string
  breed: string
  age: number
  gender: 'male' | 'female'
  images: string[]
  description: string
  location: string
}

export default function AdoptionPage() {
  const [adoptions, setAdoptions] = useState<Adoption[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [petType, setPetType] = useState<string>('all')

  useEffect(() => {
    loadAdoptions()
  }, [filterStatus, petType])

  const loadAdoptions = async () => {
    try {
      setLoading(true)
      const params: any = {}
      if (filterStatus !== 'all') params.status = filterStatus
      if (petType !== 'all') params.petType = petType

      const data = await getAdoptions(params)
      setAdoptions(data.adoptions || [])
      setPets(data.pets || [])
    } catch (error) {
      console.error('加载领养信息失败:', error)
      setAdoptions([])
      setPets([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pending: 'bg-warning',
      approved: 'bg-success',
      rejected: 'bg-danger',
      completed: 'bg-info',
    }
    const labels: any = {
      pending: '审核中',
      approved: '已批准',
      rejected: '已拒绝',
      completed: '已完成',
    }
    return (
      <span className={`badge ${badges[status] || 'bg-secondary'}`}>
        {labels[status] || status}
      </span>
    )
  }

  const getPetById = (petId: string | Pet) => {
    if (typeof petId === 'string') {
      return pets.find(p => p._id === petId)
    }
    return petId
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🏠 宠物领养</h1>
          <p className="lead text-muted">
            帮助流浪宠物找到温暖的家，您的爱心将改变它们的一生
          </p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterStatus('all')}
            >
              全部
            </button>
            <button
              className={`btn ${filterStatus === 'pending' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterStatus('pending')}
            >
              审核中
            </button>
            <button
              className={`btn ${filterStatus === 'approved' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterStatus('approved')}
            >
              已批准
            </button>
            <button
              className={`btn ${filterStatus === 'completed' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilterStatus('completed')}
            >
              已完成
            </button>
          </div>
        </div>
        <div className="col-md-6 text-md-end mt-3 mt-md-0">
          <Link href="/adoption/create" className="btn btn-success">
            🐾 发布领养信息
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : adoptions.length === 0 ? (
        <div className="text-center py-5">
          <h3>暂无领养信息</h3>
          <p className="text-muted">成为第一个发布领养信息的人吧！</p>
          <Link href="/adoption/create" className="btn btn-primary">
            发布领养
          </Link>
        </div>
      ) : (
        <div className="row">
          {adoptions.map((adoption) => {
            const pet = getPetById(adoption.petId)
            return (
              <div key={adoption._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
                  {pet?.images?.[0] && (
                    <img
                      src={pet.images[0]}
                      className="card-img-top"
                      alt={pet.name}
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0">{pet?.name || '待领养宠物'}</h5>
                      {getStatusBadge(adoption.status)}
                    </div>
                    <p className="text-muted mb-2">
                      <small>
                        {pet?.breed || '混血'} • {pet?.gender === 'male' ? '公' : '母'} • 
                        {pet?.age || '未知'}岁
                      </small>
                    </p>
                    <p className="card-text">
                      {adoption.reason?.substring(0, 100)}...
                    </p>
                    <div className="mb-2">
                      <small className="text-muted">
                        📅 申请时间：{new Date(adoption.createdAt).toLocaleDateString('zh-CN')}
                      </small>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent">
                    <Link
                      href={`/adoption/${adoption._id}`}
                      className="btn btn-outline-primary w-100"
                    >
                      查看详情
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
