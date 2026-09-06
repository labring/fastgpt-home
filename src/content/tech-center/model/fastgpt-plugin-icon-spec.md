---
title: 配置FastGPT插件图标以符合CLI构建与manifest.json写入要求
slug: /zh/model/fastgpt-plugin-icon-spec
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development
source_type: 官方文档
---

# 配置FastGPT插件图标以符合CLI构建与manifest.json写入要求

CLI构建插件时，会扫描插件根目录中的图标文件，并将相关信息写入构建后的`manifest.json`文件中。

## 图标文件命名规则
| 场景             | 文件名                                                                     |
| ---------------- | -------------------------------------------------------------------------- |
| 主插件图标       | `logo.svg`、`logo.png`、`logo.jpg`、`logo.jpeg`、`logo.webp` 或 `logo.gif` |
| 工具集子工具图标 | `<childId>.logo.svg`、`<childId>.logo.png` 等                              |

## 图标配置注意事项
图标配置需遵循以下规范。图标文件需放置在插件根目录。子工具图标的`<childId>`需与`children[].id`完全一致。同一个图标仅保留一个扩展名，避免扫描结果不明确。子工具无独立图标时，默认复用主插件图标。构建完成后需检查`dist/manifest.json`中的`icon`字段。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/system-tool-development)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
