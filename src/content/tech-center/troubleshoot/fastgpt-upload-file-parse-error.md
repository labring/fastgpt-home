---
title: 解决FastGPT上传文档解析提示仅支持指定格式的问题
slug: /zh/troubleshoot/fastgpt-upload-file-parse-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2372
source_type: GitHub issue
---

# 解决FastGPT上传文档解析提示仅支持指定格式的问题

## 现象
在FastGPT私有部署v4.8.9版本中，启用文件上传功能后，上传txt、pdf等文档解析支持的文件，通过文档解析流程处理时，返回的解析结果为`<Content>Only support .txt, .md, .html, .pdf, .docx, pptx, .csv, .xlsx</Content>`，无法提取文件的具体文本内容。将上传后的文件访问地址替换为不带token的静态文件地址时，可正常完成文档解析。

## 可能原因
该问题的核心推测为：上传后的文件访问地址携带了token查询参数，文档解析模块在识别文件类型时，受到URL中额外参数的干扰，无法正确提取文件的扩展名，从而触发不支持文件格式的报错。

## 排查步骤
1.  查看上传文件后生成的访问地址，确认地址中是否包含token等额外查询参数。
2.  复制该带参数的地址，移除token及其他查询参数后，验证文件是否可正常访问。
3.  分别使用带参数的上传地址和无参数的静态文件地址执行文档解析，对比两次的解析结果差异。

## 解决与验证
解决方式为优化FastGPT的文档解析流程，在识别文件类型时，仅从文件名中提取扩展名，忽略URL中的查询参数部分。验证步骤如下：
1.  重新上传txt或pdf格式的文件，获取携带token的访问地址。
2.  执行文档解析操作，确认解析结果可正常显示文件的具体文本，不再提示仅支持指定格式的报错。
3.  使用静态文件地址再次执行解析，验证解析功能未受影响，结果正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2372)
