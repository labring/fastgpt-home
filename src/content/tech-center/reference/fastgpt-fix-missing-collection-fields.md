---
title: 为FastGPT的三个集合补全缺失字段的初始化操作
slug: /zh/reference/fastgpt-fix-missing-collection-fields
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/outdated/40
source_type: 官方文档小节
---

# 为FastGPT的三个集合补全缺失字段的初始化操作

## 结论
该操作用于补全FastGPT的chats、collections、outlinks三个集合的缺失字段。执行提供的命令即可完成初始化，执行失败可重复执行命令。

## 具体怎么做
依次执行以下三条命令，命令会自动跳过已完成初始化的数据：
1. 补全chats集合的appId字段：
```javascript
db.chats.find({ appId: { $exists: false } }).forEach(function (item) {
db.chats.updateOne(
{
_id: item._id
},
{ $set: { appId: item.modelId } }
);
});
```
2. 补全collections集合的appId字段：
```javascript
db.collections.find({ appId: { $exists: false } }).forEach(function (item) {
db.collections.updateOne(
{
_id: item._id
},
{ $set: { appId: item.modelId } }
);
});
```
3. 补全outlinks集合的shareId和appId字段：
```javascript
db.outlinks.find({ shareId: { $exists: false } }).forEach(function (item) {
db.outlinks.updateOne(
{
_id: item._id
},
{ $set: { shareId: item._id.toString(), appId: item.modelId } }
);
});
```

## 注意事项
命令执行耗时较长，若执行不成功可重复执行，直至所有数据更新完成。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/outdated/40)
