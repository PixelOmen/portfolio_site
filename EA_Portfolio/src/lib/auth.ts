import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const GOOGLE_AUTH_TO_TOKEN_URL = import.meta.env.VITE_API_GOOGLE_CODE_TO_TOKEN_URL;

const GOOGLE_CLIENT_ID = encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const GOOGLE_SCOPE = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);

export const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI; // not encoded for export
export const GOOGLE_USER_LOGIN_URL = `${import.meta.env.VITE_GOOGLE_USER_LOGIN_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}`;


export function parseGoogleCode(currentUrl: string) {
  const url = new URL(currentUrl);
  const urlParams = new URLSearchParams(url.search);
  return urlParams.get('code');
}

export function authCodeToToken(code: string) {
  return axios.post(GOOGLE_AUTH_TO_TOKEN_URL, { code });
}
