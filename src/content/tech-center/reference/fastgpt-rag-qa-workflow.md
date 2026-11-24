---
title: FastGPT智能问答系统RAG应用的操作流程与注意事项
slug: /zh/reference/fastgpt-rag-qa-workflow
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/rag
source_type: 官方文档小节
---

# FastGPT智能问答系统RAG应用的操作流程与注意事项

## 结论
RAG通过实时检索外部知识库生成准确详细的答案，可避免传统生成模型产生的错误信息。本文将介绍FastGPT中智能问答系统RAG应用的完整操作流程。
## 具体怎么做
1. 用户通过Web应用发起查询请求，进入后端系统启动数据处理流程。
2. 系统通过Azure AD对用户进行身份验证，确保仅授权用户可访问系统与数据。
3. 系统根据Azure AD管理的用户组权限，过滤用户可访问的内容。
4. 过滤后的查询传递至Azure AI搜索服务，通过语义搜索检索相关内容。
5. 系统使用OCR和文档提取技术处理输入文档，将非结构化数据转换为结构化可搜索数据。
6. 检索到的相关信息传递至Azure Open AI，结合用户查询与检索结果生成连贯回答。
7. 生成的回答通过Web应用返回给用户，完成整个流程。
## 注意事项
1. 输入文档需预先通过文档智能处理完成索引，才可被检索使用。
2. 系统仅允许经过Azure AD身份验证且拥有对应组权限的用户访问内容。
3. 流程通过权限管控、检索与生成环节保障数据安全与合规性。
> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/rag)
