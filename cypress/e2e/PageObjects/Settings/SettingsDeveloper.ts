import SettingsBase from "./SettingsBase";

class SettingsDeveloper extends SettingsBase {
  constructor() {
    super();
  }

  get clearStateSection() {
    return cy.getByTestAttr("section-clear-state");
  }

  get clearStateSectionButton() {
    return cy.getByTestAttr("button-clear-state");
  }

  get clearStateSectionLabel() {
    return this.clearStateSection.find("[data-cy='setting-section-label']");
  }

  get clearStateSectionText() {
    return this.clearStateSection.find("[data-cy='setting-section-text']");
  }

  get devModeSection() {
    return cy.getByTestAttr("section-devmode");
  }

  get devModeSectionButton() {
    return cy.getByTestAttr("button-exit-devmode");
  }

  get devModeSectionLabel() {
    return this.devModeSection.find("[data-cy='setting-section-label']");
  }

  get devModeSectionText() {
    return this.devModeSection.find("[data-cy='setting-section-text']");
  }

  get loadMockSection() {
    return cy.getByTestAttr("section-load-mock");
  }

  get loadMockSectionButton() {
    return cy.getByTestAttr("button-load-mock");
  }

  get loadMockSectionLabel() {
    return this.loadMockSection.find("[data-cy='setting-section-label']");
  }

  get loadMockSectionText() {
    return this.loadMockSection.find("[data-cy='setting-section-text']");
  }

  get testVoiceSection() {
    return cy.getByTestAttr("section-test-voice");
  }

  get testVoiceSectionButton() {
    return cy.getByTestAttr("button-test-voice");
  }

  get testVoiceSectionLabel() {
    return this.testVoiceSection.find("[data-cy='setting-section-label']");
  }

  get testVoiceSectionText() {
    return this.testVoiceSection.find("[data-cy='setting-section-text']");
  }
}

export default new SettingsDeveloper();
