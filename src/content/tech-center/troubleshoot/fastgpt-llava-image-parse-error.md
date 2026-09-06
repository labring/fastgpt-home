---
title: 解决FastGPT调用LLaVA模型时图片解析失败的问题
slug: /zh/troubleshoot/fastgpt-llava-image-parse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1308
source_type: GitHub issue
---

# 解决FastGPT调用LLaVA模型时图片解析失败的问题

## 现象
用户使用Docker部署的FastGPT 4.7最新版，通过OneAPI对接LLaVA模型。LLaVA模型在独立WebUI中可正常解析图片，与FastGPT的文本对话功能运行正常，但调用模型解析图片时出现报错。同时GPT-4 Vision模型可正常完成图片解析。

## 可能原因
该问题未明确根因，需结合实际部署环境确认。已知关联线索包括：LLaVA模型的图片输入格式与FastGPT的图片解析接口要求存在差异，OneAPI的配置未正确传递图片解析所需的参数，FastGPT的图片处理逻辑与当前部署的LLaVA版本存在兼容性偏差。

## 排查步骤
1. 确认FastGPT版本为4.7且所有Docker镜像已更新至最新版，同时确认OneAPI版本为最新版。
2. 验证LLaVA模型在独立WebUI环境中可正常完成图片解析，确认模型本身无异常。
3. 对比可正常解析图片的GPT-4 Vision模型的调用参数，检查当前LLaVA模型的调用参数是否遗漏图片相关配置项。
4. 查看FastGPT的运行日志，提取与图片解析失败相关的报错信息。

## 解决与验证
1. 若为参数配置不匹配问题，调整OneAPI中LLaVA模型的调用参数，使其符合FastGPT的图片解析接口要求。
2. 若为兼容性问题，可尝试更换与FastGPT 4.7兼容的LLaVA版本，或关注FastGPT的版本更新以获取适配支持。
3. 验证方式：在FastGPT中重新发起图片解析请求，确认模型可正常返回图片解析结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1308)
