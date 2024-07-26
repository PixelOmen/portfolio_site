import React, { useState, useEffect } from "react"

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

  const [activate, setActivate] = useState(true);
  const [isMenu, setIsMenu] = useState(true);
  const [projectID, setProjectID] = useState(0);

  function thumbnails() {
    return [
      <ProjectThumb
        title="Little Lemon API"
        bgImage={TestImage1}
        tags={['Python', 'Django', 'Django REST framework', 'RESTful API']}
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

  function returnToMenu() {
    setIsMenu(true);
  }

  useEffect(() => {
    scrollState?.wasTriggered.value ? setActivate(true) : setActivate(false);
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className={`bg-[#1f1f1f] p-6 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div className="relative w-full max-w-[1500px] overflow-hidden">
        <JSHeader
          className="relative mb-5"
          title="work"
        >
          <div className={`relative overflow-hidden w-full mb-2 sm:p-10`}>
            <div className="w-full">
              {isMenu ? (
                <div className="py-6 px-10 flex justify-center gap-10 flex-wrap">
                  {thumbnails().map((thumb, index) => {
                    const anims = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeInDown'];
                    const anim = anims[Math.floor(Math.random() * anims.length)];
                    return (
                      <div
                        key={index}
                        className={`border-2 ${anim} border-gray-600 rounded-md w-[300px] h-[200px]`}
                        onClick={() => {
                          setProjectID(index);
                          setIsMenu(false);
                        }}
                      >
                          {thumb}
                      </div>
                    )        
                  })}
                </div>
              ) : (
                <div className="w-full flex justify-center mb-2">
                  <AnimReset
                    hideOnStart={true}
                    active={activate}
                    cascadeDelay={50}
                    resetDelay={1000}
                  >
                    {projectViews()[projectID]}
                  </AnimReset>
                </div>
              )}
            </div>
          </div>
        </JSHeader>
      </div>
    </div>
  )
}
