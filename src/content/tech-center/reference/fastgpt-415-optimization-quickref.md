---
title: FastGPT 4.15版本官方优化功能技术速查
slug: /zh/reference/fastgpt-415-optimization-quickref
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-15/41500
source_type: 官方文档小节
---

# FastGPT 4.15版本官方优化功能技术速查

## 结论
本页整理了FastGPT 4.15版本的官方优化项，覆盖插件、工作流、知识库、安全防护等多个模块，可提升系统运行效率、交互体验与安全性。

## 具体怎么做
1. 配置图片处理线程：通过设置环境变量`MULTIPLE_DATA_TO_BASE64=true`，控制是否将图片处理结果转为base64发送给模型。
2. 其余优化项均为该版本升级后默认启用，包括：插件运行入口从对象存储拉取并缓存至本地目录、禁用工作流无效连接模式、工作流父子节点选中互斥、优化工作流节点名称与超长名称适配、工作流编辑页登录失效自动保存草稿、HTML输出后自动切换为预览、知识库搜索测试交互优化、PDF解析替换为liteparse（速度提升3倍）、XLSX解析自动去除空行空列并补充合并单元格、文件注入messages位置从system调整至user、工具运行空响应自动补充none、应用/知识库增加虚拟列表渲染优化大列表加载性能等。

## 注意事项
1. 仅当配置`MULTIPLE_DATA_TO_BASE64=true`环境变量时，图片处理线程的base64转换功能才会生效。
2. 工作流编辑页登录失效后，系统自动保存草稿，无需手动操作恢复。
3. 知识库被删除后，应用编排时会弹出优雅提示，需及时处理关联引用。
4. 加强的安全防护会自动校验第三方知识库请求、HTTP tool parse、IP检测和Code Sandbox AST检查等操作，无需额外配置。
5. 非管理员/访客触发余额不足时会收到优化后的提示，无创建权限时模板功能会被隐藏。
6. 应用、知识库、文件和文件夹等长名称超出宽度时自动省略，hover时展示完整内容。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-15/41500)
