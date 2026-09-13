---
title: FastGPT V4.15.0-beta5版本升级操作与内容解读
slug: /zh/deploy/upgrade-v4-15-0-beta5
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505
source_type: 官方文档
---

# FastGPT V4.15.0-beta5版本升级操作与内容解读

## 这个版本改了什么
功能重大变化：ApiKey功能调整，不再区分应用key和系统key，仅保留系统key。兼容OpenAI SDK用法需使用apikey-appId方式传递Token，已有apikey保持兼容。新增内容包括：HTTP节点支持配置忽略TLS证书校验；支持目录深度环境变量；对话框支持快速滚动到底部按键；参考Lobe UI优化流输出动效；支持通过模型生成对话标题，需配置CHAT_TITLE_MODEL变量；调整Skill Edit编辑交互；HTTP节点支持返回完整错误对象；agent模式知识库搜索支持权限过滤；API密钥逻辑优化，统一APIKey管理并由请求显式传入应用上下文；优化agent上下文压缩逻辑；支持快速回复的输出语法。优化项包括：HTML输出后自动切换为预览；应用、知识库等长名称超出宽度自动省略，hover时展示完整内容；移除所有内置LLM请求中的temperature和max_tokens；知识库训练出错时提示并支持一键全部重试；过滤无效的知识库引用角标；工具运行空响应时自动补充"none"；系统工具运行前二次权限校验；优化重定向后SSRF校验。修复问题包括：S3私有对象key未绑定已鉴权资源时的跨资源访问风险；工作流工具array和object类型的参数schema异常；发布渠道门户的UI偏移。代码优化：增加系统处理字符串时的长度保护，长度过大会停止同步替换，可通过SYSTEM_MAX_STRING_LENGTH_M调整上限。

## 升级前要确认的事
确认是否启用Agent Sandbox功能。确认现有环境变量配置，需新增指定环境变量。准备好rootkey用于执行沙盒归档脚本。确认部署使用的镜像源，国内使用阿里云镜像，海外可切换为ghcr.io源。

## 升级步骤（照做）
1. 修改环境变量：为fastgpt和fastgpt-pro新增CHAT_TITLE_MODEL（如deepseek-v4-flash）与INVOKE_TOKEN_SECRET（32位以上密钥）。若启用Agent Sandbox，需额外新增AGENT_SANDBOX_PROXY_SECRET（32位以上随机密钥）与AGENT_SANDBOX_PROXY_URL（ws://{{host}}:3006，通过HTTPS域名代理时使用wss）。
2. 更新镜像与配置：更新fastgpt-app、fastgpt-pro、fastgpt-plugin、aiproxy的镜像tag分别为v4.15.0-beta5、v4.15.0-beta5、v1.0.0-beta5、v0.6.2。启用Agent Sandbox时，新增fastgpt-agent-sandbox-proxy:v0.2.0-beta2与fastgpt-agent-sandbox:v0.2.0-beta2镜像，并在docker-compose.yml中新增对应服务，配置PORT、AGENT_SANDBOX_PROXY_SECRET、FASTGPT_APP_URL等参数。
3. 执行升级脚本：运行curl命令归档旧沙盒workspace到S3，命令为curl --location --request POST 'https://{{host}}/api/admin/initSandboxArchive' --header 'rootkey: {{rootkey}}' --header 'Content-Type: application/json' -d '{"runArchive":true,"inactiveDays":0}'，也可直接移除旧沙盒。

## 升级后怎么验证
检查各服务容器正常运行。测试对话标题自动生成功能，确认配置CHAT_TITLE_MODEL后生效。测试HTTP节点调用自签名证书服务，确认TLS校验可忽略。测试ApiKey调用，确认apikey-appId方式兼容OpenAI SDK，原有apikey可正常使用。检查知识库搜索、工作流工具、快速回复功能正常运行，查看系统日志无异常报错。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
