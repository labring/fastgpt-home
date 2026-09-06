---
title: 排查FastGPT使用SenseVoiceSmall时的websocket握手失败问题
slug: /zh/troubleshoot/fastgpt-sensevoice-websocket-error-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4709
source_type: GitHub issue
---

# 排查FastGPT使用SenseVoiceSmall时的websocket握手失败问题

## 现象
在FastGPT私有部署4.9.6版本中，调用SenseVoiceSmall语音模型时，返回报错信息：
```json
{"error":{"code":"request_failed","message":"do request failed: websocket: bad handshake (aiproxy: 1745880836770247)","type":"aiproxy_error"}}
```
该SenseVoiceSmall服务通过Docker部署，使用镜像`registry.cn-hangzhou.aliyuncs.com/luanshaotong/sensevoice:v0.1`，已配置SSL且自身运行正常。

## 可能原因
结合报错信息与部署情况，可能的触发因素包括：
1. FastGPT与SenseVoiceSmall服务的SSL配置不匹配；
2. 网络连接或Docker端口映射存在异常；
3. aiproxy组件的websocket握手规则与服务端不兼容；
4. SSL证书有效性或配置存在错误。

## 排查步骤
1. 确认FastGPT中配置的SenseVoiceSmall服务地址、端口号与实际部署的服务一致，端口使用8000。
2. 在FastGPT部署环境中，使用curl或ping命令测试与SenseVoiceSmall服务的网络连通性，排除基础网络故障。
3. 核对双方的SSL配置：确认FastGPT是否启用SSL，检查证书路径、校验规则是否与SenseVoiceSmall服务端匹配。
4. 查看FastGPT的aiproxy相关日志，结合报错中的标识`1745880836770247`定位具体异常节点。
5. 若测试环境允许，临时关闭SSL配置，验证是否为SSL相关配置导致的握手失败。

## 解决与验证
若排查发现为SSL配置不匹配问题，调整FastGPT中SenseVoiceSmall的配置，使其SSL参数与服务端保持一致，例如使用匹配的证书、调整证书校验策略。
若为网络或端口问题，确认Docker端口映射正确，无端口冲突，且防火墙规则允许对应端口的通信。
完成配置调整后，重新发起语音调用，验证是否不再返回websocket bad handshake报错，确认服务调用正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4709)
