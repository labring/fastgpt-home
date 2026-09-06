---
title: 解决FastGPT免登录分享链接的用户反馈上传问题
slug: /zh/troubleshoot/fastgpt-share-link-feedback-upload
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1721
source_type: GitHub issue
---

# 解决FastGPT免登录分享链接的用户反馈上传问题

## 现象
使用FastGPT分享的免登录链接访问应用时，若回答内容不正确，或引用的知识库文件不存在，无法让访问者提交反馈并上传相关文档。

## 可能原因
当前FastGPT未内置该场景下的用户反馈上传功能，公开issue中暂无现成的实现方案，涉及非知识库文件上传反馈的相关解决方案未被公开记录。

## 排查步骤
1. 确认当前FastGPT已升级至最新版本
2. 检索项目官方文档及公开issue，确认是否存在可实现该功能的已有配置或方案
3. 检查高级编排功能是否可适配该需求场景

## 解决与验证
目前暂无直接可用的内置功能或配置项。检索公开issue未发现涉及非知识库文件上传反馈的现成解决方案。可将该需求保留为开放issue以等待后续功能规划，或通过提交issue的方式跟进功能开发进度。需按实际环境确认是否有其他临时适配方案。

> 来源: [FastGPT GitHub issue #1721](https://github.com/labring/FastGPT/issues/1721)
