---
title: FastGPT V4.2.1版本升级的向量模型配置调整指南
slug: /zh/deploy/fastgpt-v421-upgrade-config
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/421
source_type: 官方文档小节
---

# FastGPT V4.2.1版本升级的向量模型配置调整指南

当你将FastGPT私有部署版本升级至V4.2.1时，如果此前添加了自定义配置文件，需要对配置文件中的VectorModels字段进行调整。这是本次版本升级的核心配置变更项，需确保所有向量模型配置都包含指定的新增参数。

### 配置文件修改步骤
首先定位到你的FastGPT私有部署配置文件，找到VectorModels数组字段。为数组内的每个向量模型对象，新增defaultToken和maxToken两个键值对。其中defaultToken代表直接分段时的默认token数量，maxToken代表对应模型支持的token上限，官方提示通常不建议将maxToken设置超过3000。以下是调整后的标准配置示例：
```json
"VectorModels" : [
{
"model" : "text-embedding-ada-002" ,
"name" : "Embedding-2" ,
"price" : 0 ,
"defaultToken" : 500 ,
"maxToken" : 3000
}
]
```

此次配置调整的核心设计思路是统一向量模型的使用规则，确保系统自动选择适配的模型完成相关任务，无需用户额外进行模型选择操作，简化后续的配置维护流程。完成配置修改后，需按照FastGPT私有部署的标准流程重启服务，使新配置生效。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/421)
