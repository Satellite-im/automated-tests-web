import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsAccessibility extends SettingsBase {
  readonly openDyslexicSection: Locator;
  readonly openDyslexicSectionCheckbox: Locator;
  readonly openDyslexicSectionLabel: Locator;
  readonly openDyslexicSectionText: Locator;
  readonly openDyslexicSectionSlider: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.openDyslexicSection = this.page.getByTestId("section-accessibility");
    this.openDyslexicSectionCheckbox = this.page.getByTestId(
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
