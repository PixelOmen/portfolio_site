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
      <div className={`w-full overflow-hidden`}>
        {/* <img src={landingbg} alt="landingbg" className={`${styles.bgImg} mx-auto'`}/> */}
        <HeroCanvas/>
        <div className='absolute h-full w-full top-0 left-0'>
          <Navbar/>
          <div className='pt-24'>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}