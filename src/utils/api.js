import axios from 'axios';
import * as dd from 'dingtalk-jsapi';
import { message } from 'antd';

const getUserId = () =>
  new Promise((resolve) => {
    if (dd.env.platform !== 'notInDingTalk') {
      const userId = window.sessionStorage.getItem('userId');
      if (dd.env.platform !== 'notInDingTalk') {
        dd.ready(() => {
          dd.runtime.permission.requestAuthCode({
            corpId: window?.context_data?.cropId, // 企业id
            onSuccess(info) {
              axios({
                method: 'get',
                url: '/api/fore',
                params: { authCode: info.code },
                headers: {
                  appId: window?.context_data?.appId,
                },
              }).then((res) => {
                window.sessionStorage.setItem('userId', res.data.userId);
                resolve(res.data.userId || '');
              });
            },
          });
        });
      } else if (userId) {
        window.location.href = `${window.location.href}`;
        resolve(userId);
      } else {
        const hash = `${window.location.origin}/${window.location.search}#/FirstPage`;
        window.location.href = hash;
        resolve(userId);
      }
    }
  });

axios.create({
  // baseURL: 'https://albatross.alibaba.com',
  timeout: 1000,
});

// 请求头参数
axios.interceptors.request.use(
  (req) => {
    req.headers.appId = window?.context_data?.appId;
    req.headers.corpId = window?.context_data?.cropId;
    req.headers.userId =
      window?.context_data?.userId ||
      (window.sessionStorage.getItem('userId') ? window.sessionStorage.getItem('userId') : getUserId());
    return req;
  },
  (err) => Promise.reject(err),
);

// axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    if (res.data.code !== 0) {
      message.error(res.data.msg);
    }
    return res.data;
  },
  (error) => Promise.reject(error),
);

const queryList = (data) => axios.post('/api/one', data);
const detailDate = (id) => axios.get(`/api/two/${id}`);
const endDeal = (data) =>
  axios.post('/api/three', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });

export { queryList, detailDate, endDeal, getUserId };
