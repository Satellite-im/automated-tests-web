import { type Locator, type Page } from "@playwright/test";
import { SettingsBase } from "./SettingsBase";

export class SettingsProfile extends SettingsBase {
  readonly page: Page;
  readonly inputSettingsProfileShortID: Locator;
  readonly inputSettingsProfileShortIDGroup: Locator;
  readonly inputSettingsProfileStatus: Locator;
  readonly inputSettingsProfileUsername: Locator;
  readonly labelSettingsProfileStatusMessage: Locator;
  readonly labelSettingsProfileUsername: Locator;
  readonly logOutSection: Locator;
  readonly logOutSectionButton: Locator;
  readonly logOutSectionLabel: Locator;
  readonly logOutSectionText: Locator;
  readonly profileBanner: Locator;
  readonly profileBannerInput: Locator;
  readonly profileImageFrame: Locator;
  readonly profilePicture: Locator;
  readonly profilePictureInput: Locator;
  readonly profilePictureUploadButton: Locator;
  readonly profilePictureImage: Locator;
  readonly revealPhraseSection: Locator;
  readonly revealPhraseSectionHideButton: Locator;
  readonly revealPhraseSectionRevealButton: Locator;
  readonly revealPhraseSectionButtonCopyPhrase: Locator;
  readonly revealPhraseSectionLabel: Locator;
  readonly revealPhraseSectionText: Locator;
  readonly revealPhraseSectionWordNumber: Locator;
  readonly revealPhraseSectionWordValue: Locator;
  readonly saveControls: Locator;
  readonly saveControlsButtonCancel: Locator;
  readonly saveControlsButtonSave: Locator;
  readonly onlineStatusSection: Locator;
  readonly onlineStatusSectionLabel: Locator;
  readonly onlineStatusSectionSelectorCurrentlyDoNotDisturb: Locator;
  readonly onlineStatusSectionSelectorCurrentlyIdle: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOffline: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOnline: Locator;
  readonly onlineStatusSectionSelectOptions: Locator;
  readonly onlineStatusSectionText: Locator;
  readonly startRecoverySeedSection: Locator;
  readonly startRecoverySeedCheckbox: Locator;
  readonly startRecoverySeedText: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.inputSettingsProfileShortID = page.getByTestId(
      "input-settings-profile-short-id",
    );
    this.inputSettingsProfileShortIDGroup = this.inputSettingsProfileShortID
      .locator("..")
      .locator(".input-group");
    this.inputSettingsProfileStatus = page.getByTestId(
      "input-settings-profile-status-message",
    );
    this.inputSettingsProfileUsername = page.getByTestId(
      "input-settings-profile-username",
    );
    this.labelSettingsProfileStatusMessage = page.getByTestId(
      "label-settings-profile-status-message",
    );
    this.labelSettingsProfileUsername = page.getByTestId(
      "label-settings-profile-username",
    );
    this.logOutSection = page.getByTestId("section-log-out");
    this.logOutSectionButton = this.logOutSection.locator(
      '[data-cy="button-log-out"]',
    );
    this.logOutSectionLabel = this.logOutSection.locator(
      '[data-cy="setting-section-label"]',
    );
    this.logOutSectionText = this.logOutSection.locator(
      '[data-cy="setting-section-text"]',
    );
    this.profileBanner = page.getByTestId("profile-banner");
    this.profileBannerInput = this.profilePictureUploadButton
      .locator("..")
      .locator("..")
      .locator(".profile-picture-container")
      .locator("input");
    this.profileImageFrame = page.getByTestId("profile-image-frame");
    this.profilePicture = page.getByTestId("profile-picture");
    this.profilePictureInput = page
      .getByTestId("profile-picture-input")
      .locator("..")
      .locator("input");
    this.profilePictureUploadButton = page.getByTestId(
      "profile-picture-upload",
    );
    this.profilePictureImage = this.profilePicture.locator("img");
    this.revealPhraseSection = page.getByTestId("section-reveal-phrase");
    this.revealPhraseSectionHideButton = this.revealPhraseSection.locator(
      '[data-cy="button-hide-phrase"]',
    );
    this.revealPhraseSectionRevealButton = this.revealPhraseSection.locator(
      '[data-cy="button-reveal-phrase"]',
    );
    this.revealPhraseSectionButtonCopyPhrase = this.revealPhraseSection.locator(
      '[data-cy="button-copy-phrase"]',
    );
    this.revealPhraseSectionLabel = this.revealPhraseSection.locator(
      '[data-cy="setting-section-label"]',
    );
    this.revealPhraseSectionText = this.revealPhraseSection.locator(
      '[data-cy="setting-section-text"]',
    );
    this.revealPhraseSectionWordNumber = this.revealPhraseSection.locator(
      '[data-cy="word-number"]',
    );
    this.revealPhraseSectionWordValue = this.revealPhraseSection.locator(
      '[data-cy="word-value"]',
    );
    this.saveControls = page.getByTestId("save-controls");
    this.saveControlsButtonCancel = this.saveControls.locator(
      '[data-cy="button-cancel"]',
    );
    this.saveControlsButtonSave = this.saveControls.locator(
      '[data-cy="button-save"]',
    );
    this.onlineStatusSection = page.getByTestId("section-online-status");
    this.onlineStatusSectionLabel = this.onlineStatusSection.locator(
      '[data-cy="setting-section-label"]',
    );
    this.onlineStatusSectionSelectorCurrentlyDoNotDisturb =
      this.onlineStatusSection.locator(
        '[data-cy="selector-currently-do-not-disturb"]',
      );
    this.onlineStatusSectionSelectorCurrentlyIdle =
      this.onlineStatusSection.locator('[data-cy="selector-currently-idle"]');
    this.onlineStatusSectionSelectorCurrentlyOffline =
      this.onlineStatusSection.locator(
        '[data-cy="selector-currently-offline"]',
      );
    this.onlineStatusSectionSelectorCurrentlyOnline =
      this.onlineStatusSection.locator('[data-cy="selector-currently-online"]');
    this.onlineStatusSectionSelectOptions = this.onlineStatusSection.locator(
      '[data-cy="select-options"]',
    );
    this.onlineStatusSectionText = this.onlineStatusSection.locator(
      '[data-cy="setting-section-text"]',
    );
    this.startRecoverySeedSection = page.getByTestId(
      "section-start-recovery-seed",
    );
    this.startRecoverySeedCheckbox = this.startRecoverySeedSection.locator(
      '[data-cy="checkbox-start-recovery-seed"]',
    );
    this.startRecoverySeedText = this.startRecoverySeedSection.locator(
      '[data-cy="setting-section-text"]',
    );
  }

  // Rewrite everything here in playwright

  async copyShortID() {
    await this.inputSettingsProfileShortIDGroup.click();
  }

  async getSelectorOptions(locator: string) {
    let options = [];
    // Locate all elements with the data-cy attribute within the given locator
    const elements = await this.page.locator(
      `${locator} [data-cy='select-option']`,
    );

    // Get the count of matched elements
    const count = await elements.count();

    // Iterate through each element and extract the value
    for (let i = 0; i < count; i++) {
      const element = elements.nth(i);
      const value = await element.getAttribute("value"); // Assuming the value you want is an attribute
      console.log("Option: ", await element.innerText());
      console.log("Option Val: ", value);
      options.push(value);
    }

    return options;
  }

  async getRecoveryPhrase() {
    let phrase = [];

    // Click the reveal button
    await this.page.locator("your-reveal-button-locator").click(); // Replace with the actual locator for reveal button

    // Loop through each of the 12 phrases
    for (let i = 1; i <= 12; i++) {
      // Ensure the phrase number element exists
      await this.page
        .locator(`[data-test="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "visible" });

      // Ensure the phrase word element exists
      await this.page
        .locator(`[data-test="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "visible" });

      // Get the text from the <p> tag inside the phrase word element
      const text = await this.page
        .locator(`[data-test="ordered-phrase-word-${i}"]`)
        .locator("p")
        .innerText();
      phrase.push(text);
    }

    return phrase;
  }

  async validateRecoveryPhraseIsHidden() {
    // Ensure the phrase number and word elements do not exist
    for (let i = 1; i <= 12; i++) {
      await this.page
        .locator(`[data-test="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "hidden" });
      await this.page
        .locator(`[data-test="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "hidden" });
    }
  }

  async validateRecoveryPhraseIsShown() {
    // Ensure the phrase number and word elements exist
    for (let i = 1; i <= 12; i++) {
      await this.page
        .locator(`[data-test="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "visible" });
      await this.page
        .locator(`[data-test="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "visible" });
    }
  }

  async uploadProfileBanner(file: string) {
    await this.profileBannerInput.setInputFiles(file);
  }

  async uploadProfilePicture(file: string) {
    await this.profilePictureInput.setInputFiles(file);
  }

  async validateProfileBannerURLIsValid() {
    const style = await this.profileBanner.getAttribute("style");
    expect(
      style.startsWith('background-image: url("data:image/jpeg;base64'),
    ).eq(true);
  }

  async validateProfilePictureURLIsValid() {
    const style = await this.profilePictureImage.getAttribute("src");
    expect(style.startsWith("data:image/jpeg;base64")).eq(true);
  }
}
