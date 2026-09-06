---
title: 解决FastGPT知识库导入.xlsx格式文件失败的问题
slug: /zh/troubleshoot/fastgpt-xlsx-import-fix
page_type: 排错/错误码
source: https://github.com/labring/FastGPT/issues/1058
source_type: GitHub issue
---

# 解决FastGPT知识库导入.xlsx格式文件失败的问题

## 现象
FastGPT知识库导入数据集时，无法识别并导入.xlsx格式文档，现有版本未内置该格式的导入支持功能，无法处理企业内部占比较大的.xlsx类型文档，无法满足企业内部文档导入的实际需求。

## 可能原因
FastGPT当前版本未内置.xlsx格式文件的解析逻辑，且未安装对应的文件解析依赖包，导致无法正确读取并转换.xlsx文档的内容。

## 排查步骤
1. 确认待导入的.xlsx文件未损坏、未加密，格式符合标准规范。
2. 检查FastGPT项目中是否已添加.xlsx文件的解析代码与依赖配置。
3. 需按实际环境确认其他可能影响文档导入的配置项。

## 解决与验证
1. 安装.xlsx文件解析依赖包，执行命令：npm install exceljs。
2. 参考FastGPT项目中csv.ts文件的现有逻辑，将readExcelContent函数集成至对应导入流程中，替换或补充原有的文档解析流程：
```typescript
import * as ExcelJS from 'exceljs';

export const readExcelContent = async ({ file }: { file: File }) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.worksheets[0];
    const xlsxArr: string[][] = [];
    worksheet.eachRow({ includeEmpty: true }, row => {
      const rowValues = row.values as string[];
      xlsxArr.push(rowValues);
    });
    const header = xlsxArr.shift() as string[];
    const rawText = xlsxArr
      .map((item) =>
        item.map((value, index) => {
          if (!header[index]) return value;
          return `${header[index]}: ${value}`;
        })
      )
      .flat()
      .join('\n');
    return { rawText, header, data: xlsxArr.map(item => item) };
  } catch (error) {
    return Promise.reject('解析 xlsx 文件失败');
  }
};
```
3. 上传.xlsx格式的文档至知识库导入数据集，验证解析结果是否正常生成对应的文本内容，确认导入流程是否成功。

> 来源: [FastGPT GitHub issue #1058](https://github.com/labring/FastGPT/issues/1058)
