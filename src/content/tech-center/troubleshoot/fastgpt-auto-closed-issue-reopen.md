---
title: FastGPT PWA 安装体验：历史需求与浏览器核对
slug: /zh/troubleshoot/fastgpt-auto-closed-issue-reopen
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2597
source_type: GitHub issue
---

# FastGPT PWA 安装体验：历史需求与浏览器核对

## 适用场景与历史记录

原议题提出 PWA 支持，希望在桌面与移动端获得可安装的应用体验。 原始讨论提交于 2024-09-02，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

原线程属于 PWA 功能需求记录，具体实现与安装体验需要按浏览器和版本分别验证。

## 排查与复测

1. 分别记录桌面和移动浏览器的版本、访问地址及安装入口是否出现。
2. 在浏览器开发者工具中检查站点清单和 Service Worker 的实际状态。
3. 明确所需的是桌面入口、离线能力还是推送能力，按各项实际测试结果继续反馈。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：增加支持PWA](https://github.com/labring/FastGPT/issues/2597)
