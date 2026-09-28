---
title: FastGPT 文件格式与解析能力对照表（25 个扩展名 · v4.17.0）
slug: /zh/reference/file-format-support-reference
page_type: 基准数据页
source: https://github.com/labring/FastGPT/tree/v4.17.0/packages/service/worker/readFile
delivery_source_type: 开源仓库解析器定义
source_type: 官方文档
meta_title: FastGPT 文件格式与解析能力对照表（25 个扩展名 · v4.17.0）｜FastGPT 技术中心
schema_type: TechArticle
date_published: 2026-09-28
date_modified: 2026-09-28
source_file: 基准数据页-第2批/中文-fastgpt.cn/reference/file-format-support-reference.md
source_sha256: 6d399212865a5ecab4d8608671c304747ce26ca2ffb30bf0adecf1d80df120d3
source_verified: 2026-09-14
publication_batch: W9
delivery_note: 清单取自 FastGPT v4.17.0 的解析器定义文件，核验日 2026-09-14。
meta_description: 查阅 FastGPT v4.17.0 的文件输入与解析格式，区分内置解析和外部服务要求，并在入库前核对文档内容、格式与解析结果。
---

# FastGPT 文件格式与解析能力对照表（25 个扩展名 · v4.17.0）

本页把仓库中登记的文件解析能力逐条列出：内置解析器覆盖 8 个扩展名，补充解析器再覆盖 17 个，合计 25 个。上传前可用它确认某个格式走哪条解析路径；解析失败时可用它判断问题出在格式支持、体积上限还是外部解析服务。

## 两条解析路径的区别

| 路径 | 覆盖的扩展名 | 说明 |
| --- | --- | --- |
| 内置解析器 | 8 个 | 由仓库内的解析函数直接处理，不依赖外部服务 |
| 补充解析器 | 17 个 | 内置解析器未覆盖的格式，先转换为 Markdown 再入库 |

## 内置解析器覆盖的格式

| 扩展名 | 解析函数 |
| --- | --- |
| `.csv` | `readCsvRawText` |
| `.docx` | `readDocsFile` |
| `.html` | `readHtmlRawText` |
| `.md` | `readFileRawText` |
| `.pdf` | `readPdfFile` |
| `.pptx` | `readPptxRawText` |
| `.txt` | `readFileRawText` |
| `.xlsx` | `readXlsxRawText` |

## 补充解析器覆盖的格式（17 个）

| 扩展名 |
| --- |
| `.doc` |
| `.docm` |
| `.epub` |
| `.odp` |
| `.ods` |
| `.odt` |
| `.pot` |
| `.pps` |
| `.ppsm` |
| `.ppsx` |
| `.ppt` |
| `.pptm` |
| `.rtf` |
| `.wps` |
| `.xls` |
| `.xlsb` |
| `.xlsm` |

清单之外的扩展名会被直接拒绝，报错信息中会写出该扩展名。

## anydoc 补充解析路径的内嵌图片上限

| 项 | 定义中的表达式 | 取值 |
| --- | --- | --- |
| 单张内嵌图片上限 | `10 * 1024 * 1024` | 10,485,760 字节（10 MiB） |
| 内嵌图片总量上限 | `200 * 1024 * 1024` | 209,715,200 字节（200 MiB） |
| 内嵌图片上传并发 | `5` | 5 |

## 与上传解析相关的环境变量

| 变量名 | 默认值 | 说明 |
| --- | --- | --- |
| `FILE_TOKEN_KEY` | — | 文件阅读时的密钥 |
| `FILE_DOMAIN` | —（按部署配置） | 文件域名（也指向 FastGPT 服务）；如需更高安全性可独立分配域名，避免高危文件读取到主域名内容 |
| `SKIP_FILE_TYPE_CHECK` | `false` | 是否跳过文件类型检查 |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600` | 文件解析超时时间（秒） |
| `UPLOAD_FILE_MAX_SIZE` | `1000` | 最大上传文件大小（MB） |
| `UPLOAD_FILE_MAX_AMOUNT` | `1000` | 最大上传文件数量 |
| `CUSTOM_PDF_PARSE_URL` | — | 自定义 PDF 解析服务地址 |
| `CUSTOM_PDF_PARSE_KEY` | — | 自定义 PDF 解析服务密钥 |
| `DOC2X_KEY` | — | Doc2x PDF 解析服务密钥 |
| `DATASET_PARSE_MAX_PROCESS` | `10` | 知识库文件解析队列最大并发数 |

## 外部文档解析服务

| 服务目录 |
| --- |
| `doc2x` |
| `somark` |
| `textin` |

## 这张对照表的适用范围

对照表反映的是仓库中登记的解析路径。以下情形需要另行确认：

- 同一扩展名下文件内部结构的差异（例如扫描版与文本版 PDF）对解析结果的影响
- 外部解析服务的可用性与配额，由该服务自身决定
- 商业版附加的解析能力不在本表内
