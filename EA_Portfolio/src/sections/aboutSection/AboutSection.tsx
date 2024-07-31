import React, { useState, useEffect, useRef } from "react";

import type { IScrollState } from "../../lib/scrolling";

import AnimReset from "../../components/animReset/AnimReset";
import JSHeader from "../../components/jsheader/JSHeader";

import TestImage1 from "../../assets/testImage1.png";

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
            <div className="mb-4 w-full border-2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam quos beatae minus alias eos veritatis, rerum, distinctio voluptates dolorum illo ad exercitationem, quibusdam officia. Unde et doloremque incidunt sed deserunt!
            </div>
        </JSHeader>
      </div>
    </div>
  )
}
