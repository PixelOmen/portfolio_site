import type { UserLimits } from "../../../lib/userLimits";

import ChatPosts from "./ChatPosts";
import DemoLink from "../../ui/links/DemoLink";

interface ChatProps {
  isLogggendIn: boolean;
  userLimits: UserLimits | null;
}

export default function Chat( { isLogggendIn = false, userLimits }: ChatProps ) {
  return (
    <div            
      className="w-full max-w-[1800px] flex justify-center p-4 lg:px-8"
    >
      <div className="flex justify-center items-center max-[719px]:flex-wrap">
        <div className="text-white min-[720px]:basis-[45%] min-[720px]:ml-auto sm:min-w-[350px] mt-4 min-[720px]:mt-0 order-1 min-[720px]:order-2">
          <div className="pt-0 sm:p-6 sm:pt-0">
            <header className="text-center text-3xl font-bold text-[#EF8275] mb-4">WebSockets / Chatbot</header>
            <p className="">
                This demo utilizes <DemoLink
                displayText="Django Channels"
                url="https://channels.readthedocs.io/en/stable/"
                className="ml-0 mr-0"
                /><></> and <DemoLink
                displayText="ASGI"
                url="https://asgi.readthedocs.io/en/latest/"
                className="ml-0 mr-1"
                /> to provide a a real-time chat interface powered by <DemoLink
                displayText="WebSockets"
                url="https://en.wikipedia.org/wiki/WebSocket"
                className="ml-0 mr-0"
                />, allowing messages to be sent asynchronously without waiting for an HTTP response. The connection remains open, so your messages are sent immediately, while the chatbot - integrated with <DemoLink
                displayText="OpenAI's API"
                url="https://openai.com/api/"
                className="ml-0 mr-1"
                /> - streams in its response as soon as it processes the message.
            </p>
            <br/>
            <p>
              Only you can see your conversation. Conversation history is not stored, and none of your account information is sent to OpenAI. This chatbot is a simple demonstration of the capabilities of WebSockets and the OpenAI API. Conversations are limited to 10 messages a day. 
            </p>
          </div>
        </div>
        <div className="max-[720px]:w-full min-[720px]:ml-auto order-2 min-[720px]:order-1 min-[720px]:basis-[55%] min-[720px]:max-w-[50%] mt-4 min-[720px]:mt-0">
          <ChatPosts locked={!isLogggendIn} userLimits={userLimits}/>
        </div>
      </div>
  </div>    
  )
}
