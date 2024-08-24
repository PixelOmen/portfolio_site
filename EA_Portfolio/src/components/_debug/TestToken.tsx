import { anonAPI, authAPI } from "../../lib/requests";

interface TestTokenProps {
  title?: string;
  wToken?: boolean;
}

export default function TestToken( { title = "Test", wToken = true }: TestTokenProps ) {

  function testNoToken() {
    anonAPI.get('v1/token-test')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function testWithToken() {
    authAPI.get('v1/token-test')
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });
  }

  return (
    <button
      className="bg-[#EF8275] p-2 rounded-lg text-white"
      onClick={wToken ? testWithToken : testNoToken}
    >
      {title}
    </button>
  )
}
