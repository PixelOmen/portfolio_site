import Oauth2 from "../../components/demos/oauth/Oauth2";
import Crud from "../../components/demos/crud/Crud";
import MediaStorage from "../../components/demos/S3Images/MediaStorage";


interface DemoSectionProps {
  
}


export default function DemoSection({}: DemoSectionProps) {
  return (
    <div className="bg-[rgba(31,31,31,0)] p-6 sm:py-12 flex justify-center overflow-hidden mb-12">
      <div className="max-w-[1500px] w-full">

          <div className="text-5xl font-thin text-white text-center">
            Backend
            <span className="text-[#EF8275] w-full ml-3 font-medium">Demos</span>
            <div className="text-lg font-light text-gray-200 mt-2">
              A collection of live demos showcasing various tools, services, tech stacks, and integrations.
            </div>
            <hr className="inline-block w-3/4"/>
          </div>

          <div
            // style={{background: 'radial-gradient(circle, #e5e7eb  0%, #c8cace 100%)'}}
            className="w-full mb-6 text-black rounded-lg py-10"
          >
            <div className="flex flex-col gap-16">
              <div className="mx-auto">
                <Oauth2/>
              </div>
              <div className="flex mx-auto items-center w-[90%] text-[#EF8275]">
                <div>{"<"}</div>
                <hr className="w-full -translate-y-[1px] border-2 border-[#EF8275] border-dotted"/>
                <div>{">"}</div>
              </div>
              <div className="mx-auto">
                <Crud/>
              </div>
              <div className="mx-auto">
                <MediaStorage/>
              </div>              
            </div>
          </div>

      </div>
    </div>
  )
}
