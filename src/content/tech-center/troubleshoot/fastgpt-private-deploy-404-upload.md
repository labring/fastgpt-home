---
title: 解决FastGPT私有部署本地文件上传接口返回404问题
slug: /zh/troubleshoot/fastgpt-private-deploy-404-upload
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1602
source_type: GitHub issue
---

# 解决FastGPT私有部署本地文件上传接口返回404问题

## 现象
私有部署的FastGPT V4.8版本中，调用`http://192.168.80.120:3000/api/core/dataset/collection/create/localFile`接口上传本地文件时，返回404错误。而调用公有云接口`https://api.fastgpt.in/api/core/dataset/collection/create/localFile`可正常上传并返回200状态码，预期本地部署的该接口上传成功后返回200。

## 可能原因
目前无明确的已知技术原因，需结合私有部署的服务运行环境、路由配置、端口映射等实际情况确认。结合现象推测，可能与私有部署环境下的接口访问限制、服务配置异常有关。

## 排查步骤
1.  核对接口地址与端口：确认本地部署的FastGPT服务运行端口为3000，调用的接口路径为`/api/core/dataset/collection/create/localFile`，与报错地址一致。
2.  对比调用差异：对比公有云与私有部署的调用环境，确认私有部署环境是否存在防火墙、反向代理拦截该接口请求的情况。
3.  检查服务状态：确认FastGPT私有部署服务正常启动，无启动报错或异常退出情况。
4.  核对版本信息：确认当前私有部署的FastGPT版本为V4.8，与issue中描述的版本一致。

## 解决与验证
解决方法需基于排查结果确认：若为端口或接口路径配置错误，需修正对应配置；若为网络拦截问题，需开放对应端口或调整反向代理规则。验证方式为调用本地部署的`http://192.168.80.120:3000/api/core/dataset/collection/create/localFile`接口上传本地文件，确认返回状态码为200且上传成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1602)
