import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";
import { readFile } from "fs/promises";

export class SaveRecoverySeedPage extends MainPage {
  readonly buttonDownloadPhrase: Locator;
  readonly buttonSavedPhrase: Locator;
  readonly textRecoveryPageWarning: Locator;
  readonly titleRecoveryPage: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
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

    // Loop through each of the 12 phrases
    for (let i = 1; i <= 12; i++) {
      // Ensure the phrase number element exists
      await this.page
        .locator(`[data-cy="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "attached" });

      // Ensure the phrase word element exists
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "attached" });

      // Get the text from the <p> tag inside the phrase word element
      const text = await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .locator("p")
        .innerText();
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

  async readRecoveryPhraseFile(filePath: string) {
    const fileContent = await readFile(filePath, "utf-8");
    const fileSeedPhraseArray = fileContent.split(/\s+/).filter(Boolean);
    return fileSeedPhraseArray;
  }

  async saveRecoverySeed() {
    // Wait for the download event
    const filename = "seed-phrase.txt";
    const downloadPromise = this.page.waitForEvent("download");
    await this.buttonDownloadPhrase.click();
    const download = await downloadPromise;

    // Save the file manually to the specified folder
    const savedFilePath = "./downloads/" + filename;

    await download.saveAs(savedFilePath); // Save the file to the desired folder

    // Return the saved file path for further validation
    return savedFilePath;
  }

  async validatePageIsLoaded() {
    await this.titleRecoveryPage.waitFor({ state: "attached" });
  }
}
