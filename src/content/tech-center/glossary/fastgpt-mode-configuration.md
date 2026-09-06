---
title: FastGPT中mode模式的配置与使用说明
slug: /zh/glossary/fastgpt-mode-configuration
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru
source_type: 官方文档
---

# FastGPT中mode模式的配置与使用说明

## 一句话定义
mode是FastGPT中用于配置模型运行逻辑或输出格式的参数选项，包含MinerU解析的pipeline模式与AI对话的JSON输出模式。

## 在 FastGPT 里怎么用
### MinerU解析模式
1. 拉取fastgpt-mineru镜像，执行命令：`docker pull crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1`。
2. 创建并启动解析服务容器，执行命令：`docker run --gpus all -itd -p 7231:8001 --name mode_pdf_minerU crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/fastgpt_ck/mineru:v1`。
3. 将部署完成的MinerU服务URL地址，接入至FastGPT的配置文件中。该pipeline模式会根据GPU数量创建多进程，同时处理上传的PDF数据，提升解析效率。
### JSON输出模式
在AI对话节点添加开关，可启用JSON模式，该模式符合OpenAI官方JSON mode规范，可生成结构化的JSON格式输出。

## 容易搞错的地方
1. 启动MinerU服务时，必须指定`--gpus all`参数，否则无法启用GPU并行处理能力，导致解析速度变慢或无法正常运行。
2. 需准确填写部署后的MinerU服务URL至FastGPT配置文件，若URL填写错误，将无法接入PDF解析服务。
3. JSON模式需在对应AI对话节点手动开启开关，未开启该开关时，无法启用JSON格式的输出。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/mineru)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
