---
title: 解决FastGPT私有部署版本AI回复无流式输出问题
slug: /zh/troubleshoot/fastgpt-private-streaming-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/663
source_type: GitHub issue
---

# 解决FastGPT私有部署版本AI回复无流式输出问题

## 现象
FastGPT 4.6.4私有部署版本中，所有对话场景下AI回复均无打字机逐字输出效果，内容一次性全部显示，未实现流式输出效果。用户通过群聊确认API密钥可用且部署环境未挂载CDN。

## 可能原因
该问题大概率由网关配置异常或Nginx配置存在问题导致，未发现同类复现案例。

## 排查步骤
1. 确认部署环境未使用CDN加速，排除CDN对流式输出的影响。
2. 检查网关及Nginx的相关配置参数，确认配置符合FastGPT部署的规范要求。
3. 验证所使用的API密钥可正常调用大模型接口，排除密钥或模型接口本身的异常情况。

## 解决与验证
调整Nginx配置即可解决该问题。验证方式为发起新的对话，观察AI回复是否恢复逐字流式输出效果。

> 来源: [FastGPT GitHub issue #663](https://github.com/labring/FastGPT/issues/663)
