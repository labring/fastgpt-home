---
title: 解决FastGPT私有部署版对话页面NEXT_LOCALE Cookie被覆盖的问题
slug: /zh/troubleshoot/fastgpt-cookie-locale-override
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7007
source_type: GitHub issue
---

# 解决FastGPT私有部署版对话页面NEXT_LOCALE Cookie被覆盖的问题

## 现象
页面已配置为中文，浏览器Cookie中的`NEXT_LOCALE`值为`zh-CN`，但进入对话页面后该Cookie值会被自动覆盖为`en`；切换回其他页面后，所有页面的语言都会变为英文，无法保持预设的中文设置。

## 可能原因
该问题的直接原因为对话页面的语言处理逻辑异常，错误覆盖了浏览器存储的`NEXT_LOCALE` Cookie值，未按预期保留用户设置的语言标识。具体根因需结合项目代码进一步排查确认。

## 排查步骤
1. 打开浏览器开发者工具，进入「应用」标签页的「存储-Cookie」菜单，查看初始状态下`NEXT_LOCALE`的Cookie值是否为`zh-CN`。
2. 进入对话页面后，再次查看`NEXT_LOCALE`的Cookie值，确认是否被修改为`en`。
3. 切换回非对话页面，检查所有页面的语言是否均变为英文，验证异常影响范围。
4. 确认当前使用的FastGPT版本为V4.14.20私有部署版，排除版本差异导致的问题。

## 解决与验证
解决该问题需调整对话页面的语言处理逻辑，优先读取现有`NEXT_LOCALE` Cookie中的语言值，避免强制重置该Cookie值。具体修复代码需结合项目代码逻辑调整。
验证步骤：
1. 部署修复后的代码，确认进入对话页面时`NEXT_LOCALE`仍保持初始的`zh-CN`值。
2. 切换至其他页面，确认页面语言仍为中文，未被强制改为英文。
3. 手动修改`NEXT_LOCALE`为其他合法语言值，验证页面可正确适配对应语言设置。

> 来源：[FastGPT GitHub Issue #7007](https://github.com/labring/FastGPT/issues/7007)
