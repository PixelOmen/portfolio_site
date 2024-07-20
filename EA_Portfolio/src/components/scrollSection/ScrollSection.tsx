import { useEffect, useRef } from "react";
import type { ScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollY: ScrollState;
    onInit: (value: any) => void;
    classNameProp?: string;
    children?: React.ReactNode;
}

export default function ScrollSection({
    scrollY,
    onInit,
    classNameProp = "",
    children,
}: ScrollSectionProps) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);


    function contractOnScroll(
        _: Event, topRatio: number = 0.95, bottomRatio: number = 0.4
    ) {
        if (!contentRef.current || !triggerRef.current) {
            throw new Error("ScrollSection:scroll listener: element not found");   
        }
        let top = triggerRef.current.getBoundingClientRect().top;
        let bottom = triggerRef.current.getBoundingClientRect().bottom;
        if (top > (window.innerHeight * topRatio) ||
        bottom < (window.innerHeight * bottomRatio)) 
        {
            contentRef.current.classList.add("scale-75");
            contentRef.current.classList.remove("scale-100");
        } else {
            contentRef.current.classList.remove("scale-75");
            contentRef.current.classList.add("scale-100");
        }
    }

    useEffect(() => {
        scrollY.settriggerElement(triggerRef.current);
        scrollY.setContentElement(contentRef.current);
        onInit((prev: number) => prev + 1);
        window.addEventListener("scroll", contractOnScroll);
    }, [])

  return (
    <section ref={triggerRef} className="flex justify-center">
        <div />
        <div
            ref={contentRef}
            className={`mx-10 max-w-[2000px] scale-75 transition-all scal rounded-2xl duration-700 ease-out overflow-hidden ${classNameProp}`}
        >
            {children}
        </div>
    </section>
  )
}
