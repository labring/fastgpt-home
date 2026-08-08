---
title: FastGPT V4.15.0-beta5版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v4-15-beta5-upgrade-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505
source_type: 官方文档
---

# FastGPT V4.15.0-beta5版本升级步骤与配置变更说明

V4.15.0-beta5版本存在多项核心调整，包括环境变量变更、镜像更新及功能逻辑优化。其中API密钥功能调整为不再区分应用key与系统key，仅保留系统key；若需兼容OpenAI SDK使用方式，可通过apikey-appId的方式传递Token，现有已生成的apikey仍保持兼容，不影响正常使用。

## 升级操作步骤
1.  **修改环境变量**：为fastgpt和fastgpt-pro新增`CHAT_TITLE_MODEL`（用于自动生成对话标题，示例值：`deepseek-v4-flash`）与`INVOKE_TOKEN_SECRET`（32位以上密钥，作为反向调用接口的JWT密钥）。若启用Agent Sandbox，还需为fastgpt新增两个环境变量：`AGENT_SANDBOX_PROXY_SECRET`（需与fastgpt-agent-sandbox-proxy的密钥完全一致，生产环境使用32位以上随机密钥）、`AGENT_SANDBOX_PROXY_URL`（浏览器可访问的agent-sandbox-proxy WebSocket地址，若通过HTTPS代理需使用`wss://`协议，示例：`ws://{{host}}:3006`）。
2.  **更新镜像与配置**：将fastgpt-app（主服务）、fastgpt-pro的镜像tag更新为`v4.15.0-beta5`，fastgpt-plugin更新为`v1.0.0-beta5`，aiproxy更新为`v0.6.2`。若启用Agent Sandbox，需新增`fastgpt-agent-sandbox-proxy`服务，国内镜像源为`registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox-proxy:v0.2.0-beta2`，海外部署可替换为`ghcr.io/labring/fastgpt-agent-sandbox-proxy:v0.2.0-beta2`，并在docker-compose.yml中配置对应服务的端口、环境变量等参数。
3.  **运行升级脚本**：执行以下命令归档旧沙盒工作区至S3以释放不活跃沙盒（若不执行脚本，直接移除旧沙盒也可，且脚本仅影响旧沙盒，不影响新生成沙盒）：
    ```bash
    curl --location --request POST https://{{host}}/api/admin/initSandboxArchive \
    --header rootkey: {{rootkey}} \
    --header Content-Type: application/json \
    -d '{"runArchive":true, "inactiveDays":0}'
    ```

该版本新增多项功能与修复，包括HTTP节点支持配置忽略TLS证书校验（适用于调用自签名或内部证书的HTTPS服务）、支持目录深度环境变量、对话框新增快速滚动到底部按键、优化流输出动效、支持通过模型生成对话标题（需配置`CHAT_TITLE_MODEL`）、调整Skill Edit编辑交互、支持快速回复的输出语法等。同时修复了S3私有对象key未绑定鉴权资源时的跨资源文件访问风险，优化了知识库训练错误提示、工具空响应自动补充`none`、过滤无效知识库引用角标、优化重定向后的SSRF校验等场景。需注意，该版本移除了所有内置LLM请求中的`temperature`和`max_tokens`参数以避免部分模型不兼容，系统工具运行前会新增二次权限校验。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41505
