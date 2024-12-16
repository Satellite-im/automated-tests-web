import MainPage from "./MainPage";
import { expect, type Locator, type Page } from "@playwright/test";
import { readFile } from "fs/promises";

export class ImportAccountPage extends MainPage {
  readonly buttonGoBack: Locator;
  readonly buttonImportAccountFromFile: Locator;
  readonly buttonImportAccountFromRemote: Locator;
  readonly buttonUploadPassphrase: Locator;
  readonly textImportAccountSecondary: Locator;
  readonly titleImportAccount: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.buttonGoBack = this.page.getByTestId("button-import-account-go-back");
    this.buttonImportAccountFromFile = this.page.getByTestId(
      "import-account-file",
    );
    this.buttonImportAccountFromRemote =
      this.page.getByTestId("import-account");
    this.buttonUploadPassphrase = this.page.getByTestId("upload-passphrase");
    this.textImportAccountSecondary = this.page.getByTestId(
      "text-import-account-secondary",
    );
    this.titleImportAccount = this.page.getByTestId("title-import-account");
  }

  async clickOnGoBack() {
    await this.buttonGoBack.click();
  }

  async clickOnImportAccountFromFile() {
    await this.buttonImportAccountFromFile.click();
  }

  async clickOnImportAccountFromRemote() {
    await this.buttonImportAccountFromRemote.click();
  }

  async clickOnUploadPassphrase() {
    await this.buttonUploadPassphrase.click();
  }

  async enterSeedPhraseManually(seedPhrase: string[]) {
    // Loop through each of the 12 input fields
    for (let i = 1; i <= 12; i++) {
      // Get the text from the array element and type it on input field
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .locator("input")
        .fill(seedPhrase[i - 1]);
    }
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

  async importAccountFromFile(
    phraseType: "file" | "manual",
    importFilePath: string,
    seedPhrasePath?: string,
    seedPhrase?: string[],
  ) {
    if (phraseType === "file") {
      await this.uploadSeedPhraseFile(seedPhrasePath);
    } else if (phraseType === "manual") {
      await this.enterSeedPhraseManually(seedPhrase);
    } else {
      throw new Error("Invalid passphrase type");
    }
    await this.uploadImportedFile(importFilePath);
  }

  async importAccountFromRemote(
    phraseType: "file" | "manual",
    seedPhrasePath?: string,
    seedPhrase?: string[],
  ) {
    if (phraseType === "file") {
      await this.uploadSeedPhraseFile(seedPhrasePath);
    } else if (phraseType === "manual") {
      await this.enterSeedPhraseManually(seedPhrase);
    } else {
      throw new Error("Invalid passphrase type");
    }
    await this.clickOnImportAccountFromRemote();
  }

  async readRecoveryPhraseFile(filePath: string) {
    const fileContent = await readFile(filePath, "utf-8");
    const fileSeedPhraseArray = fileContent.split(/\s+/).filter(Boolean);
    return fileSeedPhraseArray;
  }

  async uploadImportedFile(filePath: string) {
    await expect(this.buttonImportAccountFromFile).toHaveClass("enabled");
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.clickOnImportAccountFromFile();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
  }

  async uploadSeedPhraseFile(filePath: string) {
    await expect(this.buttonImportAccountFromFile).toHaveClass("disabled");
    const fileChooserPromise = this.page.waitForEvent("filechooser");
    await this.clickOnUploadPassphrase();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(filePath);
    await expect(this.buttonImportAccountFromFile).toHaveClass("enabled");
  }

  async validatePageIsLoaded() {
    await this.titleImportAccount.waitFor({ state: "attached" });
  }
}
