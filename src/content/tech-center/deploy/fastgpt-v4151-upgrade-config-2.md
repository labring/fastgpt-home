---
title: FastGPT V4.15.1版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-v4151-upgrade-config-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151
source_type: 官方文档
---

# FastGPT V4.15.1版本升级操作与配置变更说明

### 版本变更概览
FastGPT V4.15.1 包含多项核心配置变更、镜像更新与功能优化。其中最关键的变更为内部接口访问凭证替换，原rootkey不再用于主应用访问Pro/Admin服务，改为使用独立的PRO_TOKEN；同时企微登录的自动跳转行为默认关闭，新增API密钥的应用名管理功能。社区版部署可跳过Pro相关的环境变量配置，Pro版本需严格遵循配置规则，否则可能导致服务启动或接口鉴权失败。

### 升级操作步骤
1.  **环境变量配置**
    -  Pro版本需在FastGPT主应用和Pro/Admin服务中同时配置以下参数：`PRO_TOKEN=your_pro_token_at_least_32_chars`，`FE_DOMAIN=fastgpt_domain`。PRO_TOKEN长度必须不少于32位，若主应用配置了`PRO_URL`，则必须同时配置PRO_TOKEN，否则服务会启动失败。
    -  若需要保留旧版企微终端自动跳转登录的行为，需在FastGPT主应用的环境变量中添加`WECOM_LOGIN_AUTO_REDIRECT=true`；默认情况下该行为处于关闭状态，无需额外配置。修改环境变量后需重启主应用使配置生效。
2.  **镜像更新**：将`fastgpt-app`（FastGPT主服务）、`fastgpt-pro`（商业版服务）的镜像tag更新为`v4.15.1`，`fastgpt-plugin`的镜像tag更新为`v1.0.1`。
3.  **API密钥初始化**：为兼容旧版API密钥并回填历史应用的appName，需在任意终端执行以下HTTP请求。将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为FastGPT的域名：
    ```bash
    curl -X POST {{host}}/api/admin/initv4151 \
    -H rootkey: {{rootkey}}
    ```
    该脚本仅会回填缺失的appName，不会覆盖已有值、修改appId，也不会创建或绑定标签，且支持重复执行。

### 功能调整与注意事项
本次更新新增全局API Key标签管理功能，为历史应用级API Key添加appName展示快照，便于兼容旧版密钥并快速关联应用。同时发布技能时会预提取技能名称和描述，插件市场支持官方/社区来源筛选，系统工具列表的状态列和标签列也支持筛选。优化内容包括AgentV2调用嵌套工作流时去除系统字段参数，系统工具支持卸载与重新安装。修复了工作流调试运行详情不可见、登录弹窗未自动弹出、变量同步异常等多个场景的问题。需要注意，rootkey目前仅作为系统管理员密钥，用于调用`/api/admin/**`接口，如本次的初始化脚本，不再用于主应用访问Pro/Admin的内部接口。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4151)
