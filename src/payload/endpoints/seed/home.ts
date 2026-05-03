import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media, Form } from '@/payload-types'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
  contactForm: Form
}

export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
  contactForm,
}) => {
  return {
    slug: 'home',
    _status: 'published',
    layout: [
      {
        blockName: 'Hero',
        blockType: 'heroSection',
        backgroundImage: heroImage.id,
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Prohlédnout realizace',
              url: '/portfolio',
            },
          },
          {
            link: {
              type: 'custom',
              appearance: 'outline',
              label: 'Volat',
              url: 'tel:+420737136848',
            },
          },
        ],
        richText: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Dřevo, které přežije generace.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Rodinné tesařství v srdci Beskyd. 10 let stavíme pergoly, přístřešky a dřevostavby — každý kus si nejdřív projdeme rukama.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        stats: [
          { value: '10 let', label: 'rodinná firma' },
          { value: '142+', label: 'realizací v kraji' },
          { value: '4.9★', label: 'Google reviews' },
          { value: '24h', label: 'odezva na poptávku' },
          { value: '5 let', label: 'záruka na konstrukci' },
        ],
      },
      {
        blockName: 'Services',
        blockType: 'servicesSection',
        title: 'Tři věci, které děláme nejlépe',
        services: [
          {
            icon: 'fence',
            title: 'Pergoly & terasy',
            description: 'Klasické i posuvné. Modřín, dub, smrk — podle vašeho vkusu i rozpočtu.',
            items: [
              { text: 'Návrh a vizualizace zdarma' },
              { text: 'Modřín / dub / smrk' },
              { text: 'Včetně základů a montáže' },
            ],
          },
          {
            icon: 'car-garage',
            title: 'Přístřešky & garáže',
            description: 'Auta, dřevo, technika. Funkční stavby s charakterem, ne plechové škatule.',
            items: [
              { text: 'Pro 1–4 auta' },
              { text: 'Plechová nebo šindelová střecha' },
              { text: 'Záruka 5 let' },
            ],
          },
          {
            icon: 'home-plus',
            title: 'Dřevostavby',
            description: 'Zahradní domky, sklady, drobné stavby. Od skici po klíč v ruce.',
            items: [
              { text: 'Klasický roubený styl i moderna' },
              { text: 'Bez ohlášky do 25 m²' },
              { text: 'Hotovo za 4–8 týdnů' },
            ],
          },
        ],
      },
      {
        blockName: 'Process',
        blockType: 'numberedCardGrid',
        title: 'Bez stresu, bez překvapení.',
        items: [
          {
            icon: 'phone',
            title: 'Zavoláte / napíšete',
            description: 'Krátký telefonát, zjistíme co potřebujete.',
          },
          {
            icon: 'map-pin',
            title: 'Přijedeme se podívat',
            description: 'Zaměření a poradenství u vás zdarma.',
          },
          {
            icon: 'file-description',
            title: 'Návrh + cenová nabídka',
            description: 'Do 5 dnů. Bez závazku, bez skrytých nákladů.',
          },
          {
            icon: 'hammer',
            title: 'Postavíme',
            description: 'Termín dodržíme. Vždy.',
          },
        ],
      },
      {
        blockName: 'Testimonials',
        blockType: 'testimonialsSection',
        title: '87 lidí v okolí už nám věří.',
        sourceLabel: 'napřímo z Google reviews',
        testimonials: [
          {
            name: 'Petr Krzystek',
            location: 'Bystřice n. Olší',
            text: 'Pergola jako z časopisu. Klucí byli skvělí — slušní, čistí, dochvilní. Termín do dne.',
            rating: 5,
          },
          {
            name: 'Anna Sikorová',
            location: 'Třinec, Konská',
            text: 'Měli jsme strach, že to bude drahé. Cena fér, řemeslo perfektní. Doporučuji všem v okolí.',
            rating: 5,
          },
          {
            name: 'Jakub Heczko',
            location: 'Návsí',
            text: 'Postavili nám zahradní domek. 6 týdnů, žádné zdržení, žádné navyšování. Tohle dnes neumí každý.',
            rating: 5,
          },
        ],
      },
      {
        blockName: 'Contact Form',
        blockType: 'formBlock',
        form: contactForm.id,
        enableIntro: true,
        introContent: {
          root: {
            type: 'root',
            children: [
              {
                type: 'heading',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Řekněte, co plánujete.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h2',
                version: 1,
              },
              {
                type: 'paragraph',
                children: [
                  {
                    type: 'text',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Stavíme v okruhu 40 km od Třince — Bystřice, Návsí, Mosty, Jablunkov a okolí.',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                textFormat: 0,
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
      {
        blockName: 'FAQ',
        blockType: 'faqSection',
        title: 'Než se zeptáte.',
        description: 'Nenašli jste odpověď? Zavolejte — rádi poradíme i bez závazku.',
        ctaLabel: 'Zavolat',
        ctaLink: 'tel:+420737136848',
        faqs: [
          {
            question: 'Kolik stojí pergola?',
            answer: 'Cena závisí na velikosti, materiálu a typu střechy. Klasická pergola 4×4 m z modřínu vychází orientačně na 80–120 tisíc. Přesnou nabídku zdarma do 5 dnů od zaměření.',
          },
          {
            question: 'Postavíte i v zimě?',
            answer: 'Ano, pracujeme celoročně. V zimě se zaměřujeme na konstrukce, které lze stavět i v mrazu.',
          },
          {
            question: 'Jaké dřevo doporučujete?',
            answer: 'Pro venkovní konstrukce doporučujeme modřín nebo dub. Pro zastřešené stavby je vhodný i smrk.',
          },
          {
            question: 'Potřebuji ohlášku nebo stavební povolení?',
            answer: 'Stavby do 25 m² a 5 m výšky zpravidla nevyžadují ohlášku. Poradíme vám s konkrétním případem.',
          },
          {
            question: 'Jak dlouho trvá realizace?',
            answer: 'Pergola typicky 5–10 dní, přístřešek 2–3 týdny, dřevostavba 4–8 týdnů. Závisí na rozsahu a počasí.',
          },
          {
            question: 'Děláte i ve svahu?',
            answer: 'Ano, máme zkušenosti se stavbami v náročném terénu. Svah vyžaduje speciální základy, které řešíme.',
          },
        ],
      },
    ],
    meta: {
      description: 'Rodinné tesařství v Třinci. Stavíme pergoly, přístřešky a dřevostavby z kvalitního dřeva.',
      image: heroImage.id,
      title: 'Tesařství Třinec — pergoly, přístřešky, dřevostavby',
    },
    title: 'Home',
  }
}
