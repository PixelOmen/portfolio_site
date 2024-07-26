import React, { useState, useRef, useEffect } from "react"

import type { IScrollState } from "../../lib/scrolling";

import AnimReset from "../../components/animReset/AnimReset";
import ProjectView from "../../components/projectview/ProjectView";
import ProjectThumb from "../../components/projectview/ProjectThumb";
import JSHeader from "../../components/jsheader/JSHeader";

import TestImage1 from "../../assets/testImage1.png";

interface WorkSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function WorkSection({ scrollState, className = ''}: WorkSectionProps) {

  const [activate, setActivate] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const container = useRef<HTMLDivElement>(null);

  function thumbnails() {
    return [
      <ProjectThumb
        title="Little Lemon API"
        bgImage={TestImage1}
        tags={['Python', 'Django', 'DRF', 'RESTful API']}
      />,
      <ProjectThumb
        title="Etools V2"
        bgImage={TestImage1}
        tags={['Python', 'Flask', 'Svelte', 'TypeScript', 'C++', 'QT7 SDK', 'ReportLab', 'More...']}
      />,
      <ProjectThumb
        title="QTSDK"
        bgImage={TestImage1}
        tags={['C++', 'QT7 SDK']}
      />,
      <ProjectThumb
        title="AmazonMMC"
        bgImage={TestImage1}
        tags={['Python', 'XML-ElementTree']}
      />,
      <ProjectThumb
        title="PyEmail"
        bgImage={TestImage1}
        tags={['Python', "SMTP/IMAP"]}
      />,
      <ProjectThumb
        title="Mediaprobe"
        bgImage={TestImage1}
        tags={['Python', "MediaInfo"]}
      />,
      <ProjectThumb
        title="TCLIB3"
        bgImage={TestImage1}
        tags={['Python']}
      />,
      <ProjectThumb
        title="RosettaPath"
        bgImage={TestImage1}
        tags={['Python']}
      />,      
    ]
  }

  function projectViews() {
    return [
      <ProjectView
        backCallback={returnToMenu}
        className="w-[900px]"
        title = "LittleLemon REST API"
        description="The LittleLemon REST API is a peer-reviewed REST API project required for the Meta Back-End Developer Professional Certification. Implements proper token authentication, user group permissions, filtering, pagination, and throttling. Made with Django and Django REST Framework (DRF)."
        // images={[TestImage1, TestImage2]}
        techStack={['Python', 'Django', 'Django REST Framework']}
        github={{url: "https://github.com/PixelOmen/littlelemon_drf_rest_api"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-[900px]"
        title = "Etools V2"
        description='Internal web app enabling access to tools that assist with post-production workflows at Roundabout Entertainment. Integrating Svelte and Flask, it is meant to replace "etools", the first attempt at an internal web app.'
        // images={[TestImage1, TestImage2]}
        techStack={['Python', 'Flask', 'Svelte', 'TypeScript', 'C++', 'QT7 SDK', 'ReportLab']}
        github={{url: "https://github.com/PixelOmen/etools_v2"}}
      />,
    ]
  }

  function menu() {
    return (
      <div className="py-6 px-10 flex justify-center gap-10 flex-wrap">
      {thumbnails().map((thumb, index) => {
        const anim = index % 2 === 0 ? 'enterLeft' : 'enterRight';
        return (
          <div
            key={index}
            className={`border-2 ${anim} border-gray-500 rounded-md w-[300px] h-[200px]`}
            onClick={() => setContent(project(index))}
          >
            {thumb}
          </div>
        )
      })}
    </div>
    )
  }

  function project(id: number) {
    return (
      <div className="w-full flex justify-center">
        <AnimReset
          hideOnStart={true}
          active={true}
          cascadeDelay={300}
          resetDelay={1000}
        >
          {projectViews()[id]}
        </AnimReset>
      </div>
    )
  }

  function returnToMenu() {
    setContent(menu())
  }

  useEffect(() => {
    setContent(menu())
  }, [scrollState?.wasTriggered])

  return (
    <div className={`bg-[#1f1f1f] p-6 sm:p-8 flex justify-center overflow-hidden ${className}`}>
      <div className="w-full max-w-[1500px] overflow-hidden">
        <JSHeader
          className="mb-6"
          title="work"
        >
        <div className={`overflow-hidden w-full pt-1 mb-2`}>
          <div ref={container} className="w-full">
            {content}
          </div>
        </div>
        </JSHeader>
      </div>
    </div>
  )
}
