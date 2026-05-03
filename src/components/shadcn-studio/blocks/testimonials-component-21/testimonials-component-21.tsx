import { ExternalLinkIcon, StarIcon } from 'lucide-react'

import TestimonialCard from '@/components/shadcn-studio/blocks/testimonials-component-21/testimonial-card'
import type { TestimonialItem } from '@/components/shadcn-studio/blocks/testimonials-component-21/testimonial-card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { Marquee } from '@/components/ui/marquee'

const TestimonialsComponent = ({ testimonials }: { testimonials: TestimonialItem[] }) => {
  return (
    <section className='bg-muted space-y-12 py-8 sm:space-y-16 sm:py-16 lg:space-y-24 lg:py-24'>
      {/* Section Header */}
      <div className='mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8'>
        <Badge variant='outline' className='text-sm font-normal'>
          Testimonial
        </Badge>
        <h2 className='text-2xl font-semibold sm:text-3xl lg:text-4xl'>World-Class Customer Support</h2>
        <p className='text-muted-foreground text-xl'>
          Predictive analytics, and recommendations to optimize their processes and better business outcomes.
        </p>
      </div>

      {/* Testimonials Marquee */}
      <div className='w-full'>
        <Marquee pauseOnHover duration={40} gap={1.5} className='*:items-end'>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

      <div className='mx-auto max-w-7xl space-y-4 px-4 text-center sm:px-6 lg:px-8'>
        <div className='flex flex-wrap items-center justify-center gap-11'>
          <div>
            <div className='flex items-center gap-1.5'>
              <p className='text-2xl font-semibold'>4.5</p>
              <StarIcon className='fill-amber-600 stroke-amber-600 dark:fill-amber-400 dark:stroke-amber-400'></StarIcon>
            </div>
            <p className='text-muted-foreground text-sm font-medium'>Stars out of 5</p>
          </div>
          <div>
            <p className='text-2xl font-semibold'>3 minutes</p>
            <p className='text-muted-foreground text-sm font-medium'>avg. response time</p>
          </div>
          <Button
            size='lg'
            asChild
            className='group relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] has-[>svg]:px-6 dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.2)_50%,transparent_75%,transparent_100%)]'
          >
            <a href='#'>
              View All Reviews
              <ExternalLinkIcon className='transition-all duration-300 group-hover:rotate-10' />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsComponent
