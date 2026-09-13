---
title: 解决FastGPT部署重排服务后调用报错的问题
slug: /zh/troubleshoot/fastgpt-reranker-call-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1085
source_type: GitHub issue
---

# 解决FastGPT部署重排服务后调用报错的问题

## 现象
用户在FastGPT私有部署4.7版本环境中，按照步骤升级`luanshaotong/reranker:v0.2`重排镜像后，重排服务容器启动流程正常，但调用该重排服务时触发报错，无法正常执行文本重排功能。

## 可能原因
1. 重排服务容器配置的`ACCESS_TOKEN`与FastGPT后台配置的访问令牌不一致，导致鉴权失败
2. FastGPT中配置的重排服务地址与实际部署的容器端口不匹配，本次部署使用的端口映射为`7222:6006`
3. `luanshaotong/reranker:v0.2`镜像与FastGPT 4.7版本存在兼容性问题

## 排查步骤
1. 查看重排服务容器的启动日志，可通过`docker logs reranker`命令执行，确认服务初始化流程正常，同时检查`ACCESS_TOKEN`环境变量的配置是否正确
2. 核对FastGPT后台配置的重排服务地址，确保地址包含正确的宿主机端口`7222`，标准格式应为`http://{服务器IP}:7222`
3. 直接通过curl命令调用重排服务，携带正确的`ACCESS_TOKEN`，验证服务是否可以正常返回结果
4. 确认当前使用的重排镜像版本与FastGPT 4.7版本的适配情况

## 解决与验证
针对排查出的具体问题进行修复：
若为令牌配置不一致，可先通过`docker stop reranker`停止容器，再使用修正后的`ACCESS_TOKEN`重新启动容器；
若为端口不匹配，需在FastGPT的重排服务配置页面，将服务地址修改为正确的宿主机端口格式；
若为版本兼容性问题，需查阅对应镜像的适配说明，更换符合FastGPT 4.7版本的重排镜像版本。
修复完成后，重启重排服务容器，在FastGPT中测试重排功能，确认调用不再报错，重排功能可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1085)
