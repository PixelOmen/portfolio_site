import { useState } from 'react';

import rightArrow from '../../../assets/right_arrow.png'

interface ImgCarouselProps {
    className?: string;
    imgURLs: string[];
}

export default function ImgCarousel({
    className,
    imgURLs = []
}: ImgCarouselProps) {

  const [currentImage, setCurrentImage] = useState(0);

  function createImageElements() {
    return (
      <div 
        style={{
          transition: 'transform 0.5s ease',
          transform: `translateX(-${currentImage * 100}%)`
        }}
        className='flex'
        >
          {imgURLs.map((url, index) => { return (
            <div key={index} className="min-w-full m-auto overflow-hidden">
              <img src={url} alt="carousel image"/>
            </div>
        )})}
      </div>
    )
  }

  function prevImage() {
    setCurrentImage((prev) => (prev - 1 + imgURLs.length) % imgURLs.length)
  }

  function nextImage() {
    setCurrentImage((prev) => (prev + 1) % imgURLs.length)
  }

  return (
    <div
      className={`flex relative rounded-xl overflow-hidden ${className}`}
    >
      <button type='button'
        className='absolute group top-1/2 -translate-y-1/2 left-0 justify-center z-20 h-full w-[15%]'
        onClick={prevImage}
      >
        <div
          className='w-[70%] ml-6 bg-[#585243] p-4 rounded-[20%] shadow-inner group-hover:bg-[#b9e6e6] group-hover:scale-y-125 group-hover:rounded-[80%] transition-all duration-300 group-active:bg-stone-800 border-1 border-black'
        >
          <img src={rightArrow} alt="Previous Image" 
            className='rotate-180 group-active:rotate-[270deg] group-hover:scale-[110%] group-hover:brightness-0 transition-all'/>
        </div>
      </button>
      <button type='button'
        className='absolute group top-1/2 -translate-y-1/2 right-0 justify-center z-20 h-full w-[15%] '
        onClick={nextImage}
      >
        <div
          className='w-[70%] bg-[#585243] p-4 rounded-[20%] group-hover:bg-[#b9e6e6] group-hover:scale-y-125 group-hover:rounded-[80%] transition-all duration-300 group-active:bg-stone-800 border-1 border-black'
        >
          <img src={rightArrow} alt="Next Image"
            className='group-active:rotate-[-90deg] group-hover:scale-[110%] grou-hover:border-2 group-hover:brightness-0 transition-transform'
          />
        </div>
      </button>
      {createImageElements()}
    </div>
  )
}
