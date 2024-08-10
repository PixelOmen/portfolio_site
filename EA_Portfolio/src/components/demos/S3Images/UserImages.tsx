import { useEffect, useRef, useState, useId } from "react";

import * as auth from "../../../lib/auth";
import { authInstAPI, userUploadsAPI } from "../../../lib/requests";
import type { ServerLimits } from "../../../lib/requests";

import LockIcon from "../../ui/icons/LockIcon";
import GoogleSignIn from "../../ui/social/GoogleSignIn";

interface UserImagesProps {
  locked?: boolean;
}

export default function UserImages( { locked = true }: UserImagesProps ) {

  const fileInputId = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lockedScreenRef = useRef<HTMLDivElement>(null);
  const serverLimits = useRef<ServerLimits | null>(null);
  const [allowedImgTypes, setAllowedImgTypes] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  function getServerLimits() {
    authInstAPI.get('v1/server-limits/')
      .then(res => {
        serverLimits.current = res.data;
        setAllowedImgTypes(res.data.allowed_image_extensions);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function validateFile(file: File): string {
    if (!serverLimits.current) {
      return "Server limits not loaded";
    }
    const currentLimits = serverLimits.current;
    if (file.size > currentLimits.max_image_size) {
      const maxSize = currentLimits.max_image_size / 1024 / 1024;
      return `File size too large, max size is ${maxSize}MB`;
    }
    if (!currentLimits.allowed_image_extensions.includes(file.type.toLowerCase())) {
      return "File type unsupported, sorry 😢";
    }
    return "";
  }

  function handleUpload() {
    if (!fileInputRef.current?.files || fileInputRef.current.files.length < 1) {
      setError("");
      return;
    } 
    if (!serverLimits.current) {
      setError("Server limits not loaded");
      return;
    }

    const file = fileInputRef.current.files[0];
    fileInputRef.current.value = '';
    const error = validateFile(file);
    if (error) {
      console.error(error);
      setError(error);
      fileInputRef.current.value = '';
      return;
    }

    setError("");
    const formData = new FormData();
    formData.append('image', file);
    userUploadsAPI.post('v1/user-images/', formData)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
        setError(error);
      });
  }

  useEffect(() => {
    if (locked) return;
    getServerLimits();
    fileInputRef.current?.addEventListener('change', handleUpload);

    return () => {
      fileInputRef.current?.removeEventListener('change', handleUpload);
    }
  }, [locked]);

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
      <div className={`mt-2 flex justify-center ${locked && 'opacity-0'}`}>
        <label
          htmlFor={fileInputId}
          className="block max-w-max cursor-pointer bg-[#EF8275] hover:bg-[#f66757] text-white rounded-md p-2 px-3 hover:px-4 active:px-3 duration-200" 
        >
          Upload Image
        </label>
        <input
          ref={fileInputRef}
          id={fileInputId}
          type="file"
          accept={allowedImgTypes.join(",")}
          className="hidden"
          multiple={false}
        />
      </div>
      {error && (
        <div className="fadeInDown text-center text-red-500 mt-1">
          {error}
        </div>
      )}
    </div>
  )
}
