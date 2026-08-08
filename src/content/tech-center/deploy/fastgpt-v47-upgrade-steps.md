---
title: FastGPT V4.7版本升级步骤与配置调整说明
slug: /zh/deploy/fastgpt-v47-upgrade-steps
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47
source_type: 官方文档
---

# FastGPT V4.7版本升级步骤与配置调整说明

## 升级核心变更
FastGPT V4.7版本包含多项核心调整：一是配置文件修改，新增Boolean值用于控制不同功能块可使用的模型，同时新增模型logo配置，旧版config.json已不再维护，需参考官方模型配置方案；二是新增初始化脚本，用于初始化插件的parentId；三是ReRank模型格式发生变动，兼容cohere格式，可直接使用cohere提供的API，本地部署的ReRank模型需更换为指定镜像。

## 升级操作步骤
完成镜像升级后，需执行初始化脚本完成插件数据初始化。在任意终端发起如下HTTP请求，将`{{rootkey}}`替换为环境变量中的rootkey，`{{host}}`替换为部署的域名：
```bash
curl --location --request POST https://{{host}}/api/admin/initv47 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
若需配置cohere格式的ReRank模型，需修改FastGPT配置文件，示例配置如下：
```json
{
  "reRankModels": [
    {
      "model": "rerank-multilingual-v2.0",
      "name": "检索重排",
      "requestUrl": "https://api.cohere.ai/v1/rerank",
      "requestAuth": "申请的cohere官方key"
    }
  ]
}
```
若使用本地ReRank模型，需将镜像更换为`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`。

## 新增与优化修复内容
本版本新增工具调用模块，支持LLM模型根据用户意图动态选择其他模型或插件执行；分类和内容提取支持functionCall模式，需在LLM模型配置中将`functionCall`设为`true`、`toolChoice`设为`false`；新增HTTP插件可快速生成OpenAPI插件，同时支持Helm安装方式。优化项包括高级编排性能、抽离Flow controller到packages、AI模型选择、弹窗交互优化、Docker部署自动初始化副本集，以及浏览器读取文件自动推断编码减少乱码。修复内容包括社区版重排模型选择异常、HTTP请求body传入undefined导致GET请求失败、PG HNSW索引未生效、Safari浏览器语音输入异常、自定义分割规则输入特殊字符导致前端崩溃等问题。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47
