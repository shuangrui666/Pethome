import Link from 'next/link'
import {
  FaPaw,
  FaSearch,
  FaHome,
  FaUsers,
  FaHandHoldingHeart,
  FaStethoscope,
  FaStore,
  FaDonate,
  FaShieldAlt,
  FaDog,
  FaMapMarkerAlt,
  FaHeart,
} from 'react-icons/fa'

export default function Home() {
  const features = [
    {
      icon: <FaPaw className="text-4xl text-primary" />,
      title: '流浪宠物领养',
      description: '实名认证，帮助流浪宠物找到温暖的家',
      link: '/adoption',
    },
    {
      icon: <FaSearch className="text-4xl text-secondary" />,
      title: '走失宠物寻回',
      description: '智能匹配，让走失的宠物早日回家',
      link: '/lost-found',
    },
    {
      icon: <FaShieldAlt className="text-4xl text-accent" />,
      title: '防走失防护',
      description: '智能定位，实时追踪宠物位置',
      link: '/prevention',
    },
    {
      icon: <FaHome className="text-4xl text-primary" />,
      title: '狗狗幼儿园',
      description: '实时监控，让爱宠享受优质照顾',
      link: '/kindergarten',
    },
    {
      icon: <FaDog className="text-4xl text-secondary" />,
      title: '上门遛狗',
      description: '专业遛狗师，按时上门照顾',
      link: '/service',
    },
    {
      icon: <FaStore className="text-4xl text-accent" />,
      title: '宠物店铺',
      description: '线上购物，宠物用品一键送达',
      link: '/shop',
    },
    {
      icon: <FaMapMarkerAlt className="text-4xl text-primary" />,
      title: '同城约伴',
      description: '约同城宠友一起遛弯玩耍',
      link: '/match',
    },
    {
      icon: <FaHeart className="text-4xl text-secondary" />,
      title: '宠物资助',
      description: '爱心资助，帮助流浪宠物',
      link: '/donation',
    },
    {
      icon: <FaStethoscope className="text-4xl text-accent" />,
      title: '宠物医药',
      description: '在线诊断，药品推荐，健康提醒',
      link: '/medical',
    },
    {
      icon: <FaHandHoldingHeart className="text-4xl text-primary" />,
      title: '训狗服务',
      description: '分阶段训练，专业训犬师指导',
      link: '/training',
    },
    {
      icon: <FaUsers className="text-4xl text-secondary" />,
      title: '养宠社区',
      description: '分享经验，与同城养宠人交流',
      link: '/community',
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">PetHome 宠物家园</h1>
          <p className="text-xl mb-8">让每一只宠物都能找到温暖的家</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/adoption"
              className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
            >
              领养宠物
            </Link>
            <Link
              href="/auth"
              className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition"
            >
              登录/注册
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">核心功能</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link 
                key={index}
                href={feature.link}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-lg transition text-center group"
              >
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">成功领养</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">500+</div>
              <div className="text-gray-600">走失寻回</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">2000+</div>
              <div className="text-gray-600">社区用户</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-gray-600">合作宠物店</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 PetHome 宠物家园。All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
