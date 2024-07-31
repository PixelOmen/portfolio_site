import { useEffect, useRef } from "react";

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
    }, 1000)
  }, []);


  return (
    <div 
      ref={container}
      className={`fixed h-screen w-screen top-0 right-0 flex justify-center items-center bg-[#111827] transition-all duration-500 ${className}`}
    >
      <div className="">&#x261D; Just a second...</div>
    </div>
  )
}
