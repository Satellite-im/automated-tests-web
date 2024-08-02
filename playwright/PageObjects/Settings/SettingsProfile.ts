import { expect, type Locator, type Page } from "@playwright/test";
import { SettingsBase } from "./SettingsBase";

export class SettingsProfile extends SettingsBase {
  readonly page: Page;
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
  readonly accountIntegrationsNewCancelButton: Locator;
  readonly accountIntegrationsNewAddressInput: Locator;
  readonly accountIntegrationsNewAddressLabel: Locator;
  readonly accountIntegrationsNewGenericInput: Locator;
  readonly accountIntegrationsNewLogo: Locator;
  readonly accountIntegrationsNewPlatformLabel: Locator;
  readonly accountIntegrationsNewPlatformSelector: Locator;
  readonly accountIntegrationsNewPlatformSelectorOption: Locator;
  readonly accountIntegrationsText: Locator;
  readonly contextMenuUserID: Locator;
  readonly contextMenuOptionCopyDID: Locator;
  readonly contextMenuOptionCopyID: Locator;
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
  readonly profileBannerContainer: Locator;
  readonly profileBannerInput: Locator;
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
  readonly onlineStatusSection: Locator;
  readonly onlineStatusSectionLabel: Locator;
  readonly onlineStatusSectionSelectorCurrentlyDoNotDisturb: Locator;
  readonly onlineStatusSectionSelectorCurrentlyIdle: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOffline: Locator;
  readonly onlineStatusSectionSelectorCurrentlyOnline: Locator;
  readonly onlineStatusSectionSelectOptions: Locator;
  readonly onlineStatusSectionText: Locator;
  readonly storeRecoverySeedSection: Locator;
  readonly storeRecoverySeedCheckbox: Locator;
  readonly storeRecoverySeedText: Locator;
  readonly warningMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.accountIntegrations = page.getByTestId("section-account-integrations");
    this.accountIntegrationsAddButton = this.accountIntegrations.getByTestId(
      "button-integrations-add",
    );
    this.accountIntegrationsAddNewLabel = page.getByTestId(
      "label-account-integrations-new",
    );
    this.accountIntegrationsItem = page.getByTestId(
      "account-integrations-item",
    );
    this.accountIntegrationsItemAddressInput =
      this.accountIntegrationsItem.getByTestId(
        "input-address-account-integration-item",
      );
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
    this.accountIntegrationsItemInput =
      this.accountIntegrationsItem.getByTestId(
        "input-account-integration-item",
      );
    this.accountIntegrationsItemLabel =
      this.accountIntegrationsItem.getByTestId(
        "label-account-integrations-item",
      );
    this.accountIntegrationsLabel = page.getByTestId(
      "label-settings-profile-integrations",
    );
    this.accountIntegrationsItemLogo = this.accountIntegrationsItem.getByTestId(
      "account-integration-item-logo",
    );
    this.accountIntegrationsItemPlatformInput =
      this.accountIntegrationsItem.getByTestId(
        "input-platform-account-integration-item",
      );
    this.accountIntegrationsNewAddButton = page.getByTestId(
      "button-account-integrations-new-add",
    );
    this.accountIntegrationsNewCancelButton = page.getByTestId(
      "button-account-integrations-new-cancel",
    );
    this.accountIntegrationsNewAddressInput = page.getByTestId(
      "input-account-integrations-new-address",
    );
    this.accountIntegrationsNewAddressLabel = page.getByTestId(
      "label-account-integration-new-address",
    );
    this.accountIntegrationsNewGenericInput = page.getByTestId(
      "input-account-integrations-new-generic",
    );
    this.accountIntegrationsNewLogo = page.getByTestId(
      "logo-account-integrations-new",
    );
    this.accountIntegrationsNewPlatformLabel = page.getByTestId(
      "label-account-integrations-new-platform",
    );
    this.accountIntegrationsNewPlatformSelector = page.getByTestId(
      "selector-account-integrations-new-platform",
    );
    this.accountIntegrationsNewPlatformSelectorOption =
      this.accountIntegrationsNewPlatformSelector.getByTestId("select-option");
    this.accountIntegrationsText = page.getByTestId(
      "text-settings-profile-integrations",
    );
    this.contextMenuUserID = page.locator("#context-menu");
    this.contextMenuOptionCopyDID = page.getByTestId(
      "context-menu-option-Copy DID",
    );
    this.contextMenuOptionCopyID = page.getByTestId(
      "context-menu-option-Copy ID",
    );
    this.inputSettingsProfileShortID = page.getByTestId(
      "input-settings-profile-short-id",
    );
    this.inputSettingsProfileShortIDGroup = page.locator(
      '[data-tooltip="Copy"]',
    );
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
    this.logOutSectionButton = this.logOutSection.getByTestId("button-log-out");
    this.logOutSectionLabel = this.logOutSection.getByTestId(
      "setting-section-label",
    );
    this.logOutSectionText = this.logOutSection.getByTestId(
      "setting-section-text",
    );
    this.profileBanner = page.getByTestId("profile-banner");
    this.profileBannerContainer = page.locator(".profile-header");
    this.profileBannerInput = this.profileBannerContainer.locator("input");
    this.profileImageFrame = page.getByTestId("profile-image-frame");
    this.profilePicture = page.getByTestId("profile-picture");
    this.profilePictureContainer = page.locator(".profile-picture-container");
    this.profilePictureInput = this.profilePictureContainer.locator("input");
    this.profilePictureUploadButton =
      this.profilePictureContainer.getByTestId("button-file-upload");
    this.profilePictureImage = this.profilePicture.locator("img");
    this.revealPhraseSection = page.getByTestId("section-reveal-phrase");
    this.revealPhraseSectionHideButton =
      this.revealPhraseSection.getByTestId("button-hide-phrase");
    this.revealPhraseSectionRevealButton = this.revealPhraseSection.getByTestId(
      "button-reveal-phrase",
    );
    this.revealPhraseSectionButtonCopyPhrase =
      this.revealPhraseSection.getByTestId("button-copy-phrase");
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
    this.saveControls = page.getByTestId("save-controls");
    this.saveControlsButtonCancel =
      this.saveControls.getByTestId("button-cancel");
    this.saveControlsButtonSave = this.saveControls.getByTestId("button-save");
    this.onlineStatusSection = page.getByTestId("section-online-status");
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
    this.storeRecoverySeedSection = page.getByTestId(
      "section-store-recovery-seed",
    );
    this.storeRecoverySeedCheckbox = this.storeRecoverySeedSection.getByTestId(
      "checkbox-store-recovery-seed",
    );
    this.storeRecoverySeedText = this.storeRecoverySeedSection.getByTestId(
      "text-store-recovery-seed",
    );
    this.warningMessage = page.locator(".warning");
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
      const value = await element.innerText(); // Assuming the value you want is an attribute
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
        .locator(`[data-cy="ordered-phrase-number-${i}"]`)
        .waitFor({ state: "visible" });

      // Ensure the phrase word element exists
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "visible" });

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
    await this.contextMenuUserID.waitFor({ state: "visible" });
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
        .waitFor({ state: "visible" });
      await this.page
        .locator(`[data-cy="ordered-phrase-word-${i}"]`)
        .waitFor({ state: "visible" });
    }
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
    });
  }

  async validateProfilePictureDisplayed() {
    await expect(this.page).toHaveScreenshot({
      maxDiffPixels: 400,
    });
  }
}
