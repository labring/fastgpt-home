---
title: Deploying Without Egress: Image Sources, Capability Limits and Access Paths
slug: /en/guide/offline-airgap-deployment
page_type: Decision matrix
source: https://github.com/labring/FastGPT
source_type: Open-source repository docs and community threads
article_section: Selection & Evaluation
is_part_of: FastGPT Tech Center
meta_title: Deploying Without Egress: Image Sources, Capability Limits and Access Paths
meta_description: Technical guide for deploying an enterprise AI application platform in environments without internet access, covering image sources, capabilities, and acce
date_published: 2026-09-29
date_modified: 2026-09-29
---

# Deploying Without Egress: Image Sources, Capability Limits and Access Paths

## When this decision has to be made
Plan for offline or intranet deployment of FastGPT when your environment lacks external network access. This restriction is common in secure networks, financial institutions, government departments, or private cloud setups with high data security demands.

Deciding too early risks wasted resources. You might buy incompatible hardware or software licenses. You might commit to a technical path before understanding business needs, increasing later adjustment costs. For example, if initial assessments suggest low reliance on external models, but business later demands more external AI capabilities, a fully isolated early solution will require significant rework.

However, delaying this decision creates greater risks and costs. If you wait until late-stage development or pre-launch to consider offline deployment, you might find required images unavailable from public repositories. This delays deployment. You might discover intranet access limits for certain components, requiring network architecture redesign or even discarding completed development work. For instance, without external network access, the FastGPT main service cannot reach external GitHub APIs for version information. This can cause front-end display errors or missing features. Without planning for internal image repositories and proxy services, you face chaotic component version management, unpatched security vulnerabilities, and inability to introduce new features.

Therefore, at project start, define your no-egress deployment needs. Carefully evaluate and select a solution based on your business requirements for AI capabilities, data storage, and network access boundaries. This ensures project success.

## Criteria matrix

| Candidate Solution | Image Registry | Database Deployment Mode | Object Storage Access Path | External AI Model Access Path | Intranet Proxy Support | PDF Enhanced Parsing Service Deployment |
| :----------------- | :----------- | :----------------------- | :------------------------- | :-------------------------- | :--------------------- | :-------------------------------------- |
| Option 1: Fully Offline (Local Image Registry) | Self-built private image registry (e.g., Harbor). Pre-pull all Docker images (pgvector:0.7.0-pg15, mongo:5.0.18, redis:6.2.4, minio:RELEASE.2025-04-22T22-12-26Z, ghcr.io/labring/fastgpt:latest, etc.) | Containerized deployment (Docker Compose). All components on the same host or internal Docker network. | `STORAGE_S3_ENDPOINT` configured to internal MinIO service name or IP. `STORAGE_EXTERNAL_ENDPOINT` can be configured to an internal reverse proxy address or left unconfigured (XSS risk). | `OPENAI_BASE_URL` configured to internal OneAPI or AI Proxy service address. | Supported (via `AXIOS_PROXY_HOST` and `AXIOS_PROXY_PORT` configuration). | Containerized deployment, Doc2x service embedded. |
| Option 2: Restricted Intranet Deployment (Aliyun/Other Private Cloud Image Registry) | Aliyun image registry (registry.cn-hangzhou.aliyuncs.com/fastgpt/pgvector:v0.7.0, registry.cn-hangzhou.aliyuncs.com/fastgpt/mongo:5.0.18, etc.) | Containerized deployment (Docker Compose). All components on the same host or internal Docker network. | `STORAGE_S3_ENDPOINT` configured to internal MinIO service name or IP. `STORAGE_EXTERNAL_ENDPOINT` can be configured to an internal reverse proxy address or left unconfigured (XSS risk). | `OPENAI_BASE_URL` configured to internal OneAPI or AI Proxy service address. | Supported (via `AXIOS_PROXY_HOST` and `AXIOS_PROXY_PORT` configuration). | Containerized deployment, Doc2x service embedded. |
| Option 3: Partially Externalized Deployment (Separate Database/MinIO) | Self-built private image registry or Aliyun image registry. | External independent databases (MongoDB, PostgreSQL, Redis). Connect via internal IP or domain name. | External independent MinIO service. Connect via internal IP or domain name. `S3_EXTERNAL_BASE_URL` and `S3_ENDPOINT`. | `OPENAI_BASE_URL` configured to internal OneAPI or AI Proxy service address. | Supported (via `AXIOS_PROXY_HOST` and `AXIOS_PROXY_PORT` configuration). | Containerized deployment, Doc2x service embedded. |

## Why each criterion matters
**Image Registry**: In environments without external network access, the image source determines initial deployment and ongoing maintenance ease. If you rely on public Docker Hub or GitHub Container Registry, you must pre-pull all required images to a local private image registry. Ensure the registry's availability and version management. If you choose a private cloud image registry like Aliyun, ensure intranet connectivity to that registry. Image source stability directly impacts initial deployment success and future version upgrade convenience. For example, if you cannot access public image repositories, new version updates will fail. This prevents new features or security patches.

**Database Deployment Mode**: The database is FastGPT's core storage layer. Its deployment mode directly affects system performance, scalability, and operational complexity. Containerized deployment (e.g., Docker Compose) is often easier for quick startup and management. However, it may have limitations in resource isolation and advanced operations. Deploying databases on external, independent servers uses existing database infrastructure. This allows for better performance tuning, backup/recovery strategies, and high availability. This requires additional network configuration and connection parameter adjustments, such as accurate configuration of `MONGODB_URI`, `PG_URL`, and `REDIS_URL` environment variables. An improper database deployment mode can lead to connection errors, performance bottlenecks, or data loss.

**Object Storage Access Path**: FastGPT uses object storage (e.g., MinIO) for files and data. In environments without external network access, the object storage access path is critical. `STORAGE_S3_ENDPOINT` configures to an internal MinIO service name or IP. This ensures FastGPT containers can access MinIO internally. `STORAGE_EXTERNAL_ENDPOINT` issues file upload URLs. If this is misconfigured or unavailable, file uploads may fail. The FastGPT main service might not start. For instance, if `STORAGE_EXTERNAL_ENDPOINT` is `localhost` or `127.0.0.1`, the container cannot resolve it correctly. This causes an `ECONNREFUSED` error.

**External AI Model Access Path**: FastGPT often interacts with AI models. These models may deploy internally or access via proxies. In environments without external network access, configure `OPENAI_BASE_URL` to an internal OneAPI or AI Proxy service address. This ensures FastGPT routes requests correctly. Improper configuration prevents FastGPT from calling AI models. You will see "Connection error" or "model config not found" messages. Additionally, the AI Proxy or OneAPI itself needs correct model configuration and key management.

**Intranet Proxy Support**: Some complex intranet environments require an HTTP proxy to access other internal services or specific resources. FastGPT supports proxies by configuring `AXIOS_PROXY_HOST` and `AXIOS_PROXY_PORT`. If your intranet requires a proxy but it is not correctly configured, FastGPT may fail to communicate with other services (like OneAPI). This causes "Connection error." Even if a proxy service exists, incorrect IP or port configuration will cause connection failures.

**PDF Enhanced Parsing Service Deployment**: FastGPT's PDF enhanced parsing relies on the Doc2x service. In environments without external network access, Doc2x must deploy internally alongside FastGPT. This means including Doc2x Docker images in your private image registry. Ensure FastGPT can access the Doc2x service. If Doc2x deployment fails or FastGPT cannot connect, PDF files will not undergo enhanced parsing. This affects knowledge base construction and application effectiveness.

## The cost of switching later
Once you select and implement an offline deployment solution, switching to another option incurs significant costs.

**Data Migration Cost**: If you initially choose containerized database deployment, then later switch to an external independent database, complex data migration is necessary. This includes exporting, importing, and validating data consistency for MongoDB, PostgreSQL, and Redis. Data migration risks data loss or corruption, especially with large volumes of knowledge base and user session data. If object storage switches from an in-container MinIO to an external MinIO, file data migration and path updates are also required.

**Index Reconstruction Cost**: FastGPT uses a vector database for knowledge base indexing. Changing database instances or adjusting storage strategies may require rebuilding or synchronizing indexes. If duplicate data exists in MongoDB, enabling index synchronization can cause an `E11000 duplicate key error`. Index reconstruction is a compute-intensive task. It consumes significant time and computing resources. This can affect system query performance and availability.

**Downtime Window Cost**: Any switch involving core components (database, object storage, FastGPT main service) requires a downtime window. In production, this means business interruption for users. The downtime length depends on data volume, migration complexity, and thoroughness of validation. Underestimation can lead to longer-than-expected downtime.

**Validation Effort Cost**: After switching solutions, you must perform comprehensive regression testing and performance validation of the entire system. This includes all FastGPT main service functions, knowledge base import and query, model calls, file upload/download, and plugin features. Verify all environment variables, network configurations, and inter-service communications are normal. Ensure system stability and performance meet expectations under the new solution. For example, Nginx proxy configuration, sandbox component API Key consistency, and correctness of various keys (`TOKEN_KEY`, `AES256_SECRET_KEY`, `FILE_TOKEN_KEY`) all require re-validation.

**Environment Configuration and Network Adjustment Cost**: Changing deployment solutions typically means extensive modifications to `docker-compose.yml` files, environment variables, internal network routing, and firewall rules. For instance, removing a database from `depends_on` and configuring an external connection address, or adjusting MinIO's `STORAGE_EXTERNAL_ENDPOINT`. These adjustments require specialized network and operations knowledge. They can easily introduce new configuration errors, leading to system instability.

## When this decision can wait
In specific scenarios, you can defer detailed decisions about no-egress environment deployment. However, you must define preconditions and subsequent triggers. If initial business AI needs are unclear, or FastGPT runs as a Proof of Concept (PoC) in an isolated but controlled test environment, and that environment **temporarily** has limited external network access (e.g., image pulling and initial configuration via a jump server or temporary network policy), you can temporarily deploy using public image repositories.

Additionally, if FastGPT primarily handles **non-sensitive data** and **does not involve external AI model calls**, using only its local computing and storage capabilities, then detailed evaluation of external AI model access paths and proxy support can wait. In this case, deploy core services first. Then, as business needs become clear or data sensitivity increases, thoroughly evaluate and implement fully offline or restricted intranet solutions.

However, this decision must become a priority immediately if any of the following conditions occur:
1. The project moves from PoC to production deployment, increasing data sensitivity.
2. The deployment environment will permanently disconnect from the external network.
3. Business needs begin to rely on external AI models or require integration of more external services.
4. You need to upgrade versions or introduce new components, and cannot obtain required resources via temporary external network access.

Deferring this decision requires manageable risks and clear triggers. Otherwise, it creates future deployment and operational problems.

## Keep reading

- [Chunking by Document Type: How Each Class Splits and What Values to Use](/en/guide/chunking-strategy-selection)
- [When an Index Must Be Rebuilt: Triggers, Cost and Migration Paths](/en/guide/index-rebuild-and-migration)

## References

- [FastGPT environment variables](https://doc.fastgpt.cn/zh-CN/self-host/config/env)
- [FastGPT Docker Compose deployment](https://doc.fastgpt.cn/zh-CN/self-host/deploy/docker)

## Next steps

The criteria above can be checked against public documentation and a test deployment. To decide against a specific workload, data boundary and operations setup, contact sales for an assessment; the cloud service can be used first to validate feasibility before choosing a deployment form.

- Contact sales: assess the choice against your conditions
- Get started: validate feasibility on the cloud service
- Pricing: compare what each form covers
