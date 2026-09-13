---
title: 解决FastGPT中转OneAPI时stream=true无返回值的排查与修复方案
slug: /zh/troubleshoot/fastgpt-oneapi-stream-null-response
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1634
source_type: GitHub issue
---

# 解决FastGPT中转OneAPI时stream=true无返回值的排查与修复方案

## 现象
使用FastGPT中转OneAPI时，请求参数携带stream=true时无返回值；请求参数stream=false时可正常响应。该场景下OneAPI无报错信息。直接调用容器原生接口且stream=true时可正常获取返回值。

## 可能原因
暂未明确具体根因，仅已知该问题仅出现在stream=true的中转场景中，可能与stream模式的中转逻辑或模型转发支持有关。

## 排查步骤
1. 执行curl命令测试容器原生接口，携带stream=true参数，确认容器接口本身是否正常。
2. 执行curl命令测试OneAPI的3001端口接口，携带stream=true参数，确认OneAPI接口本身是否正常。
3. 检查FastGPT中转配置中的stream参数传递是否正确。
4. 查看相关运行日志，定位返回值丢失的具体环节。

## 解决与验证
暂未找到通用修复方案，可通过以下步骤逐步排查：
1. 若容器接口正常但OneAPI接口异常，需排查OneAPI的相关配置。
2. 若容器接口与OneAPI接口均正常，需进一步排查FastGPT的中转逻辑。
3. 按实际环境配置日志采集规则，获取详细信息以定位问题。

> 来源: [FastGPT GitHub issue #1634](https://github.com/labring/FastGPT/issues/1634)
