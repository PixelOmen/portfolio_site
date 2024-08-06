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
      className="w-full flex justify-center gap-5 border-2 border-black font-medium"
    >
      <div>
        <h1 className="text-[#EF8275]">OAuth2</h1>
        <article>

        </article>
        <h2 className="text-2xl">OAuth2</h2>
        <p className="text-lg">Click the button to log in with Google</p>
        <p className="text-lg">Then click the button to test the API</p>
      </div>
      <img src={oauth2_badge} alt="" />
      {/* <button
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
      </button>               */}
  </div>    
  )
}
