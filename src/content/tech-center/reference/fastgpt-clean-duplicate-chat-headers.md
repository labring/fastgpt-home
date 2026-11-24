---
title: FastGPT升级后清理重复Chat会话头的操作方法
slug: /zh/reference/fastgpt-clean-duplicate-chat-headers
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41507
source_type: 官方文档小节
---

# FastGPT升级后清理重复Chat会话头的操作方法

## 结论
该脚本用于解决FastGPT升级后，因appId+chatId重复的Chat会话头导致唯一索引创建失败的问题。清理逻辑为按appId+chatId分组，保留每组中updateTime最新的会话头；若updateTime相同，则保留_id最大的一条记录。

## 具体怎么做
1. 脚本位置为`projects/app/src/pages/api/admin/dataClean/cleanupDuplicateChats.ts`，仅用于本次升级迁移，不对外提供OpenAPI服务。
2. 先执行dry-run模式扫描重复数据，仅返回统计结果和样本，不删除数据，使用以下curl命令：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/cleanupDuplicateChats' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":true,"sampleLimit":20}'
```
3. 查看返回的重复组数量、预计删除数量等统计结果，确认无误后，修改`dryRun`参数为`false`，执行实际删除操作，命令如下：
```bash
curl -X POST 'https://你的域名/api/admin/dataClean/cleanupDuplicateChats' \
-H 'Content-Type: application/json' \
-H 'rootkey: 你的ROOT_KEY' \
-d '{"dryRun":false,"sampleLimit":20}'
```
4. 接口参数说明如下：
| 参数名 | 类型 | 默认值 | 说明 |
| ---- | ---- | ---- | ---- |
| dryRun | boolean | true | 是否仅扫描统计不删除数据 |
| sampleLimit | number | 20 | 返回重复组样本数量，取值范围0~100 |

## 注意事项
1. 该接口仅用于本次升级迁移，不得作为对外OpenAPI接口使用。
2. 非dry-run模式下仅删除重复的chats会话头，不会删除chatitems和chat_item_responses中的消息内容。
3. 需使用正确的rootkey进行接口调用，否则会导致请求失败。
4. sampleLimit参数的取值范围为0~100，超出范围可能导致接口异常。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41507)
