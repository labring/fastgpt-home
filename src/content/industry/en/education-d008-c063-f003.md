---
title: Sharing and Embedding for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c063-f003
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Sharing & Embeds | Access
meta_description: Research Misconduct: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Academic Misconduct Reports and Investigations: Manage Authorized Access and External Services

## What this category's data looks like

Materials for the investigation and handling of academic misconduct reports typically consist of three categories: report materials, investigation reports, and expert appraisal opinions. Report materials include the reporter, the reported party, factual descriptions, a list of evidence, and the submission date; investigation reports include the list of the investigation team, the verification process, conclusions, and signatures/seals; expert appraisal opinions include the appraiser, appraisal matters, basis, and signature. When these three categories of materials enter the sharing and embedding stage, their roles differ: report materials and investigation reports are the main subjects of the visible scope, while expert appraisal opinions often appear as attachments or quoted excerpts. The update rhythm of materials is affected by supplementary materials, review conclusions, and signature/seal receipts. The names, quantities, and dates of the same record in different materials must be consistent, and versions must be synchronized. External entry points and authorization scope determine which fields and files parents or superiors can see, while quoted display items only control the presentation of excerpts and full text, without changing file permissions.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. "External entry points and authorization scope" are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | The reporter, the reported party, factual descriptions, the list of evidence, and the submission date must be consistent with the investigation report | Check the names, quantities, dates, and signature receipts in both materials |
| Investigation report | The list of the investigation team, the verification process, conclusions, and signatures/seals must connect with the dates of the expert appraisal opinions | Check the version number and signatures/seals, and confirm there are no missing signatures or receipts |
| Expert appraisal opinions | The appraiser, appraisal matters, basis, and signature must correspond to the conclusions of the investigation report | Check signatures and dates item by item, and confirm the version has been synchronized |
| Sharing link | Expiration time, per-minute access limit, credit limit, and identity verification are set as needed | Check the time limit and values in the link configuration, and test once with an over-limit request |

## Three common errors

- Phenomenon: The names, quantities, and dates of the same record in the report materials and the investigation report do not match. Cause: The two materials were revised separately, without cross-checking and version synchronization.
- Phenomenon: Expert appraisal opinions are missing signatures or receipts but are still placed in the external entry point. Cause: Signatures/seals were not verified during material archiving, and the authorization scope did not match the visible scope.
- Phenomenon: Unauthenticated sessions can still see the full quoted text. Cause: The identity verification callback did not take effect, and quoted display items were mistakenly treated as the file visible scope.

## How to verify the setup

Acceptance for this feature: Access once each with an unauthenticated session and an over-limit request, and check the release and quoted display; in the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification callback, and record the display parameters and authentication results corresponding to `shareId`.

Business test: Access once with a restricted identity and see whether the visible scope matches the settings; if a quote limit is involved, check the tokens of the quoted text, record the number of array items separately, and do not compare it for equality with `quoteMaxToken`.

- Check the expiration time and per-minute access limit in the link configuration, and test once with an over-limit request
- Access once with an unauthenticated session, and check the identity verification callback and the display items for quoted excerpts, full quoted text, and source original text
