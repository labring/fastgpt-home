---
title: 本文详细介绍common模块下的folderMoveDepthLimit错误码的具体信息
slug: /zh/troubleshoot/fastgpt-common-folder-move-depth-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts
source_type: 官方文档
---

# 本文详细介绍common模块下的folderMoveDepthLimit错误码的具体信息

## 这个错误是什么
该错误属于FastGPT common模块的错误枚举，枚举名为folderMoveDepthLimit，对应错误码为507007（起始码507000，索引为7）。错误返回的statusText字段值为folderMoveDepthLimit，展示文案由common:error.folderMoveDepthLimit国际化键定义，该文案会根据系统配置的语言自动转换为对应语种的提示内容。

## 什么情况下会触发
该错误触发于文件夹移动相关的深度限制场景，当执行文件夹移动操作时，若移动后的文件夹层级超出系统预设的限制规则，接口会返回该错误。当接口返回的statusText字段为folderMoveDepthLimit时，可确认触发该错误。

## 怎么定位（可照做的步骤）
1. 首先获取接口返回的完整错误信息，包括statusText、错误码和message字段；
2. 检查statusText字段是否为folderMoveDepthLimit，这是该错误的直接标识；
3. 核对错误码数值，该错误属于common模块，错误码范围为507000至507007，该错误的具体码值为507007；
4. 确认message字段的文案内容匹配common:error.folderMoveDepthLimit对应的翻译结果，确保没有混淆其他类似错误。

## 处理与验证
处理步骤：首先梳理待移动文件夹的当前层级与目标路径的层级关系，调整文件夹的结构或目标路径，使其符合系统允许的深度限制，随后重新执行文件夹移动操作。
验证步骤：重新执行操作后，检查接口返回的错误信息中是否不再包含folderMoveDepthLimit相关内容，同时确认文件夹已成功移动至目标路径，无其他异常报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/blob/main/packages/global/common/error/code/common.ts)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
