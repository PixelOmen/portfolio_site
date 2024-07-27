import { ReactNode } from 'react'

// import styles from './hero.module.css'
// import landingbg from '../../assets/landingbg.jpg'

import HeroCanvas from './HeroCanvas'


interface HeroProps {
  children: ReactNode
}

export default function hero({ children }: HeroProps) {
  return (
    <>
      <div className='relative h-screen'>
        <div className='relative h-full pt-20'>
          <div className='relative h-full z-10'>
            {children}
          </div>
          <div
            className='absolute z-0 h-full w-full left-0 top-0 overflow-hidden pointer-events-none'
          >
            <HeroCanvas/>
          </div>
        </div>
      </div>
    </>
  )
}