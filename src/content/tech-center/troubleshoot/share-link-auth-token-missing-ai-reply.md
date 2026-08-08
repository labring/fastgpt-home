---
title: 解决FastGPT分享链接带authToken后历史对话无AI回复
slug: /zh/troubleshoot/share-link-auth-token-missing-ai-reply
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6796
source_type: GitHub issue
---

# 解决FastGPT分享链接带authToken后历史对话无AI回复

## 现象
用户使用私有部署版本v4.14.7的FastGPT，通过带有authToken的分享链接（格式如`https://fastgpt.xxx.com/chat/share?shareId=xxxx&authToken=my_token`）打开对话框时，历史对话仅展示用户提问的信息，无法显示AI回复的内容。

## 可能原因
由于该issue未明确具体根因，需按实际环境从三个关联方向排查：一是分享链接携带的authToken校验逻辑；二是历史对话数据的存储或读取链路；三是部署环境的访问权限配置。

## 排查步骤
1.  确认当前使用的FastGPT私有部署版本为v4.14.7，核对分享链接格式是否符合示例，确保shareId和authToken参数均有效且未被篡改。
2.  登录FastGPT后台管理界面，检查对应分享会话的配置信息，确认该会话已保存用户提问与AI回复的对话数据。
3.  查看FastGPT服务的运行日志，搜索与authToken校验、历史对话数据读取相关的报错信息（若存在）。
4.  检查部署环境的网络访问权限，确认前端页面能够正常调用后端的对话数据查询接口。

## 解决与验证
若排查发现authToken校验逻辑存在问题，需按照官方文档修正对应配置；若为历史对话数据存储或读取异常，需检查数据库连接与数据完整性；若为权限配置问题，需调整部署环境的访问策略。验证方式为：重新使用带有有效authToken的分享链接打开对话框，查看历史对话是否同时展示用户提问与AI回复的内容。

> 来源：https://github.com/labring/FastGPT/issues/6796
