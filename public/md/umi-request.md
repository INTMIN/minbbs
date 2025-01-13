```
使用umi-request封装实现的restful接口函数
```

```ts 
import { extend } from 'umi-request';

const errorHandler = error => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    console.log(`请求错误 ${status}: ${url}`)
    console.log(errorText)
    // notification.error({
    //   message: `请求错误 ${status}: ${url}`,
    //   description: errorText,
    // });
  } else if (!response) {
    console.log('网络异常')
    // notification.error({
    //   description: '您的网络发生异常，无法连接服务器',
    //   message: '网络异常',
    // });
    // response.status=500  //测试中
  }
  return response;
};
const request = extend({
  errorHandler,
  // 默认错误处理
  credentials: 'include',// 默认请求是否带上cookie
});
export default request;
这个是用的umi-request


下面是用的fetch
import {fetch} from 'dva';
import { notification } from 'antd';

import {useStore} from 'dva';
import {stringify} from 'qs';
import {history} from 'umi';
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if(response.status <= 504 && response.status >= 500){
    notification.error({
      // message: `请求错误 ${response.status}: ${response.url}`,
      // description: errortext,
      message: '当前操作出现异常，请联系客服专员解决。',
    });
    const errortext = codeMessage[response.status] || response.statusText;
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  }else{
    const errortext = codeMessage[response.status] || response.statusText;
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    });
    const error = new Error(errortext);
    error.name = response.status;
    error.response = response;
    throw error;
  }


}
/**
 * 配置request请求时的默认参数,测试中，后期根据后台接口所需要的值来做相应的修改
 */
 /**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const token = localStorage.getItem('token')
  const defaultOptions = {
    credentials: 'omit',
  };// 默认请求是否带上cookie
  // console.log(window.location.href)
  const newOptions = { ...defaultOptions, ...options };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT') {
    // newOptions.body is FormData
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8',
        // 兼容后端写法
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        AUTHORIZATION:token,
        ...newOptions.headers,
      };
      newOptions.body = stringify(newOptions.body);
      // newOptions.body = JSON.stringify(newOptions.body);
      // console.log(newOptions.body)
    } else {
      // 测试中
      newOptions.headers = {
        Accept: 'application/json',
        AUTHORIZATION:token,
        ...newOptions.headers,
      };
    }
  }
  return fetch(url, newOptions)
    .then(checkStatus)
    .then(response => {
      if (response.status === 204) {
        return response.text();
      }
      return response.json();
    })
    .catch(e => {
      const { dispatch } = useStore;
      const status = e.name;
      // 退出登录
      // if (status === 401) {
      //   dispatch({
      //     type: 'login/logout',
      //   });
      //   return;
      // }
      if (status === 403) {
        dispatch(history.push('/404'));
        return;
      }
      // if (status <= 504 && status >= 500) {
      //   // dispatch(routerRedux.push('/exception/500'));
      //   // message.error('当前操作出现异常，请联系客服专员解决。')
      //   // notification.error({
      //   //   message: '当前操作出现异常，请联系客服专员解决。',
      //   //   // description: errortext,
      //   // });
      //   return;
      // }
      if (status >= 404 && status < 422) {
        dispatch(history.push('/404'));
      }
    });
}

```