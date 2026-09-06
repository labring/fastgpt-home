---
title: FastGPT 知识库导出与 Excel 校对：格式和权限检查
slug: /zh/troubleshoot/fastgpt-knowledgebase-excel-export
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/458
source_type: GitHub issue
---

# FastGPT 知识库导出与 Excel 校对：格式和权限检查

FastGPT 知识库支持导出数据，可用 Excel 打开 CSV 后审核问答。排查时核对导出入口、知识库编辑权限、文件格式与导出条数，并保留原始备份文件。

## 功能依据与格式范围

[Issue #458 的维护者答复](https://github.com/labring/FastGPT/issues/458) 在 2023 年 11 月指出知识库卡片页可导出。当前[知识库导出实现](https://github.com/labring/FastGPT/blob/2bf700cff08a9a6f453bbb241f7974c1bf1d0210/projects/app/src/pages/api/core/dataset/exportAll.ts) 输出带 UTF-8 标记的 CSV，包含 `q`、`a` 和索引列，存在元数据时包含 `metadata`；该实现校验编辑权限并限制单次最多 50,000 条数据。

## 操作与排查

1. 用有目标知识库编辑权限的账号进入知识库卡片页，在操作菜单中找到导出入口。入口名称随版本变化，记录实际版本和菜单截图。
2. 先导出少量测试问答，检查下载响应、文件扩展名和实际内容。导出受限时核对账号权限及团队导出频率限制。
3. 用 Excel 按 UTF-8 和逗号分隔方式导入 CSV，核对问题、答案、换行和引号。需要 `.xlsx` 审核文件时，另存副本并保留原 CSV。
4. 将导出行数与预期范围对照。超过当前实现单次上限的知识库，应在备份方案中明确分批范围并逐批验证完整性。

## 验证结果

抽查含中文、逗号和多行文本的记录，确认 `q`、`a` 对应正确。需要回导时，按[官方模板导入规范](https://doc.fastgpt.cn/zh-CN/guide/dataset/template) 单独准备文件，并先用测试知识库验证。
