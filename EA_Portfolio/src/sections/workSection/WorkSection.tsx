import React, { useState } from "react"

import JSHeader from "../../components/jsheader/JSHeader";

import AnimReset from "../../components/animReset/AnimReset";
import ProjectView from "../../components/projectview/ProjectView";
import TestImage1 from "../../../assets/testImage1.png";
import TestImage2 from "../../../assets/testImage2.png";

import ProjectThumb from "../../components/projectview/ProjectThumb";

interface WorkSectionProps {
  children?: React.ReactNode
}

export default function WorkSection({}: WorkSectionProps) {

  const [activate, setActivate] = useState(false);
  var recentWork = {}

  return (
    <div className="">
      <JSHeader title="recentWork">
        <div className="mb-6 h-[300px] w-[550px] border-2">
          <ProjectThumb
            title="Little Lemon API"
            tags={['Python', 'Django', 'DRF']}
          />
        </div>
      </JSHeader>

      {/* <AnimReset active={activate} cascadeDelay={300}>
        <ProjectView
          hideOnStart={true}
          className="w-[900px]"
          title = "LittleLemon REST API"
          description="The LittleLemon REST API is a peer-reviewed REST API project required for the Meta Back-End Developer Professional Certification. Implements proper token authentication, user group permissions, filtering, pagination, and throttling. Made with Django and Django REST Framework (DRF)."
          images={[TestImage1, TestImage2]}
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
      </div> */}
    </div>
  )
}
