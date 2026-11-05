---
title: Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c048-f016
page_type: 行业问题页
application_area: education
meta_title: Joint Education | Forms | Handover
meta_description: Joint Education: review forms for material handover. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Forms and User Interaction for Sino-Foreign Education Establishment and Annual Reports: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This category's data looks like this
For the establishment and annual reporting of Chinese-foreign cooperative education institutions, three types of materials are involved: the establishment application, the cooperation agreement, and the articles of association. The establishment application carries fields such as institution name, education level, program offerings, enrollment scale, and funding arrangements; the cooperation agreement stipulates the rights and responsibilities of both parties, the method of contribution, the term, and dispute resolution; the articles of association specify the governance structure, decision-making procedures, and responsible persons. The material sources are the negotiation texts of both cooperating parties, internal approval records, and annual operating data, and the update rhythm is centralized drafting during the establishment stage and rolling annual filing during the annual reporting stage. When the materials enter the form input node, their respective roles are sets of fields to be collected: the application corresponds to the institution's basic information and conditions for running the school, the cooperation agreement corresponds to the cooperating parties and contribution clauses, and the articles of association correspond to governance and responsibility clauses. The field characteristics are that names, quantities, dates, signatures, and version numbers must be consistent across materials, and any missing item or misalignment will block subsequent acceptance.

## Configuration and implementation checks

This step is executed by the form input node (interaction node) in the workflow, which outputs the field values filled in by the user (passed to subsequent nodes after submission). The "issuable material drafts and handover records" are completed by subsequent nodes or manually. After the form input node is triggered, the conversation enters the interaction state and records the workflow state. After the user completes the required items and submits, the form information is passed to subsequent nodes for use.

| Object | Check | Verification action |
| --- | --- | --- |
| Establishment application | Fields are complete, the responsible person is clear, and the version and date are consistent; the institution name, quantities, and dates match those in the cooperation agreement and articles of association | Check the field names one by one in the node configuration, and confirm that the required markers cover the key material fields; reference `formInputResult` in subsequent nodes and run a trial |
| Cooperation agreement | The cooperating party names, contribution method, term, signatures, and receipts are complete; the names, quantities, and dates in the same record are consistent across the application and the articles of association | Check the required settings and signature receipt fields one by one; reference `selectResult` in subsequent nodes to obtain the corresponding field values |
| Articles of association | The governance structure, decision-making procedures, and responsible person fields are complete; the version number and date are synchronized with the establishment application and cooperation agreement | Check whether the version and date fields are marked as required; after submission, check whether subsequent nodes can obtain the corresponding field values |
| Handover record | The responsible person, acceptance time, and missing-item interception result are clear; the version and date are consistent with the material draft | Draft one according to the template and complete one handover to see whether missing items are blocked; reference `formInputResult` in subsequent nodes to check the field values |

## Three common errors

- Symptom: The institution name, enrollment quantity, and signing date in the same record do not match between the establishment application and the articles of association. Cause: The two places were filled in manually and were not passed using the same field value.
- Symptom: The cooperation agreement has been revised, but the articles of association still reference the old version number and old date. Cause: The version was not synchronized, and the field values were not checked in subsequent nodes after submission.
- Symptom: Materials are missing signatures or receipts but are still submitted to the next stage. Cause: The signature and receipt fields were not marked as required, and missing items were not blocked.

## How to verify the setup

Acceptance of this feature: fill it out once and submit, and check the field values obtained by subsequent nodes; confirm that `formInputResult` and `selectResult` can reference the corresponding fields, that submission is not possible when required items are empty, and that the conversation does not get stuck in the interaction state.

Business test: draft one according to the template and complete one handover to see whether missing items are blocked.

- Check the field names and required markers one by one in the node configuration, and confirm that the key material fields are marked as required.
- Reference `formInputResult` or `selectResult` in subsequent nodes and run a trial to confirm that the corresponding field values can be obtained after submission.
