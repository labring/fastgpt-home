---
title: 修复FastGPT v4.8.10-fix2版本chatId未刷新导致的对话异常
slug: /zh/deploy/release-notes-4-8-10-fix2
page_type: 版本解读
source: https://github.com/labring/FastGPT/releases/tag/v4.8.10-fix2
source_type: 官方文档
---

# 修复FastGPT v4.8.10-fix2版本chatId未刷新导致的对话异常

## 这个版本改了什么
本版本修复了用户选择的chatId未刷新的问题。在原有版本中，当进入对话页面且chatId为空，同时编排以“用户选择”节点开始时，用户点击选择按键后会新开对话，无法保持连续的对话流程。该问题会打断对话的连贯性，影响使用体验。本版本针对该问题完成修复后，该场景下的对话流程可正常延续，用户选择操作可与后续对话保持连续。

## 升级前要确认的事
升级前需确认当前FastGPT服务是否存在以用户选择节点开始的编排对话场景，且该场景下出现过点击选择后新开对话的异常问题。若服务未出现该异常场景，也可直接进行升级以提前修复潜在的同类问题。

## 升级步骤（照做）
直接修改FastGPT服务的镜像tag为v4.8.10-fix2。

## 升级后怎么验证
升级完成后，可进入对话页面，将chatId置空，创建以“用户选择”节点开始的编排，发起对话并点击选择按键。观察对话流程是否保持连续，未出现新开对话的情况，即可确认修复生效。也可对比修复前后的场景表现，进一步验证问题已解决。

> 来源: [FastGPT release notes](https://github.com/labring/FastGPT/releases/tag/v4.8.10-fix2)
