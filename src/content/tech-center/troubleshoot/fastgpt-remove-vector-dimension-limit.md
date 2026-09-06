---
title: 解决FastGPT向量维度被强制截断为1536的问题
slug: /zh/troubleshoot/fastgpt-remove-vector-dimension-limit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6310
source_type: GitHub issue
---

# 解决FastGPT向量维度被强制截断为1536的问题

## 现象
使用FastGPT私有部署版本v4.14.5，调用Qwen3-Embedding-8B模型时，系统反复弹出报错：`The current vector dimension is 4096, and the vector dimension cannot exceed 1536. The first 1536 dimensions are automatically captured`，提示向量维度超过1536时会自动截取前1536维，无法保留完整的4096维向量。

## 可能原因
该问题由FastGPT默认设置的向量维度上限引发，当前默认上限为1536。当使用输出维度高于1536的嵌入模型时，系统会触发自动截断逻辑并弹出对应报错。

## 排查步骤
1. 确认当前使用的嵌入模型的向量输出维度，本次问题中为Qwen3-Embedding-8B，输出维度为4096。
2. 检查FastGPT的相关配置，确认是否存在向量维度限制的配置项（具体配置项需按实际环境确认）。
3. 查看系统日志或前端报错信息，确认是否出现指定的维度截断提示文本。

## 解决与验证
修改FastGPT中对应向量维度限制的配置项，将上限调整为与嵌入模型匹配的数值（如本次问题中调整为4096）。修改配置后重启FastGPT服务，重新调用嵌入模型，确认不再出现指定的报错文本，且向量维度未被截断。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6310)
