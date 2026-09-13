---
title: 解决FastGPT工作流文档解析节点URL缺失IP端口问题
slug: /zh/troubleshoot/fastgpt-workflow-url-missing-ip-port
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4625
source_type: GitHub issue
---

# 解决FastGPT工作流文档解析节点URL缺失IP端口问题

## 现象
用户在FastGPT 4.9.6私有部署版本中，开启工作流的文件上传功能，上传Word文件后使用文档解析功能时，系统提示Invalid URL错误。用户打印的文件完整链接包含IP与端口（如`https://xxx:18443/api/common/file/read/aaa.docx?token=xxx`），复制到浏览器可正常下载文件。但文档解析节点中展示的文件链接仅为相对路径格式（如`https://api/common/file/read/aaa.docx?token=xxx`），缺失IP和端口部分，点击该链接无法正常访问文件。

## 可能原因
该问题的核心原因是文档解析节点生成文件访问链接时，未正确拼接系统配置的完整基础服务URL，仅生成了相对路径的API接口地址，导致链接无法被浏览器正常解析访问。

## 排查步骤
1.  确认FastGPT服务的基础访问URL配置，检查是否正确配置了包含IP、端口的完整服务地址，需按实际部署环境确认配置项位置与格式。
2.  查看工作流的文件上传与文档解析节点配置，确认文件访问链接的生成逻辑是否正确关联了基础服务URL。
3.  对比打印的有效文件链接与解析节点的异常链接，确认缺失的IP端口部分是否为当前服务的实际部署访问地址。

## 解决与验证
解决方法：将FastGPT服务的基础访问URL配置为完整的包含IP、端口的地址（如`https://{your-ip}:18443`），重启服务后重新触发工作流。
验证步骤：
1.  重新上传Word文件并触发文档解析节点，查看解析节点中的文件链接是否包含完整IP和端口。
2.  点击解析的文档链接，确认可在浏览器中正常打开并访问文件。
3.  检查文档解析功能是否不再提示Invalid URL报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4625)
