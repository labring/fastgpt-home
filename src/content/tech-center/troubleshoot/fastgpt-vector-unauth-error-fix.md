---
title: 解决FastGPT生成向量报unAuthorization错误的问题
slug: /zh/troubleshoot/fastgpt-vector-unauth-error-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/168
source_type: GitHub issue
---

# 解决FastGPT生成向量报unAuthorization错误的问题

## 现象
使用FastGPT生成向量时，出现`unAuthorization`报错。可正常进行对话，部署方式为Docker Compose，日志仅包含该报错信息，无其他额外内容。部分用户重新部署环境后可正常使用一次，再次导入内容后报错复现。

## 可能原因
该报错可能与向量模型的密钥配置、上游接口连通性有关。部分场景下向量模型已正常开启，但仍出现该报错。

## 排查步骤
1. 确认向量模型的密钥配置是否正确。
2. 尝试直连上游向量接口，避免网络映射带来的问题。
3. 检查向量模型的运行状态是否正常。
4. 若报错在正常使用后出现，可排查导入内容是否对配置产生影响。

## 解决与验证
1. 调整为直连上游向量接口的方式，规避网络映射问题。
2. 重新检查并确认向量模型的密钥配置无误后，重新部署环境。
3. 验证向量生成功能是否恢复正常，若再次导入内容后报错复现，需进一步排查导入操作对配置的影响。

> 来源: [FastGPT GitHub issue #168](https://github.com/labring/FastGPT/issues/168)
