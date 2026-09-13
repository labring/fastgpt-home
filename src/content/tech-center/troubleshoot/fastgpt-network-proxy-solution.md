---
title: 解决FastGPT模型供应商无法访问需配置网络代理的问题
slug: /zh/troubleshoot/fastgpt-network-proxy-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4154
source_type: GitHub issue
---

# 解决FastGPT模型供应商无法访问需配置网络代理的问题

## 现象
使用FastGPT时，部分服务器无法访问配置的模型供应商服务，出现400 location地区错误，尝试在环境变量中配置ALL_PROXY未生效。
## 可能原因
无法直接访问目标模型供应商服务，环境变量ALL_PROXY配置未生效，具体根因需按实际环境确认。
## 排查步骤
1. 确认服务器访问目标模型供应商服务时是否出现400 location地区错误。
2. 检查环境变量ALL_PROXY的配置格式与加载路径是否正确。
3. 需按实际环境确认其他可能影响网络访问的配置项。
## 解决与验证
临时使用Cloudflare Worker搭建代理，代码如下：
```javascript
const TELEGRAPH_URL = 'https://generativelanguage.googleapis.com';

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');

  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);

  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');

  return modifiedResponse;
}
```
配置FastGPT的模型供应商地址为该Worker部署的地址，发起请求后确认不再出现400 location地区错误，服务可正常访问。

> 来源: [FastGPT GitHub issue #4154](https://github.com/labring/FastGPT/issues/4154)
