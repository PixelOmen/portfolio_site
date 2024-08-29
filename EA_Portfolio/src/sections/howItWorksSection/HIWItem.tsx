import { useRef, useEffect } from "react";

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

  function open() {
    headerRef.current?.classList.remove('rounded-b-md');
    descriptionRef.current?.classList.remove('max-h-0');
    descriptionRef.current?.classList.add('max-h-96');
    arrowRef.current?.classList.add('rotate-90');
    openRef.current = true;
  }

  function close() {
    headerRef.current?.classList.add('rounded-b-md');
    descriptionRef.current?.classList.add('max-h-0');
    descriptionRef.current?.classList.remove('max-h-96');
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

  return (
    <section
    >
      <header
        ref={headerRef}
        onClick={toggleExpand}
        className="px-4 py-2 sm:py-1 bg-gray-600 flex justify-between items-center cursor-pointer rounded-t-md transition-all duration-1000"
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
        className=" bg-slate-800 overflow-hidden transition-all duration-700 rounded-bl-md rounded-br-md"
      >
        <p className="p-4 text-gray-100 font-light">
          {description}
        </p>
      </div>
    </section>
  )
}
