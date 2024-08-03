import { useEffect, useRef, useState } from "react";

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

  const [smallOpen, setSmallOpen] = useState(false);

  const observer = new IntersectionObserver((elements) => {
    elements.forEach((e) => {
      if (e.isIntersecting) {
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
    const ref = sectionMap.get(sectionName);
    if (!ref || !ref.current) {
      throw new Error(`Navbar:handleNavClick: section ${sectionName} not found`);
    }
    ref.current.scrollIntoView({ behavior: 'smooth' });
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
    className={`${styles.navbar} text-gray-200 bg-stone-900 bg-opacity-90 font-sourcecode`}
  >

    <nav ref={contentsFull} className="hidden sm:flex text-xl sm:text-3xl py-4">
      <div className="ml-auto mr-auto sm:mr-[8%]">
        <ul className="flex gap-5 sm:gap-10">
          <li>
            <NavButton
              title="About"
              clickCallback={(e) => handleNavClick(e, "about")}
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
        type="button"
        className={`${styles.smallMenuBtn} z-50 group text-xl sm:text-2xl rounded-full font-sourcecode p-2 px-4 hover:bg-[#b9f5f5]`}
      >
        <span className="group-hover:text-black">
          Menu
        </span>
      </button>
    </nav>
  </nav>
  </>
  )
}
