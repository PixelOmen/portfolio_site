import React from "react";

import JSHeader from "../../components/jsheader/JSHeader";

import Oauth2 from "../../components/demos/oauth/Oauth2";

interface DemoSectionProps {
  children?: React.ReactNode
}


export default function DemoSection({}: DemoSectionProps) {



  return (
    <div className="bg-[rgba(31,31,31,0)] p-6 sm:py-12 flex justify-center overflow-hidden min-h-[1000px]">
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
            className="w-full p-6 mb-6 text-black rounded-lg"
          >
            <Oauth2/>
          </div>
        </JSHeader>
      </div>
    </div>
  )
}
