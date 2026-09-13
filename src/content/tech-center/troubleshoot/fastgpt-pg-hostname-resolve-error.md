---
title: 解决FastGPT创建知识库时getaddrinfo ENOTFOUND pg报错问题
slug: /zh/troubleshoot/fastgpt-pg-hostname-resolve-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/129
source_type: GitHub issue
---

# 解决FastGPT创建知识库时getaddrinfo ENOTFOUND pg报错问题

## 现象
用户使用Docker Compose部署FastGPT时，对话和创建应用流程可正常运行，但执行创建知识库操作时，系统返回报错信息`getaddrinfo ENOTFOUND pg`。

## 可能原因
该报错为域名解析失败错误，核心是FastGPT服务无法通过配置的主机名找到PostgreSQL服务。结合提供的docker-compose配置，可能的原因包括：
1.  FastGPT服务的PG_HOST参数配置与pg服务的名称不匹配；
2.  容器启动顺序异常，FastGPT在pg服务完全就绪前启动，导致无法完成域名解析；
3.  Docker自定义网络的DNS解析功能出现异常。

## 排查步骤
1.  检查docker-compose.yml中fastgpt服务的PG_HOST参数值，确认其与pg服务的名称一致，当前配置中PG_HOST=pg，需确认pg服务的名称是否为docker-compose.yml中services下的pg项。
2.  查看FastGPT容器的启动日志，确认是否在pg服务启动前完成了FastGPT的启动，可通过`docker logs fastgpt`命令查看。
3.  进入FastGPT容器内部，执行`ping pg`命令，验证是否可以解析到pg服务的IP地址，若无法解析则说明网络或DNS存在问题。
4.  检查docker-compose.yml中networks配置，确认fastgpt服务和pg服务都绑定了fastgpt网络。

## 解决与验证
1.  若PG_HOST参数配置错误，修正为pg服务的正确名称，当前配置中服务名为pg，无需修改，若有调整则同步更新PG_HOST参数。
2.  调整容器启动顺序，可通过添加健康检查或使用等待工具确保pg服务启动完成后再启动FastGPT。例如在docker-compose.yml的pg服务中添加健康检查配置，或在fastgpt服务的启动命令中添加等待脚本。
3.  若Docker网络DNS解析异常，可尝试重启Docker服务，或重建fastgpt网络：执行`docker network rm fastgpt && docker network create fastgpt`，然后重新启动所有服务。
4.  验证操作：重新启动所有容器服务，进入FastGPT容器执行`ping pg`确认域名解析正常，再尝试创建知识库，确认报错`getaddrinfo ENOTFOUND pg`不再出现。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/129)
