<!--
Delivery metadata (not published with the body)
slug: index-status-and-rebuild-scope
locale: en
canonical: https://fastgpt.io/guide/index-status-and-rebuild-scope
hreflang: en | zh-CN → https://fastgpt.cn/guide/index-status-and-rebuild-scope | en → https://fastgpt.io/guide/index-status-and-rebuild-scope | x-default → https://fastgpt.io/guide/index-status-and-rebuild-scope
Meta title: FastGPT Index States, Vector Models and Rebuild Scope
Meta description: Understand FastGPT index states, retrieval eligibility and model-switch rebuild scope, with checks for pending rows, completed indexes and source versions.
keywords:
结构化数据: Article + BreadcrumbList
内链:
配图需求: none
发布批次: W16
-->

# Index Status and Rebuild Scope: Common Misconceptions in FastGPT Knowledge Base Retrieval

The most common mistakes with index status and rebuild scope are treating parsing completion as recallability, or understanding a rebuild as a full re-run. The correct order is to first confirm that data rows have been persisted, then verify the index status, and finally judge the rebuild impact based on the range of completed indexes.

## Parsing Completion Only Means Data Rows Are Persisted
In the FastGPT knowledge base workflow, a file enters the parsing stage after upload. The output of the parsing action is structured data rows, and these data rows are immediately written into the storage corresponding to the knowledge base. At this point the data already exists: records can be seen in the dataset, and the content of each data item can be viewed. Parsing completion does not mean it can be retrieved and recalled; it only indicates that the original content has been converted into row records that the system can manage. Many users mistakenly believe at this step that the knowledge base is already usable, go directly to Q&A or debugging, and find that the model cannot answer the content, so they suspect the model's capability or the way the prompt is written. The actual cause often points to the indexing stage: although the data rows are persisted, vectorization and index construction have not yet been completed. The verification action is simple: enter the knowledge base's data list, confirm whether the target data row exists, and then check its index status field. If the status remains at parsed, it means the data row is ready and indexing has not started or has not yet completed. The failure manifestation is usually an empty retrieval result, or recalled content unrelated to the question, even though the corresponding file is clearly present in the data list. Treating parsing and indexing separately is the first step in troubleshooting knowledge base issues.

## The Meaning and Flow of the Three Index Statuses
FastGPT divides index status into three types: parsed, indexing, and indexed. Parsed means the data row has been generated and is waiting to enter the indexing process; indexing means the system is generating vectors for these data rows and writing them into the index structure; completed means index construction has finished and the data can participate in recall. The three statuses form a one-way flow chain, and the normal order is parsed to indexing to indexed. What users need to watch is whether the status is stuck. If it remains at parsed for a long time, the indexing task may not have been triggered or the queue may be backlogged; if it remains at indexing for a long time, the data volume may be large or processing resources may be tight. The verification action is to refresh the data list periodically and observe whether the status advances. Failure manifestations include: the status remains unchanged for a long time and retrieval always returns no results; or some data is completed while some is still parsed, resulting in incomplete recall results. Understanding the meaning of the three states helps determine whether the problem lies in the data preparation stage or the index construction stage. Parsed is completion at the data level, while completed is usability at the retrieval level. Confusing the two will lead to repeatedly adjusting configuration in the wrong direction.

## Data Pending Indexing Does Not Participate in Recall
Data rows in the parsed or indexing state do not participate in recall before indexing is complete. This is a hard boundary in the FastGPT retrieval mechanism: recall only targets data for which an index has been established. In other words, even if the data row has been persisted and the content is complete, as long as the index status is not indexed, this part of the content cannot be hit during Q&A. Many users encounter the situation where they ask a question immediately after uploading a file, and the answer lacks information from the new file, so they think the upload failed or parsing failed. The actual reason is that indexing has not yet completed and the data is still in the pending-indexing stage. The verification action is to check the index status of the target data row and confirm whether it is indexed. If it is not yet completed, wait for the indexing process to finish before testing recall. Failure manifestations are usually: old data can be recalled, but newly uploaded data cannot; or among the same batch of files, some can be recalled and some cannot, and the difference exactly corresponds to index status. This mechanism also explains why a period of index construction time must be allowed after batch import. Treating pending-indexing data as recallable data will produce unstable retrieval results and will also steer troubleshooting away from the real cause.

## Model-Switch Rebuild Only Covers Completed Indexes
When the embedding model changes, rebuilding targets rows whose indexStatus is indexed. Rows in parsed or indexing state do not enter this rebuild chain. Both the rebuild scope and retrieval eligibility should be checked against the state of individual rows. Pending rows are already isolated from retrieval.

Before the operation, record the target materials, their data rows, index states and current model. Then check which rows the rebuild task actually covers. For indexed materials, inspect whether the rebuilt index is written back to the corresponding row. For materials still being processed, inspect the original training task's progress or error, then retrieve the same question after that task finishes. Separate records for these two groups show the difference between a completed rebuild and all intended materials being ready for retrieval.

When an old version is returned, check whether the current material replaced the previous file, whether the old file remains enabled, whether retrieval includes an old collection and which version the actual hit belongs to. An unfinished index explains why that particular row is temporarily absent from recall. Comparing the source hit, row state and task record establishes whether indexing needs attention, training is still running or source materials and retrieval scope need to be updated.

## Verification Order and Common Failure Manifestations
When facing knowledge base retrieval problems, it is recommended to verify in a fixed order. Step one: confirm whether the data row has been persisted, and check whether the target record exists in the data list. Step two: confirm the index status, distinguishing the three cases of parsed, indexing, and indexed. Step three: if the status is not indexed, wait for or trigger the indexing process, and do not rush to adjust retrieval parameters. Step four: if the status is completed but recall still fails, then check the retrieval configuration and query formulation. Step five: if a model switch is involved, first confirm whether pending-indexing data has been fully processed, then judge the rebuild scope. Common failure manifestations include: the data list has records but Q&A returns no results, corresponding to incomplete indexing; some files can be recalled and some cannot, corresponding to inconsistent index status; recall quality declines after switching models, corresponding to a rebuild that did not cover pending-indexing data. By mapping these manifestations to index status, the problematic stage can be quickly located. Index status is a prerequisite for knowledge base usability, and rebuild scope is a key boundary when switching models. Mastering these two points means most retrieval anomalies can be traced to the configuration level.

## The Actual Relationship Between Index Status and Recall
After parsing, data rows are immediately persisted and then enter the indexing process, with statuses in order: parsed, indexing, completed. Only data rows with completed indexing participate in recall; data rows pending indexing and indexing do not appear in retrieval results, and there is no situation where they "continue to be recalled using old vectors."

After switching the embedding model and rebuilding the index, the coverage is the data with completed indexing. Data rows with incomplete indexing remain as they are and enter the collection after the next indexing completion. Therefore, when verifying, first look at the status distribution of data rows, then decide the rebuild scope, and do not replace status checking with "whether the rebuild task has run." When content cannot be retrieved, first confirm the data row status, then confirm the retrieval scope and filter conditions, and only then look at the similarity threshold.

For acceptance, prepare two sample groups: one group in which all data rows have completed indexing, and another group containing data rows that are indexing. Retrieve with the same question respectively, record the returned data rows and statuses, and confirm that rows with incomplete indexing do not appear in the results. If they do appear, first check whether retrieval bypasses status filtering, rather than suspecting the model first.

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/self-host/upgrading/4-17/4172.mdx)

## References

- [FastGPT official source](https://github.com/labring/FastGPT/blob/v4.17.2/document/content/self-host/upgrading/4-17/4172.mdx)
