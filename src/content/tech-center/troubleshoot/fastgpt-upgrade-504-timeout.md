---
title: FastGPT升级至4.14.8+版本后调用模型504超时的排错方法
slug: /zh/troubleshoot/fastgpt-upgrade-504-timeout
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6563
source_type: GitHub issue
---

# FastGPT升级至4.14.8+版本后调用模型504超时的排错方法

## 现象
用户在FastGPT 4.14.7版本可正常运行的多文档汇总应用，升级至4.14.8或4.14.8.3版本后，调用模型时返回504错误。日志显示fastgpt模块多数API请求返回200状态码，而aiproxy模块报错：`handle failed: status code: 504, error: {{bad_response <html>\n<head><title>504 Gateway Time-out</title></head>\n<body>\n<center><h1>504 Gateway Time-out</h1></center>\n<hr><center>nginx/1.24.0 (Ubuntu)</center>\n</body>\n</html>\n upstream_error 504}}`。

## 可能原因
该问题仅出现在FastGPT升级至4.14.8或4.14.8.3版本后，结合报错信息，可能与模型调用的超时配置、代理层（如nginx）的超时设置或上游模型服务响应延迟有关，具体根原因需按实际环境确认。

## 排查步骤
1.  查看fastgpt与aiproxy模块的完整日志，确认504报错触发的具体API请求与参数。
2.  检查nginx的超时配置，确认`proxy_connect_timeout`、`proxy_read_timeout`等参数是否过短，无法覆盖模型调用的正常响应时长。
3.  验证上游模型服务的可用性与响应时长，确认是否存在服务卡顿或响应超时的情况。
4.  回退至4.14.7版本，验证原多文档汇总应用是否可正常运行，确认问题与版本升级直接相关。

## 解决与验证
1.  调整nginx的超时配置，适当延长`proxy_connect_timeout`、`proxy_read_timeout`参数值，需结合实际模型调用时长调整。
2.  检查FastGPT及aiproxy的环境变量配置，确认模型调用的超时参数未被错误限制。
3.  重新启动FastGPT与相关代理服务，调用原多文档汇总应用，验证504错误是否消失。
4.  若调整配置后问题仍未解决，可回退至4.14.7版本临时恢复业务运行。

> 来源：https://github.com/labring/FastGPT/issues/6563
