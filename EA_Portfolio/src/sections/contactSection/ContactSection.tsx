import { useEffect, useState } from "react"

import { anonFormInstAPI } from "../../lib/requests";

import type { IScrollState } from "../../lib/scrolling";
import AnimReset from "../../components/animReset/AnimReset";

import GitHubIcon from "../../components/ui/icons/GitHubIcon";
import LinkedInIcon from "../../components/ui/icons/LinkedInIcon";
import EmailIcon from "../../components/ui/icons/EmailIcon";

interface ContactSectionProps {
  scrollState?: IScrollState
}


export default function ContactSection({ scrollState }: ContactSectionProps) {

  const [triggered, setTriggered] = useState(false);

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    anonFormInstAPI.post('/v1/email-test/', data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }


  useEffect(() => {
    if (scrollState?.wasTriggered.value) {
      setTriggered(true);
    } else {
      setTriggered(false);
    }
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className="relative pt-2">

      <div className="absolute w-full top-4 blur-2xl z-0 bg-slate-600">
        <svg preserveAspectRatio="none" viewBox="0 0 100 130" height="50" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0 L50 100 L100 0 Z" fill="#33415580" stroke="" strokeWidth='2px'>        
          </path>
        </svg>
      </div>

      <AnimReset
        active={triggered}
        cascadeDelay={10}
        resetDelay={1500}
      >
        <div className="relative mb-14 z-1">
          <div
            className="w-full"
          >
            <div
              className="flex flex-col items-center sm:mt-10"
            >
              <h1 className="casc-enterUp mt-12 sm:mt-0">Contact</h1>
              <hr className="w-40 mt-2 mb-8"/>
              <div className="opacity-0 flex text-center casc-fadeInDown">
                <p className="text-base sm:text-lg font-medium">
                  Comments, questions, or business inquiries?
                </p>
              </div>

              <div
                className="p-8 max-w-[800px] w-screen"
              >
                <form
                  onSubmit={handleFormSubmit}
                  className="opacity-0 flex flex-col gap-4 text-black casc-fadeInUp"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="h-8 p-2 rounded-sm bg-slate-300 placeholder:text-slate-500"
                    required={true}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="h-8 p-2 rounded-sm bg-slate-300 placeholder:text-slate-500"
                    required={true}
                  />
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    className="p-2 rounded-sm bg-slate-300 placeholder:text-slate-500"
                    required={true}
                  />              
                  <button
                    type="submit"
                    className={`mx-auto w-full bg-[#ed6354] hover:bg-[#d6584a] rounded-md p-2 text-white font-medium text-xl shake hover:brightness-125 active:bg-[#c53e2f]  active:w-[90%] transition-all shadow-xl`}
                  >
                    Submit
                  </button>
                </form>                
              </div>
            </div>
          </div>
        </div>

        <div className="opacity-0 py-2 casc-enterUp bg-[#32445d80] border-t-2 border-black">
          <div className="flex justify-center gap-8">
            <a 
              href="https://github.com/PixelOmen"
              target="_blank"
              className="hover:scale-110 transition-all duration-300"
            >
              <GitHubIcon fillColor="white" className="w-12 sm:w-12"/>
            </a>
            <a
              href="https://www.linkedin.com/in/emmanuelacostapost/" target="_blank"
              className="hover:scale-110 transition-all duration-300"
            >
              <LinkedInIcon fillColor="#0a68c6" className="w-14 sm:w-[60px]"/>
            </a>
            <a
              href="mailto:3D.Acosta@gmail.com"
              target="_blank"
              className="ml-1 hover:scale-110 transition-all duration-300"
            >
              <EmailIcon fillColor="white" className="w-12 sm:w-12"/>
            </a>
          </div>
          <div className="text-center pb-3 casc-enterUp">
            <span className="text-gray-500 ml-3">
              EMMANUEL ACOSTA 
            </span>
            <span className="text-[#ed6354] ml-1">© 2024</span>
          </div>
        </div>
      </AnimReset>

    </div>
  )
}