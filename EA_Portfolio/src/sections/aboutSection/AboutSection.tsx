import React, { useEffect, useState } from "react";

import type { IScrollState } from "../../lib/scrolling";
import JSHeader from "../../components/jsheader/JSHeader";
import Terminal from "../../components/terminal/Terminal";

interface AboutSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function AboutSection({ scrollState, className = ''}: AboutSectionProps) {

  const [singleTrigger, setSingleTrigger] = useState(false);

  useEffect(() => {
    if (scrollState?.wasTriggered.value && !singleTrigger) {
      setSingleTrigger(true);
    }
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className={`bg-[#1f1f1f] p-6 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div className="relative w-full max-w-[1500px] overflow-hidden">
        <JSHeader
          comment="About me and this site"
          className="relative text-xl sm:text-[2rem] mb-5"
          prefix="class"
          title="EmmanuelAcosta"
          asClass={true}
        >
          <Terminal
            triggered={singleTrigger}
            className="sm:p-4"
            content="Hello and welcome!&#9995;\nMy name is Emmanuel. I'm a software engineer and full stack developer with a passion for leveraging cloud infrastructure to create secure, dynamic, and scalable web applications.&#128293;&#128187;&#128293;\nI specialize in most things Python, including building RESTful APIs utilizing Django and PostgreSQL, as well as deploying scalable applications on AWS.&#128640;&#9729;\nI built this site not only as place to showcase my work and skills, but also as a personal case study in design/functionality with React, Django, and AWS.&#129300;&#129322;\nPlease feel free to check out my work, including several server-side Django and AWS demos below.&#128071;\nHave an idea but don't know how to realize it? Let's connect and make it real!&#129309;\nThanks for visting!&#128406;"
          />
        </JSHeader>
      </div>
    </div>
  )
}
