import { CHAT_ROOT } from "./auth";

export interface ServerMessage {
  type: "stream" | "endStream" | "data";
  payload: any;
  error?: string;
  chatID?: string;
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

  const access_token = localStorage.getItem('access_token');
  if (access_token) {
    document.cookie = `access_token=${access_token}`;
  }
  return rootSocketConnection(CHAT_ROOT + subpath, onMessageCallback, onCloseCallback);

}