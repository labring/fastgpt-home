---
title: FastGPT On-Site and Private Cloud Deployment Matrix
slug: /en/compare/fastgpt-decision-matrix-07
page_type: matrix
source: https://doc.fastgpt.io/self-host/deploy/docker
source_type: 深度场景内容
meta_title: FastGPT On-Site and Private Cloud Deployment Matrix
meta_description: Compare FastGPT hosting in an on-site server room and a private cloud by access paths, model endpoints, backup coverage and operational ownership.
delivery_metadata: {"source_front_matter":{"task_id":"W19-matrix-07","content_type":"matrix","product_version":"v4.17.4","review_date":"2026-11-23","translation_group":"fastgpt-decision-matrix-07","article_id":"W19-matrix-07-en","slug":"fastgpt-decision-matrix-07-en","language":"en","meta_title":"FastGPT On-Site and Private Cloud Deployment Matrix","meta_description":"Compare FastGPT hosting in an on-site server room and a private cloud by access paths, model endpoints, backup coverage and operational ownership.","keywords":"[\"on-site hosting\",\"private cloud\",\"operational ownership\"]","source_language":"zh","source_sha256":"b71bf9e3392e8f85c70560b5bf434e32655a89358cb0e2a236b56417bb1f1015"},"editorial_notes":[]}
keywords: on-site hosting, private cloud, operational ownership
schema_type: Article
date_modified: 2026-11-23
---

# FastGPT On-Site and Private Cloud Deployment Matrix

## Locate the application first

Draw both proposed environments. In one, the company runs FastGPT in its server room. In the other, it uses a private cloud network under its control. For each, locate the application, databases and file storage, and identify where users enter the network. Mark access proxies and administration entry points so staff can trace a browser request.

## Compare the two configurations

Use the [Docker Compose deployment guide](https://doc.fastgpt.io/self-host/deploy/docker) to check core services, then record which components share a host and which use separate services. An on-site environment may reuse an existing database cluster, and a private cloud database can still be company-managed. Fill the matrix from actual configuration and assign owners for the application, infrastructure and incident response.

| Check | On-site | Private cloud |
| --- | --- | --- |
| User access | Internal network or company gateway | Private network connection or controlled entry point |
| Storage and recovery | Check backup media and restore owner | Check cloud resource configuration and restore owner |
| Model connectivity | Check the local proxy and actual egress | Check private endpoints and external service paths |

## Trace calls to models and parsers

Record model and parsing endpoints for both designs. When a model is on the same private network, check the proxy path to it. When a third party provides it, inspect the egress point and transmitted fields. Send a request with approved test material and check the destinations recorded for model and parsing calls before documenting data flows.

## Verify operational ownership with a recovery task

Use a database or file storage recovery to compare operations. Identify the backup location, who can retrieve it and how restoration will be checked. Confirm that the application configuration can reconnect to the databases and model services. If vendor assistance is needed, consult the [FastGPT commercial edition guide](https://doc.fastgpt.io/guide/version/commercial) for deployment and service scope, then record the agreed responsibilities.

## Compare both setups with the same task

Run a common internal question in both candidate environments with the same documents, question and user identity. Record service connections, references and who handles exceptions. If the server room already provides network and recovery capabilities, estimate the work to reuse them. If the private cloud centralizes access and backup, check connectivity and management permissions with operations. If everyday access traverses two gateways, record contacts and troubleshooting locations for each.
