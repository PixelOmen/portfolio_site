import { useState } from "react";

export interface ScrollState {
    triggerElement: HTMLElement | null;
    settriggerElement: (value: any) => void;
    contentElement: HTMLElement | null;
    setContentElement: (value: any) => void;
}

export function sectionScrollStates(amount = 1) : ScrollState[] {
    const scrollStates: ScrollState[] = [];
    for (let i = 0; i < amount; i++) {
        const [triggerElement, setTriggerElement] = useState(null);
        const [contentElement, setContentElement] = useState(null);
        const scrollState: ScrollState = {
            triggerElement: triggerElement,
            settriggerElement: setTriggerElement,
            contentElement: contentElement,
            setContentElement: setContentElement
        }
        scrollStates.push(scrollState);
    }
    return scrollStates;
}

export function scrollObserve(scrollStates: ScrollState[]): void {
    const triggerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {

            let element = entry.target as HTMLElement;
            let state = scrollStates.find((e) => e.triggerElement === element);
            if (!state) throw new Error("Element not found in scrollStates");
            let contentElement = state.contentElement;
            if (!contentElement) throw new Error("Content Element is null");

            if (entry.isIntersecting) {
                contentElement.classList.remove('hidden')                    
            } else {
                contentElement.classList.add('hidden')
            }
        })
    });

    scrollStates.forEach((state) => {
        if (state.triggerElement) {
            triggerObserver.observe(state.triggerElement);
        } else {
            console.error("Scroll Element is null");
        }
    });
}
