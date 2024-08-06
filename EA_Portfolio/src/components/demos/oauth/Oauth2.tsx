import { googleLogIn, logOut } from "../../../lib/auth";
import { anonInstAPI, authInstAPI } from "../../../lib/requests";

import oauth2_badge from "../../../assets/icons/oauth2_badge.png";

export default function Oauth2() {

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
    <div            
      className="w-full p-10"
    >
      <div className="relative max-h-96 flex justify-between items-center flex-wrap">
        <div className="flex-1 max-w-[600px] ml-auto mr-auto">
          <div className="p-6">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">OAuth2</header>
            <p className="text-lg font-">
              OAuth2 is a system that lets you log in to an app using your existing accounts, like Google or GitHub, without sharing your password with the app. Managed by the Internet Engineering Task Force (IETF), see how easy and safe it is to use OAuth2 to log in and access your information.
            </p>
          </div>
          <div className="flex gap-6 justify-center">
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
        <div className="mr-auto ml-auto">
          <img src={oauth2_badge} alt="OAuth2 Badge" className="max-h-72"/>
        </div>
      </div>
  </div>    
  )
}
