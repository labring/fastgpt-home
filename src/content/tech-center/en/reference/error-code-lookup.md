---
title: FastGPT Error Code Lookup: 122 Codes Across 14 Modules, With 8 That Need statusText to Tell Apart
slug: /en/reference/error-code-lookup
page_type: Interactive module page
source: https://github.com/labring/FastGPT
source_type: 官方文档
meta_title: FastGPT error code lookup
meta_description: Enter the error code returned by the API to find which module it belongs to, which enum and message key it maps to, and whether it overlaps with another module.
keywords: FastGPT error code, API error, statusText, error code reference
schema_type: TechArticle
date_published: 2026-09-09
date_modified: 2026-09-09
interactive_module: lookup
interactive_data: b3-error-code-lookup.json
---

# FastGPT Error Code Lookup: 122 Codes Across 14 Modules, With 8 That Need statusText to Tell Apart

When the API returns a six-digit number, the module it came from is what tells you which part of the configuration to look at. Codes are a module base plus an offset, which is a clear rule with two exceptions that break lookup by number alone: two pairs of modules share a base code, and one code does not follow the rule at all. The module below handles those exceptions - enter a code and it reports every case it can match.

## How the codes are assigned

Each module owns a base code, and errors inside a module add an offset to it. Bases start at 500000 and currently run to 512000, with a gap of 1000 between modules.

The benefit is that a number narrows the range immediately: the five-hundred-thousand block belongs to teams and members, the next block to knowledge bases, then applications, users, chat, share links, API credentials, common errors, plugins and so on. The full mapping is in the table below.

These codes are not maintained in documentation. They come from enum definitions in the code, one file per module, 14 files and 122 entries in total. New codes added during an upgrade therefore appear in those enums directly, and the table on this page is compiled from the same definitions rather than kept by hand.

The distribution itself says something about where problems concentrate. Teams and members hold 45 entries, the largest block of any module and close to a third of the total; skills and knowledge bases hold a dozen or so each; chat and plugins hold two or three. Put differently, the area defined in the most detail is permissions and membership, which is also the layer that breaks most often in real deployments - multi-person collaboration, member groups and resource visibility combine into the largest number of branches.

## Interactive module: error code lookup

Enter the error code from the API response, or part of the English name you remember, and the module reports the module it belongs to, the enum and message key it maps to, and the file where it is defined. When a code belongs to two modules, both possibilities are listed.

<!-- fastgpt-interactive: lookup | data: b3-error-code-lookup.json | fallback-table-below -->

| Control | Parameter | Range | Default | Notes |
| --- | --- | --- | --- | --- |
| Code input | code | 500000 to 512999, plus a few codes outside that range | None | Enter the number from the API response |
| Module filter | module | team / dataset / app / user / chat / outLink / openapi / common / plugin / skill / system / s3 / sandbox / coupon | All | Use when looking at one module only |
| Keyword search | statusText | Enum name or part of statusText | None | Use when only the English name is known |

### Modules and base codes

This table is the full distribution by module and can be read on its own. Modules marked Yes in the last column have code values that overlap another module.

| Module | Base code | Codes | Overlaps |
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
| skill | 509000 | 17 | Yes |
| system | 509000 | 5 | Yes |
| s3 | 510000 | 3 | Yes |
| sandbox | 510000 | 4 | Yes |
| coupon | 512000 | 1 |  |

## 8 code values map to two different errors

Two pairs of modules share a base code: skill and system both start at 509000, and s3 and sandbox both start at 510000. The codes below therefore map to two different errors each, and the number alone cannot separate them - statusText in the response can.

| Code | Could be | Or | How to tell |
| --- | --- | --- | --- |
| 509000 | skill.skillUnExist | system.communityVersionNumLimit | Read statusText in the response |
| 509001 | skill.unAuthSkill | system.commercialFeature | Read statusText in the response |
| 509002 | skill.canNotEditAdminPermission | system.licenseAppAmountLimit | Read statusText in the response |
| 509003 | skill.invalidSkillName | system.licenseDatasetAmountLimit | Read statusText in the response |
| 509004 | skill.invalidDescription | system.licenseUserAmountLimit | Read statusText in the response |
| 510000 | s3.InvalidUploadFileType | sandbox.agentSandboxPermissionDenied | Read statusText in the response |
| 510001 | s3.UploadFileTypeMismatch | sandbox.agentSandboxInitializing | Read statusText in the response |
| 510002 | s3.FileUploadDisabled | sandbox.runtimeUpgradeFailed | Read statusText in the response |

The 509 group is the one most often misread. The skill side is about the skill itself, such as a skill that does not exist or a name that fails validation. The system side is about version and licence limits, such as community edition counts, commercial features, or application, dataset and user counts above the licence. The two lead in completely different directions: the first is a configuration change, the second is a version or licence question.

## One code sits outside the rule

The invalid share link error uses code 501 while its module base is 505000. It does not follow the base-plus-offset rule, so guessing the module from the numeric range returns the wrong answer for this one.

It shows up often in practice, since it is what an expired or deleted share link returns. A three-digit code rather than a six-digit one is almost always this entry.

## What each of the three fields is for

A failed response usually carries three things at once: the numeric code, statusText, and a key used to fetch the message shown to the user. Each has its own use, and none of them should be the only one kept.

The numeric code suits alerting and statistics. It is an integer, so ranges aggregate cleanly - the whole five-hundred-thousand block can be trended as team and permission problems. It does not suit being a unique identifier, because of the overlaps and because upgrades shift it.

statusText suits unique identification and log search. It is unique across every module and largely survives version changes, so indexing a self-hosted log system on it holds up best.

The message key fetches the sentence the user actually sees. The same error shows different text per language while the key stays the same. Customising a message means changing the text behind that key rather than touching the error code. This layer is easy to skip: hard-coding a local-language message in the frontend against a numeric code leaves nothing for the other languages.

## Two enum names cannot be found by code

team.teamMemberOverSize, user.unAuthRole appear in the enum definitions without a code value, so a numeric lookup will not find them and only a name search will. Seeing either name in a log does not mean a number is missing somewhere.

Module names on this page also come from the path of the defining file rather than the comment at the top of it. Some comments disagree with the module the file actually belongs to, and compiling by comment would file codes under the wrong module in a way the table would never reveal. Where this page and a code comment disagree, the path is the one to trust.

## The order to work through a code

First, take statusText rather than the number. Numbers can be ambiguous, statusText is unique across every module, and the response carries both.

Second, read the module, because the module decides which part of the configuration to open. Errors in the knowledge base block usually involve embedding models, index jobs or file parsing. The team block usually involves members, permissions and member groups. Almost everything in the system block comes down to version or licence, where configuration changes will not help.

Third, search the code or documentation with the enum name. Enum names are more stable than numbers: an upgrade that inserts a new error shifts the numbers after it, while the enum name usually survives. That is also why the enum name is the thing worth remembering.

If those three steps still leave it unresolved, keep the raw API response intact when escalating - reporting only a number tends to cost several rounds of clarification.

## Version differences and expiry

The 122 codes on this page come from v4.16.2. Errors added inside a module during an upgrade shift the offsets that follow, so use enum names rather than numbers when comparing across versions. The two shared base codes exist in this version; if a later version reallocates bases, the overlap list here needs to be recompiled.

## Keep reading

- [Knowledge base chunk and index settings estimator](/en/guide/kb-chunk-and-index-settings)
- [Environment variable checklist generator](/en/reference/env-variable-checklist)

> Parameters and rules on this page are taken from the FastGPT open-source repository at v4.16.2, verified 2026-09-09.

## References

- [FastGPT open-source repository](https://github.com/labring/FastGPT)
- [FastGPT deployment and configuration](https://doc.fastgpt.io/docs/introduction/development)
