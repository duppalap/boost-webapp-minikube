import axios from 'axios';
import { environment } from './environment';

export interface ApiParameters {
  url: string;
  method: any;
  headers?: { [key: string]: string };
  params?: { [key: string]: any };
  baseURL?: string;
  body?: { [key: string]: any };
  timeout?: number;
  responseType?: any;
  responseEncoding?: string;
}

const onSuccess = (response: any) => {
  return Promise.resolve(response);
};

const onError = (error: any) => {
  if (error.response) console.log('Server Side Error: ' + error.response);
  else console.error('Request Error:', error.message);
  return Promise.reject(error.response || error.message);
};

export class WrapperService {
  private requestTimeout = 0; //no timeout;

  public httpCall(apiParam: ApiParameters) {
    const { baseURL, url, method, params, body, headers, timeout, responseType } = apiParam;
    return axios
      .request({
        url: url,
        method: method,
        ...(params && { params: params }),
        ...(body && { data: body }),
        ...(baseURL
          ? { baseURL: baseURL }
          : {
              baseURL: environment.base_url
            }),
        ...(headers
          ? { headers: headers }
          : {
              headers: {
                'Content-Type': 'application/json'
              }
            }),
        ...(timeout
          ? { timeout: timeout }
          : {
              timeout: this.requestTimeout
            }),
        ...(responseType
          ? { responseType: responseType }
          : {
              responseType: 'json'
            })
      })
      .then(onSuccess)
      .catch(onError);
  }
}
