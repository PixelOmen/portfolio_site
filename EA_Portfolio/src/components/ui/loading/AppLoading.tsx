import { useEffect, useRef } from "react";

interface AppLoadingProps {
  className?: string;
}

export default function AppLoading( { className = "" }: AppLoadingProps ) {

  const container = useRef<HTMLDivElement>(null);
  const translateDuration = 500;

  useEffect(() => {
    setTimeout(() => {
      container.current?.classList.add("-translate-y-full");
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 50)
    }, 1000)
  }, []);


  return (
    <div 
      ref={container}
      className={`fixed h-screen w-screen top-0 right-0 flex justify-center items-center bg-slate-800 transition-all duration-${translateDuration} ${className}`}
    >
      <div className="">&#x261D; Just a second...</div>
    </div>
  )
}
