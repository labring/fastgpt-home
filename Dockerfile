# Install dependencies only when needed
FROM node:22-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add libc6-compat
WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_BAIDU_TONGJI
ARG NEXT_PUBLIC_BAIDU_KEY
ARG NEXT_PUBLIC_HOME_URL
ARG NEXT_PUBLIC_SITE_VARIANT
ARG NEXT_PUBLIC_CN_HOME_URL
ARG NEXT_PUBLIC_IO_HOME_URL
ARG NEXT_PUBLIC_USER_URL
ARG NEXT_PUBLIC_FILING_ADDRESS
ARG NEXT_PUBLIC_POLICE_FILING
ARG NEXT_PUBLIC_RYBBIT_TONGJI
ARG NEXT_PUBLIC_RYBBIT_TONGJI_SITEID
ARG NEXT_PUBLIC_CRM_API_URL
ARG NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN=.fastgpt.cn
ARG NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE
ARG NEXT_PUBLIC_ATTRIBUTION_SOURCE

ENV NEXT_PUBLIC_BAIDU_TONGJI=$NEXT_PUBLIC_BAIDU_TONGJI
ENV NEXT_PUBLIC_BAIDU_KEY=$NEXT_PUBLIC_BAIDU_KEY
ENV NEXT_PUBLIC_HOME_URL=$NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_SITE_VARIANT=$NEXT_PUBLIC_SITE_VARIANT
ENV NEXT_PUBLIC_CN_HOME_URL=$NEXT_PUBLIC_CN_HOME_URL
ENV NEXT_PUBLIC_IO_HOME_URL=$NEXT_PUBLIC_IO_HOME_URL
ENV NEXT_PUBLIC_USER_URL=$NEXT_PUBLIC_USER_URL
ENV NEXT_PUBLIC_FILING_ADDRESS=$NEXT_PUBLIC_FILING_ADDRESS
ENV NEXT_PUBLIC_POLICE_FILING=$NEXT_PUBLIC_POLICE_FILING
ENV NEXT_PUBLIC_RYBBIT_TONGJI=$NEXT_PUBLIC_RYBBIT_TONGJI
ENV NEXT_PUBLIC_RYBBIT_TONGJI_SITEID=$NEXT_PUBLIC_RYBBIT_TONGJI_SITEID
ENV NEXT_PUBLIC_CRM_API_URL=$NEXT_PUBLIC_CRM_API_URL
ENV NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN=$NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN
ENV NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE=$NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE
ENV NEXT_PUBLIC_ATTRIBUTION_SOURCE=$NEXT_PUBLIC_ATTRIBUTION_SOURCE

RUN test "$NEXT_PUBLIC_SITE_VARIANT" = "cn" || (echo "Docker publication supports only NEXT_PUBLIC_SITE_VARIANT=cn" >&2; exit 1)

# copy packages and one project
COPY . ./

# Replace URLs in files (fix sed -i syntax for Alpine Linux)
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://doc.fastgpt.io" | xargs -r sed -i "s#https://doc.fastgpt.io#https://doc.fastgpt.cn#g"
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://cloud.fastgpt.io" | xargs -r sed -i "s#https://cloud.fastgpt.io#https://cloud.fastgpt.cn#g"

RUN npm install
RUN npm run build

# Immutable release path: CI extracts a checksum-verified release-out tree before build.
FROM fholzer/nginx-brotli@sha256:1982def7c54f70db5186b30fa2e4a1fdf6116f42b45d95627594bd872a75cf6e AS release-runtime
ARG RELEASE_SOURCE_COMMIT
ARG RELEASE_TREE_DIGEST
ARG RELEASE_ROLLBACK_TARGET
ARG RELEASE_ARTIFACT_ID
ARG RELEASE_PROVIDER
COPY release-out/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/security-headers.conf
COPY nginx-embeddable-security-headers.conf /etc/nginx/embeddable-security-headers.conf
COPY release-out/__release/nginx-redirects.conf /etc/nginx/generated-redirects.conf
RUN test -n "$RELEASE_SOURCE_COMMIT" && test -n "$RELEASE_TREE_DIGEST" && test -n "$RELEASE_ARTIFACT_ID" && test "$RELEASE_PROVIDER" = "kubernetes" \
  && test -s /etc/nginx/generated-redirects.conf \
  && sed -i "s/__RELEASE_REVISION__/$RELEASE_ARTIFACT_ID/g; s/__RELEASE_ARTIFACT__/$RELEASE_TREE_DIGEST/g" /etc/nginx/conf.d/default.conf \
  && nginx -t

FROM fholzer/nginx-brotli@sha256:1982def7c54f70db5186b30fa2e4a1fdf6116f42b45d95627594bd872a75cf6e AS runtime

LABEL org.opencontainers.image.source="https://github.com/labring/fastgpt-home"

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx-security-headers.conf /etc/nginx/security-headers.conf
COPY --from=builder /app/.next/nginx-redirects.conf /etc/nginx/generated-redirects.conf
COPY nginx-embeddable-security-headers.conf /etc/nginx/embeddable-security-headers.conf
RUN nginx -t
