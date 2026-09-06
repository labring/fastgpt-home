---
title: 解决FastGPT私有部署中Milvus容器周期性异常退出问题
slug: /zh/troubleshoot/fastgpt-milvus-periodic-exit
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1781
source_type: GitHub issue
---

# 解决FastGPT私有部署中Milvus容器周期性异常退出问题

## 现象
用户在CentOS7系统的4C16G、500G硬盘虚拟机中，通过docker-compose部署FastGPT v4.8.3版本，搭配Milvus向量数据库。系统正常运行2天后，编辑知识库或进入聊天应用时，出现报错`14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530`。查看容器状态可见milvusStandalone容器处于Exited状态，重启容器后系统可恢复正常，但该问题会在2天后周期性重现。

## 可能原因
结合问题表现，可能的触发因素包括宿主机磁盘性能不足，无法满足Milvus的运行要求，导致服务运行过程中异常退出；也可能是Milvus容器长期运行后出现资源泄漏或配置限制问题。具体原因需按实际环境确认。

## 排查步骤
1.  查看milvusStandalone容器的异常退出日志，获取具体报错信息。
2.  测试宿主机磁盘读写性能，验证是否符合Milvus的运行需求。
3.  检查docker-compose配置中Milvus容器的资源限制参数，确认是否存在CPU、内存或磁盘配额不足的情况。
4.  手动重启milvusStandalone容器，验证服务能否临时恢复正常。
5.  跟踪容器长期运行状态，确认异常退出的周期是否固定为2天左右。

## 解决与验证
临时解决方式为重启milvusStandalone容器，快速恢复FastGPT的知识库与聊天应用功能。长期优化可通过调整宿主机磁盘性能参数，或优化docker-compose中Milvus容器的资源配置，确保服务稳定运行。验证方法为：重启容器后正常访问知识库和聊天应用，连续运行多日，确认不再出现`14 UNAVAILABLE: Name resolution failed for target dns:milvusStandalone:19530`报错，且milvusStandalone容器保持运行状态。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1781)
