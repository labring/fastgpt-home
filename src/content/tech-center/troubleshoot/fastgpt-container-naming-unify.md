---
title: 统一FastGPT容器命名规则优化运维排查与脚本编写效率
slug: /zh/troubleshoot/fastgpt-container-naming-unify
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6705
source_type: GitHub issue
---

# 统一FastGPT容器命名规则优化运维排查与脚本编写效率

## 现象
FastGPT的部署配置文件中，容器命名规则未统一。部分容器已使用`fastgpt-`前缀（如`fastgpt-minio`、`fastgpt-mcp-server`等），但仍有大量容器使用无前缀或其他命名风格（如`mongo`、`redis`、`aiproxy_pg`等）。执行`docker compose up`或`docker ps`时，容器名称列表格式杂乱，无法通过统一规则快速筛选FastGPT相关服务。示例当前输出为：
```text
opensandbox-server
mongo
code-sandbox
redis
pg
fastgpt-minio
fastgpt-mcp-server
fastgpt-plugin
aiproxy
aiproxy_pg
volume-manager
```

## 可能原因
当前已知容器命名存在不一致情况，具体成因需按实际开发流程确认，推测为不同模块开发时未统一容器命名规范导致。

## 排查步骤
1. 进入FastGPT项目的部署目录，执行对应环境的启动命令，如`docker compose -f deploy/templates/docker-compose.dev.yml up -d`（开发环境）或`docker compose -f deploy/templates/docker-compose.prod.yml up -d`（生产环境）。
2. 执行`docker compose ps`或`docker ps`命令，查看当前运行的所有容器名称。
3. 对比容器名称，识别出带`fastgpt-`前缀和不带前缀或使用下划线等其他风格的容器。

## 解决与验证
### 解决方法
编辑`deploy/templates/docker-compose.dev.yml`和`deploy/templates/docker-compose.prod.yml`两个配置文件，为所有服务的`container_name`字段添加`fastgpt-`前缀，例如：
- 将`mongo`改为`fastgpt-mongo`
- 将`redis`改为`fastgpt-redis`
- 将`aiproxy_pg`改为`fastgpt-aiproxy-pg`
- 将`code-sandbox`改为`fastgpt-code-sandbox`
最终所有容器命名应统一为`fastgpt-`开头的格式。
### 验证步骤
1. 保存修改后的配置文件，重新执行对应环境的启动命令。
2. 执行`docker compose ps`或`docker ps`命令，查看容器名称是否全部以`fastgpt-`开头。
3. 执行`docker ps | grep fastgpt-`命令，可快速筛选所有FastGPT相关容器，验证统一后的效果。统一后的期望输出示例为：
```text
fastgpt-opensandbox-server
fastgpt-mongo
fastgpt-code-sandbox
fastgpt-redis
fastgpt-pg
fastgpt-minio
fastgpt-mcp-server
fastgpt-plugin
fastgpt-aiproxy
fastgpt-aiproxy-pg
fastgpt-volume-manager
```

> 来源：[FastGPT GitHub Issue #6705](https://github.com/labring/FastGPT/issues/6705)
