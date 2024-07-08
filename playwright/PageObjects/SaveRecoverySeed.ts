import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class SaveRecoverySeedPage extends MainPage {
  readonly page: Page;
  readonly buttonDownloadPhrase: Locator;
  readonly buttonSavedPhrase: Locator;
  readonly textRecoveryPageWarning: Locator;
  readonly titleRecoveryPage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.buttonDownloadPhrase = page.getByTestId("button-download-phrase");
    this.buttonSavedPhrase = page.getByTestId("button-save-phrase");
    this.textRecoveryPageWarning = page.getByTestId(
      "text-recovery-page-warning",
    );
    this.titleRecoveryPage = page.getByTestId("title-recovery-page");
  }

  async clickOnSavedIt() {
    await this.buttonSavedPhrase.click();
  }

  async getRecoveryPhrase() {
    let phrase = [];
    for (let i = 1; i <= 12; i++) {
      await expect(
        this.page.getByTestId(`ordered-phrase-number-${i}`),
      ).toBeVisible();
      await expect(
        this.page.getByTestId(`ordered-phrase-word-${i}`),
      ).toBeVisible();
      const text = await this.page
        .getByTestId(`ordered-phrase-word-${i}`)
        .locator("p")
        .getAttribute("innerText");
      phrase.push(text);
    }
    return phrase;
  }

  async getNumberOfSeedWordsDisplayed() {
    const count = await this.page
      .locator(`[data-cy^="ordered-phrase-word-`)
      .count();
    return count;
  }
}
