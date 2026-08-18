---
title: 解决FastGPT调用大模型时PDF被识别为图片无法提取内容的问题
slug: /zh/troubleshoot/fastgpt-pdf-recognize-as-image
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6251
source_type: GitHub issue
---

# 解决FastGPT调用大模型时PDF被识别为图片无法提取内容的问题

## 现象
用户在FastGPT中调用qwen3-max识别票据扫描PDF文件时，AI日志显示处理对象为图片，无法提取PDF内的具体信息。但直接通过互联网端的qwen3-max上传同一PDF文件，可正常识别并提取该PDF内嵌图片的内容。本地处理该PDF时，使用了pdf-mark工具。

## 可能原因
结合当前现象可推测两类潜在原因：一是本地使用的pdf-mark工具对该扫描型票据PDF的解析逻辑与互联网端存在差异，导致PDF被整体转为单张图片而非提取内嵌的文本或图片内容；二是FastGPT本地的PDF处理流程，未对齐互联网端的扫描型PDF适配逻辑，导致处理结果不符合预期。此外，需按实际环境确认是否存在其他配置差异，如FastGPT的PDF处理模块参数、环境依赖版本等。

## 排查步骤
1. 复现当前问题：在FastGPT平台上传该票据扫描PDF文件，调用qwen3-max进行识别，查看AI日志中显示的处理对象是否为图片，记录异常表现；
2. 对比互联网端处理结果：直接使用互联网端的qwen3-max上传同一PDF文件，确认是否可正常提取该PDF内嵌图片的具体信息，对比两者的处理差异；
3. 检查本地PDF处理工具配置：确认本地使用的pdf-mark工具的运行参数、版本信息（需按实际环境确认具体内容），排查是否存在解析规则与互联网端不一致的情况；
4. 提取并分析AI日志：完整导出FastGPT的AI日志，查看是否存在与PDF解析相关的报错文本或异常流程记录，定位问题环节。

## 解决与验证
1. 优化本地PDF解析配置：调整pdf-mark工具的解析参数（需按实际环境确认具体参数项），优化对扫描型PDF的文本提取逻辑，尝试将PDF拆分为页面或提取内嵌图片而非整体转为单张图片；
2. 对齐处理流程：参考互联网端的PDF处理逻辑，调整FastGPT本地的PDF处理模块配置，确保与互联网端的处理规则保持一致；
3. 验证修复效果：重新上传该票据扫描PDF到FastGPT，调用qwen3-max进行识别，查看AI日志是否不再显示处理对象为图片，且能成功提取PDF内的具体信息。若仍未解决问题，需进一步排查FastGPT本地PDF处理模块的适配逻辑。

> 来源：[FastGPT GitHub Issue #6251](https://github.com/labring/FastGPT/issues/6251)
