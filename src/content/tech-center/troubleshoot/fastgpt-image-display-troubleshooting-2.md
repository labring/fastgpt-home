---
title: FastGPT图片链接可下载但无法正常显示的排错方案
slug: /zh/troubleshoot/fastgpt-image-display-troubleshooting-2
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5782
source_type: GitHub issue
---

# FastGPT图片链接可下载但无法正常显示的排错方案

## 现象
FastGPT 场景下，图片链接支持点击直接下载，但图片无法正常显示，仅链接可触发下载操作，页面中无对应图片渲染内容。

## 可能原因
当前无明确预设的故障原因指向，需结合实际部署环境、资源加载逻辑、权限配置以及 FastGPT 内部处理流程等多个维度逐步排查，无统一的共性故障原因。

## 排查步骤
1. 验证目标图片链接在外部独立环境中的可访问性，通过浏览器直接访问链接，确认图片可以正常加载，排除链接本身失效的问题。
2. 检查 FastGPT 部署环境的资源加载相关配置，需按实际环境确认具体配置项的正确性。
3. 核对资源加载所需的权限设置，确保 FastGPT 相关进程具备访问目标图片资源的权限，需按实际环境确认。
4. 排查 FastGPT 内部的资源处理逻辑，需结合实际部署版本确认对应环节的处理流程是否正常。

## 解决与验证
若通过上述排查找到对应问题点，可调整相关配置或修复对应逻辑后，再次验证图片是否可以正常显示。若问题仍未得到解决，可重新打开对应 issue 并补充相关排查信息，以便进一步处理。

> 来源: [FastGPT GitHub issue #5782](https://github.com/labring/FastGPT/issues/5782)
