import React from "react";

import { GOOGLE_AUTH_URL } from "../../lib/auth";
import JSHeader from "../../components/jsheader/JSHeader";

interface DemoSectionProps {
  children?: React.ReactNode
}


export default function DemoSection({}: DemoSectionProps) {
  
  function redirectFunction() {
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <div className="bg-[#1f1f1f] p-6 flex justify-center overflow-hidden">
      <div className="max-w-[1500px] w-full">
        <JSHeader
          comment="A few demos of AWS and Django functionality"
          className="text-xl sm:text-[2rem] mb-5"
          title="demos"
          prefix="function"
          asFunction={true}
          functionParams={["aws", "django"]}
        >
          <div            
            className="w-full mb-5 flex justify-center"
          >
            <div
              style={{background: 'radial-gradient(circle, #e5e7eb  0%, #c8cace 100%)'}}
              className="p-6 text-black rounded-lg"
            >
              <button onClick={redirectFunction}>Redirect</button>
            </div>

          </div>
        </JSHeader>
      </div>
    </div>
  )
}
