import type { RequiredDataFromCollectionSlug } from 'payload'

import { SITE_DESCRIPTION, SITE_NAME } from '@/constants/site'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  meta: {
    description: SITE_DESCRIPTION,
    title: SITE_NAME,
  },
  title: 'Home',
  layout: [],
}
