<!--
Delivery metadata (not published with the body)
slug: document-parsing-acceptance
locale: zh
canonical: https://fastgpt.cn/guide/document-parsing-acceptance
hreflang: zh-CN | zh-CN → https://fastgpt.cn/guide/document-parsing-acceptance | en → https://fastgpt.io/guide/document-parsing-acceptance | x-default → https://fastgpt.io/guide/document-parsing-acceptance
Meta title: FastGPT 文档解析验收：原文、分段、检索与引用
Meta description: 按 PDF、扫描件、表格和网页准备样本，逐层检查原文提取、分段索引、检索证据与答案引用，并记录异常文件和批量导入的处理结果。
keywords: FastGPT,document,parsing,acceptance
结构化数据: Article + BreadcrumbList
内链: 用黄金集验证企业复杂文档解析的选型效果 / FastGPT 知识库生命周期：内容归属、更新与恢复
配图需求: Text and accessible tables; no image is required for this release.
发布批次: Week07
-->

# FastGPT 文档解析验收：从原文件到可引用答案

文档解析验收需要沿着原文件、解析文本、分段索引、检索证据和最终答案逐层检查。文件上传成功后，仍可能存在表格错列、页眉混入正文、扫描文字缺失或引用定位偏差。每一类问题应定位到具体处理阶段。

这份清单适合接入新文档类型、更换解析服务或升级相关组件时使用。业务负责人确认正确内容，实施人员检查处理链路，应用负责人验收答案与引用。

## 按文档类型准备样本

| 文档类型 | 样本应覆盖 | 重点检查 |
| --- | --- | --- |
| 可复制文本 PDF | 多栏、页眉页脚、跨页段落 | 阅读顺序、重复噪声与段落连续性 |
| 扫描 PDF 与图片 | 低清晰度、旋转、印章和混合语言 | OCR 完整性、关键数字与单位 |
| 表格 | 合并单元格、多层表头、跨页表格 | 行列关系、表头继承与数字归属 |
| Word 与演示文稿 | 标题层级、列表、图注和备注 | 结构保留与图片说明对应关系 |
| 网页或链接来源 | 导航、正文、权限和来源变化 | 正文提取、来源可达性与更新结果 |

样本中同时放入正常文件和已知困难文件。对关键字段标注原页位置及正确值，保留可用于回答问题的原文证据。验收阈值由业务风险确定，例如金额、日期与安全操作步骤可单独设为关键字段。

## 明确实际处理路径

FastGPT 的文件读取能力、解析服务和聊天文件输入存在不同入口。知识库导入与会话临时文件使用的处理方式也需要分别确认。按部署版本记录文件类型、解析器、OCR 配置、图片处理方式与输出位置。

在所用入口上传样本后，保存解析文本并与原文件抽样对照。对于图片描述与表格结构，检查实际输出是否保留了回答所需信息。图像生成的描述属于模型输出，需要通过原图确认其准确性。

自定义 PDF 增强解析接口接收带 `file` 字段的 `multipart/form-data` POST 请求，返回包含 `pages` 与 `markdown` 的 JSON。使用该接入方式时，按当前版本配置服务与可选鉴权，重启后在导入入口启用 PDF 增强解析，并用同一文件验证接口输出与实际入库内容。

## 四层验收

1. **解析层**：对照原文检查关键字段、阅读顺序、表格对应关系和缺失内容，记录错误所在页。
2. **分段层**：检查标题与正文是否保持关联，跨页内容是否完整，表头或单位是否跟随数据；抽查过短、过长和重复分段。
3. **检索层**：使用固定问题，检查前 k 个结果是否包含足以支持答案的片段，并记录空召回与相似文档混淆。
4. **回答层**：检查回答是否与证据一致，引用能否定位到正确材料，以及信息不足时的处理行为。

同一问题应能串起原文件、分段、检索结果和答案。发现错误后，先确定最早发生偏差的层，再修正对应配置或内容并复测。

## 把异常文件纳入验收

测试受密码保护、损坏、超出限制、处理超时和来源失效的文件。记录用户看到的状态、任务队列中的结果以及可执行的恢复动作。批量导入还应核对成功、失败、重复和待处理数量，确保每个输入文件有对应结果。

重新提交文件前检查系统中的已有记录，避免重复入库影响检索。修正解析配置后，对同一批样本重新处理，并保持生成模型、检索参数和问题集稳定，便于比较前后差异。

## 输出可复用的验收记录

记录文件标识、文件类型、解析配置、错误位置、受影响问题、处理人和复测结果。将高风险错误和边界样本加入后续升级的固定验收集。上线观察阶段持续补充真实失败样本，让文档解析验收覆盖实际业务输入。

## 继续阅读

- [用黄金集验证企业复杂文档解析的选型效果](https://fastgpt.cn/guide/complex-doc-golden-set)
- [FastGPT 知识库生命周期：内容归属、更新与恢复](https://fastgpt.cn/guide/kb-lifecycle-ownership)

## 参考资料

- [FastGPT PDF 增强解析配置](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT 知识库常见问题](https://doc.fastgpt.cn/zh-CN/guide/dataset/faq)
- [FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
