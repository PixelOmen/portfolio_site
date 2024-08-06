import { useEffect } from 'react';

import GitHubIcon from '../ui/icons/GitHubIcon';
import ImgCarousel from '../ui/images/ImgCarousel';


interface ProjectViewProps {
  title: string;
  description: string;
  backCallback: () => void;
  techStack?: string[];
  github?: {name?: string, url: string};
  images?: string[];
  className?: string;
}

export default function ProjectView({
  title,
  description,
  backCallback,
  github,
  techStack = [],
  images = [],
  className = '',
}: ProjectViewProps) {

  function forcePopState() {
    window.innerWidth < 758 ? history.back() : backCallback();
  }
  
  useEffect(() => {    
    window.addEventListener('popstate', () => {
      backCallback();
    });
    return () => {
      window.removeEventListener('popstate', backCallback)
    }
  }, []);

  return (
    <div
      style={{background: 'radial-gradient(circle, #e5e7eb  0%, #c8cace 100%)'}}
      className={`w-full font-sourcecode py-8 px-10 pb-12 rounded-lg text-black transition-all overflow-hidden ${className}`}
    >
      <button
        onClick={forcePopState}
        className='hover:scale-x-125 hover:scale-y-90 transition-all duration-300 hover:text-[#EF8275]'
      >
        <div className='text-3xl ml-5 mb-10 sm:mb-0 text-center casc-fadeInDown font-bold'>
          {"<---"}
        </div>
      </button>
      <article>      
        <div>
          <div className='text-3xl text-center casc-fadeInRight mb-6 font-bold text-[#EF8275]'>
            {title}
          </div>
        </div>
        {images && (
          <div
            className='flex justify-center casc-fadeInRight rounded-lg bg-gradient-to-tl from-slate-800 '
          >
            <ImgCarousel
              imgURLs={images}
              className='max-w-[500px]'
            />
          </div>
        )}
        <p className='mt-6 text-base sm:text-lg casc-fadeInDown'>
          {description}
        </p>
        {techStack && (
          <div className='flex gap-2 sm:gap-4 mt-10 mb-10 casc-fadeInLeft flex-wrap'>
            {techStack.map((tech, index) => (
              <div key={index} className='flex gap-2'>
                <div className=''>
                  {tech}
                </div>
                {index < techStack.length - 1 && (<div>|</div>)}
              </div>
            ))}
          </div>
        )}
        {github && (
          <div
            className='flex items-center casc-fadeIn group w-max'
          >
            <GitHubIcon
              fillColor=''
              className='mb-1'
              width='30px'
              height='30px'
            />
              <a
                href={github.url} target='_blank'
                className='px-2 pb-1 rounded-lg border-1 border-[rgba(0,0,0,0)] group-hover:ml-2 group-hover:bg-[#EF8275] group-hover:text-white group-hover:border-[rgba(1,1,1,0.2)] font-sourcecode transition-all duration-300 box-border'
              >
                {github.name ? github.name : "Source Code"}
              </a>
          </div>          
        )}
      </article>
    </div>
  )
}
