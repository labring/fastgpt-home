---
title: 解决FastGPT中zustand persist的local storage容量限制问题
slug: /zh/troubleshoot/fastgpt-zustand-persist-storage-limit
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/666
source_type: GitHub issue
---

# 解决FastGPT中zustand persist的local storage容量限制问题

## 现象
FastGPT中使用zustand/middleware persist缓存store数据时，会遇到浏览器local storage容量限制引发的异常。该异常的具体表现需按实际运行场景确认，可能包括缓存数据无法正常保存、功能触发报错等情况。

## 可能原因
zustand/middleware persist工具利用浏览器local storage存储缓存的store数据，而local storage存在固定的容量限制。当缓存数据的总量超出该限制时，会触发相关异常，具体限制数值需按实际环境确认。

## 排查步骤
1. 检查FastGPT运行环境的浏览器local storage已使用的存储空间容量。
2. 统计当前缓存的store数据总量，确认其是否接近或超出浏览器local storage的容量限制，需按实际环境确认具体限制数值。
3. 排查当前出现的功能异常是否由local storage容量不足所引发。

## 解决与验证
可通过将存储方案替换为localforage的方式解决该问题，如需提交修复代码可发起拉取请求。验证时需确认缓存数据可正常存储，且不受local storage容量限制的影响，具体验证场景需按实际运行环境确认。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/666)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
