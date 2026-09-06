---
title: 解决FastGPT中模型思考过程无法正常输出的问题
slug: /zh/troubleshoot/fastgpt-missing-thinking-output-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4034
source_type: GitHub issue
---

# 解决FastGPT中模型思考过程无法正常输出的问题

## 现象
用户在FastGPT 4.8.22私有部署版本中调用模型时，前端页面处于空白等待状态且等待时间较长。实际模型已执行思考流程，但FastGPT未正常输出模型的思考过程，与直接使用该模型时的表现存在差异。

## 可能原因
需结合实际部署环境确认，常见关联方向包括：FastGPT的模型返回格式适配逻辑未正确处理思考过程内容、流式传输配置未正常转发思考数据流、私有部署环境的相关设置阻断了思考内容的传递。

## 排查步骤
1. 确认当前FastGPT版本为4.8.22，核对已配置的模型调用参数是否匹配目标模型的返回格式规范。
2. 查看FastGPT后端运行日志，检查模型返回的思考内容是否被正常接收和初步处理。
3. 打开前端浏览器开发者工具，查看网络请求面板，确认是否存在模型思考过程的数据流未正常推送至前端。
4. 检查私有部署环境的网络策略、配置文件，确认无阻断数据流传输的相关设置。

## 解决与验证
1. 调整FastGPT的模型调用配置，确保其适配目标模型的思考过程返回格式，正确解析并转发思考内容至前端。
2. 重启FastGPT服务，使新的配置生效。
3. 发起新的模型调用测试，确认思考过程是否正常输出到前端，等待时间是否恢复正常。
4. 对比直接使用该模型与FastGPT中的调用表现，确认两者的思考过程输出一致。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4034)
