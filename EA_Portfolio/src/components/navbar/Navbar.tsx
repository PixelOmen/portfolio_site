import { useEffect, useRef } from "react";
import styles from './navbar.module.css'


export default function Navbar() {
  const topAnchorBar = useRef<HTMLDivElement>(null);
  const navbarContainer = useRef<HTMLDivElement>(null);
  const observer = new IntersectionObserver((elements) => {
    elements.forEach((e) => {
      if (e.isIntersecting) {
        navbarContainer.current?.classList.remove(styles.navbarSmall);
      } else {
        navbarContainer.current?.classList.add(styles.navbarSmall);
      }
    });
  });
  
  useEffect(() => {
    if (topAnchorBar.current) {
      observer.observe(topAnchorBar.current);
    }
  }, [])

  return (
  <>
  <div ref={topAnchorBar} className="Spacer absolute w-full border border-red-600 py-10"></div>
  <div ref={navbarContainer} className={`${styles.navbar} fixed border-2 text-gray-50 p-5`}>
    <div>
      Container
    </div>
    <div>
      Test
    </div>
  </div>
  </>
  )
}
