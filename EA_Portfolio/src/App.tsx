import { useEffect, useRef } from "react";

import Hero from "./components/hero/Hero"
import HeroHeader from "./components/hero/HeroHeader";
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import AppLoading from "./components/ui/loading/LoadingScreen";

import AboutSection from "./sections/aboutSection/AboutSection";
import WorkSection from './sections/workSection/WorkSection';
import DemoSection from "./sections/demoSection/DemoSection";
import ContactSection from "./sections/contactSection/ContactSection";

import { ScrollObserver } from "./lib/scrolling";
import * as auth from "./lib/auth";


export default function App() {
  const aboutRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionMap = new Map<string, React.RefObject<HTMLDivElement>>(
    [
      ['about', aboutRef],
      ['work', workRef],
      ['demos', demoRef],
      ['contact', contactRef]
    ]
  );
  
  const scrollObserver = new ScrollObserver();

  useEffect(() => {
    auth.checkForGoogleRedirect()
      .then(err => {
        // some error handling maybe
        if (err) {
          console.error(err.errorString, err.axiosError);
        }
      });

      // window.addEventListener('wheel', (e) => {
      //   console.log(e.deltaY)
      // })
  }, []);

  return (
    <>
      <AppLoading className="z-50"/>
      <nav className='relative h-[30px] z-40'>
        <Navbar sectionMap={sectionMap}/>
      </nav>

      <section className="fixed top-0 w-full overflow-hidden -z-10">
        <Hero>
          <div className="relative rounded-md top-[25%] sm:top-1/3 mx-auto overflow-hidden p-4">
            <HeroHeader/>
          </div>
        </Hero>
      </section>

      <div className="h-screen left-0 box-border"></div>

      <ScrollSection
        ref={aboutRef}
        scrollObserver={scrollObserver}
        className="w-full border-black"
      >
        <AboutSection className=""/>
      </ScrollSection>

      <ScrollSection
        ref={workRef}
        scrollObserver={scrollObserver}
        className="w-full border-black"
      >
        <WorkSection className=""/>
      </ScrollSection>

      <ScrollSection
        ref={demoRef}
        scrollObserver={scrollObserver}
        className="w-full"
      >
        <DemoSection/>        
      </ScrollSection>

      <ScrollSection
        ref={contactRef}
        scrollObserver={scrollObserver}
        scrollContract={false}
        className="bg-gray-800 w-screen"
      >
        <ContactSection/>
      </ScrollSection>

    </>
  )
}

