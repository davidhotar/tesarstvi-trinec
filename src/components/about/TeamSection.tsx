import { Badge } from '@/components/ui/badge'
import { ImagePlaceholder } from '@/components/homepage/ImagePlaceholder'

const team = [
  {
    name: 'Petr Czempka',
    role: 'Tesař & majitel',
    years: '25 let v řemesle',
    quote: 'Když to nejde po dobrým, jde to po dřevě.',
    tag: 'Šéf',
  },
  {
    name: 'Tomáš Czempka',
    role: 'Tesař · syn',
    years: '6 let v dílně',
    quote: 'CNC frézka, ale taky sekera.',
    tag: 'Dílna',
  },
  {
    name: 'Marek H.',
    role: 'Pomocný tesař',
    years: '4 roky v týmu',
    quote: 'Bez něj by nic nestálo rovně.',
    tag: 'Montáž',
  },
  {
    name: 'Jana T.',
    role: 'Kancelář & nabídky',
    years: '3 roky v týmu',
    quote: 'Ona je ta, co vám napíše zpátky.',
    tag: 'Komunikace',
  },
]

export function TeamSection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="mb-16 flex flex-col items-center gap-2 text-center">
          <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
            Lidi, co k vám přijedou
          </span>
          <h2 className="font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Čtyři lidi. Jedna parta.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => (
            <div key={p.name} className="flex flex-col gap-3">
              <div className="relative">
                <ImagePlaceholder
                  label={`${p.name} — portrét v dílně`}
                  className="h-[260px] rounded-xl"
                />
                <Badge className="absolute top-3 left-3 text-xs">{p.tag}</Badge>
              </div>
              <p className="text-lg font-bold">{p.name}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{p.role}</span>
                <span className="text-sm font-medium text-primary">
                  {p.years}
                </span>
              </div>
              <p className="border-l-2 border-primary pl-3 text-sm italic text-muted-foreground">
                „{p.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
