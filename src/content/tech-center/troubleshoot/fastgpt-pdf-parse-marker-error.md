---
title: 解决FastGPT 4.9.0私有部署marker v2解析PDF报错的问题
slug: /zh/troubleshoot/fastgpt-pdf-parse-marker-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4068
source_type: GitHub issue
---

# 解决FastGPT 4.9.0私有部署marker v2解析PDF报错的问题

## 现象
用户使用私有部署的FastGPT 4.9.0，配置marker v2版本并勾选PDF增强解析功能后，上传PDF点击开始上传触发报错。marker日志显示所有模型均成功加载到CUDA设备，但在Recognizing layout阶段进度为0/9且耗时1秒后触发异常，ASGI应用返回POST /v2/parse/file HTTP/1.1 500 Internal Server Error，日志包含uvicorn、fastapi及starlette中间件的异常栈信息。

## 可能原因
结合日志信息，异常发生在布局识别环节，可能的原因包括：模型路径配置错误，日志中使用了s3://开头的模型路径，若为本地私有部署未配置对象存储，可能无法正确读取模型；CUDA设备显存不足，导致模型加载后无法正常执行布局识别任务；解析进程的资源限制被触发，导致任务中断。

## 排查步骤
1.  查看marker的模型配置文件，确认模型路径是否为实际本地存储路径，替换日志中出现的s3://前缀路径为本地路径。
2.  登录运行marker服务的服务器，使用nvidia-smi命令查看CUDA设备显存使用情况，确认是否存在其他进程占用大量显存。
3.  查看完整的异常栈日志，定位具体的报错代码位置，确认是依赖版本问题还是代码逻辑问题。
4.  核对FastGPT 4.9.0与marker v2的依赖包版本，确认python3.11环境下的依赖版本匹配。

## 解决与验证
1.  修正模型路径配置，将s3://开头的模型路径替换为本地实际存储路径，重启marker服务。
2.  关闭其他占用显存的进程，为marker解析任务预留足够的CUDA显存。
3.  重新上传PDF文件，点击开始上传，确认不再触发500 Internal Server Error。
4.  等待解析完成后，查看解析结果是否正常，确认PDF内容已正确提取并生成知识库。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4068)
