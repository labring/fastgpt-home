---
title: 解决FastGPT通过Docker Compose部署后接入LLM出现连接错误的问题
slug: /zh/troubleshoot/fastgpt-docker-llm-connection-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3306
source_type: GitHub issue
---

# 解决FastGPT通过Docker Compose部署后接入LLM出现连接错误的问题

## 现象
使用Docker Compose部署FastGPT，仅修改FE_DOMAIN配置为http://192.168.1.100:3000。通过OneAPI接入部署完成的ChatGLM2-6B，在FastGPT的配置文件config.json的llmModels中添加对应配置并重启服务后，调用A1对话触发连接错误。直接通过HTTP请求LLM接口可成功，进入FastGPT容器内测试LLM接口也可成功，FastGPT容器与OneAPI容器均存在对应报错日志。

## 可能原因
由于外部HTTP请求与FastGPT容器内测试均正常，仅FastGPT内部调用出现连接错误，可能涉及FastGPT容器的网络配置、FE_DOMAIN配置影响内部请求路由等情况，需按实际环境确认。

## 排查步骤
1. 确认FastGPT容器的网络模式，确保容器可正常访问OneAPI的部署地址。
2. 检查FE_DOMAIN配置是否符合当前部署场景的网络要求，避免配置影响内部接口请求的路由逻辑。
3. 查看FastGPT容器的完整报错日志，提取具体错误信息辅助定位问题。
4. 对比容器内测试与FastGPT页面调用的请求参数，确认两者是否一致。

## 解决与验证
根据排查结果调整对应配置：若为网络路由问题，可调整FastGPT容器的网络配置或OneAPI的访问地址；若为FE_DOMAIN配置影响，需确保配置与部署网络环境匹配。调整后重新发起A1对话测试，确认连接错误是否消失。

> 来源: [FastGPT GitHub issue #3306](https://github.com/labring/FastGPT/issues/3306)
