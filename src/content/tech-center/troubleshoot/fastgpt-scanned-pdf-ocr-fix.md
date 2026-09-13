---
title: 解决FastGPT处理影印版PDF的OCR识别异常问题
slug: /zh/troubleshoot/fastgpt-scanned-pdf-ocr-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2067
source_type: GitHub issue
---

# 解决FastGPT处理影印版PDF的OCR识别异常问题

## 现象
上传影印版PDF文件后，系统无法正确提取其中的图像文本内容，仅能识别原生文字版PDF的内置文本，导致后续向量化、知识库检索等操作无法正常执行，无法满足影印版知识内容的上传识别需求。

## 可能原因
当前FastGPT默认的PDF文本提取逻辑仅适配原生文字版PDF，无法识别影印版扫描PDF的图像化文本内容，缺少针对扫描图像的OCR识别能力，因此无法完成影印版PDF的文本提取。

## 排查步骤
1. 确认待处理的PDF为影印扫描版，可通过查看PDF是否可复制文本判断，无法复制的大概率为影印版
2. 检查系统是否已部署支持OCR识别的相关工具链
3. 需按实际环境确认相关依赖的运行状态与配置是否正确

## 解决与验证
可通过两种方式解决该问题：一是等待PR #2097合并后部署，该方案的识别效果优于简易实现版本；二是联系获取基于mupdf和tesseract.js实现的OCR功能代码。验证时上传影印版PDF，确认系统可正确提取图像中的文本内容，且后续向量化、知识库操作可正常执行。

> 来源: [FastGPT GitHub issue #2067](https://github.com/labring/FastGPT/issues/2067)
