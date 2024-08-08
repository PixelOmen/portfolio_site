import { useEffect, useRef, useState } from "react";

import * as auth from "../../../lib/auth";
import { authInstAPI } from "../../../lib/requests";

interface UserPostsProps {
}

export default function UserPosts( {} : UserPostsProps) {

  const [editRequested, setEditRequested] = useState(-1);
  const [posts, setPosts] = useState<any[]>([]);
  const newTextAreaRef = useRef<HTMLTextAreaElement>(null);

  function getPosts() {
    authInstAPI.get('v1/user-posts/')
      .then(res => {
        setPosts(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  function editCallback(postid: number) {
    setEditRequested(postid);
  }

  function addPost(e: KeyboardEvent) {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('Enter pressed');
    }
  }

  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        if (res) {
          getPosts();
        }
      });
    newTextAreaRef.current?.addEventListener('keydown', addPost);

    return () => {
      newTextAreaRef.current?.removeEventListener('keydown', addPost);
    }
  }, []);

  return (
    <div className="w-full">
      <div className="h-[300px] border-2 border-gray-500 bg-gray-200 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex flex-col gap-5 h-full p-4 overflow-y-auto">
          {posts && posts.map(post => {
              return (
                <SinglePost
                  key={post.id}
                  id={post.id}
                  date_posted={post.date_posted}
                  content={post.content}
                  owner={post.owner}
                  editCallback={editCallback}
                  editRequested={editRequested}
                />
              )
            }
          )}
        </div>
      </div>
      <textarea
        ref={newTextAreaRef}
        rows={3}
        maxLength={200}
        placeholder="Enter a post and press Enter..."
        className="w-full border-2 border-gray-500 enterDown border-t-0 rounded-lg rounded-tl-none rounded-tr-none bg-gray-200 p-2"
      />
    </div>
  )
}




interface SinglePostProps {
  id: number;
  date_posted: string;
  content: string;
  owner: number;
  editRequested: number;
  editCallback: (postid: number) => void;
}

function SinglePost({
  id,
  date_posted,
  content,
  owner,
  editRequested,
  editCallback
} : SinglePostProps) {

  const [isEditing, setIsEditing] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);

  function requestEdit() {
    editCallback(id);
  }

  function cancelEdit() {
    setIsEditing(false);
    editCallback(-1);
  }

  function escapeEdit(e: KeyboardEvent) {
    if (e.key == 'Escape') {
      cancelEdit();
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
        editRef.current?.addEventListener('keydown', escapeEdit);
      }, 100);
    } else {
      setIsEditing(false);
      editRef.current?.removeEventListener('keydown', escapeEdit);
    }

  }, [editRequested]);

  return (
    <div
    className="w-full border-2 border-gray-400 bg-gray-200 rounded-lg text-xs"
    data-userid={owner}
    >

      <div className="p-2">

        <div className="mb-2">
          <div className="flex gap-1 items-center">
            <div className="ml-1">
              {new Date(date_posted).toLocaleString()}
            </div>
            <button
              title="Delete"
              className="ml-auto px-2 font-sourcecode text-red-600 font-bold text-lg duration-200 hover:scale-150 hover:rotate-180"
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
              className="cursor-pointer bg-gray-300 hover:bg-orange-100 rounded-sm p-2"
            >
              {content}
            </div>
          )}
        </div>

        {isEditing && (
          <div className="mt-1">
            Press Esc to
            <button
              onClick={cancelEdit}
              className="text-blue-600 px-1"
            >
              Cancel
            </button>
            - Press Enter to
            <button
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
