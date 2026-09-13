---
title: 解决FastGPT私有部署重排模型前端调用显示失败问题
slug: /zh/troubleshoot/fastgpt-private-deployment-rerank-frontend-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1155
source_type: GitHub issue
---

# 解决FastGPT私有部署重排模型前端调用显示失败问题

## 现象
用户私有部署FastGPT时，将容器内的代码与重排模型拷贝至本地启动服务。使用4.6.9、4.7、4.7.1-alpha版本的FastGPT测试时，重排模型的API调用可正常执行，但前端界面显示调用失败，附带多张前端界面报错截图。

## 可能原因
目前仅能基于已知信息推断：重排模型的API调用本身可正常完成，但前端界面未正确处理或展示调用结果，或本地部署的配置与原容器环境存在差异，导致前端与后端的重排模型关联配置未正确同步。

## 排查步骤
1.  核对本地启动的重排模型服务与原容器内的部署路径、环境变量等配置参数，确保二者完全一致。
2.  查看issue提供的四张前端界面截图，提取前端展示的失败提示信息，定位前端交互或结果解析环节的问题。
3.  确认FastGPT后端配置的重排模型接入参数，与本地启动的重排模型服务的地址、认证信息等保持匹配。
4.  检查使用的FastGPT版本（4.6.9、4.7、4.7.1-alpha）与重排模型的适配性，确认是否存在版本相关的兼容问题。

## 解决与验证
若排查发现配置参数不一致，修正配置使其与原容器环境一致，重启FastGPT后端与重排模型服务。若前端存在解析或展示问题，根据提取的报错信息调整前端相关的重排模型结果处理逻辑。验证方式为：再次在FastGPT前端界面调用重排模型，确认界面可正常展示调用结果，且后端API调用日志显示正常返回结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1155)
