import type { RequiredDataFromCollectionSlug } from 'payload'

export const kontakt: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'kontakt',
    _status: 'published',
    layout: [
      {
        blockName: 'Contact Hero',
        blockType: 'contactHeroSection',
        tagline: 'Kontakt · Po-Pá 7:00-17:00',
        heading: 'Zavolejte. Zvedneme to.',
        description:
          'Žádný call-centrum, žádný formulář do prázdna. Telefon zvedá Petr nebo Jana. Když máme vrtačku v ruce, ozveme se do hodiny.',
        highlights: [
          { icon: 'clock', label: 'Odpovědi do 1 hodiny v pracovní době' },
          { icon: 'check', label: 'Zaměření zdarma' },
        ],
        personName: 'Petr Czempka',
        personTitle: 'majitel',
        personPhone: 'tel:+420737136848',
        contactCards: [
          {
            icon: 'phone',
            badge: 'nejrychlejší',
            label: 'Telefon',
            value: '+420 737 136 848',
            description: 'Petr · Po-Pá 7:00-17:00 · So dle domluvy',
            ctaLabel: 'Zavolat hned',
            ctaLink: 'tel:+420737136848',
            ctaVariant: 'default',
          },
          {
            icon: 'mail',
            label: 'E-mail',
            value: 'info@tesarstvi-trinec.cz',
            description: 'Pošlete fotku, plánek, situaci? Jsme rádi.',
            ctaLabel: 'Otevřít e-mail',
            ctaLink: 'mailto:info@tesarstvi-trinec.cz',
            ctaVariant: 'outline',
          },
          {
            icon: 'whatsapp',
            label: 'WhatsApp',
            value: 'Pošlete fotku z místa',
            description: 'Nejrychlejší cesta k orientační ceně. Reagujeme i večer.',
            ctaLabel: 'Otevřít chat',
            ctaLink: 'https://wa.me/420737136848',
            ctaVariant: 'secondary',
          },
        ],
      },
    ],
    meta: {
      title: 'Kontakt — Tesařství Třinec',
      description:
        'Zavolejte nebo napište. Petr Czempka, tesař z Třince. Telefon, e-mail, WhatsApp. Odpovídáme do hodiny.',
    },
    title: 'Kontakt',
  }
}
