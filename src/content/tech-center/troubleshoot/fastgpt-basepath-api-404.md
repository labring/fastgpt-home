---
title: 解决FastGPT配置basePath后API请求返回404的常见问题
slug: /zh/troubleshoot/fastgpt-basepath-api-404
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/668
source_type: GitHub issue
---

# 解决FastGPT配置basePath后API请求返回404的常见问题

## 现象
在FastGPT的`next.config.js`中配置`basePath: '/test'`后，可通过`http://localhost:3000/test`访问页面，但所有API请求返回404错误。

## 可能原因
FastGPT的API请求使用根路径相对地址，配置`basePath`后，浏览器发起的API请求会携带`/test`前缀，与后端接口的实际路径不匹配，导致请求无法正确路由，返回404错误。

## 排查步骤
1. 确认已在`next.config.js`中配置`basePath`参数，例如`basePath: '/test'`。
2. 检查API请求的路径格式，确认是否使用根路径相对地址。
3. 需按实际环境确认反向代理配置是否适配`basePath`。

## 解决与验证
通过反向代理将带`basePath`的请求重写为根路径请求。以Nginx为例，在`server`块中添加如下配置：
```nginx
location /test/ {
    rewrite ^/test/(.*)$ /$1 break;
    proxy_pass 需按实际环境填写后端地址;
}
```
完成配置后，重启反向代理服务与FastGPT服务，访问`http://localhost:3000/test`，确认API请求不再返回404错误。

> 来源: [FastGPT GitHub issue #668](https://github.com/labring/FastGPT/issues/668)
