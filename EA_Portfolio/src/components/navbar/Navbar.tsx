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
        contentsFull.current?.classList.remove('hidden');
        contentsSmall.current?.classList.add('hidden');
        contentsSmall.current?.classList.remove(styles.navbarSmallRotate);
        navbarContainer.current?.classList.remove(styles.navbarSmall);
      } else {
        contentsFull.current?.classList.add('hidden');
        contentsSmall.current?.classList.remove('hidden');
        contentsSmall.current?.classList.add(styles.navbarSmallRotate);
        navbarContainer.current?.classList.add(styles.navbarSmall);
      }
    });
  });
  
  useEffect(() => {
    if (topAnchorBar.current && navbarContainer.current) {
      observer.observe(topAnchorBar.current);
    }
  }, [])

  return (
  <>
  {/* <div ref={topAnchorBar} className="Spacer absolute w-full border border-red-600 py-10"></div> */}
  <div ref={topAnchorBar} className="Spacer absolute py-10" aria-hidden="true"></div>
  <nav ref={navbarContainer}
    className={`${styles.navbar} text-gray-50 p-4 bg-stone-900 bg-opacity-90`}
  >
    <div ref={contentsFull} className="flex justify-between text-2xl font-bold">
      Emmanuel Acosta
    </div>
    <div ref={contentsSmall} className="text-2xl font-bold hidden p-4">
      X
    </div>
  </nav>
  </>
  )
}
