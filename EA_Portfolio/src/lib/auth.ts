import axios from "axios";

const client_id = encodeURIComponent(import.meta.env.VITE_GOOGLE_CLIENT_ID);
const redirect_uri = window.location.origin + '/' + encodeURIComponent(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
const scope = encodeURIComponent(import.meta.env.VITE_GOOGLE_SCOPE);
const authUrl = `${import.meta.env.VITE_GOOGLE_AUTH_URL}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;