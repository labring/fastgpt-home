---
title: FastGPT V4.14.6版本升级操作与功能说明
slug: /zh/deploy/upgrade-v4-14-6
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146
source_type: 官方文档
---

# FastGPT V4.14.6版本升级操作与功能说明

## 这个版本改了什么
本次更新包含新增功能、体验优化、问题修复与插件更新。新增功能包括系统工具可配置自定义分类属性，订阅套餐支持配置最大文件上传数量和大小，插件市场支持批量更新插件，云服务支持企微特定版接入，Seekdb向量库预设配置。功能优化包括工作流触摸板移动时，遇到输入框会被强制阻拦；工作流粘贴节点可精确按鼠标位置粘贴；精确移除请求LLM时多余的系统字段，避免部分模型接口报错。代码质量优化为使用useRequest2替代useRequest，减少无用代码。问题修复包括系统工具工具集设置系统密钥后，子工具无法读取到设置的系统密钥；修复日期选择器溢出问题，增加动态位置适配；修复工作流编排页面系统工具"探索更多"跳转地址错误；修复模型头像缺省值/imgs/model/huggingface.svg路径错误；修复设置工具标签时过滤多余的空值。插件更新包括添加飞书多维表格的引导教程文档，新增企微相关插件：获取企微企业access_token、企微智能表工具集，新增模型qwen-flash，调整qwen3-max和qwen-plus的预设参数。
## 升级前要确认的事
升级前需明确无需更新的组件：mcp_server、sandbox、AIProxy、mongo无需执行更新操作。若此前已完成4.14.6版本的升级流程，可跳过系统插件的更新步骤。
## 升级步骤（照做）
1. 更新镜像：将FastGPT镜像tag更新为v4.14.6.1，FastGPT商业版镜像tag更新为v4.14.6，fastgpt-plugin镜像tag更新为v0.5.2；mcp_server、sandbox、AIProxy、mongo无需更新。
2. 更新系统插件：前往插件市场更新以下工具：base64Decode（base64解码转化）、dallle3（dall-e 3图片生成）、docDiff（文档差异对比）、drawing（BI图表）、gptImage（gpt图片生成）、markdownTransform（Markdown转换文件）、mineru（Mineru PDF解析）、minimax（minimax对话）、openrouterMultiModal（openrouter多模态）、stability（stability图片生成）；若已完成4.14.6升级可跳过此步骤。
## 升级后怎么验证
可通过以下方式验证升级效果：检查各镜像版本是否与更新要求一致；确认插件市场支持批量更新插件功能；测试工作流的触摸板移动、节点粘贴功能是否正常；确认模型头像路径正确显示；测试系统工具密钥配置后子工具能否正常读取；检查日期选择器显示是否正常；验证企微相关插件、qwen-flash模型是否可正常加载使用；确认订阅套餐的文件上传数量和大小配置可正常生效。
> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4146)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
