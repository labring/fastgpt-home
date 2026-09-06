---
title: 解决FastGPT知识库PDF解析后图片无法正常显示的问题
slug: /zh/troubleshoot/fastgpt-pdf-image-display-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4937
source_type: GitHub issue
---

# 解决FastGPT知识库PDF解析后图片无法正常显示的问题

## 现象
使用PDF增强模式时，界面仅显示图片图标但无法加载图片；不使用增强模式时，知识库中无任何图片显示。部分部署4.9.11版本的实例中，使用增强解析Doc2X服务时，知识库预览可临时看到图片，但次日图片消失。使用官方解析服务https://doc.tryfastgpt.ai解析同一PDF后，知识库预览同样无法查看图片，且无法定位图片存储位置。

## 可能原因
该问题在4.9.11版本中存在，4.9.12版本已完成修复。涉及的核心逻辑包括图片自动删除模块与文档集合关联数据清理逻辑，可能因临时存储的图片未完成持久化，或在文档集合清理时被连带删除，导致知识库预览时无法加载图片。

## 排查步骤
1. 确认当前FastGPT部署版本，检查是否为4.9.11及更早版本。
2. 检查系统是否启用了增强解析Doc2X服务。
3. 分别使用自建解析服务与官方解析服务https://doc.tryfastgpt.ai解析同一PDF，对比知识库预览中的图片显示情况。
4. 检查知识库文档集合是否被执行过删除操作，或关联的图片数据是否被清理。

## 解决与验证
将FastGPT升级至4.9.12及以上版本，即可解决该问题。升级完成后，重新上传并解析目标PDF，查看知识库预览中的图片是否正常显示且长期留存。若仍存在问题，可检查文档集合的删除参数，确认`delImg`参数是否被误设为`true`导致连带删除图片。

> 来源: [FastGPT GitHub issue #4937](https://github.com/labring/FastGPT/issues/4937)
