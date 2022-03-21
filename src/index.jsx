import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import App from './App';

// 判断该浏览器是否支持 serviceWork
if ('serviceWork' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registertion) => {
        console.log('serviceWorker register', registertion);
      })
      .catch(() => {
        console.log('error');
      });
  });
}

render(
  <ConfigProvider locale={zhCN}>
    <App />
  </ConfigProvider>,
  document.getElementById('app'),
);
