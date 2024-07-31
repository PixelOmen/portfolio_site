import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const GOOGLE_CLIENT_ID = encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const GOOGLE_REDIRECT_URI = encodeURIComponent(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
const GOOGLE_SCOPE = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);

export const GOOGLE_AUTH_URL = `${import.meta.env.VITE_GOOGLE_AUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=${GOOGLE_SCOPE}`;

export function authCodeToToken(code: string) {
  return axios.post(`${API_URL}/socialauth/google`, { code });
}

// This needs to go in a component somewhere on redirect
function parseUrl() {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    console.log(Array.from(urlParams.entries()));
    const code = urlParams.get('code');
    console.log(code);
  }