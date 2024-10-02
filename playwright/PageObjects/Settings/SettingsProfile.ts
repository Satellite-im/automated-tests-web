import { expect, type Locator, type Page } from "@playwright/test";
import { SettingsBase } from "./SettingsBase";

export class SettingsProfile extends SettingsBase {
  readonly accountIntegrations: Locator;
  readonly accountIntegrationsAddButton: Locator;
  readonly accountIntegrationsAddNewLabel: Locator;
  readonly accountIntegrationsItem: Locator;
  readonly accountIntegrationsItemAddressInput: Locator;
  readonly accountIntegrationsItemCopyButton: Locator;
  readonly accountIntegrationsItemDeleteButton: Locator;
  readonly accountIntegrationsItemEditButton: Locator;
  readonly accountIntegrationsItemInput: Locator;
  readonly accountIntegrationsItemLabel: Locator;
  readonly accountIntegrationsItemLogo: Locator;
  readonly accountIntegrationsItemPlatformInput: Locator;
  readonly accountIntegrationsLabel: Locator;
  readonly accountIntegrationsNewAddButton: Locator;
  readonly accountIntegrationsNewAddressInput: Locator;
  readonly accountIntegrationsNewAddressLabel: Locator;
  readonly accountIntegrationsNewCancelButton: Locator;
  readonly accountIntegrationsNewGenericInput: Locator;
  readonly accountIntegrationsNewLogo: Locator;
  readonly accountIntegrationsNewPlatformLabel: Locator;
  readonly accountIntegrationsNewPlatformSelector: Locator;
  readonly accountIntegrationsNewPlatformSelectorOption: Locator;
  readonly accountIntegrationsText: Locator;
  readonly contextMenuBannerPicture: Locator;
  readonly contextMenuCopyID: Locator;
  readonly contextMenuProfilePicture: Locator;
  readonly contextMenuUserID: Locator;
  readonly contextMenuOptionCopyDID: Locator;
  readonly contextMenuOptionCopyID: Locator;
  readonly contextMenuOptionDeleteBannerPicture: Locator;
  readonly contextMenuOptionDeleteProfilePicture: Locator;
  readonly identiconSettingsProfile: Locator;
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
  readonly onlineStatusSection: Locator;
  readonly onlineStatusSectionLabel: Locator;
  readonly onlineStatusSectionSelectorCurrentlyDoNotDisturb: Locator;
  readonly onlineStatusSectionSelectorCurrentlyIdle: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOffline: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOnline: Locator;
  readonly onlineStatusSectionSelectOptions: Locator;
  readonly onlineStatusSectionText: Locator;
  readonly profileBanner: Locator;
  readonly profileBannerContainer: Locator;
  readonly profileBannerInput: Locator;
  readonly profileImage: Locator;
  readonly profileImageFrame: Locator;
  readonly profilePicture: Locator;
  readonly profilePictureContainer: Locator;
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
  readonly seedPhraseModal: Locator;
  readonly seedPhraseModalText: Locator;
  readonly seedPhraseModalCancelButton: Locator;
  readonly seedPhraseModalConfirmButton: Locator;
  readonly storeRecoverySeedSection: Locator;
  readonly storeRecoverySeedCheckbox: Locator;
  readonly storeRecoverySeedText: Locator;
  readonly warningMessageFieldRequired: Locator;
  readonly warningMessageInvalidFormat: Locator;
  readonly warningMessageMaxLengthIs128: Locator;
  readonly warningMessageMaxLengthIs32: Locator;
  readonly warningMessageMinLengthIs4: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.accountIntegrations = this.page.getByTestId(
      "section-account-integrations",
    );
    this.accountIntegrationsAddButton = this.accountIntegrations.getByTestId(
      "button-integrations-add",
    );
    this.accountIntegrationsAddNewLabel = this.page.getByTestId(
      "label-account-integrations-new",
    );
    this.accountIntegrationsItem = this.page.getByTestId(
      "account-integrations-item",
    );
    this.accountIntegrationsItemAddressInput = this.accountIntegrationsItem
      .getByTestId("input-address-account-integration-item")
      .locator("input");
    this.accountIntegrationsItemCopyButton =
      this.accountIntegrationsItem.getByTestId(
        "button-account-integration-item",
      );
    this.accountIntegrationsItemDeleteButton =
      this.accountIntegrationsItem.getByTestId(
        "button-account-integrations-item-delete",
      );
    this.accountIntegrationsItemEditButton =
      this.accountIntegrationsItem.getByTestId(
        "button-account-integrations-item-edit",
      );
    this.accountIntegrationsItemInput = this.accountIntegrationsItem
      .getByTestId("input-account-integration-item")
      .locator("input");
    this.accountIntegrationsItemLabel =
      this.accountIntegrationsItem.getByTestId(
        "label-account-integrations-item",
      );
    this.accountIntegrationsLabel = this.page.getByTestId(
      "label-settings-profile-integrations",
    );
    this.accountIntegrationsItemLogo = this.accountIntegrationsItem.getByTestId(
      "account-integration-item-logo",
    );
    this.accountIntegrationsItemPlatformInput = this.accountIntegrationsItem
      .getByTestId("input-platform-account-integration-item")
      .locator("input");
    this.accountIntegrationsNewAddButton = this.page.getByTestId(
      "button-account-integrations-new-add",
    );
    this.accountIntegrationsNewCancelButton = this.page.getByTestId(
      "button-account-integrations-new-cancel",
    );
    this.accountIntegrationsNewAddressInput = this.page
      .getByTestId("input-account-integrations-new-address")
      .locator("input");
    this.accountIntegrationsNewAddressLabel = this.page.getByTestId(
      "label-account-integration-new-address",
    );
    this.accountIntegrationsNewGenericInput = this.page
      .getByTestId("input-account-integrations-new-generic")
      .locator("input");
    this.accountIntegrationsNewLogo = this.page.getByTestId(
      "logo-account-integrations-new",
    );
    this.accountIntegrationsNewPlatformLabel = this.page.getByTestId(
      "label-account-integrations-new-platform",
    );
    this.accountIntegrationsNewPlatformSelector = this.page.getByTestId(
      "selector-account-integrations-new-platform",
    );
    this.accountIntegrationsNewPlatformSelectorOption =
      this.accountIntegrationsNewPlatformSelector.getByTestId("select-option");
    this.accountIntegrationsText = this.page.getByTestId(
      "text-settings-profile-integrations",
    );
    this.contextMenuBannerPicture = this.page.getByTestId(
      "context-menu-banner-picture",
    );
    this.contextMenuCopyID = this.page.getByTestId("context-menu-copy-id");
    this.contextMenuProfilePicture = this.page.getByTestId(
      "context-menu-profile-picture",
    );
    this.contextMenuUserID = this.page.locator("#context-menu");
    this.contextMenuOptionCopyDID = this.page.getByTestId(
      "context-menu-option-Copy DID",
    );
    this.contextMenuOptionCopyID = this.page.getByTestId(
      "context-menu-option-Copy ID",
    );
    this.contextMenuOptionDeleteBannerPicture = this.page.getByTestId(
      "context-menu-option-Delete Banner Picture",
    );
    this.contextMenuOptionDeleteProfilePicture = this.page.getByTestId(
      "context-menu-option-Delete Profile Picture",
    );
    this.identiconSettingsProfile = this.page
      .locator(".identicon")
      .locator("img");
    this.inputSettingsProfileShortID = this.page.getByTestId(
      "input-settings-profile-short-id",
    );
    this.inputSettingsProfileShortIDGroup = this.page.locator(
      '[data-tooltip="Copy"]',
    );
    this.inputSettingsProfileStatus = this.page
      .getByTestId("input-settings-profile-status-message")
      .locator("input");
    this.inputSettingsProfileUsername = this.page
      .getByTestId("input-settings-profile-username")
      .locator("input");
    this.labelSettingsProfileStatusMessage = this.page.getByTestId(
      "label-settings-profile-status-message",
    );
    this.labelSettingsProfileUsername = this.page.getByTestId(
      "label-settings-profile-username",
    );
    this.logOutSection = this.page.getByTestId("section-log-out");
    this.logOutSectionButton = this.logOutSection.getByTestId("button-log-out");
    this.logOutSectionLabel = this.logOutSection.getByTestId(
      "setting-section-label",
    );
    this.logOutSectionText = this.logOutSection.getByTestId(
      "setting-section-text",
    );
    this.onlineStatusSection = this.page.getByTestId("section-online-status");
    this.onlineStatusSectionLabel = this.onlineStatusSection.getByTestId(
      "setting-section-label",
    );
    this.onlineStatusSectionSelectorCurrentlyDoNotDisturb =
      this.onlineStatusSection.getByTestId(
        "selector-current-status-do-not-disturb",
      );
    this.onlineStatusSectionSelectorCurrentlyIdle =
      this.onlineStatusSection.getByTestId("selector-current-status-idle");
    this.onlineStatusSectionSelectorCurrentlyOffline =
      this.onlineStatusSection.getByTestId("selector-current-status-offline");
    this.onlineStatusSectionSelectorCurrentlyOnline =
      this.onlineStatusSection.getByTestId("selector-current-status-online");
    this.onlineStatusSectionSelectOptions =
      this.onlineStatusSection.getByTestId("select-options");
    this.onlineStatusSectionText = this.onlineStatusSection.getByTestId(
      "setting-section-text",
    );
    this.profileBanner = this.page.getByTestId("profile-banner");
    this.profileBannerContainer = this.page.locator(".profile-header");
    this.profileBannerInput = this.profileBannerContainer.locator("input");
    this.profileImage = this.page.getByTestId("profile-image");
    this.profileImageFrame = this.page.getByTestId("profile-image-frame");
    this.profilePicture = this.page.getByTestId("profile-picture");
    this.profilePictureContainer = this.page.locator(
      ".profile-picture-container",
    );
    this.profilePictureInput = this.profilePictureContainer.locator("input");
    this.profilePictureUploadButton =
      this.profilePictureContainer.getByTestId("button-file-upload");
    this.profilePictureImage = this.profilePicture.locator("img");
    this.revealPhraseSection = this.page.getByTestId("section-reveal-phrase");
    this.revealPhraseSectionHideButton =
      this.revealPhraseSection.getByTestId("button-hide-phrase");
    this.revealPhraseSectionRevealButton = this.revealPhraseSection.getByTestId(
      "button-reveal-phrase",
    );
    this.revealPhraseSectionButtonCopyPhrase =
      this.page.getByTestId("button-copy-phrase");
    this.revealPhraseSectionLabel = this.revealPhraseSection.getByTestId(
      "setting-section-label",
    );
    this.revealPhraseSectionText = this.revealPhraseSection.getByTestId(
      "setting-section-text",
    );
    this.revealPhraseSectionWordNumber =
      this.revealPhraseSection.getByTestId("word-number");
    this.revealPhraseSectionWordValue =
      this.revealPhraseSection.getByTestId("word-value");
    this.saveControls = this.page.getByTestId("save-controls");
    this.saveControlsButtonCancel =
      this.saveControls.getByTestId("button-cancel");
    this.saveControlsButtonSave = this.saveControls.getByTestId("button-save");
    this.seedPhraseModal = this.page.locator(".seed-phrase-modal");
    this.seedPhraseModalText = this.seedPhraseModal.getByTestId(
      "text-create-description",
    );
    this.seedPhraseModalCancelButton = this.seedPhraseModal.getByTestId(
      "button-seed-remove-cancel",
    );
    this.seedPhraseModalConfirmButton = this.seedPhraseModal.getByTestId(
      "button-seed-remove-confirm",
    );
    this.storeRecoverySeedSection = this.page.getByTestId(
      "section-store-recovery-seed",
    );
    this.storeRecoverySeedCheckbox = this.storeRecoverySeedSection.getByTestId(
      "checkbox-store-recovery-seed",
    );
    this.storeRecoverySeedText = this.storeRecoverySeedSection.getByTestId(
      "text-store-recovery-seed",
    );
    this.warningMessageFieldRequired = this.page.getByText(
      "This field is required.",
    );
    this.warningMessageInvalidFormat = this.page.getByText("Invalid format.");
    this.warningMessageMaxLengthIs128 = this.page.getByText(
      "Maximum length is 128 characters.",
    );
    this.warningMessageMaxLengthIs32 = this.page.getByText(
      "Maximum length is 32 characters.",
    );
    this.warningMessageMinLengthIs4 = this.page.getByText(
      "Minimum length is 4 characters.",
    );
  }

  // Rewrite everything here in playwright

  async copyShortID() {
    await this.inputSettingsProfileShortIDGroup.click();
  }

  async getProfileIdenticonSource() {
    const source = await this.identiconSettingsProfile.getAttribute("src");
    return source;
  }

  async getProfileImageSource() {
    const source = await this.profileImage.getAttribute("src");
    return source;
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
      const value = await element.innerText(); // Assuming the value you want is an attribute
      options.push(value);
    }

    return options;
  }

  async getRecoveryPhrase() {
    let phrase = [];

    // Loop through each of the 12 phrases
    for (let i = 1; i <= 12; i++) {
      // Ensure the phrase number element exists
      await this.page
        .locator(`[data-cy="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "attached" });

      // Ensure the phrase word element exists
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "attached" });

      // Get the text from the <p> tag inside the phrase word element
      const text = await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .locator("p")
        .innerText();
      phrase.push(text);
    }

    return phrase;
  }

  async openUserIDContextMenu() {
    await this.inputSettingsProfileShortIDGroup.click({ button: "right" });
    await this.contextMenuUserID.waitFor({ state: "attached" });
  }

  async pasteClipboardIntoStatus() {
    await this.inputSettingsProfileStatus.click();
    await this.inputSettingsProfileStatus.clear();
    await this.inputSettingsProfileStatus.press("ControlOrMeta+v");
  }

  async selectOnlineStatus(
    option: "online" | "idle" | "do-not-disturb" | "offline",
  ) {
    switch (option) {
      case "online":
        await this.onlineStatusSection
          .locator("select")
          .selectOption({ label: "Online" });
        break;
      case "idle":
        await this.onlineStatusSection
          .locator("select")
          .selectOption({ label: "Idle" });
        break;
      case "do-not-disturb":
        await this.onlineStatusSection
          .locator("select")
          .selectOption({ label: "Do Not Disturb" });
        break;
      case "offline":
        await this.onlineStatusSection
          .locator("select")
          .selectOption({ label: "Offline" });
        break;
    }
    await this.validateToastProfileUpdated();
    await this.waitForToastNotificationToDisappear();
  }

  async updateStatus(newStatus: string) {
    // User types into username and change value
    await this.inputSettingsProfileStatus.click();
    await this.inputSettingsProfileStatus.clear();
    await this.inputSettingsProfileStatus.fill(newStatus);

    // Save modal is displayed, user selects save and username is changed
    await this.saveControls.waitFor({ state: "attached" });
    await this.saveControlsButtonSave.click();
    await this.page
      .getByText("Profile Updated!")
      .waitFor({ state: "attached" });
    await this.waitForToastNotificationToDisappear();
  }

  async updateUsername(newUsername: string) {
    // User types into username and change value
    await this.inputSettingsProfileUsername.click();
    await this.inputSettingsProfileUsername.clear();
    await this.inputSettingsProfileUsername.fill(newUsername);

    // Save modal is displayed, user selects save and username is changed
    await this.saveControls.waitFor({ state: "attached" });
    await this.saveControlsButtonSave.click();
    await this.page
      .getByText("Profile Updated!")
      .waitFor({ state: "attached" });
    await this.waitForToastNotificationToDisappear();
  }

  async validateOnlineStatus(
    option: "online" | "idle" | "do-not-disturb" | "offline",
  ) {
    switch (option) {
      case "online":
        await this.onlineStatusSectionSelectorCurrentlyOnline.waitFor({
          state: "attached",
        });
        break;
      case "idle":
        await this.onlineStatusSectionSelectorCurrentlyIdle.waitFor({
          state: "attached",
        });
        break;
      case "do-not-disturb":
        await this.onlineStatusSectionSelectorCurrentlyDoNotDisturb.waitFor({
          state: "attached",
        });
        break;
      case "offline":
        await this.onlineStatusSectionSelectorCurrentlyOffline.waitFor({
          state: "attached",
        });
        break;
    }
  }

  async validateRecoveryPhraseIsHidden() {
    // Ensure the phrase number and word elements do not exist
    for (let i = 1; i <= 12; i++) {
      await this.page
        .locator(`[data-cy="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "hidden" });
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "hidden" });
    }
  }

  async validateRecoveryPhraseIsShown() {
    // Ensure the phrase number and word elements exist
    for (let i = 1; i <= 12; i++) {
      await this.page
        .locator(`[data-cy="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "attached" });
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "attached" });
    }
  }

  async validateToastProfileUpdated() {
    await this.toastNotificationText.waitFor({ state: "attached" });
    await expect(this.toastNotificationText).toHaveText("Profile Updated!");
  }

  async uploadProfileBanner(file: string) {
    await this.profileBanner.click();
    await this.profileBannerInput.setInputFiles(file);
  }

  async uploadProfilePicture(file: string) {
    await this.profilePictureUploadButton.click();
    await this.profilePictureInput.setInputFiles(file);
  }

  async validateBannerDisplayed() {
    await expect(this.page).toHaveScreenshot({
      maxDiffPixels: 400,
      mask: [this.inputSettingsProfileShortID],
    });
  }

  async validateProfilePictureDisplayed() {
    await expect(this.page).toHaveScreenshot({
      maxDiffPixels: 5000,
      mask: [this.inputSettingsProfileShortID],
    });
  }
}
