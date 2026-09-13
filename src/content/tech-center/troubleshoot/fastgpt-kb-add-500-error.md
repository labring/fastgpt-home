---
title: 解决FastGPT逐条添加知识库时触发的500内部错误问题
slug: /zh/troubleshoot/fastgpt-kb-add-500-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4573
source_type: GitHub issue
---

# 解决FastGPT逐条添加知识库时触发的500内部错误问题

## 现象
用户在FastGPT中逐条添加知识库时触发500内部错误：当问题字数为95个、答案字数为530个时失败，减少答案字数后可成功添加。控制台报错包含`Request failed with status code 500`、`500 status code (no body)`，FastGPT服务端日志显示`Embedding Error`，报错信息为`500 status code (no body)`，调用栈涉及`/api/core/dataset/data/update.js`等接口路径。

## 可能原因
结合报错场景与日志，该错误大概率与待添加的知识库答案文本长度强相关。超长文本在嵌入处理流程中触发服务端内部异常，且服务端未返回有效错误body，导致前端仅显示500无内容错误。需按实际环境确认是否存在其他配置限制或服务异常。

## 排查步骤
1.  复现问题：使用相同的95字问题，调整答案字数，确认当答案达到530字时触发错误，减少字数后恢复正常，验证错误与答案长度直接相关。
2.  查看FastGPT服务端日志：定位`Embedding Error`相关日志，确认报错信息为`500 status code (no body)`，以及调用栈中的`/api/core/dataset/data/update.js`路径，确认请求来自知识库数据更新接口。
3.  核对嵌入模型限制：确认当前使用的嵌入模型的单次输入文本长度阈值，对比530字的答案是否超出该阈值。
4.  检查依赖服务状态：确认向量数据库、嵌入模型服务正常运行，无连接超时或权限异常。

## 解决与验证
1.  拆分超长答案：将单条知识库的530字答案拆分为多个短文本片段，确保每个片段字数符合嵌入模型的输入限制，重新提交知识库添加请求。
2.  调整服务端配置：若确认错误由服务端配置的长度限制导致，需修改对应配置项，提升单次嵌入的文本长度阈值，具体配置路径与参数需按实际环境确认。
3.  验证修复：使用拆分后的短文本或调整配置后，重新添加原知识库内容，确认不再触发500内部错误，知识库添加成功。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4573)
