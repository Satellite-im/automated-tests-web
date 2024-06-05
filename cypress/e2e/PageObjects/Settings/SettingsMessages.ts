class SettingsMessages {
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
}

export const settingsMessages: SettingsMessages = new SettingsMessages();
