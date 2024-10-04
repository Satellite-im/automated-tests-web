import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsMessages } from "playwright/PageObjects/Settings/SettingsMessages";

test.describe("Settings Messages Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page, viewport);
    await settingsProfile.buttonMessages.click();
    await page.waitForURL("/settings/messages");
  });

  test("L1 - User should be able to toggle on and off emoji conversion", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsMessages = new SettingsMessages(page, viewport);

    // Label and texts for settings section are correct
    await expect(settingsMessages.convertToEmojiSectionLabel).toHaveText(
      "Convert to Emoji",
    );
    await expect(settingsMessages.convertToEmojiSectionText).toHaveText(
      "Convert smileys and other symbols like <3 to ❤️",
    );

    // Checkbox should be enabled by default
    await expect(settingsMessages.convertToEmojiSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsMessages.convertToEmojiSectionSlider.click();
    await expect(
      settingsMessages.convertToEmojiSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsMessages.convertToEmojiSectionSlider.click();
    await expect(settingsMessages.convertToEmojiSectionCheckbox).toBeChecked();
  });

  test("L2 - User should be able to toggle on and off Markdown support", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsMessages = new SettingsMessages(page, viewport);

    // Label and texts for settings section are correct
    await expect(settingsMessages.markdownSupportSectionLabel).toHaveText(
      "Markdown Support",
    );
    await expect(settingsMessages.markdownSupportSectionText).toHaveText(
      "Enabled the rendering of Markdown within messaging.",
    );

    // Checkbox should be enabled by default
    await expect(settingsMessages.markdownSupportSectionCheckbox).toBeChecked();

    // User can toggle checkbox to off
    await settingsMessages.markdownSupportSectionSlider.click();
    await expect(
      settingsMessages.markdownSupportSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsMessages.markdownSupportSectionSlider.click();
    await expect(settingsMessages.markdownSupportSectionCheckbox).toBeChecked();
  });

  test("L3 - User should be able to toggle on and off emoji Spam/Bot detection & rejection", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsMessages = new SettingsMessages(page, viewport);

    // Label and texts for settings section are correct
    await expect(settingsMessages.spamBotDetectionSectionLabel).toHaveText(
      "Spam/Bot Detection & Rejection",
    );
    await expect(settingsMessages.spamBotDetectionSectionText).toHaveText(
      "Enabled the automatic rejection of messages from known spam bots or scammers. This uses a public ledger that we reserve privately for 30 days to prevent bots from detecting they have been blocked too quickly.",
    );

    // Checkbox should be enabled by default
    await expect(
      settingsMessages.spamBotDetectionSectionCheckbox,
    ).toBeChecked();

    // User can toggle checkbox to off
    await settingsMessages.spamBotDetectionSectionSlider.click();
    await expect(
      settingsMessages.spamBotDetectionSectionCheckbox,
    ).not.toBeChecked();

    // User can toggle again checkbox to on
    await settingsMessages.spamBotDetectionSectionSlider.click();
    await expect(
      settingsMessages.spamBotDetectionSectionCheckbox,
    ).toBeChecked();
  });
});
