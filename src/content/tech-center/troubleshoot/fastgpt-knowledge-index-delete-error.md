---
title: 解决FastGPT知识库手动插入数据时删除索引引发的input is empty报错
slug: /zh/troubleshoot/fastgpt-knowledge-index-delete-error
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/3751
source_type: GitHub issue
---

# 解决FastGPT知识库手动插入数据时删除索引引发的input is empty报错

## 现象
在FastGPT公有云版本中，执行知识库手动插入数据操作时会触发input is empty报错。具体复现场景为：进入通用知识库，点击任意数据集合，点击右上角插入按钮，填写任意分块内容后，切换数据索引，新增索引并删除该新增索引，点击确认导入后触发报错。报错截图显示系统提示input is empty。

## 可能原因
报错大概率由前端数据集合处理删除的逻辑缺陷引发。当用户新增索引后又删除该索引时，前端数据集合的状态未被正确更新，导致提交导入请求时，系统检测到数据集合为空，从而抛出input is empty的校验错误。

## 排查步骤
1. 进入FastGPT公有云的通用知识库页面，选择任意已有的数据集合。
2. 点击页面右上角的插入按钮，在弹出的插入界面中填写任意分块内容。
3. 切换数据索引选项，新增一个新的索引，随后删除该新增的索引。
4. 点击插入界面的确认导入按钮，观察是否出现input is empty报错。

## 解决与验证
该问题源于前端数据集合处理删除的逻辑缺陷，官方将通过修复数据集合删除后的状态更新逻辑解决该问题。验证方式为：按照复现步骤执行操作，若未触发input is empty报错，且数据成功导入知识库，则问题解决。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/3751)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
