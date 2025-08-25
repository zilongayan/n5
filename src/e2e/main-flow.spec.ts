import { test, expect } from '@playwright/test';

test.describe('Main User Flow', () => {
  test('should navigate from home to manga to chapter', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Wait for content to load
    await page.waitForSelector('[data-testid="manga-grid"]', { timeout: 10000 });
    
    // Check if popular manga section is visible
    const popularSection = page.locator('text=Trending now');
    await expect(popularSection).toBeVisible();
    
    // Click on first manga in popular section
    const firstManga = page.locator('[data-testid="manga-card"]').first();
    await expect(firstManga).toBeVisible();
    
    const mangaTitle = await firstManga.locator('h3').textContent();
    await firstManga.click();
    
    // Should navigate to manga detail page
    await page.waitForURL(/\/gallery\//);
    await expect(page.locator('h1')).toContainText(mangaTitle || '');
    
    // Check if chapters are loaded
    await page.waitForSelector('[data-testid="chapter-list"]', { timeout: 10000 });
    
    // Click on first chapter
    const firstChapter = page.locator('[data-testid="chapter-item"]').first();
    await expect(firstChapter).toBeVisible();
    
    const chapterTitle = await firstChapter.locator('[data-testid="chapter-title"]').textContent();
    await firstChapter.click();
    
    // Should navigate to reader page
    await page.waitForURL(/\/reader\//);
    
    // Check if reader toolbar is visible
    await expect(page.locator('[data-testid="reader-toolbar"]')).toBeVisible();
    
    // Check if first page is loaded
    await page.waitForSelector('[data-testid="manga-page"]', { timeout: 10000 });
    
    // Test reader navigation
    const nextButton = page.locator('[data-testid="next-page"]');
    await expect(nextButton).toBeVisible();
    
    // Test keyboard navigation
    await page.keyboard.press('ArrowRight');
    
    // Should navigate to next page
    await expect(page.locator('[data-testid="current-page"]')).toContainText('2');
  });

  test('should handle search functionality', async ({ page }) => {
    // Navigate to search page
    await page.goto('/search');
    
    // Check if search form is visible
    await expect(page.locator('[data-testid="search-form"]')).toBeVisible();
    
    // Type search query
    const searchInput = page.locator('[data-testid="search-input"]');
    await searchInput.fill('action');
    await searchInput.press('Enter');
    
    // Should show search results
    await page.waitForSelector('[data-testid="search-results"]', { timeout: 10000 });
    
    // Check if results contain search term
    const results = page.locator('[data-testid="manga-card"]');
    await expect(results).toHaveCount.greaterThan(0);
  });

  test('should handle tag filtering', async ({ page }) => {
    // Navigate to search page
    await page.goto('/search');
    
    // Check if tag filter is visible
    await expect(page.locator('[data-testid="tag-filter"]')).toBeVisible();
    
    // Click on a genre tag
    const actionTag = page.locator('text=Action').first();
    await actionTag.click();
    
    // Should update URL with tag parameter
    await page.waitForURL(/tags=/);
    
    // Should show filtered results
    await page.waitForSelector('[data-testid="search-results"]', { timeout: 10000 });
  });

  test('should handle language switching', async ({ page }) => {
    // Navigate to home page
    await page.goto('/');
    
    // Check if language switcher is visible
    await expect(page.locator('[data-testid="language-switcher"]')).toBeVisible();
    
    // Click on language switcher
    const languageButton = page.locator('[data-testid="language-button"]');
    await languageButton.click();
    
    // Should show language options
    await expect(page.locator('[data-testid="language-options"]')).toBeVisible();
    
    // Click on French
    const frenchOption = page.locator('text=Français');
    await frenchOption.click();
    
    // Should navigate to French version
    await page.waitForURL(/\/fr/);
    
    // Check if content is in French
    await expect(page.locator('text=Accueil')).toBeVisible();
  });

  test('should handle responsive design', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu is accessible
    const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
    await expect(mobileMenuButton).toBeVisible();
    
    // Click mobile menu
    await mobileMenuButton.click();
    
    // Should show mobile menu
    await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.reload();
    
    // Check if desktop navigation is visible
    await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
  });
});
