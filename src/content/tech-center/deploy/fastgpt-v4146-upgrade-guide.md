---
title: FastGPT V4.14.6版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v4146-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146
source_type: 官方文档
---

# FastGPT V4.14.6版本升级步骤与更新内容说明

## 版本更新概览
FastGPT V4.14.6版本包含多项新增功能、优化项与修复内容。新增内容包括：系统工具可配置自定义分类属性；订阅套餐支持配置最大文件上传数量和大小；插件市场支持批量更新插件；云服务支持企微特定版接入；新增Seekdb向量库预设配置。
功能优化方面：工作流触摸板移动时，遇到输入框后会被强制阻拦；工作流粘贴节点可精确按鼠标位置粘贴；精确移除请求LLM时多余的系统字段，避免部分模型接口报错；代码层面使用useRequest2替代useRequest，减少无用代码。
修复项包括：系统工具集设置系统密钥后，子工具无法读取配置的系统密钥；修复日期选择器溢出问题，增加动态位置适配；修复工作流编排页面系统工具“探索更多”跳转地址错误；修复模型头像缺省值`/imgs/model/huggingface.svg`路径错误；设置工具标签时过滤多余的空值。此外还新增飞书多维表格引导教程文档、企微相关插件（获取企微企业 access_token、企微智能表工具集），新增qwen-flash模型，调整qwen3-max和qwen-plus的预设参数。

## 升级操作步骤
1.  **更新镜像**：将FastGPT镜像tag更新为`v4.14.6.1`，商业版镜像tag更新为`v4.14.6`，fastgpt-plugin镜像tag更新为`v0.5.2`；sandbox、AIProxy、mongo无需更新。
2.  **更新系统插件**：前往插件市场更新以下系统工具，若已完成V4.14.6版本升级可跳过此步骤：base64Decode（base64解码转化）、dallle3（dall-e 3图片生成）、docDiff（文档差异对比）、drawing（BI图表）、gptImage（gpt图片生成）、markdownTransform（markdown转换文件）、mineru（Mineru）、pdf解析、minimax（minimax对话）、openrouterMultiModal（openrouter多模态）、stability（stability图片生成）。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146)
