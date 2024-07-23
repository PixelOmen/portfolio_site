// import {useRef} from 'react';
import styles from './projectview.module.css'
import GitHubIcon from '../ui/icons/GitHubIcon';

import ImgCarousel from '../ui/images/ImgCarousel';

interface ProjectviewProps {
  active: boolean;
  title: string;
  description: string;
  techStack?: string[];
  github?: {name?: string, url: string};
  images?: string[];
  className?: string;
}

export default function Projectview({
  active,
  title,
  description,
  github,
  techStack = [],
  images = [],
  className = ''
}: ProjectviewProps ) {

  // const container = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`${styles.background} font-roboto p-6 rounded-lg text-[#ede9e0] transition-all overflow-hidden ${className}`}
    >
      <div>
        <div className='text-3xl text-center fadeInRight mb-6 font-bold'>
          {title}
        </div>
      </div>
      {images && (
        <div
          className='flex justify-center fadeInLeft rounded-lg bg-gradient-to-tl from-slate-800 to-[#4c6c7c] border-2 border-[#304646]'
        >
          <ImgCarousel
            imgURLs={images}
            className='max-w-[500px]'
          />
        </div>
      )}
      <div className='mt-6 text-lg enterDown'>
        {description}
      </div>
      {techStack && (
        <div className='flex gap-4 mt-6 enterLeft'>
          {techStack.map((tech, index) => (
            <div key={index} className='flex gap-4'>
              <div>
                {tech}
              </div>
              {index < techStack.length - 1 && (<div>|</div>)}
            </div>
          ))}
        </div>
      )}
      {github && (
        <div className='mt-6 flex items-center fadeIn'>
          <GitHubIcon
            fillColor='#ede9e0'
            className='mb-1'
            width='30px'
            height='30px'
          />
          <div className='ml-2'>
            <a href={github.url} target='_blank'>{github.name ? github.name : "Source Code"}</a>
          </div>
        </div>          
      )}
    </div>
  )
}
