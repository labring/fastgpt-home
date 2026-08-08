---
title: 解决FastGPT私有部署code-sandbox环境变量类型错误重启问题
slug: /zh/troubleshoot/fastgpt-sandbox-env-type-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6631
source_type: GitHub issue
---

# 解决FastGPT私有部署code-sandbox环境变量类型错误重启问题

## 现象
私有部署v4.14.9.3版本的FastGPT，可正常登录，但code-sandbox容器不断重启。容器报错信息包含：`[dotenv@17.3.1] injecting env (0) from .env`，以及`Invalid environment variables`下`LOG_ENABLE_CONSOLE`、`LOG_ENABLE_OTEL`提示`"Invalid input: expected boolean, received string"`。

## 可能原因
docker-compose配置中，`LOG_ENABLE_CONSOLE`、`LOG_ENABLE_OTEL`两个布尔类型的环境变量被单引号包裹，被dotenv解析为字符串类型，但程序要求传入布尔值，导致环境变量校验失败，容器启动失败后不断重启。

## 排查步骤
1. 查看code-sandbox容器的运行日志，确认是否存在dotenv环境变量类型错误的报错信息；
2. 打开部署使用的docker-compose.yml文件，定位到code-sandbox服务的environment配置段；
3. 检查`LOG_ENABLE_CONSOLE`、`LOG_ENABLE_OTEL`的赋值格式，确认是否被引号包裹；
4. 核对其他布尔类型环境变量的配置格式，避免类似问题。

## 解决与验证
解决方法：将`LOG_ENABLE_CONSOLE`、`LOG_ENABLE_OTEL`的单引号移除，直接赋值为布尔值，即修改为`LOG_ENABLE_CONSOLE: true`和`LOG_ENABLE_OTEL: false`。验证步骤：重新启动code-sandbox容器，查看容器日志，确认无dotenv环境变量类型报错，容器不再自动重启，功能恢复正常。需注意，布尔类型环境变量无需添加引号包裹，直接使用`true`/`false`即可。

> 来源：https://github.com/labring/FastGPT/issues/6631
