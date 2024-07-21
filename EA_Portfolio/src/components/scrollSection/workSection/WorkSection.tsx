import { useEffect, useState, useRef } from "react"

import type { IScrollState } from "../../../lib/scrolling";

// import ImgCarousel from "../../ui/images/ImgCarousel";
// import testImage1 from "../../../assets/testImage1.png";
// import testImage2 from "../../../assets/testImage2.png";


interface WorkSectionProps {
  scrollState?: IScrollState;
}

export default function WorkSection({
  scrollState
}: WorkSectionProps) {
  var [opacityResetElems, setOpacityResetElems] = useState<HTMLElement[]>([]);

  const container = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollState?.handleAnims(testRef.current, {
      value: opacityResetElems,
      setFunc: setOpacityResetElems
    })
  }, [scrollState?.wasTriggered]);

  return (
    <div className="shapeHolder min-h-[500px]">
      <div ref={container} className="h-full">
        <div ref={testRef} className="flex fadeIn justify-center">
          <ul className="text-2xl border-2">
            <li className="casc-fadeInLeft opacity-0">test</li>
            <li className="casc-fadeInRight opacity-0">test</li>
            <li>test</li>
          </ul>
        </div>
        {/* <div className="flex justify-center gap-3">
          <ImgCarousel 
            imgURLs={[testImage1, testImage2, testImage1]}
            className="border-8 rounded-3xl border-slate-700"
          />
        </div> */}
      </div>
    </div>
  )
}
