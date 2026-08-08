---
title: FastGPT V4.15.0-beta7版本升级操作与配置说明
slug: /zh/deploy/fastgpt-v4-15-beta7-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507
source_type: 官方文档
---

# FastGPT V4.15.0-beta7版本升级操作与配置说明

该版本为FastGPT 4.15.0正式版的最后一个beta版本，部署过4.15.0-beta系列版本的用户需先升级至此版本，完成所有beta阶段升级操作后，再更新至正式版。本次升级包含配置文件替换、环境变量调整、镜像更新及工作流迁移等核心内容。

### 环境变量配置变更
开源版移除了config.json配置文件，所有配置项改为环境变量管理。核心新增及调整的环境变量包括：MCP代理地址`SSE_MCP_SERVER_PROXY_ENDPOINT`（需以http/https开头，末尾不带/）；PDF增强解析相关配置：`CUSTOM_PDF_PARSE_URL`、`CUSTOM_PDF_PARSE_KEY`、`DOC2X_KEY`、`TEXTIN_APP_ID`、`TEXTIN_SECRET_CODE`；向量检索参数：`HNSW_EF_SEARCH`（默认值100，仅对PG/OB/OpenGauss生效）、`HNSW_MAX_SCAN_TUPLES`（默认值100000，仅对PG生效）；知识库处理并发控制参数：`DATASET_PARSE_MAX_PROCESS`（默认10）、`VECTOR_MAX_PROCESS`（默认10）、`QA_MAX_PROCESS`（默认10）、`VLM_MAX_PROCESS`（默认10）。商业版需额外在fastgpt服务中新增`SSE_MCP_SERVER_PROXY_ENDPOINT`环境变量，该配置此前从admin模块移除。此外OpenSandbox Volume Manager配置变为必填，环境变量重命名为`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL`和`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN`。

### 升级与迁移操作步骤
1. 更新镜像：将`fastgpt-app`（主服务）和`fastgpt-pro`（商业版）的镜像tag更新为`v4.15.0-beta7`。
2. 工作流V1到V2迁移（仅4.8版本及更早部署的用户需执行）：该版本后工作流保存结构统一使用V2，需执行官方提供的迁移脚本。迁移脚本路径为`projects/app/src/pages/api/admin/dataClean/v1WorkflowToV2.ts`，该接口仅用于本次升级迁移，不作为对外OpenAPI接口。
   先执行dry-run模式扫描验证，不写入数据库：
   ```bash
   curl -X POST https://你的域名/api/admin/dataClean/v1WorkflowToV2 \
   -H "Content-Type: application/json" \
   -H "rootkey: 你的ROOT_KEY" \
   -d '{"dryRun":true}'
   ```
   确认返回统计无误后，将`dryRun`改为`false`执行写入操作：
   ```bash
   curl -X POST https://你的域名/api/admin/dataClean/v1WorkflowToV2 \
   -H "Content-Type: application/json" \
   -H "rootkey: 你的ROOT_KEY" \
   -d '{"dryRun":false}'
   ```
   接口参数`dryRun`默认值为`true`，用于控制是否仅扫描验证而不写入数据库。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507
