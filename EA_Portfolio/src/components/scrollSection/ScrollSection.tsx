import React, { useEffect, useRef, useState } from "react";
import { ScrollState } from "../../lib/scrolling";
import type { IScrollObserver, IScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollObserver: IScrollObserver;
    classNameProp?: string;
    children?: React.ReactNode;
}

export default function ScrollSection({
    scrollObserver,
    classNameProp = "",
    children,
}: ScrollSectionProps) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    function contractOnScroll(
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

    function initScrollState(): IScrollState {
        const [wasTriggered, setWasTriggered] = useState(null);
        const scrollState = new ScrollState(
            scrollObserver,
            {
                value: wasTriggered,
                setFunc: setWasTriggered
            }
        )
        useEffect(() => {
            scrollState.setTriggerElement(triggerRef.current);
            window.addEventListener("scroll", contractOnScroll);
        }, [])
        return scrollState
    }

    function modifyChildren(scrollState: IScrollState) {
        const scrollChildren = React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                if (typeof child.type === 'string') return child;
                let props = { scrollState }
                return React.cloneElement(child, props)
            }
        });
        return scrollChildren;
    }

    const scrollState = initScrollState();

    // useEffect(() => {
    //     console.log(scrollState.wasTriggered)
    // }, [scrollState.wasTriggered])
    

    
  return (
    <section ref={triggerRef} className="flex justify-center">
        <div />
        <div
            ref={contentRef}
            className={`mx-2 max-w-[2000px] scale-75 transition-all rounded-2xl duration-700 ease-out overflow-hidden ${classNameProp}`}
        >
            {modifyChildren(scrollState)}
        </div>
    </section>
  )
}
