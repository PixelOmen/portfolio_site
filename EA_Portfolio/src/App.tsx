// import { useEffect, useState } from "react";

import Hero from "./components/hero/Hero"
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import WorkSection from "./components/scrollSection/workSection/WorkSection";
// import TestComponent from "./components/_testing/testComponent/TestComponent"

// import { sectionScrollStates, scrollObserve } from "./lib/scrolling";
import { ScrollObserver } from "./lib/scrolling";


export default function App() {
  const scrollObserver = new ScrollObserver();

  return (
    <>
      <nav className='relative h-[30px] z-50'>
          <Navbar/>
      </nav>

      <section className="fixed top-0 w-full overflow-hidden -z-10">
        <Hero>
          <div className="relative rounded-md top-1/3 mx-auto overflow-hidden p-4">
            <header className="max-w-max text-6xl justify-center text-center mx-auto">
                <span className="text-[#EF8275] font-medium">
                  Emmanuel Acosta
                </span>
              <div className="font-roboto font-thin">Full-Stack Developer</div>
              <div className="text-[8pt] mt-2">(but mostly back-end &#x1F601;)</div>
            </header>
          </div>
        </Hero>
      </section>

      <div className="h-screen left-0 box-border"></div>

      <ScrollSection
        scrollObserver={scrollObserver}
        classNameProp="bg-slate-500 p-4 mb-10"
      >
        <div className="flex bg-slate-900">
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
          <div className="h-[200px] w-80 bg-red-400 border-2"></div>
        </div>
        <WorkSection/>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        classNameProp="bg-slate-500 p-4 mb-20"
      >
        <div className="h-[1000px] w-[1000px] bg-slate-400"></div>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        scrollContract={false}
        classNameProp="bg-slate-800"
      >
      <div className="w-screen h-[500px] bg-slate-800">
        <svg preserveAspectRatio="none" viewBox="0 0 100 102" height="75" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L50 100 L100 0 Z" fill="#618985"></path>
        </svg>
      </div>
      </ScrollSection>

    </>
  )
}
