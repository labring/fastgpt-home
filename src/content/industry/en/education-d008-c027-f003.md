---
title: Sharing and Embedding for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services
slug: /en/industry/education-d008-c027-f003
page_type: 行业问题页
application_area: education
meta_title: Graduate Destinations | Sharing & Embeds | Access
meta_description: Graduate Destinations: review sharing & embeds for authorized access. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Sharing and Embedding for Graduate Employment Contracts and Destination Statistics: Manage Authorized Access and External Services

## What this category's data looks like

This page addresses university employment signing and graduation destination statistics materials, including employment agreements, graduation destination registration forms, and employer certificates. These materials are usually filled in, stamped, or signed separately by departments, career guidance centers, and employers at different points in time; their sources are dispersed, and their update pace advances with graduation batches and signing progress. Employment agreements focus on the names of both signing parties, the position, the date, and the signatures and seals; graduation destination registration forms focus on the destination category, employer name, reporting date, and receipt; employer certificates focus on the fact of hiring, the position, and the certificate date. When the materials enter the sharing and embedding feature, each is referenced as display content, but the visible scope is determined by file permissions, not by the referenced display item.

## Configuration and implementation checks

This part is carried out by the sharing link in the publishing channel (the publishing service performs authentication), outputting the sharing link, display parameters, and authentication result. "Externally available entry points and authorization scope" are then completed by external visitors seeing the corresponding content according to their identity.

| Object | Check | Verification action |
| --- | --- | --- |
| Employment agreement | The names of both signing parties, position, date, and signatures and seals must be consistent with the graduation destination registration form | Compare the employer name, position name, signing date, and seals in the two materials item by item, and record any inconsistencies |
| Graduation destination registration form | The destination category, employer name, reporting date, and receipt must be consistent with the employment agreement and employer certificate | Check the names, quantities, and dates in the registration form against the agreement and certificate, and check whether the receipt is complete |
| Employer certificate | The fact of hiring, position, and certificate date must correspond to the employment agreement and registration form | Check the position, date, and seal in the certificate, and check whether the signature or receipt is missing |
| Sharing link | The expiration time, per-minute access limit, credit limit, and identity verification are set according to usage needs | Check the time limit and values in the link configuration, access once each with an unauthenticated session and an over-limit request, and verify the release and referenced display of the link corresponding to `shareId` |

## Three common errors

- Symptom: The employer name, position, or date for the same record does not match between the employment agreement and the graduation destination registration form. Cause: The two materials were filled in successively by different handlers without cross-checking.
- Symptom: The employer certificate lacks a signature or receipt, making the destination registration form impossible to confirm. Cause: The signed and sealed copy was not collected during the certificate circulation process, and the versions were not synchronized.
- Symptom: An unauthenticated session can still see the full referenced text. Cause: The identity verification callback is not in effect, or the referenced display item switch is confused with file permissions.

## How to verify the setup

Feature acceptance: access once each with an unauthenticated session and an over-limit request, verify the release and referenced display, and confirm that the expiration time, per-minute access limit, and identity verification callback of the link corresponding to `shareId` take effect as configured.

Business test: access once with a restricted identity and see whether the visible scope matches the setting.

- Check the expiration time, per-minute access limit, credit limit, and identity verification callback address in the link configuration.
- Check the switch status of the referenced snippet, full referenced text, and source original download item by item, and access once with an unauthenticated session.
