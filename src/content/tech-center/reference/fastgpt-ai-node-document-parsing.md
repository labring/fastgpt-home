---
title: FastGPT AI节点中文档解析的使用方法与适配要点
slug: /zh/reference/fastgpt-ai-node-document-parsing
page_type: 技术速查
source: https://doc.fastgpt.cn/guide/build/general/fileInput
source_type: 官方文档小节
---

# FastGPT AI节点中文档解析的使用方法与适配要点

## 结论
在FastGPT的AI节点中，可通过文档链接输入直接引用文档内容完成解析。4.8.13版本对文件解析逻辑进行了更新，需尽快按新版本规则调整工作流。

## 具体怎么做
1.  进入目标AI节点（AI对话/工具调用）的配置界面。
2.  配置文档链接输入项，输入`Array<string>`类型的文档URL数组。
3.  系统将自动解析指定URL的文档内容，按固定模板拼接提示词并置入`role=system`的消息中。固定提示词模板为：将`<FilesContent></FilesContent>`中的内容作为本次对话的参考: `<FilesContent>{{quote}}</FilesContent>`。

## 注意事项
1.  4.8.13版本与4.8.9版本存在差异，虽做了向下兼容，但后续将移除兼容性代码，需尽快调整工作流。
2.  简易模式将强制进行文件解析，不再由模型决策是否解析。
3.  文档解析不再解析历史记录中的文件。
4.  工具调用、AI对话支持直接选择文档引用，无需挂载文档解析节点，会自动解析历史记录中的文件。
5.  插件单独运行不再支持全局文件，插件输入需配置文件类型。
6.  工作流调用插件时，不再自动传递工作流上传的文件到插件，需手动给插件输入指定变量。
7.  工作流调用子工作流时，不再自动传递工作流上传的文件到子工作流，需手动选择需要传递的文件链接。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/guide/build/general/fileInput)
