---
title: Context and Token Budgets for National Key Research and Development Applications: Find Supporting Evidence
slug: /en/industry/education-d001-c057-f002
page_type: 行业问题页
application_area: education
meta_title: National R&D Grants | Context & Tokens | Evidence
meta_description: National R&D Grants: review context & tokens for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Context and Token Budgets for National Key Research and Development Applications: Find Supporting Evidence

## What this category's data looks like

In the National Key R&D Program project application scenario, the materials that enter this feature include three types: the project application form, the budget application form, and the cooperation agreement. The project application form carries the research objectives, task breakdown, assessment indicators, and participating units, with fields including project name, principal investigator, start and end dates, signature, and seal; the budget application form carries funding subjects, sources, and allocation, with fields including subject name, amount, calculation basis, and preparer's signature; the cooperation agreement carries the partners' rights and responsibilities, division of work, and funding disbursement, with fields including partner name, task division, amount, signing date, and seals of both parties. The three types of materials are updated by application and finance personnel according to the application batch, and versions are synchronized with the revision receipt. After entering this feature, the project application form and the budget application form are used to check whether the name, quantity, and date of the same record are consistent, and the cooperation agreement is used to check whether the division of work and funding disbursement correspond to the budget subjects, each serving as a basis source that can be traced back to the original text.

## Configuration and implementation checks

This link is executed by the application settings (response limit, etc.), which output the length of a single answer and the range of context that can be accommodated. "Basis entries that can be traced back to the original text" are then completed by the model. The response limit is controlled by a slider for the length of a single answer; if set too low, the answer will be truncated, and if set too high, consumption will increase.

| Object | Check | Verification action |
| --- | --- | --- |
| Project application form | The project name, principal investigator, start and end dates, signature, and seal are complete, and are consistent with the corresponding records in the budget application form and cooperation agreement | In the application settings, check the response limit switch and slider position, and confirm that a single answer can cover the length required for cross-material comparison; check whether the project name and start and end dates are consistent in the two materials |
| Budget application form | The subject name, amount, calculation basis, and preparer's signature are complete, and match the task breakdown in the project application form and the disbursement clauses in the cooperation agreement | Check whether the name, amount, and date of the same subject are consistent in the budget application form and the cooperation agreement; check whether the preparer's signature and the receipt are in place |
| Cooperation agreement | The partner name, task division, amount, signing date, and seals of both parties are complete, and correspond to the subjects in the budget application form | Check whether the partner name and task division are consistent in the project application form and the cooperation agreement; check whether the signing date and seals are synchronized |
| Response limit | Matches the answer length required by the page | In the application settings, check the switch and slider position, and confirm that the values of `maxResponse`, `maxContext`, and `quoteMaxToken` can accommodate cross-material comparison; ask a question that requires a long answer and see whether the ending is complete |

## Three common errors

- Symptom: the same project name is written differently in the project application form and the budget application form. Cause: the two materials are filled in by different personnel, and the name and date fields were not unified according to the application batch.
- Symptom: the funding disbursement amount in the cooperation agreement does not match the subjects in the budget application form. Cause: the version was not synchronized, and after the cooperation agreement was revised, it was not written back to the budget application form and no receipt was retained.
- Symptom: the project application form lacks the principal investigator's signature or the cooperation agreement lacks the seals of both parties. Cause: signatures and receipts were not checked during material circulation, and after entering this feature, the basis entries cannot be traced back to the complete original text.

## How to verify the setup

Feature acceptance: ask a question that requires a long answer and see whether the ending is complete; if it breaks off in the middle of a sentence, check the response limit slider position, and confirm that the values of `maxResponse`, `maxContext`, and `quoteMaxToken` can accommodate cross-material comparison.

Business test: ask a cross-material basis question, see whether the answer gives a traceable source, and check that the source comes from the institution’s materials, that the version is current, and that the entries match the original text.

- In the application settings, check the response limit switch and slider position, ask a question that requires a long answer and see whether the ending is complete, and compare the usage changes between two runs.
- Check whether the name, quantity, and date of the same record are consistent in the project application form, budget application form, and cooperation agreement, and confirm that signatures and receipts are complete and that the version is current.
