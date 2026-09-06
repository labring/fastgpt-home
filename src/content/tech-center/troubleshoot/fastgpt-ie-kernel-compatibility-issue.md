---
title: FastGPT 分享聊天在 IE 兼容模式下空白的历史排查
slug: /zh/troubleshoot/fastgpt-ie-kernel-compatibility-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3620
source_type: GitHub issue
---

# FastGPT 分享聊天在 IE 兼容模式下空白的历史排查

## 适用场景与历史记录

原报告自述版本为 4.1.8-fix，涉及 360 和 Edge 的 Trident/IE 兼容模式下免登录窗口空白。 原始讨论提交于 2025-01-17，本页按该记录说明症状或需求的适用范围。

## 已有证据与适用范围

维护者要求控制台日志，线程缺少完整兼容修复。版本写法来自提问者，应保留自报属性。

## 排查与复测

1. 确认当前浏览器实际内核与兼容模式设置。
2. 使用浏览器标准模式做对照，并保存兼容模式控制台的首条脚本错误。
3. 记录准确镜像版本、分享地址和复现视频，按受支持浏览器范围核对部署。

这些检查用于复现和验证同类场景。继续反馈时，提供准确版本、最小输入、预期结果和脱敏日志，并引用原始讨论。

## 参考资料


> 来源: [原始讨论：对话免登录窗口在360兼容模式及Edge兼容模式下不显示，JS代码不兼容Trident内核(IE内核)](https://github.com/labring/FastGPT/issues/3620)

> 来源: [原讨论中的补充回复](https://github.com/labring/FastGPT/issues/3620#issuecomment-2601444533)
