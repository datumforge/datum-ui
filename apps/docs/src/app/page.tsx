'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@repo/ui/button'
import logoReversed from '../../public/logos/full_reversed.svg'

const Landing: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen w-full items-center space-between dark:bg-dk-surface-0 bg-surface-0">
      <div className="flex flex-col justify-center mx-auto my-auto w-full p-6 sm:w-1/3 h-full relative ease-in-out">
        <Image
          alt="datum imagery background"
          className="mx-auto"
          priority
          src={logoReversed as string}
          width={385}
        />
        <Button
          className="w-full mt-8"
          onClick={() => {
            console.log('susUI Docs app')
          }}
        >
          Let&apos;s read some docs
        </Button>
      </div>
    </main>
  )
}

export default Landing
