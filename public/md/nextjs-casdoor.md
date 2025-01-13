全局拦截看是否登录
```ts .middleware.ts

import { NextMiddleware, NextResponse } from 'next/server';
const middlewareObserver = createMiddlewareObserver();
const protectedRoutes = ['/test'];
const middleware: NextMiddleware = async (req, ev) => {

    // 获取cookie中的登录信息
    const casdoorUserCookie = req.cookies.get('casdoorUser');
    const isAuthenticated = casdoorUserCookie && casdoorUserCookie?.value ? true : false;
    if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
        //将传入的请求重定向到不同的URL
        const loginUrl = new URL('/login', req.url);
        loginUrl.searchParams.set('from', req.nextUrl.pathname);
        return NextResponse.redirect(new URL(loginUrl, req.url));
    }
};
export default middleware;
```

鉴权页面
```ts Auth.tsx


'use client';
import sdkConfig from '@/app/config';
import { Spin } from 'antd';
import Sdk from 'casdoor-js-sdk';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
export const AuthCallback = () => {
    const router = useRouter();
    const state = useSearchParams().get('state') || '/cn';
    useEffect(() => {
        const CasdoorSDK = new Sdk(sdkConfig);
        // 获取accessToken
        CasdoorSDK.exchangeForAccessToken()
            .then((res) => {
                if (res && res.access_token) {
                    sessionStorage.setItem('ca_token', res.access_token);
                    return CasdoorSDK.getUserInfo(res.access_token);
                } else {
                    //   throw new Error(res.error_description);
                }
            })
            .then((res) => {
                const casdoorUserInfo = res;
                Cookies.set('casdoorUser', JSON.stringify(casdoorUserInfo));
                router.push(state === '/login' ? '/cn' : state);
            })
            .catch((error) => {
                console.error('Failed to get access_token:', error);
                router.push('/login');
            });
    }, []);
    return <Spin>signing...</Spin>;
};
export default AuthCallback;
```
登录跳转鉴权
```ts Login.tsx

'use client';
import sdkConfig from '@/app/config';
import Sdk from 'casdoor-js-sdk';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
const Login = () => {
    const from = useSearchParams().get('from');
    useEffect(() => {
        // 跳转到鉴权页
        const CasdoorSDK = new Sdk(sdkConfig);
        CasdoorSDK.signin_redirect({ redirectUri: `/auth%3Ffrom%3D${from}`, state: from });
    }, []);
    return <></>;
};
export default Login;


```