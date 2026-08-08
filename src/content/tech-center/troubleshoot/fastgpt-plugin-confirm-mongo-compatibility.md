---
title: 解决FastGPT插件上传确认失败的MongoDB 4.4版本兼容性问题
slug: /zh/troubleshoot/fastgpt-plugin-confirm-mongo-compatibility
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/7106
source_type: GitHub issue
---

# 解决FastGPT插件上传确认失败的MongoDB 4.4版本兼容性问题

## 现象
私有部署FastGPT v4.15.0-beta4时，因运行环境CPU不支持AVX指令集使用MongoDB 4.4.29，在插件上传后的确认阶段会提示确认失败，返回报错信息：
```
MongoServerError: The dollar ($) prefixed field '$schema' in 'data.secretSchema.$schema' is not valid for storage.
```

## 可能原因
该问题由MongoDB 4.4.29的兼容性限制导致，此版本不支持在文档存储中使用带`$`前缀的`$schema`字段，FastGPT插件存储逻辑使用了该格式的字段，触发数据库操作报错。

## 排查步骤
1. 确认当前FastGPT部署版本为v4.15.0-beta4，且使用的MongoDB版本为4.4.29。
2. 查看服务运行日志，匹配报错信息`MongoServerError: The dollar ($) prefixed field '$schema' in 'data.secretSchema.$schema' is not valid for storage.`。
3. 核对运行环境的CPU是否不支持AVX指令集，确认MongoDB版本选择的合理性。

## 解决与验证
解决方法为更换为支持`data.secretSchema.$schema`字段存储的MongoDB版本，替换原MongoDB 4.4.29实例。验证步骤：重新上传插件并完成确认流程，确认不再出现报错且插件上传成功。需按实际环境确认替换后的MongoDB版本是否适配当前FastGPT部署。

> 来源：https://github.com/labring/FastGPT/issues/7106
