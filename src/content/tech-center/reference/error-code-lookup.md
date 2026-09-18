---
title: FastGPT 错误码定位器：14 个模块 122 条错误码，含 8 个需要看 statusText 才能区分的码值
slug: /zh/reference/error-code-lookup
page_type: 交互模块页
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT 错误码定位器
meta_description: 输入接口返回的错误码，定位它属于哪个模块、对应哪个枚举与文案键，以及它是否与另一个模块的码值重叠。
keywords: FastGPT 错误码, 接口报错, statusText, 错误码对照
schema_type: TechArticle
date_published: 2026-09-09
date_modified: 2026-09-09
interactive_module: lookup
interactive_data: b3-error-code-lookup.json
---

# FastGPT 错误码定位器：14 个模块 122 条错误码，含 8 个需要看 statusText 才能区分的码值

接口返回一个六位数字，先要知道它出自哪个模块，才知道去查哪一块的配置。错误码由模块基码加偏移构成，规律清楚，但有两处例外会让纯按数字查的做法失效：有两组模块共用了同一个基码，还有一条码没有按规律走。下面这个模块把这些例外一并处理：输入码值，直接给出它可能对应的每一种情况。

## 这些码是怎么编的

每个模块有一个基码，模块内的错误在基码上按顺序加偏移。基码从 500000 起，目前用到 512000，模块之间留了 1000 的间隔。

这样编码的好处是看到一个数字就能大致判断范围：五十万开头的一段属于团队与成员，五十万一千那一段属于知识库，往后依次是应用、用户、对话、分享链接、接口凭证、通用错误、插件等等。完整对照见下面那张表。

这些码不是写在文档里的，它们来自代码里的枚举定义，每个模块一个文件，共 14 个文件、122 条。所以升级之后新增的码会直接出现在枚举里，本页的对照表也是从那些枚举定义整理出来的，不是手工维护的清单。

条数的分布本身也能说明问题集中在哪里。团队与成员那一块占 45 条，是所有模块里最多的一块，接近总数的三分之一；技能与知识库各占十几条；对话、插件这些只有两三条。换个说法：定义得最细的地方是权限与成员关系，这也是实际部署里最容易出问题的一层 —— 多人协作、成员组、资源可见范围这些配置组合起来的分支最多。

## 交互模块：错误码定位

输入接口返回的错误码，或者输入记得的那部分英文名，模块会给出它属于哪个模块、对应哪个枚举与文案键、定义在哪个文件里；如果这个码值同时属于两个模块，两种可能会一起列出来。

<!-- fastgpt-interactive: lookup | data: b3-error-code-lookup.json | fallback-table-below -->

| 控件 | 参数名 | 取值范围 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 错误码输入框 | code | 500000 至 512999，以及少数不在这个区间的码 | 无 | 输入接口返回里的数字 |
| 模块筛选 | module | team / dataset / app / user / chat / outLink / openapi / common / plugin / skill / system / s3 / sandbox / coupon | 全部 | 只想看某个模块时用 |
| 关键字搜索 | statusText | 枚举名或 statusText 片段 | 无 | 只记得英文名时用 |

### 模块与基码对照

这张表是按模块的完整分布，可以直接对照使用。最后一列标「有」的模块，它的部分码值与另一个模块重叠。

| 模块 | 基码 | 错误码条数 | 码值重叠 |
| --- | --- | --- | --- |
| team | 500000 | 45 |  |
| dataset | 501000 | 13 |  |
| app | 502000 | 5 |  |
| user | 503000 | 10 |  |
| chat | 504000 | 2 |  |
| outLink | 505000 | 4 |  |
| openapi | 506000 | 3 |  |
| common | 507000 | 8 |  |
| plugin | 508000 | 2 |  |
| skill | 509000 | 17 | 有 |
| system | 509000 | 5 | 有 |
| s3 | 510000 | 3 | 有 |
| sandbox | 510000 | 4 | 有 |
| coupon | 512000 | 1 |  |

## 8 个码值对应两种不同的错误

有两组模块共用了同一个基码：一组是 skill 与 system，都从 509000 起；另一组是 s3 与 sandbox，都从 510000 起。于是下面这些码值同时对应两个不同的错误，光看数字判断不出是哪一个，要看返回里的 statusText。

| 错误码 | 可能是 | 也可能是 | 怎么区分 |
| --- | --- | --- | --- |
| 509000 | skill.skillUnExist | system.communityVersionNumLimit | 看返回里的 statusText |
| 509001 | skill.unAuthSkill | system.commercialFeature | 看返回里的 statusText |
| 509002 | skill.canNotEditAdminPermission | system.licenseAppAmountLimit | 看返回里的 statusText |
| 509003 | skill.invalidSkillName | system.licenseDatasetAmountLimit | 看返回里的 statusText |
| 509004 | skill.invalidDescription | system.licenseUserAmountLimit | 看返回里的 statusText |
| 510000 | s3.InvalidUploadFileType | sandbox.agentSandboxPermissionDenied | 看返回里的 statusText |
| 510001 | s3.UploadFileTypeMismatch | sandbox.agentSandboxInitializing | 看返回里的 statusText |
| 510002 | s3.FileUploadDisabled | sandbox.runtimeUpgradeFailed | 看返回里的 statusText |

这一组里最容易误判的是 509 开头那几个。skill 那一侧是技能本身的问题，比如技能不存在、名称不合法；system 那一侧是版本与授权的限制，比如社区版数量限制、商业版功能、应用或知识库或用户数超出授权。两者的处置方向完全不同：前者改配置，后者要看版本与授权。

## 还有一条码不在规律里

分享链接失效这一条的码值是 501，而它所属模块的基码是 505000。也就是说它没有按基码加偏移的规律走，所以按数字区间去猜模块的做法，在这一条上会得到错误的答案。

这条码在实际排查中出现得不少 —— 分享链接过期或被删除时返回的就是它。看到一个三位数的码，基本可以直接判断是这一条。

## 返回里的三样东西各有什么用

一次报错的返回里通常同时带着三样东西：数字码、statusText、以及一个用于取提示文案的键。三样各有各的用处，不要只留其中一样。

数字码适合做告警与统计。它是整数，便于按区间聚合，比如把五十万开头的一整段划成团队与权限类问题做趋势。但它不适合做唯一标识，一是有重叠，二是升级时会平移。

statusText 适合做唯一标识与日志检索。它在所有模块里唯一，跨版本也基本保留，所以自建的日志系统按它建索引最稳。

文案键用于取用户能看到的那句提示。同一个错误在不同语言下显示不同文字，而键是同一个。需要自定义提示语的时候，改的是这个键对应的文案，不是去改错误码。这一层容易被忽略：直接在前端按数字码写死中文提示，换语言时就没有对应版本了。

## 有两个枚举名按码值查不到

team.teamMemberOverSize、user.unAuthRole 这两个名字出现在枚举定义里，但没有对应的码值，所以按数字查不到它们，只能按名字查到。在日志里看到这两个名字时，不用去找它对应几号码。

另外本页的模块名按定义文件所在的路径取，不按文件顶部的注释取。部分文件的注释与它实际所属的模块不一致，按注释整理会把码值归到错误的模块下，而这类错误在对照表上看不出来。所以如果拿本页的模块名与代码注释对不上，以路径为准。

## 拿到一个错误码之后按什么顺序排

第一步是拿 statusText，先别拿数字。数字可能有歧义，statusText 在所有模块里都是唯一的，接口返回里两者都有。

第二步是看模块，模块决定去查哪一块的配置。知识库那一段的错误多与向量模型、索引任务、文件解析有关；团队那一段多与成员、权限、成员组有关；system 那一段几乎都与版本或授权有关，改配置解决不了。

第三步是拿枚举名去代码或文档里搜。枚举名比数字稳定，版本升级时数字有可能因为插入新错误而变化，而枚举名一般会保留。这也是排查时优先记枚举名的原因。

如果这三步之后仍然定位不到，把接口原始返回完整保留下来再往上反馈，只报一个数字往往需要来回确认好几轮。

## 版本差异与失效说明

本页的 122 条码值来自 v4.16.2。升级之后模块内新增的错误会让后面的偏移发生变化，所以跨版本对照时以枚举名为准，不要以数字为准。两组共用基码的情况在这个版本里存在，如果后续版本调整了基码分配，本页的重叠清单需要重新整理。

## 继续阅读

- [知识库分块与索引设置估算器](/zh/guide/kb-chunk-and-index-settings)
- [环境变量清单生成器](/zh/reference/env-variable-checklist)

> 本页参数与判定规则取自 FastGPT 开源仓库 v4.16.2，核验日 2026-09-09。

## 参考资料

- [FastGPT 开源仓库](https://github.com/labring/FastGPT)
- [FastGPT 部署与配置文档](https://doc.fastgpt.cn/zh-CN/self-host)
