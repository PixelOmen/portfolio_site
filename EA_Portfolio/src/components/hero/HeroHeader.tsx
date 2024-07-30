import { useEffect, useRef } from 'react'

export default function HeroHeader() {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        containerRef.current?.classList.add('opacity-0')
      } else {
        containerRef.current?.classList.remove('opacity-0')
      }
    });
  }, []);

  return (
    <header
      ref={containerRef}
      className="max-w-max text-5xl sm:text-6xl justify-center text-center mx-auto transition-all duration-700 ease-out"
    >
      <span className="text-[#EF8275] font-medium">
        Emmanuel Acosta
      </span>
      <div className="font-roboto font-thin">Full-Stack Developer</div>
      <div className="text-[6pt] sm:text-[8pt] mt-2">(but mostly back-end &#x1F601;)</div>
    </header>
  )
}
