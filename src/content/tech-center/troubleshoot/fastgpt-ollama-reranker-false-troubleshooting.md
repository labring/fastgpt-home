---
title: 解决FastGPT调用ollama部署的重排序模型时显示false的问题
slug: /zh/troubleshoot/fastgpt-ollama-reranker-false-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4214
source_type: GitHub issue
---

# 解决FastGPT调用ollama部署的重排序模型时显示false的问题

## 现象
用户在FastGPT中配置并引入通过ollama部署的linux6200/bge-reranker-v2-m3:latest模型，通过one-api加载相关配置后，界面中出现了false的异常显示，无法正常使用该重排序模型。

## 可能原因
结合用户提供的部署环境（CentOs7、FastGPT v4.8.16、Ollama 0.5.5-0），可能的原因包括模型配置参数与ollama部署的模型不匹配，one-api的配置转发规则异常，FastGPT版本与当前部署的Ollama模型版本兼容性不足，或是模型加载相关的配置存在问题。

## 排查步骤
1.  确认ollama中部署的linux6200/bge-reranker-v2-m3:latest模型状态正常。
2.  检查one-api的配置文件，确认转发规则是否正确指向ollama服务地址与端口。
3.  核对FastGPT内配置的模型参数，确保与ollama部署的模型名称、接口格式一致。
4.  查看FastGPT运行日志，提取与该模型调用相关的信息，定位异常点。
5.  确认当前FastGPT v4.8.16与部署的Ollama 0.5.5-0版本是否存在兼容性问题。

## 解决与验证
根据排查到的具体问题进行对应修复。例如，若为配置参数不匹配，修正模型名称与接口参数；若为one-api转发异常，调整转发规则；若为版本兼容性问题，需按实际环境确认适配方案。验证时，在FastGPT中重新加载模型配置，发起测试调用，确认false的异常显示消失，模型可正常完成重排序任务。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4214)
