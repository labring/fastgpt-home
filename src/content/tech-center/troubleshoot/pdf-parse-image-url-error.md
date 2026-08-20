---
title: 解决FastGPT增强解析PDF后图片URL重复显示异常问题
slug: /zh/troubleshoot/pdf-parse-image-url-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6245
source_type: GitHub issue
---

# 解决FastGPT增强解析PDF后图片URL重复显示异常问题

## 现象
使用私有部署4.14.5版本的FastGPT，通过增强解析上传PDF文档并调用MinerU API解析后，文档内容正常，图片已成功写入fastgpt-private桶，但知识库打开文档时分段内的图片无法正常显示。具体表现为：图片URL存在重复拼接的服务器地址问题，例如显示为`http://12.1.1.218/dataset/12.1.1.218/api/system/file`，前缀重复了服务器地址；双击知识库片段时图片加载异常，手动修改URL移除重复前缀后，图片可正常打开。

## 可能原因
推测是FastGPT的文件访问URL生成配置存在错误，导致在拼接图片访问地址时重复添加了服务器基础地址，最终生成无效的重复URL，导致图片无法正常加载。由于issue未明确具体配置项名称，需按实际部署环境核对相关参数。

## 排查步骤
1. 确认当前部署的是私有部署4.14.5版本，且使用增强解析功能上传PDF文档。
2. 查看FastGPT容器的环境变量配置，核对与文件存储、URL生成相关的参数设置。
3. 进入存在异常的知识库文档，复制分段内的图片URL，观察是否存在重复拼接的服务器地址。
4. 手动修改异常URL，移除重复的服务器地址前缀，验证图片是否可以正常打开，确认问题根源为URL拼接错误。

## 解决与验证
1. 调整FastGPT的文件访问URL生成配置，确保图片URL仅拼接一次服务器基础地址，避免重复拼接。
2. 重新上传PDF文档并启用增强解析功能，等待解析完成后进入对应的知识库文档。
3. 查看分段内的图片URL，确认不再存在重复的服务器地址拼接。
4. 点击图片或双击知识库片段，验证图片可以正常加载显示。
5. 确认所有分段内的图片均正常显示，问题得到解决。

> 来源：[FastGPT GitHub Issue #6245](https://github.com/labring/FastGPT/issues/6245)
