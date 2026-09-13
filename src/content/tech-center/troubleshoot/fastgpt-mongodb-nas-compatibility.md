---
title: 解决FastGPT私有部署时MongoDB与NAS硬件适配的问题
slug: /zh/troubleshoot/fastgpt-mongodb-nas-compatibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1349
source_type: GitHub issue
---

# 解决FastGPT私有部署时MongoDB与NAS硬件适配的问题

## 现象
部署FastGPT私有部署4.7版本时，MongoDB启动报错。日志中会出现`WARNING: MongoDB 5.0+ requires a CPU with AVX support, and your current system does not appear to have that!`的警告，同时容器执行时出现`mongod: line 19:    10 Illegal instruction     exec docker-entrypoint.sh "$@"`和`mongod: line 19:    31 Illegal instruction     mongo -u username -p password --authenticationDatabase admin --eval "print('waited for connection')" > /dev/null 2>&1`类报错，循环提示`Waiting for MongoDB to start...`。最终MongoDB无法正常连接，FastGPT应用启动后登录会报错。

## 可能原因
MongoDB 5.0及以上版本需要CPU支持AVX指令集，而部分NAS设备的硬件不支持该指令集，导致官方MongoDB镜像无法正常启动。

## 排查步骤
1. 查看容器部署日志，确认是否包含`MongoDB 5.0+ requires a CPU with AVX support`和`Illegal instruction`相关报错文本。
2. 检查docker-compose.yaml文件中MongoDB镜像的版本，默认使用的版本为5.0.8（阿里云默认）。
3. 确认当前运行环境的CPU是否支持AVX指令集，需按实际环境确认。

## 解决与验证
解决步骤：
1. 编辑docker-compose.yaml文件，将MongoDB镜像版本修改为4.2.2。
2. 重新启动相关容器，等待服务初始化完成。
验证步骤：
1. 查看容器日志，确认MongoDB不再出现AVX相关警告和`Illegal instruction`报错。
2. 访问FastGPT服务，确认可以正常登录，无数据库连接相关报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1349)
