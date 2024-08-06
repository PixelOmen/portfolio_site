import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";

import GoogleSignIn from "../../ui/social/GoogleSignIn";
import oauth2_badge from "../../../assets/icons/oauth2_badge.png";
import ActionBtn from "../../ui/buttons/ActionBtn";

// import TestToken from "../../_debug/TestToken";

export default function Oauth2() {

  const [isLogggendIn, setIsLoggedIn] = useState(false);

  // function getUserInfo() {
  //   const result = auth.getGoogleInfo();
  //   console.log(result);
  // }

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
  }, []);

  return (
    <div            
      className="w-full max-w-[1200px] flex justify-center p-4 lg:px-8 border-2 border-blue-500"
    >
      <div className="flex justify-center items-center flex-wrap">
        <div className="basis-[90%] min-[800px]:ml-auto min-[800px]:max-w-[50%] sm:min-w-[350px] mt-4 min-[800px]:mt-0 order-2 min-[800px]:order-1">
          <div className="sm:p-6">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">OAuth2</header>
            <p className="">
              OAuth2 is a system that lets you log in to an app using your existing accounts, like Google or GitHub, without sharing your password with the app. It's managed by the Internet Engineering Task Force (IETF).
              <a
                className="text-[#EF8275] underline ml-2 font-medium"
                href="https://oauth.net/2/"
                target="_blank"
              >
                Learn more about OAuth2
              </a>
            </p>
            <br/>
            <p>
              If you have a google account, click the link below to see how easy it is to use OAuth2 to log in. Most of the of the other demos here will use your Google account to authenticate.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {isLogggendIn ? (
              <ActionBtn
                title="Log Out"
                clickCallback={auth.logOut}
              />
            ) : (
              <GoogleSignIn clickCallback={auth.googleLogIn}/>
            )}
            {/* <TestToken title="Test No Token" wToken={false}/>
            <TestToken title="Test With Token" wToken={true}/> */}
          </div>
        </div>
        <div className="flex justify-center order-1 min-[800px]:order-2 min-[800px]:mx-auto basis-[20%]">
          <img src={oauth2_badge} alt="OAuth2 Badge" className="flex max-h-32 min-[800px]:max-h-72"/>
        </div>
      </div>
  </div>    
  )
}
