import { useRef, useEffect } from "react"

export default function TestComponent() {

  const testRef = useRef<HTMLUListElement>(null)
  const scrollObserver = new IntersectionObserver((elements) => {
    elements.forEach((e) => {
        if (e.isIntersecting) {
            let element = e.target as HTMLElement;
            window.scroll({ top: element.offsetTop, behavior: 'smooth' });
        }
    })
  });

  useEffect(() => {
    let test = [1,2,3]
    let test2 = test.map((t) => {return t+1});
    console.log(test2)
  }, [])

  return (
    <div
      className="h-[500px] border-2"
    >
      <h1>Test</h1>
    </div>
  )
}
