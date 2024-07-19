import { useRef } from "react"

export default function TestComponent() {

  const testList = useRef<HTMLUListElement>(null)
  
  function hide() { 
    testList.current?.classList.toggle('hidden');
  }

  return (
    <div
      className="h-[500px]"
    >
        <ul ref={testList} className='fadeInUp w-max'>
            <li>Test</li>
            <li>Test2</li>
        </ul>
        <div className="flex justify-center">
          <button
            className="bg-slate-950 rounded-full w-20 p-4 hover:bg-slate-700"
            onClick={hide}
          >
            Hide
          </button>
        </div>
    </div>
  )
}
