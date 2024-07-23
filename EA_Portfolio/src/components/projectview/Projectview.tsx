import React from 'react';
import styles from './projectview.module.css'

import ImgCarousel from '../ui/images/ImgCarousel';

interface ProjectviewProps {
  active: boolean;
  title: string;
  description: string;
  techStack?: string[];
  github?: string;
  images?: string[];
  className?: string;
}

export default function Projectview({
  active,
  title,
  description,
  github = '',
  techStack = [],
  images = [],
  className = ''
}: ProjectviewProps ) {
  return (
    <div className={`${styles.background} p-6 rounded-lg text-[#ede9e0] ${className}`}>
      <div>
        <div className='text-3xl text-center fadeInRight font-roboto mb-6 font-bold'>
          {title}
        </div>
      </div>
      {images && (
        <div
          className='flex justify-center fadeInLeft rounded-lg bg-gradient-to-tl from-slate-800 border-2 border-[#304646]'
        >
          <ImgCarousel
            imgURLs={images}
            className='max-w-[500px]'
          />
        </div>
      )}
      <div className='mt-6 text-lg'>
        {description}
      </div>
      {techStack && (
        <div className='flex gap-4 mt-6'>
        {techStack.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>
      )}
    </div>
  )
}
