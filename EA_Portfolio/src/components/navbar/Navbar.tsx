import { useEffect, useRef } from "react";
import styles from './navbar.module.css'


export default function Navbar() {
  const topAnchorBar = useRef<HTMLDivElement>(null);
  const navbarContainer = useRef<HTMLDivElement>(null);
  const contentsFull = useRef<HTMLDivElement>(null);
  const contentsSmall = useRef<HTMLDivElement>(null);
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
  
  useEffect(() => {
    if (topAnchorBar.current && navbarContainer.current) {
      observer.observe(topAnchorBar.current);
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < 640) {
        contentsSmall.current?.classList.add(styles.navbarSmallRotate);
        navbarContainer.current?.classList.add(styles.navbarContainerSmall);
      } else if (window.scrollY < 10) {
        contentsSmall.current?.classList.remove(styles.navbarSmallRotate);
        navbarContainer.current?.classList.remove(styles.navbarContainerSmall);
      }
    });
  }, [])

  return (
  <>
  <div ref={topAnchorBar} className="Spacer absolute py-10" aria-hidden="true"></div>
  <nav 
    ref={navbarContainer}
    className={`${styles.navbar} sm:${styles.navbarContainerSmall} text-gray-200 bg-stone-900 bg-opacity-90 font-sourcecode`}
  >

    <div ref={contentsFull} className="hidden sm:flex text-xl sm:text-3xl py-4 font-bold">
      <header className="ml-auto mr-auto sm:mr-[10%]">
        <ul className="flex gap-5 sm:gap-10">
          <li><a href="#navWork" className={styles.navLinks}>Work</a></li>
          <li><a href="#navResume" className={styles.navLinks}>Demos</a></li>
          <li><a href="#navContact" className={styles.navLinks}>Contact</a></li>
        </ul>
      </header>
    </div>

    <div ref={contentsSmall} className="">
      <button
        type="button"
        className={`${styles.smallMenuBtn} z-50 group text-xl sm:text-2xl rounded-full font-bold p-2 px-4 hover:bg-[#b9f5f5]`}
      >
        <span className="group-hover:text-black">
          Menu
        </span>
      </button>
    </div>
  </nav>
  </>
  )
}
