---
title: FastGPT中Marker自定义PDF解析工具的使用说明
slug: /zh/glossary/fastgpt-marker-pdf-parser-3
page_type: 术语表
source: https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker
source_type: 官方文档
---

# FastGPT中Marker自定义PDF解析工具的使用说明

## 一句话定义
Marker是FastGPT支持的第三方PDF解析工具，基于视觉解析，可有效提取PDF中的图片、表格、公式等复杂内容。

## 在 FastGPT 里怎么用
FastGPT v4.9.0及以上版本支持使用Marker解析PDF。社区版用户需在config.json文件中添加systemEnv.customPdfParse配置。商业版用户可直接在Admin后台按表单指引填写配置。安装Marker需使用Docker快速部署，拉取镜像地址为crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2，运行命令为docker run --gpus all -itd -p 7231:7232 --name model_pdf_v2 -e PROCESSES_PER_GPU="2" crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:v0.2。操作需重新拉取Marker镜像，且接口格式已变动。

## 容易搞错的地方
仅FastGPT v4.9.0及以上版本支持该自定义PDF解析配置，低版本无法使用。社区版与商业版的配置方式不同，请勿混淆操作路径。部署Marker时需确保GPU环境可用，且端口映射、进程数配置需符合要求。需重新拉取最新的Marker镜像，旧镜像可能无法适配新的接口格式。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/marker)

## 适用性与版本范围

本页适用于官方来源记录的 术语表 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
