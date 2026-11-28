import { type Locator, type Page } from '@playwright/test';

export class HomePage {
  private readonly page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly searchCaption: Locator;
  private readonly searchResults: Locator;
  private readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.searchCaption = page.locator('[data-test="search-caption"]');
    this.searchResults = page.locator('[data-test="search_completed"]');
    this.productNames = this.searchResults.locator('[data-test="product-name"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async searchFor(term: string) {
    await this.searchInput.fill(term);
    await this.searchButton.click();
  }

  async getSearchCaptionText(): Promise<string> {
    return (await this.searchCaption.textContent()) ?? '';
  }

  get resultsLocator(): Locator {
    return this.searchResults;
  }

  async getProductNames(): Promise<string[]> {
    const names = await this.productNames.allTextContents();
    return names.map((name) => name.trim());
  }
}