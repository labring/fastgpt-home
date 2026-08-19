#!/bin/sh

set -eu

home_root=$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)
customers_root=${CUSTOMERS_APP_DIR:-}
gateway_image=${CUSTOMERS_HOME_IMAGE:-fastgpt-home-customers:test}
gateway_port=${CUSTOMERS_GATEWAY_PORT:-18080}
origin_port=${CUSTOMERS_ORIGIN_PORT:-18443}
admin_port=${CUSTOMERS_ADMIN_PORT:-3101}
test_secret=customers_proxy_local_test_secret_0123456789abcdef
previous_test_secret=customers_proxy_previous_test_secret_0123456789abc
test_id=$$
network_name=customers-proxy-test-$test_id
gateway_name=customers-gateway-test-$test_id
origin_name=customers-origin-test-$test_id
ca_source_name=customers-ca-source-$test_id
temp_dir=$(mktemp -d "${TMPDIR:-/tmp}/customers-proxy-test.XXXXXX")
customers_pid=
admin_pid=

cleanup() {
  if [ -n "$customers_pid" ]; then
    kill "$customers_pid" >/dev/null 2>&1 || true
    wait "$customers_pid" >/dev/null 2>&1 || true
  fi
  if [ -n "$admin_pid" ]; then
    kill "$admin_pid" >/dev/null 2>&1 || true
    wait "$admin_pid" >/dev/null 2>&1 || true
  fi
  docker rm -f "$gateway_name" "$origin_name" "$ca_source_name" >/dev/null 2>&1 || true
  docker network rm "$network_name" >/dev/null 2>&1 || true
  rm -rf "$temp_dir"
}
trap cleanup EXIT INT TERM

if [ -z "$customers_root" ]; then
  echo 'CUSTOMERS_APP_DIR must point to the fastgpt-customers repository' >&2
  exit 1
fi
if [ ! -f "$customers_root/.next/standalone/server.js" ]; then
  echo 'Missing customers standalone build; run pnpm build in fastgpt-customers first' >&2
  exit 1
fi
if [ ! -f "$customers_root/.next-admin/standalone/server.js" ]; then
  echo 'Missing admin standalone build; run pnpm build:admin in fastgpt-customers first' >&2
  exit 1
fi

for command_name in curl docker node openssl pnpm; do
  command -v "$command_name" >/dev/null 2>&1 || {
    echo "Missing required command: $command_name" >&2
    exit 1
  }
done
docker info >/dev/null
docker image inspect "$gateway_image" >/dev/null

openssl req -x509 -newkey rsa:2048 -nodes -days 1 \
  -keyout "$temp_dir/server.key" \
  -out "$temp_dir/server.crt" \
  -subj '/CN=customers-origin.test' \
  -addext 'subjectAltName=DNS:customers-origin.test,IP:127.0.0.1' \
  >/dev/null 2>&1

docker create --name "$ca_source_name" "$gateway_image" >/dev/null
docker cp "$ca_source_name:/etc/ssl/certs/ca-certificates.crt" "$temp_dir/ca-bundle.crt"
openssl x509 -in "$temp_dir/server.crt" -outform PEM >> "$temp_dir/ca-bundle.crt"
docker rm "$ca_source_name" >/dev/null

(
  cd "$customers_root"
  HOSTNAME=0.0.0.0 \
  PORT=3100 \
    SITE_URL=https://fastgpt.cn/customers \
    CUSTOMERS_PROXY_SECRET=$test_secret \
    CUSTOMERS_PROXY_SECRET_PREVIOUS=$previous_test_secret \
    exec node .next/standalone/server.js > "$temp_dir/customers.log" 2>&1
) &
customers_pid=$!

(
  cd "$customers_root"
  HOSTNAME=0.0.0.0 \
  PORT=$admin_port \
    ADMIN_PORTAL=true \
    NEXT_PUBLIC_ADMIN_PORTAL=true \
    exec node .next-admin/standalone/server.js > "$temp_dir/admin.log" 2>&1
) &
admin_pid=$!

attempt=0
until curl -fsS -H "X-Customers-Proxy-Secret: $test_secret" \
  http://127.0.0.1:3100/customers/api/customers >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo 'Customers standalone server did not become ready' >&2
    cat "$temp_dir/customers.log" >&2
    exit 1
  fi
  sleep 1
done

attempt=0
until curl -fsS "http://127.0.0.1:$admin_port/login" >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo 'Customers admin standalone server did not become ready' >&2
    cat "$temp_dir/admin.log" >&2
    exit 1
  fi
  sleep 1
done

docker network create "$network_name" >/dev/null
docker run --rm -d \
  --name "$origin_name" \
  --network "$network_name" \
  --network-alias customers-origin.test \
  --add-host host.docker.internal:host-gateway \
  -p "$origin_port:443" \
  -v "$home_root/scripts/fixtures/customers-origin-nginx.conf:/etc/nginx/nginx.conf:ro" \
  -v "$temp_dir/server.crt:/etc/nginx/tls/server.crt:ro" \
  -v "$temp_dir/server.key:/etc/nginx/tls/server.key:ro" \
  nginx:1.27-alpine >/dev/null

docker run --rm -d \
  --name "$gateway_name" \
  --network "$network_name" \
  -p "$gateway_port:80" \
  -e CUSTOMERS_PROXY_ENABLED=true \
  -e CUSTOMERS_ORIGIN_HOST=customers-origin.test \
  -e CUSTOMERS_PROXY_SECRET=$test_secret \
  -e CUSTOMERS_DNS_RESOLVER=127.0.0.11 \
  -v "$temp_dir/ca-bundle.crt:/etc/ssl/certs/ca-certificates.crt:ro" \
  "$gateway_image" >/dev/null

attempt=0
until curl -fsS "http://127.0.0.1:$gateway_port/" >/dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ "$attempt" -ge 30 ]; then
    echo 'Home gateway did not become ready' >&2
    docker logs "$gateway_name" >&2 || true
    exit 1
  fi
  sleep 1
done

NODE_EXTRA_CA_CERTS="$temp_dir/server.crt" \
  CUSTOMERS_VERIFY_URL="http://127.0.0.1:$gateway_port/customers" \
  CUSTOMERS_VERIFY_CANONICAL_URL=https://fastgpt.cn/customers \
  CUSTOMERS_VERIFY_ORIGIN_URL="https://127.0.0.1:$origin_port" \
  CUSTOMERS_VERIFY_ADMIN_URL="http://127.0.0.1:$admin_port" \
  CUSTOMERS_PROXY_SECRET=$test_secret \
  CUSTOMERS_PROXY_SECRET_PREVIOUS=$previous_test_secret \
  node "$home_root/scripts/verify-customers-proxy.js"

(
  cd "$customers_root"
  pnpm tsx scripts/verify-case-seo.ts \
    --host "http://127.0.0.1:$gateway_port/customers" \
    --canonical-host https://fastgpt.cn/customers \
    --sample 10
)

docker stop "$origin_name" >/dev/null
customers_failure_status=$(curl -sS -o /dev/null -w '%{http_code}' \
  "http://127.0.0.1:$gateway_port/customers")
case "$customers_failure_status" in
  502 | 504) ;;
  *)
    echo "Expected customers upstream failure to return 502/504, received $customers_failure_status" >&2
    exit 1
    ;;
esac

main_site_status=$(curl -sS -o /dev/null -w '%{http_code}' \
  "http://127.0.0.1:$gateway_port/")
if [ "$main_site_status" != 200 ]; then
  echo "Main site failed during customers outage with status $main_site_status" >&2
  exit 1
fi

echo 'Customers Docker proxy regression passed'
