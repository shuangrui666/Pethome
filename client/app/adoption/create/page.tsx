'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createAdoptionApplication } from '../../../src/api/adoption'
import { getPets } from '../../../src/api/pet'

interface Pet {
  _id: string
  name: string
  species: string
  breed: string
  age: number
  images: string[]
  description: string
  isAdoptable: boolean
  ownerId: string
}

export default function CreateAdoptionPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [selectedPet, setSelectedPet] = useState<string>('')
  const [pets, setPets] = useState<Pet[]>([])
  const [formData, setFormData] = useState({
    reason: '',
    applicantPhone: '',
    applicantEmail: '',
    applicantAddress: '',
    livingSituation: '' as 'own-house' | 'rent-house' | 'dormitory' | 'with-parents' | '',
    otherPets: false,
    familySupport: true,
    experience: '',
  })

  useEffect(() => {
    loadPets()
  }, [])

  const loadPets = async () => {
    try {
      const response = await getPets()
      setPets(response.data || [])
    } catch (error) {
      console.error('加载宠物列表失败:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedPet) {
      alert('请选择要领养的宠物')
      return
    }

    if (formData.reason.length < 10) {
      alert('领养理由至少需要 10 个字符')
      return
    }

    setLoading(true)
    try {
      await createAdoptionApplication({
        petId: selectedPet,
        ...formData,
      })
      alert('领养申请提交成功！')
      router.push('/adoption')
    } catch (error: any) {
      alert(error.response?.data?.message || '提交领养申请失败')
    } finally {
      setLoading(false)
    }
  }

  const selectedPetInfo = pets.find(p => p._id === selectedPet)

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <Link href="/adoption" className="btn btn-outline-primary mb-3">
            ← 返回领养列表
          </Link>
          <h1 className="display-5 mb-3">🐾 申请领养宠物</h1>
          <p className="lead text-muted">
            请填写您的领养申请信息，我们将尽快审核
          </p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">1. 选择要领养的宠物</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">宠物列表</label>
                  <select
                    className="form-select"
                    value={selectedPet}
                    onChange={(e) => setSelectedPet(e.target.value)}
                    required
                  >
                    <option value="">请选择宠物</option>
                    {pets
                      .filter(p => p.isAdoptable)
                      .map((pet) => (
                        <option key={pet._id} value={pet._id}>
                          {pet.name} - {pet.breed} ({pet.age}岁)
                        </option>
                      ))}
                  </select>
                </div>

                {selectedPetInfo && (
                  <div className="border rounded p-3 bg-light">
                    <div className="row">
                      <div className="col-md-4">
                        <img
                          src={selectedPetInfo.images[0] || '/placeholder-pet.jpg'}
                          alt={selectedPetInfo.name}
                          className="img-fluid rounded"
                          style={{ maxHeight: '200px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-8">
                        <h5>{selectedPetInfo.name}</h5>
                        <p className="text-muted mb-1">
                          {selectedPetInfo.breed} • {selectedPetInfo.species === 'dog' ? '狗' : '猫'} • {selectedPetInfo.age}岁
                        </p>
                        <p className="mb-0">{selectedPetInfo.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">2. 领养信息</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">领养理由 *</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    placeholder="请说明您为什么要领养这只宠物，您的养宠计划等..."
                    required
                    minLength={10}
                  />
                  <small className="text-muted">至少 10 个字符</small>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">居住环境 *</label>
                  <select
                    className="form-select"
                    value={formData.livingSituation}
                    onChange={(e) => setFormData({ ...formData, livingSituation: e.target.value as 'own-house' | 'rent-house' | 'dormitory' | 'with-parents' })}
                    required
                  >
                    <option value="">请选择居住环境</option>
                    <option value="own-house">自有房屋</option>
                    <option value="rent-house">租房居住</option>
                    <option value="dormitory">宿舍</option>
                    <option value="with-parents">与父母同住</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">是否有其他宠物</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="otherPetsYes"
                      name="otherPets"
                      checked={formData.otherPets === true}
                      onChange={() => setFormData({ ...formData, otherPets: true })}
                    />
                    <label className="form-check-label" htmlFor="otherPetsYes">
                      是
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="otherPetsNo"
                      name="otherPets"
                      checked={formData.otherPets === false}
                      onChange={() => setFormData({ ...formData, otherPets: false })}
                    />
                    <label className="form-check-label" htmlFor="otherPetsNo">
                      否
                    </label>
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="familySupport"
                    checked={formData.familySupport}
                    onChange={(e) => setFormData({ ...formData, familySupport: e.target.checked })}
                    required
                  />
                  <label className="form-check-label" htmlFor="familySupport">
                    家人支持养宠物 *
                  </label>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">3. 联系方式</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">手机号码 *</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={formData.applicantPhone}
                    onChange={(e) => setFormData({ ...formData, applicantPhone: e.target.value })}
                    placeholder="请输入您的手机号码"
                    required
                    pattern="[0-9]{11}"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">电子邮箱 *</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.applicantEmail}
                    onChange={(e) => setFormData({ ...formData, applicantEmail: e.target.value })}
                    placeholder="请输入您的电子邮箱"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">居住地址 *</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.applicantAddress}
                    onChange={(e) => setFormData({ ...formData, applicantAddress: e.target.value })}
                    placeholder="请输入您的详细居住地址"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">4. 养宠经验</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label fw-bold">养宠经验 *</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="请描述您之前的养宠经验，包括养过什么宠物、养了多久等..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={loading || !selectedPet}
              >
                {loading ? '提交中...' : '提交领养申请'}
              </button>
            </div>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">💡 领养须知</h5>
            </div>
            <div className="card-body">
              <ul className="mb-0">
                <li className="mb-2">请确保您有稳定的住所和收入来源</li>
                <li className="mb-2">家人必须支持您养宠物</li>
                <li className="mb-2">承诺科学养宠，不虐待、不遗弃</li>
                <li className="mb-2">接受定期的领养回访</li>
                <li className="mb-2">负责宠物的医疗费用和日常开销</li>
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-header bg-warning">
              <h5 className="mb-0">⏱️ 审核流程</h5>
            </div>
            <div className="card-body">
              <ol className="mb-0">
                <li className="mb-2">提交申请（当前步骤）</li>
                <li className="mb-2">资料审核（1-3 个工作日）</li>
                <li className="mb-2">电话沟通或面谈</li>
                <li className="mb-2">审核通过，安排领养</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
