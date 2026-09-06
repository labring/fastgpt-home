---
title: FastGPT V4.7版本升级操作与更新内容解读
slug: /zh/deploy/upgrade-v4-7
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47
source_type: 官方文档
---

# FastGPT V4.7版本升级操作与更新内容解读

## 这个版本改了什么
V4.7版本新增工具调用模块，支持LLM根据用户意图动态选择其他模型或插件执行；新增分类和内容提取的functionCall模式，需将LLM模型配置文件中functionCall设为true、toolChoice设为false；新增HTTP插件，可通过OpenAPI快速生成插件；Rerank模型兼容cohere格式，可直接使用cohere提供的API，本地ReRank模型需使用镜像registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1；新增Helm安装方式。优化项包括高级编排性能、抽离Flow controller到packages、AI模型选择、手动输入知识库弹窗、变量输入弹窗、docker部署自动初始化副本集、浏览器读取文件自动推断编码。修复项包括社区版重排选不上、http请求body不传时传入undefined导致GET请求失败、469提取提示词幻觉、PG HNSW索引未生效、Safari浏览器语音输入、自定义分割规则输入正则特殊字符导致前端崩溃等问题。此外，配置文件新增Boolean值用于控制功能块可用模型，新增模型logo，旧版config.json配置说明不再维护，需参考新的模型配置方案，初始化脚本用于初始化插件的parentId。

## 升级前要确认的事
需确认旧版config.json配置说明不再维护，需参考新的模型配置方案；若使用本地ReRank模型，需准备镜像registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1；需获取环境变量中的rootkey以及部署的域名；若使用cohere格式的ReRank模型，需提前申请Cohere官方Key。

## 升级步骤（照做）
1. 修改配置文件：新增Boolean值控制功能块可用模型，更新模型logo，参考新的模型配置方案。若使用cohere格式的ReRank模型，需在config.json中添加reRankModels配置，示例如下：
```json
{
  "reRankModels": [
    {
      "model": "rerank-multilingual-v2.0",
      "name": "检索重排",
      "requestUrl": "https://api.cohere.ai/v1/rerank",
      "requestAuth": "Coherer上申请的key"
    }
  ]
}
```
若使用本地ReRank模型，需将镜像更换为registry.cn-hangzhou.aliyuncs.com/fastgpt/bge-rerank-base:v0.1。
2. 升级FastGPT镜像。
3. 执行初始化脚本：从任意终端发起POST请求，替换{{rootkey}}为环境变量中的rootkey，{{host}}为部署域名：
```bash
curl --location --request POST 'https://{{host}}/api/admin/initv47' \
--header 'rootkey: {{rootkey}}' \
--header 'Content-Type: application/json'
```

## 升级后怎么验证
可通过以下方式验证升级效果：检查插件parentId是否初始化完成；测试工具调用模块是否正常运行；测试分类和内容提取的functionCall模式是否生效；测试HTTP插件是否可正常创建；测试ReRank模型是否可正常调用，本地模型确认镜像版本正确，cohere模型确认配置参数无误；检查PG HNSW索引是否生效，搜索速度是否提升；测试Safari浏览器语音输入是否正常；测试自定义分割规则输入正则特殊字符是否不会导致前端崩溃；检查docker部署是否自动初始化副本集；测试浏览器读取文件是否自动推断编码减少乱码；测试GET请求是否可正常发起，确认http请求body不传时传入undefined的问题已修复。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/47)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
