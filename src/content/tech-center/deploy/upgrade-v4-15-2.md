---
title: FastGPT V4.15.2版本升级操作步骤与功能变化说明
slug: /zh/deploy/upgrade-v4-15-2
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152
source_type: 官方文档
---

# FastGPT V4.15.2版本升级操作步骤与功能变化说明

## 这个版本改了什么
新增功能包括工作流节点实时错误提示、自定义工具参数节点支持手动输入JSONSchema与必填选项、文件上传下载改用短链接、无后缀文件自动推测后缀、企业认证能力、门户页支持AgentV2应用对话。优化内容包含Skill删除弹窗文案、适配微信SDK、插件下线改卸载、判断器节点改用唯一ID、系统工具文件长期有效、同步模式隐藏注册按钮、对话框流输出性能优化、LiteParse版本升级与解析worker数调整、前端请求并发去重、工作流SSE返回nodeResponse。修复内容包含CI流程加固、PPTX解析安全升级、自定义分块标识符校验、企微付款license逻辑优化、插件市场空标签问题、循环与并行节点耗时计算修复、Agent Loop边界优化、上传文件删除同步中止请求、文件持久化问题修复。代码优化包含Agent V2重构、超长请求记录截断、SSE事件封装、移除next依赖、新增AUTH_COOKIE_SECURE环境变量，以及Agent Loop重构统一执行内核与协议。

## 升级前要确认的事
若启用OpenSandbox，需将对应镜像更新至`opensandbox/server:v0.2.1`、`opensandbox/execd:v1.0.21`、`opensandbox/egress:v1.1.4`。需检查AGENT_ENGINE环境变量，旧值default需改为fastAgent，旧值pi需改为piAgent，旧值不再兼容，继续使用会导致环境变量校验失败，无法启动FastGPT。未配置该变量则不受影响。若需使用short-redirect模式，需提前配置STORAGE_EXTERNAL_ENDPOINT环境变量。

## 升级步骤（照做）
1. 更新镜像：`fastgpt-app:v4.15.2`、`fastgpt-pro:v4.15.2`、`fastgpt-plugin:v1.0.2`。若启用OpenSandbox，同步更新指定镜像。
2. 调整AGENT_ENGINE环境变量，按旧值替换为对应新值。
3. 新增STORAGE_DOWNLOAD_URL_MODE环境变量，默认值为`short-proxy`，按需配置为`short-redirect`并确保已配置STORAGE_EXTERNAL_ENDPOINT。

## 升级后怎么验证
检查FastGPT服务正常启动，无环境变量校验失败报错。测试OpenSandbox功能，确认中文文件名文件可正常下载。测试文件上传下载，确认使用短链接且无异常。测试工作流节点，确认实时错误提示正常，判断器节点排序删除后分支保持稳定。测试自定义工具参数节点，确认可手动输入JSONSchema并配置必填选项。检查企业认证、门户页AgentV2应用对话功能正常启用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4152)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
