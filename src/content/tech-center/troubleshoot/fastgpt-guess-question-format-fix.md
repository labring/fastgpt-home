---
title: 解决FastGPT猜你想问功能返回格式异常问题
slug: /zh/troubleshoot/fastgpt-guess-question-format-fix
page_type: 故障排查
source: https://github.com/labring/FastGPT/issues/1301
source_type: GitHub issue
---

# 解决FastGPT猜你想问功能返回格式异常问题

## 现象
调用api/core/ai/agent/createQuestionGuide接口后，返回了包含自定义问题列表的响应数据，但猜你想问功能无法正常回显。接口返回示例数据如下：
```json
{
    "code": 200,
    "statusText": "",
    "message": "",
    "data": [
        {
            "问题1": "如何提高学员的课程参与度？",
            "问题2": "如何通过优惠吸引新学员？",
            "问题3": "如何利用学员社群增加出勤率？"
        }
    ]
}
```

## 可能原因
1.  返回的猜你想问数据格式不符合FastGPT预设的解析格式要求。
2.  未正确配置猜你想问功能的自定义prompt，需按实际环境确认配置项。

## 排查步骤
1.  查看api/core/ai/agent/createQuestionGuide接口的实际返回数据，记录完整的响应结构。
2.  核对返回数据中data字段的结构是否符合FastGPT的解析规则。
3.  检查猜你想问功能的自定义prompt配置是否符合要求，需按实际环境调整。

## 解决与验证
将返回数据中的data字段调整为符合FastGPT标准的格式，例如将问题列表以字符串数组形式直接放入data字段。调整后的示例数据如下：
```json
{
    "code": 200,
    "statusText": "",
    "message": "",
    "data": [
        "如何提高学员的课程参与度？",
        "如何通过优惠吸引新学员？",
        "如何利用学员社群增加出勤率？"
    ]
}
```
调整后重新调用接口，确认猜你想问功能可正常展示返回的问题列表。如需自定义猜你想问的prompt，需按实际环境配置对应参数。

> 来源： [FastGPT 官方来源](https://github.com/labring/FastGPT/issues/1301)

## 适用性与版本范围

本页适用于官方来源记录的 故障排查 场景。执行变更前，需核对 FastGPT、依赖、API 与部署版本。

## 安全护栏

凭证与私密数据使用 [REDACTED_CREDENTIAL] 占位符。执行操作前需核对文档的环境与版本。

## 回滚指引

恢复变更前的技术内容权威快照、已保存配置与数据快照，再执行最小验证场景。
