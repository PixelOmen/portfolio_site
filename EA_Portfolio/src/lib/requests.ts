import axios from "axios";
import * as auth from "./auth";


// ----- API Instances -----
export const authAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

export const anonAPI = axios.create({
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

export const anonFormAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json',
    }
});



// ----- Interceptors -----
authAPI.interceptors.request.use(
    config => {
        auth.logOutOnInvalidToken();
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
        auth.logOutOnInvalidToken();
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