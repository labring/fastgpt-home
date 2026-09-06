---
title: 解决FastGPT生成文件后下载地址显示为sandbox路径的问题
slug: /zh/troubleshoot/fastgpt-sandbox-download-address-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5323
source_type: GitHub issue
---

# 解决FastGPT生成文件后下载地址显示为sandbox路径的问题

## 现象
由FastGPT生成的aaa.xlsx文件，下载地址显示为sandbox:/aaa.xlsx，无法正常完成下载。

## 可能原因
生成文件的操作位于代码执行模块，该模块的文件存储路径为隔离路径，无法通过公开地址直接访问。

## 排查步骤
1. 确认生成目标文件的操作所在的功能模块类型
2. 检查该模块是否为代码执行模块
3. 核对生成文件的路径标识，确认是否以sandbox开头

## 解决与验证
使用系统内置的markdown转docx/xlsx工具生成所需文件。生成的文件将可通过正常下载地址访问。验证时，使用该工具生成文件后，查看下载地址是否为非sandbox开头的可访问路径，并尝试下载确认文件可用性。

> 来源: [FastGPT GitHub issue #5323](https://github.com/labring/FastGPT/issues/5323)
