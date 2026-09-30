---
title: Ernie 8K 上下文 这一档模型配 Milvus 的配置口径
slug: /zh/combo/combo-ernie08-milvus
page_type: 模型组合页
source: https://github.com/labring/FastGPT
source_type: 开源仓库定义（FastGPT v4.17.0 · fastgpt-plugin v1.1.3）
description: "Ernie 8K 这一档模型，上下文长度 8000 Token，意味着模型单次处理的输入总和（包括召回内容、系统指令和用户查询）不能超过此上限。引用上限 5000 Token，这表示模型在生成回答时，引用内容的 token 总量会被限制在此范围内。引用内容的总 token 预算是 5000 Toke"
language: zh
axis_model_tier: "Ernie / 8000 /  / 5000 / false / false"
axis_vector_db: "Milvus"
covered_models: "ERNIE-4.0-8K、ERNIE-4.0-Turbo-8K"
check_day: 2026-09-29
meta_title: Ernie 8K 上下文 这一档模型配 Milvus 的配置口径
meta_description: Ernie 8K 这一档模型，上下文长度 8000 Token，意味着模型单次处理的输入总和（包括召回内容、系统指令和用户查询）不能超过此上限。引用上限 5000 Token，这表示模型在生成回答时，引用内容的 token 总量会被限制在此范围内。引用内容的总 token 预算是 5000 Toke
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Ernie 8K 上下文 这一档模型配 Milvus 的配置口径

## 这一档模型的参数意味着什么
Ernie 8K 这一档模型，上下文长度 8000 Token，意味着模型单次处理的输入总和（包括召回内容、系统指令和用户查询）不能超过此上限。引用上限 5000 Token，这表示模型在生成回答时，引用内容的 token 总量会被限制在此范围内。引用内容的总 token 预算是 5000 Token。段落条数由检索侧的返回条数决定，两者是不同的量。单次最大输出未标注，通常由模型本身决定。图片输入和工具调用功能为 false，表示此档模型不支持直接处理图像或进行外部工具调用。

## 配 Milvus 要定哪些

| 配置项 | 建议取法 | 这样取的依据 |
| :----- | :------- | :----------- |
| `MILVUS_ADDRESS` | `localhost:19530` | 默认本地部署地址，可根据实际部署调整 |
| `MILVUS_TOKEN` | 按实测标定 | 根据 Milvus 认证配置，确保连接安全 |
| `index_type` | `HNSW` | 提供高效率的近似最近邻搜索，RAG场景常用 |
| `metric_type` | `IP` | 适用于余弦相似度，计算向量内积，符合多数Embedding模型输出 |
| `recall_num` | `5` | 经验值，平衡召回质量与模型上下文长度 |
| `chunk_size` | `800-1200 字符` | 确保单段内容信息密度，并适应模型上下文长度 |

## 这两者互相约束的地方
召回条数与每段长度的乘积，加上系统指令和用户查询的长度，不能超过模型 8000 Token 的上下文预算。引用上限按 token 计，向量库返回的按条数计，这导致谁先触顶取决于每段内容的平均 token 长度。如果每段内容较短，可能在达到引用上限 5000 Token 前，先达到召回条数上限；反之，如果每段内容很长，可能在召回条数不多时，就触及了引用上限。索引参数如 `HNSW` 的 `M` 和 `efConstruction` 值调大，或 `IP` 距离度量方式的选择，会影响检索的准确性和速度，进而可能影响召回内容的质量，为这一档模型提供更精准的输入。

## 容易做错的三处
- 现象：日志显示 `Milvus connection failed` 报错。原因：`MILVUS_ADDRESS` 配置错误或 Milvus 服务未启动。
- 现象：模型回答中未引用任何外部知识，或引用内容不相关。原因：向量召回条数设置过低，或 `chunk_size` 过大导致单段信息冗余。
- 现象：API 调用返回 `400 Bad Request` 错误，提示 `context_length_exceeded`。原因：召回内容总 Token 量加上用户查询等超过了 8000 Token 上下文长度限制。

## 怎么确认配好了
- 检查 FastGPT 界面，确认知识库连接状态显示为“已连接”。
- 对知识库进行一次测试检索，观察返回的段落条数和内容相关性，并与预期召回结果进行比对。
- 在 FastGPT 中创建一个包含长文本的知识库，进行一次问答测试，确保模型能正常引用知识并输出完整回答，同时检查日志确认无上下文超限报错。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [fastgpt-plugin 源码仓库](https://github.com/labring/fastgpt-plugin)
