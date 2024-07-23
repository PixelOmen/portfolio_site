import { useEffect, useState, useRef } from "react"

import * as animUtils from "../../lib/animUtils";


interface WorkSectionProps {
  active?: boolean;
  children?: React.ReactNode;
}

export default function WorkSection({ active = true, children }: WorkSectionProps) {

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
        }, 1000)
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
