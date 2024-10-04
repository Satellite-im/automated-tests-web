import { SettingsBase } from "./SettingsBase";
import { expect, type Locator, type Page } from "@playwright/test";

export class SettingsKeybinds extends SettingsBase {
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

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.bannerText = this.page.getByTestId("banner-text");
    this.existingKeybind = this.page.getByTestId("keybind");
    this.existingKeybindDescription = this.page.getByTestId(
      "text-keybind-action",
    );
    this.existingKeybindButton = this.page.getByTestId("key-button");
    this.existingKeybindButtonText = this.page.getByTestId("key-button-text");
    this.existingKeybindRevertButton = this.page.getByTestId(
      "button-keybind-revert-single",
    );
    this.newKeybindSection = this.page.getByTestId("section-new-keybind");
    this.newKeybindActionLabel = this.newKeybindSection.getByTestId(
      "label-keybind-action",
    );
    this.newKeybindActionSelector = this.newKeybindSection.getByTestId(
      "selector-keybind-action",
    );
    this.newKeybindActionSelectorOption =
      this.newKeybindActionSelector.getByTestId("select-option");
    this.newKeybindRecordedKeysLabel = this.newKeybindSection.getByTestId(
      "label-keybind-recorded-keys",
    );
    this.newKeybindKeyButton = this.newKeybindSection.getByTestId("key-button");
    this.newKeybindKeyButtonText =
      this.newKeybindSection.getByTestId("key-button-text");
    this.newKeybindCancelButton = this.newKeybindSection.getByTestId(
      "button-keybind-cancel",
    );
    this.newKeybindSaveButton = this.newKeybindSection.getByTestId(
      "button-keybind-save",
    );
    this.recordKeybindLabel = this.page.getByTestId("label-record-keybind");
    this.recordKeybindInstructionsText = this.page.getByTestId(
      "text-keybind-instructions",
    );
    this.revertKeybindSection = this.page.getByTestId("section-revert-keybind");
    this.revertKeybindSectionLabel = this.revertKeybindSection.getByTestId(
      "setting-section-label",
    );
    this.revertKeybindSectionText = this.revertKeybindSection.getByTestId(
      "setting-section-text",
    );
    this.revertKeybindSectionAllButton = this.page.getByTestId(
      "button-keybind-revert-all",
    );
  }

  async clickOnRevertSingleKeybind(action: string) {
    const button = this.page
      .getByText(action)
      .locator("xpath=..")
      .getByTestId("button-keybind-revert-single");
    await button.click();
  }

  async getKeybindButtonKeys(action: string) {
    let keysArray: string[] = [];
    const options: string[] = await this.page
      .getByText(action)
      .locator("xpath=..")
      .getByTestId("key-button-text")
      .allTextContents();
    keysArray = options.map((option) => option.trim());
    return keysArray;
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
