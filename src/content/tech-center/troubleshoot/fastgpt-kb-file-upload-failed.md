---
title: 解决FastGPT 4.14.8版本知识库文件上传失败的问题
slug: /zh/troubleshoot/fastgpt-kb-file-upload-failed
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6750
source_type: GitHub issue
---

# 解决FastGPT 4.14.8版本知识库文件上传失败的问题

## 现象
升级到FastGPT 4.14.8版本后，上传知识库文件时失败，返回的访问URL中包含内部域名fastgpt-minio.localhost:9000。用户按照官网文档配置了fastgpt-minio容器的STORAGE_EXTERNAL_ENDPOINT常量并重启容器，问题仍未解决。

## 可能原因
1. 上传文件时生成的访问URL使用了内部容器域名fastgpt-minio.localhost:9000，无法被外部正常访问；
2. 配置的STORAGE_EXTERNAL_ENDPOINT常量未正确生效，未替换内部容器域名。

## 排查步骤
1. 确认fastgpt-minio容器的STORAGE_EXTERNAL_ENDPOINT配置值，需填写外部可访问的minio访问地址（如http://your-minio-domain:9000），需按实际环境确认正确的外部访问域名或IP+端口；
2. 重启fastgpt-minio容器，确保新配置的STORAGE_EXTERNAL_ENDPOINT加载生效；
3. 查看FastGPT应用服务的运行日志，排查是否存在存储端点配置相关的报错信息（日志路径与具体内容需按实际环境确认）；
4. 手动访问配置的STORAGE_EXTERNAL_ENDPOINT地址，验证网络连通性是否正常。

## 解决与验证
正确配置fastgpt-minio容器的STORAGE_EXTERNAL_ENDPOINT为外部可访问的minio访问地址，重启容器后，重新上传知识库文件。验证生成的访问URL不再包含内部域名fastgpt-minio.localhost:9000，且文件上传成功。若问题仍未解决，需按实际环境检查FastGPT应用服务的存储配置是否同步了该端点信息。

> 来源：https://github.com/labring/FastGPT/issues/6750
