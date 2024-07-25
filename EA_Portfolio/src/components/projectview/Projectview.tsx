import { useEffect, useRef } from 'react';

import GitHubIcon from '../ui/icons/GitHubIcon';
import ImgCarousel from '../ui/images/ImgCarousel';
import * as animUtils from '../../lib/animUtils';


interface ProjectViewProps {
  title: string;
  description: string;
  techStack?: string[];
  github?: {name?: string, url: string};
  images?: string[];
  className?: string;
  hideOnStart?: boolean;
}

export default function ProjectView({
  title,
  description,
  github,
  techStack = [],
  images = [],
  className = '',
  hideOnStart = false
}: ProjectViewProps) {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hideOnStart) {
      animUtils.cascadeAnim(container.current, 10, [], {hideOnly: true});
    }
  }, []);

  return (
    <div
      ref={container}
      style={{background: 'radial-gradient(circle, #4c6c7c  0%, #334454 70%)'}}
      className={`font-roboto py-8 px-10 rounded-lg text-gray-300 transition-all overflow-hidden ${className}`}
    >
      <div>
        <div className='text-3xl text-center casc-fadeInDown mb-6 font-bold'>
          {title}
        </div>
      </div>
      {images && (
        <div
          className='flex justify-center casc-fadeInRight rounded-lg bg-gradient-to-tl from-slate-800 to-[#4c6c7c] border-2 border-[#304646]'
        >
          <ImgCarousel
            imgURLs={images}
            className='max-w-[500px]'
          />
        </div>
      )}
      <div className='mt-6 text-lg casc-fadeInDown'>
        {description}
      </div>
      {techStack && (
        <div className='flex gap-4 mt-6 casc-fadeInLeft'>
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
        <div className='mt-6 flex items-center casc-fadeIn'>
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
