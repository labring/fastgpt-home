---
title: Context and Token Budgets for Research Ethics Review: Find Supporting Evidence
slug: /en/industry/education-d001-c062-f002
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Context & Tokens | Evidence
meta_description: Research Ethics: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for Research Ethics Review: Find Supporting Evidence

## What this category's data looks like

In research ethics review scenarios, materials usually include ethics review applications, informed consent form templates, risk assessment forms, and accompanying signature pages and receipts. These materials enter the system by project or batch, and their update cadence follows review rounds and version revisions; fields commonly include project name, number of subjects, review date, version number, and signature and receipt status. The ethics review application plays the role of the basis source, providing the review conclusion and approval date; the informed consent form template plays the role of version comparison, used to check whether the consent form version and the application record are in sync; the risk assessment form plays the role of field validation, used to check whether the risk level, number of people, and date are consistent with the application. After the materials enter this feature, the application settings control the single-answer length and the range of context that can be accommodated, and the model answers within the scope of the materials accordingly, forming basis entries that can be traced back to the original text.

## Configuration and implementation checks

This part is executed by the application settings (response limit, etc.), which output the single-answer length and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model, and the entry point and authorization are handled by the publishing service and file permissions.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures can be matched to the original text | Check whether the project name, review date, signature, and receipt are complete, and record the answer length corresponding to `maxResponse` |
| Informed consent form template | Version is in sync with the application record | Check whether the version number and date are consistent, confirm that `quoteMaxToken` is the quoted content budget, and record the array count separately |
| Risk assessment form | Risk level, number of people, and date can be matched to the original text | Check whether the risk level, number of subjects, and date are consistent with the application, and confirm the context range corresponding to `maxContext` |
| Response limit | Matches the answer length required by the page | In the application settings, check the toggle and slider position, and ask a question that requires a long answer to see whether the ending is complete |

## Three common errors

- Symptom: the name, quantity, and date of the same record do not match between the ethics review application and the informed consent form template. Cause: the two materials are entered separately, and cross-material field comparison is missing.
- Symptom: the informed consent form template version is not in sync, and the answer cites clauses from an old version. Cause: the version number and date were not updated with the review rounds.
- Symptom: the risk assessment form lacks a signature or receipt, and the basis entries cannot be traced back to the original text. Cause: the signature and receipt fields were not included in the material completeness check.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer and see whether the ending is complete; if the answer cuts off mid-sentence, the response limit is too low, and if the length clearly exceeds what is needed, it is too high.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the tokens of the quoted text and the array count are recorded separately.

- In the application settings, check the response limit toggle and slider position, ask a question that requires a long answer to see whether the ending is complete, and compare usage across two runs.
- Check the ethics review application, informed consent form template, and risk assessment form item by item for name, quantity, date, version, signature, and receipt, and confirm that the entries can be traced back to the original text.
