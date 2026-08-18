---
title: FastGPT数据集文件与数据的设计方案及导入流程
slug: /zh/deploy/fastgpt-dataset-design-flow
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/design/dataset
source_type: 官方文档
---

# FastGPT数据集文件与数据的设计方案及导入流程

## 文件与数据的存储关系
FastGPT 数据集采用分离式存储设计，文件数据与业务数据分别存储在不同数据库中。其中，原始文件会存储在 MongoDB 的 FS 模块中，而具体的业务数据则存储在 PostgreSQL 数据库内。PostgreSQL 中的业务数据包含 `file_id` 字段，用于关联对应的原始文件。为兼容旧版本并支持手动输入、标注数据场景，`file_id` 预设了两个特殊取值：`manual` 代表手动输入的业务数据，`mark` 代表手动标注的业务数据。需要注意的是，`file_id` 仅在插入数据时会被写入，后续对数据进行变更操作时无法修改该字段的值。

## 文件导入操作流程
你可以按照以下标准流程完成数据集文件导入：
1. 上传目标文件到 MongoDB 的 FS 存储模块，获取对应的 `file_id`，此时该文件的状态被标记为 `unused`；
2. 通过浏览器解析上传的文件，提取文件内的文本内容并分割为多个 chunk，为每个 chunk 打上获取到的 `file_id`；
3. 点击上传数据按钮，将该文件的状态修改为 `used`，同时将分割后的 chunk 数据推送到 MongoDB 的 `training` 表中，等待训练线程处理；
4. 由系统内置的训练线程从 MongoDB 的 `training` 表中读取数据，在生成向量后将数据插入到 PostgreSQL 数据库中。

## 页面辅助说明
该页面提供了快捷编辑入口，你可以在 GitHub 上直接编辑当前文档内容。本页的核心导航内容包含文件与数据的关系说明、文件导入流程详解两个部分，方便你快速定位所需信息。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/zh-CN/self-host/design/dataset)
