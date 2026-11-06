---
title: Model Integration and Configuration for Continuing Education Training Hour Recognition: Find Supporting Evidence
slug: /en/industry/education-d001-c038-f014
page_type: 行业问题页
application_area: education
meta_title: Continuing Education | Model Setup | Evidence
meta_description: Continuing Education: review model setup for evidence lookup. Check source versions, input mappings and the values received by downstream nodes.
date_published: 2026-11-03
date_modified: 2026-11-03
---

# Model Integration and Configuration for Continuing Education Training Hour Recognition: Find Supporting Evidence

## What this category's data looks like

This page addresses the continuing education credit hour recognition scenario, and the materials include three types: course filing forms, study certificates, and credit hour recognition forms. The course filing form records the course name, credit hours, filing date, and the signature of the person in charge; the study certificate records the trainee, course name, completed credit hours, issue date, and the seal/signature of the issuer; the credit hour recognition form records the recognized course, recognized credit hours, recognition date, and review signature. The materials are updated by the academic affairs and recognition positions on a batch basis, and the version is based on the current document with complete signatures and receipts. When entering this function, the course filing form and study certificate serve as retrieval sources to answer basis questions; the credit hour recognition form serves as a comparison material to check whether the recognition result is consistent with the filing and certificate. The field characteristics are concentrated in names, quantities, dates, signatures, and receipts. When comparing across materials, the current version prevails, and old versions and unsigned documents are not used as the basis for answers.

## Configuration and implementation checks

This step is executed by the server-side model channel configuration, which outputs the model binding relationships and channel responses. "Basis items that can be traced back to the original text" are completed subsequently by AI nodes, code nodes, or manual work. Models are divided into five categories: language, indexing, reranking, speech synthesis, and speech recognition. Different steps bind different model types. The retrieval step needs to bind an indexing model, and the dialogue step needs to bind a language model.

| Object | Check | Verification action |
| --- | --- | --- |
| Course filing form | The name, credit hours, filing date, and signature of the person in charge must be consistent with the current version, and must correspond item by item with the study certificate | Check the filing form fields and signature; compare the same course name and credit hours in retrieval; check whether the version is synchronized |
| Study certificate | The trainee, course name, completed credit hours, issue date, and seal/signature of the issuer must correspond to the filing form, and there must be no inconsistency in name or quantity | Check the certificate fields and seal/signature; use cross-material questions to verify whether the name, quantity, and date match; record the number of cited items and separately check the `quoteMaxToken` budget |
| Credit hour recognition form | The recognized course, recognized credit hours, recognition date, and review signature must be consistent with the filing form and study certificate; missing signatures or receipts shall not be used as a basis | Check the recognition form signature and receipt; compare the dates and quantities of the three materials; confirm that the current version has been synchronized |
| Model binding relationship | The language model is used for dialogue, and the indexing model is used for retrieval; the model identifier must be consistent with the model name returned by the channel | Check the type labels in the model configuration; compare with the model name returned by the channel; check whether `maxContext`, `maxTokens`, and `toolChoice` match the step |

## Three common errors

- Symptom: The name or credit hours of the same course do not match between the filing form and the study certificate. Cause: The two materials are entered by different positions, and the fields have not been unified according to the current version.
- Symptom: The recognition form lacks a signature or receipt but is still cited as a basis. Cause: The material versions are not synchronized, and old documents and unsigned documents are mixed into the retrieval sources.
- Symptom: Retrieval reports an indexing model-related error or authentication failure. Cause: The channel key is inconsistent with the connected service, or the retrieval step is not bound to an indexing model.

## How to verify the setup

This function's acceptance: run one dialogue and one retrieval, check the model identifier in the response, confirm that dialogue uses the language model and retrieval uses the indexing model, and check whether `maxContext`, `maxTokens`, `quoteMaxToken`, and `toolChoice` match the step.

Business test: ask a cross-material basis question, see whether the answer provides a traceable source, and check whether the number of cited items and the tokens of the cited text are recorded separately.

- Check the names, quantities, dates, and signatures of the course filing form, study certificate, and credit hour recognition form, mark inconsistent items, and trace them back to the original text.
- In the model configuration, check the correspondence between model types and steps, and compare with the model name returned by the channel to confirm that the model identifier is consistent.
