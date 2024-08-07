import React, { useEffect, useRef, useState, forwardRef } from "react";

import { ScrollState } from "../../lib/scrolling";
import type { IScrollObserver, IScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    scrollObserver: IScrollObserver;
    scrollContract?: boolean;
    className?: string;
    triggerBoxClassName?: string;
    children?: React.ReactNode;
}

export default forwardRef(ScrollSection)

function ScrollSection(
    {
        scrollObserver,
        scrollContract = true,
        className = "",
        triggerBoxClassName = "",
        children,
    }: ScrollSectionProps,
    externalRef: React.Ref<HTMLDivElement>
) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);    
    const startingScale = scrollContract ? "scale-95" : "";

    function contractOnScroll(
        _: Event,
        topRatio: number = 0.7,
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
            contentRef.current.classList.add(startingScale);
            contentRef.current.classList.add("blur-sm");
            contentRef.current.classList.add("rounded-3xl");
            contentRef.current.classList.remove("scale-100");
        } else {
            contentRef.current.classList.remove(startingScale);
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
    <section ref={triggerRef} className={`flex justify-center ${triggerBoxClassName}`}>
        <div ref={externalRef}></div>
        <div
            ref={contentRef}
            className={`${startingScale} transition-all duration-700 ease-out overflow-hidden ${className}`}
        >
            {modifyChildren(scrollState)}
        </div>
    </section>
  )
}
