import React, { useEffect, useRef, useState, forwardRef } from "react";

import { ScrollState } from "../../lib/scrolling";
import { IScrollObserver, IScrollState } from "../../lib/scrolling";

interface ScrollSectionProps {
    name: string;
    scrollObserver: IScrollObserver;
    scrollContract?: boolean;
    className?: string;
    triggerBoxClassName?: string;
    topRatio?: number;
    bottomRatio?: number;
    children?: React.ReactNode;
}

export default forwardRef(ScrollSection)

function ScrollSection(
    {
        name,
        scrollObserver,
        scrollContract = true,
        className = "",
        triggerBoxClassName = "",
        topRatio = 0.7,
        bottomRatio= 0.4,        
        children,
    }: ScrollSectionProps,
    externalRef: React.Ref<HTMLDivElement>
) {

    const triggerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<boolean>(false);
    const startingScale = scrollContract ? "scale-95" : "";

    function contractOnScroll(
        _: Event,
        ratioTop: number = topRatio,
        ratioBottom: number = bottomRatio
    ): void {
        if (!contentRef.current || !triggerRef.current) {
            throw new Error("ScrollSection:scroll listener: element not found");   
        }
        let top = triggerRef.current.getBoundingClientRect().top;
        let bottom = triggerRef.current.getBoundingClientRect().bottom;
        if (top > (window.innerHeight * ratioTop) ||
        bottom < (window.innerHeight * ratioBottom))
        {
            if (!activeRef.current) return
            activeRef.current = false;
            if (name == "contact") {
                history.replaceState({"backScroll": name}, "", `/demos`);
            }
            if (!scrollContract) return;
            contentRef.current.classList.add(startingScale);
            contentRef.current.classList.add("blur-sm");
            contentRef.current.classList.remove("scale-100");
        } else {
            if (activeRef.current) return;
            activeRef.current = true;
            const path = name == "home" ? "" : name;
            history.replaceState({"backScroll": name}, "", `/${path}`);
            if (!scrollContract) return;
            contentRef.current.classList.remove(startingScale);
            contentRef.current.classList.remove("blur-sm");
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
    

    // Init before render
    const scrollState = initScrollState();


    useEffect(() => {
        scrollState.setTriggerElement(triggerRef.current);
        window.addEventListener("scroll", contractOnScroll);
    }, []);



  return (
    <section ref={triggerRef} className={`flex justify-center ${triggerBoxClassName}`}>
        <div ref={externalRef} data-section={name}/>
        <div
            ref={contentRef}
            className={`${startingScale} transition-all duration-700 ease-out overflow-hidden ${className}`}
        >
            {modifyChildren(scrollState)}
        </div>
    </section>
  )
}
