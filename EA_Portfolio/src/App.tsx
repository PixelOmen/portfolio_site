import Hero from "./components/hero/Hero"
import TestComponent from "./components/_testing/testComponent/TestComponent"

export default function App() {
  return (
    <>
      {/* <TestComponent/> */}
      <Hero>
        <></>
        <div className="h-full w-20 bg-blue-500 overflow-hidden">          
          <h1 className="text-gray-200 border-2 bg-yellow-500">Child</h1>
        </div>
      </Hero>
      <h1 className="h-[3000px] text-gray-200 font-roboto">Outside</h1>
    </>
  )
}
