---
title: 解决FastGPT分享页getPaginationRecords鉴权错误跳转问题
slug: /zh/troubleshoot/fastgpt-share-auth-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4367
source_type: GitHub issue
---

# 解决FastGPT分享页getPaginationRecords鉴权错误跳转问题

## 现象
清空浏览器缓存或使用无痕浏览器访问FastGPT分享页时，触发getPaginationRecords鉴权错误，页面跳转到登录页。该问题涉及FastGPT项目中projects/app/src/pages/chat/share.tsx文件的第322行，对应代码为return { shareId, outLinkUid: authToken || customUid || localUId || '' };

## 可能原因
缓存为空时，分享页鉴权逻辑未正确处理无有效鉴权凭证的场景，导致触发getPaginationRecords鉴权错误。本地部署版本会触发登录页跳转，SaaS版本未出现该跳转现象。

## 排查步骤
1.  清空浏览器缓存或启动无痕浏览器
2.  访问FastGPT分享页
3.  观察是否出现getPaginationRecords鉴权错误并跳转至登录页

## 解决与验证
目前确认该问题存在，需结合实际部署环境，针对getPaginationRecords鉴权逻辑进行排查调整。验证步骤为：清空浏览器缓存或启动无痕浏览器访问分享页，确认不再触发鉴权错误及登录页跳转。

> 来源: [FastGPT GitHub issue #4367](https://github.com/labring/FastGPT/issues/4367)
