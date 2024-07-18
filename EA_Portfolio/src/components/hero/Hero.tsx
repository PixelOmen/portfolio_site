import { ReactNode } from 'react'

// import styles from './hero.module.css'
// import landingbg from '../../assets/landingbg.jpg'

import Navbar from "../navbar/Navbar"
import HeroCanvas from './HeroCanvas'


interface HeroProps {
  children: ReactNode
}

export default function hero({ children }: HeroProps) {
  return (
    <>
      {/* <img src={landingbg} alt="landingbg" className={`${styles.bgImg} absolute mx-auto'`}/> */}
      <section className='relative h-screen border-2 border-red-500 box-border'>
        <nav className='relative z-10'>
          <Navbar/>
        </nav>
        <div className='relative h-full pt-20'>
          <div className='relative h-full z-10'>
            {children}
          </div>
          <div
            className='absolute z-0 h-full w-full left-0 top-0 overflow-hidden'
          >
            <HeroCanvas/>
          </div>
        </div>
      </section>
    </>
  )
}