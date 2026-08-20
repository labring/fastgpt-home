---
title: FastGPT V4.16.0-beta1版本升级配置与数据迁移指南
slug: /zh/deploy/fastgpt-4160-upgrade-migration
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601
source_type: 官方文档
---

# FastGPT V4.16.0-beta1版本升级配置与数据迁移指南

## 核心升级变更说明
V4.16.0-beta1对Agent Sandbox模块进行了重大调整：移除E2B Sandbox Provider，需切换至opensandbox或sealosdevbox并删除原`AGENT_SANDBOX_E2B_API_KEY`配置；新增浏览器预览代理地址配置项`AGENT_SANDBOX_PREVIEW_PROXY_URL`，需以`http://`或`https://`开头，建议与主站不同源以避免安全风险，同时新增多个可选配置参数，包括单实例CPU核数、内存上限、存储容量、自动暂停/归档时长等。

## 可执行配置与迁移步骤
1.  配置Agent Sandbox环境变量：在`fastgpt-app`和`fastgpt-pro`中添加预览代理地址：
    ```bash
    AGENT_SANDBOX_PREVIEW_PROXY_URL = https://sandbox-proxy.example.com
    ```
    可按需配置可选参数，如`AGENT_SANDBOX_CPU_COUNT=1`（默认值1）、`AGENT_SANDBOX_MEMORY_MIB=2048`（默认值2048）等。
2.  更新sandbox-proxy环境变量：若网关支持ws和http同端口，可仅设置`PORT=1006`；若不支持，需额外设置`PREVIEW_PORT=1007`。
3.  执行数据迁移：
    - 先运行dry-run查看待处理量：
      ```bash
      curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
      -H Content-Type: application/json \
      -H rootkey: 你的ROOT_KEY \
      -d '{"dryRun":true}'
      ```
    - 确认结果后执行正式迁移：
      ```bash
      curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
      -H Content-Type: application/json \
      -H rootkey: 你的ROOT_KEY \
      -d '{"dryRun":false}'
      ```
    - 若仅出现`Sandbox source is missing or deleted`错误且对应资源已不存在，可添加`skipError:true`参数跳过：
      ```bash
      curl -X POST https://你的域名/api/admin/4160/initUserSandbox \
      -H Content-Type: application/json \
      -H rootkey: 你的ROOT_KEY \
      -d '{"dryRun":false, "skipError":true}'
      ```

## 迁移逻辑说明
本版本将Agent Sandbox从“每个对话一个实例”调整为“同一App、同一用户共享一个实例”。迁移过程会先完成旧Workspace归一化与清理，待处理量归零后才会执行归档与迁移，脚本可安全重试，已完成的操作不会重复执行；新Sandbox会在安装完成后暂停，首次使用时按正常流程启动。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/41601)
