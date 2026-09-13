---
title: 解决FastGPT企业微信客服自动回复消息发送失败问题
slug: /zh/troubleshoot/fastgpt-wework-reply-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/643
source_type: GitHub issue
---

# 解决FastGPT企业微信客服自动回复消息发送失败问题

## 现象
用户在使用FastGPT配置企业微信客服自动回复时，生成回复内容后发送消息失败。报错日志显示：`2023-12-20 19:43:21 - 私聊发送消息失败 Error: 13 INTERNAL: WorkproErrorCode: 23060, processSendMsgRsp(7881299811924697) contentType: Unknown send message failed! cgi error code: (-4014)`。示例回复内容为`{"type":1,"content":"哈哈\n-----------\n抱歉，我无法理解您的问题，请提供更具体的信息或者问题，以便我能够帮助您。"}`。

## 可能原因
根据报错日志中的`contentType: Unknown`和`cgi error code: -4014`、`WorkproErrorCode:23060`提示，推测发送的消息内容包含了企业微信客服接口不支持的特殊格式，例如示例中的分割线`-----------`与多行换行组合，导致接口无法识别消息类型。

## 排查步骤
1. 导出当前配置的企业微信客服自动回复消息内容，对照示例中的格式，检查是否包含分割线、非常规换行等特殊字符。
2. 核对报错日志中的错误码参数：WorkproErrorCode:23060、cgi error code: -4014，确认错误指向的内容格式问题。
3. 检查FastGPT中企业微信客服的消息发送相关配置，确认是否存在格式转换或过滤的设置项，需按实际环境确认配置是否正确。

## 解决与验证
1. 修改自动回复消息内容，移除如`-----------`这类分割线，调整换行格式为符合接口要求的单行或标准换行。
2. 重新触发客户咨询流程，测试自动回复消息是否能正常发送。
3. 查看运行日志，确认不再出现`13 INTERNAL: WorkproErrorCode: 23060`相关的报错信息，验证问题已解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/643)
