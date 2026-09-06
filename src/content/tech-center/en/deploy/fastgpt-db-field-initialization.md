---
title: Initialize Missing Fields in FastGPT Database Collections
slug: /en/deploy/fastgpt-db-field-initialization
page_type: 版本解读
source: https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40
source_type: 官方文档
---

# Initialize Missing Fields in FastGPT Database Collections

This article records configuration and changes from a historical FastGPT release. Use it to understand that release, and consult the release notes for your installed and target versions before applying dependencies, configuration, or migration steps.

## Purpose of the Database Field Initialization
This administrative procedure resolves schema inconsistencies in three core FastGPT MongoDB collections for deployments tied to FastGPT 40. The script targets documents that are missing mandatory fields, ensuring consistent data structure across the database. All operations safely skip already updated records, so no duplicate data or database corruption will occur during execution.

## Prerequisites for Execution
To run this procedure, you must have direct access to the FastGPT backend MongoDB database, with read and write permissions for the `chats`, `collections`, and `outlinks` collections. All commands must be executed via the official MongoDB shell interface.

## Step-by-Step Command Execution
Run the following three MongoDB JavaScript commands in the specified sequential order. Each command may take an extended period to complete, depending on the total size of your database. If a command fails to finish fully, you may safely re-run it without risk of data issues, as already initialized documents will be automatically skipped.

First, update the `chats` collection:
```js
db.chats.find({ appId: { $exists: false } }).forEach(function (item) {
  db.chats.updateOne(
    {
      _id: item._id
    },
    { $set: { appId: item.modelId } }
  );
});
```

Next, update the `collections` collection:
```js
db.collections.find({ appId: { $exists: false } }).forEach(function (item) {
  db.collections.updateOne(
    {
      _id: item._id
    },
    { $set: { appId: item.modelId } }
  );
});
```

Finally, update the `outlinks` collection:
```js
db.outlinks.find({ shareId: { $exists: false } }).forEach(function (item) {
  db.outlinks.updateOne(
    {
      _id: item._id
    },
    { $set: { shareId: item._id.toString(), appId: item.modelId } }
  );
});
```

> Source: [FastGPT official documentation and source](https://doc.fastgpt.cn/en/self-host/upgrading/outdated/40)
