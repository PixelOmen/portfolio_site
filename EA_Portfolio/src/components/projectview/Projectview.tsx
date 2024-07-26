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

  return (
    <div
      style={{background: 'radial-gradient(circle, #4c6c7c 0%, #334454 70%)'}}
      className={`font-roboto py-8 px-10 pb-12 rounded-lg text-gray-300 transition-all overflow-hidden ${className}`}
    >
      <button onClick={backCallback}>
        <div className='text-3xl text-center casc-fadeInDown font-bold'>
          {"<----"}
        </div>
      </button>
      <div>
        <div className='text-3xl text-center casc-fadeInDown mb-6 font-bold'>
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
        <div
          className='mt-6 flex items-center casc-fadeIn group w-max'
        >
          <GitHubIcon
            fillColor='#ede9e0'
            className='mb-1'
            width='30px'
            height='30px'
          />
          <div className='px-2 pb-1 rounded-lg border-2 border-[rgba(0,0,0,0)] group-hover:ml-2 group-hover:bg-[#b9f5f5] group-hover:text-black group-hover:border-[rgba(1,1,1,0.5)] font-sourcecode transition-all duration-300'>
            <a href={github.url} target='_blank'>{github.name ? github.name : "Source Code"}</a>
          </div>
        </div>          
      )}
    </div>
  )
}
