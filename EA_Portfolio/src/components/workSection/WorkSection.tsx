import { useEffect, useState, useRef } from "react"
import * as animUtils from "../../lib/animUtils";

interface WorkSectionProps {
  startAnim: boolean;
}

export default function WorkSection({startAnim}: WorkSectionProps) {

  var [resetTimerID, setResetTimerID] = useState(-1);
  var [init, setInit] = useState(false);
  var [opacityResetElems, setOpacityResetElems] = useState<HTMLElement[]>([]);

  const container = useRef<HTMLDivElement>(null);
  const testRef = useRef<HTMLDivElement>(null);

  function componentAnims() {
    if (!container.current) return;
    container.current.classList.remove('hidden');
    setInit(true);
    let opacityResetElems = animUtils.cascadeAnim(testRef.current, 500)
    setOpacityResetElems(opacityResetElems);
  }

  function reset() {
    if (!container.current) return;
    container.current.classList.add('hidden');
    opacityResetElems.forEach((element) => {
      element.classList.add('opacity-0');
    });
    setInit(false);
  }

  useEffect(() => {
    if (startAnim) {
      clearTimeout(resetTimerID);
      if (!init) {
        componentAnims();
      }
    } else {
      clearTimeout(resetTimerID);
      setResetTimerID(
        setTimeout(() => {
          reset();
        }, 1000)
      );
    }
  }, [startAnim])

  return (
    <div className="shapeHolder h-[500px]">
      <div ref={container} className="hidden h-full fadeIn border-2 border-red-500">
        <div ref={testRef} className="flex fadeIn justify-center">
          <ul className="text-2xl border-2">
            <li className="casc-fadeInLeft opacity-0">test</li>
            <li className="casc-fadeInRight opacity-0">test</li>
            <li>test</li>
          </ul>
        </div>
        <div className="border-4 enterLeft">Bottom</div>
      </div>
    </div>
  )
}
