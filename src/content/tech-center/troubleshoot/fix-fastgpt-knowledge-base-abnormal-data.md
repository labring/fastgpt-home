---
title: 解决FastGPT知识库检索出异常数据且无法编辑的问题
slug: /zh/troubleshoot/fix-fastgpt-knowledge-base-abnormal-data
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2495
source_type: GitHub issue
---

# 解决FastGPT知识库检索出异常数据且无法编辑的问题

## 现象
FastGPT 4.8.9版本中，出现知识库检索出不存在的数据，该数据实际属于当前知识库，但知识库页面无法查看该数据，搜索测试时提示"未知来源"，点击数据编辑按钮时提示"Collection is not exist"。

## 可能原因
定时清理脏数据的脚本因服务器连续停机超过3小时而中断。该脚本默认每小时自动执行一次，仅处理最近几小时的数据，无法进行全量扫描。服务器停机期间，脚本无法自动执行清理操作，导致残留的脏数据未被及时处理，进而出现上述异常现象。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.9。
2. 检查服务器是否存在连续停机超过3小时的情况。
3. 针对异常数据，验证是否出现搜索测试提示"未知来源"、点击编辑时提示"Collection is not exist"的报错。

## 解决与验证
执行预设的脏数据清理脚本。该脚本默认每小时自动执行一次，仅处理最近几小时产生的数据，无法覆盖全量历史数据。若服务器存在连续停机超过3小时的情况，需手动执行该脚本以清理残留的脏数据。验证操作包括：重新执行知识库搜索，确认异常数据不再被检索出；再次尝试编辑该数据，确认"Collection is not exist"报错消失；检查知识库页面，确认该数据的可见性恢复正常。

> 来源: [FastGPT GitHub issue #2495](https://github.com/labring/FastGPT/issues/2495)
