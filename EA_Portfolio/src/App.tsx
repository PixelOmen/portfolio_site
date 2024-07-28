import Hero from "./components/hero/Hero"
import Navbar from "./components/navbar/Navbar"
import ScrollSection from "./components/scrollSection/ScrollSection";
import JSHeader from "./components/jsheader/JSHeader";
import AppLoading from "./components/ui/loading/AppLoading";

import WorkSection from './sections/workSection/WorkSection';
// import DemoSection from "./sections/demoSection/DemoSection";
import ContactSection from "./sections/contactSection/ContactSection";


import { ScrollObserver } from "./lib/scrolling";


export default function App() {
  const scrollObserver = new ScrollObserver();

  return (
    <>
      <AppLoading className="z-50"/>
      <nav className='relative h-[30px] z-40'>
        <Navbar/>
      </nav>

      <section className="fixed top-0 w-full overflow-hidden -z-10">
        <Hero>
          <div className="relative rounded-md top-[25%] sm:top-1/3 mx-auto overflow-hidden p-4">
            <header className="max-w-max text-5xl sm:text-6xl justify-center text-center mx-auto">
                <span className="text-[#EF8275] font-medium">
                  Emmanuel Acosta
                </span>
              <div className="font-roboto font-thin">Full-Stack Developer</div>
              <div className="text-[6pt] sm:text-[8pt] mt-2">(but mostly back-end &#x1F601;)</div>
            </header>
          </div>
        </Hero>
      </section>

      <div className="h-screen left-0 box-border"></div>

      <ScrollSection
        scrollObserver={scrollObserver}
        className="bg-gray-800 w-full"
      >
        <WorkSection className=""/>
      </ScrollSection>

      <ScrollSection
        scrollObserver={scrollObserver}
        className="bg-gray-800 w-full"
      >
        <div className="bg-[#1f1f1f] p-8 flex justify-center overflow-hidden">
          <div className="max-w-[1500px] w-full">
            <JSHeader
              className="text-xl sm:text-[2rem]"
              title="demos"
              prefix="function"
              asFunction={true}
              functionParams={["aws", "django"]}
            >
              <div className="mt-10 p-4 h-[800px]">
                {/* <DemoSection/> */}
              </div>
            </JSHeader>
          </div>
        </div>        
        
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

