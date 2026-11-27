---
title: Where to Start Building an Agent with FastGPT
slug: /en/guide/fastgpt-ai-agent-entry-guide
page_type: aggregation
source: https://doc.fastgpt.io/guide/build/workflow/intro
source_type: 深度场景内容
meta_title: Where to Start Building an Agent with FastGPT
meta_description: Find FastGPT documentation for understanding agents, building a knowledge or API workflow, and checking the inputs and outputs of a first application.
delivery_metadata: {"source_front_matter":{"task_id":"W19-hub-01","content_type":"hub","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-ai-agent-entry-guide","slug":"fastgpt-agent-entry-guide-en","article_id":"W19-hub-01-en","language":"en","meta_title":"Where to Start Building an Agent with FastGPT","meta_description":"Find FastGPT documentation for understanding agents, building a knowledge or API workflow, and checking the inputs and outputs of a first application.","source_language":"zh","source_sha256":"7953fba397f4870267ab58a09e0f094390e4004b22ae935152aac3e5598edf94","keywords":"[\"FastGPT workflow\",\"agent setup\",\"knowledge base search\"]"},"editorial_notes":[]}
keywords: FastGPT workflow, agent setup, knowledge base search
schema_type: Article
date_modified: 2026-11-23
---

# Where to Start Building an Agent with FastGPT

## Start with a task that has a clear result

An agent can begin with a concrete task, such as answering a product-manual question or looking up a customer record. Write down the material a person will supply and the result they need before choosing documentation. FastGPT workflows connect steps with inputs and outputs, including retrieval, interaction and API calls. The team defines the business objective from the work it needs to complete.

## Understand nodes and variables

Start with the [workflow and plugin overview](https://doc.fastgpt.io/guide/build/workflow/intro) to see how a user question enters a workflow and how later nodes access earlier outputs. Sketch the inputs, processing steps, and outputs for your task. Mark where documents or business data are needed. A product-manual question calls for the passage about the relevant model, while an order lookup needs a usable order identifier. Keep the sketch as a reference for what each node should receive during testing.

## Build answers around retrieved sources

If an answer needs manuals, policies or training material, use the [knowledge search documentation](https://doc.fastgpt.io/guide/build/workflow/nodes/dataset_search). A search node can use multiple knowledge bases sharing the same embedding model and returns an array of references. Test representative questions and inspect the files behind the passages before arranging answer generation. An empty array means this search returned no reference passages; the workflow can request more detail or revisit the search scope.

## Connect the existing business system

For current order status or customer records, read about [HTTP requests](https://doc.fastgpt.io/guide/build/workflow/nodes/http). Obtain the endpoint, method, authentication requirements and response fields before mapping variables. Test with one business record you can verify, then check that the identifier sent in the request matches the object returned by the API. An API query and document retrieval can serve the same question, but their information changes differently. Keep the response and query time so the answer can be checked against the business state that was actually returned.

## Complete the input and check the whole path

When required fields are missing, [form input](https://doc.fastgpt.io/guide/build/workflow/nodes/form_input) can collect information and pass it to later steps. Check the original question, retrieved material, API response and final answer separately. When something is missing, check whether the gap is in the input, retrieved material, or API response before deciding to ask a follow-up question or take an error path. Include paths for missing references, incomplete fields and API failures so the first application has specific situations that can be tested.
