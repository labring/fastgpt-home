---
title: 解决FastGPT调用Qwen3-Max识别PDF时图片无法提取内容的问题
slug: /zh/troubleshoot/fastgpt-pdf-image-parse-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6251
source_type: GitHub issue
---

# 解决FastGPT调用Qwen3-Max识别PDF时图片无法提取内容的问题

## 现象
用户上传票据扫描PDF文件至FastGPT，调用Qwen3-Max模型进行识别。在FastGPT的AI日志中，显示识别对象为图片，导致无法提取PDF内图片的具体信息。用户验证发现，直接使用在线Qwen3-Max服务可正常识别该PDF内图片的内容，且本地部署时使用了pdf-mark组件完成PDF解析。

## 可能原因
结合当前场景，可能的异常来源包括：FastGPT本地使用的pdf-mark解析组件对该类票据扫描PDF的格式处理存在异常，未正确提取PDF文本，仅将页面转为图片传入模型；本地部署的pdf-mark配置参数未适配该类扫描PDF的嵌入方式或分辨率，需按实际环境确认适配性；整体解析流程未完成PDF文本提取环节，直接将PDF页面转为图片输入模型。

## 排查步骤
1.  查看FastGPT的AI日志，确认识别流程中是否将PDF页面转为图片传入模型，匹配当前日志显示的异常表现。
2.  检查当前使用的pdf-mark配置参数，需按实际环境确认是否存在适配性问题。
3.  上传该票据扫描PDF到在线Qwen3-Max服务，对比识别结果，确认PDF本身的可识别性。
4.  尝试上传其他同类型票据扫描PDF文件，排查是否为单文件格式异常。

## 解决与验证
首先，调整pdf-mark的解析配置参数，需按实际环境优化适配该类扫描PDF的格式。随后，重新解析该票据扫描PDF，验证解析后的文本内容是否可被正常读取。最后，再次调用FastGPT的Qwen3-Max模型，确认可提取到PDF内图片的具体信息。若在线服务可正常识别但本地流程仍异常，需进一步排查pdf-mark组件的部署与配置问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/6251)
