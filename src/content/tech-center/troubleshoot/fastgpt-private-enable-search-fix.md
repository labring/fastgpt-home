---
title: 解决FastGPT私有部署中通义千问搜索参数配置无效问题
slug: /zh/troubleshoot/fastgpt-private-enable-search-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1152
source_type: GitHub issue
---

# 解决FastGPT私有部署中通义千问搜索参数配置无效问题

## 现象
FastGPT私有部署版本4.7中，接入通义千问qwen-max模型后，提问华为mate60，返回信息为华为mate60尚未发布。尝试将enable_search参数写入config.json并重启服务，配置未生效。

## 可能原因
结合问题场景，可能原因为参数值使用了字符串类型，不符合布尔类型的要求，或配置未被服务正确加载。

## 排查步骤
1. 确认配置文件为config.json，且参数配置位置符合服务要求。
2. 检查enable_search参数的类型，需为布尔类型，配置值不应使用引号包裹的字符串形式。
3. 执行docker-compose down && docker-compose up -d命令重启服务。
4. 重新发起提问，验证返回结果是否符合预期。

## 解决与验证
将config.json中的enable_search参数值设置为布尔类型的true，移除字符串包裹的引号。执行docker-compose down && docker-compose up -d重启服务。重新发起提问，验证返回结果包含华为mate60的最新信息。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1152)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
