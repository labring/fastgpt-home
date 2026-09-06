---
title: FastGPT 4.15.1版本升级操作与变更说明
slug: /zh/deploy/upgrade-v4-15-1
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151
source_type: 官方文档
---

# FastGPT 4.15.1版本升级操作与变更说明

## 这个版本改了什么
本次V4.15.1版本新增全局API Key标签管理，为历史应用级API Key增加appName展示快照；发布技能时预提取名称和描述辅助生成；新增WECOM_LOGIN_AUTO_REDIRECT环境变量，可控制企微终端是否自动跳转登录，默认关闭；插件市场支持官方/社区来源筛选，系统工具列表的状态列和标签列支持筛选。优化AgentV2调用嵌套工作流时的系统字段参数处理，支持系统工具卸载与重新安装。修复工作流工具调试运行详情不可见、对话页凭证到期未自动弹出登录组件、工作流子工作流变量初始化异常、循环与并行节点全局变量更新不同步、重试知识库集合未即时刷新组件、插件市场浅路由重复更新导致进度条持续加载等问题，同时修复冒号文件路径兼容Windows系统的问题。

## 升级前要确认的事
社区版可跳过fastgpt-pro相关配置。rootkey仅用于调用/api/admin/**接口，不再作为FastGPT主应用访问Pro/Admin内部接口的凭证。商业版需配置PRO_TOKEN（长度不少于32位，主应用与Pro/Admin服务需保持一致）与必填项FE_DOMAIN；若配置PRO_URL，则必须同时配置PRO_TOKEN，否则服务启动失败。旧版企微终端自动跳转登录行为默认关闭，如需保留旧行为，需添加WECOM_LOGIN_AUTO_REDIRECT=true环境变量。需将对应服务镜像更新至指定tag：fastgpt-app:v4.15.1、fastgpt-pro:v4.15.1、fastgpt-plugin:v1.0.1。

## 升级步骤（照做）
1.  调整环境变量：商业版主应用与Pro/Admin服务添加PRO_TOKEN（≥32位）与FE_DOMAIN；如需保留旧企微登录跳转行为，添加WECOM_LOGIN_AUTO_REDIRECT=true。
2.  将fastgpt-app、fastgpt-pro、fastgpt-plugin镜像分别更新至v4.15.1、v4.15.1、v1.0.1。
3.  执行初始化脚本：
```bash
curl -X POST "{{host}}/api/admin/initv4151" \
  -H "rootkey: {{rootkey}}"
```
4.  重启所有FastGPT相关服务使配置生效。

## 升级后怎么验证
检查服务启动日志，无PRO_TOKEN或PRO_URL与TOKEN不匹配相关的启动失败报错。访问FastGPT主应用与Pro/Admin服务，确认内部接口调用正常。进入API Key管理页面，确认历史API Key已正确回填appName。测试企微终端登录，确认自动跳转行为符合配置要求。测试插件市场筛选、系统工具卸载与重装、工作流调试等功能，确认修复的问题不再出现。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
