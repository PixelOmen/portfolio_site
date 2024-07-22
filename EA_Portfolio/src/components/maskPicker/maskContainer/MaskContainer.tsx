import React, { useRef, useState } from "react";
import styles from './maskContainer.module.css';

interface MaskContainerProps {
  pickerRef?: React.RefObject<HTMLDivElement>
  children?: React.ReactNode
}

export default function MaskContainer({ pickerRef, children }: MaskContainerProps) {

  const maskElem = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openMask() {
    if (isOpen || !maskElem.current) return;
    maskElem.current.classList.remove(styles.maskCovered);
    maskElem.current.classList.add(styles.maskUncovered);
    maskElem.current.style.height = '400px';
    maskElem.current.style.width = '400px';
    setIsOpen(true);
  }

  function closeMask() {
    if (!maskElem.current) return;
    maskElem.current.classList.remove(styles.maskUncovered);
    maskElem.current.classList.add(styles.maskCovered);
    maskElem.current.style.height = '200px';
    maskElem.current.style.width = '200px';
    setIsOpen(false);
  }

  function modifyChildren() {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
          if (typeof child.type === 'string') return child;
          let props = { closeMask, isOpen, pickerRef };
          return React.cloneElement(child, props);
      }
    });
  }

  return (
    <div className="border-2">
      <div
        ref={maskElem}
        className={`relative bg-blue-400 ${styles.maskCovered}`}
        onClick={openMask}
      >
        {modifyChildren()}
      </div>
    </div>
  )
}
