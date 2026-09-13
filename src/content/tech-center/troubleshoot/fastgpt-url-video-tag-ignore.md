---
title: 解决FastGPT通过URL新建文本数据集时视频标签被忽略的问题
slug: /zh/troubleshoot/fastgpt-url-video-tag-ignore
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4780
source_type: GitHub issue
---

# 解决FastGPT通过URL新建文本数据集时视频标签被忽略的问题

## 现象
针对FastGPT私有部署版本v4.9.6，通过URL新建文本数据集时，网页内的video标签在转换生成的Markdown文件中会被忽略，无法保留原视频信息。用户期望将video标签转换为[Video](src)格式以保留视频信息。

## 可能原因
未明确的转换逻辑限制，导致采集网页内容时video标签未被正确识别并转换为目标格式。具体原因需结合实际部署的转换组件规则确认。

## 排查步骤
1. 确认待采集的网页中存在video标签，且标签包含有效的src属性。
2. 重新执行通过URL新建文本数据集的流程，记录转换后的Markdown文件内容。
3. 对比原始网页与转换后Markdown文件，确认仅video标签相关内容缺失。

## 解决与验证
目前无公开的配置项或命令可直接解决该问题。如需临时保留视频信息，可手动将video标签转换为[Video](src)格式并补充至转换后的Markdown文件中。完整解决需等待功能更新或自定义调整内容转换逻辑。

> 来源: [FastGPT GitHub issue #4780](https://github.com/labring/FastGPT/issues/4780)
