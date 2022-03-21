import React from 'react';
import axios from 'axios';

interface paramsType {
  url: string;
  params: object;
  method: string;
}

const useRequest = (props: paramsType) => {
  const { url, params, method } = props;
  const [loading, setloading] = React.useState(false);
  const [result, setResult] = React.useState({});
  const [error, setError] = React.useState({});

  const request = async () => {
    setloading(true);
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );
    try {
      const options: any = {
        method,
        url,
        data: params,
      };
      const result = await axios(options);
      if (result && result.status >= 200 && result.status <= 304) {
        setResult(result.data);
      } else {
        setError(new Error('get data error in useRequest'));
      }
    } catch (reason: any) {
      setError(reason);
    }
    setloading(false);
  };
  const run = () => {
    request();
  };

  return [loading, result, error, run];
};

export default useRequest;
