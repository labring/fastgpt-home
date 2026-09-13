---
title: FastGPT工具调用后猜你想问功能不生效排错指南
slug: /zh/troubleshoot/fastgpt-guess-question-working-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1898
source_type: GitHub issue
---

# FastGPT工具调用后猜你想问功能不生效排错指南

## 现象
使用工具调用后，猜你想问功能不生效。该功能存在经常不出现、仅偶尔出现的情况；同时存在模型提示不生效的问题。

## 可能原因
1. 猜你想问功能的触发机制存在异常；
2. 模型提示未按要求返回数组格式的内容，导致功能无法正常运行。

## 排查步骤
1. 确认当前使用的FastGPT版本为最新公有云或私有部署版本；
2. 检查工具调用过程中模型返回的内容格式，确认是否符合数组格式要求；
3. 观察猜你想问功能的触发表现，确认是否存在经常不出现、仅偶尔出现的情况。

## 解决与验证
针对模型提示未按要求返回数组的问题，需确保模型返回内容符合数组格式要求。针对猜你想问功能偶尔出现、经常不出现的情况，需结合实际使用与部署环境确认触发机制的相关逻辑，具体调整需按实际环境确认。

> 来源: [FastGPT GitHub issue #1898](https://github.com/labring/FastGPT/issues/1898)
