---
title: 解决FastGPT中配置Claude3.5工具调用时出现的报错问题
slug: /zh/troubleshoot/fastgpt-claude35-tool-call-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/2123
source_type: GitHub issue
---

# 解决FastGPT中配置Claude3.5工具调用时出现的报错问题

## 现象
在FastGPT中配置Claude3.5工具调用功能时，直接启用对应配置后触发报错。该报错仅在function call参数启用时出现，用户已提供相关报错截图作为问题佐证。将配置文件中的function call参数设置为false后，报错可临时消除，但此时工具调用的输出稳定性不足，无法满足常规使用需求。

## 可能原因
目前仅能确认报错与配置文件中的function call参数启用状态存在直接关联，具体的技术根因未在当前issue中明确，需结合实际部署环境、完整报错日志与相关配置信息进一步排查确认。

## 排查步骤
1.  登录FastGPT的部署环境，打开对应的配置文件，查看function call参数的当前配置值。
2.  触发Claude3.5工具调用操作，记录完整的报错文本与相关日志截图，留存问题佐证信息。
3.  调整配置文件中的function call参数为false，重启FastGPT服务后重新触发工具调用，对比报错是否消失，确认参数与报错的关联关系。

## 解决与验证
当前仅有的可行临时方案为将配置文件中的function call参数设置为false，该方案可消除报错，但会导致工具调用的输出稳定性下降。根据issue描述，当前FastGPT官方平台也采用该临时处理方式，暂无其他公开的通用解决办法。验证该方案的操作步骤为：修改配置文件中function call参数为false，重启FastGPT服务后重新发起Claude3.5工具调用，确认报错不再出现，即可完成验证。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/2123)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
