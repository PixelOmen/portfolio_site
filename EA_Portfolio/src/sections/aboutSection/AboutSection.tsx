import React, { useState, useEffect, useRef } from "react";

import type { IScrollState } from "../../lib/scrolling";

// import AnimReset from "../../components/animReset/AnimReset";
import JSHeader from "../../components/jsheader/JSHeader";
import Terminal from "../../components/terminal/Terminal";

interface AboutSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function AboutSection({ scrollState, className = ''}: AboutSectionProps) {



  useEffect(() => {
    
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className={`bg-[#1f1f1f] p-6 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div className="relative w-full max-w-[1500px] overflow-hidden">
        <JSHeader
          comment="About me and this site"
          className="relative mb-5"
          prefix="class"
          title="EmmanuelAcosta"
          asClass={true}
        >
          <Terminal
            content="About me and this site"
            className="p-4"
          />
        </JSHeader>
      </div>
    </div>
  )
}
