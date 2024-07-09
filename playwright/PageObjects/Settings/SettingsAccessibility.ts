import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsAccessibility extends MainPage {
  readonly page: Page;
  readonly openDyslexicSection: Locator;
  readonly openDyslexicSectionCheckbox: Locator;
  readonly openDyslexicSectionLabel: Locator;
  readonly openDyslexicSectionText: Locator;
  readonly openDyslexicSectionSlider: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.openDyslexicSection = page.getByTestId("section-accessibility");
    this.openDyslexicSectionCheckbox = page.getByTestId(
      "switch-accessibility-open-dyslexic",
    );
    this.openDyslexicSectionLabel = this.openDyslexicSection.getByTestId(
      "setting-section-label",
    );
    this.openDyslexicSectionText = this.openDyslexicSection.getByTestId(
      "setting-section-text",
    );
    this.openDyslexicSectionSlider =
      this.openDyslexicSection.locator(".slider");
  }
}
