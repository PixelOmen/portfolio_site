type PortableState = {
    value: any,
    setFunc: (value: any) => void
}

export interface IScrollState {
    wasTriggered: PortableState;
    triggerElement: HTMLElement | null;
    setTriggerElement: (e: HTMLElement | null) => void;
}

export interface IAnimHandler {
    observe: (state: IScrollState) => void;
}

export class ScrollState implements IScrollState {
    triggerElement: HTMLElement | null = null;
    wasTriggered: PortableState;
    private animHandler: IAnimHandler

    constructor(animHandler: IAnimHandler, wasTriggered: PortableState) {
        this.animHandler = animHandler;
        this.wasTriggered = wasTriggered;
    }
    
    setTriggerElement(element: HTMLElement | null) {
        this.triggerElement = element;
        this.animHandler.observe(this);
    }
}


// private resetTimerID: number;
// private setResetTimerID: (value: number) => void;
// [this.resetTimerID, this.setResetTimerID] = useState(-1);

export class ScrollAnimHandler implements IAnimHandler {
    private _scrollStates: IScrollState[] = [];
    private _observer: IntersectionObserver;

    constructor() {
        this._observer = this._createObserver();
    }

    observe(state: IScrollState): void {
        let element = this._validateState(state);
        this._scrollStates.push(state);
        this._observer.observe(element);
    }

    private _validateState(state: IScrollState): HTMLElement {
        if (!state.triggerElement) {
            throw new Error("Scroll Trigger element is null");
        }
        let exists = this._scrollStates.some((s) => {
            s.triggerElement === state.triggerElement;
        });
        if (exists) {
            console.error(state.triggerElement);
            throw new Error("Scroll Trigger element already observed");
        }
        return state.triggerElement;
    }

    private _createObserver(): IntersectionObserver {
        return new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                let element = entry.target as HTMLElement;
                let state = this._scrollStates.find((e) => e.triggerElement === element);
                if (!state) throw new Error("Element not found in scrollStates");

                if (entry.isIntersecting) {
                    state.wasTriggered.setFunc(true);
                } else {
                    state.wasTriggered.setFunc(false);
                }
            });
        });
    }
}

// export function sectionScrollStates(amount = 1) : ScrollState[] {
//     const scrollStates: ScrollState[] = [];
//     for (let i = 0; i < amount; i++) {
//         const [triggerElement, setTriggerElement] = useState(null);
//         const [wasTriggered, setWasTriggered] = useState(false);
//         const scrollState: ScrollState = {
//             triggerElement: triggerElement,
//             setTriggerElement: setTriggerElement,
//             wasTriggered: wasTriggered,
//             setWasTriggered: setWasTriggered
//         }
//         scrollStates.push(scrollState);
//     }
//     return scrollStates;
// }

// export function scrollObserve(scrollStates: ScrollState[]): void {

//     const triggerObserver = new IntersectionObserver((entries) => {

//         entries.forEach((entry) => {
//             let element = entry.target as HTMLElement;
//             let state = scrollStates.find((e) => e.triggerElement === element);
//             if (!state) throw new Error("Element not found in scrollStates");

//             if (entry.isIntersecting) {
//                 state.setWasTriggered(true);
//             } else {
//                 state.setWasTriggered(false);
//             }
//         });

//     });

//     scrollStates.forEach((state) => {
//         if (state.triggerElement) {
//             triggerObserver.observe(state.triggerElement);
//         } else {
//             console.error("Scroll Element is null");
//         }
//     });

// }
