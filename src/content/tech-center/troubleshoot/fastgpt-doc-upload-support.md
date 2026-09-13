---
title: 解决FastGPT无法将.doc格式文档上传至知识库的问题
slug: /zh/troubleshoot/fastgpt-doc-upload-support
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1129
source_type: GitHub issue
---

# 解决FastGPT无法将.doc格式文档上传至知识库的问题

## 现象
在FastGPT的知识库文档上传流程中，可选的文档类型列表未包含.doc格式。用户在使用过程中发现，现有功能仅支持.docx等格式的文档导入，未提供.doc格式的导入选项。企业内部存在大量.doc格式文档的使用场景，现有功能无法满足该类文档的导入需求，影响业务文档的知识库搭建工作。

## 可能原因
当前FastGPT未内置.doc文档类型的上传适配逻辑，暂未针对该格式文档开发上传与解析的支持功能，因此无法在上传界面中提供.doc格式的选项，导致无法完成该类文档的导入。

## 排查步骤
1.  登录FastGPT系统，进入需要导入文档的目标知识库管理页面。
2.  点击页面中的文档上传入口，打开添加文档的选择界面。
3.  查看界面中列出的可选文档类型，确认是否存在.doc格式选项。
4.  准备一份标准的.doc格式测试文档，尝试按照正常流程执行上传操作，观察是否出现无法选择或上传失败的情况。

## 解决与验证
当前FastGPT暂不支持.doc格式文档的上传导入。相关开发反馈显示，该功能的适配存在一定难度，暂无明确的上线计划。若需使用该功能，可关注官方发布的功能更新动态，或通过官方渠道提交功能需求申请，以推动该功能的适配开发。

> 来源: [FastGPT GitHub issue #1129](https://github.com/labring/FastGPT/issues/1129)
