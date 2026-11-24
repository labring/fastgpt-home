---
title: 配置FastGPT开源版的App额外变量与PDF增强解析服务
slug: /zh/deploy/fastgpt-open-source-env-pdf-config
page_type: 部署场景
source: https://doc.fastgpt.cn/self-host/config/env
source_type: 官方文档小节
---

# 配置FastGPT开源版的App额外变量与PDF增强解析服务

从4.15.0版本起，FastGPT开源版不再读取config.json配置文件。从旧版本升级的用户，需删除该文件的volume挂载，并将原config.json中的配置转换为环境变量。未使用过可选配置的用户无需额外操作。以下是原config.json字段与对应环境变量、默认值及说明的对应关系：

| 原config.json字段               | 环境变量名                  | 默认值   | 说明                                                                 |
|--------------------------------|---------------------------|----------|----------------------------------------------------------------------|
| systemEnv.customPdfParse.url   | CUSTOM_PDF_PARSE_URL      | 空       | 自定义PDF解析服务地址。                                               |
| systemEnv.customPdfParse.key   | CUSTOM_PDF_PARSE_KEY      | 空       | 自定义PDF解析服务密钥。                                               |
| systemEnv.customPdfParse.doc2xKey | DOC2X_KEY              | 空       | Doc2x PDF解析服务密钥。                                               |
| systemEnv.customPdfParse.textinAppId | TEXTIN_APP_ID        | 空       | 合合信息TextIn服务App ID。                                            |
| systemEnv.customPdfParse.textinSecretCode | TEXTIN_SECRET_CODE | 空       | 合合信息TextIn服务Secret Code。                                       |
| systemEnv.hnswEfSearch         | HNSW_EF_SEARCH            | 100      | 向量检索的hnsw.ef_search参数，仅对PG、OceanBase、openGauss生效。       |
| systemEnv.hnswMaxScanTuples    | HNSW_MAX_SCAN_TUPLES      | 100000   | 向量检索最大扫描数据量，仅对PG生效。                                  |
| systemEnv.datasetParseMaxProcess | DATASET_PARSE_MAX_PROCESS | 10       | 知识库文件解析队列最大并发数。                                         |
| systemEnv.vectorMaxProcess     | VECTOR_MAX_PROCESS        | 10       | 向量训练队列最大并发数。                                               |
| systemEnv.qaMaxProcess         | QA_MAX_PROCESS            | 10       | 问答拆分队列最大并发数。                                               |
| systemEnv.vlmMaxProcess        | VLM_MAX_PROCESS           | 10       | 图片理解模型处理队列最大并发数。                                       |

FastGPT开源版支持接入多种PDF增强解析服务，包括自定义服务、SoMark、TextIn和Doc2x。调用优先级为自定义PDF解析服务 > SoMark > TextIn > Doc2x，选择其中一种服务配置即可。

### 具体配置步骤
1.  **Sealos PDF解析服务**：先申请API Key，然后配置环境变量：
```env
CUSTOM_PDF_PARSE_URL = https://aiproxy.hzh.sealos.run/v1/parse/pdf?model=parse-pdf
CUSTOM_PDF_PARSE_KEY = your-sealos-api-key
```
2.  **SoMark**：创建API Key后，配置环境变量`SOMARK_API_KEY = sk-your-api-key`。该服务单文件最大支持200MB、300页，完整限制和错误码可参考SoMark API文档。
3.  **其他自定义PDF解析服务**：配置环境变量：
```env
CUSTOM_PDF_PARSE_URL = https://your-pdf-parser.example.com/v2/parse/file
CUSTOM_PDF_PARSE_KEY = your-service-key
```
其中`CUSTOM_PDF_PARSE_KEY`可选，配置后FastGPT会通过`Authorization: Bearer <CUSTOM_PDF_PARSE_KEY>`发起请求。解析服务需接收`multipart/form-data` POST请求，包含`file`字段，并返回格式为`{"pages": 10, "markdown": "Parsed Markdown content"}`的JSON数据。
4.  **TextIn**：配置`TEXTIN_APP_ID = your-app-id`和`TEXTIN_SECRET_CODE = your-secret-code`。
5.  **Doc2x**：配置`DOC2X_KEY = your-api-key`。

完成所有环境变量配置后，需重启FastGPT。在知识库导入文件或应用文件上传配置中勾选“PDF增强解析”，上传的PDF才会使用已配置的增强解析服务；未勾选时仍使用FastGPT内置解析器。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/env)
