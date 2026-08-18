---
title: 解决FastGPT Docker Compose配置文件服务命名不统一的问题
slug: /zh/troubleshoot/fastgpt-docker-compose-service-naming
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6708
source_type: GitHub issue
---

# 解决FastGPT Docker Compose配置文件服务命名不统一的问题

## 现象
在使用FastGPT的Docker部署方案时，因deploy/templates/docker-compose.dev.yml和docker-compose.prod.yml中的服务命名风格不统一，出现配置引用错误、服务连接失败等问题。当前配置中混用了多种命名格式，如无前缀的pg、mongo、redis，带fastgpt-前缀的fastgpt-minio，短横线格式的code-sandbox，以及带下划线的aiproxy_pg等。

## 可能原因
两个配置文件未统一服务命名规范，混用了无前缀、带前缀、短横线、下划线等多种命名风格，导致depends_on依赖配置、数据库连接地址、CODE_SANDBOX_URL、SQL_DSN等环境变量中的服务引用与实际服务名称不匹配，引发部署或运行异常。

## 排查步骤
1. 进入deploy/templates目录，分别查看docker-compose.dev.yml和docker-compose.prod.yml文件，检查services下的所有服务名称，确认是否存在命名风格不一致的情况。
2. 核对配置文件中的depends_on字段、环境变量配置，确认所有引用的服务名称与实际定义的服务名称完全匹配。
3. 检查每个服务的container_name配置项，确认其是否与service key一致或已被移除。
4. 记录所有需要修改的非规范命名，如带下划线的服务名称、无统一前缀的服务等。

## 解决与验证
首先按照统一规范修改服务名称，将所有服务名称改为以fastgpt-为前缀的短横线命名（kebab-case）格式，例如将pg改为fastgpt-postgres、mongo改为fastgpt-mongo、aiproxy_pg改为fastgpt-aiproxy-postgres。
随后同步更新所有引用服务的配置项，包括数据库连接地址、depends_on字段，以及CODE_SANDBOX_URL、FASTGPT_ENDPOINT、AGENT_SANDBOX_OPENSANDBOX_BASEURL、AGENT_SANDBOX_VOLUME_MANAGER_URL、SQL_DSN等环境变量中的服务地址。
调整container_name配置，要么删除该配置项，要么将其值设置为与service key完全一致的内容。
修改完成后，重新执行docker-compose相关启动命令，验证所有服务能够正常启动，且相关功能（如数据库连接、代码沙箱调用、代理服务等）均可正常运行。

> 来源：[FastGPT GitHub Issue #6708](https://github.com/labring/FastGPT/issues/6708)
