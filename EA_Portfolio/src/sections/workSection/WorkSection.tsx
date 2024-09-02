import React, { useState, useEffect, useRef } from "react"

import type { IScrollState } from "../../lib/scrolling";

import AnimReset from "../../components/animReset/AnimReset";
import ProjectView from "../../components/projectview/ProjectView";
import ProjectThumb from "../../components/projectview/ProjectThumb";

import thumb1 from "../../assets/workthumbs/thumb1.png"
import thumb3 from "../../assets/workthumbs/thumb3.png"
import thumb4 from "../../assets/workthumbs/thumb4.png"
import thumb5 from "../../assets/workthumbs/thumb5.png"
import thumb6 from "../../assets/workthumbs/thumb6.png"
import thumb7 from "../../assets/workthumbs/thumb7.png"
import thumb8 from "../../assets/workthumbs/thumb8.png"
import thumb9 from "../../assets/workthumbs/thumb9.png"
import thumb10 from "../../assets/workthumbs/thumb10.png"
import thumb11 from "../../assets/workthumbs/thumb11.png"


interface WorkSectionProps {
  scrollState?: IScrollState
  className?: string
  children?: React.ReactNode
}

export default function WorkSection({ scrollState, className = ''}: WorkSectionProps) {

  const [activate, setActivate] = useState(true);
  const [isMenu, setIsMenu] = useState(true);
  const [projectID, setProjectID] = useState(0);

  const sectionTopRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const transitionDivRef = useRef<HTMLDivElement>(null);

  function thumbnails() {
    return [
      <ProjectThumb
        title="This Project (Infrastructure)"
        bgImage={thumb9}
        tags={['AWS', 'Terraform']}
      />,
      <ProjectThumb
        title="This Project<br>(Back-End)"
        bgImage={thumb10}
        tags={['Django', 'Docker', 'Celery', 'Redis', 'Much More...']}
      />,       
      <ProjectThumb
        title="This Project<br>(Front-End)"
        bgImage={thumb11}
        tags={['React', 'Vite', 'TailwindCSS', 'TypeScript', 'GitHub Actions']}
      />,      
      <ProjectThumb
        title="LittleLemon API"
        bgImage={thumb1}
        tags={['Django', 'Django REST framework']}
      />,
      <ProjectThumb
        title="QTSDK"
        bgImage={thumb3}
        tags={['C++', 'QT7 SDK']}
      />,
      <ProjectThumb
        title="AmazonMMC"
        bgImage={thumb4}
        tags={['Pure Python', 'XML-ElementTree']}
      />,
      <ProjectThumb
        title="PyEmail"
        bgImage={thumb5}
        tags={['Pure Python', "SMTP/IMAP"]}
      />,
      <ProjectThumb
        title="Mediaprobe"
        bgImage={thumb6}
        tags={['Python', "MediaInfo"]}
      />,
      <ProjectThumb
        title="TCLIB3"
        bgImage={thumb7}
        tags={['Pure Python', 'Pytest']}
      />,
      <ProjectThumb
        title="RosettaPath"
        bgImage={thumb8}
        tags={['Pure Python', 'Pytest']}
      />,      
    ]
  }

  function projectViews() {
    return [
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "This Project (Infrastructure)"
        description="The infrastructure for this portfolio project is built using Terraform to provision and manage AWS resources efficiently. The setup includes a highly available VPC with public and private subnets, Internet/NAT gateways, application load balancers, an RDS managed PostgreSQL database, and more. Static assets are stored in S3 buckets and served through CloudFront. ECS (Elastic Container Service) is used to run Docker containers, including a Django web application, Celery workers, and Redis. Terraform manages all aspects, from defining ECS task definitions with CloudWatch logging to configuring environment variables and IAM roles for secure and scalable deployment."
        techStack={['Terraform', 'AWS VPC', 'AWS ECR', 'AWS ECS', 'AWS RDS', 'AWS IAM', 'AWS CloudWatch', 'AWS S3', 'AWS CloudFront',]}
        github={{url: "https://github.com/PixelOmen/portfolio_terraform"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "This Project (Back-End)"
        description="The back-end for this portfolio project is built with Django and Django REST framework. The Django application is containerized with Docker and deployed to AWS ECS. It includes a RESTful API for serving demo data, authenticated with Oauth 2.0 via Google, a Celery task queue for asynchronous processing, and Redis for caching. Continuous integration and deployment (CI/CD) are managed through GitHub Actions, automating the build, test, and deployment processes. Scalable, secure, and maintainable."
        techStack={['Python', 'Django', 'Django REST Framework', 'Drf-Social-Oauth2', 'Docker', 'Celery', 'Redis', 'PostgreSQL', 'AWS ECS', 'AWS S3', 'GitHub Actions']}
        github={{url: "https://github.com/PixelOmen/portfolio_api"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "This Project (Front-End)"
        description="The front-end for this portfolio project is a single-page application (SPA), built with React, Vite, Axios, and TailwindCSS. Axios is used for handling HTTP requests, providing a clean and consistent API for interacting with the back-end managing token authentication. The deployment process is fully automated through GitHub Actions, which builds the front-end and deploys it to AWS S3 for static hosting. Designed to be responsive, accessible, and performant, with a focus on user experience. It showcases various projects, skills, and contact information, providing a clean and intuitive interface for visitors to explore."
        techStack={['React', 'Vite', 'TailwindCSS', 'Axios', 'TypeScript', 'AWS S3', 'AWS CloudFront', 'GitHub Actions']}
        github={{url: "https://github.com/PixelOmen/portfolio_site"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "LittleLemon REST API"
        description="The LittleLemon REST API is a peer-reviewed REST API project required for the Meta Back-End Developer Professional Certification. Implements proper token authentication, user group permissions, filtering, pagination, and throttling. Made with Django and Django REST Framework (DRF)."
        techStack={['Python', 'Django', 'Django REST Framework']}
        github={{url: "https://github.com/PixelOmen/littlelemon_drf_rest_api"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "QTSDK"
        description='QTSDK is a command-line program that leverages the QuickTime 7 SDK for Windows to perform various operations on QuickTime files on Windows, including audio channel flagging and modifying embedded timecode. Enables QuickTime modifications to be programmatically integrated into other tools and scripts.'        
        techStack={['C++', 'QT7 SDK']}
        github={{url: "https://github.com/PixelOmen/QTSDK"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "AmazonMMC"
        description='AmazonMMC is a CLI tool designed to facilitate the creation of Amazon Media Entertainment Core (MEC) and Media Manifest Core (MMC) XML files. Also provides functionality to generate MD5 checksums and sample directories for Amazon deliveries.'        
        techStack={['Pure Python', 'XML-ElementTree']}
        github={{url: "https://github.com/PixelOmen/amazonmmc"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "PyEmail"
        description='PyEmail is a Python library designed to simplify email communication. It provides straightforward interfaces for sending and receiving emails using IMAP and SMTP protocols. Easy-to-use interfaces for IMAP and SMTP connections. Retrieve, mark as read/unread, and delete emails. Send emails with attachments. Handle email parsing and metadata extraction seamlessly.'        
        techStack={['Pure Python', "SMTP/IMAP"]}
        github={{url: "https://github.com/PixelOmen/pyemail"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "Mediaprobe"
        description='Mediaprobe is a straightforward Python interface/wrapper for the Mediainfo CLI tool. It calls MediaInfo as a subprocess and parses the returning JSON into objects that can easily provide metadata about a file in the form relevant datatypes.'        
        techStack={['Python', "MediaInfo"]}
        github={{url: "https://github.com/PixelOmen/mediaprobe"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "TCLIB3"
        description='TCLIB3 is a python library that provides functionality for converting between frames, timecode, and milliseconds, supporting both non-dropframe and dropframe timecode formats. It is designed to assist in video editing and processing tasks where precise timing and synchronization are crucial.'        
        techStack={['Pure Python', 'Pytest']}
        github={{url: "https://github.com/PixelOmen/tclib3"}}
      />,
      <ProjectView
        backCallback={returnToMenu}
        className="w-full"
        title = "RosettaPath"
        description='RossetaPath objects translate network paths mounted to local volumes from one mount point to another across operating systems. It differs from pathlib in that it can handle network paths and translate them to local paths and vice versa. It is designed to be used in conjunction with the pathlib module.'        
        techStack={['Pure Python', 'Pytest']}
        github={{url: "https://github.com/PixelOmen/rosettapath"}}
      />,
    ]
  }

  function projectOpenAnim(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
    if (!containerRef.current || !transitionDivRef.current || !contentRef.current) return;
    history.pushState({}, '', '');
    const containerRect = containerRef.current.getBoundingClientRect();
    const transitionRect = transitionDivRef.current.getBoundingClientRect();
    const xOffset = e.clientX - containerRect.left - (transitionRect.width / 2);
    const yOffset = e.clientY - containerRect.top - (transitionRect.height / 2);
    containerRef.current?.style.setProperty('height', `${containerRect.height}px`);
    transitionDivRef.current.classList.remove('opacity-0');
    transitionDivRef.current.style.setProperty('left', `${xOffset}px`);
    transitionDivRef.current.style.setProperty('top', `${yOffset}px`);
    setTimeout(() => {
      transitionDivRef.current?.classList.add(`duration-500`);
      const scale = window.innerWidth < 758 ? 200 : 70;
      transitionDivRef.current?.style.setProperty('transform', `scale(${scale})`);
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
      transitionDivRef.current?.classList.remove(`duration-500`);
      transitionDivRef.current?.style.setProperty('transform', 'scale(1)');
      containerRef.current?.style.setProperty('height', `auto`);      
    }, 1200);    
  }

  function enterProject(e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) {
    setTimeout(() => {
      if (!sectionTopRef.current) return;
      if (sectionTopRef.current.getBoundingClientRect().top <= 0) {
        sectionTopRef.current.scrollIntoView({behavior: 'smooth'});
      }
    }, 50);
    projectOpenAnim(e, index);
  }

  function returnToMenu() {
    setIsMenu(true);
  }

  useEffect(() => {
    if (scrollState?.wasTriggered.value) {
      setActivate(true);
     } else {
      setActivate(false);
    }
  }, [scrollState?.wasTriggered.value]);

  return (
    <div className={`p-6 sm:py-12 flex justify-center overflow-hidden ${className}`}>
      <div
        ref={sectionTopRef}
        className="relative w-full max-w-[1500px] overflow-hidden"
      >

        <div className="text-[#EF8275] w-full text-4xl sm:text-5xl mb-8 text-center font-medium">
          Work
          <span className="ml-3 font-thin text-gray-200 font-roboto">Samples</span>
          <div className="mt-2 px-2 text-base sm:text-lg font-light font-sans text-gray-200 ">
            Some of the projects and tools I've developed over the years.
          </div>
          <hr className="block mx-auto mt-4 w-3/4"/>
        </div>


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
      </div>
    </div>
  )
}
