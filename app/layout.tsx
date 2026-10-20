import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetHome 宠物家园',
  description: '全栈宠物服务平台 - 领养、寻回、社区、医疗一站式服务',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navbar />
        <main style={{ paddingTop: '70px' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
