---
title: FastGPT部署Milvus后容器崩溃的排查与解决方法
slug: /zh/troubleshoot/fastgpt-milvus-crash-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2075
source_type: GitHub issue
---

# FastGPT部署Milvus后容器崩溃的排查与解决方法

## 现象
用户在MacOS本地通过Docker部署FastGPT 4.8.4私有版本，初始使用PgVector向量库功能正常。更换为Milvus向量库后，所有容器可正常启动，且支持基础知识库搜索测试，但出现两类容器崩溃场景：1. 新导入超过3个单文件约5k的Word文档时，Milvus容器崩溃；2. 知识库搜索时勾选混合检索+结果重排+最低相关度选项时，Milvus容器崩溃。Milvus日志显示多个goroutine（如6467、6468）处于chan receive锁定线程状态，报错涉及github.com/panjf2000/ants/v2协程池的worker阻塞。

## 可能原因
目前未明确官方根因，结合报错日志推测，可能与协程池资源阻塞、向量批量写入或检索时的并发配置不足有关，具体需结合实际部署的资源与配置确认。

## 排查步骤
1.  查看Milvus容器的运行日志，确认是否出现与issue中一致的goroutine chan receive报错。
2.  检查当前部署的Milvus容器的CPU、内存资源配额，确认是否存在资源耗尽情况。
3.  复现导入超3个5k Word文档的操作，验证是否触发容器崩溃。
4.  复现勾选混合检索+结果重排+最低相关度的搜索操作，确认触发崩溃的条件。
5.  核对FastGPT与Milvus的连接配置是否符合官方部署文档要求。

## 解决与验证
1.  临时缓解：调整Milvus容器的资源配额，增加CPU与内存限制，避免资源耗尽。
2.  优化配置：参考官方文档调整Milvus的并发写入、检索相关参数，具体参数需按实际环境确认。
3.  效果验证：重新导入超过3个5k Word文档，或执行混合检索+结果重排+最低相关度的搜索操作，确认Milvus容器不再崩溃。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2075)
