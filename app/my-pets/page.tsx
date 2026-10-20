'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getPets, Pet, createPet } from '../../src/api/pet'

export default function MyPetsPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    species: 'dog' as 'dog' | 'cat' | 'other',
    breed: '',
    age: '',
    weight: '',
    gender: 'male' as 'male' | 'female',
    description: '',
    photos: [] as string[],
    photoUrls: '',
  })

  useEffect(() => {
    loadPets()
  }, [])

  const loadPets = async () => {
    try {
      setLoading(true)
      const data = await getPets({})
      setPets(data.pets || [])
    } catch (error) {
      console.error('加载宠物列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        age: formData.age ? parseInt(formData.age) : undefined,
        weight: formData.weight ? parseFloat(formData.weight) : undefined,
        photos: formData.photoUrls ? formData.photoUrls.split(',').map(url => url.trim()) : [],
      }
      await createPet(payload)
      alert('宠物添加成功！')
      setShowModal(false)
      resetForm()
      loadPets()
    } catch (error) {
      console.error('添加宠物失败:', error)
      alert('添加失败，请稍后重试')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      species: 'dog',
      breed: '',
      age: '',
      weight: '',
      gender: 'male',
      description: '',
      photos: [],
      photoUrls: '',
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这只宠物吗？')) return
    try {
      // TODO: 调用删除 API
      alert('删除成功')
      loadPets()
    } catch (error) {
      console.error('删除宠物失败:', error)
      alert('删除失败，请稍后重试')
    }
  }

  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case 'dog': return '🐕'
      case 'cat': return '🐈'
      default: return '🐾'
    }
  }

  const getGenderText = (gender: string) => {
    return gender === 'male' ? '公' : '母'
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-5 mb-3">🐕 我的宠物</h1>
          <p className="lead text-muted">管理您的宠物信息和档案</p>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-12 text-end">
          <button
            className="btn btn-success"
            onClick={() => setShowModal(true)}
          >
            ➕ 添加宠物
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">加载中...</span>
          </div>
        </div>
      ) : pets.length === 0 ? (
        <div className="text-center py-5">
          <div className="mb-3" style={{ fontSize: '4rem' }}>🐾</div>
          <h3>暂无宠物</h3>
          <p className="text-muted">添加您的第一只宠物吧！</p>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            添加宠物
          </button>
        </div>
      ) : (
        <div className="row">
          {pets.map((pet) => (
            <div key={pet._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                {pet.photos?.[0] ? (
                  <img
                    src={pet.photos[0]}
                    className="card-img-top"
                    alt={pet.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="card-img-top d-flex align-items-center justify-content-center"
                    style={{ height: '200px', backgroundColor: '#f8f9fa' }}
                  >
                    <span style={{ fontSize: '4rem' }}>
                      {getSpeciesIcon(pet.species)}
                    </span>
                  </div>
                )}
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{pet.name}</h5>
                    <span className="badge bg-primary">{getSpeciesIcon(pet.species)} {pet.species === 'dog' ? '狗狗' : pet.species === 'cat' ? '猫咪' : '宠物'}</span>
                  </div>
                  
                  {pet.breed && (
                    <p className="text-muted mb-2">
                      <small>品种：{pet.breed}</small>
                    </p>
                  )}
                  
                  <div className="mb-2">
                    <small className="text-muted d-block">
                      年龄：{pet.age ? `${pet.age}岁` : '未知'}
                    </small>
                    <small className="text-muted d-block">
                      性别：{getGenderText(pet.gender)}
                    </small>
                    {pet.weight && (
                      <small className="text-muted d-block">
                        体重：{pet.weight}kg
                      </small>
                    )}
                  </div>
                  
                  {pet.description && (
                    <p className="card-text small">
                      {pet.description.substring(0, 80)}...
                    </p>
                  )}
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-grid gap-2">
                    <Link
                      href={`/pets/${pet._id}`}
                      className="btn btn-outline-primary"
                    >
                      查看详情
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(pet._id)}
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 添加宠物模态框 */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h5 className="modal-title">➕ 添加宠物</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">宠物名称 *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">宠物种类 *</label>
                      <select
                        className="form-select"
                        value={formData.species}
                        onChange={(e) => setFormData({...formData, species: e.target.value as any})}
                        required
                      >
                        <option value="dog">🐕 狗狗</option>
                        <option value="cat">🐈 猫咪</option>
                        <option value="other">🐾 其他</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">品种</label>
                      <input
                        type="text"
                        className="form-control"
                        value={formData.breed}
                        onChange={(e) => setFormData({...formData, breed: e.target.value})}
                        placeholder="例如：金毛、哈士奇"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label className="form-label">年龄（岁）</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.age}
                        onChange={(e) => setFormData({...formData, age: e.target.value})}
                        min="0"
                        max="30"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">体重（kg）</label>
                      <input
                        type="number"
                        className="form-control"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: e.target.value})}
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label className="form-label">性别 *</label>
                      <select
                        className="form-select"
                        value={formData.gender}
                        onChange={(e) => setFormData({...formData, gender: e.target.value as any})}
                        required
                      >
                        <option value="male">公</option>
                        <option value="female">母</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">照片链接</label>
                    <textarea
                      className="form-control"
                      value={formData.photoUrls}
                      onChange={(e) => setFormData({...formData, photoUrls: e.target.value})}
                      rows="3"
                      placeholder="请输入图片 URL，多个图片用逗号分隔"
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">描述</label>
                    <textarea
                      className="form-control"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows="3"
                      placeholder="介绍一下您的宠物吧～"
                    />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                      添加宠物
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
