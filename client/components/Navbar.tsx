'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setShowDropdown(false)
    window.location.href = '/'
  }

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-primary fixed-top transition-all ${
        isScrolled ? 'shadow' : ''
      }`}
    >
      <div className="container">
        <Link href="/" className="navbar-brand d-flex align-center">
          <span className="me-2">🐾</span>
          <span className="fw-bold">PetHome 宠物家园</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/adoption" className="nav-link">
                领养
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/lost-found" className="nav-link">
                寻回
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/kindergarten" className="nav-link">
                幼儿园
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/shop" className="nav-link">
                宠物店
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/community" className="nav-link">
                社区
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/medical" className="nav-link">
                医疗
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/training" className="nav-link">
                训狗
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/donation" className="nav-link">
                捐赠
              </Link>
            </li>
          </ul>

          <div className="d-flex align-center">
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-link nav-link dropdown-toggle text-white"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="me-1">👤</span>
                  {user.username}
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    showDropdown ? 'show' : ''
                  }`}
                  aria-labelledby="userDropdown"
                >
                  <li>
                    <Link className="dropdown-item" href="/profile">
                      个人中心
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/my-pets">
                      我的宠物
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/messages">
                      消息
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      退出登录
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link href="/auth" className="btn btn-outline-light me-2">
                  登录
                </Link>
                <Link href="/auth" className="btn btn-light">
                  注册
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
