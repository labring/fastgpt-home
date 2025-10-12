import { test, expect } from '@playwright/test';

test.describe('FAQ Feature Disabled Tests', () => {
  test.beforeAll(async () => {
    // Ensure NEXT_PUBLIC_FAQ is not set
    expect(process.env.NEXT_PUBLIC_FAQ).not.toBe('true');
  });

  test('FAQ list page should return 404 when disabled', async ({ page }) => {
    const response = await page.goto('/en/faq');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show 404 page, not FAQ content
    const pageTitle = await page.title();
    expect(pageTitle).not.toContain('FAQ');
  });

  test('FAQ detail page should return 404 when disabled', async ({ page }) => {
    const response = await page.goto('/en/faq/Can-AI-automatically-generate-FAQ');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Should show 404 page
    const pageTitle = await page.title();
    expect(pageTitle).not.toContain('Can AI');
  });

  test('FAQ routes should not be in sitemap', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    const sitemap = await response.text();

    // FAQ URLs should not be present
    expect(sitemap).not.toContain('/faq');
  });

  test('robots.txt should not reference FAQ routes', async ({ request }) => {
    const response = await request.get('/robots.txt');
    const robots = await response.text();

    // FAQ should not be explicitly allowed
    expect(robots).not.toContain('Allow: /faq');
  });

  test('Search engines should not index FAQ pages', async ({ page }) => {
    const response = await page.goto('/en/faq', { waitUntil: 'networkidle' });

    if (response?.status() === 200) {
      // If somehow the page loads, check for noindex meta tag
      const noindex = await page.locator('meta[name="robots"][content*="noindex"]').count();
      expect(noindex).toBeGreaterThan(0);
    }
  });

  test('Built static files should not contain FAQ pages', async ({ request }) => {
    // Check if static FAQ files exist
    const faqPages = [
      '/en/faq.html',
      '/zh/faq.html',
      '/ja/faq.html'
    ];

    for (const faqPage of faqPages) {
      const response = await request.get(faqPage);
      expect(response.status()).toBe(404);
    }
  });

  test('Home page should not show FAQ section link when disabled', async ({ page }) => {
    await page.goto('/en');

    // Check that FAQ link is not present in navigation or home page
    const faqLink = await page.locator('a[href*="/faq"]').count();
    expect(faqLink).toBe(0);
  });
});

test.describe('FAQ Feature Enabled Tests (Comparison)', () => {
  test.skip(({ }, testInfo) => {
    // Skip if NEXT_PUBLIC_FAQ is not 'true'
    return process.env.NEXT_PUBLIC_FAQ !== 'true';
  });

  test('FAQ list page should return 200 when enabled', async ({ page }) => {
    const response = await page.goto('/en/faq');
    expect(response?.status()).toBe(200);

    const pageTitle = await page.title();
    expect(pageTitle).toContain('FAQ');
  });
});
