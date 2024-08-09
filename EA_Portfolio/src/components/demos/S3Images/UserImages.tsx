import { useEffect, useRef, useState, useId } from "react";

import * as auth from "../../../lib/auth";
import { authInstAPI } from "../../../lib/requests";

import LockIcon from "../../ui/icons/LockIcon";
import GoogleSignIn from "../../ui/social/GoogleSignIn";

const ALLOWED_IMG_TYPES = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".bmp",
  ".webp",
  ".svg"
];

interface UserImagesProps {
  locked?: boolean;
}

export default function UserImages( { locked = true }: UserImagesProps ) {

  const fileInputId = useId();
  const lockedScreenRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full">
      {locked && (
        <div
          ref={lockedScreenRef}
          className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 rounded-lg"
        >
          <div className="flex flex-col gap-10 justify-center items-center h-full">
            <LockIcon/>
            <GoogleSignIn clickCallback={auth.googleLogIn}/>
          </div>
        </div>
      )}
      <div
        className={`h-[340px] p-4 border-2 border-gray-500 bg-gray-200 rounded-lg overflow-y-auto ${locked && 'opacity-0'}`}
      >
        test
      </div>
      <div className={`mt-2 flex justify-center bg-${locked && 'opacity-0'}`}>
        <label
          htmlFor={fileInputId}
          className="block max-w-max cursor-pointer bg-[#EF8275] text-white rounded-md p-2 hover:scale-105 duration-200" 
        >
          Upload Image
        </label>
        <input
          type="file"
          accept={ALLOWED_IMG_TYPES.join(",")}
          id={fileInputId}
          className="hidden"
        />
      </div>
    </div>
  )
}
