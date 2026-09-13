---
title: 获取语雀Token和User ID用于FastGPT第三方数据集对接
slug: /zh/integration/yuque-token-userid-fastgpt
page_type: 集成
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset
source_type: 官方文档
---

# 获取语雀Token和User ID用于FastGPT第三方数据集对接

FastGPT支持对接语雀作为第三方数据集来源，用于导入知识库内容。在对接前，需先获取语雀的Token与User ID作为必要参数。操作入口固定为语雀首页的个人头像菜单，进入设置页面即可找到对应参数。

个人版用户需按以下三个环节完成参数获取与权限配置：
| 操作环节 | 步骤指引 |
| --- | --- |
| 获取 Token | ![获取语雀Token](/imgs/image-33.png) |
| 配置 Token 权限 | ![添加必要权限](/imgs/image-34.png) |
| 获取 User ID | ![获取语雀User ID](/imgs/image-35.png) |
需在获取Token后完成权限配置，否则参数无法满足FastGPT的数据集对接要求。

企业版用户的参数获取流程分为两个环节，无需额外配置Token权限：
| 操作环节 | 步骤指引 |
| --- | --- |
| 获取 Token | ![获取企业版Token](/imgs/image-109.png) |
| 获取 User ID | ![获取企业版User ID](/imgs/image-108.png) |
直接按指引完成操作即可获取所需参数。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/yuque_dataset)

## 适用性与版本范围

本页适用于官方来源记录的 集成 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
