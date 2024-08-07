import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";

import UserPosts from "./UserPosts";

export default function Oauth2() {

  const [isLogggendIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
  }, []);

  useEffect(() => {
    if (isLogggendIn) {
      auth.getGoogleInfo()
        .then(res => {
          setUserInfo(res.data);
        })
        .catch(err => {
          console.error(err);
          auth.logOut();
        });
    }
  }, [isLogggendIn]);

  return (
    <div            
      className="w-full max-w-[1300px] flex justify-center sm:p-4 lg:px-8"
    >
      <div className="flex justify-center items-center flex-wrap py-6">
        <div className="pl-5 basis-[50%] min-[800px]:ml-auto min-[800px]:max-w-[50%] sm:min-w-[350px] mt-4 min-[800px]:mt-0 order-1 min-[800px]:order-2">
          <div className="p-2 pt-0 sm:p-6 sm:pt-0">
            <header className="text-3xl font-bold text-[#EF8275] text-center mb-4">CRUD</header>
            <p className="">
              CRUD stands for Create, Read, Update, and Delete. It is a set of operations that can be performed on a database or data store. This demo allows you to perform CRUD operations on a database using a RESTful API, associating your Google account with the data you create. Only you can see the posts you create, you can delete them at any time, and posts will be deleted after 24 hours.
              <a
                className="text-[#EF8275] underline ml-2 font-bold"
                href="https://en.wikipedia.org/wiki/Create,_read,_update_and_delete"
                target="_blank"
              >
                Learn more
              </a>
            </p>
          </div>
        </div>
        <div className="flex justify-center order-2 min-[800px]:order-1 min-[800px]:mx-auto basis-[50%] px-5">
          <UserPosts/>
        </div>
      </div>
  </div>    
  )
}
