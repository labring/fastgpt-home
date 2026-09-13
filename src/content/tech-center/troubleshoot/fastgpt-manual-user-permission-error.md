---
title: 解决FastGPT后台手动创建用户登录时无权操作的问题
slug: /zh/troubleshoot/fastgpt-manual-user-permission-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1087
source_type: GitHub issue
---

# 解决FastGPT后台手动创建用户登录时无权操作的问题

## 现象
后台手动添加的用户账户在登录FastGPT后，执行操作时显示无权操作的提示。

## 可能原因
暂无明确的通用指向原因，需结合实际部署环境的权限配置、用户账户绑定的角色信息进行排查。

## 排查步骤
1.  确认后台手动创建的用户账户的所有配置信息完整，无缺失字段。
2.  核对该用户账户绑定的角色权限范围，确认所需执行操作的权限已正确配置。
3.  确认登录时使用的密钥与该手动创建的用户账户正确关联，无密钥跨账户使用的情况。

## 解决与验证
根据排查结果补充缺失的权限配置，或重新绑定正确的角色与密钥信息。完成配置调整后，使用该手动创建的用户账户登录FastGPT，执行对应操作，确认无权操作的提示不再出现。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1087)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
