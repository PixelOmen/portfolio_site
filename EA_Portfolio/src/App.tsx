import Hero from "./components/hero/Hero"
// import TestComponent from "./components/_testing/testComponent/TestComponent"

export default function App() {
  return (
    <>
      {/* <TestComponent/> */}
      <Hero>
        <></>
        <div className="relative rounded-md top-1/3 mx-auto overflow-hidden p-4">
          <header className="max-w-max text-6xl justify-center text-center mx-auto">
              <span className="text-[#EF8275] font-medium">
               Emmanuel Acosta
              </span>
            <div className="font-roboto font-thin">Full-Stack Developer</div>
            <div className="text-[8pt] mt-2">(but mainly back-end &#x1F601;)</div>
          </header>
          {/* <h1
          className="text-gray-200 border-2 bg-yellow-500 hover:bg-red-500 text-center"
          >
            Landing page
          </h1> */}
        </div>
      </Hero>
      <h1 className="h-[3000px] text-gray-200 font-roboto">Outside</h1>
    </>
  )
}
