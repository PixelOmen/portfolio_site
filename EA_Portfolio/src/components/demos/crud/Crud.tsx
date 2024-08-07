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
      className="w-full max-w-[1300px] flex justify-center p-4 lg:px-8"
    >
      <div className="flex justify-center items-center max-[719px]:flex-wrap">
        <div className="min-[720px]:basis-[45%] min-[720px]:ml-auto sm:min-w-[350px] mt-4 min-[720px]:mt-0 order-1 min-[720px]:order-2">
          <div className="p-4 pt-0 sm:p-6 sm:pt-0">
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
        <div className="max-[720px]:w-full min-[720px]:ml-auto order-2 min-[720px]:order-1 min-[720px]:basis-[55%] min-[720px]:max-w-[50%]">
          <UserPosts/>
        </div>
      </div>
  </div>    
  )
}
