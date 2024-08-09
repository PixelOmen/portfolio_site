import { useEffect, useRef, useState } from "react";

import * as auth from "../../../lib/auth";
import { authInstAPI } from "../../../lib/requests";

import LockIcon from "../../ui/icons/LockIcon";
import GoogleSignIn from "../../ui/social/GoogleSignIn";

interface UserPostsProps {
  locked?: boolean;
}

export default function UserPosts({locked = true}: UserPostsProps) {

  const [editRequested, setEditRequested] = useState(-1);
  const [posts, setPosts] = useState<any[]>([]);
  const postAreaRef = useRef<HTMLDivElement>(null);
  const newTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const lockedScreenRef = useRef<HTMLDivElement>(null);

  function getPosts() {
    authInstAPI.get('v1/user-posts/')
      .then(res => {
        if (res.data.length == 0) {
          addPost("Here's one to get you started!");
        }
        setPosts(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function handleEditRequest(postid: number): void {
    setEditRequested(postid);
  }

  function handleEditConfirm(postid: number, content: string): void {
    if (!content) return;
    setEditRequested(-1);
    authInstAPI.put(`v1/user-posts/${postid}/`, {content})
    .then(() => {
        getPosts();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function deletePost(postid: number): void {
    authInstAPI.delete(`v1/user-posts/${postid}/`)
      .then(() => {
        getPosts();
      })
      .catch(err => {
        console.error(err);
      });
  }

  function addPost(content: string): void {
    if (!content) return;
    authInstAPI.post('v1/user-posts/', {content})
      .then(() => {
        getPosts();
        setTimeout(() => {
          postAreaRef.current?.scrollTo({top: 5000, behavior: 'smooth'});
        }, 100);
      })
      .catch(err => {
        console.error(err);
      });
    }
    
    function addPostViaEnter(e: KeyboardEvent) {
      if (e.key == 'Enter' && !e.shiftKey) {
        e.preventDefault();
        addPost(newTextAreaRef.current!.value);
        newTextAreaRef.current!.value = '';
      }
  }

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        if (res) {
          getPosts();
        }
      });
    newTextAreaRef.current?.addEventListener('keydown', addPostViaEnter);

    return () => {
      newTextAreaRef.current?.removeEventListener('keydown', addPostViaEnter);
    }
  }, []);

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
      <div className={`h-[340px] border-2 border-gray-500 bg-gray-200 rounded-lg rounded-bl-none rounded-br-none ${locked && 'opacity-0'}`}>
        <div
          ref={postAreaRef}
          className="flex flex-col gap-5 h-full p-4 overflow-y-auto"
        >
          {posts && posts.map(post => {
              return (
                <SinglePost
                  key={post.id}
                  id={post.id}
                  date_posted={post.date_posted}
                  date_modified={post.date_modified}
                  content={post.content}
                  owner={post.owner}
                  editRequestCallback={handleEditRequest}
                  editConfirmCallback={handleEditConfirm}
                  deleteCallback={deletePost}
                  editRequested={editRequested}
                />
              )
            }
          )}
        </div>
      </div>
      <textarea
        ref={newTextAreaRef}
        rows={2}
        maxLength={200}
        placeholder="Enter a post and press Enter..."
        className={`block w-full py-3 px-4 border-2 outline-none border-gray-500 enterDown border-t-0 rounded-lg rounded-tl-none rounded-tr-none bg-gray-200 focus:border-black duration-500 ${locked && 'opacity-0'}`}
      />
    </div>
  )
}








interface SinglePostProps {
  id: number;
  date_posted: string;
  date_modified: string;
  content: string;
  owner: number;
  editRequested: number;
  editRequestCallback: (postid: number) => void;
  editConfirmCallback: (postid: number, content: string) => void;
  deleteCallback: (postid: number) => void;
}

function SinglePost({
  id,
  date_posted,
  date_modified,
  content,
  owner,
  editRequested,
  editRequestCallback,
  editConfirmCallback,
  deleteCallback
} : SinglePostProps) {

  const [isEditing, setIsEditing] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);

  function getDate(): {date: string, modified: boolean} {
    const postedDate = new Date(date_posted).toLocaleString();
    const modifiedDate = new Date(date_modified).toLocaleString();
    const modified = postedDate != modifiedDate;
    const displayDate = modified ? modifiedDate : postedDate;
    return {date: displayDate, modified}
  }

  function requestEdit() {
    editRequestCallback(id);
  }

  function editConfirm() {
    editConfirmCallback(id, editRef.current!.value);
  }

  function cancelEdit() {
    setIsEditing(false);
    editRequestCallback(-1);
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      cancelEdit();
    } else if (e.key == 'Enter' && !e.shiftKey) {
      editConfirm();
    }
  }

  useEffect(() => {

    if (editRequested == id) {
      setIsEditing(true)
      setTimeout(() => {
        editRef.current?.focus();
        editRef.current?.setSelectionRange(
          editRef.current.value.length, editRef.current.value.length
        );
        editRef.current?.addEventListener('keydown', handleKeydown);
      }, 100);
    } else {
      setIsEditing(false);
      editRef.current?.removeEventListener('keydown', handleKeydown);
    }

  }, [editRequested]);

  return (
    <div
      className="w-full border-2 border-gray-400 bg-gray-200 rounded-lg text-xs drop-shadow-md shadow-black"
      data-userid={owner}
    >

      <div className="p-2 overflow-hidden">

        <div className="mb-2">
          <div className="flex gap-1 items-center">
            <div className="ml-1">
              {getDate().date}
              {getDate().modified && <span className="text-xs text-gray-500"> (edited)</span>}
            </div>
            <button
              onClick={() => deleteCallback(id)}
              title="Delete"
              className="ml-auto px-2 font-sourcecode text-red-600 font-bold text-lg duration-200 hover:scale-x-150 hover:scale-y-125 hover:rotate-180 scale-y-75"
            >
              X
            </button>
          </div>
        </div>

        <div
          onClick={requestEdit}
          className="transition-all duration-200"
        >
      
          {isEditing ? (
            <textarea
              ref={editRef}
              rows={3}
              maxLength={200}
              defaultValue={content}
              className="w-full border-2 border-black bg-gray-500 text-white p-2 rounded-sm"
            />
          ) : (
            <div
              title="Click to edit"
              ref={displayRef}
              className="cursor-pointer bg-gray-300 hover:bg-[#EF8275] hover:text-white rounded-lg p-2 enterDown"
            >
              {content}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="mt-1 pl-1">
            Press Esc to
            <button
              onClick={cancelEdit}
              className="text-blue-600 px-1"
            >
              Cancel
            </button>
            - Press Enter to
            <button
              onClick={() => editConfirmCallback(id, editRef.current!.value)}
              className="text-blue-600 px-1"
            >
              Save
            </button>
          </div>
        )}

      </div>

    </div>
  )
}
