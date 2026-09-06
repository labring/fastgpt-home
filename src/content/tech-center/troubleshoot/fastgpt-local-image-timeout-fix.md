---
title: 解决FastGPT本地部署上传图片分析超时无效的问题
slug: /zh/troubleshoot/fastgpt-local-image-timeout-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4194
source_type: GitHub issue
---

# 解决FastGPT本地部署上传图片分析超时无效的问题

## 现象
本地部署FastGPT 4.9.0-fix2版本，搭配本地部署的模型服务时，该模型服务可正常分析图片，但FastGPT上传图片分析功能无效。FastGPT日志输出如下警告信息：
```
fastgpt  | [Warn] 2025-03-17 04:22:33 Filter invalid image: http://ip/api/common/file/read/无标题.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidWNrZXROYW1lIjoiY2hhdCIsInRlYW1JZCI6IjY3YjE5OGE4OGFjMWE4NmM1ZDE0Nzg3ZiIsInVpZCI6IjY3YjE5OGE4OGFjMWE4NmM1ZDE0Nzg4MiIsImZpbGVJZCI6IjY3ZDdhMzc4MTM3NDVkYjFkMDQ4ZDgxZCIsImV4cCI6MTc0Mjc5MDEzNiwiaWF0IjoxNzQyMTg1MzM2fQ.3WWT0w6CD1EEwmUZEsSmcFEHsdQkSs1PCj0-7FDYJ1w
```
同时日志包含Axios超时错误：`AxiosError: timeout of 10000ms exceeded`，请求方式为head请求目标图片地址。

## 可能原因
结合日志信息，核心问题为FastGPT拉取目标图片时超时。具体可能的触发因素包括：
1. FastGPT所在环境无法正常访问目标图片的内部接口地址；
2. 目标图片加载速度过慢，超出默认的10000ms超时阈值；
3. 未针对本地部署场景调整图片拉取的超时配置。

## 排查步骤
1. 查看FastGPT运行日志，记录出现`Filter invalid image`提示的图片访问地址，核对地址的正确性。
2. 在FastGPT部署的服务器环境中，使用curl命令测试该图片地址的连通性，确认是否可以正常获取图片资源。
3. 核对日志中Axios请求的超时配置，确认当前超时阈值为10000ms。
4. 确认上传图片的相关参数，需按实际环境确认是否符合FastGPT的要求。

## 解决与验证
1. 若测试发现图片地址无法访问，需调整FastGPT的内部接口访问配置，确保可以正常拉取图片资源。
2. 若测试发现图片加载超时，需找到FastGPT中对应图片拉取的超时配置项，将阈值调整至大于10000ms的数值。
3. 重新上传目标图片，查看FastGPT日志是否不再出现`Filter invalid image`和Axios超时错误。
4. 等待模型服务完成图片分析，确认分析结果可正常返回。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4194)
