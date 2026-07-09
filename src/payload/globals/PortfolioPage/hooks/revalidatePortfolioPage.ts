import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidatePortfolioPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating portfolio page`)

    revalidateTag('global_portfolio-page', 'max')
  }

  return doc
}
