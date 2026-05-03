import { Card, CardContent } from '@/components/ui/card'

const values = [
  {
    number: '01',
    title: 'Poctivý materiál',
    description:
      'Modřín, dub, smrk z Beskyd. Žádný brak, žádný eko-import. Vidíte fakturu z pily, kdykoli chcete.',
  },
  {
    number: '02',
    title: 'Tesařské spoje',
    description:
      'Tradiční vazby — čep, kampovka, rybinový spoj. Šroub až tam, kde má smysl. Konstrukce drží 80 let.',
  },
  {
    number: '03',
    title: 'Dimenze, ne zubní párátka',
    description:
      'Sloupy 14×14 cm minimum, krokve 8×16 cm. Pergola není tyčový plot — postavíme tak, aby unesla sníh.',
  },
  {
    number: '04',
    title: 'Základ jako u baráku',
    description:
      'Šroubovací piloty nebo betonové patky pod hladinu mrazu. Bez ulehčování. Bez „však ono to udrží".',
  },
]

export function ValuesSection() {
  return (
    <section className="bg-muted/50 py-24">
      <div className="container">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
              Naše hodnoty
            </span>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Čtyři věci, na kterých
              <br />
              nehnu ani o píď.
            </h2>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Nejsou to slogany na zeď. Je to to, podle čeho denně rozhodujeme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <Card key={v.number}>
              <CardContent className="flex flex-col gap-3">
                <span className="font-heading text-5xl font-bold text-primary/20">
                  {v.number}
                </span>
                <h3 className="font-heading text-lg font-bold">{v.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
