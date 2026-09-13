---
title: FastGPT合并插件无法正常使用的排查与解决方法
slug: /zh/troubleshoot/fastgpt-merge-plugin-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2301
source_type: GitHub issue
---

# FastGPT合并插件无法正常使用的排查与解决方法

## 现象
FastGPT 4.8.1私有部署版本中，合并插件无法正常使用。需调整接口数据格式以适配插件要求，对数据中的ID、name字段填写及数组内容存在疑问，可将HTTP获取或代码运行得到的信息传入AI提示词或文档引用。

## 可能原因
传入合并插件的接口数据格式不符合标准要求，未匹配知识库搜索的格式规范；若使用知识库相关ID，未正确关联实际知识库文件ID。

## 排查步骤
1. 确认当前使用的FastGPT版本为4.8.1私有部署版本，检查已配置的密钥是否可用。
2. 检查传入合并插件的接口数据格式，对比知识库搜索的标准格式进行核对。
3. 核对数据中的ID、name字段，若使用知识库相关ID，需确认ID为知识库文件的实际ID。
4. 测试将获取到的接口信息直接拼接后，传入AI提示词或文档引用。

## 解决与验证
将接口数据格式调整为与知识库搜索一致的格式即可使用合并插件。若无需依赖知识库，可直接将HTTP获取或代码运行得到的信息拼接后，传入AI提示词或文档引用中使用。使用知识库相关ID时，系统会自动关联数据库中的对应文件。验证时可通过HTTP请求或代码运行，将处理后的信息传入插件，确认插件正常工作。

> 来源: [FastGPT GitHub issue #2301](https://github.com/labring/FastGPT/issues/2301)
