import React, { useRef, useState, useEffect } from "react"
import styles from './testcomp.module.css'

import AnimReset from "../../animReset/AnimReset";
import ProjectView from "../../projectview/ProjectView";
import TestImage1 from "../../../assets/testImage1.png";
import TestImage2 from "../../../assets/testImage2.png";

interface TestComponentProps {
  children?: React.ReactNode
}

export default function TestComponent({ children }: TestComponentProps) {

  const [activate, setActivate] = useState(false);

  return (
    <div className="border-2">
      <AnimReset active={activate} cascadeDelay={300}>
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
      </div>
    </div>
  )
}
