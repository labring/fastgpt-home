---
title: 解决FastGPT中MoonshotAI渠道调用知识库失败的问题
slug: /zh/troubleshoot/fastgpt-moonshot-kb-call-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1665
source_type: GitHub issue
---

# 解决FastGPT中MoonshotAI渠道调用知识库失败的问题

## 现象
用户使用FastGPT 4.7版本，通过平台的渠道功能添加MoonshotAI渠道，填入可正常在外部调用的sk开头密钥。用户自行验证该密钥可正常使用，但在FastGPT平台内，该渠道的测试环节可正常运行，调用知识库时却出现异常。用户上传了渠道配置与测试环节的相关截图，确认基础密钥配置无误，同时怀疑问题与base-url未设置有关。

## 可能原因
结合用户反馈与FastGPT的渠道配置逻辑，最可能的原因为渠道配置中的base-url参数未正确填写或未配置。当调用知识库时，平台需要通过base-url确定接口的访问地址，若该参数缺失或错误，将导致接口调用失败。

## 排查步骤
1. 登录FastGPT的后台管理界面，进入渠道管理模块，找到已创建的MoonshotAI渠道条目。
2. 点击该渠道的编辑按钮，进入配置详情页面，逐一查看所有配置项。
3. 定位到base-url配置项，检查是否存在该字段，以及字段内是否填写了有效内容。
4. 核对目标接口要求的base-url格式，将正确的接口地址填入对应字段。
5. 保存当前的渠道配置，退出编辑页面后，重新发起知识库调用测试，观察异常是否消失。

## 解决与验证
若经排查确认base-url未配置或配置错误，填入符合官方要求的base-url并保存配置，即可解决知识库调用异常的问题。验证时，可再次发起知识库调用流程，确认对话或文档检索环节可正常完成。同时，可再次执行渠道测试环节，确认密钥与接口配置均正常生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1665)
