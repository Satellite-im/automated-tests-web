import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class PreLoadingScreen extends MainPage {
  readonly page: Page;
  readonly loadingHeader: Locator;
  readonly loadingMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.loadingHeader = page.locator(".small");
    this.loadingMessage = page.locator(".text.medium");
  }

  async validatePreLoadingPage() {
    await this.validateLoadingHeader();
    await this.validateLoadingMessage();
    expect(this.page.url()).toContain("/pre");
  }

  async validateLoadingHeader() {
    await expect(this.loadingHeader).toBeVisible();
    await expect(this.loadingHeader).toHaveText("Initializing...");
  }

  async validateLoadingMessage() {
    await expect(this.loadingMessage).toBeVisible();
    await expect(this.loadingMessage).toHaveText(
      "Fetching your friends from space.",
    );
  }
}
