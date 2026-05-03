import type { RequiredDataFromCollectionSlug } from 'payload'

export const about: () => RequiredDataFromCollectionSlug<'pages'> = () => {
  return {
    slug: 'o-nas',
    _status: 'published',
    layout: [
      {
        blockName: 'Profile Hero',
        blockType: 'profileHeroSection',
        tagline: 'O nás · od roku 2014',
        heading: 'Dřevo, tradice, a chlap, co se za to',
        headingHighlight: 'podepíše.',
        description:
          'Jsem Petr a tesařině se věnuju přes 25 let. Učil jsem se u starých mistrů v Beskydech, dnes vedu malou rodinnou dílnu v Třinci. Stavím tak, jak bych chtěl, aby někdo postavil mně doma.',
        personName: 'Petr Czempka',
        personTitle: 'Tesař & majitel · Třinec',
        quote: '„Dělám dřevo, protože mě to baví. Kdyby mě to přestalo bavit, dělám něco jiného." — P.',
        ctaLabel: 'Zavolat Petrovi',
        ctaLink: 'tel:+420737136848',
        badges: [
          { label: '25+ let v řemesle', position: 'top-left' },
          { label: 'Rodinná dílna', position: 'bottom-right' },
        ],
        stats: [
          { value: '25+', label: 'let s dřevem v ruce' },
          { value: '180', label: 'hotových realizací' },
          { value: '4.9★', label: 'průměr Google recenzí' },
          { value: '0', label: 'reklamací za 3 roky' },
          { value: '40 km', label: 'okruh Třince' },
        ],
      },
      {
        blockName: 'Timeline',
        blockType: 'timelineSection',
        title: 'Cesta od učedníka k vlastní dílně.',
        milestones: [
          {
            year: '1998',
            title: 'První hoblík',
            text: 'Jako čtrnáctiletý kluk v dílně u dědy. Roubenka, která stojí dodnes.',
          },
          {
            year: '2003',
            title: 'Vyučení tesařem',
            text: 'SOU stavební Frýdek-Místek. Práce na krovech v Beskydech.',
          },
          {
            year: '2014',
            title: 'Vlastní firma',
            text: 'Z garáže přístavby u rodičů. První pergola — pro souseda. Stojí.',
          },
          {
            year: '2019',
            title: 'Dílna v Třinci',
            text: 'Vlastní hala, CNC frézka, sklad modřínu. Tým se rozrostl o syna.',
          },
          {
            year: '2024',
            title: '180. realizace',
            text: 'Pergola pro rodinu z Bystřice. Pivo a děkujeme do týdne.',
          },
          {
            year: 'dnes',
            title: 'Tým 4 lidí',
            text: 'Stále malá rodinná dílna. Stále všechno dělám se synem.',
          },
        ],
      },
      {
        blockName: 'Values',
        blockType: 'numberedCardGrid',
        title: 'Čtyři věci, na kterých nehnu ani o píď.',
        subtitle: 'Naše hodnoty',
        sideDescription: 'Nejsou to slogany na zeď. Je to to, podle čeho denně rozhodujeme.',
        items: [
          {
            title: 'Poctivý materiál',
            description:
              'Modřín, dub, smrk z Beskyd. Žádný brak, žádný eko-import. Vidíte fakturu z pily, kdykoli chcete.',
          },
          {
            title: 'Tesařské spoje',
            description:
              'Tradiční vazby — čep, kampovka, rybinový spoj. Šroub až tam, kde má smysl. Konstrukce drží 80 let.',
          },
          {
            title: 'Dimenze, ne zubní párátka',
            description:
              'Sloupy 14×14 cm minimum, krokve 8×16 cm. Pergola není tyčový plot — postavíme tak, aby unesla sníh.',
          },
          {
            title: 'Základ jako u baráku',
            description:
              'Šroubovací piloty nebo betonové patky pod hladinu mrazu. Bez ulehčování. Bez „však ono to udrží".',
          },
        ],
      },
      {
        blockName: 'Region',
        blockType: 'regionSection',
        subtitle: 'Kde stavíme',
        title: 'Třinec a 40 km kolem.',
        description:
          'Doma je doma. Stavíme tam, kde známe pily, řemeslníky a klienty. Když je projekt zajímavý, dojedeme i dál — ale bez slibování zázraků.',
        locations: [
          { name: 'Třinec' },
          { name: 'Bystřice n. Olší' },
          { name: 'Návsí' },
          { name: 'Mosty u J.' },
          { name: 'Jablunkov' },
          { name: 'Český Těšín' },
          { name: 'Karviná' },
          { name: 'Frýdek-Místek' },
          { name: 'Havířov' },
          { name: 'Ostrava (po dohodě)' },
        ],
      },
      {
        blockName: 'CTA Banner',
        blockType: 'ctaBanner',
        title: 'Stavíme v Třinci a okolí. Zavolejte sousedovi.',
        description: 'Poradíme, řekneme cenu, domluvíme se. Bez závazku.',
        ctaLabel: 'Zavolat Petrovi',
        ctaLink: 'tel:+420737136848',
        ratingText: '4.9 · 87 hodnocení na Google',
      },
    ],
    meta: {
      title: 'O nás — Tesařství Třinec',
      description:
        'Rodinná tesařská firma z Třince s více než 25 lety zkušeností. Pergoly, přístřešky a dřevostavby na míru.',
    },
    title: 'O nás',
  }
}
