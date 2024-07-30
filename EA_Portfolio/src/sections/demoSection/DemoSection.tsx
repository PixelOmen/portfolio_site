import React, { useState } from "react";

import axios from "axios";

import AnimReset from "../../components/animReset/AnimReset";
import JSHeader from "../../components/jsheader/JSHeader";

interface DemoSectionProps {
  children?: React.ReactNode
}


export default function DemoSection({}: DemoSectionProps) {

  function parseUrl() {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    console.log(Array.from(urlParams.entries()));
    const code = urlParams.get('code');
    console.log(code);
  }
  
  function redirectFunction() {
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    // .then(res => {
    //   console.log(res.data)
    // })
  }

  return (
    <div className="bg-[#1f1f1f] p-6 flex justify-center overflow-hidden">
      <div className="max-w-[1500px] w-full">
        <JSHeader
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
              <button onClick={redirectFunction} className="mr-4">Redirect</button>
              <button onClick={parseUrl}>Parse</button>
            </div>

          </div>
        </JSHeader>
      </div>
    </div>
  )
}
