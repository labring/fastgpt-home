---
title: FastGPT数据集单条数据删除API的使用说明
slug: /zh/api/fastgpt-dataset-single-data-delete
page_type: API
source: https://doc.fastgpt.cn/zh-CN/openapi/dataset
source_type: 官方文档
---

# FastGPT数据集单条数据删除API的使用说明

本小节提供FastGPT数据集单条数据删除的API调用规范，用于通过接口自动化移除数据集中指定的单条数据，替代手动在平台界面进行删除操作，适用于批量数据维护、自动化数据清理等场景。该接口仅支持DELETE请求方式，需通过指定的API路径发起调用。

### 请求调用示例
标准调用需使用curl命令，需替换示例中的占位符为实际参数。完整请求示例如下：
```bash
curl --location --request DELETE 'http://localhost:3000/api/core/dataset/data/delete?id=65abd4b39d1448617cba624d' \
--header 'Authorization: Bearer {{authorization}}' \
```
其中`{{authorization}}`需替换为实际获取的访问令牌，`id`参数后的字符串为示例数据ID，实际调用时需替换为待删除数据的真实ID。

### 参数与响应说明
请求仅需通过URL查询字符串传递单个参数`id`，该参数为待删除数据的唯一标识ID，是调用接口的必填参数。
当请求成功完成时，将返回标准JSON格式的响应数据，示例如下：
```json
{
  "code": 200,
  "statusText": "",
  "message": "",
  "data": "success"
}
```
响应中`code`字段值为200时，表示删除操作成功，`data`字段返回固定字符串`success`，其余字段默认返回空字符串。若请求参数缺失或无效，将返回对应错误码与错误信息，具体内容需根据实际调用环境确定。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/openapi/dataset)

## 适用性与版本范围

本页适用于官方来源记录的 API 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
