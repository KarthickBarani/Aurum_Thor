import axios from 'axios';
import { axiosInstance } from './AxiosInstance';
export const AxiosInsert = async (url: string, body: any): Promise<any> => {
  let response: any;
  response = await axiosInstance.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};

export const AxiosUpdate = async (url: string, body: any): Promise<any> => {
  let response: any;
  response = await axiosInstance.patch(url, body, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};

export const AxiosGet = async (url: string): Promise<any> => {
  let response: any;
  response = await axiosInstance.get(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  response = await response.data;
  return response;
};

export const baseUrl = process.env.REACT_APP_BACKEND_BASEURL
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const axiosGet = (url: string) => axios.get(baseUrl + url, config)
export const axiosPost = (url: string, data: any) => axios.post(baseUrl + url, data, config)
export const axiosPatch = (url: string, data: any) => axios.patch(baseUrl + url, data, config)
export const axiosDelete = (url: string) => axios.delete(baseUrl + url, config)