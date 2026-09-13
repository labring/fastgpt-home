---
title: 解决FastGPT对接OneAPI调用多模态模型发送图片报错的问题
slug: /zh/troubleshoot/fastgpt-oneapi-multimodal-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1560
source_type: GitHub issue
---

# 解决FastGPT对接OneAPI调用多模态模型发送图片报错的问题

## 现象
用户使用FastGPT 4.8私有部署版本，对接OneAPI的llava-llama3:8b多模态模型。该渠道在OneAPI中单独测试可正常运行，且在FastGPT中可正常进行文本聊天，但发送图片时会触发报错。同时FastGPT与OneAPI均生成对应错误日志。

## 可能原因
目前可确认OneAPI渠道本身测试正常，报错仅在FastGPT调用该渠道发送图片时触发。具体原因需结合完整日志内容与配置细节确认，可能涉及多模态模型的图片输入参数传递、请求格式适配等环节。

## 排查步骤
1. 确认FastGPT版本为4.8私有部署版本，核对OneAPI中已添加的llava-llama3:8b渠道的配置信息。
2. 单独测试OneAPI中的该多模态模型渠道，确认文本与图片调用均可正常运行。
3. 检查FastGPT的config配置文件中，对接OneAPI的多模态模型的相关参数是否正确填写。
4. 重启FastGPT服务，重新加载配置后，再次尝试使用该渠道发送文本与图片，对比报错情况。
5. 查看FastGPT与OneAPI的完整错误日志，提取具体报错信息用于进一步定位。

## 解决与验证
若排查发现是FastGPT与OneAPI的多模态模型调用配置不匹配，可参考官方文档调整对应参数。验证方式为：再次使用该渠道发送图片，确认不再触发报错，且可正常获取多模态模型的图片分析结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1560)
