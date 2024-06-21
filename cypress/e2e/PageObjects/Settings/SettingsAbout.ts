import SettingsBase from "./SettingsBase";

class SettingsAbout extends SettingsBase {
  constructor() {
    super();
  }

  get aboutSection() {
    return cy.getByTestAttr("section-about-header");
  }

  get aboutSectionLabel() {
    return this.aboutSection.find("[data-cy='setting-section-label']");
  }

  get aboutSectionText() {
    return this.aboutSection.find("[data-cy='setting-section-text']");
  }

  get devModeSection() {
    return cy.getByTestAttr("section-about-dev-mode");
  }

  get devModeSectionButton() {
    return cy.getByTestAttr("button-about-dev-mode");
  }

  get devModeSectionLabel() {
    return this.devModeSection.find("[data-cy='setting-section-label']");
  }

  get devModeSectionText() {
    return this.devModeSection.find("[data-cy='setting-section-text']");
  }

  get madeInSection() {
    return cy.getByTestAttr("section-about-made-in");
  }

  get madeInSectionFlags() {
    return cy.getByTestAttr("about-made-in-flags");
  }

  get madeInSectionLabel() {
    return this.madeInSection.find("[data-cy='setting-section-label']");
  }

  get madeInSectionText() {
    return this.madeInSection.find("[data-cy='setting-section-text']");
  }

  get openSourceCodeSection() {
    return cy.getByTestAttr("section-about-open-source-code");
  }

  get openSourceCodeSectionButton() {
    return cy.getByTestAttr("button-open-source-code");
  }

  get openSourceCodeSectionLabel() {
    return this.openSourceCodeSection.find("[data-cy='setting-section-label']");
  }

  get openSourceCodeSectionText() {
    return this.openSourceCodeSection.find("[data-cy='setting-section-text']");
  }

  get versionSection() {
    return cy.getByTestAttr("section-about-version");
  }

  get versionSectionButton() {
    return cy.getByTestAttr("button-check-for-update");
  }

  get versionSectionLabel() {
    return this.versionSection.find("[data-cy='setting-section-label']");
  }

  get versionSectionText() {
    return this.versionSection.find("[data-cy='setting-section-text']");
  }

  get websiteSection() {
    return cy.getByTestAttr("section-about-website");
  }

  get websiteSectionButton() {
    return cy.getByTestAttr("button-open-website");
  }

  get websiteSectionLabel() {
    return this.websiteSection.find("[data-cy='setting-section-label']");
  }

  get websiteSectionText() {
    return this.websiteSection.find("[data-cy='setting-section-text']");
  }

  public openDevMode() {
    for (let i = 0; i < 11; i++) {
      this.devModeSectionButton.click();
    }
  }
}

export default new SettingsAbout();
