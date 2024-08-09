import JSHeader from "../../components/jsheader/JSHeader";
import Oauth2 from "../../components/demos/oauth/Oauth2";
import Crud from "../../components/demos/crud/Crud";
import MediaStorage from "../../components/demos/S3Images/MediaStorage";


interface DemoSectionProps {
  
}


export default function DemoSection({}: DemoSectionProps) {
  return (
    <div className="bg-[rgba(31,31,31,0)] p-6 sm:py-12 flex justify-center overflow-hidden mb-12">
      <div className="max-w-[1500px] w-full">
        <JSHeader
          comment="A few demos of AWS and Django functionality"
          className="text-xl sm:text-[2rem] mb-6"
          title="demos"
          prefix="function"
          asFunction={true}
          functionParams={["aws", "django"]}
        >
          <div
            style={{background: 'radial-gradient(circle, #e5e7eb  0%, #c8cace 100%)'}}
            className="w-full mb-6 text-black rounded-lg py-10"
          >
            <div className="flex flex-col gap-16">
              <div className="w-full flex justify-center">
                <Oauth2/>
              </div>
              <div className="flex mx-auto items-center w-[90%] text-[#EF8275]">
                <div>{"<"}</div>
                <hr className="w-full -translate-y-[1px] border-2 border-[#EF8275] border-dotted"/>
                <div>{">"}</div>
              </div>
              <div className="w-full flex justify-center">
                <Crud/>
              </div>
              <div className="w-full flex justify-center">
                <MediaStorage/>
              </div>              
            </div>
          </div>
        </JSHeader>
      </div>
    </div>
  )
}
