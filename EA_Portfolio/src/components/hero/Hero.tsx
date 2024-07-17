import { ReactNode } from 'react'

import styles from './hero.module.css'
import landingbg from '../../assets/landingbg.jpg'

import Navbar from "../navbar/Navbar"
import HeroCanvas from './HeroCanvas'


interface HeroProps {
  children: ReactNode
}

export default function hero({ children }: HeroProps) {
  return (
    <>
        {/* <img src={landingbg} alt="landingbg" className={`${styles.bgImg} absolute mx-auto'`}/> */}
      <div className="h-screen border-2">
        <div className='relative h-full border-2 border-red-500 box-border'>
          <div className='relative z-10'>
            <Navbar/>
          </div>
          <div className='h-full pt-20'>
            <div className='relative z-10'>
              {children}
            </div>
            <div
              className='absolute z-0 h-full w-full left-0 top-0 overflow-hidden'
            >
              <HeroCanvas/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}