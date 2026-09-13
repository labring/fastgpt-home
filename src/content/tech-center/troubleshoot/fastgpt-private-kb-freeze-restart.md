---
title: 解决FastGPT私有部署版单知识库测试卡死容器重启问题
slug: /zh/troubleshoot/fastgpt-private-kb-freeze-restart
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4301
source_type: GitHub issue
---

# 解决FastGPT私有部署版单知识库测试卡死容器重启问题

## 现象
在FastGPT私有部署版v4.9.1-fix2中，测试特定知识库时系统出现卡死情况，其余知识库运行正常；next-server进程资源占用爆满，触发容器自动重启；涉事知识库仅包含73条数据。

## 可能原因
目前无明确报错文本，结合现象推测可能的原因包括：该知识库内的数据集存在格式异常的条目，或知识库的索引处理流程导致next-server资源占用异常。

## 排查步骤
1. 核对该知识库的数据集条目，确认是否存在空值、特殊字符等格式异常的内容；
2. 查看next-server的运行日志，定位资源占用过高时的具体调用信息；
3. 临时禁用该知识库的向量索引功能，测试是否仍会触发资源爆满问题；
4. 对比正常知识库与该知识库的配置参数，排查是否存在配置差异。

## 解决与验证
先清理或修正该知识库内格式异常的数据集条目；重新构建该知识库的向量索引，避免残留异常索引数据。验证时重新测试该知识库，确认next-server资源占用恢复正常，容器不再自动重启。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4301)
