import { useEffect, useState, useRef } from "react"

import * as animUtils from "../../lib/animUtils";


interface AnimResetProps {
  active?: boolean;
  resetDelay?: number;
  children?: React.ReactNode;
}

export default function AnimReset({
  active = true,
  resetDelay = 500,
  children
}: AnimResetProps) {

  const [animTimer, setAnimTimer] = useState(-1);
  const [resetComplete, setResetComplete] = useState(true);
  const [opacityResetElems, setOpacityResetElems] = useState<HTMLElement[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  function handleAnims(active: boolean) {
    if (active) {
      clearTimeout(animTimer);
      if (resetComplete) {
        setResetComplete(false);
        setOpacityResetElems(startAnims(contentRef.current));
      }
    } else {
      clearTimeout(animTimer);
      setAnimTimer(
        setTimeout(() => {
          setResetComplete(true);
          reset(opacityResetElems);
        }, resetDelay)
      );
    }
  }

  function startAnims(parent: HTMLElement | null): HTMLElement[] {
    return animUtils.cascadeAnim(parent, 500);
  }

  function reset(opacityResetElems: HTMLElement[]): void {
    opacityResetElems.forEach((element) => {
      element.classList.add('opacity-0');
    });
  }

  useEffect(() => {
    handleAnims(active);
  }, [active]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  )
}
