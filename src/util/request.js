import axios from 'axios'
import {Loading} from 'element-ui';
let baseURL;
if (process.env.NODE_ENV != 'production') {
  baseURL = '/api';
}
else {
  baseURL = '/';
}

const service = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true,
  timeout: 60000
});


service.interceptors.request.use(
  request => {
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);


export default service;
