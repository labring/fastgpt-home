---
title: 解决FastGPT私有部署调用第三方API返回Chat API is error or undefined的问题
slug: /zh/troubleshoot/fastgpt-third-party-api-call-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/397
source_type: GitHub issue
---

# 解决FastGPT私有部署调用第三方API返回Chat API is error or undefined的问题

## 现象
使用Docker Compose部署v4.4.7版本的私有FastGPT，在对话应用中添加并保存第三方API服务配置的智谱chatglm_std模型后，发送任意对话内容时，页面提示“Chat API is error or undefined”。使用curl命令在本机直接测试API地址与密钥均正常，返回标准的对话补全结果。

## 可能原因
根据issue提供的信息，可能的原因包括：
1. FastGPT容器内部无法访问配置的第三方API服务地址；
2. Docker Compose配置文件中FastGPT服务的环境变量未配置完整，本次提交的配置文件中环境变量部分被截断；
3. FastGPT后台配置的模型信息与第三方API服务的实际参数不匹配。

## 排查步骤
1. 进入FastGPT容器内部，执行curl命令测试配置的API地址连通性，例如：`curl http://host.docker.internal:3000/v1/chat/completions -H "Authorization: Bearer 你的SK密钥"`，确认容器内可以正常调用API。
2. 补全Docker Compose配置文件中FastGPT服务的环境变量，补充缺失的配置参数。
3. 登录FastGPT后台，检查已配置的第三方模型的API地址、密钥、模型名称是否与第三方API服务的实际配置一致，例如模型名称需为chatglm_std。
4. 确认FastGPT容器的网络配置，确保容器可以访问到第三方API服务所在的网络环境。

## 解决与验证
根据排查结果修复对应问题：如果是容器无法访问API地址，需将FastGPT后台配置的API地址调整为容器可访问的地址（例如使用host.docker.internal指向本机服务）；如果是环境变量缺失，补充完整FastGPT所需的环境变量配置；如果是参数不匹配，修正为与第三方API服务一致的参数。修复完成后，重启FastGPT容器，在对话应用中发送测试内容，确认不再提示“Chat API is error or undefined”，且可以正常获取对话回复。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/397)
