---
title: 解决FastGPT开启重排后未生效且reranker无请求日志的问题
slug: /zh/troubleshoot/fastgpt-rearrange-not-working
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1029
source_type: GitHub issue
---

# 解决FastGPT开启重排后未生效且reranker无请求日志的问题

## 现象
使用docker latest私有部署版本的FastGPT时，开启重排功能后实际响应中重排未生效，且未捕获到reranker的请求日志。已确认FastGPT容器可以正常访问reranker服务。
## 可能原因
结合已知信息，容器可正常访问reranker，因此网络连通性问题可排除。可能的原因包括：重排功能配置未正确加载或保存、reranker调用请求未被正确触发、系统日志未正确捕获reranker的请求记录。
## 排查步骤
1.  回到FastGPT后台管理界面，再次确认重排功能的开关状态，检查配置是否成功保存。
2.  进入FastGPT运行容器，使用curl工具手动调用reranker服务，验证服务可用性与之前的网络测试结果一致。
3.  查看FastGPT的系统运行日志，搜索与reranker调用相关的内容，排查是否存在请求未发送的报错信息。
4.  核对reranker服务的接入参数，确保与FastGPT配置的参数格式匹配。
## 解决与验证
根据排查结果修正对应的问题。例如，若配置未保存则重新提交配置；若调用逻辑异常则检查相关功能代码。验证时，重新发起对话测试，确认响应包含重排后的结果，同时查看reranker的请求日志，确认有正常的请求记录。
> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1029)
