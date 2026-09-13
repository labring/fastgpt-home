---
title: FastGPT 错误码全表
slug: /zh/reference/error-codes-reference
page_type: 基准数据页
source: https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/common/error/code
source_type: 官方文档
meta_title: FastGPT 错误码全表｜FastGPT 技术中心
meta_description: 查阅错误码全表，按症状与技术对象定位相关配置、排查步骤和已发布文档，结合版本边界确认适用条件。
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/中文-fastgpt.cn/reference/error-codes-reference.md
source_sha256: f3ec8f44b11da9839662b0c875d0d12562bcd9dfb5faf571c55593b8c714bd0d
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT 错误码全表

本表对应 FastGPT 开发分支快照 5957d06（2026-09-07）。开发分支包含尚未进入正式版本的能力；部署时请核对所用版本。

## 这张表怎么用

接口返回的错误体里带 `code` 与 `statusText` 两个字段。本页把开源仓库中定义的 124 个错误码按模块分组逐条列出，可用 `code` 数值或 `statusText` 反查它属于哪个模块、对应哪条文案。码值取自错误码定义文件。

排查接口报错时的用法：先用 `code` 的前三位定位模块段位，再在对应模块的表里查具体条目；`statusText` 更适合程序判断，升级时应核对目标版本的标识兼容性。

## 各列的含义

| 列 | 含义 |
| --- | --- |
| 错误码 | 接口返回体中的 `code` 数值 |
| statusText | 接口返回体中的 `statusText`，升级时需核对兼容性，建议用它做程序判断 |
| 文案键 | 该错误对应的多语言文案键，可在语言包中查到面向用户的提示文字 |
| 备注 | 码值的推导方式，以及该条目涉及的定义层面问题 |

## 使用这张表之前要知道的三件事

**1. 有两组模块共用同一个基码段位，仅凭 `code` 数值无法区分。**

| 基码段位 | 共用该段位的模块 |
| --- | --- |
| `509000` | skill、system |
| `510000` | s3、sandbox |

落在这两个段位的返回值，需要结合 `statusText` 才能确定来源模块。

**2. 有 1 条错误码不在其模块的基码段位内。**

| 模块 | 错误码 | statusText | 该模块基码段位 |
| --- | --- | --- | --- |
| outLink | `501` | `linkUnInvalid` | `505000` |

这类条目在定义中直接指定了码值，按段位推断会查不到。

**3. 有 2 个 statusText 已在枚举中声明，但没有对应的码值定义。**

| 模块 | statusText |
| --- | --- |
| team | `teamMemberOverSize` |
| user | `unAuthRole` |

这些标识在代码中可以引用，但错误码映射表里没有它们，实际返回时取不到 `code` 与文案。

## dataset 模块（13 条 · 基码段位 501000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `501000` | `sameApiCollection` | `common:core.dataset.error.sameApiCollection` | — |
| `501001` | `notSupportSync` | `common:core.dataset.error.notSupportSync` | — |
| `501002` | `unExistDataset` | `common:core.dataset.error.unExistDataset` | — |
| `501003` | `unExistCollection` | `common:error_collection_not_exist` | — |
| `501004` | `unAuthDataset` | `common:core.dataset.error.unAuthDataset` | — |
| `501005` | `unAuthDatasetCollection` | `common:core.dataset.error.unAuthDatasetCollection` | — |
| `501006` | `unAuthDatasetData` | `common:core.dataset.error.unAuthDatasetData` | — |
| `501007` | `unAuthDatasetFile` | `common:core.dataset.error.unAuthDatasetFile` | — |
| `501008` | `unCreateCollection` | `common:core.dataset.error.unCreateCollection` | — |
| `501009` | `unLinkCollection` | `common:core.dataset.error.unLinkCollection` | — |
| `501010` | `invalidVectorModelOrQAModel` | `common:core.dataset.error.invalidVectorModelOrQAModel` | — |
| `501011` | `canNotEditAdminPermission` | `common:core.dataset.error.canNotEditAdminPermission` | — |
| `501012` | `noApiServer` | `common:core.dataset.error.noApiServer` | — |

## app 模块（5 条 · 基码段位 502000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `502000` | `appUnExist` | `common:code_error.app_error.not_exist` | — |
| `502001` | `unAuthApp` | `common:code_error.app_error.un_auth_app` | — |
| `502002` | `invalidOwner` | `common:code_error.app_error.invalid_owner` | — |
| `502003` | `invalidAppType` | `common:code_error.app_error.invalid_app_type` | — |
| `502004` | `canNotEditAdminPermission` | `common:code_error.app_error.can_not_edit_admin_permission` | — |

## chat 模块（2 条 · 基码段位 504000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `504000` | `unAuthChat` | `common:code_error.chat_error.un_auth` | — |
| `504001` | `chatIsGenerating` | `common:code_error.chat_error.chat_generating` | — |

## openapi 模块（3 条 · 基码段位 506000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `506000` | `openapiUnExist` | `common:code_error.openapi_error.api_key_not_exist` | — |
| `506001` | `openapiUnAuth` | `common:code_error.openapi_error.un_auth` | — |
| `506002` | `openapiExceedLimit` | `common:code_error.openapi_error.exceed_limit` | — |

## user 模块（10 条 · 基码段位 503000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `503000` | `notUser` | `common:code_error.account_not_found` | — |
| `503001` | `userExist` | `common:code_error.account_exist` | — |
| `503002` | `account_psw_error` | `common:code_error.account_error` | — |
| `503003` | `unAuthSso` | `user:sso_auth_failed` | — |
| `503004` | `invalidVerificationCode` | `common:error.code_error` | — |
| `503005` | `sendVerificationCodeTooFrequently` | `common:error.send_auth_code_too_frequently` | — |
| `503006` | `verifyCodeTooFrequently` | `common:error.verify_code_too_frequently` | — |
| `503007` | `invalidAccount` | `common:code_error.invalid_account` | — |
| `503008` | `accountCancellationPending` | `common:code_error.account_cancellation_pending` | — |
| `503009` | `registrationMethodNotSupported` | `common:error.registration_method_not_supported` | — |

## team 模块（46 条 · 基码段位 500000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `500000` | `notUser` | `common:code_error.team_error.not_user` | — |
| `500001` | `unPermission` | `common:error_un_permission` | — |
| `500002` | `accountCancellationPending` | `common:code_error.team_error.account_cancellation_pending` | — |
| `500003` | `teamOverSize` | `common:code_error.team_error.over_size` | — |
| `500004` | `unAuthTeam` | `common:code_error.team_error.un_auth` | — |
| `500005` | `aiPointsNotEnough` | `common:code_error.team_error.ai_points_not_enough` | — |
| `500006` | `datasetSizeNotEnough` | `common:code_error.team_error.dataset_size_not_enough` | — |
| `500007` | `datasetAmountNotEnough` | `common:code_error.team_error.dataset_amount_not_enough` | — |
| `500008` | `appAmountNotEnough` | `common:code_error.team_error.app_amount_not_enough` | — |
| `500009` | `pluginAmountNotEnough` | `common:code_error.team_error.plugin_amount_not_enough` | — |
| `500010` | `appFolderAmountNotEnough` | `common:code_error.team_error.app_folder_amount_not_enough` | — |
| `500011` | `websiteSyncNotEnough` | `common:code_error.team_error.website_sync_not_enough` | — |
| `500012` | `reRankNotEnough` | `common:code_error.team_error.re_rank_not_enough` | — |
| `500013` | `ticketNotAvailable` | `common:code_error.team_error.ticket_not_available` | — |
| `500014` | `groupNameEmpty` | `common:code_error.team_error.group_name_empty` | — |
| `500015` | `groupNotExist` | `common:code_error.team_error.group_not_exist` | — |
| `500016` | `cannotDeleteDefaultGroup` | `common:code_error.team_error.cannot_delete_default_group` | — |
| `500017` | `groupNameDuplicate` | `common:code_error.team_error.group_name_duplicate` | — |
| `500018` | `userNotActive` | `common:code_error.team_error.user_not_active` | — |
| `500019` | `orgMemberNotExist` | `common:code_error.team_error.org_member_not_exist` | — |
| `500020` | `orgMemberDuplicated` | `common:code_error.team_error.org_member_duplicated` | — |
| `500021` | `orgNotExist` | `common:code_error.team_error.org_not_exist` | — |
| `500022` | `orgParentNotExist` | `common:code_error.team_error.org_parent_not_exist` | — |
| `500023` | `cannotMoveToSubPath` | `common:code_error.team_error.cannot_move_to_sub_path` | — |
| `500024` | `cannotModifyRootOrg` | `common:code_error.team_error.cannot_modify_root_org` | — |
| `500025` | `cannotDeleteNonEmptyOrg` | `common:code_error.team_error.cannot_delete_non_empty_org` | — |
| `500026` | `invitationLinkInvalid` | `common:code_error.team_error.invitation_link_invalid` | — |
| `500027` | `youHaveBeenInTheTeam` | `common:code_error.team_error.you_have_been_in_the_team` | — |
| `500028` | `tooManyInvitations` | `common:code_error.team_error.too_many_invitations` | — |
| `500029` | `datasetFolderAmountNotEnough` | `common:code_error.team_error.dataset_folder_amount_not_enough` | — |
| `500030` | `sandboxNotSupport` | `common:code_error.team_error.sandbox_not_support` | — |
| `500031` | `disabled` | `common:enterprise_auth.error.disabled` | — |
| `500032` | `serviceNotConfigured` | `common:enterprise_auth.error.service_not_configured` | — |
| `500033` | `noRemainingTimes` | `common:enterprise_auth.error.no_remaining_times` | — |
| `500034` | `alreadyVerified` | `common:enterprise_auth.error.already_verified` | — |
| `500035` | `enterpriseOccupied` | `common:enterprise_auth.error.enterprise_occupied` | — |
| `500036` | `tooFrequent` | `common:enterprise_auth.error.too_frequent` | — |
| `500037` | `serviceError` | `common:enterprise_auth.error.service_error` | — |
| `500038` | `serviceTimeout` | `common:enterprise_auth.error.service_timeout` | — |
| `500039` | `infoFailed` | `common:enterprise_auth.error.info_failed` | — |
| `500040` | `taskNotFound` | `common:enterprise_auth.error.task_not_found` | — |
| `500041` | `taskExpired` | `common:enterprise_auth.error.task_expired` | — |
| `500042` | `amountError` | `common:enterprise_auth.error.amount_error` | — |
| `500043` | `amountFailed` | `common:enterprise_auth.error.amount_failed` | — |
| `500044` | `processing` | `common:enterprise_auth.error.processing` | — |
| `500045` | `teamPluginInstallDisabled` | `common:code_error.team_error.team_plugin_install_disabled` | — |

## skill 模块（17 条 · 基码段位 509000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `509000` | `skillUnExist` | `common:code_error.skill_error.not_exist` | 与 system 模块共用基码 509000 |
| `509001` | `unAuthSkill` | `common:code_error.skill_error.un_auth_skill` | 与 system 模块共用基码 509000 |
| `509002` | `canNotEditAdminPermission` | `common:code_error.skill_error.can_not_edit_admin_permission` | 与 system 模块共用基码 509000 |
| `509003` | `invalidSkillName` | `common:code_error.skill_error.invalid_name` | 与 system 模块共用基码 509000 |
| `509004` | `invalidDescription` | `common:code_error.skill_error.invalid_description` | 与 system 模块共用基码 509000 |
| `509005` | `invalidCategory` | `common:code_error.skill_error.invalid_category` | 与 system 模块共用基码 509000 |
| `509006` | `invalidConfig` | `common:code_error.skill_error.invalid_config` | 与 system 模块共用基码 509000 |
| `509007` | `noStorage` | `common:code_error.skill_error.no_storage` | 与 system 模块共用基码 509000 |
| `509008` | `noFieldsToUpdate` | `common:code_error.skill_error.no_fields_to_update` | 与 system 模块共用基码 509000 |
| `509009` | `invalidArchiveFormat` | `common:code_error.skill_error.invalid_archive_format` | 与 system 模块共用基码 509000 |
| `509010` | `invalidSkillPackage` | `common:code_error.skill_error.invalid_package` | 与 system 模块共用基码 509000 |
| `509011` | `invalidSkillId` | `common:code_error.skill_error.invalid_skill_id` | 与 system 模块共用基码 509000 |
| `509012` | `archiveEmpty` | `common:code_error.skill_error.archive_empty` | 与 system 模块共用基码 509000 |
| `509013` | `archiveExtractionFailed` | `common:code_error.skill_error.archive_extraction_failed` | 与 system 模块共用基码 509000 |
| `509014` | `archiveTooLarge` | `common:code_error.skill_error.archive_too_large` | 与 system 模块共用基码 509000 |
| `509015` | `missingImageRepository` | `common:code_error.skill_error.missing_image_repository` | 与 system 模块共用基码 509000 |
| `509016` | `skillNameTooLong` | `common:code_error.skill_error.skill_name_too_long` | 与 system 模块共用基码 509000 |

## sandbox 模块（4 条 · 基码段位 510000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `510000` | `agentSandboxPermissionDenied` | `common:code_error.sandbox_error.agent_sandbox_permission_denied` | 与 s3 模块共用基码 510000 |
| `510001` | `agentSandboxInitializing` | `common:code_error.sandbox_error.agent_sandbox_initializing` | 与 s3 模块共用基码 510000 |
| `510002` | `runtimeUpgradeFailed` | `common:code_error.sandbox_error.runtime_upgrade_failed` | 与 s3 模块共用基码 510000 |
| `510003` | `runtimeUpgradeInProgress` | `skill:sandbox_runtime_upgrade_in_progress` | 与 s3 模块共用基码 510000 |

## plugin 模块（2 条 · 基码段位 508000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `508000` | `pluginUnExist` | `common:error.tool_not_exist` | — |
| `508001` | `pluginUnAuth` | `common:code_error.plugin_error.un_auth` | — |

## outLink 模块（4 条 · 基码段位 505000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `501` | `linkUnInvalid` | `common:code_error.outlink_error.invalid_link` | 定义中直接指定码值 |
| `505000` | `outlinkUnExist` | `common:code_error.outlink_error.link_not_exist` | — |
| `505001` | `unAuthLink` | `common:code_error.outlink_error.invalid_link` | — |
| `505003` | `unAuthUser` | `common:code_error.outlink_error.un_auth_user` | — |

## s3 模块（3 条 · 基码段位 510000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `510000` | `InvalidUploadFileType` | `common:error.s3_upload_invalid_file_type` | 与 sandbox 模块共用基码 510000 |
| `510001` | `UploadFileTypeMismatch` | `common:error.s3_upload_invalid_file_type` | 与 sandbox 模块共用基码 510000 |
| `510002` | `FileUploadDisabled` | `common:error.file_upload_disabled` | 与 sandbox 模块共用基码 510000 |

## common 模块（8 条 · 基码段位 507000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `507000` | `invalidParams` | `common:error.invalid_params` | — |
| `507001` | `invalidResource` | `common:error_invalid_resource` | — |
| `507002` | `fileNotFound` | `common:error.fileNotFound` | — |
| `507003` | `unAuthFile` | `common:error.unAuthFile` | — |
| `507004` | `missingParams` | `common:error.missingParams` | — |
| `507005` | `inheritPermissionError` | `common:error.inheritPermissionError` | — |
| `507006` | `folderDepthLimit` | `common:error.folderDepthLimit` | — |
| `507007` | `folderMoveDepthLimit` | `common:error.folderMoveDepthLimit` | — |

## system 模块（5 条 · 基码段位 509000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `509000` | `communityVersionNumLimit` | `common:code_error.system_error.community_version_num_limit` | 与 skill 模块共用基码 509000 |
| `509001` | `commercialFeature` | `common:code_error.system_error.commercial_feature` | 与 skill 模块共用基码 509000 |
| `509002` | `licenseAppAmountLimit` | `common:code_error.system_error.license_app_amount_limit` | 与 skill 模块共用基码 509000 |
| `509003` | `licenseDatasetAmountLimit` | `common:code_error.system_error.license_dataset_amount_limit` | 与 skill 模块共用基码 509000 |
| `509004` | `licenseUserAmountLimit` | `common:code_error.system_error.license_user_amount_limit` | 与 skill 模块共用基码 509000 |

## coupon 模块（1 条 · 基码段位 512000）

| 错误码 | statusText | 文案键 | 备注 |
| --- | --- | --- | --- |
| `512000` | `invalidCoupon` | `common:coupon_invalid` | — |

## model 模块（1 条 · 基码段位 513000）

| Code | statusText | Message key |
| --- | --- | --- |
| `513000` | `modelUnExist` | `common:model_not_exist` |

## 什么情况下这张表会过期

1. **新增错误码会插入数组中间，使其后的码值整体后移。** 按 `code` 数值做的程序判断
   在升级后可能失配，建议用 `statusText` 判断。
2. **商业版另有独立的错误码定义**，本表只覆盖开源仓库中的定义。
3. **文案键对应的提示文字随语言包变化**，本表只给键名，不给具体文字。
4. **枚举中声明但未注册码值的条目，可能在后续版本补齐**，届时会获得码值。

## 参考资料

- [FastGPT error codes reference — 5957d06](https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/common/error/code)
