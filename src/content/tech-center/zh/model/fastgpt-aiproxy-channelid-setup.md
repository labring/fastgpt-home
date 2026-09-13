---
title: 正确获取并配置FastGPT对接AIProxy协议所需的channelId参数
slug: /zh/model/fastgpt-aiproxy-channelid-setup
page_type: 模型指南
source: https://doc.fastgpt.cn/zh-CN/plugin/model-presets
source_type: 官方文档
---

# 正确获取并配置FastGPT对接AIProxy协议所需的channelId参数

## channelId的核心要求
对接AIProxy协议时，FastGPT所需的channelId参数，必须与AIProxy仓库`core/model/chtype.go`文件中定义的`ChannelType`数值完全一致。不得根据供应商名称猜测该参数的取值。

## 查询可用channelId的步骤
在本地克隆或已部署的AIProxy仓库内，执行以下命令，即可检索所有已定义的协议类型与对应channelId：
```bash
rg -n "ChannelType.*=" core/model/chtype.go
```
部分常见协议的对应关系如下表所示：
| AIProxy 类型              | ID   | FastGPT `channelId` |
| ------------------------- | ---- | ------------------- |
| `ChannelTypeOpenAI`       | `1`  | `1`                 |
| `ChannelTypeAnthropic`    | `14` | `14`                |
| `ChannelTypeAli`          | `17` | `17`                |
| `ChannelTypeGoogleGemini` | `24` | `24`                |
| `ChannelTypeDeepseek`     | `36` | `36`                |
| `ChannelTypeDoubao`       | `40` | `40`                |
| `ChannelTypeSiliconflow`  | `43` | `43`                |
| `ChannelTypeAntLing`      | `54` | `54`                |

## 完整列表的获取方式
由于AIProxy会持续更新支持的协议类型，所有协议与channelId的完整对应关系，需以AIProxy主分支`core/model/chtype.go`文件的最新内容为准。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/plugin/model-presets)

## 适用性与版本范围

本页适用于官方来源记录的 模型指南 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
