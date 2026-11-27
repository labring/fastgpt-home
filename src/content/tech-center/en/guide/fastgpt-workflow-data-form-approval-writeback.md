---
title: Connect FastGPT to CRM and Approval Systems
slug: /en/guide/fastgpt-workflow-data-form-approval-writeback
page_type: aggregation
source: https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: Connect FastGPT to CRM and Approval Systems
meta_description: Choose FastGPT documentation for CRM queries, form collection, user confirmation and business submission, with clear checks on identity and responses.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-workflow-data-form-approval-writeback-en","task_id":"W19-hub-07","article_id":"W19-hub-07-en","language":"en","content_type":"hub","meta_title":"Connect FastGPT to CRM and Approval Systems","meta_description":"Choose FastGPT documentation for CRM queries, form collection, user confirmation and business submission, with clear checks on identity and responses.","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-workflow-data-form-approval-writeback","source_language":"zh","source_sha256":"e30dfd66f0c1609629011449790ff2f9f655881afa157fa3927803d14ed88001","keywords":"[\"CRM integration\",\"approval workflows\",\"FastGPT HTTP request\"]"},"editorial_notes":[]}
keywords: CRM integration, approval workflows, FastGPT HTTP request
schema_type: Article
date_modified: 2026-11-23
---

# Connect FastGPT to CRM and Approval Systems

## Distinguish information requests from business actions

Asking for a customer’s current service status differs from requesting a change. One needs a record lookup; the other also involves business permissions, submission fields and a receiving system. FastGPT workflows can connect retrieval, interaction and APIs. The application needs to distinguish the information it prepared, the request it made and the action actually accepted by the business system.

## Retrieve product and policy information

For product functionality, service terms or application policies, use [knowledge search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search). Match the question to applicable documents and retain references so staff can check conditions. These are documented facts. Whether a customer currently has a service needs a separate record query. A manual describing a capability does not establish that every customer has configured it.

## Query current records through an authorized API

For CRM records, use [HTTP requests](https://doc.fastgpt.io/guide/build/workflow/nodes/http) to inspect identifiers, authentication and response fields. Check which customer records the caller may view through the company login and API authorization path. Preserve the query time and original fields to distinguish current state from historical material. Confirm the business object before continuing when a result is empty or names are ambiguous.

## Collect fields and obtain confirmation separately

For missing application information, consult [form input](https://doc.fastgpt.io/guide/build/workflow/nodes/form_input). For a decision about the current content, consult [user choice](https://doc.fastgpt.io/guide/build/workflow/nodes/user-selection). Forms collect structured information; choices select branches. The confirmation view should match the data being submitted. If fields change, present them again so an earlier confirmation is not applied to a different request.

## Use the receiving system’s response to show the result

After submission, display what the business API actually returned, such as a receipt identifier, current state or error. The existing approval system continues to handle approval roles, stages and decisions. Confirming content in a conversation is one interaction within that broader process. Keep evidence for lookup, collection, confirmation, submission and acceptance separately to locate where a task stopped, and retain a staff-handling path for errors or unclear responses and give the handler the request identifier.
