---
title: FastGPT私有部署调用自定义微调模型请求报错排查
slug: /zh/troubleshoot/fastgpt-private-deploy-model-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2245
source_type: GitHub issue
---

# FastGPT私有部署调用自定义微调模型请求报错排查

## 现象
用户使用docker部署v4.8.8-fix2版本的FastGPT，接入本地部署的微调Qwen1.5-32B-Chat模型，通过API形式部署并在One API中完成配置。One API内测试模型接入正常，但是在FastGPT中创建对话并发起提问时出现报错。执行`docker logs fastgpt`可查看容器报错日志，抓包确认本地大模型接口已返回正常响应，但FastGPT端仍无法完成对话。

## 可能原因
结合排查信息，可能的触发原因包括三类：一是FastGPT的config.json配置文件中，与自定义模型相关的参数配置有误；二是本地微调模型的API返回格式不符合FastGPT的解析规则；三是FastGPT与本地大模型API之间的调用适配存在偏差。

## 排查步骤
1. 确认FastGPT容器运行状态，执行`docker logs fastgpt`命令，查看容器内的详细报错日志。
2. 核对config.json中的模型相关配置项，确保与One API中配置的参数保持一致。
3. 提取本地大模型API的返回内容，对比FastGPT要求的标准API响应格式，检查是否存在字段缺失或格式错误。
4. 再次通过One API测试模型接入，确认中转服务无异常。
5. 检查FastGPT容器与本地大模型API之间的网络连通性，确认无防火墙或权限拦截问题。

## 解决与验证
若为config.json配置错误，修正对应参数后重启FastGPT容器即可。若为模型返回格式不匹配，需调整本地大模型的API输出格式，使其符合FastGPT的解析规则。验证方式为重新创建对话，发起提问，确认无报错且能正常获取模型回复。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2245)
