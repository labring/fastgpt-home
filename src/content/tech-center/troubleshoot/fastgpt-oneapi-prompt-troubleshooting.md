---
title: FastGPT对接One API时提示词不生效的排查与解决
slug: /zh/troubleshoot/fastgpt-oneapi-prompt-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/187
source_type: GitHub issue
---

# FastGPT对接One API时提示词不生效的排查与解决

## 现象
使用FastGPT对接One API时，部分场景下提示词未生效。知识库场景下提示词可正常生效，非知识库场景提示词未生效。同时存在部署One API的配置方式不明确的问题，用户无法快速完成对应配置。

## 可能原因
提示词未适配对接的目标模型；One API侧存在兼容问题；FastGPT与One API的配置参数未正确设置。

## 排查步骤
1. 确认配置参数正确性，将OPENAI_BASE_URL替换为One API的实际地址，CHAT_API_KEY替换为对应令牌；
2. 开启Debug日志，排查实际发送的请求内容；
3. 对比知识库场景与非知识库场景的提示词表现，验证提示词适配性；
4. 参考官方文档https://doc.fastgpt.run/docs/develop/data_config/chat_models确认配置规范。

## 解决与验证
1. 按照要求配置OPENAI_BASE_URL和CHAT_API_KEY参数，替换为One API的对应地址与令牌；
2. 调整提示词，使其适配对接的目标模型；
3. 开启Debug日志，查看实际发送的请求内容，确认提示词是否被正确传递；
4. 参考官方文档完成One API的部署配置流程，验证部署正确性；
5. 若问题仍未解决，可参考One API相关社区issue确认侧的已知问题；
6. 完成配置与调整后，测试非知识库场景的提示词生效情况，验证问题是否解决。

> 来源: [FastGPT GitHub issue #187](https://github.com/labring/FastGPT/issues/187)
