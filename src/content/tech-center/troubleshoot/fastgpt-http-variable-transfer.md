---
title: 解决FastGPT中HTTP模块处理后变量无法正确传递的问题
slug: /zh/troubleshoot/fastgpt-http-variable-transfer
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1307
source_type: GitHub issue
---

# 解决FastGPT中HTTP模块处理后变量无法正确传递的问题

## 现象
用户在FastGPT V4.8-preview2私有部署版本中，配置HTTP外部脚本处理带自定义指令的用户输入。例如输入`-ty 最近AI有什么大事件`，HTTP脚本返回正确的JSON格式响应`{"message": "最近AI有什么大事件"}`。但后续模块引用该处理后的变量时，无论使用`{{message}}`语法还是手动选择字段，获取到的始终是用户原始输入内容`-ty 最近AI有什么大事件`，没有得到处理后的文本。

## 可能原因
该问题的核心可能在于HTTP模块的输出变量未被正确绑定到后续流程的上下文变量中，具体原因需结合应用的流程配置确认。

## 排查步骤
1.  进入对应应用的流程编辑页面，找到配置的HTTP外部脚本模块，确认其自定义输出的字段名称为`message`，且格式设置为字符串类型。
2.  检查后续模块的变量引用方式，确认是否使用了正确的变量语法`{{message}}`，或手动选择了HTTP模块的`message`输出字段。
3.  查看HTTP模块的响应日志，确认外部脚本返回的JSON格式是否正确，是否包含`message`字段且值为处理后的用户提示内容。
4.  确认应用使用的版本为V4.8-preview2私有部署版本，排查版本兼容性问题（需按实际环境确认）。

## 解决与验证
若HTTP模块的输出配置正确，需将后续模块的输入源设置为HTTP模块的`message`输出字段，不要直接引用原始用户输入。验证流程如下：
1.  重新发布应用，使用包含自定义指令的用户输入触发流程。
2.  查看后续模块的输入内容，确认是否为处理后的文本内容。
3.  若仍未生效，可检查应用的流程链路是否存在变量覆盖或错误的变量引用路径。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1307)
