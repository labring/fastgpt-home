---
title: Sharing and Embedding for Peer Review Organization: Draft Materials and Hand Over Responsibilities
slug: /en/industry/education-d004-c067-f003
page_type: 行业问题页
application_area: education
meta_title: Peer Review | Sharing & Embeds | Handover
meta_description: Peer Review: review sharing & embeds for material handover. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Peer Review Organization: Draft Materials and Hand Over Responsibilities

## What this category's data looks like

This page is intended for peer review organizations. The material sources are review invitations, expert review comments, and author revision notes, and the update cadence is synchronized with manuscript circulation and version iteration. When entering the sharing and embedding stage, the review invitation takes on the role of invitation and receipt, the expert review comments take on the role of review conclusion and signature, the author revision notes take on the role of point-by-point response and version annotation, and the handover record links the three to form a signable draft. Field characteristics are concentrated in four categories: name, quantity, date, and signature: the number of the same manuscript in the invitation and comments must be consistent, the number of items in the revision notes must correspond to the number of comment items, and the signing date of each material must be consistent with the version date. When materials enter this function, the publishing channel is responsible for generating the sharing link, and the authentication and display parameters determine the scope of content that external visitors see according to their identity; the business finished product is still completed by visitors after viewing according to their identity and signing off.

## Configuration and implementation checks

This step is executed by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. The signable material draft and handover record are then completed by external visitors after seeing the corresponding content according to their identity. The sharing link can be configured with an expiration time, per-minute access limit, credit limit, identity verification, and display items for quoted snippets, quoted full text, and source original text.

| Object | Check | Verification action |
| --- | --- | --- |
| Review invitation | Name, quantity, date, and signature must be consistent with the handover record; if the signature or receipt is missing, block it | Check the invitation number and manuscript number, and inspect the receipt and signing date |
| Expert review comments | The number of comment items must correspond to the number of revision note items, and the date must be consistent with the version | Compare the comments and revision notes item by item, and verify the signature and version date |
| Author revision notes | Point-by-point responses are complete, and the version and date are synchronized with the comment record | Check for missing items and the version number, and confirm that the handover record has been signed off |
| Sharing link | Expiration time, per-minute access limit, identity verification, and quote display items are set as needed | Check the time limit and values in the link configuration, and access once with an unauthenticated session |

## Three common errors

- Symptom: The number, item count, or date of the same manuscript in the invitation and comments do not match. Cause: The two materials were drafted separately, and field comparison was not performed before handover.
- Symptom: The revision notes have been updated, but the comment record still remains at the old version. Cause: The version was not synchronized, and the handover record was not refreshed with the version.
- Symptom: The material can be opened but lacks a signature or receipt, so the next step cannot sign off. Cause: The signature field was not filled in, and the handover process was not completed.

## How to verify the setup

This function's acceptance: access once each with an unauthenticated session and an over-limit request, check the allow/deny result and quote display, and verify the link configuration corresponding to `shareId`.

Business test: draft one according to the template and complete one handover, and see whether missing items are blocked.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration.
- Check item by item the switch status of quoted snippets, quoted full text, and source original text download, and record the tokens and array item count of the quoted text.
