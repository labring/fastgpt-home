---
title: FastGPT Document Evidence and Rule Review Matrix
slug: /en/compare/fastgpt-decision-matrix-11
page_type: matrix
source: https://doc.fastgpt.io/guide/build/workflow/nodes/content_extract
source_type: 深度场景内容
meta_title: FastGPT Document Evidence and Rule Review Matrix
meta_description: Divide document review in FastGPT into source evidence, reference retrieval, explicit rule checks and human conclusions, with examples of missing evidence.
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-11","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-11","article_id":"W19-matrix-11-en","slug":"fastgpt-decision-matrix-11-en","language":"en","meta_title":"FastGPT Document Evidence and Rule Review Matrix","meta_description":"Divide document review in FastGPT into source evidence, reference retrieval, explicit rule checks and human conclusions, with examples of missing evidence.","keywords":"[\"document review\",\"rule checks\",\"evidence retrieval\"]","source_language":"zh","source_sha256":"400e385c5b7900284b964326cb3431c5dd16c32af0f3da60d35c6a2b07fbcc9d"},"editorial_notes":[]}
keywords: document review, rule checks, evidence retrieval
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT Document Evidence and Rule Review Matrix

## Start with the material and required decisions

For a purchase request, the source may list a model, delivery date and supporting attachment. A reviewer needs to know whether fields are present, which procedure applies and who confirms exceptions. Separate source recording, reference retrieval, routing by explicit conditions and human confirmation, with each step tied to inspectable material.

## Check extracted values against the source

FastGPT [Text Content Extraction](https://doc.fastgpt.io/guide/build/workflow/nodes/content_extract) can ask a model to locate values using field descriptions. An output may be empty or refer to a different date in the document. Specify what the field means and keep the source location. For multiple attachments or versions, record each document’s identity so reviewers can return to the relevant text when fields differ.

| Work | Basis | Output |
| --- | --- | --- |
| Field extraction | Source text and field description | Candidate values and locations |
| Reference retrieval | Applicable rules | References and versions |
| Conditional routing | Confirmed field criteria | Execution path |
| Human confirmation | Original, rules and exception details | Decision and owner |

## Check reference versions and applicability

After using [Dataset search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) to find a procedure, rule or example, record the applicable audience, effective date and retrieved passage. If the search returns nothing, record that outcome and send it to the rule owner. When old and new rules are both present, have a reviewer confirm the applicable version and preserve the evidence.

## Route using explicit conditions

For a missing item that can be checked from a field, such as an empty attachment identifier, use the [Conditional node](https://doc.fastgpt.io/guide/build/workflow/nodes/tfswitch) to select the next path from a variable. The condition needs an explicit meaning and source. If the rule calls for an owner to review exceptions, pass along the original material and the reason for escalation. The owner records the decision.

## Test a case with similar-looking fields

Test a request containing both a completion date for the form and a planned delivery date. Check which field the extractor selected, which date the rule uses and whether routing changes. If both dates are present but their meaning is unclear, ask the submitter or reviewer. Record the decision and evidence location so historical requests can be checked after a rule update.

## Keep older evidence after a rule changes

After a rule changes, review one old application and one new one. For the old request, inspect the rule and decision in effect at that time. Check the new request against the new version. Keep effective dates and source locations for both so showing the current rule does not erase the basis for earlier decisions.
