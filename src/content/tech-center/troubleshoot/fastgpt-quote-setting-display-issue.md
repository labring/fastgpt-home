---
title: 解决FastGPT关闭引用设置后免登录窗口显示知识库引用资料的问题
slug: /zh/troubleshoot/fastgpt-quote-setting-display-issue
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/4539
source_type: GitHub issue
---

# 解决FastGPT关闭引用设置后免登录窗口显示知识库引用资料的问题

## 现象
在FastGPT V4.9.4私有部署版本中，用户完成知识库引用设置的关闭操作后，免登录窗口仍然展示知识库的引用资料，与预期的关闭效果不符。

## 可能原因
当前无明确已知的关联配置项、参数或版本已知异常，具体触发原因需结合实际部署环境的配置状态排查确认。

## 排查步骤
1.  确认已在对应配置页面完成引用设置的关闭操作，并检查配置是否成功保存。
2.  核对当前使用的FastGPT版本为V4.9.4私有部署版。
3.  核对免登录窗口的相关配置，需按实际环境确认关联参数的设置状态。

## 解决与验证
需根据排查结果调整对应配置或参数。验证操作需重新打开免登录窗口，确认知识库的引用资料不再展示。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/4539)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
