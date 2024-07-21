import { useEffect, useRef, useState } from "react";
import { ScrollState, IAnimHandler } from "../../lib/scrolling";

interface ScrollSectionProps {
    animHandler: IAnimHandler;
    classNameProp?: string;
    children?: React.ReactNode;
}

export default function ScrollSection({
    animHandler,
    classNameProp = "",
    children,
}: ScrollSectionProps) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function contractOnScroll
    (
        _: Event,
        topRatio: number = 0.95,
        bottomRatio: number = 0.4
    ): void
    {
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

    const [wasTriggered, setWasTriggered] = useState(null);
    const PortWasTriggered = {
        value: wasTriggered,
        setFunc: setWasTriggered
    }
    const scrollState = new ScrollState(
        animHandler, PortWasTriggered
    )

    useEffect(() => {
        scrollState.setTriggerElement(triggerRef.current);
        window.addEventListener("scroll", contractOnScroll);
    }, [])

    useEffect(() => {
        console.log(scrollState.wasTriggered)
    }, [scrollState.wasTriggered])

    
  return (
    <section ref={triggerRef} className="flex justify-center">
        <div />
        <div
            ref={contentRef}
            className={`mx-2 max-w-[2000px] scale-75 transition-all rounded-2xl duration-700 ease-out overflow-hidden ${classNameProp}`}
        >
            {children}
        </div>
    </section>
  )
}
