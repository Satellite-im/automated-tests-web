import { SettingsBase } from "./SettingsBase";
import { type Locator, type Page } from "@playwright/test";

export class SettingsMessages extends SettingsBase {
  readonly page: Page;
  readonly compactMessagingSection: Locator;
  readonly compactMessagingSectionCheckbox: Locator;
  readonly compactMessagingSectionLabel: Locator;
  readonly compactMessagingSectionText: Locator;
  readonly compactMessagingSectionSlider: Locator;
  readonly convertToEmojiSection: Locator;
  readonly convertToEmojiSectionCheckbox: Locator;
  readonly convertToEmojiSectionLabel: Locator;
  readonly convertToEmojiSectionText: Locator;
  readonly convertToEmojiSectionSlider: Locator;
  readonly markdownSupportSection: Locator;
  readonly markdownSupportSectionCheckbox: Locator;
  readonly markdownSupportSectionLabel: Locator;
  readonly markdownSupportSectionText: Locator;
  readonly markdownSupportSectionSlider: Locator;
  readonly quickChatSection: Locator;
  readonly quickChatSectionCheckbox: Locator;
  readonly quickChatSectionLabel: Locator;
  readonly quickChatSectionText: Locator;
  readonly quickChatSectionSlider: Locator;
  readonly spamBotDetectionSection: Locator;
  readonly spamBotDetectionSectionCheckbox: Locator;
  readonly spamBotDetectionSectionLabel: Locator;
  readonly spamBotDetectionSectionText: Locator;
  readonly spamBotDetectionSectionSlider: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.compactMessagingSection = page.getByTestId(
      "section-compact-messaging",
    );
    this.compactMessagingSectionCheckbox = page.getByTestId(
      "switch-compact-messaging",
    );
    this.compactMessagingSectionLabel =
      this.compactMessagingSection.getByTestId("setting-section-label");
    this.compactMessagingSectionText = this.compactMessagingSection.getByTestId(
      "setting-section-text",
    );
    this.compactMessagingSectionSlider =
      this.compactMessagingSection.locator(".slider");
    this.convertToEmojiSection = page.getByTestId("section-convert-to-emoji");
    this.convertToEmojiSectionCheckbox = page.getByTestId(
      "checkbox-convert-to-emoji",
    );
    this.convertToEmojiSectionLabel = this.convertToEmojiSection.getByTestId(
      "setting-section-label",
    );
    this.convertToEmojiSectionText = this.convertToEmojiSection.getByTestId(
      "setting-section-text",
    );
    this.convertToEmojiSectionSlider = page.locator(
      '[data-cy="section-convert-to-emoji"] > .body > .content > .switch > .slider',
    );
    this.markdownSupportSection = page.getByTestId("section-markdown-support");
    this.markdownSupportSectionCheckbox = page.getByTestId(
      "checkbox-markdown-support",
    );
    this.markdownSupportSectionLabel = this.markdownSupportSection.getByTestId(
      "setting-section-label",
    );
    this.markdownSupportSectionText = this.markdownSupportSection.getByTestId(
      "setting-section-text",
    );
    this.markdownSupportSectionSlider = page.locator(
      '[data-cy="section-markdown-support"] > .body > .content > .switch > .slider',
    );
    this.quickChatSection = page.getByTestId("section-quick-chat");
    this.quickChatSectionCheckbox = page.getByTestId("switch-quick-chat");
    this.quickChatSectionLabel = this.quickChatSection.getByTestId(
      "setting-section-label",
    );
    this.quickChatSectionText = this.quickChatSection.getByTestId(
      "setting-section-text",
    );
    this.quickChatSectionSlider = this.quickChatSection.locator(".slider");
    this.spamBotDetectionSection = page
      .getByTestId("section-spam-bot-detection")
      .first();
    this.spamBotDetectionSectionCheckbox = page.getByTestId(
      "checkbox-spam-bot-detection",
    );
    this.spamBotDetectionSectionLabel =
      this.spamBotDetectionSection.getByTestId("setting-section-label");
    this.spamBotDetectionSectionText = this.spamBotDetectionSection.getByTestId(
      "setting-section-text",
    );
    this.spamBotDetectionSectionSlider =
      this.spamBotDetectionSection.locator(".slider");
  }
}
