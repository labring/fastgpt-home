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
ARG SITE_URL

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
ENV SITE_URL=$SITE_URL

RUN test "$NEXT_PUBLIC_SITE_VARIANT" = "cn" || (echo "Docker publication supports only NEXT_PUBLIC_SITE_VARIANT=cn" >&2; exit 1)

# copy packages and one project
COPY . ./

# Replace URLs in files (fix sed -i syntax for Alpine Linux)
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://doc.fastgpt.io" | xargs -r sed -i "s#https://doc.fastgpt.io#https://doc.fastgpt.cn#g"
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://cloud.fastgpt.io" | xargs -r sed -i "s#https://cloud.fastgpt.io#https://cloud.fastgpt.cn#g"

RUN npm install
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

LABEL org.opencontainers.image.source="https://github.com/labring/fastgpt-home"

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000

# 站点公开地址（SEO 关键），运行期由 K8s 环境变量可覆盖。
ARG SITE_URL
ENV SITE_URL=$SITE_URL

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# 纵深防御：standalone 产物会原样复制根目录 .env（含生产密钥），
# .dockerignore 是唯一防线；镜像层内显式删除，防止密钥进入镜像可被解层提取。
RUN rm -f .env .env.local .env.production .env.*.local

RUN addgroup -S nodeapp && adduser -S nodeapp -G nodeapp \
    && mkdir -p /app/.next/cache \
    && chown -R nodeapp:nodeapp /app
USER nodeapp

EXPOSE 3000

CMD ["node", "server.js"]
