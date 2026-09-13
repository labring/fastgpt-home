---
title: 解决FastGPT部署时OceanBase容器健康检查失败的问题
slug: /zh/troubleshoot/fastgpt-oceanbase-health-check-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4642
source_type: GitHub issue
---

# 解决FastGPT部署时OceanBase容器健康检查失败的问题

## 现象
用户在群晖Container Manager的Docker环境中部署FastGPT，硬件配置为CPU 12500h、内存32G，PostgreSQL与Milvus部署正常，但OceanBase容器出现异常。OceanBase容器长时间处于(health: starting)状态，FastGPT容器在图形界面呈灰色无法启动。手动启动FastGPT容器后可进入Web界面并登录，但无法上传知识库文件。通过`docker logs ob`查看日志，发现存在多组系统参数警告与obshell启动失败报错。

## 可能原因
从OceanBase容器日志来看，当前系统的四个内核参数未达到部署推荐值：fs.aio-max-nr当前值为65536，低于推荐的1048576；进程栈大小当前为8192，未达到unlimited；vm.max_map_count当前为65530，不在327600至1310720的推荐区间内，推荐值为655360；fs.file-max当前为3225830，低于推荐的6573688。这些参数不达标导致obshell启动失败，进而使OceanBase容器健康检查无法通过，影响FastGPT的正常启动与数据库连接。

## 排查步骤
1.  登录服务器或群晖SSH终端，执行`docker logs ob`命令查看OceanBase容器日志，确认是否存在OBD-1011、OBD-1007、OBD-1017类系统参数警告，以及OBD-2012的obshell启动失败报错。
2.  执行对应系统命令查看当前参数值，例如`sysctl fs.aio-max-nr`查看异步IO最大数，`ulimit -s`查看进程栈大小，`sysctl vm.max_map_count`查看内存映射上限，`sysctl fs.file-max`查看最大文件句柄数。
3.  执行`docker ps`命令，确认OceanBase容器的健康状态与FastGPT容器的运行状态。

## 解决与验证
1.  根据日志中的推荐值调整系统参数。临时调整可通过`sysctl -w`命令执行，例如`sysctl -w fs.aio-max-nr=1048576`、`sysctl -w vm.max_map_count=655360`、`sysctl -w fs.file-max=6573688`；永久调整需编辑对应系统配置文件，修改后需重启系统或加载配置生效。进程栈大小调整需修改ulimit配置，将值设为unlimited。
2.  执行`docker restart ob`命令重启OceanBase容器。
3.  等待容器健康检查完成，通过`docker ps`确认OceanBase容器状态变为healthy，再启动FastGPT容器，验证可正常登录Web界面并上传知识库文件。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4642)
