import axios from 'axios';
import { axiosInstance } from './AxiosInstance';
import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { loginRequest } from '../authConfig';
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


export const useAxiosGet = () => {
  const { instance, accounts } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance.acquireTokenSilent(request).then((response) => {
      setAccessToken(response.accessToken);
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        setAccessToken(response.accessToken);
      });
    });
  }, [accounts])

  const config = {
    headers: {
      ContentType: 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  }


  return (url: string) => {
    return axios.get(baseUrl + url, config)
  }


}
const config = {
  headers: {
    ContentType: 'application/json',
  },
}
export const axiosGet = (url: string) => axios.get(baseUrl + url, config)
export const axiosPost = (url: string, data: any) => axios.post(baseUrl + url, data, config)
export const axiosPatch = (url: string, data: any) => axios.patch(baseUrl + url, data, config)
export const axiosPut = (url: string, data: any) => axios.put(baseUrl + url, data, config)
export const axiosDelete = (url: string) => axios.delete(baseUrl + url, config)