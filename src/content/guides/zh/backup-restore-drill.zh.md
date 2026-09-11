<!--
slug: backup-restore-drill
canonical: https://fastgpt.cn/guide/backup-restore-drill
hreflang: zh-CN | zh-CN → https://fastgpt.cn/guide/backup-restore-drill | en → https://fastgpt.io/guide/backup-restore-drill | x-default → https://fastgpt.io/guide/backup-restore-drill
Meta title: 备份不等于可恢复：FastGPT私有部署恢复演练验证指南
Meta description: 本文面向企业技术与运维负责人，讲解FastGPT私有部署下备份恢复演练的验证范围、判据、验收标准与边界条件，助力确保备份可落地恢复。
keywords: backup restore drill
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 深度内容-第6批/backup-restore-drill-V1.0-20260907.md
source_sha256: 35e51861e8ff7c46620e9eaf996321f26ffc04ce50558302d971807dc7dc62d9
source_verified: 2026-09-07
publication_batch: Week08
-->

# 备份不等于可恢复：FastGPT私有部署恢复演练验证指南

## 这件事在什么时候变成问题
当私有部署的FastGPT出现应用与知识库全量消失、升级后服务无法启动、跨环境迁移后数据无法加载等场景时，仅完成备份操作不足以解决故障。例如部分用户在跨版本升级后回退镜像，却发现数据库数据丢失，或在迁移部署时因未正确执行数据导出导入步骤，导致无法恢复原有业务数据。此时，备份仅作为基础前提，验证备份可恢复的流程才成为需要决策的核心问题。当企业需要制定故障恢复预案、完成版本升级前的风险验证、开展跨环境部署迁移时，该问题不再是可选操作，而是必须落地的技术要求。若仅依赖“存在备份”的认知，未提前验证恢复流程，当真实故障发生时，将面临数据无法恢复、业务长时间中断的风险。此类场景下，需从“有备份”的阶段推进至“验证过可恢复”的阶段，构建完整的恢复演练体系。

## 需要先定下来的判据
| 判据 | 取值 | 依据 |
| --- | --- | --- |
| 备份完整性 | 备份文件包含MongoDB fastgpt数据库全量数据、PG向量库数据、核心配置文件与持久化存储目录 | 社区迁移问题反馈中提及的mongodump导出数据库、持久化目录备份要求 |
| 恢复环境一致性 | 恢复镜像与数据库版本匹配备份，地址、凭证和数据卷属于隔离演练环境 | 社区升级问题反馈中因配置不一致导致数据丢失的案例 |
| 恢复流程可执行 | 恢复步骤无隐藏操作，操作人员可按文档完成数据导出、导入与服务启动 | 社区用户摸索迁移步骤多次失败的反馈 |
| 核心数据可访问 | 恢复后系统可正常登录，应用、知识库、对话历史等核心业务数据完整展示 | 社区用户升级后数据消失的故障场景 |
| 依赖服务连通性 | 各服务（FastGPT、Mongo、PG、Sandbox）间网络连通正常，健康检查接口返回正常 | 社区连接错误、Sandbox配置错误的问题反馈案例 |
| 权限配置正确性 | 数据库连接、API 密钥和 ROOT_KEY 指向隔离演练环境，权限范围符合预定恢复策略 | 社区配置文件修改未同步导致的连接失败问题 |

上述判据需按优先级依次落地。备份完整性是基础，若备份文件缺失核心数据集合或持久化目录，后续所有恢复操作均无意义。恢复环境一致性紧随其后，不同版本的镜像存在数据结构变更，例如v4.16.0版本新增的沙盒环境变量、弃用的旧变量，若配置不匹配将导致数据无法正常读取。恢复流程可执行性保障操作过程无失误，避免因遗漏步骤导致恢复失败。核心数据可访问是最终验证目标，依赖服务连通性与权限配置正确性则为该目标提供支撑，确保恢复后的系统可正常运行核心业务功能。

## 具体怎么做
首先明确需备份的核心资源范围，包括MongoDB的fastgpt业务数据库、PG向量库数据、系统配置文件（docker-compose.yml、.env、config.json）以及持久化存储目录。具体操作流程为，进入MongoDB容器，执行数据导出命令，例如docker exec -it mongo bash -c "mongodump --db fastgpt -u 'username' -p 'password' --authenticationDatabase admin --out /data/backup"，完成导出后通过docker cp命令将容器内的备份目录复制到宿主机本地，并对备份文件进行压缩存储，确保备份文件的完整性与可迁移性。同时，需备份PG数据库的持久化目录、Sandbox的存储目录以及所有系统配置文件，避免遗漏关键配置。

根据生产环境的版本要求，拉取对应版本的镜像，包括fastgpt-app、fastgpt-pro、mongo、pg等核心服务镜像，确保镜像版本与待恢复备份兼容。配置恢复环境的环境变量，例如AGENT_SANDBOX_PREVIEW_PROXY_URL、VM_VOLUME_NAME_PREFIX等沙盒相关变量，移除弃用的环境变量，例如v4.16.2版本中需删除的PARSE_FILE_WORKERS、PARSE_FILE_WORKER_MEMORY_LIMIT_MB等变量。将 MONGODB_URI、PG_URL 配置为隔离恢复环境的数据库地址，核对目标主机与数据卷，并保持数据库版本和参数兼容，同时配置网络环境，确保各服务处于同一docker网络或正确的端口映射规则，避免出现网络连通问题。若系统启用了Agent Sandbox，需提前配置相关环境变量，确保单端口或多端口部署的规则符合要求，同时避免同源部署导致的安全边界问题。

首先在隔离恢复环境中创建空的 MongoDB 数据卷，并核对目标主机和挂载路径，随后通过mongorestore命令导入备份的数据库数据，例如docker exec -it mongo mongorestore -u "username" -p "password" --authenticationDatabase admin /tmp/backup/ --db fastgpt。若涉及PG向量库，需同步恢复PG的持久化数据目录。完成数据导入后，启动所有服务，等待服务初始化完成，访问 Agent Sandbox Proxy 的 https://{{proxy-host}}/health 确认代理可达，并分别检查主服务、数据库和业务功能，同时检查Sandbox服务的运行日志，确保无连接错误或配置异常。仅在恢复过程同时跨越适用的 Agent Sandbox 数据迁移版本、且备份包含旧 Sandbox 数据时，按对应升级说明执行迁移。同版本恢复应先验证现有数据。先通过 dryRun:true 审阅待清理记录，确认备份和影响范围后按说明执行 dryRun:false；正式请求会先完成归一化，再在 pendingCount 归零后继续迁移。正式结果需同时满足 normalization.pendingCount=0、normalizationBlocked=false、failedCount=0。仅在全部失败均为源 App/Skill 缺失或已删除、且已逐项核实后使用 skipError:true；被跳过的记录会保留且尚未迁移，应单独审阅 skipped 和 skippedCount。

若系统使用了Milvus向量库，需提前将Milvus升级至2.5.16或更高版本，否则v4.16.2版本的FastGPT将无法正常启动。若需迁移Milvus的向量数据，需调用GET /api/admin/4162/milvus接口完成旧数据到modeldata_v2集合的迁移，避免重新生成嵌入带来的资源消耗。若恢复过程同时跨越商业版 ACL 迁移版本，按该版本说明执行权限清理、迁移及前后 dry-run 校验。若涉及版本升级，需按照官方升级指南逐步执行，避免跨大版本直接升级导致的数据结构不兼容问题。

## 怎么验收
1. 备份文件校验：核对备份文件的大小、文件数量与预期一致，通过mongorestore的dry-run模式验证备份完整性，标准为dry-run命令返回成功，无数据缺失或损坏错误。
2. 恢复环境校验：检查服务镜像和数据库版本与备份匹配，确认地址、凭证和数据卷属于隔离演练环境，执行各服务的健康检查接口，标准为所有健康检查接口返回正常状态，无配置错误日志。
3. 核心数据校验：通过Mongo Compass连接恢复后的Mongo数据库，查看fastgpt数据库的核心集合（app、dataset、chat等）的文档数量与备份前一致，标准为核心业务数据完整无缺失。
4. 系统功能校验：登录FastGPT系统，验证应用列表、知识库列表、对话历史可正常展示，创建新应用、上传文件至知识库并测试解析功能，标准为所有核心业务功能可正常运行，无报错信息。
5. 依赖服务校验：测试Sandbox的代码运行功能，检查Sandbox地址配置正确，执行curl命令测试Sandbox的连通性，标准为代码运行无报错，Sandbox日志无连接异常。
6. 权限与集成校验：检查环境变量中的API密钥、数据库连接参数、ROOT_KEY等配置正确，测试调用外部接口是否正常，标准为外部接口调用成功，无权限错误或连接失败问题。
7. 升级迁移校验：若版本升级要求迁移 Sandbox，检查正式请求结果满足 normalization.pendingCount=0、normalizationBlocked=false、failedCount=0，并单独审阅 skipped 和 skippedCount；后续 dry-run 本身无法证明正式迁移已完成。

## 边界：什么情况下这套做法不成立
当恢复环境的依赖服务版本与生产环境存在较大差异时，例如MongoDB版本从4.4升级至6.0，备份数据的格式可能不兼容，此时现有恢复流程无法保证数据可正常加载，需额外执行数据迁移脚本。若备份文件在存储过程中出现损坏或缺失，例如mongodump过程中发生网络中断导致部分集合未导出，现有流程无法恢复完整的业务数据，需重新执行备份操作。当系统使用第三方对象存储作为文件存储时，若备份未包含对象存储的桶数据，恢复后的系统将无法访问已上传的文件，需额外备份对象存储的全量数据。若系统部署了自定义插件、工作流或第三方集成，且备份未包含这些自定义配置，恢复后的系统可能无法正常运行这些功能，需同步备份自定义资源。当企业采用多集群部署或跨区域数据同步时，现有流程仅适用于单节点部署场景，需额外处理数据同步的一致性问题。当使用Milvus向量库且未提前升级至2.5.16以上版本时，v4.16.2及以上版本的FastGPT将无法正常启动，需先完成向量库升级再执行恢复操作。此外，若操作人员未掌握正确的恢复步骤，或未提前进行演练，即使具备完整的备份与一致的恢复环境，仍可能因操作失误导致恢复失败。

## 继续阅读

- [版本节奏怎么跟：升级窗口、跳版风险与回退准备](/zh/guide/version-upgrade-decision)
- [接口集成的验收口径：鉴权、限流、错误处理与回归项](/zh/guide/api-integration-acceptance)
- [上线前要先定的可观测基线：日志、指标与告警阈值的责任划分](/zh/guide/observability-baseline)

## 参考资料

- [FastGPT Agent Sandbox Proxy health check](https://doc.fastgpt.cn/zh-CN/self-host/config/sandbox/common)
- [FastGPT 4.16.0 Agent Sandbox migration](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4160)
- [FastGPT deployment environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT 4.16.2 migration instructions](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/4-16/4162)

- [FastGPT 环境变量](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT 升级说明](https://doc.fastgpt.cn/zh-CN/self-host/upgrading/upgrade-instruction)

## 需要进一步确认时

上述判据与验收项可依据公开文档逐条核对。若需要结合具体部署环境与运维条件落地这套流程，可通过商务咨询获取支持；云服务形态可直接开始使用。

- [商务咨询](/zh/contact)： 结合部署环境落地这套流程
- [立即开始](/zh/start)： 先用云服务验证流程可行性
- [定价](/zh/price)： 对比不同形态的适用范围
