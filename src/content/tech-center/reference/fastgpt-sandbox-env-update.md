---
title: FastGPT启用沙盒功能的环境变量更新配置指南
slug: /zh/reference/fastgpt-sandbox-env-update
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-16/41601
source_type: 官方文档小节
---

# FastGPT启用沙盒功能的环境变量更新配置指南

## 结论
本次更新针对FastGPT启用沙盒功能的场景，需同步更新fastgpt-app与fastgpt-pro的环境变量，替换弃用配置并按需新增可选参数。

## 具体怎么做
1. 同时为fastgpt-app和fastgpt-pro新增以下必填环境变量：
   - AGENT_SANDBOX_PREVIEW_PROXY_URL=https://sandbox-proxy.example.com（浏览器访问Sandbox文件预览的HTTP(S)地址，需从第一步获取）
   - VM_VOLUME_NAME_PREFIX=fastgpt-session（opensandbox存储全前缀名）
2. 移除已弃用的沙盒环境变量：AGENT_SANDBOX_DISK_MB、所有E2B相关变量。
3. 按需配置以下可选环境变量，默认值可直接使用：
   - AGENT_SANDBOX_CPU_COUNT=1（单实例CPU核数上限）
   - AGENT_SANDBOX_MEMORY_MIB=2048（单实例内存上限，单位MiB）
   - AGENT_SANDBOX_STORAGE_SIZE_GI=1（存储容量上限，单位Gi）
   - AGENT_SANDBOX_SUSPEND_MINUTES=60（未活跃后自动暂停时长，单位分钟）
   - AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS=7（暂停后未活跃自动归档时长，单位天）
4. 若此前配置过E2B相关变量，需切换为opensandbox或sealosdevbox，并删除AGENT_SANDBOX_E2B_API_KEY。

## 注意事项
1. 启用Agent Sandbox时必须使用本版本配套的fastgpt-agent-sandbox-proxy和fastgpt-agent-sandbox镜像，禁止新旧版本混合部署。
2. FastGPT的预览协议已同步变更，需严格遵循本配置要求。
3. 所有配置参数均需参考官方文档，不得自行新增未提及的环境变量。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-16/41601)
