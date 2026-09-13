---
title: 解决FastGPT私有部署上传大docx文件卡住的问题
slug: /zh/troubleshoot/fastgpt-upload-large-docx-stuck
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1832
source_type: GitHub issue
---

# 解决FastGPT私有部署上传大docx文件卡住的问题

## 现象
用户在FastGPT私有部署4.8.3版本中，上传7.83MB（8,212,029字节）的docx文档时，上传流程一直卡在等待状态，且未捕获到明确的报错日志信息。

## 可能原因
当前未获取到明确的报错日志，具体触发原因需结合实际部署环境进行确认，无通用固定诱因。

## 排查步骤
1.  记录待上传的docx文件大小为7.83MB（8,212,029字节），观察上传卡住时的页面状态与耗时。
2.  查看FastGPT服务的运行日志，排查是否存在未被前端展示的隐藏报错信息。
3.  检查部署服务器的内存、CPU等资源使用情况，确认是否存在资源耗尽导致的进程阻塞。
4.  核对FastGPT的上传相关配置，确认是否存在文件上传大小限制的配置项（具体配置需按实际环境确认）。

## 解决与验证
若排查发现上传卡住由文件大小限制或资源瓶颈导致，需调整对应配置项或优化服务器资源分配，重启FastGPT服务后重新上传测试。验证方式为重新上传该7.83MB的docx文件，确认上传流程不再卡住，可正常完成文件上传与解析。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1832)
