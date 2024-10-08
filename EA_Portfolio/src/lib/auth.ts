import axios, { AxiosError } from "axios";

const CLIENT_DOMAIN = import.meta.env.VITE_CLIENT_DOMAIN;

const LOGGEDIN_URL = CLIENT_DOMAIN + import.meta.env.VITE_LOGGEDIN_URL;
const LOGGEDOUT_URL = CLIENT_DOMAIN + import.meta.env.VITE_LOGGEDOUT_URL;

export const CHAT_ROOT = import.meta.env.VITE_CHAT_ROOT;
export const API_ROOT = import.meta.env.VITE_API_ROOT;
const TOKEN_TEST_URL = API_ROOT + import.meta.env.VITE_API_TOKEN_TEST_URL;

const SOCIAL_ROOT = import.meta.env.VITE_SOCIAL_ROOT;
const SOCIAL_GOOGLE_CODE_TO_TOKEN_URL = SOCIAL_ROOT + import.meta.env.VITE_SOCIAL_GOOGLE_CODE_TO_TOKEN_URL;
const SOCIAL_CONVERT_TOKEN_URL = SOCIAL_ROOT + import.meta.env.VITE_SOCIAL_CONVERT_TOKEN_URL;

export const GOOGLE_REDIRECT_URI = CLIENT_DOMAIN + import.meta.env.VITE_GOOGLE_REDIRECT_URI; // not URIencoded for direct use
const GOOGLE_SCOPE = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);
const GOOGLE_CLIENT_ID = encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const GOOGLE_USER_LOGIN_URL = `${import.meta.env.VITE_GOOGLE_USER_LOGIN_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(GOOGLE_REDIRECT_URI)}&response_type=code&scope=${GOOGLE_SCOPE}`;

const GOOGLE_USER_INFO_URL = import.meta.env.VITE_GOOGLE_GET_USER_INFO_URL


export interface TokenError {
  errorString: string;
  axiosError: AxiosError;
}

// function generateState(length: number): string {
//   const array = new Uint8Array(length);
//   window.crypto.getRandomValues(array);
//   const state = Array.from(array);
//   return btoa(String.fromCharCode.apply(null, state));
// }


export function isLoggedIn(): Promise<boolean> {
  const authHeader = getAuthHeader();
  if (!authHeader) {
    return new Promise((resolve) => resolve(false));
  }
  return axios.get(TOKEN_TEST_URL, {
    headers: {
      'Authorization': authHeader
    }
  })
    .then(() => {
      return true;
    })
    .catch(err => {
      if (authHeader != null) {
        logOut();
      }
      console.error(err);
      return false;
    });
}

export function logOutOnInvalidToken(): void {
  isLoggedIn()
    .then(res => {
      if (!res && getAuthHeader() != null) logOut();
    });
}

export function logOut(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('google_token');
  document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  setTimeout(() => {
    window.location.href = LOGGEDOUT_URL;
  }, 500);
}

export function getAuthHeader(): string | null {
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  return `Bearer ${token}`;
}



// Google Specific ------------------------------------------------------------

export function getGoogleToken(): string | null {
  return localStorage.getItem('google_token');
}

export function getGoogleInfo(): Promise<any> {
  const googleToken = getGoogleToken();
  if (!googleToken) return new Promise((resolve) => resolve(null));

  return axios.get(GOOGLE_USER_INFO_URL, {
    headers: {
      'Authorization': 'Bearer ' + googleToken
    }
  })
}


export async function googleLogIn(): Promise<void> {
  if (await isLoggedIn()) {
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


function handleAccessDenied(currentUrl: string) {
  const url = new URL(currentUrl);
  const urlParams = new URLSearchParams(url.search);
  if (urlParams.has('error')) {
    const error = urlParams.get('error');
    if (error === 'access_denied') {
      logOut();
    }
  } else {
    throw new Error('No code found in URL: ' + url.href);
  }
}


export async function checkForGoogleRedirect(): Promise<void | TokenError> {
  const currentUrl = new URL(window.location.href);
  const redirectUrl = new URL(GOOGLE_REDIRECT_URI);
  if (redirectUrl.pathname !== currentUrl.pathname) return;
  
  if (await isLoggedIn()) {
    window.location.href = LOGGEDIN_URL;
    return;
  }
  
  const code = parseGoogleCode(currentUrl.href);
  if (!code) handleAccessDenied(currentUrl.href);
  
  console.log('Converting Google Auth to Token');
  return axios.post(SOCIAL_GOOGLE_CODE_TO_TOKEN_URL, { code })
    .then(res => {

      if (!res.data.access_token) {
        return {errorString: 'No access token in response', axiosError: null};
      }

      localStorage.setItem('google_token', res.data.access_token);
      const payload = {
        grant_type: 'convert_token',
        client_id: GOOGLE_CLIENT_ID,
        backend: 'google-oauth2',
        token: res.data.access_token
      }
      
      return axios.post(SOCIAL_CONVERT_TOKEN_URL, payload)
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