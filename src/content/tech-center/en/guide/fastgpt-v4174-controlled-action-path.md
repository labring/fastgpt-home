---
title: Connect Existing Models and CRM Approvals in FastGPT
slug: /en/guide/fastgpt-v4174-controlled-action-path
page_type: deep
source: https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search
source_type: 深度场景内容
meta_title: Connect Existing Models and CRM Approvals in FastGPT
meta_description: Trace a FastGPT workflow from document retrieval and user confirmation to an API response. Check business authorization, receipt, approval, and retries.
delivery_metadata: {"source_front_matter":{"slug":"fastgpt-v4174-controlled-action-path-en","task_id":"W19-deep-04","article_id":"W19-deep-04-en","language":"en","content_type":"deep","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-v4174-controlled-action-path","meta_title":"Connect Existing Models and CRM Approvals in FastGPT","meta_description":"Trace a FastGPT workflow from document retrieval and user confirmation to an API response. Check business authorization, receipt, approval, and retries.","keywords":"[\"workflow orchestration\",\"business submission\",\"approval records\"]","source_language":"zh","source_sha256":"e66434502699ca487240d7be7e7ef0a631dfb7a48a0e69452b1d9ca34945cdb6","hreflang":"{\"language\":\"en\",\"paired_language\":\"zh-CN\"}","editorial_review":"{\"sources\":\"FastGPT v4.17.4 tagged official product documentation\",\"verified_on\":\"2026-11-23\",\"edition_and_version\":\"FastGPT v4.17.4\",\"revision_record\":\"Per-section source evidence\",\"review_due\":\"2027-02-21\"}"},"editorial_notes":[]}
keywords: workflow orchestration, business submission, approval records
schema_type: Article
date_modified: 2026-11-23
---

# Connect Existing Models and CRM Approvals in FastGPT

**Verify source evidence, user confirmation, system receipt, and approval separately. Each step should have a traceable record and an owner.**

## Define success in the receiving system

For a service change described in contract material, support may need to identify the required documents before submitting a request to a business system. Ask the receiving team to define its response states, the field that locates each request, and who handles formal approval. Reading material, preparing fields, making a submission, and approving it should each have an observable result. Draw the path from opening the conversation to finding a receipt, and label inputs, outputs, and responsible systems. A completed confirmation can show the information the user confirmed. A displayed acceptance should follow the actual response from the receiving interface. If the request needs staff attention along the way, that record shows where progress stopped and which system the staff member needs to check.

## Retrieve evidence that can be checked

Begin with [Dataset Search](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search) for applicable service instructions and internal processing requirements. Its reference output is an array. If this search returns an empty array, record the absence of references and ask a follow-up question or have the document owner check the available material. For each returned passage, retain the file name, version, section, and conditions. A change may require an account and an original order ID. Confirm the passage that establishes each field. If instructions conflict, check effective dates and who they apply to. Test one question known to match an official file and one for which no supporting material is available. Inspect retrieval and the next message for both cases. When the answer shows source material, confirm that the current user may access the original file.

## Use the connected model to prepare candidate fields

Group request fields into values the business system already has, values the user must provide, and values that need verification against documents. Get an account identifier from the login or receiving system, collect the new service location from the applicant, and check service scope against the applicable agreement. Use [Form Input](https://doc.fastgpt.io/guide/build/workflow/nodes/form_input) to collect missing information and give later steps the submitted values. Define valid dates, identifiers, and choices against the business interface contract. When the team already has an approved dialogue model, the maintainer adds it to the models available in the current environment. Select the model in [AI Chat](https://doc.fastgpt.io/guide/build/workflow/nodes/ai_chat) and set its parameters. Test field preparation on a description with a known answer, and record the model, its parameters, and the material it actually received. The model produces candidate values. CRM lookups and submissions use their respective business APIs. Ambiguous addresses, conflicting dates, and several possible request objects go to the user or operator for confirmation. Keep the extracted value, confirmed value, and prepared request value in distinct places. A later reviewer can then tell where an unexpected change was introduced.

## Bind confirmation to the displayed fields

Show the current request object, selected action, and key fields that will be transmitted. Use [User Selection](https://doc.fastgpt.io/guide/build/workflow/nodes/user-selection) for continuing, returning to edit, or cancelling. After an edit, show the new values and retain the exact information covered by the final confirmation. The company’s business or approval system handles formal applicants, approvers, stages, and decisions. If the workflow needs to display approval progress, provide an authorized read path and verify the actual state. During acceptance, confirm a request, return to change a field, and check whether the final request corresponds to the new confirmation. Then test cancellation and inspect the business system for an unexpected new request. Keep the displayed values, choice, and resulting record together for comparison.

## Let the business system enforce access and acceptance

Before sending confirmed values with [HTTP Request](https://doc.fastgpt.io/guide/build/workflow/nodes/http), check the endpoint, method, query parameters, headers, and body fields against the receiving API contract. An application login and the identity accepted by the business system can differ. Verify permissions in the actual integration. Keep the correlation ID and business fields from the response. Use the service contract to distinguish receipt, acceptance, missing information, and rejection. If a transport response indicates success but a receipt is missing, look up the corresponding record in the business system. Record the field version, caller identity, service response, and displayed state. That evidence lets staff find whether an issue occurred during transmission, acceptance, or later approval.

## Test timeouts and repeated clicks

A receiving system may accept a request while the application is still waiting. Test a request that does not return in the expected time and inspect whether the interface gives the operator a practical way to check it. Before making another submission, follow the receiving system’s procedure to look up the original by correlation ID or business identifier. Where an API defines duplicate-submission behavior, send the fields its contract requires and retain both responses. Also test two clicks on the same confirmation and check how many requests appear in the business system. Record who owns recovery and where to find its evidence so an operator can take over when acceptance is still uncertain.

## Keep the evidence needed for staff follow-up

The handover record can include the test account, entry point, applicable document, version of confirmed fields, API correlation ID, and observed status. Keep business material under its existing access and retention arrangements, with a traceable location in the test record. After a customer detail is updated, record which source and action led to the change. Someone checking progress may need only the status and an accessible lookup entry point. An operator may need an authorized path to the original response. Link request identifiers to their business objects so staff can distinguish several applications involving the same customer, contract, or order.

## Retest each changed layer with the same task

Before release, test available documents with missing fields, user cancellation, API acceptance, API failure, and pending approval. Record the output at each layer and what should happen next. After a document update, check the cited file and applicability. After a form change, review confirmed fields and the resulting write. After an interface upgrade, verify authorization, responses, and retry rules. If the approval interface changes, check the decision kept in the business system and what users actually see. Give this task set and its observed results to the application, document, and receiving-system owners. When a problem occurs, identify the source and direct it to the team responsible for that layer.

## Leave a reproducible acceptance case for the next owner

Select a request that can be checked at each step. Keep the source location, confirmation at the time, correlation ID, and state in the business system. Record the expected result, actual observation, and owner together, with evidence beyond a screenshot of the conversation. If an interface or document change makes an older case impossible to repeat, document why and agree on a replacement with the implementation and receiving teams. Where users have different access scopes, test what two accounts can see for the same request. The next owner can use the case to find where fields are checked, where to locate acceptance evidence, and who handles an error message.

## Give service staff the receipt and visible state

A service interface can preserve both a message for the applicant and a lookup route for staff. If the request was received and supporting material must arrive later, tell the applicant where to add it and show the service worker the receipt identifier returned by the business system. If the actual result only reports that a request has joined a queue, display the queue state. Map each display condition to the receiving system’s field definitions. Use a scenario with no receipt to inspect the resulting message and where the operator can look for evidence. Keep these mappings with acceptance records so staff can explain the observed outcome when taking over the request.
