---
title: FastGPT商业版飞书知识库的配置与导入使用方法
slug: /zh/integration/fastgpt-lark-dataset-setup
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/lark_dataset
source_type: 官方文档
---

# FastGPT商业版飞书知识库的配置与导入使用方法

### 功能说明与限制
FastGPT v4.8.16版本起，商业版用户支持飞书知识库导入功能。当前功能处于测试阶段，部分交互有待优化。受飞书限制，仅可获取共享空间下文件目录的云文档内容，无法获取个人空间和知识库内的内容，且仅支持导入云文档类型的内容。

### 配置与导入步骤
按照以下流程完成配置与导入：
1. 创建飞书应用：打开飞书开放平台，点击"创建应用"，选择"自建应用"并填写应用名称。
2. 配置应用权限：进入创建的应用，添加3项必填权限：获取云空间文件夹下的云文档清单、查看新版文档、查看、评论、编辑和管理云空间中所有文件。
3. 获取appId和appSecret：从飞书应用后台获取对应参数。
4. 给Folder增加权限：参考飞书官方教程，将创建的应用拉入群聊并为该群赋予目录权限；若目标目录已给全员组授权，可跳过此步骤。
5. 获取Folder Token：从目标文件夹的页面路径中提取Token，注意不要复制路径中的问号。
6. 创建知识库：在FastGPT后台选择飞书文件库类型，填入获取到的appId、appSecret、Folder Token三个参数，点击创建即可完成知识库搭建。

### 补充说明
配置过程中需确保权限配置正确，否则会出现无法获取文档内容的问题。当前功能的交互细节仍在优化中，使用过程中可关注官方更新。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/lark_dataset
