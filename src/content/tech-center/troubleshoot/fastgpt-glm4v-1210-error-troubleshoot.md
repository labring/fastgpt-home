---
title: 解决FastGPT中智谱glm-4v模型调用报错1210参数有误问题
slug: /zh/troubleshoot/fastgpt-glm4v-1210-error-troubleshoot
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2127
source_type: GitHub issue
---

# 解决FastGPT中智谱glm-4v模型调用报错1210参数有误问题

## 现象
用户在私有部署V4.8.7版本的FastGPT中配置智谱glm-4v模型后，在聊天界面发送图片进行调试时，接口返回报错信息：`1210 API 调用参数有误，请检查文档。 (request id: 2024072301580059367911215206506)`。该用户通过oneapi和config.json引入glm-4v模型，搭建agent后触发该报错。

## 可能原因
结合已知场景，可能的触发原因包括：配置文件中glm-4v模型的参数不符合FastGPT对接要求；oneapi转发的glm-4v接口参数格式与FastGPT的调用格式不匹配；多模态模型的图片传输参数配置缺失或错误。具体原因需结合实际部署环境的配置细节确认。

## 排查步骤
1.  登录FastGPT部署环境，打开项目的config.json配置文件，查看glm-4v模型的相关配置参数。
2.  核对oneapi中已接入的glm-4v模型的接口参数格式，确认与FastGPT的调用规则匹配。
3.  检查调试过程中发送的图片参数格式，确认符合模型调用的必填要求。
4.  结合报错中的request id: 2024072301580059367911215206506，检索FastGPT后台日志获取更详细的错误信息。

## 解决与验证
针对排查出的具体问题进行修正：若为config.json配置错误，调整对应参数至符合要求；若为oneapi转发参数不匹配，修改oneapi的模型映射配置；若为图片传输参数缺失，补充必填的图片格式参数。修正完成后，在FastGPT聊天界面重新发送图片进行调试，确认不再返回1210报错，可正常获取模型响应即为解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2127)
