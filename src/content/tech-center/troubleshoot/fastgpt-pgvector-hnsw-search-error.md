---
title: 解决FastGPT与pgvector v0.7.0+的知识库搜索失败问题
slug: /zh/troubleshoot/fastgpt-pgvector-hnsw-search-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5566
source_type: GitHub issue
---

# 解决FastGPT与pgvector v0.7.0+的知识库搜索失败问题

## 现象
当使用搭载pgvector扩展v0.7.0或更高版本的PostgreSQL数据库时，FastGPT的知识库搜索功能会间歇性失败。PostgreSQL容器日志会频繁出现致命错误：
```
ERROR: invalid configuration parameter name "hnsw.max_scan_tuples"
DETAIL: "hnsw" is a reserved prefix.
```
前端也会报相同错误文本，或出现警告但查询依然失败。

## 可能原因
从pgvector v0.7.0起，PostgreSQL数据库服务器禁止通过SET LOCAL或SET命令设置以hnsw为前缀的运行时参数，包括hnsw.ef_search、hnsw.max_scan_tuples、hnsw.iterative_scan。FastGPT 4.12.2版本的后端查询代码仍保留了这些设置语句，导致查询执行失败。

## 排查步骤
1. 确认当前使用的pgvector扩展版本是否为v0.7.0或更高。
2. 查看PostgreSQL容器日志，检查是否存在`invalid configuration parameter name "hnsw.max_scan_tuples"`相关错误。
3. 执行知识库搜索或工作流查询操作，确认失败概率与日志报错时间匹配。

## 解决与验证
解决方法：需要修改FastGPT后端的查询代码，移除或替换SET LOCAL hnsw.*相关的设置语句。验证步骤：
1. 完成代码修改并重启FastGPT服务。
2. 执行知识库搜索或工作流查询，确认不再出现上述报错。
3. 验证搜索结果正常返回，无查询失败情况。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5566)
