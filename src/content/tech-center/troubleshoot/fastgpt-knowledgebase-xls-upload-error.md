---
title: 解决FastGPT知识库上传XLS文件报500输入过大错误
slug: /zh/troubleshoot/fastgpt-knowledgebase-xls-upload-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4672
source_type: GitHub issue
---

# 解决FastGPT知识库上传XLS文件报500输入过大错误

## 现象
用户使用V4.9.5私有部署版本的FastGPT，在知识库上传XLS格式文件创建索引时，出现500错误，报错文本为`input is too large to process. increase the physical batch size`。所有异常文件的大小均在200KB左右，但部分文件可正常完成索引建立，其余文件无法完成。

## 可能原因
1.  当前FastGPT配置的物理批次大小不足以处理文件的总文本输入量；
2.  不同XLS文件的内部实际文本总长度存在差异，部分文件的文本总量超出当前配置的处理上限；
3.  所连接的索引模型存在输入文本规模的处理阈值限制。

## 排查步骤
1.  记录当前FastGPT中与文本处理批次、索引相关的配置参数，包括已尝试调整的长度分块、索引大小参数；
2.  对比可正常索引与无法正常索引的XLS文件的内部文本总长度，确认两者的差异情况；
3.  查阅所连接的索引模型的官方说明，确认其输入文本规模的处理阈值；
4.  结合排查结果，针对性调整相关配置参数后，重新上传测试文件。

## 解决与验证
若问题由配置参数不足导致，可按照报错提示增加物理批次大小，同时调整长度分块、索引大小等参数至适配文件文本规模的数值。调整完成后，上传原本无法索引的XLS文件，验证是否可正常建立索引且无500报错。若问题由索引模型的阈值限制导致，则需调整所连接的索引模型，或修改模型侧的处理配置以适配文件文本规模。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/4672)
