import { useEffect, useState, useRef } from "react"

import * as animUtils from "../../lib/animUtils";


interface AnimResetProps {
  active?: boolean;
  cascadeDelay?: number;
  deActivateDelay?: number;
  resetDelay?: number;
  children?: React.ReactNode;
}

export default function AnimReset({
  active = true,
  cascadeDelay = 200,
  deActivateDelay = 300,
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
        }, deActivateDelay)
      );
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
    handleAnims(active);
  }, [active]);

  return (
    <div ref={contentRef}>
      {children}
    </div>
  )
}
