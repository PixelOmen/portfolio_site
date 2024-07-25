import React, { useState } from "react"

import ProjectThumb from "../../components/projectview/ProjectThumb";
import TestImage1 from "../../assets/testImage1.png";


interface WorkSectionProps {
  children?: React.ReactNode
}

export default function WorkSection({}: WorkSectionProps) {

  const [activate, setActivate] = useState(false);

  function projects() {
    return [
      <ProjectThumb
        title="Etools V2"
        bgImage={TestImage1}
        tags={['Python', 'Flask', 'Svelte', 'TypeScript', 'C++', 'QT7 SDK', 'ReportLab', 'More...']}
      />,
      <ProjectThumb
        title="Little Lemon API"
        bgImage={TestImage1}
        tags={['Python', 'Django', 'DRF', 'RESTful API']}
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

  return (
    <div className="overflow-hidden">
      <div className="py-6 px-10 flex justify-center gap-10 flex-wrap">
        {projects().map((project, index) => {
          return (
          <div
            key={index}
            className="border-2 border-gray-500 rounded-md w-[300px] h-[200px]"
          >
            {project}
          </div>
          )
        })}
      </div>
    </div>
  )
}
