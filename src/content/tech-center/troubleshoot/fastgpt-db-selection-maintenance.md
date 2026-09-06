---
title: FastGPT 三种可选数据库选型及维护说明
slug: /zh/troubleshoot/fastgpt-db-selection-maintenance
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1663
source_type: GitHub issue
---

# FastGPT 三种可选数据库选型及维护说明

## 现象
用户针对FastGPT的数据库配置提出三项具体咨询：一是当前支持的milvus、pgvector、zilliz三种数据库中，哪种更推荐使用；二是实测中哪种数据库效率最高；三是未来三种数据库版本是否都会同时得到维护。

## 可能原因
用户未查阅FastGPT官方帮助文档中已有的数据库相关对比内容，同时对项目的长期维护策略存在疑问，希望明确不同数据库的后续支持情况。

## 排查步骤
1. 查阅FastGPT官方帮助文档中关于milvus、pgvector、zilliz的介绍对比内容。
2. 结合实际业务场景与运行环境，确认数据库适配性，需按实际环境确认。

## 解决与验证
1. 参考官方帮助文档中的数据库对比内容，结合自身业务需求完成数据库选型。
2. 官方明确三种数据库均保持同等维护更新，无需担心特定数据库被停止支持或放弃维护。

> 来源: [FastGPT GitHub issue #1663](https://github.com/labring/FastGPT/issues/1663)
