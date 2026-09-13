---
title: 解决FastGPT处理文档时的解析异常与块关联问题
slug: /zh/troubleshoot/fastgpt-document-parsing-issue
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1543
source_type: GitHub issue
---

# 解决FastGPT处理文档时的解析异常与块关联问题

## 现象
上传word文档并拆块后，部分层级标题未涵盖对应子层内容；单表excel文件拆块后，块与块之间无关联；pdf文档解析后标题层级关系不明确，整体解析质量待提升。处理过程中需优先保障输入文本的质量，以保障最终输出效果。

## 可能原因
暂无明确已知根因，需结合实际文档格式、解析场景与运行环境按实际情况确认。

## 排查步骤
1. 导出待处理的word、excel、pdf文档，检查原始文档的格式与文本完整性；
2. 查看FastGPT解析后的块结构，核对标题层级覆盖范围、块之间的关联情况；
3. 若处理pdf文档，可先将其转换为md格式后再提交解析。

## 解决与验证
处理excel文件时，可通过添加文件名作为标题的方式关联各子块，优化块间关联效果；处理pdf文档时，建议先将其转换为md格式后再进行拆块等操作；优先保障输入文档的文本质量，以提升解析输出的效果。验证时，可重新提交文档解析，检查标题层级是否覆盖完整、块间是否存在有效关联。

> 来源: [FastGPT GitHub issue #1543](https://github.com/labring/FastGPT/issues/1543)
