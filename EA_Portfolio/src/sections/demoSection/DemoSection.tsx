import { useEffect, useState } from "react";

import * as auth from "../../lib/auth";
import { getUserLimits, UserLimits } from "../../lib/userLimits";
import { IScrollState } from "../../lib/scrolling";

import Oauth2 from "../../components/demos/oauth/Oauth2";
import Crud from "../../components/demos/crud/Crud";
import MediaStorage from "../../components/demos/mediaStorage/MediaStorage";


interface DemoSectionProps {
  scrollState?: IScrollState;
}

export default function DemoSection( {scrollState}: DemoSectionProps ) {

  const [isLogggendIn, setIsLoggedIn] = useState(false);
  const [userLimitsState, setUserLimitsState] = useState<UserLimits | null>(null);

  async function setUserLimits() {
    const res = await getUserLimits();
    setUserLimitsState(res);
  }

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
      setUserLimits();      
  }, []);

  useEffect(() => {
    // For future use, if needed
  }, [scrollState]);

  return (        
    <div>

      <div className="px-6 mx-auto max-w-[1500px] text-4xl sm:text-5xl text-gray-200 font-roboto font-thin text-center">
          Backend
        <span className="text-[#EF8275] w-full ml-3 font-medium">Demos</span>
        <div className="mt-2 px-2 text-base sm:text-lg font-light font-sans text-gray-200">
          Live demos showcasing the integration of various services and tech stacks.
        </div>
        <hr className="mx-auto mt-4 block w-3/4"/>
      </div>

      
      <div className="bg-[rgba(31,31,31,0)] w-full flex justify-center p-6 sm:py-12">
        <div
          className="w-full mb-6 text-black rounded-lg py-10"
        >
          <div className="flex flex-col gap-16">
            <div className="mx-auto">
              <Oauth2 isLoggedIn={isLogggendIn}/>
            </div>
            <div className="flex mx-auto items-center w-[90%] text-[#EF8275]">
              <div>{"<"}</div>
              <hr className="w-full -translate-y-[1px] border-2 border-[#EF8275] border-dotted"/>
              <div>{">"}</div>
            </div>
            <div className="mx-auto">
              <Crud isLogggendIn={isLogggendIn} userLimits={userLimitsState}/>
            </div>
            <div className="mx-auto">
              <MediaStorage isLogggendIn={isLogggendIn} userLimits={userLimitsState}/>
            </div>              
          </div>
        </div>
      </div>

    </div>
  )
}
