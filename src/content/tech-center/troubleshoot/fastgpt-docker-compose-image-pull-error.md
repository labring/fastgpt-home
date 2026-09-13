---
title: 解决FastGPT使用docker-compose拉取镜像提示镜像源不存在的问题
slug: /zh/troubleshoot/fastgpt-docker-compose-image-pull-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2904
source_type: GitHub issue
---

# 解决FastGPT使用docker-compose拉取镜像提示镜像源不存在的问题

## 现象
使用官方文档提供的docker-compose配置拉取FastGPT镜像时，终端提示镜像源不存在。经测试网络连接状态正常，开启或关闭VPN后，该问题仍未解决。

## 可能原因
当前无明确指向的根因，需按实际环境确认，可能涉及镜像拉取相关配置、网络访问限制等场景。

## 排查步骤
1. 确认使用的docker-compose配置为官方文档提供的版本。
2. 检查当前网络连接状态，确认可正常访问外部资源。
3. 尝试开启或关闭VPN后，重新执行拉取镜像的命令。
4. 查看终端输出的完整报错信息，确认镜像源不存在的具体提示内容。

## 解决与验证
根据排查结果调整对应配置。若为网络访问限制问题，可配置镜像加速器或调整网络访问策略。重新执行docker-compose拉取镜像的命令，确认不再提示镜像源不存在。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2904)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
