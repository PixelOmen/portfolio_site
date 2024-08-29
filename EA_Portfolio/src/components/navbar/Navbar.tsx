import { useEffect, useRef } from "react";

import styles from './navbar.module.css'
import NavButton from "./NavButton";

interface NavbarProps {
  sectionMap: Map<string, React.RefObject<HTMLDivElement>>;
}

export default function Navbar({ sectionMap }: NavbarProps) {
  const topAnchorBar = useRef<HTMLDivElement>(null);
  const navbarContainer = useRef<HTMLDivElement>(null);
  const contentsFull = useRef<HTMLDivElement>(null);
  const contentsSmall = useRef<HTMLDivElement>(null);
  const smallMenuBtn = useRef<HTMLButtonElement>(null);
  const smallMenuBackBtn = useRef<HTMLButtonElement>(null);
  const contentsSmallOpen = useRef<HTMLDivElement>(null);
  const smallOpenRef = useRef<boolean>(false);


  const observer = new IntersectionObserver((elements) => {
    elements.forEach((e) => {
      requestAnimationFrame(() => {
        if (e.isIntersecting) {
          if (smallOpenRef.current) return;
          contentsFull.current?.classList.remove('sm:hidden');
          contentsSmall.current?.classList.add('sm:hidden');
          if (window.innerWidth >= 640) {
            contentsSmall.current?.classList.remove(styles.navbarSmallRotate);
            navbarContainer.current?.classList.remove(styles.navbarContainerSmall);
          }
        } else {
          contentsFull.current?.classList.add('sm:hidden');
          contentsSmall.current?.classList.remove('sm:hidden');
          contentsSmall.current?.classList.add(styles.navbarSmallRotate);
          navbarContainer.current?.classList.add(styles.navbarContainerSmall);
        }        
      });
    });
  });


  function resizeHandler() {
    if (window.innerWidth < 640) {
      contentsSmall.current?.classList.add(styles.navbarSmallRotate);
      navbarContainer.current?.classList.add(styles.navbarContainerSmall);
    } else if (window.scrollY < 10) {
      contentsSmall.current?.classList.remove(styles.navbarSmallRotate);
      navbarContainer.current?.classList.remove(styles.navbarContainerSmall);
    }
  }


  function handleNavClick(
    e: React.MouseEvent,
    sectionName: string
  ) {
    e.preventDefault();
    if (smallOpenRef.current) {
      toggleSmallMenuOpen();
    }
    const section = sectionMap.get(sectionName);
    if (!section || !section.current) {
      throw new Error(`Navbar:handleNavClick: section ${sectionName} not found`);
    }
    section.current.scrollIntoView({ behavior: 'smooth' });
  }


  function handleSmallClick(e: MouseEvent) {
    if (!contentsSmallOpen.current) return;
    const target = e.target as HTMLElement;
    if (!contentsSmallOpen.current?.contains(target) && smallOpenRef.current) {
      toggleSmallMenuOpen();
    }
  }

  
  function toggleSmallMenuOpen() {
    requestAnimationFrame(() => {
      smallOpenRef.current = smallOpenRef.current ? false : true;
      navbarContainer.current?.classList.toggle(styles.navbarContainerSmallOpen);
      contentsSmallOpen.current?.classList.toggle('hidden');
      smallMenuBtn.current?.classList.toggle('hidden');
      if (smallOpenRef.current) {
        setTimeout(() => {
          smallMenuBackBtn.current?.classList.remove('opacity-0');
        }, 100);
        setTimeout(() => {
          document.addEventListener('click', handleSmallClick);
        }, 500);
      } else {
        smallMenuBackBtn.current?.classList.add('opacity-0');
        document.removeEventListener('click', handleSmallClick);
      }
    });
  }

  
  useEffect(() => {
    if (topAnchorBar.current && navbarContainer.current) {
      observer.observe(topAnchorBar.current);
    }
    window.addEventListener('resize', resizeHandler);
    if (window.innerWidth < 640) {
      contentsSmall.current?.classList.add(styles.navbarSmallRotate);
      navbarContainer.current?.classList.add(styles.navbarContainerSmall);
    }
  }, [])

  
  return (
  <>
  <div ref={topAnchorBar} className="absolute py-10" aria-hidden="true"></div>
  <nav 
    ref={navbarContainer}
    className={`${styles.navbar} text-gray-200 bg-stone-900 font-sourcecode bg-opacity-95`}
  >

    <nav ref={contentsFull} className="hidden sm:flex justify-center text-2xl py-2 pt-3">
      <div className="">
        <ul className="flex gap-16">
          <li>
            <NavButton
              title="About"
              clickCallback={(e) => handleNavClick(e, "about")}
            />
          </li>
          <li>
            <NavButton
              title="How"
              clickCallback={(e) => handleNavClick(e, "howitworks")}
            />
          </li>          
          <li>
            <NavButton
              title="Work"
              clickCallback={(e) => handleNavClick(e, "work")}
            />
          </li>
          <li>
            <NavButton
              title="Demos"
              clickCallback={(e) => handleNavClick(e, "demos")}
            />
          </li>
          <li>
            <NavButton
              title="Contact"
              clickCallback={(e) => handleNavClick(e, "contact")}
            />
          </li>
        </ul>
      </div>
    </nav>

    <nav ref={contentsSmall} className="">
      <button
        ref={smallMenuBtn}
        onClick={toggleSmallMenuOpen}
        type="button"
        className={`${styles.smallMenuBtn} z-50 group text-xl sm:text-2xl font-sourcecode`}
      >
        <div className="px-3 py-2 border-3 border-transparent group-hover:border-black group-hover:font-bold group-hover:scale-[115%] group-hover:text-black group-hover:bg-[#96BBBB] rounded-full transition-all duration-300 box-border">
          Menu
        </div>
      </button>
      <div 
        ref={contentsSmallOpen}
        className="hidden"
      >
        <div className="text-left">
          <button
            ref={smallMenuBackBtn}
            onClick={toggleSmallMenuOpen}
            className="ml-6 mt-4 p-4 opacity-0 transition-all duration-300 hover:scale-x-150 hover:scale-y-100 hover:rotate-[360deg] hover:text-[#EF8275]"
          >
            {'<---'}
          </button>
        </div>
        <ul className="flex flex-col items-center mt-2 mb-6 text-2xl font-sourcecode transition-all gap-2">
          <li className="fadeInLeft">
            <NavButton              
              title="Home"
              clickCallback={(e) => handleNavClick(e, "home")}
              className="py-2"
            />
          </li>
          <li className="fadeInRight">
            <NavButton              
              title="About"
              clickCallback={(e) => handleNavClick(e, "about")}
              className="py-2"
            />
          </li>
          <li className="fadeInLeft">
            <NavButton              
              title="How"
              clickCallback={(e) => handleNavClick(e, "howitworks")}
              className="py-2"
            />
          </li>          
          <li className="fadeInRight">
            <NavButton
              title="Work"
              clickCallback={(e) => handleNavClick(e, "work")}
              className="py-2"
            />
          </li>
          <li className="fadeInLeft">
            <NavButton
              title="Demos"
              clickCallback={(e) => handleNavClick(e, "demos")}
              className="py-2"
            />
          </li>
          <li className="fadeInRight">
            <NavButton
              title="Contact"
              clickCallback={(e) => handleNavClick(e, "contact")}
              className="py-2"
            />
          </li>
        </ul>       
      </div>
    </nav>
  </nav>
  </>
  )
}
