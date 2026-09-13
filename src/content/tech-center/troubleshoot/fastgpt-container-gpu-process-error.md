---
title: 解决FastGPT容器指定GPU后进程池不可用报错问题
slug: /zh/troubleshoot/fastgpt-container-gpu-process-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3612
source_type: GitHub issue
---

# 解决FastGPT容器指定GPU后进程池不可用报错问题

## 现象
在搭载3张GPU卡的服务器上，通过docker命令指定单张GPU卡部署容器，命令为`docker run --gpus '"device=2"' -d -e PROCESSES_PER_GPU=1 -p 7231:7231 --name model_pdf_v1 crpi-h3snc261q1dosroc.cn-hangzhou.personal.cr.aliyuncs.com/marker11/marker_images:latest`。调用POST接口`http://10.4.7.111:7231/v1/parse/file`上传文件时，返回报错信息`{"detail":"错误信息: A child process terminated abruptly, the process pool is not usable anymore"}`。

## 可能原因
无明确可直接确认的原因，需按实际部署环境逐一排查，可能涉及GPU资源分配异常、进程池配置与硬件资源不匹配，或镜像内进程与GPU资源的冲突情况。

## 排查步骤
1.  进入部署的容器，执行`nvidia-smi`命令，检查指定的GPU设备2是否正常可见且可用。
2.  核对容器启动参数中的`PROCESSES_PER_GPU`配置，确认其值与分配的GPU资源及镜像要求匹配。
3.  重新执行原测试curl命令`curl --location --request POST "http://10.4.7.111:7231/v1/parse/file" --form "file=@/24v5.pdf"`，记录完整的报错返回内容。
4.  执行`docker logs model_pdf_v1`命令，查看容器运行日志，获取启动及运行过程中的详细错误信息。

## 解决与验证
根据排查结果调整对应配置：若GPU设备不可见，调整`--gpus`参数中的设备编号；若进程池配置不匹配，修改`PROCESSES_PER_GPU`参数值。调整完成后重启容器，重新执行测试curl命令，确认不再返回指定的进程池报错信息，接口调用正常。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3612)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
