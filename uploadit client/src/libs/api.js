import axios from "axios";
import axiosAuth from "./axiosAuth";

const endpoint = `${process.env.VUE_APP_APIENDPOINT}/api`;

export default class
{
    static async validateToken()
    {
        return (await axiosAuth.get(`${endpoint}/auth/`)).data;
    }

    static async getApiLimits()
    {
        return (await axios.get(`${endpoint}/limits/`)).data;
    }

    static async login(username, password)
    {
        return (await axiosAuth.post(`${endpoint}/auth/login`, {
            data: {
                username,
                password
            }
        })).data;
    }

    static async register(username, password)
    {
        return (await axiosAuth.post(`${endpoint}/auth/register`, {
            data: {
                username,
                password
            }
        })).data;
    }

    static async upload(uploadData, onUploadProgress, cancelToken)
    {
        return (await axiosAuth.post(`${endpoint}/upload/`, { 
                data: uploadData,
                onUploadProgress,
                cancelToken
            },
            { "Content-Type": "multipart/form-data" }
        )).data;
    }

}
