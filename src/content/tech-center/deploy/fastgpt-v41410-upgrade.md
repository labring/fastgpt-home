---
title: FastGPT V4.14.10版本升级配置与变更说明
slug: /zh/deploy/fastgpt-v41410-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410
source_type: 官方文档
---

# FastGPT V4.14.10版本升级配置与变更说明

## 版本核心变更概述
本次FastGPT V4.14.10升级主要包含agent-sandbox相关配置新增、沙盒服务镜像重命名、镜像标签更新、系统工具头像刷新，以及多项环境变量调整等核心变更，同时新增多项功能并修复了已知问题。

## 可执行升级步骤
本次步骤针对Docker Compose部署方案，使用Sealos商业版的用户可联系支持人员获取在线沙盒服务方案。
1. 调整Docker Compose配置文件：在文件顶部添加`x-volume-manager-auth-token: vmtoken`；新增`opensandbox-server`、`opensandbox-agent-sandbox-image`、`opensandbox-execd-image`、`opensandbox-egress-image`、`fastgpt-volume-manager`五个服务；参考最新部署文件调整networks配置，并在文件底部添加`configs`配置内容。
2. 为`fastgpt-app`/`fastgpt-pro`添加Agent sandbox环境变量：包括`AGENT_SANDBOX_PROVIDER: opensandbox`、`AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://opensandbox-server:8090`、`AGENT_SANDBOX_OPENSANDBOX_API_KEY`、`AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker`、`AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox`、`AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG: v0.1`、`AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY: true`，以及Volume持久化相关变量`AGENT_SANDBOX_ENABLE_VOLUME: true`、`AGENT_SANDBOX_VOLUME_MANAGER_URL: http://volume-manager:3000`、`AGENT_SANDBOX_VOLUME_MANAGER_TOKEN: *x-volume-manager-auth-token`。
3. 将原sandbox服务镜像名从`fastgpt-sandbox`修改为`fastgpt-code-sandbox`。
4. 更新各服务镜像标签：`fastgpt-app`为`v4.14.10.4`，`fastgpt-pro`为`v4.14.10`，`code-sandbox`为`v4.14.10`，`fastgpt-plugin`为`v0.5.6`。
5. 重新导入或卸载重装系统工具，以刷新头像配置。

## 新增、优化与修复内容
### 新增功能
新增OpenSandbox Docker部署方案及数据持久化支持，新增沙盒文件读取链接工具，新增微信个人号、飞书发布渠道并支持流输出，新增目录上限、rerank模型上限的环境变量配置，新增LLM梯度计量计费模式并统一计费推送方式。
### 功能优化
优化工作流runtime以降低计算复杂度，新增大变量计算限制避免线程阻塞，移除模型配置中“用于知识库文件处理”“用于问题分类”等配置，统一新增“测试模型”标识，仅可在AI聊天场景使用。
### 问题修复
修复子工作流全局变量默认值未生效、agent模式下rerank模型不显示、bge-m3 embedding向量模型输出全为0、MCP并发调用连接异常、登录接口安全、MCP SSRF安全、工作流工具错误未捕获等问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410)
