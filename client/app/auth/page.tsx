'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, register } from '../../src/api/auth'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    setLoading(true)

    try {
      if (isLogin) {
        // 登录 - 支持用户名/邮箱/手机号登录
        const loginData = {
          usernameOrEmail: formData.username,
          password: formData.password,
        }
        const data = await login(loginData)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/')
      } else {
        // 注册
        const registerData = {
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }
        const data = await register(registerData)
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/')
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '操作失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen d-flex align-center justify-center bg-light py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">
                  {isLogin ? '欢迎回来' : '创建账户'}
                </h2>
                <p className="text-center text-muted mb-4">
                  {isLogin ? '登录您的宠物家园账户' : '加入宠物家园社区'}
                </p>

                {error && (
                  <div className="alert alert-danger d-flex align-center mb-4" role="alert">
                    <span className="me-2">⚠️</span>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {!isLogin && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          用户名 *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                          required
                          placeholder="请输入用户名"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          邮箱
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="选填，请输入邮箱"
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          手机号
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="选填，请输入手机号"
                        />
                      </div>
                    </>
                  )}

                  <div className="mb-3">
                    <label htmlFor="username-login" className="form-label">
                      {isLogin ? '用户名/邮箱/手机号' : '密码'}
                    </label>
                    {isLogin ? (
                      <input
                        type="text"
                        className="form-control"
                        id="username-login"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder="请输入用户名/邮箱/手机号"
                      />
                    ) : (
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="请输入密码"
                        minLength={6}
                      />
                    )}
                  </div>

                  {isLogin && (
                    <div className="mb-3">
                      <label htmlFor="password-login" className="form-label">
                        密码
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password-login"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="请输入密码"
                      />
                    </div>
                  )}

                  {!isLogin && (
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="form-label">
                        确认密码 *
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="请再次输入密码"
                        minLength={6}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? '处理中...' : isLogin ? '登录' : '注册'}
                  </button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin
                      ? '还没有账户？立即注册'
                      : '已有账户？立即登录'}
                  </button>
                </div>

                {isLogin && (
                  <div className="text-center mt-3">
                    <a href="#" className="text-muted">
                      忘记密码？
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="text-center mt-4 text-muted">
              <small>
                登录后即表示您同意我们的{' '}
                <a href="#">服务条款</a> 和{' '}
                <a href="#">隐私政策</a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
