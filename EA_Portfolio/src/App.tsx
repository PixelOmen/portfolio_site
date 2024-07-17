import Hero from "./components/hero/Hero"
import TestComponent from "./components/_testing/testComponent/TestComponent"

export default function App() {
  return (
    <>
      <Hero>
        <div className="h-full">          
          <h1 className=" text-gray-200 border-2">Emmanuel</h1>
          <TestComponent/>
        </div>
      </Hero>
      <h1 className="h-[2000px] text-gray-200 font-roboto">Second</h1>
    </>
  )
}
