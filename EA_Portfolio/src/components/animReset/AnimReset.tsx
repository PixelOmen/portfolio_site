import { useEffect, useState, useRef } from "react"

import * as animUtils from "../../lib/animUtils";


interface AnimResetProps {
  active?: boolean;
  cascadeDelay?: number;
  deActivateDelay?: number;
  resetDelay?: number;
  hideOnStart?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AnimReset({
  active = true,
  cascadeDelay = 200,
  deActivateDelay = 300,
  resetDelay = 500,
  hideOnStart = false,
  className = '',
  children
}: AnimResetProps) {

  const animDebounce = useRef<number>(-1);
  const [resetComplete, setResetComplete] = useState(true);
  const [opacityResetElems, setOpacityResetElems] = useState<HTMLElement[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  function handleAnims(active: boolean) {
    if (active) {
      clearTimeout(animDebounce.current);
      if (resetComplete) {
        setResetComplete(false);
        setOpacityResetElems(startAnims(contentRef.current));
      }
    } else {
      clearTimeout(animDebounce.current);
      animDebounce.current = setTimeout(() => {
          reset(opacityResetElems);
          setResetComplete(true);
      }, deActivateDelay)
    }
  }

  function startAnims(parent: HTMLElement | null): HTMLElement[] {
    return animUtils.cascadeAnim(parent, cascadeDelay, [], {resetDelay: resetDelay});
  }

  function reset(opacityResetElems: HTMLElement[]): void {
    opacityResetElems.forEach((element) => {
      element.classList.add('opacity-0');
    });
  }

  useEffect(() => {
    if (hideOnStart) {
      requestAnimationFrame(() => {
        animUtils.cascadeAnim(contentRef.current, 0, [], {hideOnly: true});
      });
    }
  }, []);

  useEffect(() => {
    handleAnims(active);    
  }, [active]);

  return (
    <div
      ref={contentRef}
      data-animrecurse = {true}
      className={`${className}`}
    >
      {children}
    </div>
  )
}
