---
title: FastGPT V4.16.0-beta1 版本升级配置与数据迁移说明
slug: /zh/deploy/fastgpt-v4-16-upgrade-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# FastGPT V4.16.0-beta1 版本升级配置与数据迁移说明

### 升级前置变更
FastGPT V4.16.0-beta1 对 Agent Sandbox 配置进行了更新。启用 Agent Sandbox 需在 fastgpt-app 和 fastgpt-pro 中新增浏览器可访问的预览代理地址 `AGENT_SANDBOX_PREVIEW_PROXY_URL`，该地址必须以 http:// 或 https:// 开头，默认单端口部署时可与 `AGENT_SANDBOX_PROXY_URL` 指向同一域名端口，但需区分协议。强烈建议预览地址与主站使用不同 origin，避免同源脚本访问主站凭证。本版本新增多个可选配置项，包括单实例 CPU 核数上限（默认1）、内存上限（默认2048 MiB）、存储容量（默认1 Gi）、自动暂停时长（默认60分钟）、自动归档时长（默认7天）。同时 E2B Sandbox Provider 已移除，已配置过 E2B 的环境需切换为 opensandbox 或 sealosdevbox 并删除 `AGENT_SANDBOX_E2B_API_KEY`，且需使用本版本配套镜像，禁止新旧版本混合部署。

### 配置与迁移操作步骤
1.  **Agent Sandbox 与代理配置**：若网关支持 ws 和 http 同端口，可仅开放 PORT 端口（默认1006）；若不支持，需额外设置 `PREVIEW_PORT` 指定 http 访问端口（如1007）。
2.  **数据迁移操作**：若此前启用过 Agent Sandbox，需按顺序执行迁移：
    先执行 dry-run 查看待处理数量，该操作不会修改数据：
    ```bash
    curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d "{\"dryRun\":true}"
    ```
    查看结果后执行正式迁移：
    ```bash
    curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d "{\"dryRun\":false}"
    ```
    若仅出现 `Sandbox source is missing or deleted` 错误且对应资源已不存在，可添加 `skipError:true` 跳过残留项：
    ```bash
    curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
    -H Content-Type: application/json \
    -H rootkey: 你的ROOT_KEY \
    -d "{\"dryRun\":false, \"skipError\":true}"
    ```

### 迁移逻辑与边界说明
本版本将 Agent Sandbox 从“每个对话一个实例”调整为“同一 App、同一用户共享一个实例”，不同对话文件仍保存在 sessions/chatId 目录，已发布 Skill 统一保存在 projects 目录。迁移会先执行前置逻辑，补齐旧数据字段、清理孤立资源，待归一化待处理数归零后才会归档旧 Workspace。若归档阶段存在失败，将无法进入安装阶段。脚本可安全重试，已完成的操作不会重复执行，新 Sandbox 会在安装完成后暂停，首次使用时正常启动。需注意预览 URL 为短期只读 bearer 凭证，获得链接的用户可在有效期内修改路径访问同 Workspace 其他文件，请勿随意分享。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601
