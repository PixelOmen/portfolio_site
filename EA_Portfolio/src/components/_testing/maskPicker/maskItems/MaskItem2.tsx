import { useEffect, useRef } from "react"

import styles from './maskItem.module.css'


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

  useEffect(() => {
    if (isOpen) {
      // console.log(parentRef?.current);
    } else {
      console.log(pickerRef?.current?.offsetHeight);
      if (!container?.current) return;
      if (!pickerRef?.current) return;
      // container.current.style.height = String(pickerRef.current.offsetHeight);
    }
  }, [isOpen])

  return (
    <div className={`border-2 border-red-500 ${className}`}>
      <div ref={container} className={`border-4 border-yellow-500 `}>
        <div className="border-2 border-green-500">
          <h1 className="mb-[200px]">Mask Item 2</h1>
          <button onClick={closeMask}>Close</button>
        </div>
      </div>
    </div>
  )
}
