import { useEffect, useRef } from "react";
import styles from "./loadingScreen.module.css";

interface AppLoadingProps {
  className?: string;
}

export default function AppLoading( { className = "" }: AppLoadingProps ) {

  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      container.current?.classList.add("-translate-y-full");
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 50)
    }, 2000)
  }, []);


  return (
    <div 
      ref={container}
      className={`fixed h-screen w-screen top-0 right-0 flex flex-col justify-center items-center bg-[#111827] transition-all duration-500 ${className}`}
    >
      <div className="animate-spin border-2 rounded-full border-dotted h-4 w-4"></div>
      <div className="p-4 flex">
        Just a second...
      </div>
      <div className={`h-5 w-64 border-2 border-black rounded-lg bg-gray-400 ${styles.loadingBarContainer}`}>
        <div className={`h-full w-0 bg-green-600 rounded-lg ${styles.loadingBar}`}></div>
      </div>
      <div className={`${styles.fingerPulse}`}>
        &nbsp;&nbsp;&#128296;
      </div>
    </div>
  )
}
