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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const lockedScreenRef = useRef<HTMLDivElement>(null);
  const serverLimits = useRef<ServerLimits | null>(null);
  const [allowedImgTypes, setAllowedImgTypes] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  
  const [imageData, setImageData] = useState<SingleImageProps[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<boolean>(false);
  const loadedCountRef = useRef<number>(0);
  const imageCountRef = useRef<number>(imageData.length);
  const uploadLabelRef = useRef<HTMLLabelElement>(null);

  const uploadLabelReady = "Upload Image";
  const uploadLabelUploading = "Loading...";



  // ----- Validation, Limits, Loading ---------

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
    if (imageCountRef.current >= currentLimits.max_user_images) {
      return `Max images reached 😢. Delete an image to upload a new one.`;
    }
    if (file.size > currentLimits.max_image_size) {
      const maxSize = currentLimits.max_image_size / 1024 / 1024;
      return `File size too large, max size is ${maxSize}MB, sorry 😢`;
    }
    if (!currentLimits.allowed_image_extensions.includes(file.type.toLowerCase())) {
      return "File type unsupported, sorry 😢";
    }
    return "";
  }

  function loadedCallback() {
    loadedCountRef.current++;
    if (loadedCountRef.current >= imageCountRef.current) {
      setImagesLoaded(true);
    }
  }



  // ------- API Calls ---------

  function getImages() {
    authInstAPI.get('v1/user-images/')
      .then(res => {
        imageCountRef.current = res.data.length;
        loadedCountRef.current = 0;
        setImagesLoaded(false);
        setImageData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleUpload() {
    setError("");
    if (!fileInputRef.current?.files || fileInputRef.current.files.length < 1) {
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
    setImagesLoaded(false);
    userUploadsAPI.post('v1/user-images/', formData)
      .then(() => {
        getImages();
        setTimeout(() => {
          imageContainerRef.current?.scrollTo({top: 5000, behavior: 'smooth'});
        }, 500);
      })
      .catch(err => {
        console.error(err);
        setError(error);
        setImagesLoaded(true);
      });
  }

  function handleDelete(id: number) {
    setError("");
    userUploadsAPI.delete(`v1/user-images/${id}/`)
      .then(() => {
        getImages();
      })
      .catch(err => {
        console.error(err);
      });
  }




  // -------- Effects ----------

  useEffect(() => {
    if (locked) return;
    getServerLimits();
    getImages();
    fileInputRef.current?.addEventListener('change', handleUpload);

    return () => {
      fileInputRef.current?.removeEventListener('change', handleUpload);
    }
  }, [locked]);


  useEffect(() => {
    if (locked || !uploadLabelRef.current) return;
    if (imagesLoaded) {
      uploadLabelRef.current.textContent = uploadLabelReady;
      uploadLabelRef.current.classList.remove('min-w-[90%]');
      uploadLabelRef.current.classList.remove('pointer-events-none');
    } else {
      uploadLabelRef.current.textContent = uploadLabelUploading;
      uploadLabelRef.current.classList.add('min-w-[90%]');
      uploadLabelRef.current.classList.add('pointer-events-none');
    }
}, [imagesLoaded])





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
        ref={imageContainerRef}
        className={`h-[340px] border-2 border-gray-500 bg-gray-200 rounded-lg overflow-y-auto ${locked && 'opacity-0'}`}
      >
        <div
          className="p-6 flex gap-5 justify-center flex-wrap"
        >
        {imageData && imageData.map(data => (
            <SingleImage
              key={data.id}
              id={data.id}
              image={data.image}
              date_posted={data.date_posted}
              deleteCallback={handleDelete}
              loadedCallback={loadedCallback}
            />
          ))}
        </div>
      </div>
      <div className={`mt-4 sm:mt-2 flex justify-center ${locked && 'opacity-0'}`}>
        <label
          ref={uploadLabelRef}
          htmlFor={fileInputId}
          className="block min-w-full text-center cursor-pointer bg-[#EF8275] hover:bg-[#f66757] text-white rounded-md p-2 active:w-[90%] duration-200" 
        >
          {uploadLabelReady}
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
        <div className="text-center text-red-500 mt-1 rounded-lg animate-pulse">
          {error}
        </div>
      )}
    </div>
  )
}









interface SingleImageProps {
  id: number;
  image: string;
  date_posted: string;
  deleteCallback: (id: number) => void;
  loadedCallback: () => void;
}

function SingleImage({
  id,
  image,
  date_posted,
  deleteCallback,
  loadedCallback
}: SingleImageProps ) {

  const loadingRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current === null) return;
    imgRef.current.onload = () => {
      loadedCallback();
      if (loadingRef.current) {
        loadingRef.current.classList.add('-translate-y-[100%]');
      }
    }
  }, []);

  return (
    <div
      className="group relative rounded-xl overflow-hidden border-2 border-black"
    >
      <div
        ref={loadingRef}
        className="absolute w-full h-full bg-slate-600 z-10 duration-300"
      >
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-200"></div>
        </div>
      </div>
      <div
        className="absolute w-full top-0 left-1 z-10 translate-y-2 translate-x-12 group-hover:translate-x-0 transition-all duration-300"
      >
        <div className="ml-auto px-1 text-right w-max bg-gray-200 border-2 border-gray-700 rounded-lg">
          <button
            onClick={() => deleteCallback(id)}
            title="Delete"
            className="px-2 font-sourcecode text-red-600 font-bold text-lg duration-200 hover:scale-x-150 hover:scale-y-125 hover:rotate-180 scale-y-100"
          >
            X
          </button>
        </div>
      </div>
      <img
        ref={imgRef}
        src={image}
        title={`ImageID: ${id} - Posted: ${new Date(date_posted).toLocaleString()}`}
        alt={`ImageID: ${id}`}
        className="w-32 h-32 object-cover hover:scale-110 transform duration-500"
      />
    </div>
  )
}
