# Install dependencies only when needed
FROM node:20.14.0-alpine AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add libc6-compat
WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_BAIDU_TONGJI
ARG NEXT_PUBLIC_BAIDU_KEY
ARG NEXT_PUBLIC_HOME_URL
ARG NEXT_PUBLIC_USER_URL
ARG NEXT_PUBLIC_FILING_ADDRESS
ARG NEXT_PUBLIC_POLICE_FILING
ARG NEXT_PUBLIC_RYBBIT_TONGJI
ARG NEXT_PUBLIC_RYBBIT_TONGJI_SITEID

ENV NEXT_PUBLIC_BAIDU_TONGJI=$NEXT_PUBLIC_BAIDU_TONGJI
ENV NEXT_PUBLIC_BAIDU_KEY=$NEXT_PUBLIC_BAIDU_KEY
ENV NEXT_PUBLIC_HOME_URL=$NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_USER_URL=$NEXT_PUBLIC_USER_URL
ENV NEXT_PUBLIC_FILING_ADDRESS=$NEXT_PUBLIC_FILING_ADDRESS
ENV NEXT_PUBLIC_POLICE_FILING=$NEXT_PUBLIC_POLICE_FILING
ENV NEXT_PUBLIC_RYBBIT_TONGJI=$NEXT_PUBLIC_RYBBIT_TONGJI
ENV NEXT_PUBLIC_RYBBIT_TONGJI_SITEID=$NEXT_PUBLIC_RYBBIT_TONGJI_SITEID

# copy packages and one project
COPY . ./

# Replace URLs in files (fix sed -i syntax for Alpine Linux)
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://doc.fastgpt.io" | xargs -r sed -i "s#https://doc.fastgpt.io#https://doc.fastgpt.cn#g"
RUN find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | xargs grep -l "https://cloud.fastgpt.io" | xargs -r sed -i "s#https://cloud.fastgpt.io#https://cloud.fastgpt.cn#g"
RUN if [ -f lib/i18n.ts ]; then sed -i "s/defaultLocale = \"en\"/defaultLocale = \"zh\"/g" lib/i18n.ts; fi

RUN npm install
RUN npm run build

FROM fholzer/nginx-brotli:latest

LABEL org.opencontainers.image.source="https://github.com/labring/fastgpt-home"

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf