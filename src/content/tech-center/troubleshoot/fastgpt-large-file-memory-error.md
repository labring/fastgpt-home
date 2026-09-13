---
title: 解决FastGPT上传30M以上PDF文件的内存溢出报错问题
slug: /zh/troubleshoot/fastgpt-large-file-memory-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1810
source_type: GitHub issue
---

# 解决FastGPT上传30M以上PDF文件的内存溢出报错问题

## 现象
在FastGPT私有部署4.8.4版本中，上传30M以上的PDF文件时，调用`/api/core/dataset/collection/create/fileId`接口会触发报错。服务端日志显示明确的错误信息：`Worker terminated due to reaching memory limit: JS heap out of memory`，同时附带对应的错误栈信息。界面会出现上传失败的提示，无法正常完成数据集创建流程。

## 可能原因
该报错的直接原因是Node.js Worker线程达到内存限制，JS堆内存耗尽。在处理30M以上的PDF文件时，文件解析、文本提取等操作会占用大量内存，当配置的Worker线程内存不足以支撑该操作时，Worker线程会被系统强制终止，从而触发该报错。当前场景为私有部署4.8.4版本，默认的内存配置未适配大文件处理需求。

## 排查步骤
1.  准备30M以上的PDF文件，尝试上传并复现报错，确认问题是否固定出现。
2.  查看FastGPT服务端的运行日志，确认是否存在`Worker terminated due to reaching memory limit: JS heap out of memory`报错，且报错接口为`/api/core/dataset/collection/create/fileId`。
3.  检查当前部署环境的Node.js进程内存配置参数，需按实际环境确认相关设置是否满足大文件处理的内存需求。
4.  确认当前FastGPT部署版本为4.8.4，匹配问题场景。

## 解决与验证
需根据实际部署环境调整Node.js的堆内存相关配置参数，确保Worker线程拥有足够的内存来处理大文件。调整完成后，重新上传30M以上的PDF文件，验证以下内容：服务端日志不再出现上述报错，界面上传流程正常完成，数据集成功创建。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1810)
