---
title: 解决FastGPT配置自定义OpenAI API Base URL的问题
slug: /zh/troubleshoot/fastgpt-custom-openai-base-url
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1
source_type: GitHub issue
---

# 解决FastGPT配置自定义OpenAI API Base URL的问题

## 现象
在国内网络环境中，直接访问默认的OpenAI API地址存在限制，需通过代理服务器中转请求。使用FastGPT时，需将OpenAI API Base URL修改为代理服务器的地址，以实现正常访问，但原FastGPT未提供直接修改该参数的配置入口，导致无法完成配置。

## 可能原因
FastGPT默认内置的OpenAI API Base URL为https://api.openai.com，未提供直接修改该参数的配置项，无法通过常规配置文件或界面调整代理地址，只能通过修改底层依赖文件实现调整。

## 排查步骤
1. 确认代理服务器提供的OpenAI API访问地址，确保该地址可正常访问。
2. 检查FastGPT的配置文件、管理界面或启动参数，确认是否存在直接修改OpenAI API Base URL的入口。
3. 若未找到直接配置入口，定位到/app/node_modules/openai/dist/base.js文件，该文件包含默认的API域名配置。
4. 记录该文件的原始路径，若为Docker部署，需准备本地映射的文件路径。

## 解决与验证
修改/app/node_modules/openai/dist/base.js文件中的默认域名部分，将其替换为代理服务器提供的地址。若使用Docker部署，在启动命令中添加-v参数，将修改后的base.js文件映射到容器内的/app/node_modules/openai/dist/base.js路径。该方式已被验证可成功指向自定义代理域名并正常访问。启动FastGPT服务后，发起OpenAI API相关请求，确认请求的Base URL为配置的代理地址，且能正常获取响应。

> 来源: [FastGPT GitHub issue #1](https://github.com/labring/FastGPT/issues/1)
