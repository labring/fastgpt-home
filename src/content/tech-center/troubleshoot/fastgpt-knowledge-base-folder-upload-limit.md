---
title: 解决FastGPT知识库文件夹上传文件限制100个的问题
slug: /zh/troubleshoot/fastgpt-knowledge-base-folder-upload-limit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1774
source_type: GitHub issue
---

# 解决FastGPT知识库文件夹上传文件限制100个的问题

## 现象
在FastGPT V4.8.4私有部署docker版本中，使用知识库的文本数据集上传文件夹时，单次拖入的文件数量被限制为100个，相关界面截图显示单次上传文件数量上限为100。重启FastGPT所有组件后该限制会消失，重启前还会出现知识库训练卡住不动的问题。

## 可能原因
该问题的具体根因未明确，现有用户反馈中仅提及重启FastGPT所有组件可临时恢复功能，推测可能与组件的临时缓存、连接状态或资源阈值有关，具体影响因素需结合实际部署环境确认。

## 排查步骤
1.  确认当前FastGPT版本为V4.8.4，且为私有部署docker版本。
2.  检查是否出现单次拖入文件夹上传文件时仅能导入100个文件的情况，同时观察是否伴随知识库训练卡住的现象。
3.  尝试重启FastGPT所有组件，验证功能是否恢复正常。
4.  记录每次出现问题的触发场景，例如上传的文件夹大小、文件类型等，辅助后续定位根因。

## 解决与验证
当前临时恢复该问题的方法为重启FastGPT所有组件，执行后可恢复文件夹上传文件数量限制及知识库训练功能。验证时，可拖入包含超过100个格式正确文件的文件夹，确认所有符合要求的文件均可被正常导入，且知识库训练流程可正常完成。同时需确认自身使用的key可正常使用，避免因key问题引发额外的功能异常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1774)
