import SettingsBase from "./SettingsBase";

class SettingsMessages extends SettingsBase {
  constructor() {
    super();
  }

  get convertToEmojiSection() {
    return cy.getByTestAttr("section-convert-to-emoji");
  }

  get convertToEmojiSectionCheckbox() {
    return cy.getByTestAttr("checkbox-convert-to-emoji");
  }

  get convertToEmojiSectionLabel() {
    return this.convertToEmojiSection.find("[data-cy='setting-section-label']");
  }

  get convertToEmojiSectionText() {
    return this.convertToEmojiSection.find("[data-cy='setting-section-text']");
  }

  get convertToEmojiSectionSlider() {
    return cy.get(
      '[data-cy="section-convert-to-emoji"] > .body > .content > .switch > .slider',
    );
  }

  get markdownSupportSection() {
    return cy.getByTestAttr("section-markdown-support");
  }

  get markdownSupportSectionCheckbox() {
    return cy.getByTestAttr("checkbox-markdown-support");
  }

  get markdownSupportSectionLabel() {
    return this.markdownSupportSection.find(
      "[data-cy='setting-section-label']",
    );
  }

  get markdownSupportSectionText() {
    return this.markdownSupportSection.find("[data-cy='setting-section-text']");
  }

  get markdownSupportSectionSlider() {
    return cy.get(
      '[data-cy="section-markdown-support"] > .body > .content > .switch > .slider',
    );
  }

  get spamBotDetectionSection() {
    return cy.getByTestAttr("section-spam-bot-detection");
  }

  get spamBotDetectionSectionCheckbox() {
    return cy.getByTestAttr("checkbox-spam-bot-detection");
  }

  get spamBotDetectionSectionLabel() {
    return this.spamBotDetectionSection.find(
      "[data-cy='setting-section-label']",
    );
  }

  get spamBotDetectionSectionText() {
    return this.spamBotDetectionSection.find(
      "[data-cy='setting-section-text']",
    );
  }

  get spamBotDetectionSectionSlider() {
    return cy.get(
      '[data-cy="section-spam-bot-detection"] > .body > .content > .switch > .slider',
    );
  }
}

export default new SettingsMessages();
