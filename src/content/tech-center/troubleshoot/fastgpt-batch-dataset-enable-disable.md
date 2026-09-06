---
title: 批量启用禁用FastGPT数据集文件的操作指南
slug: /zh/troubleshoot/fastgpt-batch-dataset-enable-disable
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/2419
source_type: GitHub issue
---

# 批量启用禁用FastGPT数据集文件的操作指南

## 现象
手动逐个点击FastGPT数据集文件的启用或禁用按钮，操作繁琐且效率较低，无法快速完成批量操作。

## 可能原因
FastGPT未内置批量启用禁用数据集文件的功能，需通过自定义脚本实现批量操作。

## 排查步骤
1. 访问需要操作的FastGPT数据集文件页面，从当前URL中提取datasetId与parentId参数值。
2. 按下F12打开浏览器开发者工具，切换至控制台标签页。
3. 将提供的批量操作脚本复制至控制台，补充完整文件状态更新的collectionId与启用禁用参数后执行脚本。

## 解决与验证
可通过浏览器控制台执行自定义脚本完成批量操作，原提供的脚本核心逻辑如下（需补充完整参数后执行）：
```javascript
// 获取URL参数工具函数
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
// 提取数据集与父文件夹ID
const datasetId = getQueryParam('datasetId');
const parentId = getQueryParam('parentId');
// 获取分页数据
function fetchPageData(pageNum) {
    return fetch("/api/core/dataset/collection/list", {
        headers: {"accept": "application/json, text/plain, */*", "content-type": "application/json"},
        body: JSON.stringify({pageNum, pageSize:30, datasetId, parentId, searchText:"", filterTags:[]}),
        method: "POST",
        credentials: "include"
    }).then(res => res.json());
}
// 更新文件状态
function updateFileStatus(fileId) {
    return fetch("/api/core/dataset/collection/update", {
        headers: {"accept": "application/json, text/plain, */*", "content-type": "application/json"},
        body: JSON.stringify({collectionId: fileId, isEnabled: false}),
        method: "POST",
        credentials: "include"
    });
}
```
执行脚本后，可查看页面文件状态是否按预期变更，完成批量启用或禁用操作。

> 来源: [FastGPT GitHub issue #2419](https://github.com/labring/FastGPT/issues/2419)
