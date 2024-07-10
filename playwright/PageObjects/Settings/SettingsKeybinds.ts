import { SettingsBase } from "./SettingsBase";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsKeybinds extends SettingsBase {
  readonly page: Page;
  readonly bannerText: Locator;
  readonly existingKeybind: Locator;
  readonly existingKeybindDescription: Locator;
  readonly existingKeybindButton: Locator;
  readonly existingKeybindButtonText: Locator;
  readonly existingKeybindRevertButton: Locator;
  readonly newKeybindSection: Locator;
  readonly newKeybindActionLabel: Locator;
  readonly newKeybindActionSelector: Locator;
  readonly newKeybindActionSelectorOption: Locator;
  readonly newKeybindRecordedKeysLabel: Locator;
  readonly newKeybindKeyButton: Locator;
  readonly newKeybindKeyButtonText: Locator;
  readonly newKeybindCancelButton: Locator;
  readonly newKeybindSaveButton: Locator;
  readonly recordKeybindLabel: Locator;
  readonly recordKeybindInstructionsText: Locator;
  readonly revertKeybindSection: Locator;
  readonly revertKeybindSectionLabel: Locator;
  readonly revertKeybindSectionText: Locator;
  readonly revertKeybindSectionAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.bannerText = page.getByTestId("banner-text");
    this.existingKeybind = page.getByTestId("keybind");
    this.existingKeybindDescription = page.getByTestId("text-keybind-action");
    this.existingKeybindButton = page.getByTestId("key-button");
    this.existingKeybindButtonText = page.getByTestId("key-button-text");
    this.existingKeybindRevertButton = page.getByTestId(
      "button-keybind-revert-single",
    );
    this.newKeybindSection = page.getByTestId("section-new-keybind");
    this.newKeybindActionLabel = this.newKeybindSection.locator(
      "[data-cy='label-keybind-action']",
    );
    this.newKeybindActionSelector = this.newKeybindSection.locator(
      "[data-cy='selector-keybind-action']",
    );
    this.newKeybindActionSelectorOption = this.newKeybindActionSelector.locator(
      "[data-cy='select-option']",
    );
    this.newKeybindRecordedKeysLabel = this.newKeybindSection.locator(
      "[data-cy='label-keybind-recorded-keys']",
    );
    this.newKeybindKeyButton = this.newKeybindSection.locator(
      "[data-cy='key-button']",
    );
    this.newKeybindKeyButtonText = this.newKeybindSection.locator(
      "[data-cy='key-button-text']",
    );
    this.newKeybindCancelButton = this.newKeybindSection.locator(
      "[data-cy='button-keybind-cancel']",
    );
    this.newKeybindSaveButton = this.newKeybindSection.locator(
      "[data-cy='button-keybind-save']",
    );
    this.recordKeybindLabel = page.getByTestId("label-record-keybind");
    this.recordKeybindInstructionsText = page.getByTestId(
      "text-keybind-instructions",
    );
    this.revertKeybindSection = page.getByTestId("section-revert-keybind");
    this.revertKeybindSectionLabel = this.revertKeybindSection.locator(
      "[data-cy='setting-section-label']",
    );
    this.revertKeybindSectionText = this.revertKeybindSection.locator(
      "[data-cy='setting-section-text']",
    );
    this.revertKeybindSectionAllButton = this.page.getByTestId(
      "button-keybind-revert-all",
    );
  }

  async clickOnRevertSingleKeybind(action: string) {
    return this.page
      .getByTestId("text-keybind-action")
      .locator(`text=${action}`)
      .locator("..")
      .getByTestId("button-keybind-revert-single")
      .click();
  }

  async validateKeybindButtonKeys(action: string, expectedKeys: string[]) {
    let keysArray: string[] = [];
    const options: string[] = await this.page
      .getByTestId("text-keybind-action")
      .locator(`text=${action}`)
      .locator("..")
      .getByTestId("key-button-text")
      .allTextContents();
    keysArray = options.map((option) => option.trim());
    expect(keysArray).toEqual(expectedKeys);
  }

  async selectKeybind(name: string) {
    return this.page
      .getByTestId("selector-keybind-action")
      .locator("select")
      .selectOption({ label: name });
  }

  async validateKeybindActions(expectedKeybinds: string[]) {
    let displayedKeybinds: string[] = [];
    const options: string[] =
      await this.newKeybindActionSelectorOption.allTextContents();
    displayedKeybinds = options.map((option) => option.trim());
    expect(displayedKeybinds).toEqual(expectedKeybinds);
  }
}
