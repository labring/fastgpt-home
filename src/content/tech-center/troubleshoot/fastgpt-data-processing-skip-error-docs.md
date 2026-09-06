---
title: 解决FastGPT数据处理阶段异常文档导致任务中断的问题
slug: /zh/troubleshoot/fastgpt-data-processing-skip-error-docs
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2418
source_type: GitHub issue
---

# 解决FastGPT数据处理阶段异常文档导致任务中断的问题

## 现象
私有部署4.8.9版本的FastGPT，在数据处理阶段，部分包含密码或无法正常解析处理的文档会导致数据处理任务中断。需手动删除存在问题的文档后，才能继续执行数据处理流程。

## 可能原因
需按实际环境确认。当前已知触发场景为文档包含密码或无法被正常解析，具体根原因需结合日志信息进一步排查。

## 排查步骤
1. 查看数据处理阶段的日志截图，定位异常文档的具体信息。
2. 核对异常文档的格式、权限设置，确认是否存在加密或格式不兼容的情况。
3. 移除或修复排查出的异常文档后，重新执行数据处理任务，观察是否仍出现中断问题。

## 解决与验证
目前该场景的官方配置项或自动跳过逻辑需按实际环境确认。若需实现跳过异常文档继续处理的功能，需参考FastGPT官方文档或社区方案进行调整。验证方式为：执行数据处理任务，确认存在异常文档时任务可自动继续运行，无需手动删除异常文档。

> 来源: [FastGPT GitHub issue #2418](https://github.com/labring/FastGPT/issues/2418)
