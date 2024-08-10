import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";
import UserImages from "./UserImages";
import DemoLink from "../../ui/links/DemoLink";

export default function S3Images() {

  const [isLogggendIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
  }, []);

  useEffect(() => {
    if (isLogggendIn) {

    }
  }, [isLogggendIn]);

  return (
    <div            
      className="w-full max-w-[1300px] flex justify-center p-4 lg:px-8"
    >
      <div className="flex justify-center items-center max-[719px]:flex-wrap">
        
        <div className="max-[720px]:w-full min-[720px]:ml-auto min-[720px]:basis-[55%] min-[720px]:max-w-[45%]">
          <div className="p-4 pt-0 sm:p-6 sm:pt-0">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">Media Storage</header>
            <p className="">
              This demo allows you to upload images to an <DemoLink
                displayText="AWS S3"
                url="https://aws.amazon.com/s3/"
                className="ml-0 mr-1"
              /> bucket. The images are stored in a private bucket and associated with your Google account. Everytime an image loads, it is fetched from the bucket using a pre-signed URL, powered by <DemoLink
                displayText="Django-storages"
                url="https://django-storages.readthedocs.io/en/latest//"
                className="ml-0 mr-0"
              />.
            </p>
            <br/>
            <p>
              Only you can see the images you upload and you can delete them at any time. Your images will persist even if you logout. Images are limited to 5MB in size and you can have a maximum of 6 images at a time. Images are automatically deleted at midnight PST.
            </p>
          </div>
        </div>

        <div
          className="min-[720px]:basis-[50%] min-[720px]:ml-auto sm:min-w-[350px] mt-4 min-[720px]:mt-0"
        >
          <UserImages locked={!isLogggendIn}/>
        </div>

      </div>
  </div>    
  )
}
