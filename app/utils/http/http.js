import axios from 'axios';
import { message } from 'antd'; // 假设使用 antd 的消息提示

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
  },
  // 跨域请求时是否需要凭证
  withCredentials: true,
});

// 请求重试配置
instance.defaults.retry = 3; // 请求重试次数
instance.defaults.retryDelay = 1000; // 请求重试间隔

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
 

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
 

    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

