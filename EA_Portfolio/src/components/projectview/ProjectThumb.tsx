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
      hoverSlide.current.style.transform = 'translateY(0)';
    }
  }
  
  function slideUp() {
    if (hoverSlide.current) {
      setActivateTags(false);
      hoverSlide.current.style.transform = 'translateY(-100%)';
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
        style={{transform: 'translateY(-100%)'}}
        className="transition-all duration-200 ease-in-out h-full"
      >
        <div
          className="bg-gray-200 h-full text-black p-8"
        >
          <div className="p-6 h-full">
            <AnimReset
              hideOnStart={true}
              active={activateTags}
              cascadeDelay={100}
              resetDelay={400}
              className="h-full"
            >
              <div
                className="flex h-full border-2 border-black justify-center items-center"
              >
                {tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className=""
                    >
                      <FlipOutTag content={tag} className=""/>
                    </div>
                  )
                })}
              </div>
            </AnimReset>
          </div>
        </div>
        <div
          style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover'}}
          className="h-full w-full flex flex-col"
        >
          <ChromeHeader fakeUrl={fakeURL}/>
        </div>
      </div>
    </div>
  )
}
