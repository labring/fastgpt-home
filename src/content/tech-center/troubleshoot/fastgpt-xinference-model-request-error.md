---
title: 解决FastGPT对接Xinference部署本地模型请求报错问题
slug: /zh/troubleshoot/fastgpt-xinference-model-request-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3467
source_type: GitHub issue
---

# 解决FastGPT对接Xinference部署本地模型请求报错问题

## 现象
用户使用私有部署版本ghcr.io/labring/fastgpt:v4.8.15-fix2，通过Xinference部署本地模型后，在OneAPI中完成该模型的配置。点击OneAPI的模型测试按钮后，页面右上角弹出请求错误提示。用户提供了Xinference部署结果截图、OneAPI配置截图、报错弹窗截图作为相关佐证材料。

## 可能原因
结合场景可初步梳理排查方向：OneAPI中配置的模型标识与Xinference实际部署的模型标识不匹配；OneAPI访问Xinference服务的接口地址配置错误；Xinference部署的模型返回的接口格式与OneAPI要求的兼容格式不一致；各服务间的网络通信存在阻断。

## 排查步骤
1. 登录Xinference管理界面，查看已部署本地模型的详细信息，记录模型的实际标识与服务访问地址。
2. 打开OneAPI的模型配置页面，核对已配置的模型名称是否与Xinference记录的模型标识完全一致，核对API访问地址是否正确指向Xinference服务地址。
3. 脱离FastGPT环境，直接使用OneAPI的测试工具调用该模型，验证OneAPI与Xinference的通信是否正常。
4. 查看FastGPT、OneAPI、Xinference的运行日志，提取具体的报错文本与错误环节，辅助定位问题。

## 解决与验证
根据排查结果修正对应配置：若模型标识或地址配置错误，将OneAPI中的配置修改为与Xinference实际参数一致的值。修改完成后，在OneAPI中重新测试模型连接，确认测试通过。随后在FastGPT中调用该OneAPI渠道的模型，验证请求流程正常。若排查发现接口格式不兼容，需按实际环境调整Xinference部署参数或OneAPI的兼容配置。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/3467)
