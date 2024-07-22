import React, { useRef, useState, useEffect } from "react"
import styles from './testcomp.module.css'

interface TestComponentProps {
  children?: React.ReactNode
}

export default function TestComponent({ children }: TestComponentProps) {

  const maskElem = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  function openMask() {
    if (isOpen || !maskElem.current) return;
    maskElem.current.classList.add(styles.testCovered);
    maskElem.current.classList.remove(styles.test);
    setIsOpen(true);
  }

  function closeMask() {
    if (!maskElem.current) return;
    maskElem.current.classList.remove(styles.testCovered);
    maskElem.current.classList.add(styles.test);
    setIsOpen(false);
    console.log('closed')
  }

  function modifyChildren() {
    const scrollChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            if (typeof child.type === 'string') return child;
            let props = { closeMask }
            return React.cloneElement(child, props)
        }
    });
    return scrollChildren;
}

  useEffect(() => {
  }, [])

  return (
    <div className="border-2">
      <div
        ref={maskElem}
        className={`relative w-full bg-red-400 ${styles.test}`}
        onClick={openMask}
      >
        {modifyChildren()}
      </div>
    </div>
  )
}
