---
title: 解决FastGPT中Python代码调用与集成的相关问题
slug: /zh/troubleshoot/fastgpt-python-code-handling
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1675
source_type: GitHub issue
---

# 解决FastGPT中Python代码调用与集成的相关问题

## 现象
用户希望在FastGPT中添加Python代码处理功能，当前版本仅支持JS代码直接执行。现有实际使用场景中，需在外部编写Python代码，再通过HTTP接口调用完成业务逻辑，操作流程较为繁琐，多名用户反馈该方式存在不便。

## 可能原因
当前FastGPT仅内置支持JS代码的直接执行能力，未提供原生Python代码处理功能。若尝试集成Python执行环境，需运行在沙盘中，仅能使用基础模块，无法支持多数常用框架，实际使用效果受限。官方暂未发布内置Python代码处理的相关功能。

## 排查步骤
1. 确认当前FastGPT版本是否内置Python代码处理功能，需按实际环境确认；
2. 梳理业务需求，判断是否需要通过外部接口调用Python代码；
3. 评估是否可将Python代码转换为JS代码以适配现有平台能力。

## 解决与验证
可通过两种方式实现Python代码的业务需求。第一种是在外部编写Python代码，通过HTTP接口调用完成逻辑执行。第二种是将Python代码转换为JS代码后，直接在FastGPT中使用。若直接使用Python执行环境，仅支持基础模块，无法运行多数框架，建议使用FastAPI调用外部Python服务。验证方式为配置外部HTTP接口调用，测试能否正常返回执行结果，或转换代码后测试执行成功。

> 来源: [FastGPT GitHub issue #1675](https://github.com/labring/FastGPT/issues/1675)
