---
title: Sharing and Embedding for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c015-f003
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Sharing & Embeds | Handover
meta_description: Student Mental Health: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for School Mental Health Screening and Referrals: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. Materials come from three types: psychological screening plans, interview records, and referral forms, drafted, reviewed, issued, and handed over by school psychological teachers and homeroom teachers on a semester rhythm. A psychological screening plan contains screening subjects, tools, time, organizers, and confidentiality clauses; an interview record contains interview subject, time, location, interviewer, observation points, and preliminary conclusions; a referral form contains referral reason, referral subject, receiving party, responsible person, date, and receipt. The three types of materials play different roles when entering sharing and embedding: the screening plan serves as the source of a unified standard, the interview record serves as process documentation, and the referral form serves as cross-stage handover evidence. Field characteristics center on names, quantities, dates, signatures, and versions; any inconsistency will be exposed at the next stage's sign-off. The update rhythm rolls forward by screening batch, and after each batch is completed, versions are synchronized and archived.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication results. Draft materials and handover records that can be issued are seen by external visitors according to identity, who then complete the corresponding content. The link can be configured with expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | Screening subjects, tools, time, organizers, and confidentiality clauses fields are complete, and version and date are consistent | Check fields item by item against the template, compare whether the subject names, quantities, and dates in the plan and interview records are consistent, and check the signature field |
| Interview record | Interview subject, time, location, interviewer, observation points, and preliminary conclusions fields are complete, and consistent with the screening plan standard | Extract one record, check the name, quantity, and date of the same subject in the plan and the record, and confirm the signatures of the interviewer and reviewer |
| Referral form | Referral reason, referral subject, receiving party, responsible person, date, and receipt fields are complete, and responsibility handover is traceable | Check the subject names, quantities, and dates in the referral form and interview records, and check whether the receiving party's signature and receipt are complete |
| Sharing link | Expiration time, per-minute access limit, credit limit, identity verification, and quote display items are set according to usage needs | Check the time limit and values in the link configuration, access once with an unauthenticated session, try once with an over-limit request, and check the switches for quoted snippets, quoted full text, and source original text item by item |

## Three common errors

- Symptom: The names, quantities, and dates of the same record do not match between the screening plan and the interview record. Cause: The standard was not unified during drafting, versions were not synchronized, and field comparison was not done before handover.
- Symptom: The referral form lacks the receiving party's signature or receipt, and the next stage cannot sign off. Cause: The handover record was not updated in sync with the materials, and the responsible person did not confirm before issuance.
- Symptom: The link cannot be opened after some time or access is rate-limited. Cause: The expiration time and per-minute access limit were set according to usage needs but were not adjusted with the batch, and unauthenticated sessions and over-limit requests were not tested in advance.

## How to verify the setup

This feature acceptance: access once each with an unauthenticated session and an over-limit request, and check the pass-through and quote display. In the link configuration, check the expiration time, per-minute access limit, credit limit, and identity verification, check the switches for quoted snippets, quoted full text, and source original text item by item, and record the display parameters and authentication results corresponding to `shareId`.

Business test: draft one copy according to the template and complete one handover, and see whether missing items are blocked.

- Draft one psychological screening plan, one interview record, and one referral form according to the template, check names, quantities, dates, signatures, and versions item by item, and confirm that fields are complete and responsible persons are clear.
- Complete one handover, have the receiving party sign off and provide a receipt, check whether missing items are blocked before sign-off, and synchronize and update the version and date.
