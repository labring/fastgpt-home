---
title: 解决FastGPT配置自定义OpenAI代理网址的常见问题
slug: /zh/troubleshoot/fastgpt-configure-openai-proxy
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/90
source_type: GitHub issue
---

# 解决FastGPT配置自定义OpenAI代理网址的常见问题

## 现象
在使用FastGPT时，用户希望配置自定义的OpenAI代理网址以适配国内网络环境，但无法找到对应配置入口，或配置后无法正常调用OpenAI API。

## 可能原因
一是未找到FastGPT中配置自定义OpenAI代理网址的官方入口；二是未采用官方推荐的更简便的配置方案，导致无法顺利完成代理配置。

## 排查步骤
1. 访问FastGPT官方代理配置文档，查阅支持的代理配置方式与具体步骤。
2. 确认当前使用的OpenAI API访问模式，判断是否需要为FastGPT配置全局代理或单独的API代理。
3. 对比两种配置方案的适用场景，选择符合自身网络环境的配置路径。

## 解决与验证
可通过两种官方推荐的方式完成配置：
第一种方式：按照官方文档的HTTP代理配置流程，填写自定义的OpenAI代理网址，并完成对应环境的配置参数设置。
第二种方式：使用国内代理网站提供的OpenAI兼容API，将原OpenAI API地址替换为代理网站的base API地址，此时FastGPT无需额外配置代理即可直接连接代理服务。
配置完成后，测试调用FastGPT的OpenAI相关功能，确认可以正常发起请求并返回预期结果，即完成验证。

> 来源: [FastGPT GitHub issue #90](https://github.com/labring/FastGPT/issues/90)
