---
title: FastGPT搭配OneAPI配置M3E时测试返回404的排错方法
slug: /zh/troubleshoot/fastgpt-oneapi-m3e-404-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1343
source_type: GitHub issue
---

# FastGPT搭配OneAPI配置M3E时测试返回404的排错方法

## 现象
用户使用Docker Compose部署FastGPT v4.7、OneAPI latest版本与m3e-large-api latest版本，在OneAPI中配置M3E服务地址为http://host.docker.internal:6008 或m3e.fastgpt.orb.local，点击测试按钮时返回404错误，并附上了多张配置页面截图。

## 可能原因
结合部署场景与报错信息，可能的原因包括：Docker容器无法通过配置的地址访问M3E服务、M3E服务未正常启动或端口未开放、OneAPI配置的服务地址存在拼写错误或无效。

## 排查步骤
1. 验证M3E服务的运行状态，在宿主机直接访问http://localhost:6008，确认服务可正常响应请求。
2. 检查OneAPI中配置的M3E服务地址，确认与实际部署的M3E服务地址一致，无拼写错误。
3. 进入FastGPT或OneAPI的Docker容器内部，使用curl命令访问配置的M3E地址，验证容器网络是否可连通该地址。
4. 查看M3E服务的运行日志，确认是否有接入的请求记录，排查服务本身的异常问题。

## 解决与验证
1. 若使用host.docker.internal无法正常访问，可替换为宿主机的实际内网IP地址，确保容器可连通该地址。
2. 确认M3E服务已正常启动并监听6008端口，无端口占用或防火墙拦截问题。
3. 在容器内重新执行curl命令验证连通性，确认可以正常访问M3E服务后，回到OneAPI的配置页面，重新点击测试按钮。
4. 若测试不再返回404错误，则配置生效，可正常使用M3E服务。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1343)
