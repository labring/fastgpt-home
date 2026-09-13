---
title: 解决FastGPT私有部署版API带system-prompt时知识库失效问题
slug: /zh/troubleshoot/fastgpt-system-prompt-kb-failure
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1848
source_type: GitHub issue
---

# 解决FastGPT私有部署版API带system-prompt时知识库失效问题

## 现象
使用FastGPT私有部署V4.8.5版本时，调用API接口携带system-prompt参数后，知识库不会触发搜索操作。将system-prompt参数设置为空值时，知识库依然无法进行搜索。删除system-prompt参数后，知识库搜索功能恢复正常。

## 可能原因
目前未获取到官方明确的根因说明，仅能从复现现象推断，该问题可能与API请求中system-prompt参数的处理逻辑和知识库搜索触发条件存在冲突有关。

## 排查步骤
1.  确认当前FastGPT部署版本为V4.8.5私有部署版。
2.  检查API请求的参数列表，确认是否携带了system-prompt字段。
3.  分别测试三种请求场景：携带非空system-prompt参数、携带空值system-prompt参数、不携带system-prompt参数，观察知识库搜索是否触发。
4.  记录每种场景下的API返回结果与相关日志信息。

## 解决与验证
1.  临时恢复方案：移除API请求中的system-prompt参数，重新发起API请求，验证知识库搜索功能是否恢复正常。
2.  验证步骤：分别测试携带非空system-prompt、空值system-prompt、不携带该参数的API请求，确认仅在不携带system-prompt参数时，知识库可正常触发搜索，与复现现象一致。
3.  如需使用system-prompt功能，需关注官方后续更新或按实际部署环境调整相关参数处理逻辑。

> [FastGPT GitHub issue 1848](https://github.com/labring/FastGPT/issues/1848)
