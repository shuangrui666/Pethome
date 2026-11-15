import Link from 'next/link'
import {
  FaPaw,
  FaHeart,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaStethoscope,
  FaStore,
  FaUsers,
  FaDog,
  FaHandHoldingHeart,
  FaArrowRight,
  FaHome,
  FaGraduationCap,
} from 'react-icons/fa'

const services = [
  {
    icon: FaHeart,
    title: '领养与陪伴',
    description: '为等待家的毛孩子寻找认真、负责的领养人。',
    href: '/adoption',
    tone: 'rose',
    tag: '让爱有归处',
  },
  {
    icon: FaMapMarkerAlt,
    title: '走失寻回',
    description: '发布走失信息、查看线索，让更多人一起帮忙寻找。',
    href: '/lost-found',
    tone: 'amber',
    tag: '紧急寻宠',
  },
  {
    icon: FaShieldAlt,
    title: '安全防护',
    description: '了解宠物防走失与安全守护服务。',
    href: '/prevention',
    tone: 'sage',
    tag: '安全优先',
  },
  {
    icon: FaStethoscope,
    title: '健康医疗',
    description: '查找宠物医疗资源，管理日常健康照护。',
    href: '/medical',
    tone: 'blue',
    tag: '健康照护',
  },
  {
    icon: FaDog,
    title: '上门服务',
    description: '探索遛狗、照护等宠物生活服务。',
    href: '/service',
    tone: 'sage',
    tag: '日常照护',
  },
  {
    icon: FaStore,
    title: '宠物店铺',
    description: '发现宠物用品与本地宠物服务商家。',
    href: '/shop',
    tone: 'amber',
    tag: '生活好物',
  },
  {
    icon: FaHome,
    title: '宠物幼儿园',
    description: '了解托管、照护与宠物社交空间。',
    href: '/kindergarten',
    tone: 'blue',
    tag: '安心托付',
  },
  {
    icon: FaGraduationCap,
    title: '训练指导',
    description: '探索基础训练与专业训犬服务。',
    href: '/training',
    tone: 'rose',
    tag: '共同成长',
  },
  {
    icon: FaUsers,
    title: '同城约伴',
    description: '认识附近宠友，寻找一起散步的伙伴。',
    href: '/match',
    tone: 'sage',
    tag: '附近宠友',
  },
  {
    icon: FaHandHoldingHeart,
    title: '爱心救助',
    description: '关注救助项目，为需要帮助的动物提供支持。',
    href: '/donation',
    tone: 'rose',
    tag: '温柔善意',
  },
]

const toneStyles: Record<string, { icon: string; tag: string; surface: string }> = {
  rose: {
    icon: 'bg-rose-100 text-rose-700',
    tag: 'bg-rose-50 text-rose-700',
    surface: 'hover:border-rose-200',
  },
  amber: {
    icon: 'bg-amber-100 text-amber-700',
    tag: 'bg-amber-50 text-amber-800',
    surface: 'hover:border-amber-200',
  },
  sage: {
    icon: 'bg-emerald-100 text-emerald-800',
    tag: 'bg-emerald-50 text-emerald-800',
    surface: 'hover:border-emerald-200',
  },
  blue: {
    icon: 'bg-sky-100 text-sky-800',
    tag: 'bg-sky-50 text-sky-800',
    surface: 'hover:border-sky-200',
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F8F4] text-[#1E3028]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_24%,rgba(197,221,196,0.7),transparent_30%),linear-gradient(120deg,#F7F8F4_0%,#EEF4EA_55%,#E4EFE4_100%)]" />
        <div className="absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full border border-emerald-900/10" />
        <div className="absolute -right-10 top-24 -z-10 h-52 w-52 rounded-full border border-emerald-900/10" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-24 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/75 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm">
              <FaPaw className="text-emerald-700" />
              <span>PetHome · 宠物生活服务平台</span>
            </div>

            <h1 className="text-4xl font-bold leading-[1.18] tracking-tight text-[#1B3027] sm:text-5xl lg:text-6xl">
              因为在乎，
              <br />
              所以把每一天
              <br />
              <span className="text-[#64866A]">照顾得更好。</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#62736A] sm:text-lg">
              从领养、寻回到健康照护与日常服务，把养宠路上需要的支持放在一起。
              让每一份陪伴，都多一点安心与温柔。
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/adoption"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#315B43] px-7 py-4 font-semibold text-white shadow-lg shadow-emerald-950/15 transition hover:-translate-y-0.5 hover:bg-[#254A35]"
              >
                寻找领养伙伴
                <FaArrowRight className="text-sm" />
              </Link>
              <Link
                href="/lost-found"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-[#C8D5C8] bg-white/80 px-7 py-4 font-semibold text-[#315B43] transition hover:-translate-y-0.5 hover:border-[#8BA88D]"
              >
                帮助寻找走失宠物
                <FaMapMarkerAlt className="text-sm" />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#718077]">
              <span className="inline-flex items-center gap-2"><FaHeart className="text-rose-500" /> 关爱每一个生命</span>
              <span className="inline-flex items-center gap-2"><FaShieldAlt className="text-emerald-700" /> 重视安全与责任</span>
              <span className="inline-flex items-center gap-2"><FaUsers className="text-emerald-700" /> 连接宠物与宠友</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -left-5 top-12 h-24 w-24 rounded-full bg-[#E8B978]/35 blur-2xl" />
            <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full bg-[#8DBA91]/35 blur-2xl" />
            <div className="relative rounded-[2rem] border border-white/80 bg-white/75 p-4 shadow-[0_30px_90px_rgba(42,76,53,0.14)] backdrop-blur">
              <div className="overflow-hidden rounded-[1.5rem] bg-[#294C39] p-7 text-white sm:p-9">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold tracking-[0.18em] text-emerald-100/80">PET HOME</span>
                  <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-emerald-50">陪伴 · 守护 · 分享</span>
                </div>
                <div className="mt-12 flex items-center justify-center">
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-white/15 bg-white/5">
                    <div className="absolute inset-4 rounded-full border border-dashed border-white/20" />
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#E6C99D] text-[#315B43] shadow-xl">
                      <FaPaw className="text-6xl" />
                    </div>
                    <span className="absolute -right-2 top-8 rounded-full bg-[#F4E6CD] px-3 py-2 text-xs font-semibold text-[#72522E] shadow-lg">被爱包围</span>
                    <span className="absolute -bottom-1 left-0 rounded-full bg-[#D7E7D4] px-3 py-2 text-xs font-semibold text-[#315B43] shadow-lg">安心成长</span>
                  </div>
                </div>
                <div className="mt-10">
                  <p className="text-2xl font-semibold">每一份陪伴，都值得认真对待。</p>
                  <p className="mt-2 text-sm leading-6 text-emerald-100/75">把需要的服务、可靠的信息与温暖的社区，连接在同一个地方。</p>
                </div>
                <div className="mt-7 grid grid-cols-3 gap-2 border-t border-white/15 pt-5 text-center">
                  <div><FaHeart className="mx-auto text-lg text-[#E8B978]" /><span className="mt-2 block text-xs text-emerald-50/80">领养关怀</span></div>
                  <div><FaShieldAlt className="mx-auto text-lg text-[#E8B978]" /><span className="mt-2 block text-xs text-emerald-50/80">安全守护</span></div>
                  <div><FaUsers className="mx-auto text-lg text-[#E8B978]" /><span className="mt-2 block text-xs text-emerald-50/80">社区互助</span></div>
                </div>
              </div>
            </div>
            <div className="absolute -left-8 top-24 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><FaHeart /></span>
                <div><p className="text-sm font-semibold text-[#294C39]">用心照顾</p><p className="text-xs text-[#849188]">从日常小事开始</p></div>
              </div>
            </div>
            <div className="absolute -right-5 bottom-24 hidden rounded-2xl border border-white bg-white px-4 py-3 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><FaPaw /></span>
                <div><p className="text-sm font-semibold text-[#294C39]">一起守护</p><p className="text-xs text-[#849188]">让善意彼此连接</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#78947A]">Explore PetHome</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#20372B] sm:text-4xl">养宠路上的每一件事</h2>
            <p className="mt-3 max-w-2xl leading-7 text-[#718077]">按你的需要，找到合适的服务入口。每项服务的实际可用情况以页面展示和后端接入状态为准。</p>
          </div>
          <Link href="/community" className="inline-flex items-center gap-2 font-semibold text-[#47724F] transition hover:gap-3">
            逛逛养宠社区 <FaArrowRight className="text-xs" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon
            const tone = toneStyles[service.tone]
            return (
              <Link
                key={service.href}
                href={service.href}
                className={`group rounded-3xl border border-[#E5EAE2] bg-white p-6 shadow-[0_8px_30px_rgba(37,65,45,0.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,65,45,0.09)] ${tone.surface}`}
              >
                <div className="flex items-start justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${tone.icon}`}><Icon /></span>
                  <span className={`rounded-full px-3 py-1 text-xs font-medium ${tone.tag}`}>{service.tag}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-[#294336]">{service.title}</h3>
                <p className="mt-2 min-h-[3.5rem] text-sm leading-7 text-[#78867D]">{service.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#55795B] transition group-hover:gap-3">
                  了解更多 <FaArrowRight className="text-xs" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#E9E1D3] p-8 sm:p-10">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/30" />
            <div className="relative">
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-bold tracking-wide text-[#87633B]">需要紧急帮助？</span>
              <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight text-[#4A3928]">走失的家人，值得被更多人看见。</h2>
              <p className="mt-4 max-w-md leading-7 text-[#786A59]">发布走失信息、查看寻宠线索，也可以帮助转发身边的寻回消息。</p>
              <Link href="/lost-found/create" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#765936] px-6 py-3 font-semibold text-white transition hover:bg-[#60472C]">
                发布走失信息 <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-[#DDE9DC] p-8 sm:p-10">
            <div className="absolute -bottom-16 -right-12 h-56 w-56 rounded-full bg-white/35" />
            <div className="relative">
              <span className="inline-flex rounded-full bg-white/70 px-3 py-1 text-xs font-bold tracking-wide text-[#47724F]">让善意继续传递</span>
              <h2 className="mt-5 max-w-md text-3xl font-bold leading-tight text-[#294C39]">给等待家的它，一个新的开始。</h2>
              <p className="mt-4 max-w-md leading-7 text-[#637B68]">看看正在寻找家庭的宠物，认真了解领养条件，为陪伴做好准备。</p>
              <Link href="/adoption" className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#315B43] px-6 py-3 font-semibold text-white transition hover:bg-[#254A35]">
                浏览待领养宠物 <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="overflow-hidden rounded-[2rem] bg-[#213D2D] px-8 py-10 text-white sm:px-12 sm:py-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#BBD2B8]">Looking Ahead</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">让科技，也成为温柔的守护。</h2>
              <p className="mt-4 max-w-2xl leading-7 text-emerald-50/70">
                PetHome 正在规划智能项圈数据接入与 AI 健康趋势分析方向。相关能力将在硬件、数据链路和安全验证完成后逐步开放。
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#DCE9D9] text-xl text-[#315B43]"><FaShieldAlt /></span>
              <div><p className="font-semibold">研发规划中</p><p className="mt-1 text-xs text-emerald-50/60">不将规划功能当作已上线服务</p></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
