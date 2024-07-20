import { useEffect, useState } from "react";

import Hero from "./components/hero/Hero"
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import WorkSection from "./components/workSection/WorkSection";
// import TestComponent from "./components/_testing/testComponent/TestComponent"

import { sectionScrollStates, scrollObserve } from "./lib/scrolling";


export default function App() {
  const sections = 2;
  const scrollStates = sectionScrollStates(sections);

  var [sectionsInitCounter, setSectionInit] = useState(0);

  useEffect(() => {
    if (sectionsInitCounter >= sections) {
      scrollObserve(scrollStates);
    }
  }, [sectionsInitCounter]);

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
        scrollY={scrollStates[0]}
        onInit={setSectionInit}
        classNameProp="rounded-2xl bg-slate-500 p-4"
      >
        <WorkSection startAnim={scrollStates[0].wasTriggered}/>
      </ScrollSection>

      <ScrollSection
        scrollY={scrollStates[1]}
        onInit={setSectionInit}
        classNameProp="rounded-2xl bg-slate-500 p-4"
      >
        <WorkSection startAnim={scrollStates[1].wasTriggered}/>
      </ScrollSection>
      <div className="h-[1000px]"></div>

    </>
  )
}
