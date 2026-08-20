---
title: FastGPT从旧版本升级到V4.0的操作步骤与注意事项
slug: /zh/deploy/fastgpt-old-v4-upgrade
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40
source_type: 官方文档
---

# FastGPT从旧版本升级到V4.0的操作步骤与注意事项

FastGPT从旧版本升级到V4.0时，由于新版对MongoDB数据库的表结构进行了较大调整，需通过数据库脚本与API初始化操作完成数据适配，确保系统功能正常运行。

### 数据库初始化操作
首先需连接MongoDB数据库，先手动删除MongoDB自动创建的空表apps与outlinks，再执行两条表重命名命令：
```
db.models.renameCollection(apps);
db.sharechats.renameCollection(outlinks);
```
完成表重命名后，依次执行3条字段初始化命令，该操作耗时较长，若执行失败可重复执行（会自动跳过已初始化的数据），直至所有数据更新完成：
```
db.chats.find({ "appId": { $exists: false } }).forEach(function (item) { db.chats.updateOne({ _id: item._id }, { $set: { "appId": item.modelId } }); });
db.collections.find({ "appId": { $exists: false } }).forEach(function (item) { db.collections.updateOne({ _id: item._id }, { $set: { "appId": item.modelId } }); });
db.outlinks.find({ "shareId": { $exists: false } }).forEach(function (item) { db.outlinks.updateOne({ _id: item._id }, { $set: { "shareId": item._id.toString(), "appId": item.modelId } }); });
```

### API初始化操作
部署新版项目后，需发起3个HTTP请求，请求需携带`headers.rootkey`，该值为环境变量中配置的rootkey。三个请求地址分别为：`https://xxxxx/api/admin/initv4`、`https://xxxxx/api/admin/initChat`、`https://xxxxx/api/admin/initOutlink`。若执行过程中因内存不足导致请求失败，可重复执行对应请求。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/outdated/40)
