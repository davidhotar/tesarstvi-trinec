import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seedHome() {
  const payload = await getPayload({ config })

  // Upload hero image
  const fs = await import('fs')
  const path = await import('path')
  const heroPath = path.resolve(__dirname, '../public/images/hero.png')
  const heroBuffer = fs.readFileSync(heroPath)

  const heroImage = await payload.create({
    collection: 'media',
    data: { alt: 'Dřevěná pergola v Beskydech při západu slunce' },
    file: {
      name: 'hero.png',
      data: heroBuffer,
      mimetype: 'image/png',
      size: heroBuffer.byteLength,
    },
  })

  console.log('Created hero image:', heroImage.id)

  // Create home page with hero block
  const homePage = await payload.create({
    collection: 'pages',
    data: {
      title: 'Home',
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
      ],
      meta: {
        description:
          'Tesařství Třinec — rodinné tesařství v Beskydech. Pergoly, přístřešky a dřevostavby na míru. 10 let zkušeností, 5 let záruka.',
        image: heroImage.id,
        title: 'Tesařství Třinec · Pergoly, přístřešky a dřevostavby na míru',
      },
    },
  })

  console.log('Created home page:', homePage.id)
  process.exit(0)
}

seedHome().catch((err) => {
  console.error(err)
  process.exit(1)
})
