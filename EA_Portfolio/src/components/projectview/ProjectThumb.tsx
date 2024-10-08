import React, { useRef, useState } from "react"

import VSCodeHeader from "./VSCodeHeader";
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
              cascadeDelay={20}
              resetDelay={400}
              deActivateDelay={200}
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
            className="absolute top-0 h-full w-full blur-[2px] opacity-90"
          >
          </div>
          <div className="relative z-10">
            <VSCodeHeader tabName={fakeURL}/>
          </div>
          <div
            dangerouslySetInnerHTML={{__html: title}}
            className="relative flex justify-center items-center h-full font-sourcecode font-medium text-2xl text-gray-100 text-center"
          >
          </div>
        </div>
      </div>
    </div>
  )
}
