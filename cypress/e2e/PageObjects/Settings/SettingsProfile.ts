import SettingsBase from "./SettingsBase";

class SettingsProfile extends SettingsBase {
  constructor() {
    super();
  }

  get inputSettingsProfileShortID() {
    return cy.getByTestAttr("input-settings-profile-short-id");
  }

  get inputSettingsProfileShortIDGroup() {
    return this.inputSettingsProfileShortID.parents(".input-group");
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
    return this.profilePictureUploadButton
      .parents(".profile-picture-container")
      .siblings("input");
  }

  get profileImageFrame() {
    return cy.getByTestAttr("profile-image-frame");
  }

  get profilePicture() {
    return cy.getByTestAttr("profile-picture");
  }

  get profilePictureInput() {
    return this.profilePictureUploadButton.siblings("input");
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

  get onlineStatusSectionSelectorCurrentlyDoNotDisturb() {
    return this.onlineStatusSection.find(
      '[data-cy="selector-current-status-do-not-disturb"]',
    );
  }

  get onlineStatusSectionSelectorCurrentlyIdle() {
    return this.onlineStatusSection.find(
      '[data-cy="selector-current-status-idle"]',
    );
  }

  get onlineStatusSectionSelectorCurrentlyOffline() {
    return this.onlineStatusSection.find(
      '[data-cy="selector-current-status-offline"]',
    );
  }

  get onlineStatusSectionSelectorCurrentlyOnline() {
    return this.onlineStatusSection.find(
      '[data-cy="selector-current-status-online"]',
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

  get storeRecoverySeedCheckbox() {
    return this.storeRecoverySeedSection.find(
      '[data-cy="checkbox-store-recovery-seed"]',
    );
  }

  get storeRecoverySeedText() {
    return this.storeRecoverySeedSection.find(
      '[data-cy="text-store-recovery-seed"]',
    );
  }

  public copyShortID() {
    this.inputSettingsProfileShortIDGroup.parents(".short-id").click();
  }

  public getSelectorOptions(locator: string) {
    let options = [];
    cy.get(locator)
      .find("[data-cy='select-option']")
      .each(($option) => {
        cy.log("Option: ", $option);
        cy.log("Option Val: ", $option.val());
        options.push($option.val());
      });
    return options;
  }

  public getRecoveryPhrase() {
    this.revealPhraseSectionRevealButton.click();
    let phrase = [];
    for (let i = 1; i <= 12; i++) {
      cy.getByTestAttr(`ordered-phrase-number-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`)
        .find("p")
        .invoke("text")
        .then((text) => {
          phrase.push(text);
        });
    }
    return phrase;
  }

  public validateRecoveryPhraseIsHidden() {
    for (let i = 1; i <= 12; i++) {
      cy.getByTestAttr(`ordered-phrase-number-${i}`).should("not.exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`).should("not.exist");
    }
  }

  public validateRecoveryPhraseIsShown() {
    for (let i = 1; i <= 12; i++) {
      cy.getByTestAttr(`ordered-phrase-number-${i}`).should("exist");
      cy.getByTestAttr(`ordered-phrase-word-${i}`).should("exist");
    }
  }

  public uploadProfileBanner(file: string) {
    this.profileBannerInput.selectFile(file, {
      force: true,
    });
  }

  public uploadProfilePicture(file: string) {
    cy.get('input[type="file"]').eq(0).selectFile(file, {
      force: true,
    });
  }

  public validateProfileBannerURLIsValid() {
    this.profileBanner.should(($el) => {
      const style = $el.attr("style");
      return expect(
        style.startsWith('background-image: url("data:image/jpeg;base64'),
      ).to.be.true;
    });
  }

  public validateProfilePictureURLIsValid() {
    this.profilePictureImage.should(($el) => {
      const style = $el.attr("src");
      return expect(style.startsWith("data:image/jpeg;base64")).to.be.true;
    });
  }
}

export default new SettingsProfile();
