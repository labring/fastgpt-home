---
title: 解决FastGPT中QwQ-32B模型思考过程折叠问题
slug: /zh/troubleshoot/fastgpt-qwq32b-reasoning-fold
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4000
source_type: GitHub issue
---

# 解决FastGPT中QwQ-32B模型思考过程折叠问题

## 现象
在FastGPT平台接入QwQ-32B模型时，模型生成内容的思考过程无法实现折叠展示，无法满足对应使用需求。

## 可能原因
未在vllm启动过程中配置启用模型思考过程折叠的相关参数，具体原因需结合实际部署环境确认。

## 排查步骤
1. 确认当前部署的模型为QwQ-32B，且模型推理依赖vllm工具。
2. 查看当前vllm的启动命令参数，检查是否包含`--enable-reasoning`和`--reasoning-parser`相关配置项。
3. 若发现缺少对应配置，停止当前运行的vllm服务，准备修改启动参数。

## 解决与验证
在vllm启动命令中添加`--enable-reasoning --reasoning-parser deepseek_r1`参数，重启vllm服务后，在FastGPT中接入该QwQ-32B模型，验证模型思考过程是否可正常折叠。

> 来源: [FastGPT GitHub issue #4000](https://github.com/labring/FastGPT/issues/4000)
