import { useEffect, useRef } from "react";
import type { ScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollY: ScrollState;
    onInit: (value: any) => void;
    children?: React.ReactNode;
}

export default function ScrollSection({scrollY, onInit, children}: ScrollSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollY.settriggerElement(sectionRef.current);
        scrollY.setContentElement(contentRef.current);
        onInit((prev: number) => prev + 1);
    }, [])
  return (
    <section ref={sectionRef} className="h-[1000px] mt-2 bg-slate-600 overflow-hidden">
        <div ref={contentRef} className="hidden fadeInUp">
            {children}
        </div>
    </section>
  )
}
