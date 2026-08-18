---
title: FastGPT V4.14.9版本升级配置与变更说明
slug: /zh/deploy/fastgpt-v4149-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149
source_type: 官方文档
---

# FastGPT V4.14.9版本升级配置与变更说明

### 版本核心变更
本次FastGPT V4.14.9版本核心变更包含环境变量重命名、镜像版本更新与接口调整。环境变量方面，原`SANDBOX_URL`和`SANDBOX_TOKEN`分别重命名为`CODE_SANDBOX_URL`和`CODE_SANDBOX_TOKEN`，默认关闭内网安全检查，如需开启需设置通用环境变量`CHECK_INTERNAL_IP=true`，该变量适用于fastgpt、fastgpt-pro、fastgpt-sandbox。镜像版本方面，FastGPT官方镜像、商业版镜像的tag均为`v4.14.9.5`，fastgpt-plugin镜像tag为`v0.5.5`，sandbox镜像tag为`v4.14.9.1`，mcp_server与AIProxy无需更新。

### 升级操作步骤
1.  **修改环境变量**：将原有部署配置中的`SANDBOX_URL`和`SANDBOX_TOKEN`替换为`CODE_SANDBOX_URL`和`CODE_SANDBOX_TOKEN`，示例配置（以Docker Compose为例）如下：
```yaml
environment:
  CODE_SANDBOX_URL: "你的代码运行沙盒地址"
  CODE_SANDBOX_TOKEN: "你的沙盒访问凭证"
  # 如需开启内网安全检查，添加以下变量
  CHECK_INTERNAL_IP: "true"
```
2.  **更新镜像并重启服务**：将部署配置中的对应镜像tag替换为上述指定版本，完成后重启所有相关服务即可完成升级。

### 接口与功能调整
接口层面，`/api/core/chat/getPaginationRecords`接口新增`useAgentSandbox:boolean`返回字段，用于标识本轮对话是否使用虚拟机工具，同时该接口即将移除`llmModuleAccount`和`historyPreviewLength`字段，使用相关字段的项目需尽快适配。功能方面，本次版本新增AI虚拟机功能（目前仅云服务开放使用，下个版本将推出轻量部署方案）、微信个人号发布渠道支持；优化了API知识库同步的文件名获取方式、HTTP工具的SSRF防御能力，兼容更多MCP JsonSchema字段，调整工作流运行逻辑以解决复杂循环运行问题；修复了工作流嵌套插件详情丢失、模型参数切换异常、分享链接关闭后历史内容无法展示等多个问题。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-14/4149)
