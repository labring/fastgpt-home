---
title: FastGPT V4.15.1版本升级与环境变量配置说明
slug: /zh/deploy/fastgpt-v4151-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151
source_type: 官方文档
---

# FastGPT V4.15.1版本升级与环境变量配置说明

## 核心变更说明
V4.15.1版本主要包含环境变量调整与镜像更新两类核心变更。商业版部署需配置PRO_TOKEN与FE_DOMAIN环境变量：PRO_TOKEN长度需不少于32位，且FastGPT主应用与Pro/Admin服务的取值必须保持一致；若主应用配置了PRO_URL，则必须同时配置PRO_TOKEN，否则服务会启动失败。rootkey仅作为系统管理员密钥，用于调用`/api/admin/**`接口，不再作为主应用访问Pro/Admin内部接口的凭证。社区版部署可跳过该类环境变量配置。此外，WECOM_LOGIN_AUTO_REDIRECT环境变量默认关闭，旧版本企微终端自动跳转登录的行为需手动配置该变量为`true`才能恢复。镜像方面，fastgpt-app、fastgpt-pro需更新至`v4.15.1`版本，fastgpt-plugin需更新至`v1.0.1`版本。

## 升级操作步骤
1. 配置环境变量：在FastGPT主应用和Pro/Admin服务中添加`PRO_TOKEN`变量，取值为不少于32位的自定义字符串；同时在主应用中配置`FE_DOMAIN`变量，值为FastGPT的访问域名。若需要保留旧版企微终端自动跳转登录的行为，需在主应用环境变量中添加`WECOM_LOGIN_AUTO_REDIRECT=true`。
2. 更新镜像：将fastgpt-app、fastgpt-pro的镜像tag替换为`v4.15.1`，fastgpt-plugin的镜像tag替换为`v1.0.1`。
3. 执行API Key初始化脚本：为兼容旧版API密钥，需执行初始化脚本回填历史应用级API Key的appName。通过任意终端发起POST请求，命令为`curl -X POST {{host}}/api/admin/initv4151 -H "rootkey: {{rootkey}}"`，其中`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的访问域名。该脚本仅回填缺失的appName，不会覆盖已有值，可重复执行。

## 新增与优化修复内容
本版本新增全局API Key标签管理，为历史应用级API Key添加appName展示快照，便于兼容旧版密钥与关联应用查找；发布技能时预提取技能名称与描述，辅助内容生成；新增WECOM_LOGIN_AUTO_REDIRECT环境变量控制企微登录跳转行为；插件市场支持官方/社区来源筛选，系统工具列表的状态列与标签列支持筛选。优化内容包括AgentV2调用嵌套工作流时去除系统字段参数，系统工具支持卸载与重新安装（卸载后工具状态改为“已卸载”，需输入工具名称确认，已卸载工具仅展示基础信息并可重新安装恢复）。修复内容包括工作流工具调试时运行详情不可见、对话页凭证到期未自动弹出登录组件、工作流子流程变量初始化异常、循环与并行节点修改全局变量未同步更新、重试知识库集合未立即刷新、插件市场重复更新浅路由导致顶部进度条持续加载等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151)
