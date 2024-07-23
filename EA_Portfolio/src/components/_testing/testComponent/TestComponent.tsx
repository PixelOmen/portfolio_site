import React, { useRef, useState, useEffect } from "react"
import styles from './testcomp.module.css'

import AnimReset from "../../animReset/AnimReset"
import Projectview from "../../projectview/Projectview"
import TestImage1 from "../../../assets/testImage1.png"
import TestImage2 from "../../../assets/testImage2.png"

interface TestComponentProps {
  children?: React.ReactNode
}

export default function TestComponent({ children }: TestComponentProps) {

  const [activate, setActivate] = useState(false);

  return (
    <div className="border-2">
      <AnimReset active={activate}>
        <div className="flex justify-center">
          <ul className="text-2xl border-2">
            <li className="casc-fadeInLeft opacity-0">test</li>
            <li className="casc-fadeInRight opacity-0">test</li>
            <li>test</li>
          </ul>
        </div>
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
