import axios, { AxiosError } from "axios";

const CLIENT_DOMAIN = import.meta.env.VITE_CLIENT_DOMAIN;
const LOGGEDIN_URL = CLIENT_DOMAIN + import.meta.env.VITE_LOGGEDIN_URL;

const API_URL = import.meta.env.VITE_API_URL;
const API_GOOGLE_CODE_TO_TOKEN_URL = API_URL + import.meta.env.VITE_API_GOOGLE_CODE_TO_TOKEN_URL;
const API_CONVERT_TOKEN_URL = API_URL + import.meta.env.VITE_API_CONVERT_TOKEN_URL;

const GOOGLE_CLIENT_ID = encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const GOOGLE_SCOPE = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);
const GOOGLE_REDIRECT_URI = CLIENT_DOMAIN + import.meta.env.VITE_GOOGLE_REDIRECT_URI; // not URIencoded for direct use

const GOOGLE_USER_LOGIN_URL = `${import.meta.env.VITE_GOOGLE_USER_LOGIN_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}`;


export interface TokenError {
  errorString: string;
  axiosError: AxiosError;
}


export function isLoggedIn(): boolean {
  return localStorage.getItem('access_token') !== null;
}

export function logOut(): void {
  localStorage.removeItem('access_token');
  window.location.reload();
}

export function googleLogIn(): void {
  if (isLoggedIn()) {
    window.location.href = LOGGEDIN_URL;
  } else {
    window.location.href = GOOGLE_USER_LOGIN_URL;
  }
}



function parseGoogleCode(currentUrl: string): string | null {
  const url = new URL(currentUrl);
  const urlParams = new URLSearchParams(url.search);
  return urlParams.get('code');
}


export async function checkForGoogleRedirect(): Promise<void | TokenError> {
  const currentUrl = new URL(window.location.href);
  const redirectUrl = new URL(GOOGLE_REDIRECT_URI);
  if (redirectUrl.pathname !== currentUrl.pathname) return;

  if (isLoggedIn()) {
    window.location.href = LOGGEDIN_URL;
    return;
  }

  const code = parseGoogleCode(currentUrl.href);
  if (!code) throw new Error('No code found in URL: ' + currentUrl.href);

  return axios.post(API_GOOGLE_CODE_TO_TOKEN_URL, { code })
    .then(res => {
      const payload = {
        grant_type: 'convert_token',
        client_id: GOOGLE_CLIENT_ID,
        backend: 'google-oauth2',
        token: res.data.access_token
      }
      return axios.post(API_CONVERT_TOKEN_URL, payload)
        .then(res => {
          localStorage.setItem('access_token', res.data.access_token);
          window.location.href = LOGGEDIN_URL;
        })
        .catch(err => {
          return {errorString: 'Error converting token', axiosError: err};
        });
    })
    .catch(err => {
      return {errorString: 'Error getting token from code', axiosError: err};
    });

}