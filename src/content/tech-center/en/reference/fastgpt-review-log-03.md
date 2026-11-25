---
title: Workflow Request, Response and Business Receipt Log
slug: /en/reference/fastgpt-review-log-03
page_type: baseline
source: https://doc.fastgpt.io/guide/build/workflow/nodes/form_input
source_type: 深度场景内容
meta_title: Workflow Request, Response and Business Receipt Log
meta_description: Trace a FastGPT workflow request from form data and caller identity to the API response and the business system’s receipt, with fields for exceptions.
delivery_metadata: {"source_front_matter":{"task_id":"W19-baseline-03","content_type":"baseline","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-review-log-03","article_id":"W19-baseline-03-en","slug":"fastgpt-review-log-03-en","language":"en","meta_title":"Workflow Request, Response and Business Receipt Log","meta_description":"Trace a FastGPT workflow request from form data and caller identity to the API response and the business system’s receipt, with fields for exceptions.","keywords":"[\"workflow orchestration\",\"business receipt\",\"API response\"]","source_language":"zh","source_sha256":"5bb923d06712067264067d45538c424f9365741f30163c4dca4375e5aeae444b"},"editorial_notes":[]}
keywords: workflow orchestration, business receipt, API response
schema_type: Article
date_modified: 2026-11-23
---

# Workflow Request, Response and Business Receipt Log

## Define the start of a business action

Choose a task with an identified receiving API, such as submitting an equipment loan request. Compare the business system’s fields and identify what the applicant confirms and what the current identity or system records supply. Use [Form Input](https://doc.fastgpt.io/guide/build/workflow/nodes/form_input) to collect information the applicant must confirm, then compare the collected values with what was shown before submission. If the request item can be corrected, record where the revised fields came from before sending the request.

## Record structured fields and follow-up steps

Map fields directly when their types and meanings are already defined. If [Text Content Extraction](https://doc.fastgpt.io/guide/build/workflow/nodes/content_extract) pulls a requested item or date from prose, mark that value for confirmation against the original or ask for it through the form. Keep separate records for identifiers, dates and confirmation. The test log can point authorized staff to the controlled record without copying credentials, full personal information or production records into it.

## Match the API response to the business receipt

After sending the request with the [HTTP Request node](https://doc.fastgpt.io/guide/build/workflow/nodes/http), record caller identity, correlation ID, response status and business fields. Use the API contract to determine whether the response indicates receipt, acceptance or a need for more information. If approval is still pending, record it separately so staff can check it in the business system. Keep the call identifier even when the request times out.

| Request or correlation ID | Caller and entry point | Input and confirmation | API status and business fields | Acceptance or approval status | Evidence and owner |
| --- | --- | --- | --- | --- | --- |
|   |   |   |   |   |   |
|   |   |   |   |   |   |

## Fill the log with different outcomes

Use one row for each request. Test a successful request, missing information and an outcome that is temporarily unavailable. Before submitting again, check whether the original request was accepted in the business system and follow that API’s retry rules. Link the retry to the original request so an editor or business owner can trace the evidence and see which message the user received.

## Separate applicant-facing status from internal trace details

Show applicants the requested item, current status and next available action. If a receipt ID can be shared, include where to check it. Internal records should retain the corresponding request ID, call time and response location so staff can trace duplicate records. If a test form was completed but never submitted, record whether it stopped at confirmation, field validation or request transmission. That makes it possible to check whether the message matched the actual business progress.
