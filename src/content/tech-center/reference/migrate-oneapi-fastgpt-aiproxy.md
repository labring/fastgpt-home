---
title: 将OneAPI渠道配置迁移到FastGPT AI Proxy的操作方法
slug: /zh/reference/migrate-oneapi-fastgpt-aiproxy
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/config/model/intro
source_type: 官方文档小节
---

# 将OneAPI渠道配置迁移到FastGPT AI Proxy的操作方法

## 结论
可以通过发起HTTP请求完成OneAPI渠道配置到FastGPT AI Proxy的迁移。执行成功的请求会返回{"success": true}。

## 具体怎么做
1. 准备参数：将`{{host}}`替换为AI Proxy地址，`{{admin_key}}`替换为AI Proxy中ADMIN_KEY的值，准备好OneAPI的MySQL连接串作为`dsn`参数。
2. 构造POST请求，请求地址为`{{host}}/api/channels/import/oneapi`。
3. 设置请求头：`Authorization: Bearer {{admin_key}}`，`Content-Type: application/json`。
4. 发起请求，示例命令如下：
```bash
curl --location --request POST '{{host}}/api/channels/import/oneapi' \
--header 'Authorization: Bearer {{admin_key}}' \
--header 'Content-Type: application/json' \
--data-raw '{
"dsn": "mysql://root:s5mfkwst@tcp(dbconn.sealoshzh.site:33123)/mydb"
}'
```

## 注意事项
1. 该脚本仅做简单数据映射，仅迁移代理地址、模型和API密钥。
2. 迁移完成后建议手动检查配置。
3. 脚本并非完全准确，存在局限性。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/config/model/intro)
