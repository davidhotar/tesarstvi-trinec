'use client'

import React from 'react'

import type { CardPortfolioData } from '@/components/Card'

import { Card } from '@/components/Card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export const RelatedPortfolioCarousel: React.FC<{ posts: CardPortfolioData[] }> = ({ posts }) => {
  return (
    <Carousel opts={{ align: 'start', loop: posts.length > 3 }} className="w-full">
      <CarouselContent className="-ml-3 md:-ml-4">
        {posts.map((post, index) => (
          <CarouselItem
            key={index}
            className="pl-3 md:pl-4 basis-4/5 sm:basis-1/2 lg:basis-1/3"
          >
            <Card className="h-full" doc={post} relationTo="portfolio" showCategories />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
