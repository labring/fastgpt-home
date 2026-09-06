---
title: 解决FastGPT通过Nginx反向代理后静态资源404与页面卡住问题
slug: /zh/troubleshoot/fastgpt-nginx-proxy-static-404-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/812
source_type: GitHub issue
---

# 解决FastGPT通过Nginx反向代理后静态资源404与页面卡住问题

## 现象
用户在内网部署FastGPT，通过Nginx配置反向代理。配置为`location /fastgpt/ { proxy_pass http://192.168.137.111:3000/; }`后，访问`http://内网域名/fastgpt/`可跳转至FastGPT页面，但页面的CSS、静态资源均报404错误，页面始终卡在首页。

## 可能原因
反向代理的路径匹配规则与FastGPT静态资源的实际请求路径不匹配。FastGPT的前端静态资源默认基于应用根路径生成请求地址，当通过`/fastgpt/`路径代理时，静态资源请求未携带代理前缀，导致Nginx无法正确转发请求至FastGPT服务，触发404错误。

## 排查步骤
1. 核对Nginx代理配置的`location`与`proxy_pass`参数，确认路径匹配与斜杠的使用规则。
2. 打开浏览器开发者工具，查看静态资源的实际请求地址，对比预期路径与实际请求路径，确认是否缺少代理前缀。
3. 检查FastGPT的部署配置是否包含基础路径设置，需按实际环境确认参数名称与配置方式。

## 解决与验证
1. 修改Nginx配置，调整`proxy_pass`参数。若需保留`/fastgpt/`作为访问前缀，可移除`proxy_pass`末尾的斜杠，改为`proxy_pass http://192.168.137.111:3000;`，此时Nginx会将`/fastgpt/`下的所有请求完整转发至后端服务。
2. 可选操作：在FastGPT的部署配置中设置基础路径为`/fastgpt/`，需按实际环境确认对应参数。
3. 重启Nginx与FastGPT服务，访问`http://内网域名/fastgpt/`，确认静态资源不再返回404错误，页面可正常加载。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/812)
