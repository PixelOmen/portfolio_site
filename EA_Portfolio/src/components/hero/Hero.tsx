import { ReactNode } from 'react'

import styles from './hero.module.css'
import landingbg from '../../assets/landingbg.jpg'

import Navbar from "../navbar/Navbar"


interface Props {
  children: ReactNode
}

export default function hero({ children }: Props) {
  return (
    <>
      <div className={`${styles.bgShow} w-full border-2 max-h-[900px] overflow-hidden`}>
        <img src={landingbg} alt="landingbg" className='mx-auto'/>
        <div className='absolute h-full w-full top-0 left-0'>
          <Navbar/>
          {children}
        </div>
      </div>
    </>
  )
}