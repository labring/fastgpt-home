# Install dependencies only when needed
FROM node:18.15-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add libc6-compat curl ca-certificates && apk update && update-ca-certificates
WORKDIR /app

# copy packages and one project
COPY package.json pnpm-lock.yaml ./

RUN [ -f pnpm-lock.yaml ] || (echo "Lockfile not found." && exit 1)

RUN [ -f pnpm-lock.yaml ] || (echo 'Lockfile not found.' && exit 1)\nRUN pnpm install

# Rebuild the source code only when needed
FROM node:18.15-alpine AS builder
WORKDIR /app

# copy common node_modules and one project node_modules
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm install
RUN pnpm run build

FROM node:18.15-alpine AS runner
WORKDIR /app

# create user and use it
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN sed -i 's/https/http/' /etc/apk/repositories
RUN apk add curl \
  && apk add ca-certificates \
  && update-ca-certificates

# copy necessary files and directories to the Docker image
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
copy --from=builder --chown=nextjs:nodejs /app/.next/standalone ./.next/standalone

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT=3000

EXPOSE 3000

USER nextjs

ENV serverPath=./server.js

ENTRYPOINT ["sh","-c","node ${serverPath}"]