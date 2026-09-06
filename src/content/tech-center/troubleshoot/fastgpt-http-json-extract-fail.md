---
title: 解决FastGPT HTTP请求模块无法抓取返回JSON值的问题
slug: /zh/troubleshoot/fastgpt-http-json-extract-fail
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1472
source_type: GitHub issue
---

# 解决FastGPT HTTP请求模块无法抓取返回JSON值的问题

## 现象
在FastGPT 4.7.1私有部署版本中，使用HTTP请求模块时无法抓取到接口返回的内容。该接口返回的JSON格式为：
```json
[
    {
      "STATUS": "Finish",
      "MODEL": "ABC-123-111",
      "REQUESTDATE": "2021-03-08 15:58:56",
      "RECEIVEDATE": "2021-03-10 10:20:39",
      "SHIP_DATE": "2021-03-11 17:10:33"
    }
]
```

## 可能原因
暂无明确已知的固定触发原因，需结合实际的HTTP请求模块配置、接口返回数据结构与提取规则进行排查。

## 排查步骤
1. 调用目标接口，确认实际返回的JSON内容与issue中给出的结构一致。
2. 检查HTTP请求模块中配置的参数提取规则，确认是否匹配返回数据的格式。
3. 确认当前使用的FastGPT版本为4.7.1私有部署版本。
4. 查看系统运行日志，确认是否存在与HTTP请求解析相关的异常信息。

## 解决与验证
若排查后确认参数提取规则与返回数据结构不匹配，需调整提取路径以适配返回的JSON格式。验证方式为重新发起HTTP请求，确认可以正确抓取到返回的JSON值并在流程中正常使用。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/1472)
