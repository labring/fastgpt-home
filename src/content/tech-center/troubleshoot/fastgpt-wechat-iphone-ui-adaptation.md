---
title: 解决FastGPT微信访问iPhone端UI屏幕适配异常问题
slug: /zh/troubleshoot/fastgpt-wechat-iphone-ui-adaptation
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1605
source_type: GitHub issue
---

# 解决FastGPT微信访问iPhone端UI屏幕适配异常问题

## 现象
使用微信访问FastGPT发布链接时，iPhone设备（含iPhone 15 Pro）的UI展示与屏幕尺寸不匹配。

## 可能原因
1. FastGPT发布链接未完成公网映射，导致微信内无法正常加载页面资源。
2. 应用二维码使用通用生成方案，未针对微信内打开场景做适配优化。

## 排查步骤
1. 确认FastGPT发布链接已完成公网映射，确保可通过公网正常访问。
2. 检查应用二维码的生成方式，确认二维码可被多场景扫码识别。
3. 使用iPhone 15 Pro等目标设备，在微信内打开发布链接，观察UI适配情况。

## 解决与验证
1. 完成FastGPT发布链接的公网映射配置，确保链接可通过公网正常访问。
2. 若二维码识别或适配存在异常，更换适配微信场景的二维码生成方案。
3. 使用iPhone设备在微信内打开发布链接，验证UI展示与屏幕尺寸匹配。

> 来源: [FastGPT GitHub issue #1605](https://github.com/labring/FastGPT/issues/1605)
