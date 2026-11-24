---
title: FastGPT沙盒V2节点可直接使用的Python白名单模块速查
slug: /zh/reference/fastgpt-sandbox-v2-python-whitelist-modules
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2
source_type: 官方文档小节
---

# FastGPT沙盒V2节点可直接使用的Python白名单模块速查

## 结论
FastGPT沙盒V2节点支持直接导入指定Python标准库与第三方库，可用于编写自定义代码逻辑。使用时需严格遵循白名单与禁用模块规则。

## 具体怎么做
1. 打开FastGPT沙盒V2节点的代码编辑区域
2. 使用`import`语句直接导入白名单内的模块
3. 调用模块提供的对应功能

### 可用白名单模块分类
- 数学和数值计算：math、cmath、decimal、fractions、random、statistics
- 数据结构和算法：collections、array、heapq、bisect、queue、copy
- 函数式编程：itertools、functools、operator
- 字符串和文本处理：string、re、difflib、textwrap、unicodedata、codecs
- 日期和时间：datetime、time、calendar
- 数据序列化：json、csv、base64、binascii、struct
- 加密和哈希：hashlib、hmac、secrets、uuid
- 类型和抽象：typing、abc、enum、dataclasses、contextlib
- 其他实用工具：pprint、weakref
- 第三方库：numpy、pandas、matplotlib

## 注意事项
禁止使用os、sys、subprocess、socket、urllib、http、requests等涉及系统调用、网络访问、文件系统的模块。调用非白名单模块会触发代码执行报错。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/workflow/nodes/sandbox-v2)
