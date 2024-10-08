import { useEffect, useRef } from "react";

import Hero from "./components/hero/Hero"
import HeroHeader from "./components/hero/HeroHeader";
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import AppLoading from "./components/ui/loading/LoadingScreen";

import AboutSection from "./sections/aboutSection/AboutSection";
import HowItWorksSection from "./sections/howItWorksSection/HowItWorksSection";
import WorkSection from './sections/workSection/WorkSection';
import DemoSection from "./sections/demoSection/DemoSection";
import ContactSection from "./sections/contactSection/ContactSection";

import handleRoutes from "./lib/router";
import { ScrollObserver } from "./lib/scrolling";


export default function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const howRef = useRef<HTMLDivElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollObserver = new ScrollObserver();
  const sectionMap = new Map<string, React.RefObject<HTMLDivElement>>(
    [
      ['home', homeRef],
      ['about', aboutRef],
      ['howitworks', howRef],
      ['work', workRef],
      ['demos', demoRef],
      ['contact', contactRef]
    ]
  );

  useEffect(() => {
    console.log("%c🤪I'm watching you🤪", 'color: red; font-size: 18px');
    handleRoutes(sectionMap, false);
  }, []);

  return (
    <main className="">

      <AppLoading className="z-50"/>
      
      <nav className='relative h-[30px] z-40'>
        <Navbar sectionMap={sectionMap}/>
      </nav>

      <section className="fixed top-0 w-full overflow-hidden -z-10" data-section="hero">
        <Hero>
          <div className="relative rounded-md top-[20%] sm:top-1/3 mx-auto overflow-hidden p-4">
            <HeroHeader/>
          </div>
        </Hero>
      </section>

      {/* Hero Spacer */}
      <div className="h-screen left-0 box-border"/>

      {/* For Scrolling Triggers */}
      <ScrollSection
        name="home"
        ref={homeRef}
        scrollObserver={scrollObserver}
        triggerBoxClassName="absolute top-0 w-full opacity-0"
        className="h-96 w-24 border-2"
        bottomRatio={0.1}
      >
      </ScrollSection>

      <ScrollSection
        name="about"
        ref={aboutRef}
        scrollObserver={scrollObserver}
        className="w-full mb-48 pt-32"
      >
        <AboutSection/>
      </ScrollSection>

      <ScrollSection
        name="howitworks"
        ref={howRef}
        scrollObserver={scrollObserver}
        className="w-full mb-40 pt-32"
      >
        <HowItWorksSection/>
      </ScrollSection>

      <ScrollSection
        name="work"
        ref={workRef}
        scrollObserver={scrollObserver}
        className="w-full mb-40 pt-32"
      >
        <WorkSection/>
      </ScrollSection>

      <ScrollSection
        name="demos"
        ref={demoRef}
        scrollObserver={scrollObserver}
        className="w-full mb-40 pt-32"
      >
        <DemoSection/>        
      </ScrollSection>

      <ScrollSection
        name="contact"
        ref={contactRef}
        scrollObserver={scrollObserver}
        scrollContract={false}
        className="bg-gray-800 w-screen"
      >
        <ContactSection/>
      </ScrollSection>

    </main>
  )
}

