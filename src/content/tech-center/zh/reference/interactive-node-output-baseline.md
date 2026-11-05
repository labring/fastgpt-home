---
title: FastGPT 交互节点输出基准：formInputResult、selectResult 与字段传递
slug: /zh/reference/interactive-node-output-baseline
page_type: 基准数据页
source: https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx
source_type: 官方文档
meta_title: FastGPT 交互节点输出基准
meta_description: 说明FastGPT表单输入与用户选择节点各自的输出对象和字符串结果，梳理字段引用、用户交互、分支连接与判断器的分工，并给出提交后核对下游实际输入的方法。
keywords:
schema_type: TechArticle
date_published: 2026-11-03
date_modified: 2026-11-03
---

# FastGPT 交互节点输出基准：formInputResult、selectResult 与字段传递

表单输入与用户选择是两个交互节点。表单提交后输出对象 formInputResult，用户选择后输出字符串 selectResult。后续节点应从对应节点取值，再按实际任务组织业务处理；自动比较表单字段并决定走向时，连接判断器节点。

## formInputResult：表单提交后的字段对象

表单输入节点触发后，对话进入交互状态并记录工作流状态。用户填写必填信息并提交，节点收集填写内容，继续执行后续流程。formInputResult 是该节点的对象型输出；读取一个具体字段时，在后续节点的变量选择中定位表单输入节点，再选择其结果对象中的目标字段。字段名称以当前表单配置为准。

核对时先记录一份实际提交内容，再比较后续节点输入中收到的对象。姓名、申请说明等业务字段应与本次提交对应。若输入缺项，沿节点是否触发、用户是否提交、引用是否指向正确节点的顺序检查。表单中的选择类控件仍是表单内容，其结果从表单结果对象取值。

## selectResult：用户选择节点的选定值

用户选择节点向用户呈现预设选项，等待选择完成，再沿用户选定的分支继续。该节点模板将 selectResult 定义为字符串输出。配置时核对选项值与分支连线，后续节点引用用户选择节点的 selectResult。

这条路径的输入是用户本次做出的选择。若希望按照已收集的年龄、申请类别等字段自动分流，将这些字段传给判断器并配置比较条件。需要再次询问用户意向时，才安排用户选择节点。两种安排可以接在同一流程中，各自保留明确的输入与输出。

## 两种输出如何接入同一条流程

先在画布中确认收集材料的表单输入节点和确认意向的用户选择节点，再逐一设置下游引用。需要业务材料时取 formInputResult 的成员，需要所选选项时取 selectResult。节点类型标识 formInput、userSelect 用于识别节点种类，取值应选择模板实际声明的输出。

例如，先收集申请说明，再让用户选择办理事项。下游处理节点可同时读取申请说明和选项值；按字段自动比较时，另外连接判断器。核对记录应保留节点身份、提交内容、选项值和下游输入，使相同名称的多个表单或选择节点能够被区分。

## 用交互与下游输入核对传递结果

先触发表单节点，观察等待交互的状态；提交后检查 formInputResult 的实际内容。再触发用户选择节点，分别选择不同选项，检查 selectResult 与走向是否对应。最后查看下游节点输入，确认它收到的是本次提交与本次选择。

字段为空时，先沿引用路径核对来源节点；走错分支时，先检查选项与连线；自动比较结果异常时，检查判断器的输入类型与条件。这三个检查对象分开记录，便于定位是交互尚未完成、取值路径错误，还是条件配置需要调整。

# FastGPT 交互节点输出基准：formInputResult、selectResult 与字段传递

表单输入节点在 FastGPT v4.17.2 工作流中承担收集用户填写内容的任务，输出变量为 formInputResult；selectResult 由用户选择节点在用户选定选项后输出，两者分属不同节点。理解这两类输出的结构、生成条件以及字段在工作流中的传递方式，是正确引用节点结果的前提。以下内容依据官方文档 guide/build/workflow/nodes/form_input 整理，只描述字段与边界，不涉及具体取值建议。

## formInputResult 的输出结构

formInputResult 是表单输入节点在用户提交表单后生成的对象型输出变量。该变量以表单中各个输入项为成员，输入项的名称对应对象的属性名，用户填写或选择的内容对应属性值。文档说明，只有当表单被提交并且节点执行完成后，该输出才会产生，未提交或校验未通过时该变量不进入后续节点可引用的范围。引用方式为在后续节点中选择该节点，再选择 formInputResult 下的具体字段。字段类型取决于表单中对应输入项的配置，文本类输入项产生字符串，数字类输入项产生数值，选择类输入项按配置产生对应结果。若表单中存在同名输入项，字段归属以表单配置中的定义为准。该变量的作用范围限于当前工作流内该节点之后的节点。

## selectResult 的生成条件与形态

selectResult 用于承载表单中选择类输入项的结果，其生成与表单中是否配置选择类输入项直接相关。文档指出，当表单包含选择类输入项且用户完成选择并提交后，selectResult 会按选择项配置输出对应内容。该变量的形态与选择模式有关，单选与多选在输出结构上存在差异，多选场景下结果可能包含多个条目。若表单未配置选择类输入项，该输出不产生实际内容。selectResult 与 formInputResult 可以同时存在，两者分别对应不同类别的输入项，引用时需按输入项类别选择对应变量。该变量同样在节点执行完成后才可被后续节点引用，未提交状态下不产生有效结果。字段名称与表单中选择类输入项的配置名称保持一致。

## 字段传递的路径与条件

字段传递指表单输入节点的输出被后续节点引用的过程。文档说明，传递路径为在后续节点的输入参数中选择表单输入节点，再从 formInputResult 或 selectResult 中选择目标字段。传递成立的条件包括节点已执行完成、表单已提交、目标字段在表单配置中存在。若上游节点未执行或执行中断，后续节点无法取得该字段。传递过程中字段保持原有类型，文本字段进入文本参数，数值字段进入数值参数，类型不匹配时按目标节点的参数要求处理。同一字段可被多个后续节点引用，引用不改变原节点输出内容。字段传递发生在当前工作流内部，跨工作流引用需通过对应的工作流调用方式实现，文档未描述跨工作流直接引用表单字段的路径。

## 取值边界与引用注意事项

文档对表单输入节点的输出边界给出若干说明。表单未提交时 formInputResult 与 selectResult 均不产生有效内容，后续节点引用会得到空结果。表单校验未通过的输入项不进入输出对象，因此对应字段在传递中缺失。选择类输入项在多选模式下输出条目数量取决于用户实际选择数量，文档未规定固定条数。输入项名称决定字段名，名称重复时以表单配置中的定义为准。字段传递不改变字段类型，引用方需按类型使用。节点执行失败时输出变量不生成，后续引用无效。以上边界构成表单输入节点输出的基本约束，实际使用中以官方文档该节点页面的字段说明为准，不同版本之间可能存在差异，升级时需核对对应版本文档。

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/user-selection.mdx)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/packages/global/core/workflow/template/system/interactive/formInput.ts)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/packages/global/core/workflow/template/system/interactive/userSelect.ts)
- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/guide/build/workflow/nodes/form_input.mdx)
