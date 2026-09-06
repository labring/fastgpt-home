---
title: 配置本地文档站点地址至FastGPT首页不生效的排错指南
slug: /zh/troubleshoot/fastgpt-doc-url-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1926
source_type: GitHub issue
---

# 配置本地文档站点地址至FastGPT首页不生效的排错指南

## 现象
用户本地使用Hugo搭建FastGPT的文档站点，可通过localhost:1313正常访问，但尝试将该站点地址配置到FastGPT系统首页时未生效。用户尝试在config.json的feConfigs字段中增加docUrl属性，完成修改并重启系统后，该配置属性未被系统加载。

## 可能原因
目前可推测的潜在原因包括配置参数名拼写错误、配置项存放位置不符合系统要求，或系统未能正确读取更新后的config.json配置文件。具体原因需结合实际部署环境与系统日志进一步确认。

## 排查步骤
1. 检查config.json文件中feConfigs下的docUrl参数拼写是否正确，确认参数名与官方要求一致。
2. 确认config.json文件的修改已完成保存，且重启FastGPT系统后，配置文件已被重新加载。
3. 查看FastGPT系统的运行日志，搜索是否存在配置文件读取失败、参数解析错误等相关报错信息，需按实际环境确认日志的存储路径与查看方式。

## 解决与验证
若确认参数名与配置位置正确，重新保存config.json文件后再次重启FastGPT系统。验证时访问FastGPT首页，查看是否出现指向本地文档站点的入口或可跳转的链接，确认配置生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1926)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
