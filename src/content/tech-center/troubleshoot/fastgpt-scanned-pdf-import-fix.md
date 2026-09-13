---
title: 解决FastGPT扫描版PDF导入解析失败无提示的问题
slug: /zh/troubleshoot/fastgpt-scanned-pdf-import-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/634
source_type: GitHub issue
---

# 解决FastGPT扫描版PDF导入解析失败无提示的问题

## 现象
在FastGPT 4.6.4公有云版本的数据集创建/导入的文件导入流程中，上传扫描版图片格式的非文本PDF时，无法成功解析文件，且前端页面没有弹出任何错误提示。通过查看项目代码发现，readPdfContent函数返回的文本内容为空。

## 可能原因
问题的核心在于代码逻辑未覆盖非文本PDF的解析空结果场景。readPdfContent函数位于projects/app/src/pages/dataset/detail/components/Import/FileSelect.tsx，该函数会调用readPDFPage函数提取PDF文本。readPDFPage函数与getTextContent函数均位于projects/app/src/web/common/file/utils.ts，当处理扫描版图片PDF时，getTextContent无法提取到有效文本，返回空内容，但readPDFPage未对空的tokenizedText做任何处理，最终导致readPdfContent返回空文本，且前端没有触发错误提示的逻辑。

## 排查步骤
1. 确认待上传的PDF为扫描版图片格式的非文本PDF，可通过使用文本编辑器打开PDF，查看是否无内置可编辑文本；2. 登录FastGPT 4.6.4公有云版本，进入数据集页面，选择创建或导入文件的流程；3. 上传该扫描版PDF，等待解析流程结束后，查看前端是否有解析失败的提示，同时可通过浏览器开发者工具查看接口返回的解析结果是否为空；4. 定位到上述提到的三个代码文件，检查readPdfContent、readPDFPage、getTextContent函数的逻辑，确认是否存在未处理空文本结果的分支。

## 解决与验证
目前有两种符合代码逻辑的修复方向。第一种是在readPdfContent函数的最外层判断解析返回的文本是否为空，若为空则触发前端错误提示逻辑。第二种是在readPDFPage函数内部，对tokenizedText为空的场景添加异常处理分支，确保空结果能被正确捕获并反馈。验证修复效果时，重新上传该扫描版PDF，若前端弹出对应的解析失败提示，且异常状态被正确记录，则该问题得到解决。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/634)
