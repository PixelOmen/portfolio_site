import Hero from "./components/hero/Hero"

export default function App() {
  return (
    <>
      <Hero>
        <div className="h-full">          
          <h1 className=" text-gray-200 mt-20 border-2">Emmanuel</h1>
        </div>
      </Hero>
      <h1 className="h-[2000px] text-gray-200 font-roboto">Second</h1>
    </>
  )
}
