---
title: 解决FastGPT中PDF解析依赖marker-pdf版本过低的问题
slug: /zh/troubleshoot/fastgpt-pdf-marker-version-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4171
source_type: GitHub issue
---

# 解决FastGPT中PDF解析依赖marker-pdf版本过低的问题

## 现象
使用FastGPT解析PDF文件时，会生成大量垃圾标签，有效文字占比仅约10%，严重影响知识库的分段效果。当前内置的marker-pdf版本为0.3.10。

## 可能原因
FastGPT内置的PDF解析依赖marker-pdf版本为0.3.10，该版本存在解析垃圾标签过多的问题；官方最新版本存在已知异常，暂不推荐使用。

## 排查步骤
1. 检查当前部署环境中marker-pdf的实际安装版本。
2. 核对FastGPT内置的marker-pdf依赖版本是否为0.3.10。
3. 确认是否存在解析垃圾标签过多的现象，匹配版本异常的特征。

## 解决与验证
将marker-pdf版本指定为1.5.5，该版本为官方推荐的稳定版本。调整依赖配置后，重新部署或重启FastGPT服务，使配置生效。上传PDF文件进行解析测试，验证垃圾标签数量是否减少，有效文字占比是否提升。

> 来源: [FastGPT GitHub issue #4171](https://github.com/labring/FastGPT/issues/4171)
