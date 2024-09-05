import { CHAT_ROOT } from "./auth";

export interface ServerMessage {
  type: "chat" | "data";
  payload: any;
  error?: string;
}

export function rootSocketConnection(
    url: string,
    onMessageCallback: (event: any) => void,
    onCloseCallback?: (event: any) => void
): WebSocket {
  if (!onCloseCallback) {
    onCloseCallback = (event) => {
      event.wasClean ? console.log(event) : console.error(event);
    }
  }
  const wsSocket = new WebSocket(url);
  wsSocket.onmessage = onMessageCallback;
  wsSocket.onclose = onCloseCallback;
  wsSocket.onerror = (error) => {
    console.error('WebSocket error:');
    console.error(error);
  };
  return wsSocket;
}

export function chatSocketConnection(
    subpath: string,
    onMessageCallback: (event: any) => void,
    onCloseCallback?: (event: any) => void
): WebSocket {
  return rootSocketConnection(CHAT_ROOT + subpath, onMessageCallback, onCloseCallback);
}