import { useEffect, useRef, useState } from "react";

interface UserPostsProps {
}

export default function UserPosts( {} : UserPostsProps) {

  const [editRequested, setEditRequested] = useState(-1);

  function editCallback(postid: number) {
    setEditRequested(postid);
  }

  return (
    <div className="w-full">
      <div className="h-[300px] border-2 border-gray-500 bg-gray-200 rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex flex-col gap-5 h-full p-4 overflow-y-auto">
          <SinglePost
            dateCreated="2021-10-10"
            content="This is a post"
            userid={1}
            postid={1}
            editCallback={editCallback}
            editRequested={editRequested}
          />
          <SinglePost
            dateCreated="2021-10-10"
            content="This is a post"
            userid={1}
            postid={2}
            editCallback={editCallback}
            editRequested={editRequested}
          />
          <SinglePost
            dateCreated="2021-10-10"
            content="This is a post"
            userid={1}
            postid={3}
            editCallback={editCallback}
            editRequested={editRequested}
          />
          <SinglePost
            dateCreated="2021-10-10"
            content="This is a post"
            userid={1}
            postid={4}
            editCallback={editCallback}
            editRequested={editRequested}
          />
          <SinglePost
            dateCreated="2021-10-10"
            content="This is a post"
            userid={1}
            postid={5}
            editCallback={editCallback}
            editRequested={editRequested}
          />
        </div>
      </div>
      <textarea
        rows={2}
        placeholder="Enter a post..."
        className="w-full border-2 border-gray-500 enterDown border-t-0 rounded-lg rounded-tl-none rounded-tr-none bg-gray-200 p-2"
      />
    </div>
  )
}




interface SinglePostProps {
  dateCreated: string;
  content: string;
  userid: number;
  postid: number;
  editRequested: number;
  editCallback: (postid: number) => void;
}

function SinglePost({
  dateCreated,
  content,
  userid,
  postid,
  editRequested,
  editCallback
} : SinglePostProps) {

  const [isEditing, setIsEditing] = useState(false);
  const displayRef = useRef<HTMLDivElement>(null);
  const editRef = useRef<HTMLTextAreaElement>(null);

  function requestEdit() {
    editCallback(postid);
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

    if (editRequested == postid) {
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
    data-userid={userid}
    >

      <div className="p-2">

        <div className="mb-2">
          <div className="flex gap-1 items-center">
            <div className="ml-1">
              {dateCreated}
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
            <textarea ref={editRef} className="w-full border-2 border-black bg-gray-500 text-white p-2 rounded-sm" defaultValue={content}/>
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
