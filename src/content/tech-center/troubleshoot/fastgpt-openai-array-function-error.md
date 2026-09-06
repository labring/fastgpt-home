---
title: 解决FastGPT中OpenAI调用时array类型函数参数报错的问题
slug: /zh/troubleshoot/fastgpt-openai-array-function-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3915
source_type: GitHub issue
---

# 解决FastGPT中OpenAI调用时array类型函数参数报错的问题

## 现象
用户在FastGPT公有云版本中使用文本提取插件，将提取字段类型定义为array时，调用OpenAI模型出现报错。完整报错信息如下：
```json
{
  "message": "400 Invalid schema for function 'request_function': 'arrayString' is not valid under any of the given schemas.  (request id: 20250227175442629703633FbOwSv5c) (request id: 2025022717544254070662477464582) (request id: 20250227175442518589431mUdLX6qk) (request id: 2025022709544251055230632216198)",
  "name": "Error",
  "code": "invalid_function_parameters",
  "status": 400
}
```
该报错状态码为400，错误类型为invalid_function_parameters。同一配置下使用Qwen模型无异常。

## 可能原因
该报错源于OpenAI API对函数调用参数schema的严格校验。当FastGPT配置的array类型函数参数使用了不符合OpenAI官方规范的标识（如报错中的arrayString）时，无法匹配OpenAI预设的校验规则，因此返回400错误。Qwen模型可正常处理该配置，说明问题仅与OpenAI的参数校验逻辑相关，与FastGPT的插件基础功能无关。

## 排查步骤
1.  确认当前使用FastGPT公有云版本，且已验证绑定的OpenAI密钥可正常调用接口。
2.  定位触发报错的文本提取插件，查看其中提取字段的配置，确认是否将字段类型设置为array。
3.  调取完整报错日志，核对是否包含“invalid_function_parameters”状态码400，以及“arrayString 不符合给定schemas”的提示内容。
4.  对照OpenAI官方函数调用schema规范，检查array类型参数的定义格式是否符合要求。

## 解决与验证
调整FastGPT中文本提取插件的array类型字段配置，将不符合OpenAI校验规则的参数标识替换为符合官方规范的格式。保存配置后，重新调用OpenAI模型发起文本提取请求。验证时可观察是否不再出现400报错，且插件可正常返回array类型的提取结果。同一配置下Qwen模型仍可正常运行，无需额外调整。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3915)
