import { useEffect, useRef, useState } from "react";


interface MaskItemProps {
  className?: string
  isOpen?: boolean
  pickerRef?: React.RefObject<HTMLDivElement>
  closeMask?: () => void
  children?: React.ReactNode
}

export default function MaskItem({
  className, isOpen, pickerRef, closeMask
}: MaskItemProps) {

  const container = useRef<HTMLDivElement>(null)
  const [originalParentHeight, setOriginalParentHeight] = useState<number>(0);

  useEffect(() => {
    if (!pickerRef || !pickerRef.current) return;
    setOriginalParentHeight(pickerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (!originalParentHeight) {
        throw new Error("MaskItem: parent height not found");
      };
      if (!container?.current) return;
      if (!pickerRef?.current) return;
      // container.current.style.maxHeight = String(pickerRef.current.offsetHeight);
      // container.current.classList.remove("max-h-40", "max-w-40");
    } else {
      if (!originalParentHeight) return;
      if (!container?.current) return;
      if (!pickerRef?.current) return;
    }
  }, [isOpen])

  return (
    <div className={`border-2 border-red-500 ${className}`}>
      <div ref={container} className={`border-4 border-yellow-500`}>
        <div className="border-2 border-green-500">
          <h1 className="mb-[200px]">Mask Item</h1>
          <button onClick={closeMask}>Close</button>
        </div>
      </div>
    </div>
  )
}
