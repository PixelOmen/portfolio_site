import { useEffect, useState } from "react"

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

  function formSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('sent')
    // const formEvent = e.target as HTMLFormElement
    // const formData = new FormData(formEvent)
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
              <div className="flex text-center casc-fadeInDown">
                <p className="text-base sm:text-lg font-medium">
                  Comments, questions, or business inquiries?
                </p>
              </div>

              <div
                className="p-8 max-w-[800px] w-screen"
              >
                <form
                  onSubmit={formSubmit}
                  method="POST"
                  className="flex flex-col gap-4 text-black casc-fadeInUp"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="h-8 p-2 rounded-sm bg-slate-300 placeholder:text-slate-500"
                    required={true}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="h-8 p-2 rounded-sm bg-slate-300 placeholder:text-slate-500"
                    required={true}
                  />
                  <textarea
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

        <div className="flex justify-center py-4 casc-enterUp gap-8 bg-[#32445d80]">
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
      </AnimReset>

    </div>
  )
}