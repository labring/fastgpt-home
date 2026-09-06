---
title: 修改FastGPT配置文件后无需重启容器的排错方法
slug: /zh/troubleshoot/fastgpt-config-reload-without-restart
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1809
source_type: GitHub issue
---

# 修改FastGPT配置文件后无需重启容器的排错方法

## 现象
修改FastGPT项目中projects/app/data/config.json配置文件后，无法直接加载新的配置内容，必须执行docker compose down和docker compose up命令重启容器才能生效。用户希望通过UI界面完成配置修改，无需手动编辑配置文件并重启容器，以灵活调整模型及相关参数。

## 可能原因
当前FastGPT的配置加载逻辑需按实际环境确认，大概率为启动时读取静态配置文件，未支持运行时热加载配置项，未发现官方明确的热加载配置说明。

## 排查步骤
1. 确认修改的配置文件路径为projects/app/data/config.json，避免修改到错误的配置文件导致配置不生效。
2. 确认当前FastGPT服务的部署启动方式为docker compose，匹配issue中提及的操作命令场景。
3. 排查配置加载是否依赖容器启动阶段读取静态文件，确认是否存在可启用热加载的配置项，若未找到相关配置则需按实际环境确认是否支持热加载。

## 解决与验证
解决该问题的目标为实现配置修改后无需重启容器即可生效，可通过UI界面完成配置调整。验证时，完成UI配置修改后，无需执行docker compose down和docker compose up命令，直接查看服务是否加载了新的配置内容，确认配置是否按预期生效。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1809)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
