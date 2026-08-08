---
title: FastGPT商业版对接飞书知识库的配置与使用指南
slug: /zh/integration/fastgpt-lark-knowledgebase-setup
page_type: 集成与发布渠道
source: https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/lark_dataset
source_type: 官方文档
---

# FastGPT商业版对接飞书知识库的配置与使用指南

## 功能概述与使用边界
该功能仅在FastGPT v4.8.16及以上商业版中可用，用于对接飞书知识库实现文档导入。受飞书接口限制，无法直接获取所有文档内容，仅支持获取共享空间下文件目录的云文档，无法读取个人空间和飞书知识库内的内容，且仅支持导入云文档类型的文件。当前功能处于测试阶段，部分交互有待优化。

## 详细配置与导入步骤
1.  创建飞书应用：打开飞书开放平台，点击「创建应用」，选择「自建应用」，填写应用名称完成创建。
2.  配置应用权限：进入已创建的应用后台，添加3项必填权限：获取云空间文件夹下的云文档清单、查看新版文档、查看、评论、编辑和管理云空间中所有文件。
3.  获取appId和appSecret：从飞书开放平台的应用详情页面，获取应用的appId与appSecret参数。
4.  给Folder增加权限：参考飞书官方教程，将刚创建的飞书应用拉入群聊，并为该群授予目标目录的权限；若目标目录已给全员组授予权限，可跳过此步骤。
5.  获取Folder Token：从飞书文档目录的页面路径中提取Folder Token，注意不要复制路径中的问号字符。
6.  创建FastGPT知识库：进入FastGPT的知识库创建页面，选择「飞书文件库」类型，填入获取到的appId、appSecret和Folder Token三个参数，点击「创建」即可完成配置。

## 易错点与使用限制
配置过程中需注意，权限配置错误会导致无法正常获取文档内容；提取Folder Token时，若误包含路径中的问号，会导致参数无效无法创建知识库。当需要对接飞书个人空间或飞书知识库内的文档时，无法使用该功能；若仅需导入非云文档类型的内容，也不适用此配置方式。

> 来源：https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/lark_dataset
