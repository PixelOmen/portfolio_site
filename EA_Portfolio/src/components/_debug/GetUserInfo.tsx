import * as auth from "../../lib/auth";

export default function TestToken() {

  function getUserInfo() {
    auth.getGoogleInfo()
      .then(res => {
        console.log(res);
      });
  }

  return (
    <button
      className="bg-[#EF8275] p-2 rounded-lg text-white"
      onClick={getUserInfo}
    >
      UserInfo
    </button>
  )
}
