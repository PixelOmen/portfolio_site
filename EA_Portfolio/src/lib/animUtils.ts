const classNames = [
    'fadeIn',
    'fadeInRight',
    'enterRight',
    'fadeInLeft',
    'enterLeft',
    'fadeInUp',
    'enterUp',
    'fadeInDown',
    'enterDown',
];

export function hide(element: HTMLElement) {
    element.classList.add('opacity-0');
}

export function opacityAnim(element: HTMLElement, anim: string, reset = 3000): number {
    if (!classNames.includes(anim)) {
        throw new Error("Animation not found: " + anim);
    }
    element.classList.remove(anim);
    element.classList.add(anim);
    return setTimeout(() => {
        element.classList.remove(anim);
    }, reset);
}

