---
title: 解决FastGPT 4.8版本编辑高级编排后自动保存覆盖原有配置的问题
slug: /zh/troubleshoot/fastgpt-auto-save-override-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1517
source_type: GitHub issue
---

# 解决FastGPT 4.8版本编辑高级编排后自动保存覆盖原有配置的问题

## 现象
FastGPT 4.8版本中，编辑高级编排功能时，若仅用于调试不希望保存配置，退出编辑页面时会自动保存当前修改的配置，覆盖原有配置。

## 可能原因
未在高级编排编辑退出时添加保存确认逻辑，默认自动保存修改内容，导致调试过程中的临时修改被意外覆盖。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8。
2. 进入目标应用的高级编排编辑页面进行调试修改。
3. 不保存配置直接退出编辑页面。
4. 重新进入高级编排页面，查看原有配置是否被自动保存的修改覆盖。

## 解决与验证
解决方法为升级至FastGPT v4.8.10-alpha及以上版本。验证步骤如下：
1. 升级至FastGPT v4.8.10-alpha或更新版本。
2. 进入高级编排编辑页面进行调试修改。
3. 退出编辑页面时，确认是否弹出保存确认提示。
4. 选择不保存后，重新进入页面查看原有配置是否未被覆盖。

> 来源: [FastGPT GitHub issue #1517](https://github.com/labring/FastGPT/issues/1517)
