---
title: FastGPT v4.8.20-fix2私有部署模型配置问题排查指南
slug: /zh/troubleshoot/fastgpt-private-deploy-config-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3740
source_type: GitHub issue
---

# FastGPT v4.8.20-fix2私有部署模型配置问题排查指南

## 现象
用户在FastGPT v4.8.20-fix2私有部署版本中，发现原config.json文件不再被读取。存在两个具体问题：一是docker-compose配置中原有`volumes: - ./config.json:/app/data/config.json`的挂载是否需要移除，是否需要新增其他挂载路径；二是新版模型配置的存储位置，以及如何保证配置持久化。

## 可能原因
FastGPT v4.8.20-fix2版本变更了配置读取逻辑，不再读取原config.json文件，导致原有配置方式失效，用户无法明确新版配置的管理方式与持久化方案。

## 排查步骤
1. 确认当前部署的FastGPT版本为v4.8.20-fix2私有部署版本。
2. 检查docker-compose配置文件中的volumes配置项，确认是否存在`./config.json:/app/data/config.json`的挂载配置。
3. 查看容器内部或关联数据库的存储内容，确认模型配置的实际存储位置，需按实际环境确认。
4. 验证配置修改后的生效情况，以及重启容器后配置是否保留。

## 解决与验证
1. 若docker-compose配置中存在原config.json挂载项，可移除该配置，无需新增固定挂载路径，需按实际环境确认。
2. 新版模型配置的存储位置需按实际部署环境确认，可通过查看官方文档或容器日志获取准确信息。
3. 配置持久化需依赖对应存储介质，需按实际环境确认具体方案。
4. 移除原有config.json挂载后，验证模型配置修改可正常生效，且重启容器后配置不丢失。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3740)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
