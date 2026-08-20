---
title: 解决FastGPT上传8M左右Excel文件训练异常问题
slug: /zh/troubleshoot/fastgpt-excel-training-size-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/6924
source_type: GitHub issue
---

# 解决FastGPT上传8M左右Excel文件训练异常问题

## 现象
在FastGPT私有部署V4.12.3版本中，上传8M左右的Excel文件到知识库时，页面显示训练异常。后台日志包含以下内容：首先是`Cannot access the 'require' function: "TypeError: process.getBuiltinModule is not a function"`，以及DOMMatrix、ImageData、Path2D无法polyfill的警告；随后出现多个图片上传成功的日志，以及Worker执行readFile、text2Chunks的耗时记录；最终报错显示`Total size of all transaction operations must be less than 16793600. Actual size is 16794248`，日志未完整展示stack信息。

## 可能原因
一是MongoDB单事务操作的总大小限制：MongoDB默认单事务操作总大小上限为16793600字节（约16MB），本次上传的Excel文件解析后的数据总大小超出了该阈值，触发插入错误。二是运行环境的Node.js版本与项目依赖不兼容，导致无法访问`process.getBuiltinModule`函数，同时引发部分DOM相关polyfill无法加载的警告。

## 排查步骤
1.  查看FastGPT后台运行日志，确认是否存在`Total size of all transaction operations must be less than 16793600`的错误信息，以及`process.getBuiltinModule is not a function`的警告。
2.  核对上传文件的原始大小，确认解析后的数据总大小是否接近或超过16793600字节的阈值。
3.  检查当前运行FastGPT的Node.js版本，确认是否符合项目依赖的版本要求（需按实际环境确认）。
4.  确认MongoDB的配置是否存在自定义调整的事务相关参数（需按实际环境确认）。

## 解决与验证
针对事务操作总大小超限的问题，可将原Excel文件拆分为多个更小的文件后分别上传，避免单次事务处理的数据总大小超过16793600字节。针对`process.getBuiltinModule`相关的警告，需升级Node.js版本至符合项目依赖要求的版本（需按实际环境确认）。验证方式为：上传拆分后的小文件，确认训练过程无异常，后台日志不再出现对应错误和警告。

> 来源：[FastGPT GitHub Issue #6924](https://github.com/labring/FastGPT/issues/6924)
