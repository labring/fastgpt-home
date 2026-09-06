---
title: FastGPT批量写入知识库数据无法获取实时ID的问题排查
slug: /zh/troubleshoot/fastgpt-pushdata-id-retrieval
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/800
source_type: GitHub issue
---

# FastGPT批量写入知识库数据无法获取实时ID的问题排查

## 现象
调用dataset/data/pushData接口批量写入知识库数据后，无法获取每条写入数据的具体ID。

## 可能原因
批量写入数据的流程并非同步执行。数据会先被推入训练队列，待训练完成后才会插入数据库，因此无法实时获取插入的ID。同时，所有数据的ID均由数据库自增生成，无法由外部提前指定或控制。

## 排查步骤
1. 确认调用的接口为dataset/data/pushData，核对接口文档中的参数与调用方式
2. 检查接口返回的响应内容，查看是否存在数据ID相关的返回字段
3. 确认当前业务场景是否需要实时获取每条写入数据的具体ID

## 解决与验证
该接口无法实时返回写入数据的ID。部分场景下需要对应的数据ID以实现后续的维护、删除或重新量化操作，此时需注意当前接口无法满足实时获取ID的需求。若业务需要在写入时获取ID，可预先规划ID占用逻辑，但需注意数据插入后的结果与顺序可能存在不可控性，若在API层面关联精确数据，易出现混淆，无法对应检索插入的数据。若业务无需实时获取ID，可等待数据完成插入流程后，通过其他合法的检索方式获取对应数据。

> 来源: [FastGPT GitHub issue #800](https://github.com/labring/FastGPT/issues/800)
