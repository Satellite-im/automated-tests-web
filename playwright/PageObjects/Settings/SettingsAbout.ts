import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsAbout extends SettingsBase {
  readonly aboutSection: Locator;
  readonly aboutSectionLabel: Locator;
  readonly aboutSectionText: Locator;
  readonly devModeSection: Locator;
  readonly devModeSectionButton: Locator;
  readonly devModeSectionLabel: Locator;
  readonly devModeSectionText: Locator;
  readonly madeInSection: Locator;
  readonly madeInSectionFlags: Locator;
  readonly madeInSectionLabel: Locator;
  readonly madeInSectionText: Locator;
  readonly openSourceCodeSection: Locator;
  readonly openSourceCodeSectionButton: Locator;
  readonly openSourceCodeSectionLabel: Locator;
  readonly openSourceCodeSectionText: Locator;
  readonly versionSection: Locator;
  readonly versionSectionButton: Locator;
  readonly versionSectionLabel: Locator;
  readonly versionSectionText: Locator;
  readonly websiteSection: Locator;
  readonly websiteSectionButton: Locator;
  readonly websiteSectionLabel: Locator;
  readonly websiteSectionText: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.aboutSection = this.page.getByTestId("section-about-header");
    this.aboutSectionLabel = this.aboutSection.getByTestId(
      "setting-section-label",
    );
    this.aboutSectionText = this.aboutSection.getByTestId(
      "setting-section-text",
    );
    this.devModeSection = this.page.getByTestId("section-about-dev-mode");
    this.devModeSectionButton = this.page.getByTestId("button-about-dev-mode");
    this.devModeSectionLabel = this.devModeSection.getByTestId(
      "setting-section-label",
    );
    this.devModeSectionText = this.devModeSection.getByTestId(
      "setting-section-text",
    );
    this.madeInSection = this.page.getByTestId("section-about-made-in");
    this.madeInSectionFlags = this.page.getByTestId("about-made-in-flags");
    this.madeInSectionLabel = this.madeInSection.getByTestId(
      "setting-section-label",
    );
    this.madeInSectionText = this.madeInSection.getByTestId(
      "setting-section-text",
    );
    this.openSourceCodeSection = this.page.getByTestId(
      "section-about-open-source-code",
    );
    this.openSourceCodeSectionButton = this.page.getByTestId(
      "button-open-source-code",
    );
    this.openSourceCodeSectionLabel = this.openSourceCodeSection.getByTestId(
      "setting-section-label",
    );
    this.openSourceCodeSectionText = this.openSourceCodeSection.getByTestId(
      "setting-section-text",
    );
    this.versionSection = this.page.getByTestId("section-about-version");
    this.versionSectionButton = this.page.getByTestId("button-about-version");
    this.versionSectionLabel = this.versionSection.getByTestId(
      "setting-section-label",
    );
    this.versionSectionText = this.versionSection.getByTestId(
      "setting-section-text",
    );
    this.websiteSection = this.page.getByTestId("section-about-website");
    this.websiteSectionButton = this.page.getByTestId("button-open-website");
    this.websiteSectionLabel = this.websiteSection.getByTestId(
      "setting-section-label",
    );
    this.websiteSectionText = this.websiteSection.getByTestId(
      "setting-section-text",
    );
  }

  async openDevModeSection() {
    for (let i = 0; i < 10; i++) {
      await this.devModeSectionButton.click();
    }
  }
}
