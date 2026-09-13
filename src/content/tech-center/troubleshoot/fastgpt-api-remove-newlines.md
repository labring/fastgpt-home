---
title: 解决FastGPT API调用返回结果包含换行符的问题
slug: /zh/troubleshoot/fastgpt-api-remove-newlines
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/4025
source_type: GitHub issue
---

# 解决FastGPT API调用返回结果包含换行符的问题

## 现象
API调用返回的JSON结果中包含\n换行符，示例返回内容如下：
```json
{
    "发票图片fapiao1.png": "发票代码：2391200000004155751  \n开票日期：2023年06月19日  \n购买方信息：\n- 名称：白望股份有限公司\n- 纳税人识别号：91110108339805094M\n销售方信息：\n- 名称：华住酒店管理有限公司大连分公司\n- 纳税人识别号：912102020715550843F\n项目名称：住宿服务+住宿费\n规格型号：无\n单位：天\n数量：1\n单价：350.94\n金额：350.94\n税率/征收率：6%\n税额：21.06\n价税合计（大写）：叁佰柒拾贰圆整\n（小写）：372.00\n备注：无\n开票人：辛梦娟"
}
```

## 可能原因
需按实际环境确认，可能与API返回内容的格式处理逻辑相关。

## 排查步骤
1. 提取API调用的完整原始返回结果，确认\n换行符的具体存在位置与出现频率。
2. 核对发起API调用的请求参数与配置项是否符合预期。
3. 检查FastGPT内容解析环节的处理逻辑。

## 解决与验证
需根据实际排查结果调整相关配置或处理逻辑。验证方式为重新发起API调用，确认返回结果中的文本字段不再包含\n换行符。

> 来源: [FastGPT GitHub issue #4025](https://github.com/labring/FastGPT/issues/4025)
