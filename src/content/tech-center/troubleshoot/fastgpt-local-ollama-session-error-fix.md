---
title: FastGPT本地Ollama模型AI会话界面报错排查与解决
slug: /zh/troubleshoot/fastgpt-local-ollama-session-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1998
source_type: GitHub issue
---

# FastGPT本地Ollama模型AI会话界面报错排查与解决

## 现象
本地部署的Ollama大模型在知识库导入、检索环节可正常运行，但在AI会话界面出现报错。用户修改config.json配置文件后出现该问题，此前配置可正常使用，因多次调整参数导致配置混乱。报错伴随对话接口异常，部分场景返回为空，且存在max response参数设置为2000的情况。

## 可能原因
因修改config.json配置文件导致参数配置异常，或相关参数阈值、依赖版本不符合模型调用的要求，已知该问题与config.json的参数修改直接相关，同时涉及max response参数的设置以及相关组件的版本匹配问题。

## 排查步骤
1. 回滚config.json的修改，逐步恢复至可正常运行的配置版本，逐一排查修改过的参数，定位引发报错的具体配置项。
2. 检查max response参数的设置值，确认其未超出模型或系统允许的合理范围。
3. 确认相关组件的版本，匹配推荐的版本号。
4. 分别测试知识库导入、检索与AI会话功能，验证异常场景是否复现。

## 解决与验证
将oneapi版本调整至0.6.7。调整配置至合理范围后，重新测试AI会话界面的模型调用，确认报错消失，知识库导入、检索及会话功能均恢复正常运行。

> 来源: [FastGPT GitHub issue #1998](https://github.com/labring/FastGPT/issues/1998)
