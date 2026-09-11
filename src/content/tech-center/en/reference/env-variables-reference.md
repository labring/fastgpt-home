---
title: FastGPT Environment Variables Reference
slug: /en/reference/env-variables-reference
page_type: Reference data
source: https://github.com/labring/FastGPT/blob/5957d06807ff7f984c70c6425c8d0fc40eb1714d/projects/app/.env.template
source_type: 官方文档
meta_title: FastGPT Environment Variables Reference | FastGPT Technical Center
meta_description: A grouped reference of the 137 environment variables defined in the FastGPT community edition configuration template, with defaults and official notes.
schema_type: TechArticle
date_published: 2026-09-08
date_modified: 2026-09-08
source_file: 程序化技术页-第6批/英文-fastgpt.io/reference/env-variables-reference.md
source_sha256: 35e227f8383326a3863b7df2da4b43acea6b29c2dcce5a4dbb1ecec696638e2b
source_verified: 2026-09-07
publication_batch: Week08
---

# FastGPT Environment Variables Reference

This table describes FastGPT development snapshot 5957d06 (2026-09-07). Development definitions can precede a stable release; check the version you deploy.

## How to use this table

This page lists the 137 environment variables available in the FastGPT community edition, grouped by purpose, with the default from the configuration template and whether the line is enabled by default. Environment variables are the most common source of deployment and upgrade problems; this table exists so the values can be checked without cloning the repository.

## Columns

| Column | Meaning |
| --- | --- |
| Variable | The key name in the configuration file. Case sensitive |
| Default | The value given in the template. Empty means no default is provided and the value must be set for the environment. Secrets, tokens and passwords are marked as sample values and are not printed here |
| Enabled | Yes means the line is active in the template; Optional means the line is commented out and can be enabled as needed |
| Notes | The official comment above that variable in the template, translated from Chinese |

## Service endpoints and integrations (34)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `PRO_URL` | — | Optional | Commercial version address |
| `PRO_TOKEN` | — | Optional | — |
| `CRM_API_URL` | `https://crm.example.com/api/v1` | Optional | Official website visitor attribution CRM (no identity reporting if address not configured) |
| `CRM_API_KEY` | — | Optional | — |
| `PLUGIN_BASE_URL` | `http://localhost:3004` | Yes | Plugin service |
| `PLUGIN_TOKEN` | sample value (**must be replaced**) | Yes | — |
| `CODE_SANDBOX_URL` | `http://localhost:3002` | Yes | Code sandbox service |
| `CODE_SANDBOX_TOKEN` | sample value (**must be replaced**) | Yes | — |
| `AIPROXY_API_ENDPOINT` | `http://localhost:3010` | Yes | AI Proxy API |
| `AIPROXY_API_TOKEN` | sample value (**must be replaced**) | Yes | — |
| `SSE_MCP_SERVER_PROXY_ENDPOINT` | `http://localhost:3003` | Yes | MCP Server proxy address, used for splicing SSE address on MCP usage page (do not add trailing /) |
| `MARKETPLACE_URL` | `https://v2.marketplace.fastgpt.cn` | Yes | Plugin marketplace address |
| `AGENT_SANDBOX_PROVIDER` | — | Yes | Agent sandbox |
| `AGENT_SANDBOX_SEALOS_BASEURL` | — | Yes | Sealos devbox |
| `AGENT_SANDBOX_SEALOS_TOKEN` | — | Yes | — |
| `AGENT_SANDBOX_SEALOS_IMAGE` | — | Yes | — |
| `AGENT_SANDBOX_SEALOS_WORK_DIRECTORY` | `/home/devbox/workspace` | Yes | — |
| `AGENT_SANDBOX_CPU_COUNT` | `1` | Yes | Agent Sandbox per-instance CPU core count and memory limit (MiB) |
| `AGENT_SANDBOX_MEMORY_MIB` | `2048` | Yes | — |
| `AGENT_SANDBOX_STORAGE_SIZE_GI` | `1` | Yes | Agent Sandbox storage capacity, unit Gi |
| `AGENT_SANDBOX_OPENSANDBOX_BASEURL` | `http://localhost:8090` | Yes | OpenSandbox configuration (effective when PROVIDER=opensandbox) |
| `AGENT_SANDBOX_OPENSANDBOX_API_KEY` | sample value (**must be replaced**) | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_RUNTIME` | `docker` | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_IMAGE` | `registry.cn-hangzhou.aliyuncs.com/fastgpt/fastgpt-agent-sandbox:v0.1` | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_USE_SERVER_PROXY` | `true` | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_URL` | `http://localhost:3005` | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_MANAGER_TOKEN` | sample value (**must be replaced**) | Yes | — |
| `AGENT_SANDBOX_OPENSANDBOX_VOLUME_NAME_PREFIX` | `fastgpt-session` | Yes | — |
| `AGENT_SANDBOX_MAX_EDIT_DEBUG` | `100` | Yes | Max number of active editing/debugging sandboxes |
| `AGENT_SANDBOX_SUSPEND_MINUTES` | `60` | Yes | Auto-pause timeout (minutes) for running Agent Sandbox after continuous inactivity |
| `AGENT_SANDBOX_ARCHIVE_INACTIVE_DAYS` | `7` | Yes | Auto-archive suspended Agent sandboxes after days of continuous inactivity |
| `AGENT_SANDBOX_NPM_REGISTRY` | — | Yes | npm registry used by npm/yarn/pnpm/bun in Agent sandbox (optional) |
| `AGENT_SANDBOX_PYPI_INDEX_URL` | — | Yes | PyPI index URL used by pip/python -m pip/uv in Agent sandbox (optional) |
| `AGENT_SANDBOX_APT_MIRROR` | — | Yes | apt mirror address used in Ubuntu or Debian Agent sandbox (optional), only valid for root; /debian-security for Debian will be automatically derived |

## Databases and cache (15)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `REDIS_URL` | `redis://default:mypassword@localhost:6379` | Yes | Redis URL |
| `STREAM_RESUME_TTL_SECONDS` | `300` | Optional | Stream restore Redis image TTL (sec): renewal during generation / shorten after completion, default 300 / 30 |
| `STREAM_RESUME_POST_COMPLETE_TTL_SECONDS` | `30` | Optional | — |
| `STREAM_RESUME_REDIS_MAXMEMORY_RATIO` | `0.8` | Optional | Stop creating recovery images for new stream requests when Redis used memory / maxmemory reaches threshold |
| `STREAM_RESUME_REDIS_MEMORY_CHECK_INTERVAL_MS` | `5000` | Optional | — |
| `MONGODB_URI` | `mongodb://myusername:mypassword@localhost:27017/fastgpt?authSource=admin&directConnection=true` | Yes | MongoDB connection parameters; add directConnection=true may be required when connecting remote database in local development |
| `MONGODB_LOG_URI` | — | Yes | Log library |
| `VECTOR_VQ_LEVEL` | `32` | Yes | Vector database priority: pg > oceanbase > milvus > opengauss. Vector quantization level: PG supports 32/16, OceanBase supports 32/8/1 |
| `PG_URL` | `postgresql://username:password@localhost:5432/postgres` | Yes | PG vector database connection parameters |
| `OCEANBASE_URL` | — | Optional | OceanBase vector database connection parameters |
| `SEEKDB_URL` | — | Optional | SeekDB vector database connection parameters |
| `MILVUS_ADDRESS` | — | Optional | Milvus vector database connection parameters (full-text retrieval automatically enables BM25 when using Milvus; version >= 2.5, recommended 2.5.16+) |
| `MILVUS_TOKEN` | — | Optional | — |
| `MILVUS_LANGUAGE_IDENTIFIER` | `lingua` | Optional | Milvus BM25 language recognition engine: lingua (default) \| whatlang |
| `OPENGAUSS_URL` | `postgresql://gaussdb:FastGPT@123@localhost:5432/fastgpt` | Optional | openGauss vector database connection parameters |

## Object storage (14)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `STORAGE_VENDOR` | `minio` | Yes | Storage provider; Fill in aws-s3 if using Sealos object storage |
| `STORAGE_REGION` | `us-east-1` | Yes | — |
| `STORAGE_ACCESS_KEY_ID` | sample value (**must be replaced**) | Yes | — |
| `STORAGE_SECRET_ACCESS_KEY` | sample value (**must be replaced**) | Yes | — |
| `STORAGE_PUBLIC_BUCKET` | `fastgpt-public` | Yes | — |
| `STORAGE_PRIVATE_BUCKET` | `fastgpt-private` | Yes | — |
| `STORAGE_EXTERNAL_ENDPOINT` | — | Yes | — |
| `STORAGE_S3_CDN_ENDPOINT` | — | Yes | — |
| `STORAGE_DOWNLOAD_URL_MODE` | `short-proxy` | Yes | Download link mode: short-proxy \| short-redirect \| presigned |
| `STORAGE_DOWNLOAD_REDIRECT_TTL_SECONDS` | `300` | Yes | Temporary S3 pre-signed download link TTL (seconds) in short-redirect mode, rarely needs modification |
| `STORAGE_S3_ENDPOINT` | `http://localhost:9000` | Yes | — |
| `STORAGE_S3_FORCE_PATH_STYLE` | `true` | Yes | — |
| `STORAGE_S3_MAX_RETRIES` | `3` | Yes | — |
| `STORAGE_PUBLIC_ACCESS_EXTRA_SUB_PATH` | — | Yes | — |

## Agent sandbox proxy and networking (3)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `AGENT_SANDBOX_PROXY_SECRET` | sample value (**must be replaced**) | Yes | JWT verification and intranet security physical blocking secret (must be exactly same as AGENT_SANDBOX_PROXY_SECRET env var of Rust Proxy). Production environment must configure as high-strength random value of at least 32 bytes, do not use example placeholder |
| `AGENT_SANDBOX_PROXY_URL` | `ws://localhost:3006` | Yes | Public WebSocket address for browser client to connect sandbox proxy. Required when Agent Sandbox (show_agent_sandbox) is enabled; leave empty otherwise. Dev env: recommend ws://localhost:3006 (points to Rust proxy in Docker Compose). Prod env: configure browser-accessible ws:// or wss:// proxy address. |
| `AGENT_SANDBOX_PREVIEW_PROXY_URL` | `http://localhost:3006` | Yes | HTTP(S) address for browser to access sandbox file preview. Required when Agent Sandbox is enabled; uses same port as WebSocket by default in single-port deployment. |

## Concurrency limits (7)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `WECHAT_CHANNEL_CONCURRENCY` | `1000` | Yes | WeChat channel poll worker concurrency (default 1000), must ≥ online channel count; message delay worsens linearly when channel count exceeds this value |
| `SYSTEM_MIGRATION_BATCH_SIZE` | `100` | Yes | Number of records processed per batch for system migration tasks, range 50～1000, default 100 |
| `PARSE_FILE_TIMEOUT_SECONDS` | `600` | Yes | File parsing timeout (seconds) |
| `WORKFLOW_MAX_RUN_TIMES` | `500` | Yes | Max workflow run times to avoid extreme infinite loops |
| `WORKFLOW_MAX_LOOP_TIMES` | `100` | Yes | Max input array length for loop/parallel nodes (default 100) |
| `WORKFLOW_PARALLEL_MAX_CONCURRENCY` | `10` | Yes | Max concurrency for parallel nodes (will clamp to [5, 100], default 10) |
| `CHAT_MAX_QPM` | `5000` | Yes | Workflow QPM (does not take effect if user plan has restrictions) |

## Resource limits (8)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `SERVICE_REQUEST_MAX_CONTENT_LENGTH` | `10` | Yes | Max request size received by server (MB) |
| `MAX_FOLDER_DEPTH` | `4` | Yes | Maximum allowed folder depth, default 4, range 2~20 (max 4 folder levels under root directory) |
| `APP_FOLDER_MAX_AMOUNT` | `1000` | Yes | Max number of application folders |
| `DATASET_FOLDER_MAX_AMOUNT` | `1000` | Yes | Max number of dataset folders |
| `UPLOAD_FILE_MAX_SIZE` | `1000` | Yes | Max upload file size (MB) |
| `UPLOAD_FILE_MAX_AMOUNT` | `1000` | Yes | Max number of upload files |
| `LLM_REQUEST_TRACKING_RETENTION_HOURS` | `6` | Yes | LLM request trace retention duration (hours) |
| `MAX_HTML_TRANSFORM_CHARS` | `1000000` | Yes | Max character count for HTML to Markdown conversion (no conversion if exceeded) |

## Knowledge base processing concurrency (4)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `DATASET_PARSE_MAX_PROCESS` | `10` | Yes | Max concurrent knowledge base file parsing queue size |
| `VECTOR_MAX_PROCESS` | `10` | Yes | Maximum concurrency of vector training queue |
| `QA_MAX_PROCESS` | `10` | Yes | Max concurrent Q&A splitting queue size |
| `VLM_MAX_PROCESS` | `10` | Yes | Max concurrency for image understanding model processing queue |

## Enhanced PDF parsing (optional) (8)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `CUSTOM_PDF_PARSE_URL` | — | Optional | Custom PDF parsing service address |
| `CUSTOM_PDF_PARSE_KEY` | — | Optional | Custom PDF parsing service secret key |
| `SOMARK_API_KEY` | — | Optional | SoMark PDF parsing service secret key |
| `DOC2X_KEY` | — | Optional | Doc2x PDF parsing service secret key |
| `TEXTIN_APP_ID` | — | Optional | Hehe Information Textin service App ID |
| `TEXTIN_SECRET_CODE` | — | Optional | Hehe Information Textin service Secret Code |
| `HNSW_EF_SEARCH` | `100` | Yes | Vector retrieval hnsw ef_search parameter, only effective for PG / OB / OpenGauss |
| `HNSW_MAX_SCAN_TUPLES` | `100000` | Yes | Maximum scanned data volume for vector retrieval, only effective for PG |

## Security (10)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `USE_IP_LIMIT` | `false` | Yes | Enable IP rate limiting (true); IP rate limiting for partial APIs to prevent abnormal requests |
| `CHECK_INTERNAL_IP` | `false` | Yes | Enable intranet IP check |
| `AUTH_COOKIE_SECURE` | `false` | Yes | Add Secure attribute to login Cookie; enable only for full-site HTTPS |
| `TRUSTED_PROXY_ENABLE` | `false` | Yes | Enable trusted reverse proxy client IP verification |
| `TRUSTED_PROXY_IPS` | — | Yes | Trusted reverse proxy IP/CIDR list, separated by comma or whitespace. Effective only when TRUSTED_PROXY_ENABLE=true; only X-Forwarded-For/X-Real-IP passed by explicitly trusted proxies will be used for client IP resolution |
| `PASSWORD_LOGIN_MINUTE_LIMIT_COUNT` | — | Yes | Password login request limit per minute (default 10) |
| `PASSWORD_EXPIRED_MONTH` | — | Yes | Password expiration months (no expiration if not set) |
| `MAX_LOGIN_SESSION` | — | Yes | Max logged-in client count (default 10) |
| `ALLOWED_ORIGINS` | — | Yes | Custom CORS; allow all CORS by default if not configured (comma-separated) |
| `MULTIPLE_DATA_TO_BASE64` | `true` | Yes | Force convert images to base64 when passing to model |

## Secrets (4)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `FILE_TOKEN_KEY` | — | Yes | Secret for file reading |
| `AES256_SECRET_KEY` | sample value (**must be replaced**) | Yes | Secret encryption key |
| `INVOKE_TOKEN_SECRET` | sample value (**must be replaced**) | Yes | Invoke reverse call JWT secret, minimum 32 bits |
| `ROOT_KEY` | sample value (**must be replaced**) | Yes | root key (highest privilege) |

## Domains and frontend (3)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `FE_DOMAIN` | `http://localhost:3000` | Yes | Required. FastGPT client access address, consisting of protocol, host and optional port, used to complete relative path resources (no trailing /) |
| `FILE_DOMAIN` | `http://localhost:3000` | Yes | File domain (also points to FastGPT service); Assign independent domain for higher security to prevent high-risk file reading from affecting main domain content |
| `NEXT_PUBLIC_BASE_URL` | `/fastai` | Optional | Secondary routing, needs to be determined during packaging |

## Logging (12)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `LOG_ENABLE_CONSOLE` | `true` | Yes | Log level: trace \| debug \| info \| warning \| error \| fatal |
| `LOG_CONSOLE_LEVEL` | `debug` | Yes | — |
| `LOG_ENABLE_OTEL` | `true` | Yes | — |
| `LOG_OTEL_LEVEL` | `info` | Yes | — |
| `LOG_OTEL_SERVICE_NAME` | `fastgpt-client` | Yes | — |
| `LOG_OTEL_URL` | `http://localhost:4318/v1/logs` | Yes | — |
| `METRICS_ENABLE_OTEL` | `true` | Yes | Metrics |
| `METRICS_OTEL_URL` | `http://localhost:4318/v1/metrics` | Yes | — |
| `METRICS_OTEL_SERVICE_NAME` | `fastgpt-client` | Yes | — |
| `TRACING_ENABLE_OTEL` | `true` | Yes | Tracing |
| `TRACING_OTEL_URL` | `http://localhost:4318/v1/traces` | Yes | — |
| `TRACING_OTEL_SERVICE_NAME` | `fastgpt-client` | Yes | — |

## Chat log forwarding (optional) (3)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `CHAT_LOG_URL` | `http://localhost:8080` | Optional | Log service address |
| `CHAT_LOG_INTERVAL` | `10000` | Optional | Log push interval |
| `CHAT_LOG_SOURCE_ID_PREFIX` | `fastgpt-` | Optional | Log source ID prefix |

## Feature flags (8)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `SHOW_COUPON` | `false` | Yes | Display redemption code function |
| `SHOW_DISCOUNT_COUPON` | `false` | Yes | Display coupon function |
| `APP_REGISTRATION_URL` | — | Yes | Address for application record filing |
| `HIDE_CHAT_COPYRIGHT_SETTING` | — | Yes | Configure copyright info hiding; hidden only if value is true |
| `WECOM_LOGIN_AUTO_REDIRECT` | `false` | Yes | Allow WeChat Work client auto-login redirect, default false |
| `OPENAPI_KEY_MAX_COUNT` | `100` | Yes | Maximum number of system API Keys that a single team member can create, minimum value is 1 |
| `AGENT_ENGINE` | `fastAgent` | Yes | Agent engine selection: fastAgent (FastGPT agent loop) \| piAgent (pi-agent-core engine) |
| `SKIP_FILE_TYPE_CHECK` | `false` | Yes | — |

## Basics (4)

| Variable | Default | Enabled | Notes |
| --- | --- | --- | --- |
| `LOG_DEPTH` | `3` | Yes | — |
| `DEFAULT_ROOT_PSW` | Example value (replace before deployment) | Yes | Default user password (username: root), auto-updated on each restart |
| `DB_MAX_LINK` | `20` | Yes | Max database connections |
| `SYNC_INDEX` | `true` | Yes | Auto-sync index |

## When this table goes out of date

1. **Upgrades add and remove variables.** Check the upgrade notes for the target version before upgrading; a removed variable left in the configuration can prevent startup.
2. **The commercial edition has its own configuration.** This table covers the community edition template only.
3. **Defaults are template values, not runtime values.** Container orchestration files, secret managers and startup arguments can all override them.
4. **An empty default does not mean the value can be left empty.** Secrets and service endpoints have no default and must be set for the environment.
5. **The Notes column is translated from the official Chinese template.** Where the wording matters, check the template itself.
6. **Every secret, token and password in the template is a sample value and must be replaced before go-live.** Keeping a template sample is the same as publishing the credential, which is why the values are not printed here.

## Next steps

The tables above can be checked against the open-source repository. If a specific deployment needs to be assessed against these values, contact sales for support; the cloud service can be used directly without preparing the environment first.

- [Contact sales](/en/contact): assess your deployment against these values
- [Get started](/en/start): use the cloud service and skip environment setup
- [Pricing](/en/price): compare what each form covers

## References

- [FastGPT env variables reference — 5957d06](https://github.com/labring/FastGPT/blob/5957d06807ff7f984c70c6425c8d0fc40eb1714d/projects/app/.env.template)
