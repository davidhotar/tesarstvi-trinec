import TestimonialsComponent from '@/components/shadcn-studio/blocks/testimonials-component-21/testimonials-component-21'
import type { TestimonialItem } from '@/components/shadcn-studio/blocks/testimonials-component-21/testimonial-card'

const testimonials: TestimonialItem[] = [
  {
    name: 'Liam Carter',
    username: '@Liam.ca',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png?width=40&height=40&format=auto',
    rating: 5,
    content: (
      <>
        shadcn/studio has completely transformed the way I approach UI development. The pre-built components are
        intuitive and save me so much time.{' '}
        <span className='bg-primary/10'>What used to take hours now only takes minutes!</span>
      </>
    )
  },
  {
    name: 'John Carter',
    username: '@johny',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png?width=40&height=40&format=auto',
    rating: 4.5,
    content: (
      <>
        Incredible time-saver! shadcn/studio has made UI development a breeze. The pre-built components are not only{' '}
        <span className='bg-primary/10'>visually appealing but also highly customizable</span>, fitting seamlessly into
        my projects. With a wide array of options to choose from, I can easily match anything I need.
      </>
    )
  },
  {
    name: 'Ethan Parker',
    username: '@Ethan/p12',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png?width=40&height=40&format=auto',
    rating: 5,
    content: (
      <>
        I was able to implement complex UI elements with shadcn/studio, which allowed me to deliver a polished product
        faster. The component library is <span className='bg-primary/10'>extensive and extremely versatile</span>
        —exactly what I needed for rapid prototyping.
      </>
    )
  },
  {
    name: 'Mason Reed',
    username: '@masonreed',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png?width=40&height=40&format=auto',
    rating: 4.5,
    content: (
      <>
        As a developer, time is of the essence, and shadcn/studio has been a game-changer.{' '}
        <span className='bg-primary/10'>
          The ready-made components let me focus more on functionality and less on design.
        </span>{' '}
        It’s perfect for quickly prototyping and launching projects.
      </>
    )
  },
  {
    name: 'Ava Mitchell',
    username: '@avamitch',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png?width=40&height=40&format=auto',
    rating: 5,
    content: (
      <>
        shadcn/studio has helped me deliver beautiful interfaces in record time. I love how{' '}
        <span className='bg-primary/10'>consistent, polished, and accessible</span> the components are right out of the
        box.
      </>
    )
  },
  {
    name: 'Noah Ramirez',
    username: '@noahcodes',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png?width=40&height=40&format=auto',
    rating: 4,
    content: (
      <>
        Clean, modern components that just work. The documentation is{' '}
        <span className='bg-primary/10'>clear and incredibly helpful</span>, making implementation so much faster.
      </>
    )
  },
  {
    name: 'Sophia Bennett',
    username: '@sophiab',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png?width=40&height=40&format=auto',
    rating: 5,
    content: (
      <>
        I’ve tried several UI kits, but none match the balance of flexibility and design quality that shadcn/studio
        provides. The <span className='bg-primary/10'>customization options</span> are unmatched.
      </>
    )
  },
  {
    name: 'Leo Harper',
    username: '@leoharper',
    avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png?width=40&height=40&format=auto',
    rating: 4.5,
    content: (
      <>
        The components integrate seamlessly with my existing workflow. I love how{' '}
        <span className='bg-primary/10'>developer-friendly and scalable</span> everything is.
      </>
    )
  }
]

const TestimonialsComponentPage = () => {
  return <TestimonialsComponent testimonials={testimonials} />
}

export default TestimonialsComponentPage
