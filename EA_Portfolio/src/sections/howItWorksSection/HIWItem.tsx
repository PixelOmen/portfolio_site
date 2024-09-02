import { useRef, useEffect, useContext } from "react";

import { ExpandContext } from "./ExpandContextProvider";

interface HIWItemProps {
    title: string;
    description: string;
    startOpen?: boolean;
}

export default function HIWItem({
  title,
  description,
  startOpen = false
}: HIWItemProps ) {
  const descriptionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const openRef = useRef<boolean>(false);

  const { allExpanded } = useContext(ExpandContext);

  function open() {
    headerRef.current?.classList.remove('rounded-b-md');
    descriptionRef.current?.classList.remove('max-h-0', 'sm:max-h-0');
    descriptionRef.current?.classList.add('max-h-80', 'sm:max-h-52');
    arrowRef.current?.classList.add('rotate-90');
    openRef.current = true;
  }

  function close() {
    headerRef.current?.classList.add('rounded-b-md');
    descriptionRef.current?.classList.add('max-h-0', 'sm:max-h-0');
    descriptionRef.current?.classList.remove('max-h-80', 'sm:max-h-52');
    arrowRef.current?.classList.remove('rotate-90');
    openRef.current = false
  }

  function toggleExpand() {
    if (openRef.current) {
      close();
    } else {
      open();
    }
  }

  useEffect(() => {
    startOpen ? open() : close();
  }, []);

  useEffect(() => {
    if (allExpanded === undefined) return;
    allExpanded.expand ? open() : close();
  }, [allExpanded]);

  return (
    <section
    >
      <header
        ref={headerRef}
        onClick={toggleExpand}
        className="relative px-4 py-2 max-h-sm:py-1 max-h- bg-gray-600 flex justify-between items-center cursor-pointer rounded-t-md transition-all duration-1000 border-2 border-black z-10"
      >
        <div>
          {title}
        </div>
        <div
          ref={arrowRef}
          className="text-xl transition-all duration-300"
        >
          {">"}
        </div>
      </header>
      <div
        ref={descriptionRef}
        className="relative -top-2 bg-slate-800 overflow-hidden transition-all duration-700 ease-out rounded-bl-md rounded-br-md border-2 border-black"
      >
        <p className="p-4 pt-5 text-gray-100 font-light">
          {description}
        </p>
      </div>
    </section>
  )
}
