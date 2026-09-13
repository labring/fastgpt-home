---
title: 解决FastGPT知识库批量删除文档时的写入冲突报错
slug: /zh/troubleshoot/fastgpt-batch-delete-write-conflict
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/3460
source_type: GitHub issue
---

# 解决FastGPT知识库批量删除文档时的写入冲突报错

## 现象
批量删除FastGPT知识库文档时，数据量较小无报错，数据量较大（如删除18810条数据）时触发报错。报错信息为WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.，调用api/core/dataset/collection/delete接口时会返回该异常。

## 可能原因
删除知识库关联数据时使用了事务，根据官方说明，超过1000条数据删除时不宜使用事务，因此触发写入冲突异常。

## 排查步骤
1. 复现报错场景：批量删除知识库文档，观察是否在数据量较大时触发报错
2. 查看报错详情，确认是否包含WriteConflict error: this operation conflicted with another operation. Please retry your operation or multi-document transaction.错误文本
3. 确认调用的接口为api/core/dataset/collection/delete
4. 检查当前FastGPT版本是否低于4.8.17

## 解决与验证
该问题已通过cfafc4b commit完成优化，取消删除知识库关联数据时的事务选项，优化内容将在4.8.17版本中生效。可升级至4.8.17-alpha版本进行测试，验证批量删除大数量知识库文档时不再出现写入冲突报错。

> 来源: [FastGPT GitHub issue #3460](https://github.com/labring/FastGPT/issues/3460)
