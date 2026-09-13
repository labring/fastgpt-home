---
title: 解决FastGPT集成百度智能云千帆重排服务的相关配置问题
slug: /zh/troubleshoot/fastgpt-qianfan-rerank-config
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1977
source_type: GitHub issue
---

# 解决FastGPT集成百度智能云千帆重排服务的相关配置问题

## 现象
在FastGPT中集成百度智能云千帆重排序服务时，出现调用失败、返回结果不符合预期或功能无法正常启用的问题。

## 可能原因
1.  未在百度智能云千帆大模型平台开通bce-reranker服务。
2.  未正确配置百度千帆的Access Key与Secret Key。
3.  本地部署的重排接口格式与FastGPT的接入要求不匹配。
4.  FastGPT配置的认证令牌与本地脚本的认证设置不一致。

## 排查步骤
1.  登录百度智能云千帆大模型平台，确认已开通bce-reranker服务，查看服务状态是否正常。
2.  登录百度智能云管理中心，创建并复制有效的Access Key与Secret Key，记录相关信息。
3.  检查本地脚本中配置的`QIANFAN_ACCESS_KEY`和`QIANFAN_SECRET_KEY`，确保与实际获取的AK/SK完全一致。
4.  确认本地脚本的`/v1/rerank`接口路径与FastGPT中配置的接口地址一致。
5.  核对FastGPT配置的认证令牌与脚本中`env_bearer_token`的取值是否相同。
6.  单独运行本地脚本，使用测试请求调用`/v1/rerank`接口，检查返回的重排结果格式是否符合预期。若出现异常，需按实际环境确认具体问题。

## 解决与验证
1.  按照百度智能云的指引完成bce-reranker服务的开通流程，确保服务处于可用状态。
2.  将正确的AK/SK填入本地脚本的对应位置，替换示例中的占位符。
3.  调整本地脚本的接口返回格式，使其匹配FastGPT要求的重排结果结构。
4.  启动本地脚本服务，确认接口可以正常接收并处理请求。
5.  在FastGPT中填写重排服务的接口地址、认证令牌等参数，保存配置后发起测试调用。
6.  查看FastGPT的调用日志，若出现具体报错，需按实际环境核对对应配置项，验证重排功能正常生效。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1977)
