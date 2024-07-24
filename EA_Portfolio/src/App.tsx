// import { useEffect, useState } from "react";

import Hero from "./components/hero/Hero"
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import WorkSection from "./components/scrollSection/workSection/WorkSection";
import ContactSection from "./components/scrollSection/contactSection/ContactSection";

// import TestComponent from "./components/_testing/testComponent/TestComponent";
// import TestComponent2 from "./components/_testing/testComponent/TestComponent2";


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
        classNameProp="bg-slate-500 p-4 mb-20 rounded-2xl w-full max-w-[2200px] drop-shadow-2xl shadow-black"
      >
        <header className="mb-4">
          <div className="text-4xl text-center font-roboto font-bold fadeInDown">
            Recent Work
          </div>
        </header>

        <WorkSection/>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        classNameProp="bg-slate-500 p-4 mb-20 rounded-2xl w-full max-w-[2200px] drop-shadow-2xl shadow-black"
      >
        <header className="mb-4">
          <div className="text-4xl text-center font-roboto font-bold fadeInDown">
            Demos
          </div>
        </header>

        <WorkSection/>        
        
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        scrollContract={false}
        classNameProp="bg-gray-800 w-screen"
      >
        <ContactSection/>
      </ScrollSection>

    </>
  )
}

