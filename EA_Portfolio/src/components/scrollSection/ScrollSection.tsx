import { useEffect, useRef } from "react";
import type { ScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollY: ScrollState;
    onInit: (value: any) => void;
    children?: React.ReactNode;
}

export default function ScrollSection({scrollY, onInit, children}: ScrollSectionProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollY.settriggerElement(triggerRef.current);
        scrollY.setContentElement(contentRef.current);
        onInit((prev: number) => prev + 1);
    }, [])

  return (
    <section ref={triggerRef} className="mt-20 border-2 border-red-500">
        <div />
        <div ref={contentRef}>
            {children}
        </div>
    </section>
  )
}
