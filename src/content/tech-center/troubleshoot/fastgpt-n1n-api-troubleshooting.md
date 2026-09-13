---
title: FastGPT配置n1n API时的常见问题排查与解决
slug: /zh/troubleshoot/fastgpt-n1n-api-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5756
source_type: GitHub issue
---

# FastGPT配置n1n API时的常见问题排查与解决

## 现象
用户在FastGPT中配置n1n API作为大语言模型提供商时，可能出现无法加载可用模型列表、调用模型时返回认证失败或连接超时等报错。

## 可能原因
可能的异常原因包括：配置的n1n API密钥无效或未获得对应模型的访问权限；填入的基础URL与官方要求不符；当前网络环境无法访问n1n API的接口地址；FastGPT当前版本未支持n1n API集成。

## 排查步骤
1. 前往n1n API控制台，确认已生成有效的API密钥，且密钥已开通所需模型的访问权限。
2. 检查FastGPT配置页面中的基础URL，确保为`https://n1n.ai/v1/`，无拼写错误或多余字符。
3. 在当前环境中测试访问`https://n1n.ai/v1/models`接口，确认网络连通性正常。
4. 确认FastGPT已升级到最新版本，确保支持n1n API集成。
5. 重新保存配置并刷新页面，查看异常是否消除。

## 解决与验证
针对排查出的具体问题进行修正：若密钥无效则更换有效密钥，若基础URL错误则修正为官方地址，若网络问题则调整网络环境或配置代理，若版本过低则升级到最新版本。验证时，重新加载模型列表，调用测试接口，确认可以正常获取模型并完成内容生成。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5756)
