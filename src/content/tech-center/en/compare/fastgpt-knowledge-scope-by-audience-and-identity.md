---
title: Source Scope for FastGPT Support and Employee Answers
slug: /en/compare/fastgpt-knowledge-scope-by-audience-and-identity
page_type: matrix
source: https://doc.fastgpt.io/guide/dataset/collection_tags
source_type: 深度场景内容
meta_title: Source Scope for FastGPT Support and Employee Answers
meta_description: Compare source scope for support and employee answers in FastGPT, separating document filters from member permissions and checking the intended identities.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-knowledge-scope-by-audience-and-identity-en","task_id":"W19-matrix-05","article_id":"W19-matrix-05-en","language":"en","content_type":"matrix","meta_title":"Source Scope for FastGPT Support and Employee Answers","meta_description":"Compare source scope for support and employee answers in FastGPT, separating document filters from member permissions and checking the intended identities.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-knowledge-scope-by-audience-and-identity","source_language":"zh","source_sha256":"04c13748b697c296cc360f994d51bd7d8ff13ef471392d15a895bc37cb7947e6","keywords":"[\"product support\",\"employee policy assistance\",\"source access\"]"},"editorial_notes":[]}
keywords: product support, employee policy assistance, source access
schema_type: Article
date_modified: 2026-11-23
---

# Source Scope for FastGPT Support and Employee Answers

## Let the audience determine source eligibility

Product support may serve external customers, while employee assistance generally serves internal staff. Their applicability and visibility requirements differ. A searchable file is not automatically suitable for the current reader. List question categories, audiences and document owners before defining search scope and access. Record FastGPT search scope, tag settings and identity permissions separately so they can be checked against a real question.

## Compare sources and calling conditions

Support manuals need model information, feature conditions and a defined public scope. Employee policies need role, location and effective dates. Login or sharing paths may also differ, so assess retrieval in the actual entry point. Use the table to prepare an inventory. If a file mixes public explanations with internal procedures, identify the usable portions before making it available; its title is not a substitute for reviewing the content.

| Dimension | Product support | Employee policy assistance |
| --- | --- | --- |
| Source conditions | Model, version and operating requirements | Role, location and effective period |
| Audience access | Actual support or sharing entry point | Authenticated member and readable material |
| Review focus | Manual conditions and external visibility | Policy applicability and member access scope |

## Use tags to express search scope

Commercial [collection tags](https://doc.fastgpt.io/guide/dataset/collection_tags) filter files through configuration or variables, allowing departments, document types or effective ranges to become search conditions. Define who maintains tag values and how policy periods are represented. Using a department tag establishes a filter condition. Whether the caller may read the selected files depends on the relevant authentication and permission arrangements.

## Apply file permissions through the right identity path

[File-level permissions](https://doc.fastgpt.io/guide/dataset/collection_permission) are a commercial capability. With the feature enabled, a knowledge base search authenticated as the current member retrieves only files that member has permission to read. A preselected knowledge base without member authentication does not establish the same behavior. Confirm how identity reaches an internal employee application. Review external sharing under its actual sharing path, including both access and citation visibility.

## Test support and employee entry points with a warranty question

Try a warranty question about the same product through the external entry point and an internal role account. Review public terms in the external answer and authorized procedures in the employee answer. Record the files and passages returned by [knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search). Check retained conditions and permitted citation visibility. Investigate differences in source scope, caller identity or sharing configuration, rather than attempting to fix an access-path problem only by changing answer wording.
