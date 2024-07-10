import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsDeveloper extends SettingsBase {
  readonly page: Page;
  readonly clearStateSection: Locator;
  readonly clearStateSectionButton: Locator;
  readonly clearStateSectionLabel: Locator;
  readonly clearStateSectionText: Locator;
  readonly devModeSection: Locator;
  readonly devModeSectionButton: Locator;
  readonly devModeSectionLabel: Locator;
  readonly devModeSectionText: Locator;
  readonly loadMockSection: Locator;
  readonly loadMockSectionButton: Locator;
  readonly loadMockSectionLabel: Locator;
  readonly loadMockSectionText: Locator;
  readonly testVoiceSection: Locator;
  readonly testVoiceSectionButton: Locator;
  readonly testVoiceSectionLabel: Locator;
  readonly testVoiceSectionText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.clearStateSection = page.getByTestId("section-clear-state");
    this.clearStateSectionButton = page.getByTestId("button-clear-state");
    this.clearStateSectionLabel = this.clearStateSection.getByTestId(
      "setting-section-label",
    );
    this.clearStateSectionText = this.clearStateSection.getByTestId(
      "setting-section-text",
    );
    this.devModeSection = page.getByTestId("section-devmode");
    this.devModeSectionButton = page.getByTestId("button-exit-devmode");
    this.devModeSectionLabel = this.devModeSection.getByTestId(
      "setting-section-label",
    );
    this.devModeSectionText = this.devModeSection.getByTestId(
      "setting-section-text",
    );
    this.loadMockSection = page.getByTestId("section-load-mock");
    this.loadMockSectionButton = page.getByTestId("button-load-mock");
    this.loadMockSectionLabel = this.loadMockSection.getByTestId(
      "setting-section-label",
    );
    this.loadMockSectionText = this.loadMockSection.getByTestId(
      "setting-section-text",
    );
    this.testVoiceSection = page.getByTestId("section-test-voice");
    this.testVoiceSectionButton = page.getByTestId("button-test-voice");
    this.testVoiceSectionLabel = this.testVoiceSection.getByTestId(
      "setting-section-label",
    );
    this.testVoiceSectionText = this.testVoiceSection.getByTestId(
      "setting-section-text",
    );
  }
}
