import React, { useEffect, useState, useRef } from "react";

import type { IScrollState } from "../../lib/scrolling";
import Terminal from "../../components/terminal/Terminal";

interface AboutSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function AboutSection({ scrollState, className = ''}: AboutSectionProps) {

  const [singleTrigger, setSingleTrigger] = useState(false);
  const [showEasteregg, setShowEasteregg] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  function hideTerminal() {
    if (terminalRef.current) {
      terminalRef.current.classList.add('opacity-0');
      terminalRef.current.classList.add('scale-75');
      setTimeout(() => {
        setShowEasteregg(true);
      }, 300);
    }
  }

  useEffect(() => {
    if (scrollState?.wasTriggered.value && !singleTrigger) {
      setSingleTrigger(true);
    }
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className={`bg-[rgba(31,31,31,0)] p-6 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div        
        className="relative w-full max-w-[1500px] overflow-hidden"
      >

        {showEasteregg ? (
          <article className="fadeIn w-full text-4xl sm:text-5xl mb-8 text-center font-medium">
            <span className="text-[#EF8275]">About</span>            
            <span className="ml-3 font-thin text-gray-200 font-roboto">Me</span>
            <div className="mt-2 px-2 text-base sm:text-lg font-light font-sans text-gray-200 ">
              Who am I? What do I do? What is this site? Why am I asking so many questions?
            </div>            
            <hr className="block mx-auto mt-4 w-3/4"/>
            <div className="mt-10 p-6 sm:p-10 mx-auto text-base sm:text-2xl text-slate-200 text-left font-light bg-slate-800 rounded-md border-2 border-black">
              <p className="mb-4">
                Hello and welcome! &#9995;
              </p>
              <p className="mb-6">
                My name is <a href="https://www.linkedin.com/in/emmanuelacostapost/" className="text-[#EF8275]">Emmanuel</a>. I'm a software engineer and full stack developer with a passion for leveraging cloud infrastructure to create secure, dynamic, and scalable web applications. I specialize in most things Python, including building RESTful APIs with Django and PostgreSQL, as well as deploying scalable applications on AWS.
              </p>
              <p className="mb-6">
                I built this site not only to showcase my work, but also as a small-scale demonstration of a secure and scalable microservices architecture with production-grade infrastructure. Please feel free to check out my work, including several server-side Django and AWS demos below. &#128071;
              </p>
              <p className="">
                Drop me a message below to find out how I can help you bring your vision to life. &#129309;
              </p>
            </div>
          </article>
        ) : (
          <div ref={terminalRef} className="transition-all duration-300">
            <Terminal
              header="About@Me"
              newLinePause={500}
              triggered={singleTrigger}
              className="sm:p-4"
              eastereggCallback={hideTerminal}
              content="Hello and welcome!&#9995;\nMy name is Emmanuel. I'm a software engineer and full stack developer with a passion for leveraging cloud infrastructure to create secure, dynamic, and scalable web applications.&#128293;&#128187;&#128293;\nI specialize in most things Python, including building RESTful APIs with Django and PostgreSQL, as well as deploying scalable applications on AWS.&#128640;&#9729;\nI built this site not only to showcase my work, but also as a small-scale demonstration of a secure and scalable microservices architecture with production-grade infrastructure.&#128170;\nDrop me a message below to find out how I can help you bring your vision to life.&#129309;"
            />
          </div>
        )}

      </div>
    </div>
  )
}
