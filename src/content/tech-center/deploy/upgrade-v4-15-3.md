---
title: FastGPT V4.15.3版本升级内容与操作指引
slug: /zh/deploy/upgrade-v4-15-3
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4153
source_type: 官方文档
---

# FastGPT V4.15.3版本升级内容与操作指引

## 这个版本改了什么
本次版本为V4.15.3，包含镜像更新与问题修复两项核心内容。镜像更新方面，针对fastgpt主服务的fastgpt-app镜像，更新其tag为v4.15.3；针对fastgpt商业版的fastgpt-pro镜像，同样更新其tag为v4.15.3。问题修复包含两点：一是修复微信发布渠道在微信接口遭遇特殊异常时，会触发快速轮询的问题；二是修复v1接口在stream=false、detail=true的调用场景下，未补回type字段导致兼容异常的问题。

## 升级前要确认的事
需确认当前部署的fastgpt-app或fastgpt-pro服务的现有镜像tag，确认部署环境具备稳定的镜像拉取能力，可正常拉取v4.15.3版本的对应镜像，同时确认业务中未出现与本次修复问题相关的异常反馈。

## 升级步骤（照做）
根据部署方式修改对应配置文件中的镜像tag，将fastgpt-app的镜像tag替换为v4.15.3，将fastgpt-pro的镜像tag替换为v4.15.3。完成配置更新后，按照常规流程重启对应服务，使新镜像生效。

## 升级后怎么验证
首先通过对应工具查看服务镜像tag，确认fastgpt-app和fastgpt-pro的镜像tag均为v4.15.3。其次测试微信发布渠道的接口调用，模拟微信接口特殊异常场景，确认无快速轮询问题出现。最后测试v1接口在stream=false、detail=true的调用场景，查看返回结果是否包含type字段，确认兼容修复生效。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-15/4153)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
