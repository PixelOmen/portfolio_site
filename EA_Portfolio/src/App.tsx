import { useEffect } from "react";

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
  const scrollObserver = new ScrollObserver();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const redirectUrl = new URL(auth.GOOGLE_REDIRECT_URI);
    if (redirectUrl.pathname === currentUrl.pathname) {
      const code = auth.parseGoogleCode(currentUrl.href);
      if (code) {
        auth.authCodeToToken(code)
          .then(res => {console.log(res)});
      }
    }
  }, []);

  return (
    <>
      <AppLoading className="z-50"/>
      <nav className='relative h-[30px] z-40'>
        <Navbar/>
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
        scrollObserver={scrollObserver}
        className="bg-gray-800 w-full border-t-2 border-black"
      >
        <AboutSection className=""/>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        className="bg-gray-800 w-full border-black"
      >
        <WorkSection className=""/>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        className="bg-gray-800 w-full"
      >
        <DemoSection/>        
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        scrollContract={false}
        className="bg-gray-800 w-screen"
      >
        <ContactSection/>
      </ScrollSection>

    </>
  )
}

