import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";

import ActionBtn from "../../ui/buttons/ActionBtn";
import GoogleUser from "../../ui/social/GoogleUser";
import GoogleSignIn from "../../ui/social/GoogleSignIn";
import oauth2_badge from "../../../assets/icons/oauth2_badge.png";

export default function Oauth2() {

  const [isLogggendIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
  }, []);

  useEffect(() => {
    if (isLogggendIn) {
      auth.getGoogleInfo()
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error(err);
          auth.logOut();
        });
    }
  }, [isLogggendIn]);

  return (
    <div            
      className="w-full max-w-[1300px] flex justify-center sm:p-4 lg:px-8"
    >
      <div className="px-2 flex justify-center items-center flex-wrap py-6">
        <div className="basis-[50%] min-[800px]:ml-auto min-[800px]:max-w-[50%] sm:min-w-[350px] mt-4 min-[800px]:mt-0 order-2 min-[800px]:order-1">
          <div className="p-2 pt-0 sm:p-6 sm:pt-0">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">OAuth 2.0</header>
            <p className="">
              OAuth 2.0 is a standard that allows you log in to an app using a different existing account, like from Google or Facebook, without sharing your password with the app.
              <a
                className="text-[#EF8275] underline ml-2 font-bold"
                href="https://oauth.net/2/"
                target="_blank"
              >
                Learn more
              </a>
            </p>
            <br/>
            <p>
              If you have a google account, click the link below to see how easy it is to use OAuth2 to log in. Most of the of the other demos here will use your Google account to authenticate.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 justify-center items-center mt-4 sm:mt-0 border-2 border-[#EF8275] py-4 rounded-xl">
            {isLogggendIn ? (
              <>
                <GoogleUser userInfo={userInfo}/>
                <ActionBtn
                  title="Log Out"
                  clickCallback={auth.logOut}
                />
              </>
            ) : (
              <div>
                <GoogleSignIn clickCallback={auth.googleLogIn}/>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center order-1 min-[800px]:order-2 min-[800px]:mx-auto basis-[50%]">
          <img src={oauth2_badge} alt="OAuth2 Badge" title="OAuth2 Badge" className="flex max-h-32 min-[800px]:max-h-72"/>
        </div>
      </div>
  </div>    
  )
}
