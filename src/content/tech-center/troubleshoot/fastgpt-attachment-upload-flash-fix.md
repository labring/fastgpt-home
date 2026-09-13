---
title: FastGPT对话框上传附件后闪失问题的排查与解决
slug: /zh/troubleshoot/fastgpt-attachment-upload-flash-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2292
source_type: GitHub issue
---

# FastGPT对话框上传附件后闪失问题的排查与解决

## 现象
FastGPT对话框上传附件后闪一下即消失。该问题存在两种典型触发场景：一是通过Nginx HTTPS反向代理访问时；二是未使用Nginx的HTTP环境中，使用新浏览器会话上传附件时。在FastGPT调试界面、免登录URL场景下，上传功能可正常运行。触发异常时会产生两个请求：上传请求返回200状态码，/api/support/user/account/loginout请求返回304 Not Modified状态码，响应头包含Set-Cookie: fastgpt_token=; Path=/; Max-Age=0。

## 可能原因
问题可能源于两类配置或版本异常：一是Nginx反向代理未配置允许form格式文件上传，或请求体大小限制不足；二是FastGPT 4.8.9版本存在登录态异常逻辑，新浏览器会话上传时触发登出操作。

## 排查步骤
1. 确认FastGPT的访问环境是否使用Nginx反向代理；
2. 分别在同一浏览器会话、新浏览器会话中执行附件上传操作，记录相关请求的返回状态码；
3. 查看/api/support/user/account/loginout请求的响应头，确认是否存在清除fastgpt_token的Set-Cookie字段。

## 解决与验证
1. 若使用Nginx反向代理，调整Nginx配置以允许form格式文件上传，并设置足够的请求体大小限制；
2. 若未使用Nginx，确认FastGPT版本为4.8.9，在新浏览器会话中测试附件上传功能，观察是否仍出现闪失现象；
3. 检查/api/support/user/account/loginout请求的返回状态，确认不再出现304 Not Modified且未清除fastgpt_token的情况；
4. 验证同一浏览器会话、免登录URL场景下的附件上传功能可正常运行。

> 来源: [FastGPT GitHub issue #2292](https://github.com/labring/FastGPT/issues/2292)
