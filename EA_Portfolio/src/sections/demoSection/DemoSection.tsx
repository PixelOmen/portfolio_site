import React from "react";

import JSHeader from "../../components/jsheader/JSHeader";

import { googleLogIn, logOut } from "../../lib/auth";
import { anonInstAPI, authInstAPI } from "../../lib/requests";

interface DemoSectionProps {
  children?: React.ReactNode
}


export default function DemoSection({}: DemoSectionProps) {

  function testNoToken() {
    anonInstAPI.get('v1/test')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function testWithToken() {
    authInstAPI.get('v1/test')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <div className="bg-[rgba(31,31,31,0)] p-6 flex justify-center overflow-hidden min-h-[1000px]">
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
              className="w-full p-6 text-black rounded-lg flex justify-center gap-4"
            >
              <button
                className="bg-[#EF8275] p-2 rounded-lg text-white"
                onClick={googleLogIn}
              >
                  Log In
              </button>
              <button
                className="bg-[#EF8275] p-2 rounded-lg text-white"
                onClick={logOut}
              >
                  Log Out
              </button>
              <button
                className="bg-[#EF8275] p-2 rounded-lg text-white"
                onClick={testNoToken}
              >
                  Test NoToken
              </button>
              <button
                className="bg-[#EF8275] p-2 rounded-lg text-white"
                onClick={testWithToken}
              >
                  Test wToken
              </button>              
            </div>

          </div>
        </JSHeader>
      </div>
    </div>
  )
}
