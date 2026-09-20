---
title: Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Research Reports
slug: /en/industry/finance-d009-c006-f013
page_type: Industry scenario page
article_section: Research Report Search and Q&A
is_part_of: FastGPT Tech Center
meta_title: Knowledge Base Retrieval and Recall for Traditional Chinese
meta_description: Data sources for traditional Chinese medicine (TCM) research reports include industry white papers released by traditional Chinese medicine industry
source_type: Industry topic matrix (industry x direction x capability x real community questions)
date_published: 2026-09-15
date_modified: 2026-09-15
---

# Knowledge Base Retrieval and Recall for Traditional Chinese Medicine Research Reports

## What this category of data looks like
Data sources for traditional Chinese medicine (TCM) research reports include industry white papers released by traditional Chinese medicine industry associations, securities firm medical industry research reports, publicly available pharmacopoeia documents, and internal pharmaceutical company R&D records.
Update cadences vary by content type:
- The national pharmacopoeia is updated every 5 years.
- Industry research reports are released quarterly and annually.
- Temporary updates occur when new medicinal materials are approved or clinical research results are published.
Documents typically include sections such as medicinal material origin, nature, flavor and meridian tropism, efficacy and indications, clinical applications, pharmacological research, quality standards, and illustrated physical trait descriptions.
Fields use professional terms like meridian tropism and processing methods. Units include grams, milligrams, clinical course (weeks), and percentage content.

## Constraints on knowledge base retrieval and recall
Scattered data sources require the knowledge base to support multiple formats including docx, pdf, and scanned documents. It must also distinguish retrieval weights between official authoritative documents and industry research reports.
Irregular update cadences require timely synchronization after new research results or policy announcements are released. The recall process prioritizes displaying the most recent data.
Specialized fields and included images in document structures require the retrieval system to parse plain text content. It must also extract OCR information from images and quantitative data from tables.
Specific field and unit requirements mandate unified unit representation during retrieval. This avoids recall discrepancies caused by variations in unit terminology such as "gram" and "g".

## Configuration Settings
| Configuration Item | Recommended Setting | Rationale |
| --- | --- | --- |
| `PARSE_IMAGE_ENABLE` | Enabled | TCM research reports contain key visual information such as medicinal material trait images and chromatographic analysis charts. Image OCR text and descriptive content must be extracted for retrieval |
| `CHUNK_SIZE` | 800–1200 characters | TCM research reports contain continuous professional discussion paragraphs. This segment length preserves contextual association of technical terms, and avoids splitting that disrupts professional logic |
| `RECALL_TOP_N` | Top 8–12 results | TCM professional content has high density. A sufficient number of recalled results covers multi-dimensional retrieval needs such as nature, flavor and meridian tropism, and pharmacological research |
| `SIMILARITY_THRESHOLD` | 0.75–0.85 | Balances matching accuracy of technical terms and recall scope. Prevents low-match non-TCM content from being included in results |
| `TABLE_PARSE_ENABLE` | Enabled | TCM research reports often include tables of content determination and clinical data. Quantitative information in tables is core retrieval content |
| `UPLOAD_FILE_MAX_SIZE` | 500 MB | Adapts to single research report files with multiple pages of images and tables. Prevents upload restrictions triggered by oversized files |

> The parameter values provided on this page are common starting points for configuration. Actual values are affected by material form, data volume, and business rules. Specific issues require individual analysis. It is recommended to test on appropriate samples before finalizing settings.

## Three Common Misconfigurations
- Symptom: After uploading a docx file containing medicinal material images to the knowledge base, test questions fail to return answers related to the images. Background parsing logs only record text extraction records, and no image OCR parsing entries are generated. Cause: The `PARSE_IMAGE_ENABLE` configuration is not enabled. Only text parsing is completed, and OCR recognition information from images is not extracted.
- Symptom: When `CHUNK_SIZE` is set below 500 characters, a search for "Huangqi's nature, flavor, meridian tropism and efficacy" returns results where content such as "meridian tropism" and "invigorating qi and ascending yang" are split into multiple independent segments. A complete answer cannot be formed. Cause: Overshort segment length disrupts contextual association of professional discussions. This prevents the retrieval matching process from recognizing complete technical term combinations.
- Symptom: When searching for "Sanqi's content determination method", recalled results include Western medicine component analysis documents. The number of returned results exceeds the `RECALL_TOP_N` configuration range. Cause: No industry-specific keyword filtering rules are configured, and `SIMILARITY_THRESHOLD` is set too low. This causes non-TCM category documents to be incorrectly recalled.

## How to Verify Proper Configuration
- Upload a docx research report containing complete medicinal material trait images. Access the knowledge base test page, enter "What are the appearance and trait characteristics of this medicinal material?" Check if the returned results include OCR recognized text content from the images.
- Adjust `CHUNK_SIZE` to 1000 characters. Upload a research report containing continuous pharmacological research paragraphs. View the knowledge base segment preview to confirm that professional paragraphs are not forcibly split.
- Set `SIMILARITY_THRESHOLD` to 0.8. Enter "Quality control standards for traditional Chinese medicine injections". Check if recalled results only include TCM-related documents, with no content from other categories.
- Upload a pdf research report containing a content determination table. View the parsed text content in the knowledge base to confirm that numerical values and units in the table are fully extracted and displayed.

> Question material comes from public community discussions. Configuration values are common starting points and should be measured against your own samples. Verified on 2026-09-14.
