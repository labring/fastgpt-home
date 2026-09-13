---
title: 解决FastGPT上传含可执行代码的MD文档导入失败的问题
slug: /zh/troubleshoot/fastgpt-markdown-upload-troubleshooting
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/617
source_type: GitHub issue
---

# 解决FastGPT上传含可执行代码的MD文档导入失败的问题

## 现象
在FastGPT私有部署版本中，上传Markdown文档进行分段处理时，平台会执行文档内的JS代码，导致导入失败。具体存在两种测试场景：一是上传包含`var name = "<img src=x onerror=alert(1)>"; el.innerHTML = name;`代码片段的文档，会在浏览器弹出提示窗口；二是上传包含`<base href="http://www.example.com/page.html">`代码片段的文档，会触发网络错误。

## 可能原因
FastGPT在处理上传的Markdown文档时，未对文档内的可执行脚本代码进行安全过滤，导致其中的JS代码被执行，或异常HTML标签引发页面异常，最终造成文档导入失败。

## 排查步骤
1. 构建测试用Markdown文档，可使用issue提供的两个代码片段：一是写入`var name = "<img src=x onerror=alert(1)>"; el.innerHTML = name;`的JS代码片段，二是写入`<base href="http://www.example.com/page.html">`的HTML代码片段。
2. 登录FastGPT私有部署实例，进入文档上传功能入口。
3. 上传测试用的Markdown文档，观察是否出现浏览器弹窗或网络错误，确认导入失败现象。
4. 确认当前使用的FastGPT版本为私有部署版本。
5. 检查上传文档的格式，确认无其他非预期的代码内容。

## 解决与验证
### 临时规避方案
暂时不在上传的Markdown文档中包含可执行JS代码或`<base>`等可能引发异常的HTML标签。若需展示代码片段，可将代码以纯文本块形式包裹，避免被解析为可执行内容。
### 验证方法
1. 修改测试用Markdown文档，移除所有可执行脚本和异常HTML标签。
2. 重新上传修改后的文档，确认可以正常导入，无弹窗或网络错误。
3. 若需使用代码内容，可通过纯文本块形式封装后再上传。

> 来源：[FastGPT GitHub issue](https://github.com/labring/FastGPT/issues/617)
