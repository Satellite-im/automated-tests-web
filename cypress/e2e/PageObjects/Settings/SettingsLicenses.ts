import SettingsBase from "./SettingsBase";

class SettingsLicenses extends SettingsBase {
  constructor() {
    super();
  }

  get licensesSection() {
    return cy.getByTestAttr("section-licenses-uplink");
  }

  get licensesSectionButton() {
    return cy.getByTestAttr("button-view-license");
  }

  get licensesSectionLabel() {
    return this.licensesSection.find("[data-cy='setting-section-label']");
  }

  get licensesSectionText() {
    return this.licensesSection.find("[data-cy='setting-section-text']");
  }
}

export default new SettingsLicenses();
