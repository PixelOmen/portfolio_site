import React from "react";

import type { IScrollState } from "../../lib/scrolling";
import JSHeader from "../../components/jsheader/JSHeader";
import Terminal from "../../components/terminal/Terminal";

interface AboutSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function AboutSection({ scrollState, className = ''}: AboutSectionProps) {
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
            triggered={scrollState?.wasTriggered.value}
            content="About me and this site"
            className="p-4"
          />
        </JSHeader>
      </div>
    </div>
  )
}
