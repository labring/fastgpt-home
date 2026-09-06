---
title: 解决FastGPT私有部署后容器重启模型需重新测试的问题
slug: /zh/troubleshoot/fastgpt-private-deploy-restart-model-test
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4664
source_type: GitHub issue
---

# 解决FastGPT私有部署后容器重启模型需重新测试的问题

## 现象
私有部署FastGPT v4.9.6版本时，执行`docker compose down`后重启项目，所有API调用的模型需要点击【编辑-更新-模型测试】，通过后才能正常使用。首次配置模型测试已通过，但每次容器重启后都需要重复该操作。未点击更新前，系统会打印报错日志：包含`[Error] Embedding Error`、`500 status code (no body)`，报错路径涉及`/api/core/ai/model/test`，堆栈信息包含`at tJ.generate (/app/projects/app/.next/server/chunks/37468.js:9:419755)`等内容。

## 可能原因
结合现象与日志信息推测，容器重启后已配置的模型渠道信息未被系统正确加载，导致模型调用时无法建立有效连接，触发500无响应体的错误。目前未明确官方给出的根因，需结合部署环境进一步确认。

## 排查步骤
1. 确认当前FastGPT为私有部署v4.9.6版本，执行`docker compose down`后重启项目。
2. 查看系统日志，确认是否存在`500 status code (no body)`、`Embedding Error`相关报错，且报错路径包含`/api/core/ai/model/test`。
3. 进入系统后台，依次点击【账号】-【模型提供商】-【模型渠道】，找到对应模型提供商，点击【编辑】按钮后直接保存，触发模型测试流程。
4. 验证模型测试通过后，再次执行`docker compose down`并重启项目，检查模型是否可直接正常调用。

## 解决与验证
临时解决方式：每次容器重启后，进入【账号-模型提供商-模型渠道】，对每个模型提供商点击【编辑】并保存，完成模型测试验证即可恢复正常调用。
长期优化方向：需按实际部署环境确认存储挂载配置，确保模型相关的配置数据已正确挂载到宿主机，避免容器重启后配置数据丢失。
验证方法：完成上述配置后，再次执行`docker compose down`并重启项目，直接调用API模型，确认无需重新编辑即可正常使用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4664)
