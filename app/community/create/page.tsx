'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createPost } from '../../../src/api/post'
import api from '../../../src/api/axios'

export default function CreatePostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'feeding',
    tags: '',
  })
  const [images, setImages] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const categories = [
    { value: 'feeding', label: '🍖 喂食喂养', color: 'btn-primary' },
    { value: 'training', label: '🎓 训练教育', color: 'btn-warning' },
    { value: 'health', label: '🏥 健康医疗', color: 'btn-danger' },
    { value: 'behavior', label: '🐾 行为习惯', color: 'btn-info' },
    { value: 'product', label: '🛒 产品推荐', color: 'btn-success' },
    { value: 'story', label: '❤️ 养宠故事', color: 'btn-secondary' },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (images.length + selectedFiles.length > 9) {
        setError('最多只能上传 9 张图片')
        return
      }
      
      const newImages = [...images, ...selectedFiles]
      setImages(newImages)

      // 生成预览
      selectedFiles.forEach(file => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setError('请先登录')
        router.push('/auth')
        return
      }

      const postData = new FormData()
      postData.append('title', formData.title)
      postData.append('content', formData.content)
      postData.append('category', formData.category)
      
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
      postData.append('tags', JSON.stringify(tagsArray))

      images.forEach(image => {
        postData.append('images', image)
      })

      await createPost(postData as any)
      router.push('/community')
    } catch (err: any) {
      setError(err.response?.data?.message || '发布失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="display-6 mb-3">✍️ 发布帖子</h1>
          <p className="text-muted">分享您的养宠经验，帮助更多人</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError('')}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* 标题 */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    标题 <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="请输入帖子标题（5-100 个字符）"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    minLength={5}
                    maxLength={100}
                  />
                </div>

                {/* 分类 */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    分类 <span className="text-danger">*</span>
                  </label>
                  <div className="btn-group w-100" role="group">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        type="button"
                        className={`btn ${formData.category === cat.value ? cat.color : 'btn-outline-primary'}`}
                        onClick={() => setFormData({ ...formData, category: cat.value })}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 内容 */}
                <div className="mb-4">
                  <label className="form-label fw-bold">
                    内容 <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    rows={10}
                    placeholder="请详细描述您的经验、问题或故事..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    required
                    minLength={20}
                  />
                  <small className="text-muted">至少 20 个字符</small>
                </div>

                {/* 标签 */}
                <div className="mb-4">
                  <label className="form-label fw-bold">标签</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="用逗号分隔，例如：狗狗，训练， obedience"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                  <small className="text-muted">多个标签用逗号分隔</small>
                </div>

                {/* 图片上传 */}
                <div className="mb-4">
                  <label className="form-label fw-bold">图片（可选）</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={images.length >= 9}
                  />
                  <small className="text-muted">最多 9 张图片</small>

                  {previewUrls.length > 0 && (
                    <div className="row mt-3">
                      {previewUrls.map((url, index) => (
                        <div key={index} className="col-md-4 mb-2">
                          <div className="position-relative">
                            <img
                              src={url}
                              alt={`预览 ${index + 1}`}
                              className="img-fluid rounded border"
                              style={{ maxHeight: '150px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-sm btn-danger position-absolute top-0 end-0 m-1"
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 提交按钮 */}
                <div className="d-flex justify-content-between gap-2">
                  <Link href="/community" className="btn btn-outline-secondary">
                    取消
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-success px-4"
                    disabled={loading}
                  >
                    {loading ? '发布中...' : '发布帖子'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
