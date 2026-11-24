---
title: 配置FastGPT HTTP节点的接口返回值提取规则与方法
slug: /zh/node/fastgpt-http-return-value-extract
page_type: 工作流节点
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/http
source_type: 官方文档小节
---

# 配置FastGPT HTTP节点的接口返回值提取规则与方法

FastGPT的HTTP节点支持配置多组返回值提取规则，用于解析调用外部接口后得到的响应内容。用户可以通过这些规则提取接口响应中的指定字段，供后续工作流节点使用。提取规则基于JSONPath语法实现，完整语法可参考JSONPath-Plus官方文档。

### 配置返回值提取的具体步骤
1.  进入HTTP节点的配置页面，找到返回值提取配置区域，点击添加新的提取项。
2.  为提取项配置自定义key，该key遵循JavaScript对象的取值规则。例如要获取接口响应中的`message`字段，key可直接填写`message`；要获取`data.user.name`字段，key可填写`data.user.name`；要获取`data.list`数组的第二个元素，key可填写`data.list[1]`。
3.  填写对应的JSONPath表达式，用于定位接口响应中的目标内容。例如获取`message`字段的表达式为`$.message`，获取`data.user.name`的表达式为`$.data.user.name`，获取`data.list`第二个元素的表达式为`$.data.list[1]`。
4.  若需要将提取结果转为JSON字符串输出，可选择输出类型为字符串，系统会自动将提取到的内容序列化为标准JSON格式。

### 提取规则示例说明
我们可以通过一个完整的接口响应示例来演示提取效果。假设接口返回的响应内容为：
```json
{
  "message": "测试",
  "data": {
    "user": {
      "name": "xxx",
      "age": 12
    },
    "list": [
      {
        "name": "xxx",
        "age": 50
      },
      [{ "test": 22 }]
    ],
    "psw": "xxx"
  }
}
```
通过不同的JSONPath表达式，可以提取到对应的内容：
- `$.message` 提取结果为`"测试"`
- `$.data.user.name` 提取结果为`"xxx"`
- `$.data.list[0].age` 提取结果为`50`
- `$.data.list[1][0].test` 提取结果为`22`
每个提取项配置的key会作为后续节点引用该值的标识，例如配置key为`data.user.name`后，后续节点可以通过该key获取提取到的用户名内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/http)
