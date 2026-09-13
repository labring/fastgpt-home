---
title: 解决FastGPT初始化时JSON5无效字符‘<’报错问题
slug: /zh/troubleshoot/fastgpt-json5-invalid-char-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2693
source_type: GitHub issue
---

# 解决FastGPT初始化时JSON5无效字符‘<’报错问题

## 现象
FastGPT系统启动时出现初始化失败，报错信息为`message: "JSON5: invalid character '<' at 7:1"`。日志显示MongoDB连接正常，系统版本为4.8.7，报错先后在加载chatitems、system_logs、openapi等多个业务模块的过程中出现，同时Next.js服务虽正常启动，但初始化阶段持续抛出该语法错误。

## 可能原因
该报错由JSON5解析器触发语法错误，解析到目标内容的第7行第1位时，遇到了不符合JSON5规范的`<`字符。结合日志中MongoDB连接正常，可排除数据库连接类问题，报错发生在系统初始化加载业务模块的流程中，大概率是加载的配置文件或初始化数据存在非法格式的字符。

## 排查步骤
1.  查看完整错误栈日志，定位触发JSON5解析失败的业务模块名称，如issue中出现的chatitems、systemConfigs等。
2.  检查对应模块初始化时加载的配置文件、初始化数据或外部接口返回内容，确认其格式是否符合JSON5语法规范。
3.  核对当前系统版本（如issue中的4.8.7），确认是否存在版本相关的配置加载缺陷。
4.  检查启动前的环境变量配置，排查是否存在未正确转义的特殊字符或非法格式的配置项。

## 解决与验证
首先定位并修复触发解析错误的非法内容，将`<`字符替换为符合JSON5规范的内容，修正加载的配置文件或初始化数据。随后重启FastGPT服务，查看初始化日志是否不再出现该JSON5语法错误。验证MongoDB连接正常，所有业务模块加载完成，Next.js服务无初始化报错且功能正常。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2693)
