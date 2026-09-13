---
title: 解决FastGPT平台Gapier相关文档无法正常访问的问题
slug: /zh/troubleshoot/fastgpt-gapier-document-access-issues
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4055
source_type: GitHub issue
---

# 解决FastGPT平台Gapier相关文档无法正常访问的问题

## 现象
用户遇到两类典型问题：一是无法通过官方渠道找到Gapier相关文档，二是通过官网检索Gapier相关内容时，返回的页面显示404错误，无法正常浏览目标文档。

## 可能原因
目前未明确披露具体触发原因，可能涉及文档路径调整、检索索引未同步更新或文档分类变更等情况，需结合实际访问或部署环境确认。

## 排查步骤
1.  尝试访问官方提供的Gapier文档固定链接：https://doc.fastgpt.cn/docs/guide/workbench/gapier/，确认链接是否可正常打开。
2.  通过官网检索功能查找Gapier相关内容时，确认检索关键词的准确性，以及检索范围是否覆盖目标文档分类。
3.  手动浏览官方文档的工作台分类目录，逐层级查找Gapier相关文档条目，确认文档是否存在于目录中。

## 解决与验证
若访问官方提供的Gapier文档固定链接可正常打开，说明文档未被删除，可通过手动浏览文档目录或使用准确关键词检索的方式找到目标文档。若链接返回404错误，需确认文档是否已被调整至其他路径，或确认文档当前的发布状态。验证标准为成功访问Gapier相关文档页面，或通过官网检索正常获取到可打开的有效文档链接。

> 来源: [FastGPT GitHub issue #4055](https://github.com/labring/FastGPT/issues/4055)
