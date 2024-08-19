import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";

export class SaveRecoverySeedPage extends MainPage {
  readonly buttonDownloadPhrase: Locator;
  readonly buttonSavedPhrase: Locator;
  readonly textRecoveryPageWarning: Locator;
  readonly titleRecoveryPage: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.buttonDownloadPhrase = this.page.getByTestId("button-download-phrase");
    this.buttonSavedPhrase = this.page.getByTestId("button-save-phrase");
    this.textRecoveryPageWarning = this.page.getByTestId(
      "text-recovery-page-warning",
    );
    this.titleRecoveryPage = this.page.getByTestId("title-recovery-page");
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
