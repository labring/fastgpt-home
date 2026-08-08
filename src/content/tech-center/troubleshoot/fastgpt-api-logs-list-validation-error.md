---
title: 解决FastGPT调用/api/core/app/logs/list出现Validation error的问题
slug: /zh/troubleshoot/fastgpt-api-logs-list-validation-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6164
source_type: GitHub issue
---

# 解决FastGPT调用/api/core/app/logs/list出现Validation error的问题

## 现象
调用FastGPT的`/api/core/app/logs/list`接口时触发系统意外错误，FastGPT运行日志会输出`{ message: 'Validation error', stack: undefined }`，同时会出现`[Error] 2025-12-30 09:49:49 System unexpected error: /api/core/app/logs/list, Validation error`的报错信息。

## 可能原因
该报错本质为接口参数校验失败，具体触发原因需按实际环境确认，常见可能包括请求缺失必填参数、参数格式不符合接口要求、参数值超出校验范围等。该issue中用户使用的FastGPT版本为4.14.4。

## 排查步骤
1.  查看FastGPT的运行日志，确认报错信息是否包含`System unexpected error: /api/core/app/logs/list, Validation error`以及`message: 'Validation error'`的内容。
2.  核对调用`/api/core/app/logs/list`接口的请求参数，检查是否存在缺失必填参数、参数格式错误或参数值不符合校验规则的情况。
3.  确认当前部署的FastGPT版本，该issue中用户使用的版本为4.14.4，可结合版本信息排查是否存在已知的接口校验问题。
4.  检查相关配置文件，确认与日志查询功能相关的配置项是否正确，需按实际环境确认。

## 解决与验证
1.  根据排查出的具体问题进行针对性修复，例如补充缺失的必填参数、修正参数格式、调整不符合校验规则的参数值。
2.  重新发起对`/api/core/app/logs/list`接口的调用，查看FastGPT日志是否不再出现该Validation error报错。
3.  确认接口返回正常的应用日志列表数据，验证问题已完全解决。

> 来源：https://github.com/labring/FastGPT/issues/6164
