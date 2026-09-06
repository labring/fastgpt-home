---
title: 解决FastGPT共享应用浏览器标题logo未按配置显示的问题
slug: /zh/troubleshoot/fastgpt-shared-logo-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/573
source_type: GitHub issue
---

# 解决FastGPT共享应用浏览器标题logo未按配置显示的问题

## 现象
访问通过FastGPT分享出去的应用时，浏览器标题栏显示系统默认logo，未按照用户预先设置的内容展示应用logo，与预期配置效果不符。

## 可能原因
目前未明确具体触发原因，结合相关反馈，该功能近期未被代码变更影响，问题可能与版本兼容性或配置保存状态有关，需结合实际部署版本与配置环境确认。

## 排查步骤
1. 确认当前使用的FastGPT版本，若为非最新版本，尝试升级至最新版本
2. 重新保存应用的logo配置项后，再次访问共享应用链接
3. 清理浏览器缓存后重新访问共享应用页面，排除缓存导致的显示异常

## 解决与验证
升级至FastGPT最新版本后，重新配置并保存应用logo，再次访问共享应用链接，验证浏览器标题栏是否显示已设置的logo。若升级后仍存在该问题，可重新提交相关反馈以获取进一步支持。

> 来源: [FastGPT GitHub issue #573](https://github.com/labring/FastGPT/issues/573)
