---
title: 获取FastGPT对接钉钉知识库所需的三个配置参数
slug: /zh/reference/fastgpt-dingtalk-dataset-params
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/dataset/third-party/dingtalk_dataset
source_type: 官方文档小节
---

# 获取FastGPT对接钉钉知识库所需的三个配置参数

## 结论
可从钉钉平台获取三个核心参数，用于配置FastGPT对接钉钉知识库。这三个参数分别为App Key、App Secret与User ID。

## 具体怎么做
1. 获取App Key与App Secret：进入钉钉应用详情页左侧的「凭证与基础信息」页面，复制Client ID作为FastGPT的App Key，复制Client Secret作为FastGPT的App Secret。
2. 获取User ID：
   2.1 登录钉钉管理后台（oa.dingtalk.com），进入「通讯录」-「成员管理」页面。
   2.2 找到指定操作成员，点击进入成员详情页，复制该成员的User ID。若详情页未展示User ID，可导出成员列表表格获取。

## 注意事项
1. App Secret属于密钥，请勿公开发送。
2. User ID不等于手机号、姓名或unionId。
3. 建议使用专门的钉钉成员作为FastGPT同步账号，并授予目标知识库只读权限。
4. 该成员无权限访问的钉钉知识库，不会出现在FastGPT的添加文件列表中。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/dataset/third-party/dingtalk_dataset)
