import React, { useState, useEffect, useRef } from "react"

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

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionDivRef = useRef<HTMLDivElement>(null);

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
        tags={['Pure Python', 'XML-ElementTree']}
      />,
      <ProjectThumb
        title="PyEmail"
        bgImage={TestImage1}
        tags={['Pure Python', "SMTP/IMAP"]}
      />,
      <ProjectThumb
        title="Mediaprobe"
        bgImage={TestImage1}
        tags={['Python', "MediaInfo"]}
      />,
      <ProjectThumb
        title="TCLIB3"
        bgImage={TestImage1}
        tags={['Pure Python']}
      />,
      <ProjectThumb
        title="RosettaPath"
        bgImage={TestImage1}
        tags={['Pure Python']}
      />,      
    ]
  }

  function projectViews() {
    return [
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "LittleLemon REST API"
        description="The LittleLemon REST API is a peer-reviewed REST API project required for the Meta Back-End Developer Professional Certification. Implements proper token authentication, user group permissions, filtering, pagination, and throttling. Made with Django and Django REST Framework (DRF)."
        // images={[TestImage1, TestImage2]}
        techStack={['Python', 'Django', 'Django REST Framework']}
        github={{url: "https://github.com/PixelOmen/littlelemon_drf_rest_api"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "Etools V2"
        description='Internal web app enabling access to tools that assist with post-production workflows at Roundabout Entertainment. Integrating Svelte and Flask, it is meant to replace "etools", the first attempt at an internal web app.'
        // images={[TestImage1, TestImage2]}
        techStack={['Python', 'Flask', 'Svelte', 'TypeScript', 'C++', 'QT7 SDK', 'ReportLab']}
        github={{url: "https://github.com/PixelOmen/etools_v2"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "QTSDK"
        description='QTSDK is a command-line program that leverages the QuickTime 7 SDK for Windows to perform various operations on QuickTime files on Windows, including audio channel flagging and modifying embedded timecode. Enables QuickTime modifications to be programmatically integrated into other tools and scripts.'
        // images={[TestImage1]}
        techStack={['C++', 'QT7 SDK']}
        github={{url: "https://github.com/PixelOmen/QTSDK"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "AmazonMMC"
        description='AmazonMMC is a CLI tool designed to facilitate the creation of Amazon Media Entertainment Core (MEC) and Media Manifest Core (MMC) XML files. Also provides functionality to generate MD5 checksums and sample directories for Amazon deliveries.'
        // images={[TestImage1, TestImage2]}
        techStack={['Pure Python', 'XML-ElementTree']}
        github={{url: "https://github.com/PixelOmen/amazonmmc"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "PyEmail"
        description='PyEmail is a Python library designed to simplify email communication. It provides straightforward interfaces for sending and receiving emails using IMAP and SMTP protocols. Easy-to-use interfaces for IMAP and SMTP connections. Retrieve, mark as read/unread, and delete emails. Send emails with attachments. Handle email parsing and metadata extraction seamlessly.'
        // images={[TestImage1, TestImage2]}
        techStack={['Pure Python', "SMTP/IMAP"]}
        github={{url: "https://github.com/PixelOmen/pyemail"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "Mediaprobe"
        description='Mediaprobe is a straightforward Python interface/wrapper for the Mediainfo CLI tool. It calls MediaInfo as a subprocess and parses the returning JSON into objects that can easily provide metadata about a file in the form relevant datatypes.'
        // images={[TestImage1, TestImage2]}
        techStack={['Python', "MediaInfo"]}
        github={{url: "https://github.com/PixelOmen/mediaprobe"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "TCLIB3"
        description='TCLIB3 is a python library that provides functionality for converting between frames, timecode, and milliseconds, supporting both non-dropframe and dropframe timecode formats. It is designed to assist in video editing and processing tasks where precise timing and synchronization are crucial.'
        // images={[TestImage1, TestImage2]}
        techStack={['Pure Python']}
        github={{url: "https://github.com/PixelOmen/tclib3"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "RosettaPath"
        description='RossetaPath objects translate network paths mounted to local volumes from one mount point to another across operating systems.'
        // images={[TestImage1, TestImage2]}
        techStack={['Pure Python']}
        github={{url: "https://github.com/PixelOmen/rosettapath"}}
      />,
    ]
  }

  function projectOpenAnim(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
    if (!containerRef.current || !transitionDivRef.current || !contentRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const transitionRect = transitionDivRef.current.getBoundingClientRect();
    const xOffset = e.clientX - containerRect.left - (transitionRect.width / 2);
    const yOffset = e.clientY - containerRect.top - (transitionRect.height / 2);
    containerRef.current?.style.setProperty('height', `${containerRect.height}px`);
    transitionDivRef.current.classList.remove('opacity-0');
    transitionDivRef.current.style.setProperty('left', `${xOffset}px`);
    transitionDivRef.current.style.setProperty('top', `${yOffset}px`);
    setTimeout(() => {
      transitionDivRef.current?.classList.add('duration-500');
      transitionDivRef.current?.style.setProperty('transform', 'scale(70)');
    }, 50);
    setTimeout(() => {
      setProjectID(index);
      setIsMenu(false);
    }, 500);
    setTimeout(() => {
      if (!containerRef.current || !contentRef.current) return;
      const contentHeight = contentRef.current?.offsetHeight;
      containerRef.current.style.setProperty('height', `${contentHeight}px`);
    }, 600);
    setTimeout(() => {
      transitionDivRef.current?.classList.add('opacity-0');
    }, 700);    
    setTimeout(() => {
      if (!contentRef.current) return;
      transitionDivRef.current?.classList.remove('duration-500');
      transitionDivRef.current?.style.setProperty('transform', 'scale(1)');
      containerRef.current?.style.setProperty('height', `auto`);      
    }, 1200);    
  }

  function enterProject(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
    projectOpenAnim(e, index);
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
          comment="Samples of my work"
          className="relative mb-5"
          title="work"
        >
          <div
            ref={containerRef}
            className={`relative overflow-hidden w-full mb-4 rounded-lg transition-all duration-200`}
          >
            <div
              ref={transitionDivRef}
              className="absolute h-10 w-10 top-0 left-0 rounded-full z-10 transition-all duration-0 bg-gray-300 pointer-events-none opacity-0"
            >
            </div>
            <div ref={contentRef} className="w-full">
              {isMenu ? (
                <div className="py-6 px-10 flex justify-center gap-10 flex-wrap">
                  {thumbnails().map((thumb, index) => {
                    const anims = ['fadeInUp', 'fadeInLeft', 'fadeInRight', 'fadeInDown'];
                    const anim = anims[Math.floor(Math.random() * anims.length)];
                    return (
                      <div
                        key={index}
                        className={`border-2 ${anim} border-gray-600 rounded-md w-[300px] h-[200px]`}
                        onClick={(e) => enterProject(e, index)}
                      >
                          {thumb}
                      </div>
                    )        
                  })}
                </div>
              ) : (
                <div className="relative w-full flex justify-center z-0">
                  <AnimReset
                    hideOnStart={true}
                    active={activate}
                    cascadeDelay={50}
                    resetDelay={1000}
                  >
                    <div className="">
                      {projectViews()[projectID]}

                    </div>
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
