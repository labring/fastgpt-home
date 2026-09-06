---
title: 解决FastGPT中用户选择交互结果未正常展示的问题
slug: /zh/troubleshoot/fastgpt-user-selection-display
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4637
source_type: GitHub issue
---

# 解决FastGPT中用户选择交互结果未正常展示的问题

## 现象
使用FastGPT的选择类交互功能时，用户的选择消息无法正常显示，仅存在高亮选中状态，未以一问一答的形式展示用户选择的内容，与官方文档中的交互展示效果不符。

## 可能原因
默认的选择交互逻辑仅通过高亮标识选中项，未主动输出用户选择的文本内容。若需展示选择的文本内容，需额外配置指定回复节点。

## 排查步骤
1. 检查当前选择交互功能的配置情况，确认是否添加了指定回复节点。
2. 对比官方文档中的交互示例，验证当前界面的展示效果是否与文档一致。
3. 需按实际环境确认相关配置项的具体参数。

## 解决与验证
若需要输出包含用户选择内容的文本（如“选择"逆变器"”），需添加指定回复节点。配置完成后，发起选择交互，确认用户选择的内容以文本形式正常展示，且高亮状态同时存在。

> 来源: [FastGPT GitHub issue #4637](https://github.com/labring/FastGPT/issues/4637)
