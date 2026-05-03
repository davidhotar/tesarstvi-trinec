import type { Metadata } from 'next'
import {
  ProfileHeroSection,
  TimelineSection,
  ValuesSection,
  TeamSection,
  RegionSection,
  CtaBanner,
} from '@/components/about'
import { TrustStrip } from '@/components/homepage/TrustStrip'

export const metadata: Metadata = {
  title: 'O nás',
  description:
    'Rodinná tesařská firma z Třince s více než 25 lety zkušeností. Pergoly, přístřešky a dřevostavby na míru.',
}

const aboutStats = [
  { value: '25+', label: 'let s dřevem v ruce' },
  { value: '180', label: 'hotových realizací' },
  { value: '4.9★', label: 'průměr Google recenzí' },
  { value: '0', label: 'reklamací za 3 roky' },
  { value: '40 km', label: 'okruh Třince' },
]

export default function ONasPage() {
  return (
    <>
      <ProfileHeroSection />
      <TrustStrip items={aboutStats} />
      <TimelineSection />
      <ValuesSection />
      <TeamSection />
      <RegionSection />
      <CtaBanner />
    </>
  )
}
