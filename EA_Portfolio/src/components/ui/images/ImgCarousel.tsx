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
            <div key={index} className="min-w-full m-auto overflow-hidden flex justify-center">
              <img src={url} alt="carousel image"
                className='hover:scale-105 transition-all duration-300'
              />
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
      className={`flex relative justify-center rounded-xl overflow-hidden ${className}`}
    >
      <button type='button'
        className='absolute group top-1/2 -translate-y-1/2 left-0 justify-center z-20 h-full w-[15%]'
        onClick={prevImage}
      >
        <div
          className='w-[70%] ml-6 bg-[#3a372f00] fadeInDown rounded-[20% group-hover:rounded-[40%] transition-all duration-300'
        >
          <img src={rightArrow} alt="Previous Image" 
            className='rotate-180 group-hover:scale-y-150 group-hover:brightness-150 group-active:rotate-[270deg] group-active:scale-y-90 group-active:brightness-100 transition-all'/>
        </div>
      </button>
      <button type='button'
        className='absolute group top-1/2 -translate-y-1/2 right-0 justify-center z-20 h-full w-[15%] '
        onClick={nextImage}
      >
        <div
          className='w-[70%] mr-6 bg-[#3a372f00] fadeInDown rounded-[20% group-hover:rounded-[40%] transition-all duration-300'
        >
          <img src={rightArrow} alt="Next Image"
            className='group-hover:scale-y-150 group-hover:brightness-150 group-active:rotate-[-90deg] group-active:scale-y-90 group-active:brightness-100 transition-all'
          />
        </div>
      </button>
      {createImageElements()}
    </div>
  )
}
