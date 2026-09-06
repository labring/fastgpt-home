---
title: 解决FastGPT修改本地百川分类模型后模块无效果的问题
slug: /zh/troubleshoot/fastgpt-local-baichuan-classification-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/487
source_type: GitHub issue
---

# 解决FastGPT修改本地百川分类模型后模块无效果的问题

## 现象
在config.json文件中将分类模型修改为本地部署的百川模型后，问题分类模块无效果。

## 可能原因
由于仅获取到配置修改后模块无效果的现象，未获取到具体报错或配置细节，因此可能原因需按实际环境确认，常见关联方向包括配置项写入错误、本地模型服务异常等。

## 排查步骤
1. 打开config.json文件，确认分类模型的配置项已正确修改为本地部署的百川模型相关参数
2. 检查本地部署的百川模型服务的运行状态，确认服务可正常访问
3. 需按实际环境确认FastGPT相关依赖配置是否与本地模型部署环境匹配

## 解决与验证
针对该问题，需结合实际部署环境开展验证：首先重新核对config.json文件中分类模型的配置内容，确保与本地部署的百川模型参数一致；其次检查本地模型服务的运行状态，确认服务未中断且端口配置正确；最后根据实际排查结果调整配置或修复服务异常，验证问题分类模块是否恢复正常。

> 来源: [FastGPT GitHub issue #487](https://github.com/labring/FastGPT/issues/487)
