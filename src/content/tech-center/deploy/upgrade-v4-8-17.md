---
title: FastGPT V4.8.17版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-8-17
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817
source_type: 官方文档
---

# FastGPT V4.8.17版本升级操作与变更说明

## 这个版本改了什么
该版本对接口、功能、UI及修复项均有调整。/api/v1/chat/completions 接口返回值调整，对话节点、工具节点等使用模型的节点将不再返回 `tokens` 字段，改为返回 `inputTokens` 和 `outputTokens` 字段，分别表示输入和输出的 Token 数量。完整功能变更与修复包括：简易模式工具调用支持数组类型插件；工作流增加异常离开自动保存功能；LLM模型参数支持关闭max_tokens和temperature；商业版支持后台配置模板市场与自定义工作流变量，用于业务系统鉴权打通；搜索测试接口支持问题优化；工作流中Input Token和Output Token分开记录展示，修复部分请求未记录输出Token计费问题；Markdown大小测试优化，超出20万字符不使用Markdown组件避免崩溃；知识库搜索参数滑动条支持输入模式，可精准控制参数；可用模型展示UI优化；Mongo查询语句增加virtual字段；修复文件返回接口缺少Content-Length头导致非同源文件上传时阿里vision模型无法识别图片的问题、判断器两端字符串隐藏换行符导致判断器失效的问题、变量更新节点手动输入更新内容时非字符串类型数据无法自动转化的问题、豆包模型无法工具调用的问题。

## 升级前要确认的事
需确认当前部署的镜像版本，将fastgpt镜像tag更新为v4.8.17-fix-title，fastgpt-pro商业版镜像tag更新为v4.8.17，Sandbox镜像无需更新。需提前获取环境变量中的rootkey，以及FastGPT的域名信息。

## 升级步骤（照做）
从任意终端发起以下HTTP POST请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv4817' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```
该请求会将用户绑定的OpenAI账号移动到团队中。

## 升级后怎么验证
可通过以下方式验证升级效果：调用/api/v1/chat/completions接口，确认返回结果中仅包含inputTokens和outputTokens字段，无tokens字段；测试工作流异常退出后，是否自动保存编辑内容；测试变量更新节点手动输入非字符串类型数据，确认可自动转化；测试豆包模型的工具调用功能，确认可正常使用；检查用户绑定的OpenAI账号是否已移动至团队中。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/4817)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
