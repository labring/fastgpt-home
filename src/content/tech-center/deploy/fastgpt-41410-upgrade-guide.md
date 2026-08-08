---
title: FastGPT V4.14.10版本升级操作与配置变更说明
slug: /zh/deploy/fastgpt-41410-upgrade-guide
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410
source_type: 官方文档
---

# FastGPT V4.14.10版本升级操作与配置变更说明

## 版本变更概述
本版本为FastGPT V4.14.10，核心变更包含环境变量调整、新增agent-sandbox相关配置、sandbox镜像命名修改，以及系统工具头像刷新等内容。使用Sealos商业版的用户可联系支持人员获取专属沙盒服务方案，无需自行完成本地配置。

## 升级操作步骤
针对Docker Compose部署方案，需按以下步骤调整：
1.  修改部署文件：在文件顶部添加`x-volume-manager-auth-token: vmtoken`，新增`opensandbox-server`、`opensandbox-agent-sandbox-image`、`opensandbox-execd-image`、`opensandbox-egress-image`、`fastgpt-volume-manager`五个服务，调整networks配置可参考官方最新yml文件，同时在文件底部添加configs配置。
2.  配置环境变量：在`fastgpt-app`/`fastgpt-pro`的环境变量中添加以下内容：
```yaml
# ==================== Agent sandbox 配置 ====================
AGENT_SANDBOX_PROVIDER: opensandbox
AGENT_SANDBOX_OPENSANDBOX_BASEURL: http://opensandbox-server:8090
AGENT_SANDBOX_OPENSANDBOX_API_KEY:
AGENT_SANDBOX_OPENSANDBOX_RUNTIME: docker
AGENT_SANDBOX_OPENSANDBOX_IMAGE_REPO: registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox
AGENT_SANDBOX_OPENSANDBOX_IMAGE_TAG: v0.1
AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY: true
AGENT_SANDBOX_ENABLE_VOLUME: true
AGENT_SANDBOX_VOLUME_MANAGER_URL: http://volume-manager:3000
AGENT_SANDBOX_VOLUME_MANAGER_TOKEN: *x-volume-manager-auth-token
```
3.  修改镜像命名：将原sandbox服务的镜像名从`fastgpt-sandbox`改为`fastgpt-code-sandbox`。
4.  更新镜像tag：`fastgpt-app`使用`v4.14.10.4`，`fastgpt-pro`使用`v4.14.10`，`code-sandbox`使用`v4.14.10`，`fastgpt-plugin`使用`v0.5.6`。
5.  刷新系统工具头像：通过卸载再安装或导入pkg覆盖的方式，重新更新系统工具。

## 新增优化与注意事项
本版本新增OpenSandbox Docker部署方案与volume数据持久化支持，新增沙盒文件读取链接工具、微信个人号及飞书发布渠道，支持流输出，同时新增目录与rerank模型上限配置，以及LLM梯度计量计费模式。优化内容包括简化工作流runtime计算、限制大变量计算避免线程阻塞，统一模型配置为“测试模型”标志，仅可在AI聊天场景使用。修复了子工作流全局变量默认值失效、rerank模型不显示、bge-m3向量模型输出为0、MCP并发调用异常、登录与SSRF安全漏洞等问题。需注意：旧版sandbox镜像名需替换，环境变量配置需严格匹配要求，避免出现服务启动异常。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/41410
