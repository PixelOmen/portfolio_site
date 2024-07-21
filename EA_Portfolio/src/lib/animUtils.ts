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

export function cascadeAnim(
    parent: HTMLElement | null,
    delay = 100,
    prefix: string = 'casc',
    opacityResetElems: HTMLElement[] = []
): HTMLElement[]
{
    if (!parent) return [];
    let classArray = Array.from(parent.classList)
    let classIndex = classArray.findIndex((className) => className.includes(prefix));
    if (classIndex > -1) {
        let animName = classArray[classIndex].split('-')[1];
        opacityResetElems.push(parent);
        setTimeout(() => {
            enterAnim(parent, animName);
            parent.classList.remove('opacity-0');
        }, delay);
    }
    Array.from(parent.children).forEach((element, index) => {
        cascadeAnim(element as HTMLElement, (index + 1) * delay, prefix, opacityResetElems);
    });
    return opacityResetElems;
}

export function enterAnim(
    element: HTMLElement, anim: string, reset = 3000
): number
{
    if (!classNames.includes(anim)) {
        throw new Error("Animation not found: " + anim);
    }
    element.classList.remove(anim);
    element.classList.add(anim);
    return setTimeout(() => {
        element.classList.remove(anim);
    }, reset);
}

