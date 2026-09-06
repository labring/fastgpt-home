---
title: 解决FastGPT同chatid多轮对话部分回复无日志记录问题
slug: /zh/troubleshoot/fastgpt-missing-chat-log
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5413
source_type: GitHub issue
---

# 解决FastGPT同chatid多轮对话部分回复无日志记录问题

## 现象
FastGPT 4.9.14版本中，同一chatid下的多轮对话，某次AI回复在客户端正常展示，但控制台的【对话日志】无记录，通过MongoDB以text.content为关键字检索也无法找到该对话记录。

## 可能原因
暂未明确指向的已知原因，需结合实际部署环境与配置进行排查。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.9.14，核对问题出现时的版本一致性。
2.  提取客户端展示的对话对应的chatid，确认该chatid的多轮对话中仅部分回复无日志记录。
3.  登录MongoDB数据库，使用text.content作为关键字执行检索，验证是否无法检索到对应对话内容。
4.  核对控制台【对话日志】页面的筛选条件，确认未过滤掉对应chatid或对话类型的日志。

## 解决与验证
无公开的明确解决方案。若该问题仍需解决，可重新发起相关issue并补充实际部署环境与配置信息。

> 来源: [FastGPT GitHub issue #5413](https://github.com/labring/FastGPT/issues/5413)
