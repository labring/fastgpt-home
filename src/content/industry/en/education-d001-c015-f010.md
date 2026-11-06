---
title: Citations and Source Traceability for School Mental Health Screening and Referrals: Find Supporting Evidence
slug: /en/industry/education-d001-c015-f010
page_type: 行业问题页
application_area: education
meta_title: Student Mental Health | Citations | Evidence
meta_description: Student Mental Health: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for School Mental Health Screening and Referrals: Find Supporting Evidence

## What this category's data looks like

This page addresses the scenario of mental health screening and referral in primary and secondary schools. The materials include three types: psychological screening plans, interview records, and referral forms. The screening plan states the screening tools, schedule, responsible persons, and notification process; the interview record states the student's performance, interview date, and interviewer's signature; the referral form states the referral target, referral destination, parent receipt, and receiving party's signature. The three types of materials are updated by semester or academic year: the screening plan is adjusted according to the requirements of the education administrative department, interview records are continuously supplemented as cases progress, and referral forms are filled in synchronously as the referral process proceeds. After entering the knowledge base retrieval node, each of the three types of materials serves as a retrievable source: the plan is used to answer process basis, interview records are used to answer case facts, and referral forms are used to answer referral destination and receipt status. The citation output only presents the matched original text snippets and source identifiers, and does not undertake field comparison or ledger generation.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of cited content, each item containing an original text snippet and a source identifier, and the length may be 0. "Basis items that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Psychological screening plan | The plan fields include screening tools, screening date, and responsible person's signature, consistent with the current version | Open the citation marker to compare against the original plan text, check whether the screening tool name, date, and signature field are complete, and record the number of array items |
| Interview record | The interview fields include interview date, interviewer's signature, and description of student performance, matching the roster and dates in the screening plan | Open the citation marker in the conversation, trace each item back to the original interview record text, and check whether the names, quantities, and dates are consistent with the plan |
| Referral form | The referral form fields include referral destination, parent receipt, and receiving party's signature, matching the referral recommendation in the interview record | Open the citation marker to compare against the original referral form text, check whether the receipt and signature exist, and separately record the citation array length |
| Search parameters | The search parameter values are consistent with those set in the knowledge base retrieval section, and the tokens of the cited text are controlled by `quoteMaxToken` | Open the search parameters panel to check each item, and check whether the citation snippets in `quoteList` of `responseData` (non-streaming module results returned with detailed output enabled) can be traced back to the original text |

## Three common errors

- Phenomenon: The name or number of people for the same student does not match between the screening plan and the interview record. Cause: The two materials were entered separately, without field comparison and version synchronization.
- Phenomenon: A referral form lacks the parent receipt or receiving party's signature but is still treated as valid basis. Cause: The material entered the knowledge base before being completely filled in, and the signature field was not checked after retrieval matched.
- Phenomenon: The screening plan has been updated, but the interview record still cites the old tool name. Cause: The versions were not synchronized, the old material was not removed, and retrieval matched the old snippet.

## How to verify the setup

This feature's acceptance: ask a question with original text basis, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching material, and confirm that the array is empty while the pipeline still runs through.

Business test: ask a basis question across materials, and see whether the answer provides a traceable source.

- Open the citation marker, compare item by item against the source document, check whether the original text snippets correspond to the source identifiers, and separately record the number of array items.
- Open the search parameters panel, check that the selected knowledge base uses the same vector model, check that `quoteMaxToken` is the citation content budget, and check that the citation snippets in `quoteList` of `responseData` can be traced back to the original text.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
