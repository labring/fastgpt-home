---
title: 解决FastGPT v4.8版本rerank服务端口转发异常问题
slug: /zh/troubleshoot/fastgpt-rerank-port-forward-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1734
source_type: GitHub issue
---

# 解决FastGPT v4.8版本rerank服务端口转发异常问题

## 现象
用户使用FastGPT v4.8版本，搭配镜像为registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-v2-m3:v0.1的rerank服务，执行将容器内6006端口映射到主机7006端口的端口转发操作后，服务出现异常，并上传了三张相关报错截图。

## 可能原因
目前仅能确认关联操作为端口转发配置，未获取到完整的报错文本，无法直接定位具体异常原因。推测可能与端口映射参数错误、rerank服务监听端口绑定异常或FastGPT的rerank服务配置有误有关，具体原因需结合实际报错信息确认，需按实际环境排查。

## 排查步骤
1.  登录部署FastGPT的主机，查看rerank容器的运行状态，确认容器内6006端口是否正常被服务监听。
2.  使用端口连通性测试工具，验证主机7006端口是否可正常转发到容器内的6006端口。
3.  进入FastGPT的配置界面，找到rerank服务的相关配置项，确认填写的服务地址与端口是否与映射后的主机端口一致。
4.  核对当前使用的rerank镜像版本，确认其与FastGPT v4.8版本的兼容性。
5.  提取上传的三张报错截图中的具体错误文本，定位异常发生的具体环节。

## 解决与验证
若排查后发现端口映射配置错误，调整主机与容器的端口映射参数，确保映射的端口对应正确。若FastGPT的rerank服务配置填写有误，修改为正确的主机端口或容器端口。完成调整后，重启rerank容器与FastGPT服务，调用依赖rerank服务的功能，验证异常是否消失。若报错文本指向特定配置项或服务异常，需根据具体错误信息进行针对性修复。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1734)
