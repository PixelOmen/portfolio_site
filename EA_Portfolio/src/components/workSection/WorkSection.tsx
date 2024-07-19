import { useEffect, useState } from "react"

interface WorkSectionProps {
  startAnim: boolean;
}

export default function WorkSection({startAnim}: WorkSectionProps) {

  var [animTimerID, setAnimTimerID] = useState(-1);
  var [init, setInit] = useState(true);

  useEffect(() => {
    if (startAnim) {
      clearTimeout(animTimerID);
      console.log("Animation Started");
    } else {
      if (init) {
        setInit(false);
        return;
      }
      clearTimeout(animTimerID);
      setAnimTimerID(
        setTimeout(() => {
          console.log("Cleanup/Reset Animation");
        }, 1000)
      );
    }
  }, [startAnim])

  return (
    <div className="h-[500px] bg-blue-300">
      <div className="flex justify-center ">
      <ul className="text-2xl">
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ul>
      </div>
      <div className="flex flex-col justify-end h-full">
        <div className="relative border-4 bottom-24">Bottom</div>
      </div>
    </div>
  )
}
