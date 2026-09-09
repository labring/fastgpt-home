<!--
slug: doc-parser-selection
canonical: https://fastgpt.io/guide/doc-parser-selection
hreflang: en | zh-CN → https://fastgpt.cn/guide/doc-parser-selection | en → https://fastgpt.io/guide/doc-parser-selection | x-default → https://fastgpt.io/guide/doc-parser-selection
Meta title: FastGPT Document Parser Selection and Evaluation Guide
Meta description: Compare built-in, enhanced and external document parsing for FastGPT using file formats, image extraction, operating costs and migration criteria.
keywords: doc parser selection
结构化数据: Article + BreadcrumbList
配图需求: Text and accessible tables; no image is required for this release.
内链: 
source_file: 程序化技术页-第6批/英文-fastgpt.io/guide/doc-parser-selection.md
source_sha256: b64d67d985b709f97b4f1dc1e1c2aa0d0ec6c6ae32ee558af01e99b2e8859d28
source_verified: 2026-09-07
publication_batch: Week08
-->

# Choosing a Document Parser: Built-in, Enhanced and External Services

## When this decision has to be made
You must make this decision when your business launches knowledge base construction or document chat application development. You also must act when your existing document parsing workflow fails to cover multi-format documents or falls short of accuracy requirements.

Making this decision early carries costs: If you deploy enhanced parsing or external services before clarifying your business document types or parsing volume, you will waste resources and add unnecessary configuration complexity.

Making this decision late carries risks: Insufficient parsing capability leads to poor knowledge base data quality, unresponsive document chat features, delayed project launches, damaged user experience, or rework of already invested business processes.

You must also act when your business needs OCR recognition, multimodal document parsing, or when your built-in parsing service has compatibility issues: such as image upload timeouts, path errors, or circular structure BSON errors. For example, if you encounter scenarios like scanned PDFs that fail to parse correctly, messy complex table outputs, or missing images in your knowledge base, your existing built-in parsing solution can no longer meet your needs, and you must reevaluate your options.

## Criteria matrix
| Candidate               | Support Document Types                                                                 | Image Parsing Capability                                                                 | Complex Format Processing Capability                                                                 | Deployment Complexity                                                                 | Configuration Dependencies                                                                 | Parsing Result Format                                                                 | Compatibility                                                                 |
|-------------------------|----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| Built-in Parsing        | Plain text, standard PDF, common office documents                                      | Basic image parsing, with issues of upload timeout and path splicing errors               | Limited effect on scanned PDFs and complex table recognition                                           | No extra deployment required, starts with the main service                            | Depends on main service environment variables, no extra configuration                     | Standard Markdown, with residual span tags in some scenarios                          | Issues like circular structure BSON errors, chunk configuration abnormalities    |
| Enhanced Parsing Service| Standard PDF, scanned PDF, image-based documents                                        | Supports OCR recognition, fixes image path display issues                                 | Supports full-image PDFs and complex table recognition, results close to pdf-marker                      | Requires extra deployment of parsing services (such as MinerU, Doc2X)                  | Requires configuration of parsing service address, FILE_DOMAIN and other environment variables | Optimized Markdown, fewer span tags, supports table HTML format                      | Requires adaptation to service address and environment variables, risk of chunk configuration abnormalities |
| External Parsing Service| All format documents (including professional formats)                                   | Supports multimodal OCR, allows custom recognition models                                | Supports custom parsing logic, adapts to complex business scenarios                                   | No local deployment required, calls third-party service APIs                          | Requires configuration of service API address, access keys, etc.                          | Customizable return format, adapts to business needs                                   | Depends on third-party service stability, no local deployment compatibility issues |

## Why each criterion matters
### Support Document Types
Support for document types determines if a parsing solution can cover the full range of your enterprise’s existing document assets. If a solution only supports plain text, it cannot handle scanned PDFs, image-based research reports, or similar files. This leaves large volumes of documents unparsed, leading to low knowledge base data coverage. For example, if your business has many scanned contracts and image-based project reports, a basic built-in parsing solution will not meet your needs, and you must switch to an enhanced or external parsing service that supports OCR.

### Image Parsing Capability
The parsing effect of image-based documents directly impacts the quality of multimodal knowledge bases. If image parsing has issues like timeouts, path errors, or missing files, images in your knowledge base will fail to load or display incorrectly. This reduces user trust in your knowledge base. For example, broken image previews prevent users from accessing full document information, harming the accuracy of document chat responses. In some cases, failed image parsing can even stop entire document parsing tasks, delaying business workflows.

### Complex Format Processing Capability
The parsing effect of complex formats such as cross-page tables, nested lists, and mathematical formulas determines the usable value of professional documents. If a solution cannot correctly identify complex tables, it will lead to data loss or format chaos, making the content unusable for subsequent data analysis or question answering. For example, enhanced parsing solutions can correctly recognize full-image PDFs, fixing gaps in basic parsing and allowing scanned document content to be used effectively.

### Deployment Complexity
Deployment complexity impacts your solution’s launch timeline and maintenance costs. Built-in parsing requires no extra deployment and starts with your main service, so you can launch it quickly, but its functionality is limited. Enhanced parsing services require extra deployment of tools like MinerU or Doc2X, adding operational workload and learning costs. External parsing services require no local deployment, but they depend on third-party service availability, so you must evaluate stability and adaptation upfront.

### Configuration Dependencies
The number of configuration dependencies determines how easy it is to adapt a solution to your environment. For example, enhanced parsing services require configuration of environment variables like FILE_DOMAIN to fix image path issues. Incorrect configuration will prevent images from displaying, harming knowledge base previews. Built-in parsing has few configuration dependencies, but it cannot handle complex scenarios. Too many or overly complex configuration items increase learning costs for your operations team and reduce implementation efficiency.

### Parsing Result Format
The format of parsing results directly impacts subsequent chunking, indexing, and display. Parsing results with residual span tags can cause front-end rendering errors, making document content unreadable. Optimized Markdown formats can be used directly for knowledge base chunking and display, reducing post-processing work. Support for table HTML format also allows complex tables to display correctly in your knowledge base, improving user experience.

### Compatibility
Compatibility determines if a solution can adapt to your existing system environment. Issues like circular structure BSON errors or failed chunk configuration can cause parsing tasks to fail, delaying project launches. If a solution has compatibility problems, you will need to spend significant time troubleshooting and fixing them. You should prioritize solutions that are compatible with your existing system environment to reduce long-term maintenance costs.

## The cost of switching later
Switching document parsing solutions carries multi-dimensional costs. First, there is data migration cost: You must reparse all uploaded document data. If your original parsing results have format issues, you will need to reprocess all existing knowledge base content, including images, text, and tables. The time required scales with the total number of documents.

Second, there is index rebuilding cost: Your original vector indexes were built based on old parsing results. After switching solutions, you must clear existing indexes and regenerate chunk and vector data. If you use custom indexing rules, you will also need to adjust those configurations.

Third, there is downtime window: Some switching operations require restarting your main service or parsing service, leading to temporary service unavailability. You should perform these operations during low-business hours to minimize impact.

You will also face validation workload: You must conduct comprehensive testing of the new parsing results, including parsing effects for different document formats, image display status, and complex table recognition accuracy. You must cover all document types used in your business workflows to ensure the parsing results meet your requirements.

Finally, if you use enhanced parsing or external services, you will need to reconfigure parameters like service addresses and environment variables to avoid issues like path errors or timeouts.

## When this decision can wait
You can delay this decision in several scenarios. First, if your enterprise’s document assets only include plain text, with no images, scanned documents, or complex tables, a built-in parsing solution will meet your basic needs, and you do not need to invest extra resources in enhanced or external services.

Second, if your business has no plans to build a knowledge base or develop document chat applications, and you only need basic document storage functionality, you do not need to make this decision.

Third, if your parsing volume is small and your accuracy requirements are low, you can wait until your business needs become clearer before evaluating options. For example, if your business only stores a small number of plain text documents and does not need complex question answering or data analysis, a built-in parsing solution will suffice.

Finally, if you have already configured your existing parsing solution and no parsing issues have occurred in your current business scenarios, you can delay this decision until new business needs arise or your existing solution can no longer meet your requirements.

## Keep reading

- [Cloud, Community Self-Hosting or Commercial Private Deployment: Six Criteria](/en/guide/deployment-form-selection)
- [Knowledge Base Indexing Strategy: Chunking, Enhanced Index and Multi-path Recall](/en/guide/kb-index-strategy-selection)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- [Contact sales](/en/contact): assess the choice against your conditions
- [Get started](/en/start): validate feasibility on the cloud service
- [Pricing](/en/price): compare what each form covers
