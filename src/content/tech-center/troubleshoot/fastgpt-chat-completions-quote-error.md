---
title: FastGPT v1/chat/completions接口detail与stream为true时引用详情返回异常的排查解决
slug: /zh/troubleshoot/fastgpt-chat-completions-quote-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6976
source_type: GitHub issue
---

# FastGPT v1/chat/completions接口detail与stream为true时引用详情返回异常的排查解决

## 现象
将FastGPT从4.16.8版本升级至最新版本后，调用`v1/chat/completions`接口且参数`detail`与`stream`均设置为`true`时，未按照旧版本的逻辑返回引用详情。当前接口返回的`quoteList`字段中存在不完整的内容，例如包含未闭合的JSON结构与截断的问答片段：`不是[{"id":"654f2e49b64caef1d9431e8b","q":"电影《铃芽之旅》的导演是谁？","a":"电影《铃芽之旅》的导演是新海诚!`。

## 可能原因
目前官方未明确该问题的直接根因，结合问题出现的场景推测，可能与版本升级后接口返回逻辑的重构、引用详情的处理规则变更有关。具体的根原因需结合项目代码提交记录与版本更新日志进一步确认，需按实际部署环境排查。

## 排查步骤
1. 确认当前FastGPT的具体版本号，对比从4.16.8升级到的最新版本的变更日志。
2. 调用`v1/chat/completions`接口时，检查参数`detail`与`stream`是否均设置为`true`，确认参数配置无误。
3. 查看接口返回的原始响应内容，核对`quoteList`字段的完整性，确认是否存在文本截断、格式错误或内容缺失的情况。
4. 查阅官方文档中`v1/chat/completions`接口的返回规则，确认引用详情的返回逻辑是否有更新或调整。
5. 检查部署环境的配置文件，确认未修改影响接口返回结果的相关参数。

## 解决与验证
若该问题由版本升级带来的接口逻辑变更导致，可参考官方最新版本的更新说明调整接口调用逻辑；若为返回格式异常，可尝试重新配置引用详情的返回参数，或回退至4.16.8版本验证问题是否复现。验证方式为：调用`v1/chat/completions`接口并设置`detail`、`stream`为`true`，检查返回的`quoteList`字段是否完整包含预期的引用详情，无截断或格式错误。

> 来源：[FastGPT GitHub Issue #6976](https://github.com/labring/FastGPT/issues/6976)
