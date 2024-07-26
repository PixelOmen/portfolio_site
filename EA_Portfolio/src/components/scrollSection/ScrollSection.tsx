import React, { useEffect, useRef, useState } from "react";

import { ScrollState } from "../../lib/scrolling";
import type { IScrollObserver, IScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollObserver: IScrollObserver;
    scrollContract?: boolean;
    className?: string;
    children?: React.ReactNode;
}

export default function ScrollSection({
    scrollObserver,
    scrollContract = true,
    className = "",
    children,
}: ScrollSectionProps) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);    
    const startingScale = scrollContract ? "scale-90" : "";


    function contractOnScroll(
        _: Event,
        topRatio: number = 0.8,
        bottomRatio: number = 0.4
    ): void {
        if (!contentRef.current || !triggerRef.current) {
            throw new Error("ScrollSection:scroll listener: element not found");   
        }
        let top = triggerRef.current.getBoundingClientRect().top;
        let bottom = triggerRef.current.getBoundingClientRect().bottom;
        if (top > (window.innerHeight * topRatio) ||
        bottom < (window.innerHeight * bottomRatio)) 
        {
            contentRef.current.classList.add("p-4");
            contentRef.current.classList.add("scale-90");
            contentRef.current.classList.add("blur-sm");
            contentRef.current.classList.add("rounded-3xl");
            contentRef.current.classList.remove("scale-100");
        } else {
            contentRef.current.classList.remove("p-4");
            contentRef.current.classList.remove("scale-90");
            contentRef.current.classList.remove("blur-sm");
            contentRef.current.classList.remove("rounded-3xl");
            contentRef.current.classList.add("scale-100");
        }
    }


    function initScrollState(): IScrollState {
        const [wasTriggered, setWasTriggered] = useState(null);
        const scrollState = new ScrollState(
            scrollObserver,
            {
                value: wasTriggered,
                setFunc: setWasTriggered
            }
        )
        return scrollState
    }

    
    function modifyChildren(scrollState: IScrollState) {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                if (typeof child.type === 'string') return child;
                let props = { scrollState }
                return React.cloneElement(child, props)
            }
        });
    }
    



    const scrollState = initScrollState();

    useEffect(() => {
        scrollState.setTriggerElement(triggerRef.current);
        if (scrollContract) {
            window.addEventListener("scroll", contractOnScroll);
        }
    }, []);



  return (
    <section ref={triggerRef} className="flex justify-center">
        <div
            ref={contentRef}
            className={`${startingScale} transition-all duration-700 ease-out overflow-hidden ${className}`}
        >
            {modifyChildren(scrollState)}
        </div>
    </section>
  )
}
