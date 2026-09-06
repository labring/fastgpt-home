---
title: FastGPT私有部署v4.8.7慢操作aggregate报错排查方法
slug: /zh/troubleshoot/fastgpt-private-aggregate-slow-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2254
source_type: GitHub issue
---

# FastGPT私有部署v4.8.7慢操作aggregate报错排查方法

## 现象
用户在FastGPT私有部署v4.8.7版本中，知识库包含12000个文件、100万条向量数据时，运行对话接口会触发多条慢操作报错日志：
[Error] Slow operation 366ms
{ message: { query: null, op: 'aggregate', duration: 366 }, stack: undefined }
同时还会出现368ms、370ms、384ms的同类型报错，且/api/v1/chat/completions接口总耗时达5022ms，ReRank阶段耗时1632ms。

## 可能原因
现有日志仅能确认MongoDB的aggregate操作耗时超标，且query参数为空，无法直接定位根本原因。具体原因需结合实际环境确认，可能涉及索引缺失、向量数据量过大导致查询负载过高、数据库硬件或配置不足等方向。

## 排查步骤
1.  查看MongoDB慢查询日志，补充完整aggregate操作的具体执行语句与query信息。
2.  核对当前知识库的文件数量与向量数据量，确认是否超出当前部署环境的负载上限。
3.  检查MongoDB对应集合是否创建了适配向量查询的索引。
4.  查看FastGPT的QA Queue、Vector Queue配置，确认并发处理参数是否适配当前数据规模。

## 解决与验证
根据排查到的具体问题进行针对性处理：若为索引缺失则创建对应索引，若为硬件或配置不足则升级调整，若为队列并发过高则优化参数。验证时重新发起对话请求，确认日志中不再出现Slow operation aggregate报错，同时监控/api/v1/chat/completions接口的总耗时是否恢复至正常水平。若问题仍存在，需通过MongoDB执行计划进一步分析aggregate操作的瓶颈。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2254)
