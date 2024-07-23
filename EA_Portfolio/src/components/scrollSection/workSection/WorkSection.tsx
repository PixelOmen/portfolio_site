import { useEffect, useState, useRef } from "react"

import type { IScrollState } from "../../../lib/scrolling";


interface WorkSectionProps {
  scrollState?: IScrollState;
}

export default function WorkSection({ scrollState }: WorkSectionProps) {

  var [animTimer, setAnimTimer] = useState(-1);
  var [resetComplete, setResetComplete] = useState(true);
  var [opacityResetElems, setOpacityResetElems] = useState<HTMLElement[]>([]);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollState?.handleAnims(contentRef.current,
      {
        value: opacityResetElems,
        setFunc: setOpacityResetElems
      },
      {
        value: animTimer,
        setFunc: setAnimTimer
      },
      {
        value: resetComplete,
        setFunc: setResetComplete
      }
    )
  }, [scrollState?.wasTriggered]);

  return (
    <div className="shapeHolder min-h-[500px]">
      <div className="h-full">
        <div ref={contentRef} className="flex fadeIn justify-center">
          <ul className="text-2xl border-2">
            <li className="casc-fadeInLeft opacity-0">test</li>
            <li className="casc-fadeInRight opacity-0">test</li>
            <li>test</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
