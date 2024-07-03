import MainPage from "../MainPage";
import { type Locator, type Page } from "@playwright/test";

export class SettingsAbout extends MainPage {
  readonly page: Page;
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

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.aboutSection = page.getByTestId("section-about-header");
    this.aboutSectionLabel = this.aboutSection.getByTestId(
      "setting-section-label",
    );
    this.aboutSectionText = this.aboutSection.getByTestId(
      "setting-section-text",
    );
    this.devModeSection = page.getByTestId("section-about-dev-mode");
    this.devModeSectionButton = page.getByTestId("button-about-dev-mode");
    this.devModeSectionLabel = this.devModeSection.getByTestId(
      "setting-section-label",
    );
    this.devModeSectionText = this.devModeSection.getByTestId(
      "setting-section-text",
    );
    this.madeInSection = page.getByTestId("section-about-made-in");
    this.madeInSectionFlags = page.getByTestId("about-made-in-flags");
    this.madeInSectionLabel = this.madeInSection.getByTestId(
      "setting-section-label",
    );
    this.madeInSectionText = this.madeInSection.getByTestId(
      "setting-section-text",
    );
    this.openSourceCodeSection = page.getByTestId(
      "section-about-open-source-code",
    );
    this.openSourceCodeSectionButton = page.getByTestId(
      "button-open-source-code",
    );
    this.openSourceCodeSectionLabel = this.openSourceCodeSection.getByTestId(
      "setting-section-label",
    );
    this.openSourceCodeSectionText = this.openSourceCodeSection.getByTestId(
      "setting-section-text",
    );
    this.versionSection = page.getByTestId("section-about-version");
    this.versionSectionButton = page.getByTestId("button-about-version");
    this.versionSectionLabel = this.versionSection.getByTestId(
      "setting-section-label",
    );
    this.versionSectionText = this.versionSection.getByTestId(
      "setting-section-text",
    );
    this.websiteSection = page.getByTestId("section-about-website");
    this.websiteSectionButton = page.getByTestId("button-about-website");
    this.websiteSectionLabel = this.websiteSection.getByTestId(
      "setting-section-label",
    );
    this.websiteSectionText = this.websiteSection.getByTestId(
      "setting-section-text",
    );
  }

  async openDevModeSection() {
    for (let i = 0; i < 11; i++) {
      await this.devModeSectionButton.click();
    }
  }
}
