import type { Metadata } from 'next'
import {
  ProfileHeroSection,
  TimelineSection,
  RegionSection,
  CtaBanner,
} from '@/components/about'
import { NumberedCardGrid } from '@/components/NumberedCardGrid'

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

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Rodinná tesařská firma z Třince s více než 25 lety zkušeností. Pergoly, přístřešky a dřevostavby na míru.',
}

export default function ONasPage() {
  return (
    <>
      <ProfileHeroSection />
      <TimelineSection />
      <NumberedCardGrid
        title={
          <>
            Čtyři věci, na kterých
            <br />
            nehnu ani o píď.
          </>
        }
        subtitle="Naše hodnoty"
        sideDescription="Nejsou to slogany na zeď. Je to to, podle čeho denně rozhodujeme."
        items={values}
        className="bg-muted/50"
      />

      <RegionSection />
      <CtaBanner />
    </>
  )
}
