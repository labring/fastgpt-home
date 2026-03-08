/**
 * IndexNow API integration
 * Notify search engines about content updates in real-time
 * https://www.indexnow.org/
 */

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const INDEXNOW_KEY = process.env.INDEXNOW_API_KEY || '';

interface IndexNowParams {
  url: string | string[];
  host?: string;
  key?: string;
  keyLocation?: string;
}

/**
 * Submit URL(s) to IndexNow
 */
export async function submitToIndexNow(params: IndexNowParams): Promise<boolean> {
  if (!INDEXNOW_KEY) {
    console.warn('IndexNow API key not configured');
    return false;
  }

  const host = params.host || process.env.NEXT_PUBLIC_HOME_URL?.replace(/^https?:\/\//, '') || 'fastgpt.io';
  const urls = Array.isArray(params.url) ? params.url : [params.url];

  try {
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        host,
        key: params.key || INDEXNOW_KEY,
        keyLocation: params.keyLocation || `https://${host}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    });

    if (response.ok) {
      console.log(`Successfully submitted ${urls.length} URL(s) to IndexNow`);
      return true;
    } else {
      console.error(`IndexNow submission failed: ${response.status} ${response.statusText}`);
      return false;
    }
  } catch (error) {
    console.error('IndexNow submission error:', error);
    return false;
  }
}

/**
 * Submit page update to IndexNow
 * Call this after content updates
 */
export async function notifyPageUpdate(path: string): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const url = `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;

  return submitToIndexNow({ url });
}

/**
 * Submit multiple pages to IndexNow
 */
export async function notifyMultiplePages(paths: string[]): Promise<boolean> {
  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const urls = paths.map(path => 
    `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
  );

  return submitToIndexNow({ url: urls });
}

/**
 * Generate IndexNow API key file content
 * Save this to public/[key].txt
 */
export function generateIndexNowKeyFile(): string {
  return INDEXNOW_KEY;
}

/**
 * Verify IndexNow key file exists
 */
export async function verifyIndexNowKey(): Promise<boolean> {
  if (!INDEXNOW_KEY) return false;

  const baseUrl = process.env.NEXT_PUBLIC_HOME_URL || 'https://fastgpt.io';
  const keyUrl = `${baseUrl}/${INDEXNOW_KEY}.txt`;

  try {
    const response = await fetch(keyUrl);
    const content = await response.text();
    return content.trim() === INDEXNOW_KEY;
  } catch (error) {
    console.error('Failed to verify IndexNow key:', error);
    return false;
  }
}

/**
 * Batch submit URLs with rate limiting
 */
export async function batchSubmitToIndexNow(
  urls: string[],
  batchSize: number = 10,
  delayMs: number = 1000
): Promise<{ success: number; failed: number }> {
  const results = { success: 0, failed: 0 };

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const success = await submitToIndexNow({ url: batch });

    if (success) {
      results.success += batch.length;
    } else {
      results.failed += batch.length;
    }

    // Delay between batches to avoid rate limiting
    if (i + batchSize < urls.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

/**
 * Submit sitemap URLs to IndexNow
 */
export async function submitSitemapToIndexNow(sitemapUrl: string): Promise<boolean> {
  try {
    const response = await fetch(sitemapUrl);
    const xml = await response.text();

    // Parse URLs from sitemap XML
    const urlMatches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
    const urls = Array.from(urlMatches).map(match => match[1]);

    if (urls.length === 0) {
      console.warn('No URLs found in sitemap');
      return false;
    }

    console.log(`Found ${urls.length} URLs in sitemap`);
    const results = await batchSubmitToIndexNow(urls);
    
    console.log(`IndexNow submission complete: ${results.success} success, ${results.failed} failed`);
    return results.failed === 0;
  } catch (error) {
    console.error('Failed to submit sitemap to IndexNow:', error);
    return false;
  }
}
