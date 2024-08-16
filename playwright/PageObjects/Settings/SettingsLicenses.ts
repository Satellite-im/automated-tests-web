import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsLicenses extends SettingsBase {
  readonly licensesSection: Locator;
  readonly licensesSectionButton: Locator;
  readonly licensesSectionLabel: Locator;
  readonly licensesSectionText: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.licensesSection = this.page.getByTestId("section-licenses-uplink");
    this.licensesSectionButton = this.page.getByTestId("button-view-license");
    this.licensesSectionLabel = this.licensesSection.locator(
      "[data-cy='setting-section-label']",
    );
    this.licensesSectionText = this.licensesSection.locator(
      "[data-cy='setting-section-text']",
    );
  }
}
