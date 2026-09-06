---
title: 解决FastGPT添加模型后proxyconnect tcp域名解析失败的问题
slug: /zh/troubleshoot/fastgpt-proxy-dns-lookup-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4703
source_type: GitHub issue
---

# 解决FastGPT添加模型后proxyconnect tcp域名解析失败的问题

## 现象
本地运行FastGPT v4.9.6源码，使用Docker启动PostgreSQL和MongoDB并开放映射端口后，添加模型进行测试时触发请求失败报错，具体错误信息为：`do request failed: Post "http://xxx proxyconnect tcp: dial tcp: lookup http on 127.0.0.11:53: no such host (aiproxy: 1745829510485986)`。

## 可能原因
该报错核心为DNS解析失败，主要存在两类可能的触发因素：第一类是模型代理配置格式错误，将协议前缀（如http://）混入了代理主机地址中，导致系统尝试解析“http”作为域名，引发无法找到主机的错误；第二类是部署环境的DNS配置异常，例如Docker容器的DNS服务无法正常解析外部域名，或本地运行的FastGPT进程继承了错误的DNS设置。

## 排查步骤
1. 查看FastGPT后台的模型配置页面，检查代理地址字段的填写内容，确认未将http://等协议前缀写入主机地址部分，例如避免将地址错误填写为`http://xxx`，需修正为符合规范的地址格式。
2. 在运行FastGPT的环境中执行域名解析测试，例如使用`nslookup baidu.com`命令，验证当前环境是否可以正常解析公共域名，确认基础DNS服务正常运行。
3. 确认FastGPT的网络环境可以正常访问外部网络，同时检查代理服务器本身的连通性，确保代理地址本身可正常访问。
4. 如果FastGPT或依赖服务运行在Docker容器中，检查Docker的DNS配置是否被错误修改，确认容器可以正常获取外部DNS解析服务。

## 解决与验证
1. 修正模型代理地址的格式，移除混入的协议前缀，使用正确的主机地址或代理地址。
2. 回到FastGPT后台重新测试模型调用，确认报错不再出现。
3. 如果DNS配置异常，可根据实际环境调整本地或Docker的DNS设置，例如更换为公共DNS服务地址。
4. 验证PostgreSQL和MongoDB的容器端口映射正确，确保FastGPT可以正常连接这两个依赖服务。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4703)
