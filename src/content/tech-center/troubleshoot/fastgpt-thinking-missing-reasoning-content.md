---
title: 解决FastGPT启用thinking字段后API参数缺失报错问题
slug: /zh/troubleshoot/fastgpt-thinking-missing-reasoning-content
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6357
source_type: GitHub issue
---

# 解决FastGPT启用thinking字段后API参数缺失报错问题

## 现象
私有部署版本4.14.5.1的FastGPT用户按照官方指引配置了`{"thinking": {"type": "enabled"}}`参数后，调用API返回了指定错误信息：
```json
{
  "error": {
    "message": "thinking is enabled but reasoning_content is missing in assistant tool call message at index 3",
    "type": "invalid_request_error"
  }
}
```

## 可能原因
当启用thinking功能时，API校验要求助手工具调用消息必须携带reasoning_content字段。本次报错提示索引3的助手工具调用消息缺失该字段，导致API请求校验失败。具体的消息构造细节需按实际环境确认。

## 排查步骤
1.  定位报错提示的索引3的助手工具调用消息，从API请求的消息列表中找到对应内容。
2.  检查该条消息是否包含reasoning_content字段，确认字段格式与值是否符合规范。
3.  对照官方文档中启用thinking字段后的消息格式要求，核对当前消息结构是否匹配。
4.  需按实际环境确认其他可能影响参数校验的配置项。

## 解决与验证
1.  为索引3的助手工具调用消息补充完整的reasoning_content字段，确保格式正确。
2.  重新发起API请求，验证错误提示是否消失。
3.  若仍存在报错，需逐一检查消息列表中所有助手工具调用消息的格式，确保均符合启用thinking后的要求。
4.  确认所有必要参数无误后，即可正常使用FastGPT的思考功能。

> 来源：https://github.com/labring/FastGPT/issues/6357
