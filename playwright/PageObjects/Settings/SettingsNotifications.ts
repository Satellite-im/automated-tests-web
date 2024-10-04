import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsNotifications extends SettingsBase {
  readonly enabledSection: Locator;
  readonly enabledSectionCheckbox: Locator;
  readonly enabledSectionLabel: Locator;
  readonly enabledSectionText: Locator;
  readonly enabledSectionSlider: Locator;
  readonly friendsSection: Locator;
  readonly friendsSectionCheckbox: Locator;
  readonly friendsSectionLabel: Locator;
  readonly friendsSectionText: Locator;
  readonly friendsSectionSlider: Locator;
  readonly messagesSection: Locator;
  readonly messagesSectionCheckbox: Locator;
  readonly messagesSectionLabel: Locator;
  readonly messagesSectionText: Locator;
  readonly messagesSectionSlider: Locator;
  readonly settingsSection: Locator;
  readonly settingsSectionCheckbox: Locator;
  readonly settingsSectionLabel: Locator;
  readonly settingsSectionText: Locator;
  readonly settingsSectionSlider: Locator;

  constructor(
    public readonly page: Page,
    public readonly viewport: string,
  ) {
    super(page, viewport);
    this.enabledSection = this.page.getByTestId(
      "section-notifications-enabled",
    );
    this.enabledSectionCheckbox = this.page.getByTestId(
      "switch-notifications-enabled",
    );
    this.enabledSectionLabel = this.enabledSection.getByTestId(
      "setting-section-label",
    );
    this.enabledSectionText = this.enabledSection.getByTestId(
      "setting-section-text",
    );
    this.enabledSectionSlider = this.page.locator(
      '[data-cy="section-notifications-enabled"] > .body > .content > .switch > .slider',
    );
    this.friendsSection = this.page.getByTestId(
      "section-notifications-friends",
    );
    this.friendsSectionCheckbox = this.page.getByTestId(
      "switch-notifications-friends",
    );
    this.friendsSectionLabel = this.friendsSection.getByTestId(
      "setting-section-label",
    );
    this.friendsSectionText = this.friendsSection.getByTestId(
      "setting-section-text",
    );
    this.friendsSectionSlider = this.page.locator(
      '[data-cy="section-notifications-friends"] > .body > .content > .switch > .slider',
    );
    this.messagesSection = this.page.getByTestId(
      "section-notifications-messages",
    );
    this.messagesSectionCheckbox = this.page.getByTestId(
      "switch-notifications-messages",
    );
    this.messagesSectionLabel = this.messagesSection.getByTestId(
      "setting-section-label",
    );
    this.messagesSectionText = this.messagesSection.getByTestId(
      "setting-section-text",
    );
    this.messagesSectionSlider = this.page.locator(
      '[data-cy="section-notifications-messages"] > .body > .content > .switch > .slider',
    );
    this.settingsSection = this.page.getByTestId(
      "section-notifications-settings",
    );
    this.settingsSectionCheckbox = this.page.getByTestId(
      "switch-notifications-settings",
    );
    this.settingsSectionLabel = this.settingsSection.getByTestId(
      "setting-section-label",
    );
    this.settingsSectionText = this.settingsSection.getByTestId(
      "setting-section-text",
    );
    this.settingsSectionSlider = this.page.locator(
      '[data-cy="section-notifications-settings"] > .body > .content > .switch > .slider',
    );
  }
}
