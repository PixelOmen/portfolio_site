import axios from "axios";
import * as auth from "./auth";

export interface ServerLimits {
    max_image_size: number;
    max_user_images: number;
    max_post_size: number;
    allowed_image_extensions: string[];
  }



// ----- API Instances -----
export const authInstAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const userUploadsAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});

export const anonInstAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});



// ----- Interceptors -----
authInstAPI.interceptors.request.use(
    config => {
        const tokenHeader = auth.getAuthHeader();
        if (!tokenHeader) {
            return Promise.reject('No token for authInstAPI');
        }
        config.headers.Authorization = tokenHeader;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

userUploadsAPI.interceptors.request.use(
    config => {
        const tokenHeader = auth.getAuthHeader();
        if (!tokenHeader) {
            return Promise.reject('No token for userUploadsAPI');
        }
        config.headers.Authorization = tokenHeader;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);