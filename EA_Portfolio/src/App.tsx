import Hero from "./components/hero/Hero"
// import TestComponent from "./components/_testing/testComponent/TestComponent"

export default function App() {
  return (
    <>
      {/* <TestComponent/> */}
      <Hero>
        <></>
        <div className="relative w-1/2 rounded-md top-1/3 mx-auto bg-blue-500 overflow-hidden p-4">          
          <h1
          className="text-gray-200 border-2 bg-yellow-500 hover:bg-red-500 text-center"
          >
            Landing page
          </h1>
        </div>
      </Hero>
      <h1 className="h-[3000px] text-gray-200 font-roboto">Outside</h1>
    </>
  )
}
