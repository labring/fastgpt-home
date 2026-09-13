---
title: FastGPT工作流HTTP获取失败问题排查与解决指南
slug: /zh/troubleshoot/fastgpt-http-failure-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/852
source_type: GitHub issue
---

# FastGPT工作流HTTP获取失败问题排查与解决指南

## 现象
用户在使用FastGPT工作流时，出现HTTP获取失败报错。涉及的工作流模块包含用户问答入口模块（moduleId: 7z5g5h）和问题分类模块（moduleId: remuj3），其中问题分类模块指定使用gpt-3.5-turbo作为分类模型，部分输入项未配置连接。

## 可能原因
结合工作流配置信息，可能的触发因素包括：1. 工作流模块的输入连接未正确配置；2. 问题分类模块的模型参数不符合当前环境的可用范围；3. 外部服务调用的相关配置存在异常。用户已确认自身密钥可正常使用，可优先排查前两项原因。

## 排查步骤
1. 导出当前工作流的完整配置，核对各模块输入项的`connected`字段状态，比如问题分类模块的switch和model输入项的connected字段为false，需确认必要的输入是否已正确连接到上游模块的输出。
2. 检查问题分类模块的模型参数配置，确认指定的模型是否在当前密钥支持的模型列表中。
3. 查看系统返回的HTTP错误详情，记录具体的错误码和提示信息。
4. 核对工作流中各模块的`flowType`、`position`等配置是否符合平台要求。

## 解决与验证
1. 补全未连接的输入项，确保所有必填输入都已正确关联上游模块的输出。
2. 调整问题分类模块的模型参数，替换为当前密钥支持的可用模型。
3. 重新发布工作流，触发测试流程，确认HTTP获取失败的报错不再出现。
4. 验证工作流的问答链路是否正常运行，输出结果符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/852)
