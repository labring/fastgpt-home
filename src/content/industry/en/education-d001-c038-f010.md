---
title: Citations and Source Traceability for Continuing Education Training Hour Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c038-f010
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Citations | Evidence
meta_description: Continuing Education: review citations for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Continuing Education Training Hour Recognition: Find Supporting Evidence

## What this category's data looks like

In the continuing education credit hour recognition scenario, the course filing form, the study certificate, and the credit hour recognition form are the three core types of materials. The course filing form records the course name, number of class hours, course start date, and the signature of the person in charge; the study certificate is issued by the teaching provider and contains the learner's name, course name, completion date, and seal; the credit hour recognition form is used for summary conversion and contains recognized credit hours, recognition date, and the handler's signature. When these three types of materials enter the knowledge base retrieval node, each participates in vector search as an independent source, and the citation output returns the original text snippet and source identifier according to the matched material. In terms of update cadence, the filing form is updated in sync with course offerings, the study certificate is added after the course ends, and the recognition form is generated within the summary cycle. In terms of field characteristics, the name, number of class hours, and dates of the same course in the filing form and the study certificate often differ due to different entry conventions, and unsynchronized versions and missing signatures or receipts are common problems.

## Configuration and implementation checks

This step is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length can be 0. Even if no content is found, the output chain still runs through. "Evidence entries that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The fields include course name, number of class hours, course start date, and the signature of the person in charge; the name, number of class hours, and dates of the same course in this form and the study certificate must match item by item | Open the citation marker to compare against the original text of the filing form, check whether the course name, number of class hours, and dates are consistent, and check whether the signature field has the signature of the person in charge |
| Study certificate | The fields include the learner's name, course name, completion date, and seal; when comparing with the filing form, check whether the name, dates, and seal are complete | Open the citation marker in the conversation, compare against the original text of the study certificate, check whether the seal or receipt is missing, and check whether the completion date connects with the course start date on the filing form |
| Credit hour recognition form | The fields include recognized credit hours, recognition date, and handler's signature; when comparing with the study certificate, check whether the recognized credit hours correspond to the completed course, and check whether the version is the current one | Open the search parameter panel and check item by item, record the citation array length and the `quoteMaxToken` budget, and check whether the citation snippets in `responseData` (non-streaming module results returned with detailed output enabled) are consistent with the original text of the recognition form |
| Citation content output | The number of returned entries is consistent with the matched materials, and being empty is also normal; each citation can be traced back to the original text paragraph | Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; then check whether the citation source identifiers in `quoteList` point to the corresponding document |

## Three common errors

- Phenomenon: the name and number of class hours of the same course do not match between the filing form and the study certificate. Cause: the two materials use different entry conventions, and the fields were not compared item by item before recognition.
- Phenomenon: the recognition form cites old-version course information, which is inconsistent with the current filing form. Cause: the versions were not synchronized, and old-version materials still remain in the knowledge base and participate in retrieval.
- Phenomenon: the study certificate lacks a seal or receipt, but the recognition form has already generated recognized credit hours. Cause: the signature and receipt were not checked at the material collection stage, and it directly entered summarization.

## How to verify the setup

This feature's acceptance: ask a question with original-text evidence, and check whether the citation array and markers can be traced back to the original text; then ask a question with no matching materials, and confirm that the array is empty while the chain runs through. Record the number of citations and the `quoteMaxToken` budget, and do not compare the two for equality.

Business test: ask a cross-material evidence question and see whether the answer provides a traceable source.

- In the node, check whether the selected knowledge base collections and their vector models are consistent, and open the search parameter panel to check the values item by item.
- Run a test with a question that has no matching materials, and see whether the output is empty while the chain continues; in the conversation, open the citation marker and compare against the source document to check `quoteList` within `responseData`.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
