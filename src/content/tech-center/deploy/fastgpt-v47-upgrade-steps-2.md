---
title: FastGPT V4.7版本升级步骤与更新内容说明
slug: /zh/deploy/fastgpt-v47-upgrade-steps-2
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47
source_type: 官方文档
---

# FastGPT V4.7版本升级步骤与更新内容说明

## V4.7版本更新概述
本次FastGPT V4.7版本包含多项新增功能、优化项与修复内容。新增功能包括工具调用模块、分类和内容提取的functionCall模式、HTTP插件、兼容cohere格式的Rerank模型以及Helm安装支持；优化项涵盖高级编排性能、Flow controller抽离、AI模型选择、弹窗交互、Docker部署自动初始化副本集以及浏览器文件编码自动推断；修复了社区版重排模型选择失效、GET请求因body传undefined失败、PG HNSW索引未生效、Safari浏览器语音输入异常、自定义分割规则输入正则特殊字符导致前端崩溃等问题。需注意，旧版config.json配置说明已不再维护，当前版本需参考官方模型配置方案。

## 升级操作步骤
完成镜像升级后，需执行初始化脚本与ReRank模型适配操作。首先，在任意终端发起HTTP请求，替换`{{rootkey}}`为环境变量中的rootkey，`{{host}}`为部署的域名，执行命令：
```bash
curl --location --request POST https://{{host}}/api/admin/initv47 \
--header rootkey: {{rootkey}} \
--header Content-Type: application/json
```
该脚本用于初始化插件的parentId。针对ReRank模型升级：若使用本地ReRank模型，需将镜像修改为`registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1`；若使用cohere格式的重排模型，需先申请官方密钥，再在配置文件中添加如下配置：
```json
{
  "reRankModels": [
    {
      "model": "rerank-multilingual-v2.0",
      "name": "检索重排",
      "requestUrl": "https://api.cohere.ai/v1/rerank",
      "requestAuth": "你在Cohere上申请的Key"
    }
  ]
}
```

## 升级注意事项
升级过程中需注意以下细节：PG HNSW索引更新后搜索速度大幅提升，但可能出现精度损失，若遇到该情况需参考PgVector官方文档调整索引；使用functionCall模式时，需在LLM模型配置中将`functionCall`设为`true`，`toolChoice`设为`false`，若`toolChoice`为`true`则会进入tool模式；旧版配置文件格式不再适用，需切换至官方最新的模型配置方案；cohere的重排模型对中文表现不如本地的bge模型，可根据业务需求选择适配的重排方案。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47
