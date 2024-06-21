import SettingsBase from "./SettingsBase";

class SettingsAccessibility extends SettingsBase {
  constructor() {
    super();
  }

  get openDyslexicSection() {
    return cy.getByTestAttr("section-accessibility");
  }

  get openDyslexicSectionCheckbox() {
    return cy.getByTestAttr("switch-accessibility-open-dyslexic");
  }

  get openDyslexicSectionLabel() {
    return this.openDyslexicSection.find("[data-cy='setting-section-label']");
  }

  get openDyslexicSectionText() {
    return this.openDyslexicSection.find("[data-cy='setting-section-text']");
  }

  get openDyslexicSectionSlider() {
    return this.openDyslexicSection.find(".slider");
  }
}

export default new SettingsAccessibility();
