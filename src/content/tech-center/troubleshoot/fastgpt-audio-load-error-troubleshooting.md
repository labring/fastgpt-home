---
title: 解决FastGPT首次请求音频加载失败的报错问题
slug: /zh/troubleshoot/fastgpt-audio-load-error-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4310
source_type: GitHub issue
---

# 解决FastGPT首次请求音频加载失败的报错问题

## 现象
FastGPT私有部署版本v4.9.1-fix2中，首次点击发送请求后，未等待请求返回即触发报错，加载状态关闭，再次点击才可正常获取音频。控制台报错信息为：`Uncaught (in promise) NotSupportedError: Failed to load because no supported source was found`。

## 可能原因
暂无明确预设原因，可能涉及音频资源格式不兼容、资源加载失败或加载时机异常，需按实际环境确认。

## 排查步骤
1.  查看浏览器控制台，确认报错信息是否为`Uncaught (in promise) NotSupportedError: Failed to load because no supported source was found`。
2.  确认FastGPT部署版本为v4.9.1-fix2。
3.  复现操作流程，记录首次点击与二次点击的功能表现差异。
4.  检查接口返回的音频资源格式，确认是否符合浏览器支持的类型。

## 解决与验证
若音频资源格式不兼容，调整音频编码格式至浏览器支持的标准格式后重新部署验证。若为加载时机异常，可调整前端请求的加载状态控制逻辑，确保加载状态在请求完成后再更新。验证方式为：首次点击发送请求，等待加载完成后检查是否正常获取音频且无报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4310)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
