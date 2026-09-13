---
title: Set Up a Dataset-Powered Legal Q&A Agent
slug: /en/tutorial/fastgpt-civil-code-qna-agent-setup
page_type: Tutorials
source: https://doc.fastgpt.cn/en/guide/getting-started/quick-start
source_type: Official documentation
---

# Set Up a Dataset-Powered Legal Q&A Agent

## Dataset Preparation Steps
1. Navigate to the Dataset page via the left homepage sidebar, click **New** in the top-right corner, and name the dataset `Civil Code Q&A Assistant` with default configuration settings.
2. Create a text collection: select **New > Text Collection** to import local documents.
3. Upload files: use **Upload Local File**; multiple files are supported for production, but one file is used for this demo.
4. Configure parsing parameters: Use default settings for quick testing. Recommended baseline settings include chunked storage for cost-effective retrieval, adjusted chunk token counts as needed, and index enhancements (first two options for plain text, image enhancements for documents with images). Chunk size directly impacts answer quality: overly large chunks include irrelevant content and verbose responses, while overly small chunks split critical context, leading to unsupported answers.
5. Preview chunking results: Verify that paragraphs are not abnormally cut, titles and body text remain semantically linked, and tables, clauses, or numbering remain readable. Adjust parameters if knowledge fragment quality is unstable.
6. Wait for the dataset status to update to "Ready" before linking to an agent.

## Conversational Agent Configuration
Create a new Conversational Agent named `Civil Code Q&A Assistant`. In the app’s configuration menu, link the previously prepared dataset. This changes the app’s response flow from basic chat to `user question → dataset search → model summarizes answer`, a key distinction from basic content generation use cases.

## Q&A Prompt Specification
For legal Q&A workflows, define strict response boundaries and standardized output formatting using the following prompt:
```md
You are a professional Civil Code Q&A assistant, answering legal questions based on the original text of the _Civil Code of the People's Republic of China_.

Rules:
- Strictly answer based on the Civil Code articles retrieved from the Dataset; do not fabricate legal provisions.
- Every answer must cite the original Civil Code text (book, chapter, article).
- If there is no directly corresponding provision in the Civil Code, state this honestly and do not give legal advice.
- When applying the law to specific cases, remind the user: "This answer is for reference only; please consult a professional lawyer."
- Provide plain-language explanations of legal terms so that users without a legal background can understand.

Output format:
1. **Legal Conclusion** (1–3 sentence summary)
2. **Relevant Article Citation** (original excerpt + book/chapter/article number)
3. **Plain-Language Explanation** (explain the meaning of the article in everyday language)
4. **Practical Advice** (2–3 actionable suggestions)
5. **Disclaimer** ("This answer is based on the original Civil Code text and does not constitute legal advice. For specific cases, please consult a professional lawyer.")
```
This prompt enforces accurate, cited, and accessible legal responses, critical for building trusted Q&A tools.

> Source: [FastGPT official source](https://doc.fastgpt.cn/en/guide/getting-started/quick-start)

## Applicability and version scope

Use this page for the documented Tutorials scenario. Confirm the FastGPT, dependency, API, and deployment versions in the official source before applying a change.

## Safety guardrails

Use [REDACTED_CREDENTIAL] for credentials and private data. Confirm the documented environment and version before review.

## Rollback guidance

Restore the prior technical-content authority snapshot. Restore saved configuration and data snapshots, then repeat the smallest verification scenario.
