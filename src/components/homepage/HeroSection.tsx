import Image from 'next/image'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '10 let', label: 'rodinná firma' },
  { value: '142+', label: 'realizací v kraji' },
  { value: '4.9★', label: 'Google reviews' },
  { value: '24h', label: 'odezva na poptávku' },
  { value: '5 let', label: 'záruka na konstrukci' },
]

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[88px]">
      <Image
        src="/images/hero.png"
        alt="Dřevěná pergola v Beskydech při západu slunce"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

      <div className="container relative z-10 flex flex-1 items-center justify-start">
        <div className="flex max-w-2xl flex-col gap-6">
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
            Dřevo, které přežije generace.
          </h1>
          <p className="max-w-lg text-lg leading-[1.6] text-white/80 sm:text-xl">
            Pergoly, přístřešky a dřevostavby na míru z Beskyd.
            Každý spoj projde našima rukama — proto dáváme 5 let záruku.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button size="lg" className="rounded-full">
              Prohlédnout realizace
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/30 text-white hover:bg-white/10"
            >
              Zavolat nám
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg text-amber-400">★★★★★</span>
            <span className="text-sm text-white/50">
              4.9 · 87 hodnocení na Google
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/10 backdrop-blur-sm">
        <div className="container flex flex-wrap items-center justify-around gap-x-8 gap-y-5 py-10 lg:py-12">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-3xl font-bold text-white sm:text-4xl">{stat.value}</span>
              <span className="text-sm text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
