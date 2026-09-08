---
title: FastGPT Error Code Reference
slug: /en/reference/error-codes-reference
page_type: Reference data
source: https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/common/error/code
source_type: 官方文档
meta_title: FastGPT Error Code Reference | FastGPT Technical Center
meta_description: A grouped reference of the 124 error codes defined in the FastGPT open-source repository, with the numeric code, statusText and message key.
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/英文-fastgpt.io/reference/error-codes-reference.md
source_sha256: 6aac8c70d6cc3a34220356bf1cc7f5fd3c34983e6f5ab26381bece2abc28927e
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT Error Code Reference

This table describes FastGPT development snapshot 5957d06 (2026-09-07). Development definitions can precede a stable release; check the version you deploy.

## How to use this table

API error responses carry a `code` and a `statusText`. This page lists the 124 error codes defined in the open-source repository, grouped by module, so either field can be used to look up which module raised the error and which message it maps to.

Use the first three digits of `code` to locate the module band, then find the entry in that module's table. `statusText` is preferred for programmatic checks; validate its compatibility against the target version.

## Columns

| Column | Meaning |
| --- | --- |
| Code | The `code` value in the error response |
| statusText | The `statusText` value; preferred for programmatic checks; verify identifier compatibility when upgrading |
| Message key | The localisation key for the user-facing message |
| Notes | How the code is derived, and any definition-level caveat |

## Three things to know before using this table

**1. Two pairs of modules share the same base code band, so `code` alone does not identify the module.**

| Base band | Modules sharing it |
| --- | --- |
| `509000` | skill, system |
| `510000` | s3, sandbox |

For values in these bands, `statusText` is required to determine the source module.

**2. 1 error code does not sit inside its module's base band.**

| Module | Code | statusText | Module base band |
| --- | --- | --- | --- |
| outLink | `501` | `linkUnInvalid` | `505000` |

This entry sets its code directly in the definition, so deriving it from the band will not find it.

**3. 2 statusText values are declared in an enum but have no code definition.**

| Module | statusText |
| --- | --- |
| team | `teamMemberOverSize` |
| user | `unAuthRole` |

These identifiers can be referenced in code, but the error map does not contain them, so no `code` or message is returned at runtime.

## dataset module (13 codes, base band 501000)

| Code | statusText | Message key | Notes |
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

## app module (5 codes, base band 502000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `502000` | `appUnExist` | `common:code_error.app_error.not_exist` | — |
| `502001` | `unAuthApp` | `common:code_error.app_error.un_auth_app` | — |
| `502002` | `invalidOwner` | `common:code_error.app_error.invalid_owner` | — |
| `502003` | `invalidAppType` | `common:code_error.app_error.invalid_app_type` | — |
| `502004` | `canNotEditAdminPermission` | `common:code_error.app_error.can_not_edit_admin_permission` | — |

## chat module (2 codes, base band 504000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `504000` | `unAuthChat` | `common:code_error.chat_error.un_auth` | — |
| `504001` | `chatIsGenerating` | `common:code_error.chat_error.chat_generating` | — |

## openapi module (3 codes, base band 506000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `506000` | `openapiUnExist` | `common:code_error.openapi_error.api_key_not_exist` | — |
| `506001` | `openapiUnAuth` | `common:code_error.openapi_error.un_auth` | — |
| `506002` | `openapiExceedLimit` | `common:code_error.openapi_error.exceed_limit` | — |

## user module (10 codes, base band 503000)

| Code | statusText | Message key | Notes |
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

## team module (46 codes, base band 500000)

| Code | statusText | Message key | Notes |
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

## skill module (17 codes, base band 509000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `509000` | `skillUnExist` | `common:code_error.skill_error.not_exist` | shares base band 509000 with another module |
| `509001` | `unAuthSkill` | `common:code_error.skill_error.un_auth_skill` | shares base band 509000 with another module |
| `509002` | `canNotEditAdminPermission` | `common:code_error.skill_error.can_not_edit_admin_permission` | shares base band 509000 with another module |
| `509003` | `invalidSkillName` | `common:code_error.skill_error.invalid_name` | shares base band 509000 with another module |
| `509004` | `invalidDescription` | `common:code_error.skill_error.invalid_description` | shares base band 509000 with another module |
| `509005` | `invalidCategory` | `common:code_error.skill_error.invalid_category` | shares base band 509000 with another module |
| `509006` | `invalidConfig` | `common:code_error.skill_error.invalid_config` | shares base band 509000 with another module |
| `509007` | `noStorage` | `common:code_error.skill_error.no_storage` | shares base band 509000 with another module |
| `509008` | `noFieldsToUpdate` | `common:code_error.skill_error.no_fields_to_update` | shares base band 509000 with another module |
| `509009` | `invalidArchiveFormat` | `common:code_error.skill_error.invalid_archive_format` | shares base band 509000 with another module |
| `509010` | `invalidSkillPackage` | `common:code_error.skill_error.invalid_package` | shares base band 509000 with another module |
| `509011` | `invalidSkillId` | `common:code_error.skill_error.invalid_skill_id` | shares base band 509000 with another module |
| `509012` | `archiveEmpty` | `common:code_error.skill_error.archive_empty` | shares base band 509000 with another module |
| `509013` | `archiveExtractionFailed` | `common:code_error.skill_error.archive_extraction_failed` | shares base band 509000 with another module |
| `509014` | `archiveTooLarge` | `common:code_error.skill_error.archive_too_large` | shares base band 509000 with another module |
| `509015` | `missingImageRepository` | `common:code_error.skill_error.missing_image_repository` | shares base band 509000 with another module |
| `509016` | `skillNameTooLong` | `common:code_error.skill_error.skill_name_too_long` | shares base band 509000 with another module |

## sandbox module (4 codes, base band 510000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `510000` | `agentSandboxPermissionDenied` | `common:code_error.sandbox_error.agent_sandbox_permission_denied` | shares base band 510000 with another module |
| `510001` | `agentSandboxInitializing` | `common:code_error.sandbox_error.agent_sandbox_initializing` | shares base band 510000 with another module |
| `510002` | `runtimeUpgradeFailed` | `common:code_error.sandbox_error.runtime_upgrade_failed` | shares base band 510000 with another module |
| `510003` | `runtimeUpgradeInProgress` | `skill:sandbox_runtime_upgrade_in_progress` | shares base band 510000 with another module |

## plugin module (2 codes, base band 508000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `508000` | `pluginUnExist` | `common:error.tool_not_exist` | — |
| `508001` | `pluginUnAuth` | `common:code_error.plugin_error.un_auth` | — |

## outLink module (4 codes, base band 505000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `501` | `linkUnInvalid` | `common:code_error.outlink_error.invalid_link` | code set directly in the definition |
| `505000` | `outlinkUnExist` | `common:code_error.outlink_error.link_not_exist` | — |
| `505001` | `unAuthLink` | `common:code_error.outlink_error.invalid_link` | — |
| `505003` | `unAuthUser` | `common:code_error.outlink_error.un_auth_user` | — |

## s3 module (3 codes, base band 510000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `510000` | `InvalidUploadFileType` | `common:error.s3_upload_invalid_file_type` | shares base band 510000 with another module |
| `510001` | `UploadFileTypeMismatch` | `common:error.s3_upload_invalid_file_type` | shares base band 510000 with another module |
| `510002` | `FileUploadDisabled` | `common:error.file_upload_disabled` | shares base band 510000 with another module |

## common module (8 codes, base band 507000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `507000` | `invalidParams` | `common:error.invalid_params` | — |
| `507001` | `invalidResource` | `common:error_invalid_resource` | — |
| `507002` | `fileNotFound` | `common:error.fileNotFound` | — |
| `507003` | `unAuthFile` | `common:error.unAuthFile` | — |
| `507004` | `missingParams` | `common:error.missingParams` | — |
| `507005` | `inheritPermissionError` | `common:error.inheritPermissionError` | — |
| `507006` | `folderDepthLimit` | `common:error.folderDepthLimit` | — |
| `507007` | `folderMoveDepthLimit` | `common:error.folderMoveDepthLimit` | — |

## system module (5 codes, base band 509000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `509000` | `communityVersionNumLimit` | `common:code_error.system_error.community_version_num_limit` | shares base band 509000 with another module |
| `509001` | `commercialFeature` | `common:code_error.system_error.commercial_feature` | shares base band 509000 with another module |
| `509002` | `licenseAppAmountLimit` | `common:code_error.system_error.license_app_amount_limit` | shares base band 509000 with another module |
| `509003` | `licenseDatasetAmountLimit` | `common:code_error.system_error.license_dataset_amount_limit` | shares base band 509000 with another module |
| `509004` | `licenseUserAmountLimit` | `common:code_error.system_error.license_user_amount_limit` | shares base band 509000 with another module |

## coupon module (1 codes, base band 512000)

| Code | statusText | Message key | Notes |
| --- | --- | --- | --- |
| `512000` | `invalidCoupon` | `common:coupon_invalid` | — |

## model module (1 code, base band 513000)

| Code | statusText | Message key |
| --- | --- | --- |
| `513000` | `modelUnExist` | `common:model_not_exist` |

## When this table goes out of date

1. **A new error code inserted mid-array shifts every code after it.** Checks based on the numeric `code` can break after an upgrade; use `statusText` instead.
2. **The commercial edition has its own error definitions.** This table covers the open-source repository only.
3. **Message keys map to text that changes with the language pack.** This table gives the key, not the wording.
4. **Values declared in an enum without a code may get one in a later version.**

## Next steps

The tables above can be checked against the open-source repository. If a specific deployment needs to be assessed against these values, contact sales for support; the cloud service can be used directly without preparing the environment first.

- [Contact sales](/en/contact): assess your deployment against these values
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what each form covers

## References

- [FastGPT error codes reference — 5957d06](https://github.com/labring/FastGPT/tree/5957d06807ff7f984c70c6425c8d0fc40eb1714d/packages/global/common/error/code)
