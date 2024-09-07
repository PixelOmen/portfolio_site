import { useEffect, useRef, useState } from "react";

import * as auth from "../../../lib/auth";
import type { UserLimits } from "../../../lib/userLimits";
import { chatSocketConnection, ServerMessage } from "../../../lib/ws";
import DemoError from "../demoError/DemoError";

import LockIcon from "../../ui/icons/LockIcon";
import GoogleSignIn from "../../ui/social/GoogleSignIn";

interface ChatPostData {
  chatID: string;
  content: string;
  owner: "gpt" | "user";
  date_posted: string;
}

interface ChatPostsProps {
  locked?: boolean;
  userLimits: UserLimits | null;
}

export default function ChatPosts({locked = true, userLimits}: ChatPostsProps) {

  const [posts, setPosts] = useState<ChatPostData[]>([]);
  const postAreaRef = useRef<HTMLDivElement>(null);
  const newTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const lockedScreenRef = useRef<HTMLDivElement>(null);

  const chatSocketConnRef = useRef<WebSocket | null>(null);
  const allowSendRef = useRef<boolean>(true);
  const [error, setError] = useState<string>("");


  function disableSend() {
    allowSendRef.current = false;
    newTextAreaRef.current!.disabled = true;
    newTextAreaRef.current!.placeholder = "Processing...";
    newTextAreaRef.current!.classList.add('bg-slate-400');
    newTextAreaRef.current!.classList.add('placeholder-gray-100');
  }

  function enableSend() {
    allowSendRef.current = true;
    newTextAreaRef.current!.disabled = false;
    newTextAreaRef.current!.placeholder = "Message ChatGPT...";
    newTextAreaRef.current!.classList.remove('bg-slate-400');
    newTextAreaRef.current!.classList.remove('placeholder-gray-100');
    newTextAreaRef.current!.focus();
  }

  function addToPosts(data: ChatPostData) {
    setPosts(prevPosts => [...prevPosts, data]);
    setTimeout(() => {
      postAreaRef.current?.scrollTo({top: 5000, behavior: 'smooth'});
    }, 200);
  }

  function appendStream(data: ServerMessage) {
    if (!data.chatID) {
      console.error("No chatID in stream data.");
      return;
    }

    const existingDiv = postAreaRef.current?.querySelector(`[data-chatid="${data.chatID}"]`);

    if (existingDiv) {
      existingDiv.textContent += data.payload;
      return;
    } else {
      const postData: ChatPostData = {
        chatID: data.chatID,
        content: data.payload.replace('\n\n', '<br>'),
        owner: "gpt",
        date_posted: new Date().toLocaleString()
      }
      addToPosts(postData);
    }
    postAreaRef.current?.scrollTo({top: 5000, behavior: 'smooth'});
  }

  function handleError(event: any) {
    console.error(event);
    setError("An error occurred. Please try again later. Code: " + event.code);
  }

  function handleServerMessage(event: any) {
    const data: ServerMessage = JSON.parse(event.data);
    if (data.error) {
      setError(data.error);
      enableSend();
      return;
    }
    switch (data.type) {
      case "data":
        console.log(data.payload);
        enableSend();
        return;
      case "endStream":
        setError("");
        enableSend();
        setTimeout(() => {
          postAreaRef.current?.scrollTo({top: 5000, behavior: 'smooth'});
        }, 200);
        return;
      case "stream":
        appendStream(data);
        return;
      default:
        console.error("Unknown message type: " + data.type);
    }
  }

  function sendPost(content: string): void {
    if (!content || !chatSocketConnRef.current) return;
    disableSend();
    addToPosts({
      chatID: "user",
      content,
      owner: "user",
      date_posted: new Date().toLocaleString()
    });
    chatSocketConnRef.current.send(content);
  }
    
  function addPostViaEnter(e: KeyboardEvent) {
    if (e.key == 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!allowSendRef.current) return;
      sendPost(newTextAreaRef.current!.value);
      newTextAreaRef.current!.value = '';
    }
  }

  function addPostViaClick() {
    if (!allowSendRef.current) return;
    sendPost(newTextAreaRef.current!.value);
    newTextAreaRef.current!.value = '';
  }


  // ------------------ Effects ------------------
  useEffect(() => {
    auth.isLoggedIn()
      .then(res => {
        if (res) {
          chatSocketConnRef.current = chatSocketConnection("/", handleServerMessage, handleError);
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
          className="absolute top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 z-10 rounded-lg"
        >
          <div className="flex flex-col gap-10 justify-center items-center h-full">
            <LockIcon/>
            <GoogleSignIn clickCallback={auth.googleLogIn}/>
          </div>
        </div>
      )}
      <div className={`h-[340px] border-2 border-gray-500 bg-slate-200 rounded-lg rounded-bl-none rounded-br-none ${locked && 'opacity-0'}`}>
        <div
          ref={postAreaRef}
          className="flex flex-col gap-5 h-full p-4 overflow-y-auto"
        >
          {posts && posts.map((post, index) => {
              return (
                <SinglePost
                  key={index}
                  chatID={post.chatID}
                  content={post.content}
                  owner={post.owner}
                  date_posted={post.date_posted}
                />
              )
            }
          )}
        </div>
      </div>
      <div className="relative">
        <textarea
          ref={newTextAreaRef}
          rows={2}
          maxLength={userLimits ? userLimits.max_post_length : 200}
          placeholder="Message ChatGPT..."
          className={`block w-full py-3 pl-4 pr-14 border-2 outline-none border-gray-500 enterDown border-t-0 rounded-lg rounded-tl-none rounded-tr-none bg-slate-200 focus:border-black duration-500 ${locked && 'opacity-0'}`}
        />
        <div
          onClick={addPostViaClick}
          className={`absolute top-1/2 -translate-y-1/2 right-5 px-2 text-base text-black border-2 border-gray-500 rounded-full cursor-pointer ${locked && 'opacity-0'}`}
        >
          {">"}
        </div>
      </div>

      <DemoError error={error}/>

    </div>
  )
}








interface SinglePostProps {
  chatID: string;
  content: string;
  owner: string;
  date_posted: string;
}

function SinglePost({
  chatID,
  content,
  owner,
  date_posted
} : SinglePostProps) {

  return (
    <div
      className="w-full border-2 border-gray-400 bg-slate-200 rounded-lg text-xs drop-shadow-md shadow-black"
      data-userid={owner}
    >

      <div className="p-2 overflow-hidden">

        <div className="mb-2">
          <div className="flex gap-1 items-center">
            <div className={`${owner == "user" ? "ml-1" : "ml-auto"}`}>
              {owner == "user" ? "You" : "GPT"} - {date_posted}
            </div>
          </div>
        </div>

        <div
          className="transition-all duration-200"
        >
          <div
            data-chatid={chatID}
            data-owner={owner}
            className="bg-gray-300 rounded-lg p-2 enterDown"
          >
            {content}
          </div>
        </div>

      </div>

    </div>
  )
}
