import SettingsBase from "./SettingsBase";

class SettingsNotifications extends SettingsBase {
  constructor() {
    super();
  }

  get enabledSection() {
    return cy.getByTestAttr("section-notifications-enabled");
  }

  get enabledSectionCheckbox() {
    return cy.getByTestAttr("switch-notifications-enabled");
  }

  get enabledSectionLabel() {
    return this.enabledSection.find("[data-cy='setting-section-label']");
  }

  get enabledSectionText() {
    return this.enabledSection.find("[data-cy='setting-section-text']");
  }

  get enabledSectionSlider() {
    return cy.get(
      '[data-cy="section-notifications-enabled"] > .body > .content > .switch > .slider',
    );
  }

  get friendsSection() {
    return cy.getByTestAttr("section-notifications-friends");
  }

  get friendsSectionCheckbox() {
    return cy.getByTestAttr("switch-notifications-friends");
  }

  get friendsSectionLabel() {
    return this.friendsSection.find("[data-cy='setting-section-label']");
  }

  get friendsSectionText() {
    return this.friendsSection.find("[data-cy='setting-section-text']");
  }

  get friendsSectionSlider() {
    return cy.get(
      '[data-cy="section-notifications-friends"] > .body > .content > .switch > .slider',
    );
  }

  get messagesSection() {
    return cy.getByTestAttr("section-notifications-messages");
  }

  get messagesSectionCheckbox() {
    return cy.getByTestAttr("switch-notifications-messages");
  }

  get messagesSectionLabel() {
    return this.messagesSection.find("[data-cy='setting-section-label']");
  }

  get messagesSectionText() {
    return this.messagesSection.find("[data-cy='setting-section-text']");
  }

  get messagesSectionSlider() {
    return cy.get(
      '[data-cy="section-notifications-messages"] > .body > .content > .switch > .slider',
    );
  }

  get settingsSection() {
    return cy.getByTestAttr("section-notifications-settings");
  }

  get settingsSectionCheckbox() {
    return cy.getByTestAttr("switch-notifications-settings");
  }

  get settingsSectionLabel() {
    return this.settingsSection.find("[data-cy='setting-section-label']");
  }

  get settingsSectionText() {
    return this.settingsSection.find("[data-cy='setting-section-text']");
  }

  get settingsSectionSlider() {
    return cy.get(
      '[data-cy="section-notifications-settings"] > .body > .content > .switch > .slider',
    );
  }
}

export default new SettingsNotifications();
