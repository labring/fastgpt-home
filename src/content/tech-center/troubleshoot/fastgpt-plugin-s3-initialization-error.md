---
title: 解决FastGPT 4.10.0插件服务对接外部对象存储启动失败问题
slug: /zh/troubleshoot/fastgpt-plugin-s3-initialization-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5169
source_type: GitHub issue
---

# 解决FastGPT 4.10.0插件服务对接外部对象存储启动失败问题

## 现象
用户升级FastGPT到4.10.0版本后，fastgpt-plugin服务尝试对接外部对象存储（华为云OBS）。手动验证AK/SK可正常访问和存取数据，但服务无法启动。日志显示先执行Checking bucket: bucket-name，随后报错Failed to initialize S3 server，具体错误信息为The specified key does not exist，报错栈包含getBucketRegionAsync、bucketExists等S3初始化相关的调用步骤。

## 可能原因
结合报错信息与配置参数，可能的原因包括：配置参数格式冲突，比如同时配置了MINIO_CUSTOM_ENDPOINT与MINIO_ENDPOINT导致SDK解析异常；MINIO_ENDPOINT包含了https://等协议前缀，不符合SDK的参数要求；SDK在获取存储桶区域时出现异常，触发了指定密钥不存在的报错（尽管手动验证AK/SK正常，但初始化流程的区域获取环节可能因配置问题失败）。

## 排查步骤
1. 检查配置参数中的MINIO_ENDPOINT，确认未添加https://、http://等协议前缀，仅保留纯域名部分，例如本次配置中的bucket-name.obs.cn-east-2.myhuaweicloud.com。
2. 查看是否配置了MINIO_CUSTOM_ENDPOINT，若存在该配置，可尝试注释或删除，部分第三方对象存储无需配置此项。
3. 核对MINIO_BUCKET参数值与实际存储桶名称是否完全一致，确认AK/SK拥有对应存储桶的读写权限。
4. 确认MINIO_PORT与对象存储服务的对外端口匹配，本次配置为443，符合HTTPS访问的标准端口。
5. 查看完整报错栈信息，定位错误发生的具体阶段，辅助定位配置或权限问题。

## 解决与验证
调整配置参数，移除MINIO_CUSTOM_ENDPOINT项，确保MINIO_ENDPOINT仅填写不带协议的域名。重启fastgpt-plugin服务后，查看日志是否不再出现Failed to initialize S3 server的报错。再次手动验证AK/SK可正常访问和存取对应存储桶，确认服务启动正常且存储功能符合预期。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5169)
