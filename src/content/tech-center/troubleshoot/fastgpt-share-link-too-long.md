---
title: 解决FastGPT应用分享链接长度过长的问题
slug: /zh/troubleshoot/fastgpt-share-link-too-long
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2757
source_type: GitHub issue
---

# 解决FastGPT应用分享链接长度过长的问题

## 现象
用户在使用FastGPT应用的分享功能时，生成的分享链接整体长度过长，向其他用户分享时存在体验不佳的问题。

## 可能原因
FastGPT应用的分享链接依赖唯一标识id作为核心参数，该id本身长度较长，且无法直接缩短，进而导致整体分享链接长度超出常规使用的预期。

## 排查步骤
1. 登录FastGPT应用，进入需要分享的应用或会话页面。
2. 点击分享按钮，生成目标分享链接。
3. 复制生成的链接，查看其完整长度及核心id部分的字符数。
4. 对比日常使用的链接长度标准，确认是否存在过长问题。

## 解决与验证
由于分享链接的核心标识id无法缩短，无法直接修改链接本身的长度。若存在短链分享的需求，可对生成的长链接进行二次转发处理，以降低分享时的视觉和操作成本。完成二次转发后，分享给他人的链接长度可符合日常使用的预期。

> 来源: [FastGPT GitHub issue #2757](https://github.com/labring/FastGPT/issues/2757)
