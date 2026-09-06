---
title: 解决FastGPT代码模块执行Python代码的Dangerous behavior detected报错
slug: /zh/troubleshoot/fastgpt-python-dangerous-behavior-error
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/5375
source_type: GitHub issue
---

# 解决FastGPT代码模块执行Python代码的Dangerous behavior detected报错

## 现象
在FastGPT 4.11.1私有部署版本中，使用代码模块执行自定义Python代码时，触发报错`Dangerous behavior detected`。本次报错对应的示例代码为：
```python
import json
def main(data1):
    content = data1.replace('```json', '').replace('```', '').strip()
    jst = json.loads(content)
    gw = jst.get('投递岗位')
    return {
        \"result\": gw
    }
```

## 可能原因
FastGPT的代码执行模块内置了安全防护策略，会对被判定为危险的代码操作进行拦截，从而抛出`Dangerous behavior detected`报错。由于本次报错未提供拦截的具体细节，需结合实际运行环境的日志进一步确认触发拦截的具体代码操作。

## 排查步骤
1.  确认当前FastGPT私有部署版本为4.11.1，核对代码模块中编写的Python代码完整逻辑。
2.  查看报错对应的完整日志信息，定位安全拦截的具体触发点与被禁止的操作类型。
3.  逐一排查代码中可能触发安全限制的操作，比如是否存在系统命令执行、文件读写、敏感模块导入等未授权操作。

## 解决与验证
若排查发现代码存在被安全策略禁止的操作，可调整代码逻辑以规避风险。针对本次示例中的代码，可先确认是否存在未被注意到的危险操作，或联系运维人员确认当前FastGPT安全策略的具体限制规则。验证方式为修改代码后重新运行代码模块，确认`Dangerous behavior detected`报错不再出现，且代码能正常返回预期的解析结果。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/5375)
