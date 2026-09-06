---
title: 解决FastGPT 4.9.6版工作流保存聊天记录时offset超出范围报错
slug: /zh/troubleshoot/fastgpt-offset-out-range-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5079
source_type: GitHub issue
---

# 解决FastGPT 4.9.6版工作流保存聊天记录时offset超出范围报错

## 现象
在FastGPT 4.9.6私有部署版本中，当工作流较长，上传1.8M/4.3M图片经过多个AI对象节点，再触发跟随用户输入节点的用户选择操作时，保存聊天记录会触发报错。报错完整文本为：`The value of "offset" is out of range. It must be >= 0 && <= 17825792. Received 17825796`，对应的堆栈信息包含`Buffer.write`、`encodeUTF8Into`相关调用。

## 可能原因
该报错属于Node.js原生的`ERR_OUT_OF_RANGE`错误，触发逻辑为：在处理聊天记录内容时，写入缓冲区的偏移值超出了`Buffer.write`允许的范围（最大为17825792）。结合长工作流与大尺寸图片的场景，单轮聊天记录的总数据量过大，导致最终偏移值达到17825796，超出阈值触发报错。

## 排查步骤
1.  确认当前使用的FastGPT版本为4.9.6私有部署版，复现场景是否符合长工作流、上传1.8M/4.3M尺寸图片后经过多AI节点、触发用户选择节点的流程。
2.  查看服务端日志，确认是否出现指定的offset超出范围报错文本，以及堆栈中包含`Buffer.write`、`encodeUTF8Into`相关调用记录。
3.  估算工作流各节点输出内容的总长度，判断是否接近或超过17825792字节的阈值。

## 解决与验证
1.  尝试拆分过长的工作流，减少单轮聊天记录的总内容长度，避免超出Buffer偏移阈值。
2.  优化工作流节点逻辑，减少冗余的输出内容，降低单轮聊天记录的总数据量。
3.  修改完成后，重新触发用户选择节点操作，验证聊天记录可以正常保存，无offset超出范围报错。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5079)
