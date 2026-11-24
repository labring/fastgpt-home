---
title: FastGPT 4.16.0版本新增功能技术速查
slug: /zh/reference/fastgpt-4-16-0-new-features
page_type: 技术速查
source: https://doc.fastgpt.cn/self-host/upgrading/4-16/41601
source_type: 官方文档小节
---

# FastGPT 4.16.0版本新增功能技术速查

## 结论
本页整理FastGPT 4.16.0版本的官方新增功能，覆盖Sandbox、工作流、知识库、上传等多个模块，可直接参考对应说明完成配置与使用。

## 具体怎么做
1. 知识库数据导入：使用包含q、a、metadata、index表头的CSV或XLSX文件，q、a、metadata各占一列，index可多列且顺序任意；Excel文件仅支持单个工作表且无合并单元格，无法正确解析的文件会提示“文件格式异常”。
2. 系统工具密钥配置：管理员配置时系统自动加密，兼容已配置的密钥。
3. 工作流与ChatAgent配置：工作流工具节点可指定输入参数由Agent自动生成，保留固定值、引用和用户输入等配置；ChatAgent选择工具时，可手动指定是否由AI生成参数。
4. Sandbox使用：同一App、同一用户的多个对话复用Sandbox，通过独立session目录隔离各对话文件；支持通过短期只读链接直接预览Sandbox HTML和文件，无需重复上传到对象存储。
5. App Workflow更新：当Sandbox Provider或运行时镜像变化时，自动归档并恢复Workspace，升级过程静默完成。
6. 新增大文件分块上传功能；技能列表新增空状态引导与选择联动功能。

## 注意事项
1. 知识库导入时，Excel文件不能包含合并单元格且仅支持单个工作表。
2. 无法正确解析的CSV或Excel文件会触发“文件格式异常”提示。
3. Sandbox的会话隔离仅适用于同一App、同一用户的多对话场景。
4. 所有新增功能的操作需在FastGPT对应模块中完成，无需额外工具。

> 来源：[FastGPT 官方文档](https://doc.fastgpt.cn/self-host/upgrading/4-16/41601)
