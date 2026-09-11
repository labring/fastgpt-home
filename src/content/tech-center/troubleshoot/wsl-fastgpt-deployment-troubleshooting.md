---
title: 解决WSL环境下FastGPT私有部署容器启动异常问题
slug: /zh/troubleshoot/wsl-fastgpt-deployment-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1346
source_type: GitHub issue
---

# 解决WSL环境下FastGPT私有部署容器启动异常问题

## 现象
用户在WSL v2环境以管理员身份运行终端，使用root用户执行docker-compose部署FastGPT 3.3私有版本，已按照官方文档操作步骤配置。部署前已将所有相关文件夹权限全开，Windows端User权限也已全开，且在docker-compose配置中为pg、mongo等服务添加privileged: true，但mongo、pg、mysql、oneapi、fastgpt服务仍存在启动或连接异常。

## 可能原因
当前已知尝试添加privileged配置未解决问题，可能涉及WSL2环境下容器挂载卷的权限映射异常，数据库服务初始化时的权限校验未通过，或者docker-compose网络配置未正确匹配的情况。

## 排查步骤
1.  确认docker-compose.yml中pg、mongo等服务的privileged配置是否为true，检查配置是否正确写入。
2.  核对docker-compose.yml中的数据库环境变量配置，如POSTGRES_USER、POSTGRES_PASSWORD、MONGO_INITDB_ROOT_USERNAME等参数是否符合部署要求。
3.  检查WSL2中挂载的本地卷目录权限，确认./pg/data、./mongo/data等挂载目录可被当前root用户读写。
4.  查看各服务的容器日志，获取具体的报错提示信息。
5.  检查docker网络是否正常，确认fastgpt网络是否已正确创建。

## 解决与验证
若已添加privileged: true仍未解决问题，可执行以下操作。首先删除持久化数据目录，如./pg/data、./mongo/data等，再重新执行docker-compose up -d命令，确保数据库初始化配置生效。其次核对docker-compose.yml中各服务的ports配置，避免本地端口冲突。最后重启WSL2服务后再次执行部署命令。验证时可访问FastGPT服务地址，确认各数据库服务可正常连接，平台可正常启动。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1346)
