---
title: 解决FastGPT私有部署版本问题扩展返回非JSON报错问题
slug: /zh/troubleshoot/fastgpt-nonjson-extension-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1474
source_type: GitHub issue
---

# 解决FastGPT私有部署版本问题扩展返回非JSON报错问题

## 现象
FastGPT 私有部署版本4.7.1-fix2，执行问题扩展操作时，系统因返回结果非JSON触发报错，相关报错内容附带有代码截图。

## 可能原因
仅明确触发条件为问题扩展返回结果不符合JSON格式规范，具体根因需结合实际请求与返回内容按实际环境确认。

## 排查步骤
1. 提取问题扩展操作返回的原始结果内容
2. 校验该内容是否符合JSON语法规范
3. 确认当前FastGPT部署版本为4.7.1-fix2私有部署版本

## 解决与验证
将问题扩展环节返回的内容修正为标准JSON格式，重新执行问题扩展操作，即可验证报错是否消除。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1474)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
