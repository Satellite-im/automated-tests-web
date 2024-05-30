class SettingsProfile {
  get buttonAbout() {
    return cy.getByTestAttr("button-About");
  }

  get buttonAccessibility() {
    return cy.getByTestAttr("button-Accessibility");
  }

  get buttonAudioAndVideo() {
    return cy.getByTestAttr("button-Audio & Video");
  }

  get buttonCustomization() {
    return cy.getByTestAttr("button-Customization");
  }

  get buttonExtensions() {
    return cy.getByTestAttr("button-Extensions");
  }

  get buttonInventory() {
    return cy.getByTestAttr("button-Inventory");
  }

  get buttonKeybinds() {
    return cy.getByTestAttr("button-Keybinds");
  }

  get buttonLicenses() {
    return cy.getByTestAttr("button-Licenses");
  }

  get buttonMessages() {
    return cy.getByTestAttr("button-Messages");
  }

  get buttonNotifications() {
    return cy.getByTestAttr("button-Notifications");
  }

  get buttonProfile() {
    return cy.getByTestAttr("button-Profile");
  }

  // Getters from Settings Profile

  get inputSettingsProfileShortID() {
    return cy.getByTestAttr("input-settings-profile-short-id");
  }

  get inputSettingsProfileStatus() {
    return cy.getByTestAttr("input-settings-profile-status-message");
  }

  get inputSettingsProfileUsername() {
    return cy.getByTestAttr("input-settings-profile-username");
  }

  get labelSettingsProfileStatusMessage() {
    return cy.getByTestAttr("label-settings-profile-status-message");
  }

  get labelSettingsProfileUsername() {
    return cy.getByTestAttr("label-settings-profile-username");
  }

  get logOutSection() {
    return cy.getByTestAttr("section-log-out");
  }

  get logOutSectionButton() {
    return this.logOutSection.find('[data-cy="button-log-out"]');
  }

  get logOutSectionLabel() {
    return this.logOutSection.find('[data-cy="setting-section-label"]');
  }

  get logOutSectionText() {
    return this.logOutSection.find('[data-cy="setting-section-text"]');
  }

  get profileBanner() {
    return cy.getByTestAttr("profile-banner");
  }

  get profileBannerInput() {
    return this.profilePicture
      .parents(".profile-picture-container")
      .siblings("input");
  }

  get profilePicture() {
    return cy.getByTestAttr("profile-picture");
  }

  get profilePictureInput() {
    return this.profilePicture.siblings("input");
  }

  get profilePictureUploadButton() {
    return cy.getByTestAttr("button-file-upload");
  }

  get profilePictureImage() {
    return this.profilePicture.find("img");
  }

  get revealPhraseSection() {
    return cy.getByTestAttr("section-reveal-phrase");
  }

  get revealPhraseSectionHideButton() {
    return this.revealPhraseSection.find('[data-cy="button-hide-phrase"]');
  }

  get revealPhraseSectionRevealButton() {
    return this.revealPhraseSection.find('[data-cy="button-reveal-phrase"]');
  }

  get revealPhraseSectionButtonCopyPhrase() {
    return this.revealPhraseSection.find('[data-cy="button-copy-phrase"]');
  }

  get revealPhraseSectionLabel() {
    return this.revealPhraseSection.find('[data-cy="setting-section-label"]');
  }

  get revealPhraseSectionText() {
    return this.revealPhraseSection.find('[data-cy="setting-section-text"]');
  }

  get revealPhraseSectionWordNumber() {
    return this.revealPhraseSection.find('[data-cy="ordered-phrase-number-1"]');
  }

  get revealPhraseSectionWordValue() {
    return this.revealPhraseSection.find('[data-cy="ordered-phrase-word-1"]');
  }

  get saveControls() {
    return cy.getByTestAttr("save-controls");
  }

  get saveControlsButtonCancel() {
    return cy.getByTestAttr("button-cancel");
  }

  get saveControlsButtonSave() {
    return cy.getByTestAttr("button-save");
  }

  get onlineStatusSection() {
    return cy.getByTestAttr("section-online-status");
  }

  get onlineStatusSectionLabel() {
    return this.onlineStatusSection.find('[data-cy="setting-section-label"]');
  }

  get onlineStatusSectionSelect() {
    return this.onlineStatusSection.find(
      '[data-cy="settings-profile-status-select"]',
    );
  }

  get onlineStatusSectionSelectOptions() {
    return this.onlineStatusSection
      .find("[name='generic-select']")
      .find('[data-cy="select-option"]');
  }

  get onlineStatusSectionText() {
    return this.onlineStatusSection.find('[data-cy="setting-section-text"]');
  }

  get storeRecoverySeedSection() {
    return cy.getByTestAttr("section-store-recovery-seed");
  }

  storeRecoverySeedCheckbox() {
    return this.storeRecoverySeedSection.find(
      '[data-cy="checkbox-store-recovery-seed"]',
    );
  }

  storeRecoverySeedText() {
    return this.storeRecoverySeedSection.find(
      '[data-cy="text-store-recovery-seed"]',
    );
  }
}

export const settingsProfile: SettingsProfile = new SettingsProfile();
