---
title: 解决Nginx代理FastGPT时静态资源和API路径404问题
slug: /zh/troubleshoot/fastgpt-nginx-proxy-path-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2695
source_type: GitHub issue
---

# 解决Nginx代理FastGPT时静态资源和API路径404问题

## 现象
使用私有部署版本4.8.10的FastGPT，通过Nginx代理访问时，配置`location /fastgpt/ { proxy_pass FastGPT服务IP:3000; }`，访问`test/fastgpt`后，静态资源加载地址为`test/_next/static/`，返回404错误；API接口请求地址为`test/api`，实际需要的正确路径应为`test/fastgpt/api`。

## 可能原因
FastGPT默认以当前访问的域名根路径作为基准，拼接静态资源与API的相对路径。当通过带有二级路径的Nginx代理访问时，生成的资源与API路径未包含代理的二级目录，导致路径错误无法正常加载。

## 排查步骤
1. 确认Nginx代理配置的`location`块与`proxy_pass`的路径匹配关系，检查是否正确转发二级路径。
2. 打开浏览器开发者工具的网络面板，查看返回404的静态资源或API请求的完整URL，对比预期的带二级路径的URL。
3. 确认FastGPT服务是否支持自定义基础路径配置，需按实际环境确认相关配置项的参数与格式。

## 解决与验证
1. 调整Nginx代理配置，确保二级路径被正确转发至FastGPT服务。例如在`location /fastgpt/`块中添加`rewrite ^/fastgpt/(.*)$ /$1 break;`，再配置`proxy_pass http://FastGPT服务IP:3000;`。
2. 若FastGPT服务支持自定义基础路径，将基础路径设置为代理的二级路径`/fastgpt/`，需按服务实际支持的配置方式操作。
3. 验证步骤：访问`test/fastgpt`，检查浏览器控制台的静态资源请求路径是否为`test/fastgpt/_next/static/`，API请求路径是否为`test/fastgpt/api`，确认所有请求返回状态码为200。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2695)
