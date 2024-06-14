import SettingsBase from "./SettingsBase";

class SettingsExtensions extends SettingsBase {
  constructor() {
    super();
  }

  get exploreButton() {
    return cy.getByTestAttr("button-explore");
  }

  get installedButton() {
    return cy.getByTestAttr("button-installed");
  }

  get noExtensionsInstalledLabel() {
    return cy.getByTestAttr("label-no-extensions-installed");
  }

  get settingsButton() {
    return cy.getByTestAttr("button-settings");
  }

  get underConstructionIndicator() {
    return cy.getByTestAttr("under-construction");
  }
}

export default new SettingsExtensions();
