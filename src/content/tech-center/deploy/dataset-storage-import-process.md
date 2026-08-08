---
title: FastGPT数据集的文件与数据存储及导入流程说明
slug: /zh/deploy/dataset-storage-import-process
page_type: 部署场景
source: https://doc.fastgpt.cn/zh-CN/self-host/design/dataset
source_type: 官方文档
---

# FastGPT数据集的文件与数据存储及导入流程说明

## 文件与数据的存储关系
FastGPT数据集中，文件会存储在MongoDB的FS中，具体业务数据则存储在PostgreSQL内。PostgreSQL的数据表中包含file_id字段，用于关联对应的文件。为兼容旧版本系统，同时支持手动输入、手动标注的数据场景，file_id设置了两个特殊取值：`manual`代表手动输入的数据，`mark`代表手动标注的数据。需要特别注意，file_id仅在插入数据时会被写入，后续对数据进行变更操作时，无法修改该字段的值。

## 文件导入的标准操作流程
按照设计流程，文件导入需依次完成以下步骤：
1. 上传文件至MongoDB的FS存储中，获取对应的file_id，此时该文件的状态被标记为`unused`；
2. 由浏览器解析上传的文件，提取对应文本并生成分块（chunk），为每个分块打上对应的file_id；
3. 点击上传数据按钮，将该文件的状态修改为`used`，并将所有分块数据推送至mongo的training表中等待训练；
4. 系统训练线程从mongo的training表中取出数据，生成向量后将数据插入PostgreSQL数据表。

## 使用边界与易错提示
该数据集设计仅支持通过标准流程关联文件与数据，手动输入或标注的数据无需经过文件上传环节，直接使用对应的特殊file_id即可。当需要调整数据关联的文件时，无法通过修改已有数据的file_id实现，因为该字段不可变更。若需修改关联关系，需重新插入新的数据条目，而非直接修改原有数据的file_id。

> 来源：https://doc.fastgpt.cn/zh-CN/self-host/design/dataset
