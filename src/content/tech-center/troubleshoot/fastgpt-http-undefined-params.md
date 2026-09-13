---
title: 解决FastGPT工具调用后HTTP请求参数附带undefined的问题
slug: /zh/troubleshoot/fastgpt-http-undefined-params
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2444
source_type: GitHub issue
---

# 解决FastGPT工具调用后HTTP请求参数附带undefined的问题

## 现象
用户在私有部署4.89版本的FastGPT中，按照以下流程操作：AI对话节点总结知识库生成内容列表，将结果传入工具调用节点构建SQL查询语句，再通过HTTP请求节点调用query接口。工具调用可正常生成正确的SQL语句，但HTTP请求的input参数尾部会自动添加1至3个undefined字符串，导致查询失败。

## 可能原因
目前无明确官方根因说明，该问题可能与上下文变量传递逻辑、参数拼接规则相关。可能的触发场景包括：工具调用输出的变量存在未正确赋值的空项，HTTP请求参数配置中引用了不存在的上下文变量，或参数处理环节未过滤空值内容。

## 排查步骤
1.  进入FastGPT的应用编辑页面，定位工具调用节点与HTTP请求节点的配置项。
2.  检查工具调用节点的输出变量绑定，确认所有需要传递至HTTP请求的参数均已正确关联上下文内容，无未配置的空变量。
3.  查看HTTP请求节点的参数配置，核对引用的变量路径是否正确，确认未添加未绑定有效值的占位符。
4.  开启应用调试模式，复现问题流程后查看工具调用的实际输出日志，确认输出内容是否存在空值或未定义项。

## 解决与验证
解决该问题需从参数传递与配置两方面调整：
1.  修正HTTP请求节点的参数配置，移除所有未绑定有效上下文的变量引用，确保仅传递已生成的有效参数。
2.  在工具调用节点的输出处理环节，添加空值过滤逻辑，过滤掉未定义的内容，避免其被带入HTTP请求参数。
3.  重新运行应用流程，验证HTTP请求的实际入参尾部不再出现undefined字符串，确认查询请求可正常执行。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/2444)
