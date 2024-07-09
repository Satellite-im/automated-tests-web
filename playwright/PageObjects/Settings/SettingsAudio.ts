import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsAbout extends MainPage {
  readonly page: Page;
  readonly callTimerSection: Locator;
  readonly callTimerSectionCheckbox: Locator;
  readonly callTimerSectionSlider: Locator;
  readonly callTimerSectionLabel: Locator;
  readonly callTimerSectionText: Locator;
  readonly controlSoundsSection: Locator;
  readonly controlSoundsSectionCheckbox: Locator;
  readonly controlSoundsSectionSlider: Locator;
  readonly controlSoundsSectionLabel: Locator;
  readonly controlSoundsSectionText: Locator;
  readonly echoCancellationSection: Locator;
  readonly echoCancellationSectionCheckbox: Locator;
  readonly echoCancellationSectionSlider: Locator;
  readonly echoCancellationSectionLabel: Locator;
  readonly echoCancellationSectionText: Locator;
  readonly inputDeviceSection: Locator;
  readonly inputDeviceSectionLabel: Locator;
  readonly inputDeviceSectionMeter: Locator;
  readonly inputDeviceSectionSelector: Locator;
  readonly inputDeviceSectionSelectorOption: Locator;
  readonly inputDeviceSectionText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}
