import axios from 'axios';
import { message } from 'antd'; // 假设使用 antd 的消息提示

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    'accept': 'application/vnd.Nexhealth+json;version=2'
  },
  withCredentials: false,
});

// 请求重试配置
instance.defaults.retry = 3; // 请求重试次数
instance.defaults.retryDelay = 1000; // 请求重试间隔

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 从localStorage获取JWT
    const userToken = localStorage.getItem('userToken');
    
    // 如果存在用户Token，优先使用用户Token
    if (userToken) {
        config.headers['Authorization'] = `Bearer ${userToken}`;
    }
    
    console.log('发送请求:', {
        url: config.url,
        params: config.params,
        headers: config.headers
    });
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use((response) => {
    console.log('收到响应:', response);
    if(response.status === 200){
        return response.data;
    }else{
        message.error(response.data.message);
        return Promise.reject(response.data);
    }
}, (error) => {
    console.error('请求错误:', error.response || error);
    return Promise.reject(error);
});

export default instance;  // 添加默认导出

