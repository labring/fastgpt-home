---
title: FastGPT V4.16.1版本升级操作与验证指南
slug: /zh/deploy/upgrade-v4-16-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4161
source_type: 官方文档
---

# FastGPT V4.16.1版本升级操作与验证指南

## 这个版本改了什么
新增内容包括第三方发布渠道支持多模态文件、音频转录与引用，支持团队安装系统插件（进程模式，存在一定安全风险，未来版本支持serverless隔离运行），沙盒支持自定义apt源。优化内容包含S3 key命名取消原文件名以防止超长，MCP/HTTP json schema采用String类型存储以避免与mongo规则冲突。修复内容包括工作流全局变量配置字段名太长溢出、AgentV2调用子工作流时工作流内流输出内容未禁用、团队邀请链接可重复接收同一个团队邀请、使用记录日期选择器多显示一天、知识库未配置图片模型时客户端错误回退展示的问题。代码优化包括补全所有devapi接口文档、插件系统并发初始化及日志优化、修复插件运行错误抛出为系统错误的问题、修复插件在Node.js版本高于v25时因--allow-net策略未设置导致的问题。

## 升级前要确认的事
若启用Agent Sandbox，需在fastgpt-app和fastgpt-pro中同步检查配置。4.16.1使用完整运行态镜像地址，普通非root镜像配置为：
```dotenv
AGENT_SANDBOX_OPENSANDBOX_IMAGE=registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.3.1
```
若沙盒需安装apt依赖，需切换为root镜像，配置为：
```dotenv
AGENT_SANDBOX_OPENSANDBOX_IMAGE=registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-root:v0.3.1
AGENT_SANDBOX_APT_MIRROR=https://mirrors.tuna.tsinghua.edu.cn/ubuntu
```
需严格按版本顺序执行迁移：4.16.1会检查4.16.0负责的HTTP工具应用及其历史版本，若数据包含旧数组类型，接口会拒绝执行，避免旧数据被直接转换为字符串，迁移仅处理MCP/HTTP工具应用及其历史版本，不处理普通工作流应用。已在4.16.0版本完成initHttpToolSchema的环境无需重复操作，未完成的需先在4.16.0版本执行该操作，再升级至4.16.1。

## 升级步骤（照做）
1. 更新Agent Sandbox环境变量与运行态镜像，按需求选择非root或root镜像并配置对应参数。2. 更新镜像：fastgpt-app、fastgpt-pro镜像tag为v4.16.1，fastgpt-plugin镜像tag为v1.1.1。3. 执行迁移工具操作：先执行dry-run模式的迁移命令，确认`total.changedDocumentCount`后再执行正式迁移。dry-run命令为：
```bash
curl -X POST 'https://你的域名/api/admin/4161/initToolJsonSchemaStorage' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":true}'
```
正式迁移命令为：
```bash
curl -X POST 'https://你的域名/api/admin/4161/initToolJsonSchemaStorage' \
  -H 'Content-Type: application/json' \
  -H 'rootkey: 你的ROOT_KEY' \
  -d '{"dryRun":false}'
```

## 升级后怎么验证
可通过以下方式验证升级效果：检查fastgpt-app、fastgpt-pro、fastgpt-plugin服务是否正常启动；执行迁移工具的dry-run命令，确认无异常返回；测试第三方发布渠道的多模态文件上传、音频转录功能；测试沙盒安装apt依赖的功能；检查团队系统插件安装功能是否可用；验证工作流全局变量、AgentV2调用子工作流、团队邀请链接、使用记录日期选择器、知识库图片模型回退等修复功能是否正常。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4161)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
