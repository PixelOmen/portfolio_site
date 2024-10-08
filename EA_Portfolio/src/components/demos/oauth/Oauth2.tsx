import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";

import ActionBtn from "../../ui/buttons/ActionBtn";
import GoogleUser from "../../ui/social/GoogleUser";
import GoogleSignIn from "../../ui/social/GoogleSignIn";
import oauth2_badge from "../../../assets/icons/oauth2_badge.png";
import DemoLink from "../../ui/links/DemoLink";


interface UserInfo {
  isLoggedIn?: boolean;
}

export default function Oauth2( { isLoggedIn = false }: UserInfo ) {

  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    if (isLoggedIn) {
      auth.getGoogleInfo()
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error(err);
          auth.logOut();
        });
    }
  }, [isLoggedIn]);

  return (
    <div            
      className="w-full max-w-[1400px] flex justify-center sm:p-4 lg:px-8"
    >
      <div className="lg:px-24 flex justify-center items-center max-[719px]:flex-wrap py-6 max-w-full">
        <div className="min-[720px]:flex-[2] mt-4 px-4 min-[720px]:mt-0 order-2 min-[720px]:order-1 text-white">
          <div className="p-2 pt-0 sm:p-6 sm:pt-0 text-left">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">OAuth 2.0</header>
            <p className="">
              OAuth 2.0 is a standard that allows you log in to an app using a different existing account, like from Google or Facebook, without sharing your password with the app. <DemoLink
                displayText="Learn more"
                url="https://oauth.net/2/"
                className="mr-2"
              />
            </p>
            <br/>
            <p>
              If you have a google account, click the link below to see how easy it is to use OAuth2 to log in. The "scope" of access is limted to only your profile picture and email, which will aso be confirmed by Google on the login page.
            </p>
            <div className="mt-10 sm:mt-6 mx-auto flex flex-wrap gap-6 justify-center items-center rounded-xl">
              {isLoggedIn ? (
                <>
                  <div className="py-4 px-5 sm:px-10 w-full max-w-full flex flex-wrap gap-6 justify-between items-center border-2 border-[#EF8275] rounded-xl ">
                    <GoogleUser userInfo={userInfo}/>
                    <ActionBtn
                      title="Log Out"
                      clickCallback={auth.logOut}
                      containerClassName="ml-auto"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full flex justify-center items-center gap-4 overflow-hidden">
                  <span className="text-[#EF8275] font-bold text-nowrap">{"->"}</span>
                  <GoogleSignIn clickCallback={auth.googleLogIn}/>
                  <span className="text-[#EF8275] font-bold text-nowrap">{"<-"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="min-[720px]:flex-[1] flex justify-center order-1 min-[720px]:order-2 mx-auto pb-4">
          <div className="flex justify-center w-full">
            <img src={oauth2_badge} alt="OAuth2 Badge" title="OAuth2 Badge" className="max-h-32 min-[720px]:max-h-72"/>
          </div>
        </div>
      </div>
  </div>    
  )
}
