#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

function fail(surface, message) {
  throw new Error(`[purge-cloudflare-cache] surface=${surface} ${message}`);
}

function parseArgs(argv) {
  const options = { urls: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--dry-run') options.dryRun = true;
    else if (token === '--url') options.urls.push(argv[++index]);
    else if (token === '--urls') {
      try { options.urls.push(...JSON.parse(argv[++index])); } catch { fail('arguments', '--urls must be a JSON array'); }
    } else if (token === '--urls-file') {
      try { options.urls.push(...JSON.parse(fs.readFileSync(argv[++index], 'utf8'))); } catch { fail('arguments', '--urls-file must contain a JSON array'); }
    } else if (token === '--zone-id') options.zoneId = argv[++index];
    else if (token === '--evidence-out') options.evidenceOut = argv[++index];
    else if (token === '--help' || token === '-h') return { help: true };
    else fail('arguments', `unknown argument ${token}`);
  }
  return options;
}

function validateUrls(urls) {
  if (!Array.isArray(urls) || !urls.length) fail('url', 'at least one HTTPS URL is required');
  const unique = [...new Set(urls)];
  for (const value of unique) {
    let url;
    try { url = new URL(value); } catch { fail('url', `invalid URL ${value}`); }
    if (url.protocol !== 'https:' || !['fastgpt.io', 'fastgpt.cn'].includes(url.hostname)) {
      fail('url', `URL must be an owned HTTPS URL: ${value}`);
    }
  }
  return unique;
}

function writeEvidence(options, result) {
  if (!options.evidenceOut) return;
  fs.mkdirSync(path.dirname(path.resolve(options.evidenceOut)), { recursive: true });
  fs.writeFileSync(options.evidenceOut, `${JSON.stringify(result, null, 2)}\n`);
}

async function purgeCloudflareCache(options) {
  const urls = validateUrls(options.urls);
  const result = { schemaVersion: 1, timestamp: new Date().toISOString(), urls, status: options.dryRun ? 'dry-run' : 'blocked-missing-credentials' };
  if (options.dryRun) { writeEvidence(options, result); return result; }
  const zoneId = options.zoneId || process.env.CLOUDFLARE_ZONE_ID;
  const token = options.token || process.env.CLOUDFLARE_API_TOKEN;
  if (!zoneId || !token) {
    writeEvidence(options, result);
    fail('credentials', 'CLOUDFLARE_ZONE_ID and CLOUDFLARE_API_TOKEN are required for live purge');
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  let response;
  try {
    response = await (options.fetchImpl || fetch)(`https://api.cloudflare.com/client/v4/zones/${encodeURIComponent(zoneId)}/purge_cache`, {
      method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: urls }), signal: controller.signal
    });
  } catch (error) {
    fail('request', `purge request failed: ${error.name}`);
  } finally { clearTimeout(timeout); }
  let body;
  try { body = await response.json(); } catch { fail('response', 'provider response was not JSON'); }
  result.status = response.ok && body.success ? 'completed' : 'failed';
  result.httpStatus = response.status;
  result.success = Boolean(body.success);
  result.errors = Array.isArray(body.errors) ? body.errors.map(({ code, message }) => ({ code, message })) : [];
  writeEvidence(options, result);
  if (result.status !== 'completed') fail('response', `status=${response.status} purge failed`);
  return result;
}

async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  if (options.help) { console.log('Usage: purge-cloudflare-cache --url <https URL> [--dry-run] [--evidence-out file]'); return; }
  const result = await purgeCloudflareCache(options);
  console.log(`[purge-cloudflare-cache] status=${result.status} urls=${result.urls.length}`);
}

if (require.main === module) main().catch((error) => { console.error(error.message); process.exitCode = 1; });

module.exports = { parseArgs, purgeCloudflareCache };
