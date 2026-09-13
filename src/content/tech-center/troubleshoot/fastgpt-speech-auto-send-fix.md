---
title: 解决FastGPT语音输入自动发送功能异常问题
slug: /zh/troubleshoot/fastgpt-speech-auto-send-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4378
source_type: GitHub issue
---

# 解决FastGPT语音输入自动发送功能异常问题

## 现象
语音对话场景中，勾选自动发送功能后，仍需手动点击发送按钮；同时存在语音输入满60秒后自动发送的逻辑。

## 可能原因
原语音输入代码未实现基于音频音量的静音检测逻辑，仅通过固定时长触发自动发送，无法准确判断用户是否停止说话，导致自动发送功能不符合预期。

## 排查步骤
1.  定位到项目中的`useSpeech.ts`文件，查看语音输入相关的核心代码
2.  检查是否存在固定时长触发自动发送的逻辑
3.  验证音频处理模块是否包含静音检测相关的实现代码

## 解决与验证
1.  在`useSpeech.ts`中添加静音计数器`silenceCounter`与音频分析器`analyserRef`的ref对象
2.  实现静音检测函数`checkSilence`：通过音频分析器获取频率数据，计算平均音量。当音量低于20时递增计数器，连续3次检测到低音量时调用`stopSpeak`停止录音并发送结果；音量正常时重置计数器
3.  在`startSpeak`函数中初始化音频上下文与分析器，添加每1000毫秒执行一次的静音检测定时器
4.  验证修改效果：停止说话后，系统将自动触发发送操作，相关逻辑需按实际环境确认调整

> 来源: [FastGPT GitHub issue #4378](https://github.com/labring/FastGPT/issues/4378)
