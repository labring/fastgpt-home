---
title: FastGPT私有部署重启容器后创建模型网络错误的排查方法
slug: /zh/troubleshoot/fastgpt-private-deployment-network-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1192
source_type: GitHub issue
---

# FastGPT私有部署重启容器后创建模型网络错误的排查方法

## 现象
私有部署FastGPT首次登录未正常完成全流程，重启容器后无法正常使用。在创建模型环节，界面显示network error报错，附带两张相关报错截图。

## 可能原因
未明确具体成因，需结合实际部署环境逐一排查，可能涉及容器重启后的配置异常、网络策略变更或依赖服务状态变化等方向。

## 排查步骤
1.  确认FastGPT相关容器的运行状态，通过容器管理工具查看容器是否处于正常运行状态。
2.  查看前端浏览器控制台或后端服务日志，提取network error的详细报错信息。
3.  核对首次登录未完成流程的遗留配置，检查相关依赖服务的连通性是否正常。
4.  检查容器重启后的环境变量、挂载配置是否与初始部署时的配置一致。

## 解决与验证
1.  若发现容器挂载配置或环境变量丢失，恢复至初始部署时的配置内容。
2.  排查并修复依赖服务的连通性问题，确保相关服务可正常访问。
3.  重新启动FastGPT容器，验证创建模型环节不再出现network error报错。
4.  完成全流程登录验证，确认FastGPT功能恢复正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1192)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
