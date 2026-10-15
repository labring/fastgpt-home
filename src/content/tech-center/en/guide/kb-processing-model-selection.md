---
title: Knowledge Base Processing Models: What Text, Index and Image Models Each Handle
slug: /en/guide/kb-processing-model-selection
page_type: Decision matrix
source: https://doc.fastgpt.cn/zh-CN/self-host/config/env
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_description: A technical decision guide for enterprise open-source AI platform buyers: select text, vector index, and image models for RAG knowledge base applications, covering key criteria, switching costs, and optimal timing.
schema_type: TechArticle
date_published: 2026-10-15
date_modified: 2026-10-15
---

# Knowledge Base Processing Models: What Text, Index and Image Models Each Handle

## When this decision has to be made
You must make this selection when your enterprise deploys a retrieval-augmented generation (RAG) knowledge base application and involves multi-model configuration, feature upgrades, or scenario expansion.
Early selection without clear business requirements leads to configuration redundancy, increased deployment and maintenance costs, and unnecessary model dependencies.
Delaying selection—for example, discovering after launch that a model cannot support multimodal content parsing, has insufficient index accuracy, or fails to meet question answering generation requirements—requires downtime to refactor the knowledge base pipeline. This disrupts normal business operations and may lead to inaccurate user answers or failed retrieval.
You must complete model selection early when your enterprise needs to access an image knowledge base, optimize retrieval accuracy, or adjust data processing workflows, to ensure all links match your business goals.

## Criteria matrix
| Candidate | Core applicable tasks | Maximum context/Token limit | Multimodal support capability | Custom configuration options | Version compatibility | Associated dependent services |
|-----------|-----------------------|------------------------------|--------------------------------|--------------------------------|-----------------------|--------------------------------|
| Text Understanding Model (agentModel) | Question answering generation, content summarization, QA pair extraction, question optimization, content classification | Determined by model configuration; for example, gpt-3.5-turbo-16k supports 16384 Tokens. Values not specified in documentation require testing in your deployment environment | Supported for some models (set `vision` to true); can process image inputs | Supports custom system prompts, temperature parameters, tool call configuration, function call configuration, classification prompts | Supported in both community and commercial editions | Requires configuration of model provider interfaces; optional association with custom PDF parsing services |
| Vector Index Model (vectorModel) | Text vectorization, semantic retrieval, full-text retrieval association, index generation and update | `maxToken` is 3000 as specified in the index model documentation; default Token count is 512 | Supports image vectorization (requires corresponding model capabilities) | Supports custom chunk Token count, index size, chunking mode, chunk splitting symbols | Supported in both community and commercial editions | Requires association with a vector database (such as PostgreSQL PG Vector, Milvus, etc.) |
| Image Understanding Model (vlmModel) | Image content description, image vectorization, multimodal retrieval, image parsing | Not stated in the documentation; verify in your environment | Natively supports image input and content parsing | Supports custom image parsing prompts, parsing accuracy configuration | Supported in commercial edition; documentation for community edition does not state support | Requires association with a visual model service; commercial edition image knowledge base functionality |

## Why each criterion matters
### Core applicable tasks
Choosing the wrong core applicable task will directly mismatch model functionality to your business needs. For example, using a vector index model for question answering generation will cause illogical or off-topic responses, as the model lacks natural language generation capabilities. Using a text understanding model for text vectorization will result in poor vectorization accuracy, since the model is not optimized for semantic retrieval, leading to retrieval results that do not match user queries. When your business needs to process image content, not configuring an image understanding model will prevent you from recognizing image information, failing to build a complete multimodal knowledge base and limiting your business coverage.

### Maximum context/Token limit
Insufficient context or Token limits cause critical information loss. For example, a text understanding model with too small a context cannot handle full question answering for long documents, leading to responses missing core content. A vector index model with too small a `maxToken` cannot fully vectorize long text segments, leading to incomplete indexing of chunked text and reduced retrieval coverage. When your knowledge base includes many long documents, mismatched context limits directly impact retrieval effectiveness and question answering quality.

### Multimodal support capability
Insufficient multimodal support capabilities limits your knowledge base's application scenarios. For example, if your business needs to process user-uploaded image queries, not using a multimodal model will prevent you from generating image descriptions or vectors, making multimodal retrieval impossible. Some vector models support image vectorization, which directly converts images to vectors for retrieval; not selecting such a model will disable image retrieval functionality. Multimodal capability adaptation directly determines whether your knowledge base can cover multimodal business scenarios.

### Custom configuration options
Insufficient custom configuration options prevents you from adapting to your enterprise's specific business needs. For example, if your enterprise needs custom QA splitting prompts to optimize question-and-answer pair extraction effects, a model without this configuration will fail to meet expected data processing results. Custom chunking mode, index size, and other configurations can be adjusted based on document type; without these options, chunks may be too large or too small, impacting retrieval accuracy and response speed. Sufficient custom configuration options are the foundation for refined knowledge base management.

### Version compatibility
Insufficient version compatibility prevents features from working correctly. For example, an image understanding model supported in the commercial edition may fail to load in the community edition, disabling image knowledge base functionality. If your enterprise plans to upgrade from the community edition to the commercial edition, failing to confirm model compatibility in advance will lead to functional errors after the upgrade. Version compatibility directly relates to your enterprise's subsequent feature expansion and version upgrade plans.

### Associated dependent services
Incorrect configuration of associated dependent services prevents models from running properly. For example, a failed vector database connection will prevent you from generating or retrieving vector indexes, making the knowledge base unavailable. Incorrect configuration of a custom PDF parsing service address will prevent correct parsing of PDF files, disrupting document import workflows. The stability and correct configuration of associated dependent services directly impact the availability of the entire knowledge base processing pipeline.

## The cost of switching later
Changing a selected model involves multi-stage cost investments. First, reprocess data: existing vector indexes, text chunks, and image indexes must be regenerated. You will need to re-upload documents and run parsing and chunking processes; the time required depends on the size and complexity of your knowledge base. Second, rebuild indexes: existing indexes in the vector database must be deleted and regenerated, which consumes significant database resources. You will need to schedule a maintenance window to avoid disrupting normal business operations. Next, adjust configurations: you must reconfigure model parameters and associated dependent services. For example, switching vector models requires adjusting chunk size, index size, and other parameters; switching image understanding models requires reconfiguring visual model services. Finally, complete validation work: you must retest the knowledge base's retrieval effectiveness and question answering generation results to ensure no issues like inaccurate retrieval or incorrect answers after the model change. You will need to run multiple rounds of tests covering different document types and query scenarios. If you switch to a commercial edition model, you must also confirm changes to the licensing agreement to avoid compliance issues.

## When this decision can wait
You can delay this decision if you only deploy a lightweight RAG application, your knowledge base only contains plain text with no image content, and using the system's default model configuration meets basic business needs. For example, if you are just testing a RAG application and only need to quickly verify functionality, you can use the system's default text understanding and vector index models without additional custom model configuration. You can also keep the default configuration if your knowledge base is small, with few simple documents, and you do not need to adjust model parameters to optimize retrieval accuracy. Additionally, if you have not yet clarified your business scenarios—for example, if you are still determining the scope of your knowledge base or whether you need multimodal functionality—you can use the default configuration first and complete model selection after confirming your requirements. Note that you must finalize model selection promptly as your business scales, your knowledge base grows, or you need to optimize retrieval accuracy or expand functionality, to avoid impacting business performance and user experience.

## Keep reading

- [Moving Apps Between Environments: What Export, Templates and Copies Carry Over](/guide/app-migration-across-envs)
- [Deployment Architecture: Images and Trade-offs on x86 and ARM Servers](/guide/cpu-arch-and-image-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers

> Criteria taken from the open-source repository and community threads, verified 2026-09-28.
