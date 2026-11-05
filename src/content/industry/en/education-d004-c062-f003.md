---
title: Sharing and Embedding for Research Ethics Review: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c062-f003
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Sharing & Embeds | Handover
meta_description: Research Ethics: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Research Ethics Review: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

In the research ethics review scenario, material drafting and responsibility handover revolve around three types of materials: ethics review applications, informed consent form templates, and risk assessment forms. Application materials come from the research protocols and prior review records submitted by researchers; informed consent form templates come from the institution's standard text library and project team revisions; risk assessment forms come from the intervention measures and data management plans in the protocol. The update cadence changes with protocol revisions, responses to review comments, and annual follow-up reviews. Field characteristics center on names, quantities, dates, and signatures: the same subject count, the same study period start and end dates, and the same responsible person's name must be consistent across all materials; version numbers and effective dates must be synchronized; signature fields and receipt fields must be complete. When materials enter the sharing and embedding function, the ethics review application serves as the main record, while the informed consent form template and risk assessment form serve as attached materials; each determines its visibility scope according to file permissions. The share link is only responsible for display and authentication, and does not change the permission ownership of the materials themselves.

## Configuration and implementation checks

This step is executed by the share link in the publishing channel (the publishing service performs authentication), outputting the share link, display parameters, and authentication results. The material drafts and handover records that can be issued are then completed by external visitors who see the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | The name, quantity, date, and signature must be consistent with the informed consent form template and risk assessment form | Verify that the subject count in the application matches the quantity in the risk assessment form, verify that the study period start and end dates match the dates in the informed consent form template, and verify that the responsible person's signature and receipt fields are complete |
| Informed consent form template | The version number and effective date must be synchronized with the ethics review application, and the signature field must be complete | Verify that the template version number matches the version number in the application record, verify that the effective date does not conflict with the application date, and verify that the signature field and receipt field have no missing items |
| Risk assessment form | The risk level, quantity, and date must correspond to the ethics review application, and the responsible person must be clear | Verify that the risk level matches the risk description in the application, verify that the involved quantity matches the application quantity, and verify that the assessment date matches the application date |
| Share link | The expiration time, per-minute access limit, credit limit, identity verification, and citation display items are configured as needed | Verify the expiration time and access limit values in the link configuration, access once with an unauthenticated session, verify item by item the display toggles for citation snippets, full citation text, and source original text, and record the authentication result corresponding to `shareId` |

## Three common errors

- Symptom: The same subject count does not match between the ethics review application and the risk assessment form. Cause: The two materials were drafted separately, the quantity fields were not cross-checked, and no item-by-item comparison against the template was performed during handover.
- Symptom: The informed consent form template version was not synchronized, and the old version is still being referenced. Cause: The version number and effective date were not updated with the application revision, and the handover record did not note the version change.
- Symptom: Materials are missing signatures or receipts, and the next step cannot sign off for receipt. Cause: The signature field and receipt field were not included in the handover checklist, and the responsible person was not specified in the handover record.

## How to verify the setup

Acceptance for this feature: access once each with an unauthenticated session and an over-limit request, and verify the allowance and citation display; verify the expiration time, per-minute access limit, credit limit, identity verification callback, and the display items for citation snippets, full citation text, and source original text for the link corresponding to `shareId`; the citation count is recorded by array length, and `quoteMaxToken` is verified separately according to the citation content budget; the two are not compared for equality.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- In the link configuration, verify the expiration time, per-minute access limit, credit limit, and identity verification callback address, and access once with an unauthenticated session to confirm that authentication takes effect.
- Verify item by item the display toggles for citation snippets, full citation text, and source original text, record `shareId` and the authentication result, and confirm that the file visibility scope is determined by file permissions.
