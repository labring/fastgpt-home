# Week07 Guide 与迁移内容：公开事实、修订与写作提纲

核验日期：2026-09-06。范围：七篇中文 Guide 草稿与三篇中文迁移草稿。本文为供作者使用的研究结果；“建议”“验收设计”“提纲”是根据实现边界提出的编辑与工程方案，产品事实附第一方来源。

FastGPT 公共源码快照固定为 [`2bab5c1e06c46362f40a454d49d963e8bf0c62bc`](https://github.com/labring/FastGPT/commit/2bab5c1e06c46362f40a454d49d963e8bf0c62bc)，提交时间 2026-09-05。已通过 GitHub API 核对该提交，并读取相关原始文件。本地 FastGPT 的 `e0adc7c` 属于工作 fork；本文的源码引用指向上游公共提交。在线文档用于产品能力说明，固定提交用于参数、默认值与失败路径说明。

## 保留的目标 URL

| 草稿 | 保留的规范地址 | 建议主标题方向 |
| --- | --- | --- |
| Guide01 | https://fastgpt.cn/guide/private-deployment-readiness | FastGPT 私有化部署前的六项准备与验收 |
| Guide02 | https://fastgpt.cn/guide/model-gateway-architecture | FastGPT 多模型接入：统一网关与直连的架构选择 |
| Guide03 | https://fastgpt.cn/guide/embedding-model-migration | 更换向量模型：重建成本、切换窗口与回滚 |
| Guide04 | https://fastgpt.cn/guide/kb-lifecycle-ownership | 企业知识库维护：内容归属、更新责任与过期处置 |
| Guide05 | https://fastgpt.cn/guide/document-parsing-acceptance | 文档解析如何验收：从原文提取到可引用的知识 |
| Guide06 | https://fastgpt.cn/guide/rerank-model-selection | 重排模型如何选：相关性收益、时延与部署成本 |
| Guide07 | https://fastgpt.cn/guide/local-model-tco | FastGPT 本地模型 TCO：资源、并发与运维成本 |
| 迁移01 | https://fastgpt.cn/compare/competitors-fastgpt-comparison | 迁移到 FastGPT 前，如何盘点数据、流程与集成 |
| 迁移02 | https://fastgpt.cn/compare/maxkb-fastgpt-migration-guide | 从 MaxKB 迁移到 FastGPT：文档导出与配置映射 |
| 迁移03 | https://fastgpt.cn/compare/migrate-fastgpt-ragflow-maxkb | RAGFlow、MaxKB 到 FastGPT：并行验证与切换计划 |

Guide05 的现有 title/description 已偏向版本更新，建议随正文一起修订。既定 slug、canonical 与语言对应关系继续保留。七篇 Guide 的内部来源、选题池、核验日、生成方式与复核排期进入 byte-zero 隐藏元数据；公开正文只保留读者需要的适用版本与描述性参考链接。

## Guide01：私有化就绪度

**原始需求：** 技术负责人判断团队是否具备稳定运行的条件，并据此形成部署范围、责任人和验收记录。

### 已核实事实与修订

- FastGPT 的部署涉及应用、MongoDB、向量存储、模型调用等不同依赖；官方 Docker 文档列出 PostgreSQL/Milvus/OceanBase/SeekDB。草稿把 OceanBase 列入不兼容数据库的条目应删除。按实际选择的向量库确定备份和容量计划。[FastGPT Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- v4.15 配套版本清单包含应用、Plugin、代码沙箱、MCP、AIProxy、数据库等各自的镜像 tag。以同一发布系列的 Compose 和升级说明校对依赖；文章中的版本号只用于明确示例。[v4.15 部署版本清单](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/deploy/version/v4.15/args.json)
- Agent/Skill 沙箱属于按启用范围配置的组件。4.16 的预览地址要求应标明版本与功能前提，避免写成所有 FastGPT 安装均需执行的步骤。[Docker 部署的环境变量与沙箱入口](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)
- Docker seccomp 为系统调用提供过滤，默认 profile 属于安全边界。草稿的 `SANDBOX_DISABLE_NESTED_SECCOMP` 关闭加固操作缺少对应版本的官方支持证据，删除该通用部署步骤；改为核对宿主机、架构、容器权限与所选沙箱 provider 的要求。[Docker seccomp 安全配置](https://docs.docker.com/engine/security/seccomp/)
- 草稿中的 ARM、SELinux、Redis Sentinel、Mongo 4.0 等排除条件缺少足以覆盖所有版本的依据，删除整组绝对判断。以目标 Compose 的架构、依赖版本与所选外置服务能力作为验收边界。
- 运行环境中的密钥核对应只确认存在、长度与服务间一致性。`docker inspect` 全量打印环境变量会扩大凭证暴露面；验收模板记录已脱敏的配置摘要。

### 可用事实提纲

| 段落 | 可写内容与读者产出 |
| --- | --- |
| 六项准备 | 数据边界、组件与版本、模型连通、持久化与恢复、网络入口、运维责任六项；每项有负责人和完成证据。 |
| 组件与网络 | 标明浏览器到应用/对象存储、应用到数据库/模型、可选沙箱的实际连接方向；数据库访问配置在服务网络内。 |
| 模型和解析 | 明确 LLM、embedding、rerank、OCR 分别部署在哪里，哪些请求跨越企业网络边界。 |
| 持久化与恢复 | 备份范围覆盖 MongoDB、向量库、对象存储与配置/密钥；在隔离环境恢复一组知识库并验证原文和引用。恢复时间目标与可接受数据丢失量由团队确定。 |
| 运行准备 | 用代表性文件、问题集与峰值负载测资源、错误率和排队；安排监控、升级、回滚与值班负责人。 |
| 验收 | 登录→上传→解析→入库→检索→引用→工具调用一条真实链路；再验证一次依赖中断后的恢复。 |

**推荐公开参考：** [Docker Compose 部署](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)、[FastGPT 环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)、[版本与升级说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)、[Docker seccomp 安全配置](https://docs.docker.com/engine/security/seccomp/)。

## Guide02：模型网关架构

**原始需求：** 在渠道集中管理、运行成本与故障影响之间做取舍，得到一张调用架构图和可操作的验证清单。

### 已核实事实与修订

- AIProxy 的明确公开能力包括多提供商接入、负载均衡、调用日志和数据看板；模型可在多个渠道中配置。自定义完整请求地址会绕过模型渠道，直接请求指定端点。[FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- 当前 v4.15 部署清单使用 `ghcr.io/labring/aiproxy:v0.6.5`，中国镜像为 `registry.cn-hangzhou.aliyuncs.com/labring/aiproxy:v0.6.5`。草稿的 `m3e-large-api` 应从网关镜像列表删除；该镜像属于 M3E embedding 教程的模型服务。[v4.15 镜像清单](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/deploy/version/v4.15/args.json)、[M3E 接入说明](https://doc.fastgpt.cn/zh-CN/self-host/custom-models/m3e)
- 配置字段使用 `requestUrl`、`requestAuth` 的驼峰写法。embedding 与 LLM 的代码都以请求地址决定自定义路径，认证头根据配置添加；“两项同时填写才生效”应改成“完整端点必需，认证按服务要求配置”。[Embedding 请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)、[LLM 请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/llm/request/createChatCompletion.ts)
- OneAPI 渠道迁移通过显式请求 `/api/channels/import/oneapi` 完成，文档描述的是代理地址、模型与 API Key 的基本映射，迁移后需要测试。删除“初始化自动同步原有配置”的表述。[OneAPI 到 AIProxy 的迁移说明](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)
- 直连、网关两种路径都可能配置隔离措施。集中网关自身构成共享依赖，渠道故障切换、配额和协议透传需要按具体配置验证。删除“需要故障隔离就必须上网关”“任意非标准格式均能接入”“跨厂商配额自动调度”等能力保证。
- 删除混元固定凭证格式、小写 `m3e` 与任意服务都追加 `/v1` 的通用规则。模型 ID 对齐实际 endpoint，Base URL、完整路径和认证格式按所选协议确定。

### 可用事实提纲

| 段落 | 可写内容与读者产出 |
| --- | --- |
| 两条调用路径 | `FastGPT → 模型渠道/AIProxy → 上游`；`FastGPT → 自定义完整 endpoint`。标明日志与鉴权所在层。 |
| 决策表 | 集中渠道管理需求、渠道优先级、日志保留、协议覆盖、凭证托管、额外运维与共享故障影响。以真实管理需求驱动选型。 |
| 配置 | 模型 ID、渠道协议、Base URL、认证、模型映射、能力开关；使用目标版本 Compose 提供的网关配套配置。 |
| 失败影响 | 单渠道超时、上游 429、网关不可用、流式中断分别演练；检查重试是否放大等待时间和上游用量。 |
| 验收 | 每类模型跑真实请求；核对流式、工具调用、embedding、rerank；确认错误归属、请求时长、实际路由与密钥脱敏。 |
| 运行成本 | 汇总渠道变更、故障定位时间、监控与日志存储开销；仅将已验证的能力纳入架构承诺。 |

**推荐公开参考：** [FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)、[AIProxy 官方仓库](https://github.com/labring/aiproxy)、[FastGPT v4.15 部署清单](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/deploy/version/v4.15/args.json)。

## Guide03：向量模型更换

**原始需求：** 估算更换模型的重新处理成本，保持旧系统可回退，并用同一问题集证明新检索链路达到业务标准。

### 已核实事实与修订

- 文档向量和查询向量需要来自一致的 embedding 空间；RAGFlow 的官方说明也据此限制已解析数据的模型更改。由此建议将模型更换设计为目标模型的重新嵌入与新库验证。[RAGFlow 创建数据集说明](https://ragflow.io/docs)
- FastGPT 当前知识库更新 schema 允许更新名称、Agent/视觉模型、同步和分块设置，embedding 模型由创建阶段确定。最稳妥的文章流程是“创建采用目标模型的新知识库，导入源内容，重建后切换应用绑定”。[FastGPT 知识库 API schema](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/global/openapi/core/dataset/api.ts)
- 当前 FastGPT 的 `formatVectors` 将大于 1536 维的输出截断并归一化，将较短向量补零；PgVector 实现建立 `VECTOR(1536)` 或 `HALFVEC(1536)` 列。选型需要同时记录模型原始输出和应用适配后的存储形态，评测截断对业务检索的影响。[向量格式化实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)、[PgVector 实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/common/vectorDB/pg/index.ts)
- pgvector HNSW 对 `vector`、`halfvec` 分别支持至 2,000 与 4,000 维；这属于数据库索引能力。`hnsw.iterative_scan`、`hnsw.max_scan_tuples`、`hnsw.scan_mem_multiplier` 属于 pgvector；迭代扫描始于 0.8.0。Milvus HNSW 使用 `M`、`efConstruction` 与查询时的 `ef`。应纠正草稿的数据库归属。[pgvector HNSW 与迭代扫描](https://github.com/pgvector/pgvector#hnsw)、[Milvus HNSW](https://milvus.io/docs/hnsw.md)
- HNSW 索引通过 `CREATE INDEX` 创建，原始向量表与搜索索引是两个对象。草稿“先删旧表”应删除。本文采用新库验证与绑定切换，生产级索引变更另按数据库运维流程评估。[pgvector 索引说明](https://github.com/pgvector/pgvector#indexing)
- 向量库迁移与 embedding 模型更换各自有独立前提。草稿中的 `resumeMigrationId`、幂等 upsert、目标行数自动相等保证缺少可对应的官方迁移接口证据，删除这些通用保证。
- `MONGO_DEPRECATE_INDEX` 与沙箱/升级初始化参数移出模型更换主线。`shared_buffers=25%`、40 万条耗时、三个 Word 文件导致 Milvus 重启等经验不能作为跨环境阈值；改为代表性批次实测。

### 可用事实提纲

| 段落 | 可写内容与读者产出 |
| --- | --- |
| 变更清单 | 固定模型版本、文本处理规则、查询/文档参数、维度适配、语言覆盖与许可；把模型变更、分块变更、向量库变更分别记录。 |
| 成本估算 | 盘点原文、人工修订块、索引数量、总输入 token；小批次测 embedding 吞吐、重试率和索引写入速度；估算新旧库并存存储与重新验收工时。 |
| 重建 | 备份原文与配置、创建目标库、导入并向量化、记录失败与补跑清单。预留同步期间新增/修改文档的追赶步骤。 |
| 质量比较 | 同一标注问题集分别查询旧库和新库；检查 Recall@k、关键术语、否定条件、空结果、引用正确性及查询时延。 |
| 切换 | 冻结或记录最后增量，完成追赶后修改应用知识库绑定；记录旧/新 dataset ID、绑定应用和切换时间。 |
| 回滚与收尾 | 以旧绑定恢复服务；旧库保留期由回滚窗口确定，完成业务验收后再安排旧资源退役。 |

**推荐公开参考：** [FastGPT 知识库 API 定义](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/global/openapi/core/dataset/api.ts)、[FastGPT 向量格式化](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/embedding/index.ts)、[pgvector 索引说明](https://github.com/pgvector/pgvector#indexing)、[Milvus HNSW](https://milvus.io/docs/hnsw.md)。

## Guide04：知识库归属与生命周期

**原始需求：** 让每份知识有业务责任人、有效性规则和过期处置路径，并把组织变化落实为权限变更。

### 已核实事实与修订

- FastGPT 为团队、应用、知识库设置资源权限；知识库“可使用”“可编辑”“可管理”分别覆盖应用调用、内容修改与协作者管理。资源有唯一 Owner，Owner 可转移所有权，转移后的访问关系需要重新验收。[团队、成员组与权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
- 文档明确成员个人权限优先，部门/群组权限使用并集；Root 可访问管理所有团队资源。草稿“不同团队内容不可互相访问”应写成对指定普通成员和应用入口的授权测试，并在权限模型中体现系统管理员边界。[团队权限说明](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)
- 文档称每位用户默认有初始团队，额外团队创建能力受产品形态约束。删除“创建各业务线团队空间”的固定 UI 指令，改为按现有团队、部门、群组与资源组织维护职责。
- API 文件库公开接口包含稳定文件 ID、更新时间、文本或下载地址以及原文阅读链接，可用于连接企业已有内容源。内容归属可沿用原始文档系统，再将清理、重建与检索验收接入同步流程。[API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)
- “过期 6 个月归档、12 个月删除”缺少知识库留存规则的公开依据，应删除。沙箱实例回收、Skill Debug 数据迁移与知识内容过期分别处理。复核周期、保留期和删除审批属于企业治理建议，以内容有效期、业务风险与实际留存制度确定。
- 镜像更新、沙箱升级、密钥变量、包镜像源与聊天标题生成移出正文，避免生命周期文章变成升级清单。SSO 同步和商业版功能应各自注明适用形态。

### 可用事实提纲

| 段落 | 可写内容与读者产出 |
| --- | --- |
| 归属登记 | 内容责任人、技术运维人、原始来源、业务范围、发布日期/生效日、复核触发条件、关联应用。业务责任人与产品 Owner 分别记录。 |
| 权限 | 按查看/使用、编辑、管理、所有权划分职责；用普通成员、编辑者、负责人和离职成员样本验证实际授权。 |
| 更新 | 原文修订→解析/分块→重新索引→标注问题复测→应用生效；为覆盖更新、重复导入与同步失败保留处理记录。 |
| 复核 | 以制度换版、产品发布、责任人变更或约定日期触发复核；优先复核高风险、高频引用内容。 |
| 过期处置 | 识别过期→确认替代内容→先从应用检索范围下线→保留必要记录→按批准的保留规则归档/删除；同步源的删除行为单独验证。 |
| 验收 | 抽样问题只引用有效版本；已移除成员的访问符合授权；负责人转交后，新负责人能更新内容；旧文档的检索、原文链接与备份状态符合登记。 |

**推荐公开参考：** [团队与资源权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)、[API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)、[FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)。

## Guide05：文档解析验收

**原始需求：** 将“文件上传成功”推进到“关键内容提取完整、分块可检索、答案引用可核验”，形成能交付给实施方的验收样本和标准。

### 已核实事实与修订

- FastGPT 公开支持多种文档格式、分块编辑与删除、手动/直接分段/QA 拆分、混合检索与重排。具体文件的结构保真度需要样本验收。[FastGPT 官方功能说明](https://github.com/labring/FastGPT)
- 自定义 PDF 服务接收带 `file` 字段的 `multipart/form-data` POST，返回包含 `pages` 与 `markdown` 的 JSON；`CUSTOM_PDF_PARSE_KEY` 按需提供 Bearer 认证。配置后要重启，并在导入时启用 PDF 增强解析。[PDF 增强解析配置](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- 文件处理模型承担增强处理、QA 生成，索引模型承担向量化；解析、生成式处理和检索分别产生质量风险。[知识库常见问题：文件处理模型与索引模型](https://doc.fastgpt.cn/zh-CN/guide/dataset/faq)
- 文档标题、表格、代码、图片说明、块边界和引用属于不同验收维度。草稿“代码块、表格完整保留”应改为预先列出要保留的字段与关系，并记录每个样本的实际结果。
- 原稿 title、description、主标题和五大段落均应围绕解析验收重写；SSO、OceanBase、工作流数据类型、AIProxy 日志和升级镜像等发布说明移出文章。
- Mistral OCR、MinerU 可以作为可选外部解析方案的名称，具体请求与部署方法只有在对应版本官方接入文档验证后进入正文。本页以 FastGPT 已公开的自定义 PDF 契约为主，保持可复用性。

### 可用事实提纲

| 样本/环节 | 验收内容 |
| --- | --- |
| 文本 PDF、Word、Markdown | 标题层级、正文次序、列表、页眉页脚噪声、中文编码；给出需要逐项匹配的关键事实。 |
| 扫描 PDF/图片页 | OCR 的文字缺失、金额/日期/编号、跨页连续性；保留原文页号作为人工抽查依据。 |
| 表格与复杂版式 | 表头与行列关系、合并单元格含义、单位、脚注、双栏阅读顺序；使用业务问题检验关系是否仍可回答。 |
| 分块与索引 | 关键事实与限定条件落在可用块中；超长块、代码段、表格拆分逐类检查；人工修订保留版本。 |
| 检索与引用 | 针对每类文件安排事实问、跨段问、无答案问；记录候选片段、最终回答、引用文档及原文定位。 |
| 运行质量 | 记录文件大小/页数、解析时长、失败类型、重试与费用；批量测试覆盖代表性峰值。 |

**建议验收记录字段：** 文件 ID、来源版本、样本类型、关键事实清单、解析器/模型版本、原文与解析结果、分块结果、预期问题、引用结果、失败归因、责任人。通过阈值由业务方事先设定，文章可以提供空白模板。

**推荐公开参考：** [FastGPT 文档与知识库能力](https://github.com/labring/FastGPT)、[PDF 增强解析配置](https://doc.fastgpt.cn/zh-CN/self-host/config/env)、[知识库常见问题](https://doc.fastgpt.cn/zh-CN/guide/dataset/faq)、[FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)。

## Guide06：重排模型选型

**原始需求：** 先判断当前错误是否出现在候选排序阶段，再用相关性收益、额外时延和运维成本决定是否启用重排。

### 已核实事实与修订

- 重排模型以查询和候选文本为输入，输出相关度。BAAI 的模型卡明确原始分数可通过 sigmoid 转换到 0–1；各模型的分数范围、长度限制与语言覆盖需要分别核对。[BAAI bge-reranker-v2-m3 模型卡](https://huggingface.co/BAAI/bge-reranker-v2-m3)
- FastGPT 的重排请求发送 `model`、`query`、`documents`，读取 `results[].index` 和 `relevance_score`。当前固定提交中请求超时为 30 秒；这是实现快照，可用来设计异常测试。[重排请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/rerank/index.ts)
- 该实现对过长候选文本执行切块，按模型 token 预算计算输入。原始文件大小、embedding 输入长度和 rerank 文本长度分别管理。[重排请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/rerank/index.ts)
- FastGPT 使用多路召回与 RRF 融合；最低相关度作用于过滤。草稿“最终结果严格按单一分数降序”改为“检查实际启用的检索路径和业务排序质量”。[知识库检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)
- 当前失败路径会回退到文本召回结果并返回 `usingReRank:false`；因此“有检索答案”还需要结合调用状态判断重排是否实际运行。[重排融合与失败回退实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/dataset/search/defaultRecall/rerank.ts)
- 草稿把“现有检索延迟超标”列为部署重排的触发条件，应改为先检查耗时所在阶段；重排需要增加评分时延预算。当前重排请求的输入为查询和候选文本，历史对话参与程度由上游问题改写与应用流程决定。[重排请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/rerank/index.ts)
- 向量库承担召回，重排服务承担候选评分。删除“重排修复向量库稳定性”“重排额外消耗向量数据库计算资源”等因果判断；同机部署的资源竞争可作为运维测量项。原文未进入候选集时，先检查解析、切块与召回。

### 可用事实提纲

| 段落 | 可写内容与读者产出 |
| --- | --- |
| 判断瓶颈 | 检查正确片段是否在候选列表中；记录排序靠后、相似文档干扰、关键词歧义等样本。 |
| 候选模型 | 按语言、输入长度、原始分数/归一化、推理资源、许可证和服务接口筛选。 |
| 对照设计 | 固定语料、问题、召回结果、生成模型，比较关闭重排与候选模型；质量评测与延迟评测分别记录。 |
| 收益 | 使用标注集的 Recall@k、MRR 或 nDCG 等指标，搭配关键业务问题、引用正确性与人工纠正量。它们属于建议评测指标。 |
| 成本 | 测候选数量、候选长度、并发、P50/P95 时延、超时率、资源与每次请求成本；观察高峰流量。 |
| 阈值与异常 | 为所选模型校准阈值；覆盖无关问题、空候选、超长 query、超时和服务中断；记录回退后对业务的影响。 |

**推荐公开参考：** [FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)、[FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)、[BAAI 重排模型卡](https://huggingface.co/BAAI/bge-reranker-v2-m3)、[FastGPT 重排失败回退](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/dataset/search/defaultRecall/rerank.ts)。

## Guide07：本地模型 TCO

**原始需求：** 用可核对的业务量、资源实测和人工工作量计算本地模型成本，并识别本地/托管/混合部署的适用条件。

### 已核实事实与修订

- FastGPT 模型配置的 `maxContext`、`maxResponse` 用于应用侧模型能力与上下文预算；Ollama 原生 `num_ctx` 在其服务端控制上下文。Ollama 官方 OpenAI 兼容文档通过 Modelfile 设置 `num_ctx`、创建模型后调用新模型名。删除“FastGPT 两个字段自动映射到 Ollama 两个参数”的承诺。[FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)、[Ollama OpenAI 兼容接口](https://docs.ollama.com/api/openai-compatibility)
- Ollama 当前不同官方页面的默认值口径存在差异：Context length 页按 VRAM 列出 4K/32K/256K；FAQ 给出 4096；Modelfile 表中仍列 `num_ctx=2048`。本文推荐显式设置并用 `ollama ps` 检查实际分配的上下文和 CPU/GPU 分担，正文避免提供一个覆盖所有版本的默认数。[Ollama 上下文长度](https://docs.ollama.com/context-length)、[Ollama FAQ](https://docs.ollama.com/faq)、[Modelfile 参数](https://docs.ollama.com/modelfile)
- 当前 Modelfile 文档给出的 `num_predict` 默认值为 `-1`，草稿的 128 应删除。`-2` 的历史含义与生产参数建议同样移除，输出预算显式设定并实测停止行为。[Modelfile 参数](https://docs.ollama.com/modelfile)
- FastGPT 当前 `createChatCompletion` 实现未显式传入超时时使用 600000ms；草稿的“流式固定 1 分钟、非流式固定 10 分钟”应删除。需要分别记录客户端、网关、FastGPT、模型服务的超时与流中断行为。[LLM 请求实现](https://github.com/labring/FastGPT/blob/2bab5c1e06c46362f40a454d49d963e8bf0c62bc/packages/service/core/ai/llm/request/createChatCompletion.ts)
- Ollama 官方说明更大的上下文需要更多内存，并行请求会增加所需内存；GPU/CPU 分担可从 `ollama ps` 观察。这为并发容量和成本试算提供技术依据。[Ollama 上下文长度](https://docs.ollama.com/context-length)、[Ollama 并发与资源说明](https://docs.ollama.com/faq)
- 视觉、工具调用、结构化输出和思考输出均应按“模型能力 + 服务协议 + 网关转发 + FastGPT 应用配置”完整验证。删除缺乏日志证据的症状根因定论和手写 think 标签渲染方案。

### 可用 TCO 提纲

以下为成本计算建议，数值来自企业账单和实测；费用模型同时适用于自购、租赁和混合方案。

| 成本项 | 填写口径 |
| --- | --- |
| 固定资源 | 硬件购置与约定折旧期，或 GPU/CPU 租赁费；内存、磁盘、备份、网络和机房费用。 |
| 能源与利用率 | 实测运行功耗 × 运行时间 × 企业电价；记录闲置时间、并发峰值、模型常驻与冷加载时间。 |
| 推理链路 | LLM、embedding、rerank、OCR、视觉分别计算调用量与计算资源；重试、重建索引和长上下文进入用量。 |
| 人工与软件 | 数据清理、评测、模型/驱动升级、故障值班、监控、安全修补、平台授权与维保。 |
| 迁移与冗余 | 双环境验证、回滚存储、峰值备用容量、模型替换、恢复演练与外部服务兜底。 |

建议公式：`月度 TCO = 月摊销或租赁 + 能源机房 + 存储网络 + 模型及外部服务 + 软件维保 + 人工运维 + 当月迁移与评测分摊`。质量约束满足后，再用“每千次有效完成请求成本”或“每个业务任务成本”比较方案。

建议正文步骤：定义任务与质量门槛→固定模型/量化/上下文/输出预算→测冷启动和稳定并发→填写各项成本→比较低、中、高利用率→确认运维责任与切换边界。自购费用按既定周期摊销；临时峰值可单列按需资源，避免用峰值机器的理想满载吞吐代表全月效率。

**推荐公开参考：** [FastGPT 模型配置](https://doc.fastgpt.cn/zh-CN/self-host/config/model/intro)、[Ollama OpenAI 兼容接口](https://docs.ollama.com/api/openai-compatibility)、[Ollama 上下文长度](https://docs.ollama.com/context-length)、[Ollama FAQ](https://docs.ollama.com/faq)、[Ollama Modelfile](https://docs.ollama.com/modelfile)。

## 三篇迁移页的公开事实与修订原则

现有四篇比较页分别是 `/compare/dify-vs-fastgpt`、`/compare/ragflow-vs-fastgpt`、`/compare/maxkb-vs-fastgpt`、`/compare/self-build-vs-platform`。已核对其正文结构：产品重心、能力差异、许可证/采购、POC 和选型建议。三篇 Week07 新页应将读者产出固定为资产清单、操作映射、切换验收表。

### 公共事实底表

| 主题 | 可发布的事实与来源 | 对草稿的修订 |
| --- | --- | --- |
| MaxKB 产品能力 | 官方公开 RAG、工作流、MCP、多模型接入；新价格页还列 Skills、定时/事件触发、知识库工作流与多模态模型。[MaxKB 官方仓库](https://github.com/1Panel-dev/MaxKB)、[产品版本说明](https://maxkb.cn/price) | 将宽泛的“仅 FastGPT 拥有”改成指定功能、版本、配置与验收动作。 |
| MaxKB 文档导出 | 支持选中文档导出 Excel/ZIP，支持批量导出；原文档下载限于手动上传来源。[MaxKB 文档操作](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html) | 迁移以原文件/可核验文本和元数据为基础；向量数据进入兼容性专门评估。 |
| MaxKB 旧版本 | 官方迁移工具覆盖 v1.10.10-lts+ 到 v2.1.0；v1 文档未保存原文件，升级后对应文档仍缺少原文档下载。[MaxKB 版本迁移工具](https://maxkb.cn/docs/v2/installation/migrate.html) | 源文件恢复与人工修订文本导出需要单列工作；官方版本迁移工具仅用于该产品的指定升级路径。 |
| MaxKB 支持与采购 | 当前页面列专业版永久授权、首年维保、次年维保，专业版 5×8、企业版 7×24 支持；商业条款按具体版本与合同确认。[MaxKB 价格与支持](https://maxkb.cn/price) | “采购可预测性更强”作为读者根据报价作出的判断。推荐正文保留支持档位与报价维度，把具体金额留给购买时的官方页面。 |
| RAGFlow 文档与检索 | 官方 Quickstart 提供文档解析、chunk 查看与编辑、检索测试；HTTP API 提供数据集/文档/分块、下载原文、检索等操作。[RAGFlow Quickstart](https://ragflow.io/docs)、[HTTP API](https://ragflow.io/docs/http_api_reference) | 复杂文档质量通过同一批样本比较；实际调用按源系统部署版本的 API 路径。 |
| RAGFlow 连接器 | 官方分类页列 Confluence、Notion、Google Drive、S3、Discord 等；同步页说明首次导入、后续刷新以及启用删除同步后的行为。[数据源分类](https://ragflow.io/docs/add_data_source/data_source_categories_and_selection)、[同步与更新](https://ragflow.io/docs/add_data_source/add_to_knowledge_base_and_sync) | 将“多源增量同步覆盖更多场景”改为实际源系统连接器和刷新/删除行为核对。 |
| RAGFlow Agent | 官方支持以 JSON 导入、导出 Agent 配置。[Agent 导入与导出](https://ragflow.io/docs/import_and_export_agents) | 导出 JSON 用来盘点节点和业务语义；目标平台的工作流逐项重建并验证。 |
| Dify DSL | 官方 DSL 可导出应用、流程、模型参数与知识库连接；知识库内容、第三方工具 API Key、运行日志需分别处理，Secret 环境变量可选择包含。[Dify 应用管理](https://docs.dify.ai/en/cloud/use-dify/workspace/app-management) | 通用迁移页区分应用定义、知识内容、凭证和历史日志，避免把一个导出文件视为完整备份。 |
| FastGPT 目标知识源 | API 文件库定义文件树、稳定 ID、内容/下载地址、原文链接；钉钉等具体连接器有各自格式边界。[API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)、[钉钉知识库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/dingtalk_dataset) | 用目标数据契约核对源资产，逐项确认来源、更新时间与原文定位。 |
| FastGPT 权限 | 文档公开团队、资源与协作者权限，并定义 Owner 转移及 Root 范围。[团队与资源权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions) | 映射用户、组、资源、凭证和外部 IdP，使用实际成员样本验收。 |

“成熟度更高”“品牌心智更强”“只有一方公开列出全部生命周期”“自动等价迁移”缺少边界完整的证据，删除此类总括结论。保留产品公开能力，再解释它对迁移步骤的具体影响。许可证直接链接目标版本的官方 LICENSE；本文提供名称与引用入口，采购判断结合具体使用方式和授权条款。

RAGFlow 数据源与 Agent 文档另已读取上游固定树 `0c28d59ea1d362d9b6aa7481eed48c7fd9a95f0b` 对应原文。官网 slug 来自文件 front matter：`docs/guides/data_source/data_source_categories_and_selection.md`、`add_to_knowledge_base_and_sync.md` 与 `docs/guides/agent/import_and_export_agents.md`。

## 迁移01：通用迁移资产盘点

**URL：** https://fastgpt.cn/compare/competitors-fastgpt-comparison

**独立价值：** 服务已经考虑迁移的读者，输出可估工时、分配责任和验收的资产清单。对具体产品的取舍链接现有比较页。

### 修订与可用提纲

1. **触发迁移的可测原因。** 已有需求、当前阻碍、期望改善、可以接受的停机与历史数据范围。每个迁移动因绑定一个验收用例。
2. **资产盘点表。** 列原文/解析文本/人工修订/问答对/图片、知识源与同步、工作流与提示词、工具与密钥、用户与权限、发布渠道、日志与评测集；每类列来源 ID、数量、导出格式、负责人和恢复方法。
3. **导出边界。** 用 Dify DSL、RAGFlow JSON、MaxKB Excel/ZIP 三种例子说明配置与内容分别导出的实际行为。凭证在目标环境重新配置并验证。
4. **迁移分类。** 原文重建、可复用文本、需要重新实现的节点、重配的集成、只读保留的历史记录。跨产品向量复用需要另证模型、预处理、归一化、schema 和引用映射一致。
5. **成本与依赖顺序。** 先源文件与权限，再知识库，再流程，再集成/发布入口；测试样本得到工时、重新嵌入量、并行存储和验证成本。
6. **迁移立项产物。** 有负责人和验收方法的清单、版本矩阵、缺失资产列表、回滚范围、业务验证问题集。

**关键草稿修订：** 把“对应竞品”落实到 Dify、RAGFlow、MaxKB 的具体资产格式；“仅 FastGPT”大列表缩减为迁移需求涉及的能力。把“同硬件”写成可复现资源条件，平台原生依赖的差异应记录在成本表中。

**推荐公开参考：** [Dify 应用导出](https://docs.dify.ai/en/cloud/use-dify/workspace/app-management)、[RAGFlow Agent 导入导出](https://ragflow.io/docs/import_and_export_agents)、[MaxKB 文档导出](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)、[FastGPT API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)。

## 迁移02：MaxKB 到 FastGPT 的操作映射

**URL：** https://fastgpt.cn/compare/maxkb-fastgpt-migration-guide

**独立价值：** 提供 MaxKB 特有的导出边界和目标映射，形成可执行的小批次迁移方案。

### 修订与可用提纲

1. **固定源版本与授权形态。** 记录 MaxKB v1/v2、社区/专业/企业、文档来源及可用导出入口；源系统备份与迁移副本分别管理。
2. **导出知识资产。** 手动上传来源下载原文档，选中文档导出 Excel/ZIP；Web、飞书和旧 v1 文档补原始来源。人工修订块、问题、标签、启用状态纳入对照表。
3. **检查一致性。** MaxKB 当前文档说明“替换原文档”只更新文档本身，已向量化和分段内容保持原状，因此检查原文件和人工修订分段是否一致。[MaxKB 替换原文档](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)
4. **建立目标知识库。** 使用原文或经过核验的文本进入 FastGPT，配置 embedding 与分块；维护源文档 ID→目标 collection ID 的映射；问题/答案与图片/原文链接按目标 API 结构转换。
5. **逐节点迁移业务逻辑。** 提示词、条件、检索、HTTP/MCP、数据库查询、人工交互逐项映射；检查变量名、输入输出类型、错误分支和状态恢复。
6. **重新配置访问。** 设置模型和工具凭证、普通用户/组/资源权限、外部回调、应用嵌入与 API；对来源引用、用户授权和业务系统调用执行验收。
7. **小批次完成标准。** 源资产有对应目标记录；关键问答与引用通过；业务流程与权限样本通过；旧系统可以恢复入口；随后按同一映射扩批。

**关键草稿修订：** “导出文档与向量数据后直接导入”改为源内容重建与映射。支持服务部分用当前公开档位和报价范围说明采购工作，正文避免将支持响应时间写成软件可用性承诺。已有 `/compare/maxkb-vs-fastgpt` 承担产品取舍与三年成本比较。

**推荐公开参考：** [MaxKB 文档操作](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)、[MaxKB 版本迁移工具](https://maxkb.cn/docs/v2/installation/migrate.html)、[MaxKB 价格与支持](https://maxkb.cn/price)、[FastGPT 知识库 API](https://doc.fastgpt.cn/zh-CN/openapi/dataset)、[FastGPT 团队权限](https://doc.fastgpt.cn/zh-CN/guide/workspace/team/team_roles_permissions)。

## 迁移03：RAGFlow、MaxKB 到 FastGPT 的并行验证与切换

**URL：** https://fastgpt.cn/compare/migrate-fastgpt-ragflow-maxkb

**独立价值：** 对齐原系统与目标系统的可观测结果，给出分阶段切换与恢复标准；读者产出一张执行窗口表和验收表。

### 修订与可用提纲

1. **建立基线。** 固定原始语料版本、人工修订、问题集、模型与采样设置；保存源系统检索结果、引用和关键流程结果。
2. **处理两类源系统差异。** RAGFlow 从文档/分块 API、Agent JSON、连接器同步设置盘点；MaxKB 从原文件、Excel/ZIP、源版本与权限映射盘点。原始数据与已处理数据分开校对。
3. **同题验证。** 比较文档提取、召回、重排、答案、引用、人工处理时间、时延和成本；相同模型固定其版本、量化与预算，记录两侧实际资源和依赖。
4. **验证增量。** 在源系统增加、修改、删除一份测试文档，检查目标同步；对按用户授权的文档安排允许与拒绝访问样本。连接器的删除同步单独列出。
5. **制定切换窗口。** 小范围内部用户→少量业务入口→全量入口；每阶段记录负责人、开始条件、监控指标、停留时长和通过标准。业务写操作测试采用可控数据与幂等标识。
6. **恢复路径。** 保存旧应用入口、API 配置与源数据；发生关键事实错误、权限偏差、失败率或时延越界时按预设阈值恢复入口。恢复后核对切换期间产生的数据。
7. **旧环境退役。** 达到稳定观察窗口后，按既定保留规则归档日志、配置与映射，安排资源回收。

**关键草稿修订：** 原文把代码沙箱、配额治理与检索成本解释错放到 MaxKB“产品重心”中，应重新依据各产品官方描述表述。RAGFlow 的连接器清单可保留并注明当前版本；“复杂解析更成熟”“Langfuse 语义更强”“中国知识源仅 FastGPT”缺少覆盖所有版本的对比证据，替换为具体同步、解析与日志验证项。

**推荐公开参考：** [RAGFlow HTTP API](https://ragflow.io/docs/http_api_reference)、[RAGFlow 数据源同步](https://ragflow.io/docs/add_data_source/add_to_knowledge_base_and_sync)、[MaxKB 文档操作](https://maxkb.cn/docs/v2/user_manual/dataset/doclist.html)、[FastGPT 检索原理](https://doc.fastgpt.cn/zh-CN/guide/dataset/dataset_engine)、[FastGPT API 文件库](https://doc.fastgpt.cn/zh-CN/guide/dataset/third-party/api_dataset)。

## 发布稿的最终事实检查

- 七篇 Guide 与三篇迁移页均保留上表既定规范地址。
- 产品能力有对应第一方出处；运维建议、估算公式和验收阈值明确写成建议或企业决定。
- 所有版本相关参数与镜像采用指定版本示例，正文避免称为永久默认值。
- 图表、代码块与说明中排除旧表删除、关闭沙箱加固、全量打印凭证、原向量直接跨产品复用等未经验证的步骤。
- 同一技术概念保持一套边界：解析→分块→embedding→召回→rerank→生成→引用；业务源文档、知识库数据、运行日志和沙箱文件各自维护生命周期。
- 三篇迁移页链接已有选型比较页，并提供各自的资产清单、MaxKB 映射、切换验收产物。

## 研究验证记录

- 从十份原始草稿提取 canonical，已验证 10/10 目标地址在研究结果中完整保留；七个 Guide 与三个迁移专篇均有独立提纲。
- 对 40 个去重的第一方 HTTPS 引用执行公开读取检查：39 个通过直接 HTTP 读取返回 200；Milvus HNSW 在本机 DNS 解析失败，已通过 web 工具读取完整官方页面并核对参数。
- FastGPT 文档的 `/docs/` 地址会跳转到 `/zh-CN/`，本文统一采用已返回 200 的最终中文文档地址。
- 参数和实现引用采用上游固定提交；相关代码与本地文件差异已核对，模型配置类型变化和 Milvus 配套版本变化各自保持版本边界。
- 本研究只新增这一份 findings 文件，并更新本地 research 工单；生产代码、内容、部署状态保持原样。


## 2026-09-06 成稿只读事实复核

复核根工作区 `/Users/longnv/.codex/worktrees/d072/fastgpt-home` 的七篇 Guide 中英文稿与三篇迁移稿，共 17 份文件。检查覆盖重大技术结论、部署版本与组织策略边界、中英文语义、出处对应及三篇迁移页的独立价值。

**发布结论：事实复核通过。当前审阅快照未发现需要阻断发布的重大技术错误、适用边界遗漏或中英文翻译误差。** 此结论覆盖正文事实与引用；构建、路由、页面渲染和发布验证由根任务继续执行。

| 成稿 | 复核要点与结果 |
| --- | --- |
| Guide01 私有化就绪度（zh/en） | 依赖、数据库与架构要求按所选发布清单核对；沙箱按启用范围配置，保留 seccomp 隔离；验收包含普通用户、知识处理、引用、工具、恢复与峰值负载。 |
| Guide02 模型网关（zh/en） | 正确区分 AIProxy 路由与 embedding 计算；`requestUrl`/`requestAuth` 字段与直连边界正确；One API 导入明确为显式操作，迁移后安排逐模型验收。 |
| Guide03 向量模型迁移（zh/en） | 新建目标知识库、重新编码、固定问题集与旧绑定恢复逻辑完整；固定源码说明原始维度与存储维度；HNSW 参数正确归属 pgvector，并要求确认扩展版本。 |
| Guide04 知识库生命周期（zh/en） | 资源 Owner 与业务负责人分别登记；权限测试覆盖普通成员、编辑者与新负责人；保留期、归档和复核频率明确由组织策略决定。 |
| Guide05 文档解析验收（zh/en） | 原文件、解析、分段、检索和答案均可追溯；自定义增强 PDF 接口的 `file`、`multipart/form-data`、`pages`/`markdown` 合约与可选鉴权准确；配置重启与导入开关边界明确。 |
| Guide06 重排模型（zh/en） | 候选集前提、语言与输入长度、分数校准、RRF/过滤及端到端成本清楚；失败保留原文本召回并设置 `usingReRank=false` 的结论限定于引用的源码快照。 |
| Guide07 本地模型 TCO（zh/en） | 成本覆盖资源、能源、知识处理、软件、运维、质量和冗余；公式为测量方法；FastGPT 应用预算与 Ollama `num_ctx` 分别核对；默认值明确受版本与环境影响。 |
| 迁移01 资产盘点 | Dify DSL、RAGFlow Agent JSON、MaxKB Excel/ZIP 的用途符合来源；文档、凭据、运行记录与流程分别处理；向量复用列出兼容性证明前提。 |
| 迁移02 MaxKB 映射 | 手动上传原文件边界、v1 原文缺失、v1.10.10-lts+ 至 v2.1.0 的工具适用路径，以及替换原文保留既有分段/向量的行为均与官方说明对应。 |
| 迁移03 并行切换 | RAGFlow 内容、流程与连接器设置分别盘点；增量及删除按启用规则验证；分阶段切换、访问样本、业务写操作和入口恢复形成可执行验收。 |

三篇迁移页分别产出资产清单、MaxKB 操作映射、并行切换验收，与既有产品选型比较页的用途互补。14 份 Guide 的中英文段落在技术结论、输入输出字段、失败边界和实施建议上保持一致。成稿包含 27 个去重外部参考链接，全部采用公开 HTTPS 地址，且全部属于本研究已核验的第一方来源集合。

### 审阅文件快照

以下 SHA-256 绑定本次审阅内容；后续正文改动可据此定位需要复核的文件。

```text
7560f27c7c2e18cd9cbc30797b1da44787ac3a66cfe922afd8e783861a32d7fd  src/content/guides/zh/private-deployment-readiness.zh.md
f25996fb87fd617581e3615cf32f82f8057209eaf356ecba02374dd8e060415b  src/content/guides/en/private-deployment-readiness.en.md
43390bc711df1ddc8f42c4cf732c662a8a3edf1ebc05afb3fa4f121e7e972b7e  src/content/guides/zh/model-gateway-architecture.zh.md
bf09710c5cb4c35092b6471e23f4e2d14384e5cb60d39ecfc71bceb70345a621  src/content/guides/en/model-gateway-architecture.en.md
973f720c07fc302fd38fde764876319d2c6ff618d725b35912bd81f294c5496c  src/content/guides/zh/embedding-model-migration.zh.md
6b276a09a8ba706e7063f854294cc344a941b30559ada05b8fc6e3b41b2f1f62  src/content/guides/en/embedding-model-migration.en.md
0257d37f4dd9a9ceb89a939506a95e860e531b147c8db25d812e4c409b5eedbb  src/content/guides/zh/kb-lifecycle-ownership.zh.md
264903f89b34a79234863567eb280a8aeb547adba0fc0586e31e346d7a50094b  src/content/guides/en/kb-lifecycle-ownership.en.md
762d72de3b9ec7e8f58bab0ab5f6f267347ddafd9f3f7c96d5e658e599b997ef  src/content/guides/zh/document-parsing-acceptance.zh.md
d2cd3ba3819d7888f7142a0efa5063c1fd5cd2c133a4fe76bcec42b3a442ab33  src/content/guides/en/document-parsing-acceptance.en.md
734632282ac806d25f094519dfbfd429d944dd5bbf6eab8bb06d342eb17c2a56  src/content/guides/zh/rerank-model-selection.zh.md
bdde519eeccff252bbc5c56f041a9326c8fef3dcd4048306baa8e6a0ca834756  src/content/guides/en/rerank-model-selection.en.md
f4e5bb61ca06f027b27a4eeea57609962ac950bd9c7f08f90873cd0a8ae49ae4  src/content/guides/zh/local-model-tco.zh.md
3029af5e8425adb19632f66d47a15d91d08c281891aa90c357dbad1c03b7fa11  src/content/guides/en/local-model-tco.en.md
5939e92d893acc858684d99f1f92bd72992e8d5864ee1072f524eb0aaa6f230f  src/content/tech-center/compare/competitors-fastgpt-comparison.md
3f11813b745455586b5a720163f1b356d0c043ca486a604e56449c231df6c939  src/content/tech-center/compare/maxkb-fastgpt-migration-guide.md
88b5303bde07e7b8255dc53a7ea19bf6cf3365d2344ef42080783f1ea1aa0633  src/content/tech-center/compare/migrate-fastgpt-ragflow-maxkb.md
```
