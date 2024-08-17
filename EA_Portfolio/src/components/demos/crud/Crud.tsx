import { useState, useEffect } from "react";

import * as auth from "../../../lib/auth";

import UserPosts from "./UserPosts";
import DemoLink from "../../ui/links/DemoLink";

export default function Oauth2() {

  const [isLogggendIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        setIsLoggedIn(res);
      });
  }, []);

  useEffect(() => {
  }, [isLogggendIn]);

  return (
    <div            
      className="w-full max-w-[1800px] flex justify-center p-4 lg:px-8"
    >
      <div className="flex justify-center items-center max-[719px]:flex-wrap">
        <div className="text-white min-[720px]:basis-[45%] min-[720px]:ml-auto sm:min-w-[350px] mt-4 min-[720px]:mt-0 order-1 min-[720px]:order-2">
          <div className="pt-0 sm:p-6 sm:pt-0">
            <header className="text-center text-3xl font-bold text-[#EF8275] mb-4">CRUD</header>
            <p className="">
                CRUD stands for Create, Read, Update, and Delete. It is a set of operations that can be performed on a database or data store. This demo allows you to perform CRUD operations on a <DemoLink
                displayText="PostgreSQL"
                url="https://www.postgresql.org/about/"
                className="ml-0 mr-0"
              /><></> database running on <DemoLink
                displayText="AWS RDS"
                url="https://aws.amazon.com/rds/"
                className="ml-0 mr-1"
              /> via a <DemoLink
                displayText="RESTful API"
                url="https://aws.amazon.com/what-is/restful-api/"
                className="ml-0 mr-1"
              /> powered by <DemoLink
                displayText="DRF"
                url="https://www.django-rest-framework.org/"
                className="ml-0 mr-1"
              />              
                , associating your Google account with the data you create.
            </p>
            <br/>
            <p>
              Only you can see the posts you create and you can delete them at any time. Your posts will persist even if you logout. Posts are automatically deleted at midnight PST.
            </p>
          </div>
        </div>
        <div className="max-[720px]:w-full min-[720px]:ml-auto order-2 min-[720px]:order-1 min-[720px]:basis-[55%] min-[720px]:max-w-[50%] mt-4 min-[720px]:mt-0">
          <UserPosts locked={!isLogggendIn}/>
        </div>
      </div>
  </div>    
  )
}
