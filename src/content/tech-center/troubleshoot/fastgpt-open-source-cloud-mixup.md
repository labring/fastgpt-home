---
title: 解决FastGPT开源版本与公有云版本使用混淆问题
slug: /zh/troubleshoot/fastgpt-open-source-cloud-mixup
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/897
source_type: GitHub issue
---

# 解决FastGPT开源版本与公有云版本使用混淆问题

## 现象
部分用户在FastGPT开源版本的GitHub仓库提交issue时，未填写问题描述、复现步骤、预期结果等有效信息，且所提问题涉及收费相关或公有云版本的范畴。

## 可能原因
未明确区分FastGPT开源部署版本与公有云版本的使用场景，未查阅仓库相关说明，错误在开源仓库提交非开源版本相关的问题。

## 排查步骤
1. 确认当前使用的FastGPT版本类型，区分开源部署版本与公有云版本。
2. 检查待提交的问题内容，确认其是否匹配当前版本的范畴。
3. 补充填写issue的问题描述、复现步骤、预期结果等有效信息，确保内容清晰具体。

## 解决与验证
若问题属于开源部署版本范畴，需完善issue的有效信息后提交至该开源仓库。若问题属于公有云线上版本，需前往对应专属渠道提交。验证标准为：提交的issue内容符合当前版本的问题范畴，可获得针对性的技术支持。

> 来源: [FastGPT GitHub issue #897](https://github.com/labring/FastGPT/issues/897)
