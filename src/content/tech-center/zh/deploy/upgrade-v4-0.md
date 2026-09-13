---
title: FastGPT V4.0从旧版本升级的完整操作指引
slug: /zh/deploy/upgrade-v4-0
page_type: 部署与升级
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40
source_type: 官方文档
---

# FastGPT V4.0从旧版本升级的完整操作指引

## 这个版本改了什么
FastGPT V4.0版本对MongoDB数据库表结构和字段进行了较大调整，同时新增了专用初始化API接口，用于完成旧版本数据向V4.0版本的适配迁移。

## 升级前要确认的事
需提前连接目标MongoDB数据库。MongoDB会自动创建空表apps和outlinks，需先手动删除这两个空表，再执行后续操作。需准备好环境变量中的rootkey，用于后续API请求的headers验证。

## 升级步骤（照做）
1. 重命名表名：连接MongoDB数据库，执行以下两条命令：
```js
db.models.renameCollection('apps');
db.sharechats.renameCollection('outlinks');
```
2. 初始化表中字段：依次执行以下3条MongoDB命令，执行过程耗时较长，执行失败可重复执行（会自动跳过已完成初始化的数据），直至所有数据更新完成：
```js
db.chats.find({ appId: { $exists: false } }).forEach(function (item) {
  db.chats.updateOne(
    {
      _id: item._id
    },
    { $set: { appId: item.modelId } }
  );
});

db.collections.find({ appId: { $exists: false } }).forEach(function (item) {
  db.collections.updateOne(
    {
      _id: item._id
    },
    { $set: { appId: item.modelId } }
  );
});

db.outlinks.find({ shareId: { $exists: false } }).forEach(function (item) {
  db.outlinks.updateOne(
    {
      _id: item._id
    },
    { $set: { shareId: item._id.toString(), appId: item.modelId } }
  );
});
```
3. 初始化API：部署新版FastGPT项目后，携带`headers.rootkey`（即环境变量中的rootkey）发起3个HTTP请求：
   1. https://xxxxx/api/admin/initv4
   2. https://xxxxx/api/admin/initChat
   3. https://xxxxx/api/admin/initOutlink
其中前两个请求可能因内存不足失败，可重复执行。

## 升级后怎么验证
可通过以下方式验证升级是否成功：1. 检查MongoDB中apps表已重命名为models，outlinks表已重命名为sharechats；2. 查看chats、collections、outlinks表，确认已正确生成appId字段，outlinks表已生成shareId字段；3. 访问FastGPT对应业务功能，确认知识库、聊天对话、分享链接功能可正常使用。

> 来源： [FastGPT 官方来源](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40)

## 适用性与版本范围

本页适用于官方来源记录的 部署与升级 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
