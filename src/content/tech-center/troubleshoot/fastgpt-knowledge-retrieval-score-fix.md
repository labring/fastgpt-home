---
title: 解决FastGPT本地化部署知识库检索分值超出0-1范围问题
slug: /zh/troubleshoot/fastgpt-knowledge-retrieval-score-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/892
source_type: GitHub issue
---

# 解决FastGPT本地化部署知识库检索分值超出0-1范围问题

## 现象
用户本地化部署FastGPT后，测试知识库检索时发现语义检索返回的分值为162，而官方说明相似度分值应处于0-1区间内。同时出现无论提问什么内容，AI都会无差别命中知识库的情况，本次部署使用了chatGLM3与m3e模型。

## 可能原因
暂未明确通用触发原因，需结合实际使用的向量模型、检索配置参数进行排查。

## 排查步骤
1. 核对知识库检索返回的实际分值，确认是否超出0-1区间。
2. 检查本地化部署的向量模型的输出格式与归一化设置。
3. 确认FastGPT检索配置中是否存在自定义的分值缩放逻辑。
4. 对照官方文档的相似度分值说明，验证当前配置是否符合标准要求。

## 解决与验证
若向量模型输出未做归一化处理，需调整模型输出逻辑，将分值归一化至0-1区间。若检索配置的缩放参数设置错误，需修正该参数至合理范围。验证时，重新执行知识库检索，确认返回的相似度分值处于0-1区间，且AI不会无差别命中所有知识库内容。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/892)
