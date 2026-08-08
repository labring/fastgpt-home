---
title: FastGPT V4.15.0-beta7版本升级步骤与配置变更说明
slug: /zh/deploy/fastgpt-v4-15-beta7-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507
source_type: 官方文档
---

# FastGPT V4.15.0-beta7版本升级步骤与配置变更说明

该版本为FastGPT 4.15.0正式版的最后一个beta版本，已部署4.15.0-beta版本的用户需先升级至此版本，完成所有beta期间的升级操作后，再将镜像更新至正式版。本次升级主要涉及配置文件替换、环境变量变更、镜像更新及工作流迁移三项核心内容。

### 可执行升级与配置步骤
1.  **环境变量配置更新**：
    开源版需移除`config.json`配置文件，全部改用环境变量配置，新增以下环境变量：
    - SSE_MCP_SERVER_PROXY_ENDPOINT（MCP服务器代理地址，末尾不带/）
    - 可选PDF增强解析相关变量：CUSTOM_PDF_PARSE_URL、CUSTOM_PDF_PARSE_KEY、DOC2X_KEY、TEXTIN_APP_ID、TEXTIN_SECRET_CODE
    - 向量检索参数：HNSW_EF_SEARCH（默认100，仅PG/OB/OpenGauss生效）、HNSW_MAX_SCAN_TUPLES（默认100000，仅PG生效）
    - 知识库处理并发控制参数：DATASET_PARSE_MAX_PROCESS、VECTOR_MAX_PROCESS、QA_MAX_PROCESS、VLM_MAX_PROCESS（默认均为10）
    商业版需额外在fastgpt服务中新增`SSE_MCP_SERVER_PROXY_ENDPOINT`环境变量。同时OpenSandbox相关变量重命名为`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL`和`AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN`，且变为必填项。
2.  **镜像更新**：将fastgpt-app（主服务）和fastgpt-pro（商业版）的镜像tag更新为`v4.15.0-beta7`。
3.  **工作流V1转V2迁移**：仅部署过4.8版本的用户需执行，迁移脚本位于`projects/app/src/pages/api/admin/dataClean/v1WorkflowToV2.ts`。先执行dry-run模式校验：
    ```bash
    curl -X POST https://你的域名/api/admin/dataClean/v1WorkflowToV2 \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d '{"dryRun":true}'
    ```
    确认返回统计无误后，将`dryRun`改为`false`执行写入：
    ```bash
    curl -X POST https://你的域名/api/admin/dataClean/v1WorkflowToV2 \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d '{"dryRun":false}'
    ```

### 升级注意事项
本次工作流迁移接口仅用于本次升级，不对外提供OpenAPI。迁移时会按`apps.version != v2 且 type 非 folder、httpPlugin、toolFolder`扫描应用，转换节点字段（如moduleId转为nodeId、flowType转为flowNodeType），未知节点类型会兜底为emptyNode，非法valueType转为any。写库前会通过`PublishAppBodySchema`校验节点、边和聊天配置，校验失败的内容不会写入。此外部分历史工作流可能存在将TypeScript枚举表达式直接写入数据库的问题，需按上述迁移逻辑完成清洗。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/41507
