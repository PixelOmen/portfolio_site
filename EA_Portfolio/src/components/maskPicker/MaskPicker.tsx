import React, { useState, useEffect, useRef } from 'react';

interface MaskPickerProps {
  children?: React.ReactNode
}

export default function MaskPicker({ children }: MaskPickerProps) {

  const [childrenState, setChildrenState] = useState<React.ReactNode | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  function modifyChildren() {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (typeof child.type === 'string') return child;
        let props = { pickerRef };
        return React.cloneElement(child, props);
      }
    });
  }

  useEffect(() => {
    setChildrenState(modifyChildren());
  }, []);

  return (
    <div
      ref={pickerRef}
      className="flex justify-center border-2 border-black transition-all bg-slate-400  drop-shadow-xl shadow-black"
    >
      {childrenState}
    </div>
  )
}
