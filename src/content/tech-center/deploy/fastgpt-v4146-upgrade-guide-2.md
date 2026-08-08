---
title: FastGPT V4.14.6版本升级操作步骤与更新说明
slug: /zh/deploy/fastgpt-v4146-upgrade-guide-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146
source_type: 官方文档
---

# FastGPT V4.14.6版本升级操作步骤与更新说明

本页为FastGPT V4.14.6版本的官方升级指引，适用于已部署该版本前的FastGPT实例，升级过程无需停止核心数据库服务，仅需更新指定镜像与系统插件即可完成。本次版本更新包含新增功能、体验优化与问题修复，可针对性解决部分模型接口报错、插件读取异常等问题。

## 正式升级步骤
1.  更新镜像：将FastGPT镜像tag设置为`v4.14.6.1`，商业版镜像tag设置为`v4.14.6`，`fastgpt-plugin`镜像tag设置为`v0.5.2`；`sandbox`、`AIProxy`、`mongo`无需更新，请勿擅自更新未提及的组件。
2.  更新系统插件：前往插件市场更新以下系统工具，若已完成4.14.6版本的首次升级可跳过该步骤：`base64Decode`（base64解码转化）、`dallle3`（DALL-E 3图片生成）、`docDiff`（文档差异对比）、`drawing`（BI图表）、`gptImage`（GPT图片生成）、`markdownTransform`（markdown转换文件）、`mineru`（Mineru）、`pdf解析`、`minimax`（Minimax对话）、`openrouterMultiModal`（OpenRouter多模态）、`stability`（Stability图片生成）。

## 版本新增与优化内容
### 新增功能
系统工具可配置自定义分类属性；订阅套餐支持配置最大文件上传数量和大小；插件市场支持批量更新插件；云服务支持企微特定版接入；新增Seekdb向量库预设配置。
### 功能优化
工作流触摸板移动时，遇到输入框后会被强制阻拦，避免误操作；工作流粘贴节点可精确按鼠标位置粘贴，提升编排效率；移除请求LLM时多余的系统字段，避免部分模型接口报错；代码层面使用`useRequest2`替代`useRequest`，减少无用代码，提升运行稳定性。
### 问题修复
修复系统工具集设置系统密钥后子工具无法读取密钥的问题；修复日期选择器溢出问题，新增动态位置适配；修复工作流编排页面系统工具“探索更多”跳转地址错误的问题；修复模型头像缺省值`/imgs/model/huggingface.svg`路径错误的问题；过滤设置工具标签时的多余空值；新增飞书多维表格引导教程、企微相关插件（获取企微企业access_token、企微智能表工具集）；新增模型`qwen-flash`，调整`qwen3-max`和`qwen-plus`的预设参数。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146
