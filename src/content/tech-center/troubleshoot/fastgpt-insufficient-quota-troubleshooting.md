---
title: 解决FastGPT调用后insufficient_user_quota报错的排错与配置
slug: /zh/troubleshoot/fastgpt-insufficient-quota-troubleshooting
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/916
source_type: GitHub issue
---

# 解决FastGPT调用后insufficient_user_quota报错的排错与配置

## 现象
长时间调用FastGPT后，系统返回报错信息`insufficient_user_quota user quota is not enough`。

## 可能原因
该报错提示用户API调用配额不足，可能为root用户默认调用额度设置过低，或多用户配额被耗尽。

## 排查步骤
1.  确认触发报错的用户身份，区分root用户与普通子用户。
2.  核对当前用户的API调用配额使用情况，需按实际环境确认具体查看路径。
3.  定位系统中配置用户API调用额度的相关文件。

## 解决与验证
修改root用户默认API调用额度，需按实际环境确认配置文件路径与对应参数名称，在配置文件中调整额度参数后重启相关服务生效。若需在管理页面修改多用户配额，需按实际环境确认管理页面的配额管理入口，进入后即可对多用户的API调用额度进行实时调整。验证方式为重新发起API调用，确认不再触发`insufficient_user_quota user quota is not enough`报错。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/916)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
