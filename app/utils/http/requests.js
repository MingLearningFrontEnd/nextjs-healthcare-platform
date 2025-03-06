import instance from './http';
// 封装请求方法
export const request = {
    get(url, params, config = {}) {
      return instance({
        method: 'get',
        url,
        params,
        ...config,
      });
    },
  
    post(url, data, config = {}) {
      return instance({
        method: 'post',
        url,
        data,
        ...config,
      });
    },
  
    put(url, data, config = {}) {
      return instance({
        method: 'put',
        url,
        data,
        ...config,
      });
    },
  
    delete(url, params, config = {}) {
      return instance({
        method: 'delete',
        url,
        params,
        ...config,
      });
    },
  
    // 上传文件
    upload(url, file, config = {}) {
      const formData = new FormData();
      formData.append('file', file);
  
      return instance({
        method: 'post',
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        ...config,
      });
    },
  
    // 下载文件
    download(url, params, config = {}) {
      return instance({
        method: 'get',
        url,
        params,
        responseType: 'blob',
        ...config,
      });
    },
  };
  
