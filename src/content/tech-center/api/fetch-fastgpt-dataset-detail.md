---
title: 获取FastGPT知识库详情的API接口使用说明
slug: /zh/api/fetch-fastgpt-dataset-detail
page_type: API与文档
source: https://doc.fastgpt.cn/openapi/dataset
source_type: 官方文档小节
---

# 获取FastGPT知识库详情的API接口使用说明

该接口属于FastGPT开放API中的知识库管理类接口，为GET请求方式，用于获取单个指定FastGPT知识库的完整详细信息，包括基础配置、绑定的嵌入模型与对话模型参数、权限设置等内容，适用于开发知识库管理相关功能的场景。

## 调用配置与操作步骤
首先需构造符合要求的GET请求，完整的curl调用示例如下：
```
curl --location --request GET 'http://localhost:3000/api/core/dataset/detail?id=6593e137231a2be9c5603ba7' \
--header 'Authorization: Bearer {{authorization}}'
```
请求需包含两个核心要素：一是查询字符串参数id，该参数为目标知识库的唯一标识，必填且不可为空；二是请求头中的Authorization字段，格式为Bearer 后跟有效的访问令牌，其中{{authorization}}需替换为实际获取的访问密钥。调用前需确保已通过合法渠道获取有效令牌，且目标知识库ID正确无误。

## 响应数据解析
当请求成功时，接口会返回code为200的标准JSON响应，响应的data字段包含知识库的全部详情信息。示例返回的data字段包含以下核心内容：_id为知识库的唯一标识，parentId为父级知识库ID，无父级关联时为null；teamId为所属团队的唯一ID，tmbId为绑定的模板ID；type字段固定为dataset，用于标识资源类型；status为知识库的运行状态，active代表正常可用；avatar为知识库的头像资源路径，name为知识库的展示名称。此外还包括vectorModel与agentModel两个核心配置字段：vectorModel包含绑定的嵌入模型信息，包括模型标识、模型名称、每千字符计费点数、默认处理token上限、最大支持token上限与模型权重；agentModel包含绑定的对话模型信息，包括模型标识、模型名称、最大上下文长度、最大响应token长度与每千字符计费点数。其他字段还包括intro知识库介绍文本、permission权限类型、updateTime最后更新时间戳、canWrite当前用户是否拥有写入权限、isOwner当前用户是否为知识库所有者等。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/openapi/dataset)
