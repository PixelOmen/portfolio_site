import React, { useState } from "react"

import JSHeader from "../../components/jsheader/JSHeader";
import ProjectThumb from "../../components/projectview/ProjectThumb";
import TestImage1 from "../../assets/testImage1.png";

import AnimReset from "../../components/animReset/AnimReset";
import ProjectView from "../../components/projectview/ProjectView";
import TestImage2 from "../../assets/testImage2.png";


interface WorkSectionProps {
  children?: React.ReactNode
}

export default function WorkSection({}: WorkSectionProps) {

  const [activate, setActivate] = useState(false);
  var recentWork = {}

  return (
    <div className="">
      <div className="p-4 flex justify-center gap-6 flex-wrap">
        <div className="border-4 border-black rounded-md">
          <ProjectThumb
            title="Little Lemon API"
            bgImage={TestImage1}
            tags={['Python', 'Django', 'DRF']}
          />
        </div>
        <div className="border-2 border-gray-500 rounded-md">
          <ProjectThumb
            title="Little Lemon API"
            bgImage={TestImage1}
            tags={['Python', 'Django', 'DRF']}
          />
        </div>
        <div className="border-2 border-gray-500 rounded-md">
          <ProjectThumb
            title="Little Lemon API"
            bgImage={TestImage1}
            tags={['Python', 'Django', 'DRF']}
          />
        </div>
        <div className="border-2 border-gray-500 rounded-md">
          <ProjectThumb
            title="Little Lemon API"
            bgImage={TestImage1}
            tags={['Python', 'Django', 'DRF']}
          />
        </div>                    
      </div>
    </div>
  )
}
