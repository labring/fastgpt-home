---
title: 解决FastGPT与chatgpt-on-wechat调用GLM4模型的配置兼容冲突问题
slug: /zh/troubleshoot/fastgpt-glm4-config-conflict
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1219
source_type: GitHub issue
---

# 解决FastGPT与chatgpt-on-wechat调用GLM4模型的配置兼容冲突问题

## 现象
chatgpt-on-wechat 1.5.7及以上版本调整了GLM4模型的配置字段，原配置为"model": "gpt-3.5-turbo", "zhipu_ai_api_key": "YOUR_API_KEY", "zhipu_ai_api_base": "http://xx.xx.xx.xx:3000/api/v1"，新配置为"model": "glm-4", "zhipu_ai_api_key": "YOUR_API_KEY", "zhipu_ai_api_base": "https://open.bigmodel.cn/api/paas/v4"。当使用该版本调用FastGPT开源版部署的API时，会出现两种场景无法兼容的问题：接GLM4模型时无法使用FastGPT，接FastGPT时无法使用GLM4模型，调用日志会出现默认走gpt3.5的警告。
## 可能原因
chatgpt-on-wechat变更后的GLM4配置字段与FastGPT默认的GPT3.5调用逻辑不兼容。当使用chatgpt-on-wechat调用FastGPT开源版发布的API时，若配置GLM4专属的新字段，FastGPT无法识别相关参数，默认切换到GPT3.5模型。直接配置FastGPT的OPEN_AI_API_KEY和OPEN_AI_API_BASE时，无法适配GLM4的专属调用逻辑，导致无法正常调用GLM4。
## 排查步骤
1. 确认FastGPT部署方式为开源版本，且通过chatgpt-on-wechat调用FastGPT发布的API。
2. 核对chatgpt-on-wechat的配置字段，确认是否使用了更新后的GLM4模型配置参数。
3. 查看FastGPT调用日志，确认是否存在“默认走gpt3.5”的警告信息。
4. 检查FastGPT的OPEN_AI_API_KEY和OPEN_AI_API_BASE配置，确认是否未配置模型重定向相关参数。
## 解决与验证
1. 部署模型中转服务，配置所需的模型。
2. 在模型中转服务中，为GLM4模型配置别名gpt-3.5-turbo，并开启模型重定向功能，将接收到的gpt-3.5-turbo请求重定向至GLM4模型。
3. 修改FastGPT的配置项，将OPEN_AI_API_KEY设置为模型中转服务的令牌，OPEN_AI_API_BASE设置为模型中转服务的部署地址及端口，格式为http://xxx:3000/api/v1。
4. 重启FastGPT服务，通过chatgpt-on-wechat发起调用请求，验证是否成功调用GLM4模型，且无“默认走gpt3.5”的警告日志。

> 来源: [FastGPT GitHub issue #1219](https://github.com/labring/FastGPT/issues/1219)
