---
title: FastGPT私有部署知识库搜索返回401状态码的排错方法
slug: /zh/troubleshoot/fastgpt-private-401-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4579
source_type: GitHub issue
---

# FastGPT私有部署知识库搜索返回401状态码的排错方法

## 现象
用户调用FastGPT的`http://*********:21020/api/core/chat/chatTest`接口进行聊天测试时，知识库搜索节点执行失败。接口返回的event流依次输出：`flowNodeStatus`（状态为running，节点名称为知识库搜索）、两次`answer`事件、`[DONE]`，最终`flowResponses`字段包含错误信息：`{"message":"401 status code (no body)","status":401}`。系统日志也会输出`LLM response error`，报错内容与上述错误信息一致。

## 可能原因
该报错为401未授权错误，结合FastGPT v4.9.2私有部署的场景，可能的触发原因包括：知识库配置的访问密钥无效或过期；FastGPT服务向知识库服务发起请求时未携带有效认证信息；部署环境的网络访问控制策略拦截了相关请求。

## 排查步骤
1.  确认当前使用的FastGPT版本为v4.9.2私有部署版本，核对部署配置文件中知识库相关的认证参数是否正确填写。
2.  检查调用`/api/core/chat/chatTest`接口的请求头，确认是否携带了符合要求的有效认证参数。
3.  查看FastGPT服务的运行日志，确认报错信息为`401 status code (no body)`，排除其他类型的请求错误。
4.  验证知识库服务本身的可用性，确认在携带有效认证信息的情况下，知识库服务可以正常响应请求。
5.  检查部署环境的网络策略，确认FastGPT服务可以正常访问知识库服务的对应端口与地址。

## 解决与验证
如果是密钥问题，重新生成并更新知识库配置中的有效密钥，重启FastGPT服务后再次调用测试接口。如果是请求未携带有效认证信息，补充正确的认证头部参数。如果是网络策略限制，调整防火墙或安全组规则，放行FastGPT与知识库服务之间的通信。验证方法为再次调用`/api/core/chat/chatTest`接口，查看`flowResponses`中的`error`字段是否消失，知识库搜索节点可以正常执行并返回预期结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4579)
