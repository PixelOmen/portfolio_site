import React, { useRef, useState } from "react"

import ChromeHeader from "./ChromeHeader"
import FlipOutTag from "../ui/tags/FlipOutTag";

import AnimReset from "../animReset/AnimReset";


interface ProjectThumbProps {
  title: string;
  tags: string[];
  bgImage: string;
  children?: React.ReactNode
}

export default function ProjectThumb({
  title,
  bgImage,
  tags
}: ProjectThumbProps ) {

  const fakeURL = title.replace(/ /g, '-').toLowerCase();
  const hoverSlide = useRef<HTMLDivElement>(null);
  const [activateTags, setActivateTags] = useState(false);


  function slideDown() {
    if (hoverSlide.current) {
      setActivateTags(true);
      hoverSlide.current.classList.remove('translate-y-[-100%]');
    }
  }
  
  function slideUp() {
    if (hoverSlide.current) {
      setActivateTags(false);
      hoverSlide.current.classList.add('translate-y-[-100%]');
    }
  }

  return (
    <div
      className="h-full w-full rounded-sm overflow-hidden cursor-pointer"
      onMouseEnter={slideDown}
      onMouseLeave={slideUp}
    >
      <div
        ref={hoverSlide}
        className="transition-all duration-200 ease-in-out h-full translate-y-[-100%]"
      >
        <div
          style={{background: 'radial-gradient(circle, #e5e7eb  0%, #c8cace 100%)'}}
          className="h-full w-full text-black "
        >
          <div className="w-full h-full py-4">
            <AnimReset
              hideOnStart={true}
              active={activateTags}
              cascadeDelay={100}
              resetDelay={500}
              deActivateDelay={700}
              className="h-full"
            >
              <div
                className="flex flex-wrap h-full rounded-lg border-black justify-center items-center"
              >
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className=""
                    >
                      <FlipOutTag content={tag}/>
                    </div>
                  )
                })}
              </div>
            </AnimReset>
          </div>
        </div>
        <div
          className="relative h-full w-full flex flex-col"
        >
          <div
            style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}
            className="absolute top-0 h-full w-full blur-[4px]"
          >
          </div>
          <div className="relative z-10">
            <ChromeHeader fakeUrl={fakeURL}/>
          </div>
          <div className="relative flex justify-center items-center h-full font-sourcecode font-normal text-2xl">
            {title}
          </div>
        </div>
      </div>
    </div>
  )
}
