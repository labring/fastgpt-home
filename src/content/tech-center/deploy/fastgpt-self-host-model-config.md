---
title: FastGPT 自部署环境下的模型配置方法与参数说明
slug: /zh/deploy/fastgpt-self-host-model-config
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
source_type: 官方文档
---

# FastGPT 自部署环境下的模型配置方法与参数说明

## 基础说明与核心概念
FastGPT 通过 AI Proxy 服务连接多模型提供商，同时提供负载均衡、模型日志、数据看板能力。使用前需注意：系统至少需1个语言模型和1个索引模型才能正常运行；语音识别模型仅需配置1个即可生效。
模型类型分为语言模型（支持多模态图片识别）、索引模型、重排模型、语音合成、语音识别五类。核心术语包括：模型ID（请求时Body的model字段值，全局唯一）、模型名（展示用名称）、模型渠道（不同提供商协议）、自定义请求地址/Key（可绕过渠道直接发起请求，不推荐常规使用）。

## 可照做的配置流程
以阿里百炼模型为例，配置步骤如下：
1.  进入 FastGPT 账号-模型提供商页面，切换至「模型渠道」标签页，点击右上角「新增渠道」。
2.  填写渠道名（仅作标识），选择对应协议类型（多数服务商支持OpenAI协议）；若下拉框无所需模型，点击「新增模型」添加自定义模型。
3.  配置模型映射（格式如`{ gpt-4o-test : gpt-4o }`），代理地址填写BaseUrl（无需完整请求地址，需注意是否添加`/v1`），填入从厂商获取的API密钥。
4.  点击「新增」完成渠道创建，随后可点击「模型测试」-「开始测试」验证渠道有效性；验证通过后即可启用模型，也可直接启用系统内置的主流模型。
此外可配置渠道优先级（范围1~100，数值越高越优先），在渠道右侧菜单可启用/禁用渠道。

## 补充配置与日志说明
若需绕过模型渠道直接发起请求，可填写自定义请求地址和自定义请求Key。自定义请求地址需遵循对应格式：LLM类为`[host]/v1/chat/completions`，Embedding类为`[host]/v1/embeddings`，STT类为`[host]/v1/audio/transcriptions`，TTS类为`[host]/v1/audio/speech`，Rerank类为`[host]/v1/rerank`；请求时需携带请求头`Authorization: Bearer xxx`。
通过渠道调用的模型日志会保留1小时（可通过环境变量调整保留时长），日志页面会展示请求记录、Token消耗、耗时等信息，错误请求会附带入参和详细错误信息。旧版使用OneAPI的用户，可通过HTTP请求迁移配置：替换`{{host}}`为AI Proxy地址、`{{admin_key}}`为ADMIN_KEY值、`dsn`为OneAPI的MySQL连接串后执行以下命令：
```bash
curl --location --request POST {{host}}/api/channels/import/oneapi \
--header "Authorization: Bearer {{admin_key}}" \
--header "Content-Type: application/json" \
--data-raw '{"dsn":"mysql://root:s5mfkwst@tcp(dbconn.sealoshzh.site:33123)/mydb"}'
```
执行成功会返回`success: true`，脚本仅做简单数据映射，建议迁移后手动检查。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro
