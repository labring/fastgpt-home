---
title: 解决FastGPT中pgvector的版本与调用异常问题
slug: /zh/troubleshoot/fastgpt-pgvector-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1304
source_type: GitHub issue
---

# 解决FastGPT中pgvector的版本与调用异常问题

## 现象
在使用FastGPT的过程中，部署的pgvector容器镜像版本为v0.5.1，该镜像最后更新时间为7个月前，无法匹配官方最新版本，且调用该向量数据库时相关工具支持不足。

## 可能原因
官方pgvector仓库已更新至v0.6.2版本，但公开的pgvector镜像仅发布到v0.5.1，版本更新滞后；同时该向量数据库的第三方工具支持覆盖范围较窄。

## 排查步骤
1. 执行`docker images | grep pgvector`命令，确认当前部署的pgvector容器镜像版本。
2. 对比官方仓库发布的最新版本号，确认当前版本是否滞后。
3. 检查当前使用的工具是否支持已部署的pgvector版本，确认是否存在兼容性问题。
4. 如需调整配置，需按实际环境确认具体操作步骤。

## 解决与验证
如需更新pgvector版本，可拉取官方仓库对应的最新镜像，按FastGPT部署流程重新配置向量数据库连接。验证时，可通过FastGPT内置或配套工具调用向量数据库，确认功能正常且满足需求。同时需确认相关工具是否适配更新后的pgvector版本，避免出现兼容性问题。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1304)
