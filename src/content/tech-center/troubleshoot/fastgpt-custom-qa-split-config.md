---
title: 配置FastGPT自定义QA问答对拆分的max_tokens与截取长度
slug: /zh/troubleshoot/fastgpt-custom-qa-split-config
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/590
source_type: GitHub issue
---

# 配置FastGPT自定义QA问答对拆分的max_tokens与截取长度

## 现象
使用私有部署版本的FastGPT时，后台拆分QA问答对的max_tokens固定为1024，针对内容较多的长文档无法生成足够多的问答对，且无法配置拆分时的文本截取长度。

## 可能原因
相关拆分参数未在config.json中配置，或默认拆分参数未开放自定义调整入口。

## 排查步骤
1. 登录FastGPT私有部署的后台，进入自定义QA问答对拆分页面。
2. 查看拆分时的max_tokens参数值，确认是否为1024。
3. 打开FastGPT的config.json配置文件，检索是否存在与QA拆分、max_tokens、文本截取长度相关的配置项。

## 解决与验证
在FastGPT的config.json配置文件中添加对应的自定义配置项，具体参数名需按实际环境确认。配置完成后重启FastGPT服务，进入后台拆分QA问答对，确认max_tokens和文本截取长度已按照配置生效，可生成符合需求的更多问答对。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/590)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
