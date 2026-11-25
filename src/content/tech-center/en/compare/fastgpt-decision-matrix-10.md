---
title: FastGPT Lookup, Confirmation and Submission Matrix
slug: /en/compare/fastgpt-decision-matrix-10
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/nodes/http
source_type: 深度场景内容
meta_title: FastGPT Lookup, Confirmation and Submission Matrix
meta_description: Compare lookups, confirmation, submission and approval in a FastGPT workflow by ownership, input fields, API responses and evidence shown to users.
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-10","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-10","article_id":"W19-matrix-10-en","slug":"fastgpt-decision-matrix-10-en","language":"en","meta_title":"FastGPT Lookup, Confirmation and Submission Matrix","meta_description":"Compare lookups, confirmation, submission and approval in a FastGPT workflow by ownership, input fields, API responses and evidence shown to users.","keywords":"[\"workflow orchestration\",\"business submission\",\"approval ownership\"]","source_language":"zh","source_sha256":"6534fa396cbbcebb67ab8214f0711dfaebcda126e2d018adfb4f42506cbad13e"},"editorial_notes":[]}
keywords: workflow orchestration, business submission, approval ownership
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT Lookup, Confirmation and Submission Matrix

## List lookups and writes as distinct operations

For an order change, a support worker might first look up whether an order can be changed, then confirm the details with the customer and submit the request. Lookup needs read access. Submission needs write access and the fields being changed. Confirmation shows the user what will be sent. Put these actions and their outcomes in the matrix so each can have an owner.

## Keep the object and read access with a lookup

When using [HTTP Request](https://doc.fastgpt.io/guide/build/workflow/nodes/http) in FastGPT to look up an order, check the API’s access rules and response fields and verify the order identifier. Record eligible changes, the current version and query time with the result. For ambiguous or missing identifiers, ask for a verifiable identifier before running the lookup.

| Action | Owner | Evidence |
| --- | --- | --- |
| Lookup | Authorized business API | Object fields and query time |
| Confirmation | Current user | Version of the displayed and confirmed content |
| Submission | Receiving API | Receipt status or returned error |
| Approval | Formal approval system | Approval record and owner |

## Use separate steps for missing details and confirmation

Collect a missing address or contact through [Form Input](https://doc.fastgpt.io/guide/build/workflow/nodes/form_input), then display the complete change to the customer. [User Selection](https://doc.fastgpt.io/guide/build/workflow/nodes/user-selection) can continue or route back for correction. A confirmation applies to the displayed fields. When a date, address or item changes, display the changes again and retain the version the user finally confirmed.

## Keep separate evidence for submission and approval

After sending confirmed information, look at the result fields in the API contract. Receipt, pending review and approval are different states. The application communicates the reported state, while the approval system retains the approver and decision. A returned request ID lets staff trace the application. After a timeout, check whether the system accepted the original request.

## Test one return-for-correction path

Have the applicant confirm and then return to change a field. Check whether the old information can still be submitted. Next, test an unavailable API or business rejection and compare what the user sees with the system record. Document what to show before submission, after receipt and while approval is pending, so support knows which system to consult.

## Check repeated confirmations and submissions

A network interruption may lead someone to click twice for one request. Check whether the second confirmation created a new submission identifier, then use the business system to see whether more than one request was created. If a resend is needed, have the owner follow the API contract and link its result to the original record.
