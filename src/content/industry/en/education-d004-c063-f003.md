---
title: Sharing and Embedding for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c063-f003
page_type: 行业问题页
application_area: education
meta_title: Research Misconduct | Sharing & Embeds | Handover
meta_description: Research Misconduct: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Academic Misconduct Reports and Investigations: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of investigating and handling academic misconduct reports. The category materials include three types: report materials, investigation reports, and expert appraisal opinions. Report materials come from real-name or anonymous channels and contain the reported person's information, factual description, and evidence list; investigation reports are drafted by the investigation team and contain the investigation process, findings, and handling recommendations; expert appraisal opinions are issued by peer experts and contain the appraisal matters, basis, and conclusions. When the materials enter the sharing and embedding function, report materials serve as the attachment source for the draft pending issuance, investigation reports serve as the issuable subject, and expert appraisal opinions serve as independent attachments; the three enter the link display scope each with their own independent field sets. The update cadence advances with the investigation stages; each time evidence is supplemented or conclusions are revised, a new version is produced. Field characteristics center on five categories: name, quantity, date, signature, and receipt. The same record must be consistent across the three materials; the version number and issuance date must be synchronized; a missing signature or receipt is deemed an incomplete handover.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. Issuable material drafts and handover records are seen by external visitors according to their identity, who then complete the corresponding content.

| Object | Check | Verification action |
| --- | --- | --- |
| Report materials | Name, quantity, and date align item by item with the investigation report and expert appraisal opinions; signatures and receipts are complete | Check the name, quantity, and date of the same record across the three materials; inspect the signature field and receipt field |
| Investigation report | Version number and issuance date are consistent; the conclusion section does not contradict the expert appraisal opinions | Compare the version number and date; check the correspondence between the conclusions and the appraisal opinions |
| Expert appraisal opinions | The appraisal matters, basis, and conclusion fields are complete; signature and date are not missing | Check the fields item by item; inspect the signature and date; confirm the receipt has been collected |
| Sharing link | Expiration time, per-minute access limit, identity verification, and citation display items are configured as needed | Check the time limit and values in the link configuration; access once with an unauthenticated session; inspect the toggles for citation snippet, full citation text, and source original text download |

## Three common errors

- Symptom: The name and quantity of the same evidence do not match between the report materials and the investigation report. Cause: During drafting, the unified field table was not used for verification, and item-by-item comparison was missing before handover.
- Symptom: The investigation report version was not synchronized, and the issuance date is inconsistent with the date of the expert appraisal opinions. Cause: After revision, the version number was not updated, and the handover record was not updated with the version.
- Symptom: The materials lack a signature or receipt, and the next step refuses acceptance. Cause: During handover, the signature field and receipt field were not checked, and the responsible person and date were not filled in completely.

## How to verify the setup

Acceptance of this function: access once with an unauthenticated session and once with an over-limit request; check the allowance and citation display; confirm that the authentication result and display parameters of the link corresponding to `shareId` are consistent.

Business test: draft one according to the template and complete one handover; see whether missing items are blocked.

- Check the expiration time, per-minute access limit, and identity verification callback in the link configuration; access once with an unauthenticated session; inspect the status of the toggles for citation snippet, full citation text, and source original text download.
- Compare item by item the name, quantity, date, signature, and receipt of the report materials, investigation report, and expert appraisal opinions; after confirming the version number and issuance date are consistent, hand over to the next step for signing and acceptance.
