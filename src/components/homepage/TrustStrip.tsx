import { Separator } from '@/components/ui/separator'

const defaultStats = [
  { value: '10 let', label: 'rodinná firma' },
  { value: '142+', label: 'realizací v kraji' },
  { value: '4.9★', label: 'Google reviews' },
  { value: '24h', label: 'odezva na poptávku' },
  { value: '5 let', label: 'záruka na konstrukci' },
]

export function TrustStrip({
  items = defaultStats,
}: {
  items?: { value: string; label: string }[]
}) {
  return (
    <section>
      <Separator />
      <div className="container flex flex-wrap items-center justify-around gap-6 py-8">
        {items.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1 text-center">
            <span className="text-3xl font-bold">{stat.value}</span>
            <span className="text-sm text-muted-foreground">{stat.label}</span>
          </div>
        ))}
      </div>
      <Separator />
    </section>
  )
}
