import React, { useState } from "react"

import AnimReset from "../../components/animReset/AnimReset";
import ProjectView from "../../components/projectview/ProjectView";
import TestImage2 from "../../assets/testImage2.png";

import JSHeader from "../../components/jsheader/JSHeader";
import TestImage1 from "../../assets/testImage1.png";

interface DemoSectionProps {
  children?: React.ReactNode
}

export default function DemoSection({}: DemoSectionProps) {

  const [activate, setActivate] = useState(false);

  return (
    <div className="w-full">
      <div className="w-full">
        <AnimReset
          hideOnStart={true}
          active={activate}
          cascadeDelay={300}
          resetDelay={1000}
        >
          <ProjectView
            className="w-[900px]"
            title = "LittleLemon REST API"
            description="The LittleLemon REST API is a peer-reviewed REST API project required for the Meta Back-End Developer Professional Certification. Implements proper token authentication, user group permissions, filtering, pagination, and throttling. Made with Django and Django REST Framework (DRF)."
            // images={[TestImage1, TestImage2]}
            techStack={['Python', 'Django', 'Django REST Framework']}
            github={{url: "https://github.com/PixelOmen/littlelemon_drf_rest_api"}}
          />
        </AnimReset>
        <div className="flex justify-center mt-10">
          <button
            onClick={() => setActivate(!activate)}
            className="border-2 p-2"
          >
            Test
          </button>
        </div>
      </div>
    </div>
  )
}
