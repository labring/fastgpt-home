---
title: Citations and Source Traceability for Research Ethics Review: Maintain Document Versions and Changes
slug: /en/industry/education-d005-c062-f010
page_type: 行业问题页
application_area: education
meta_title: Research Ethics | Citations | Versions
meta_description: Research Ethics: review citations for version tracking. Compare the source records, required inputs and downstream results before handing the task over.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Citations and Source Traceability for Research Ethics Review: Maintain Document Versions and Changes

## What this category's data looks like

In the research ethics review scenario, ethics review applications, informed consent form templates, and risk assessment forms are the three core types of materials. An ethics review application records the research protocol, researcher information, and review conclusion; an informed consent form template carries the subject notification and signature fields; a risk assessment form lists risk levels, handling measures, and dates. These materials often circulate in multiple parallel versions, with sources including institutional template libraries, project team revisions, and regulatory receipts. The update cadence is driven by regulatory amendments, protocol changes, and annual continuing review, and the field characteristics are concentrated in names, quantities, dates, and signatures. When the materials enter the knowledge base retrieval node, each serves as an independent citation source, providing original text snippets and source identifiers for subsequent comparison.

## Configuration and implementation checks

This part is executed by the citation output of the knowledge base retrieval node, which outputs an array of citation content, each entry containing an original text snippet and a source identifier, and the length can be 0. The version ledger and change records are then completed by subsequent AI nodes, code nodes, or manual work.

| Object | Check | Verification action |
| --- | --- | --- |
| Ethics review application | Fields, dates, and signatures are complete, and the research name and subject count match those in the informed consent form template | Retrieve the citation snippet, check the research name, subject count, and signature date in the application, and compare them against the same-named fields in the informed consent form template |
| Informed consent form template | The version number matches the protocol version in the current ethics review application, and the signature fields and receipt are not missing | Use the citation array to refer back to the original template text, and check whether the version number, signature fields, and receipt date are in sync with the application record |
| Risk assessment form | The risk level, handling measures, and dates show no contradictions between the application and the template, and the version is not lagging behind | Compare the risk level and handling date in the risk assessment form and the application, and confirm that the old version is traceable and the current version is unique |
| Citation content output | The number of returned entries matches the materials hit; being empty is also normal; `quoteList` in `responseData` (non-streaming module results returned with detailed output enabled) can expand the source | Run a trial with a question that matches no materials, and see whether the array is empty while the chain continues; then check that `quoteMaxToken` is the content budget, and record the number of array entries separately |

## Three common errors

- Symptom: The same subject count does not match between the ethics review application and the informed consent form template. Cause: The two materials were revised separately, and the fields were not synchronized based on the current version.
- Symptom: The version number of the risk assessment form lags behind the ethics review application. Cause: After a protocol change, only the application was updated, and the template and risk form were not synchronized.
- Symptom: The informed consent form template is missing a signature or receipt. Cause: The citation snippet only captures the body text and does not cover the signature fields and receipt page.

## How to verify the setup

This feature's acceptance: ask an ethics review question that has original text support, and check whether the citation array and footnote markers can refer back to the original text; then ask a question that matches no materials, confirm that the array is empty while the chain runs through, and check the source identifier of `quoteList` in `responseData`.

Business test: change one piece of content and see whether the version number and citations are updated in sync; when a citation limit is involved, check the tokens of the citation text, record the number of array entries separately, and do not compare it for equality with `quoteMaxToken`.

- In the knowledge base retrieval node, check the selected collections and their vector models, open the search parameter panel, and check the values item by item.
- Run a trial with a question that matches no materials, see whether the citation array is empty while the output chain continues, and check the citation footnote markers against the source documents.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/openapi/chat.mdx)
