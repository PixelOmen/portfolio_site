import axios from "axios";
import * as auth from "./auth";

export const authInstAPI = axios.create({
    baseURL: auth.API_ROOT,
    headers: {
        'Content-Type': 'application/json',
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