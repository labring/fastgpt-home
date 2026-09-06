---
title: 解决FastGPT平台批量上传大量文件受限的问题
slug: /zh/troubleshoot/fastgpt-batch-file-upload-solution
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/570
source_type: GitHub issue
---

# 解决FastGPT平台批量上传大量文件受限的问题

## 现象
用户在使用FastGPT管理知识库时，遇到文件上传限制问题，无法通过常规页面操作批量上传大量文件，单文件上传流程繁琐，难以高效完成大规模知识库文件导入。

## 可能原因
当前线程未明确披露具体限制的技术原因，需结合实际部署环境确认，常见关联场景为平台内置单文件上传数量或大小限制，或缺乏官方提供的批量导入接口。

## 排查步骤
1.  获取登录令牌：打开浏览器F12开发者工具，切换至Application面板，在Storage/local storage中查找并复制Token，其格式为类似xxx.yyy.zzz的字符串。
2.  获取知识库ID：在FastGPT平台手动创建目标知识库，进入知识库设置页面，复制对应的dataset_id参数。
3.  整理文件列表：收集需要上传的本地文件的完整路径，例如['/data/1.txt', '/data/2.txt', '/data/3.txt']。
4.  确认接口地址：根据FastGPT实际部署的后端服务地址，替换示例中的`http://xxx:8222`为真实接口基础地址。

## 解决与验证
通过依次调用三个官方后端接口完成批量文件上传与知识库导入：
1.  上传文件：调用`http://xxx:8222/api/common/file/upload`接口，请求参数包含`metadata={"datasetId": dataset_id}`、`bucketName="dataset"`，上传本地文件的二进制流，同时在请求头中携带`Token`参数，超时设置为30秒。
2.  创建集合：调用`http://xxx:8222/api/core/dataset/collection/create`接口，传入知识库ID、文件名与上一步获取的file_id，获取对应的集合IDcollection_id。
3.  推送数据：调用`http://xxx:8222/api/core/dataset/data/pushData`接口，传入集合ID与文本内容，系统将自动构建向量索引。
循环遍历所有待上传文件，依次执行上述流程即可完成批量导入。验证时可前往对应知识库页面，查看已成功导入的文件与集合信息。

> 来源: [FastGPT GitHub issue #570](https://github.com/labring/FastGPT/issues/570)
