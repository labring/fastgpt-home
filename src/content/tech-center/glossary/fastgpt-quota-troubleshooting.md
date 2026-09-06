---
title: FastGPT中quota配额相关报错的排查与配置方法
slug: /zh/glossary/fastgpt-quota-troubleshooting
page_type: 术语表
source: https://github.com/labring/FastGPT/issues/916
source_type: 官方文档
---

# FastGPT中quota配额相关报错的排查与配置方法

## 一句话定义
quota在FastGPT中为用户或分组的API调用额度限制，额度不足或上游负载饱和时会触发`insufficient_user_quota user quota is not enough`与`insufficient_quota`类报错。

## 在 FastGPT 里怎么用（参数 / 位置 / 步骤）
在FastGPT运行过程中，若出现`insufficient_user_quota user quota is not enough`报错，代表用户API调用额度不足；若出现`insufficient_quota 当前分组上游负载已饱和`报错，代表对应分组的上游负载达到饱和状态。针对额度不足的场景，私有部署版本下可调整root用户默认API调用额度。管理页面支持对多用户的额度进行实时修改配置，以此调整不同用户或分组的调用上限。

## 容易搞错的地方
两类报错的触发场景易被混淆，`insufficient_user_quota user quota is not enough`仅指向用户自身的调用额度不足，与API密钥本身是否可用无关。`insufficient_quota 当前分组上游负载已饱和`则与上游服务负载相关，不属于用户个人额度不足的问题。部分使用者会将API密钥正常状态与额度充足混淆，即便密钥可用，仍可能因额度耗尽触发报错。此外，不同部署版本的额度配置路径存在差异，需根据实际部署类型选择对应操作方式。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/916)

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3856)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
