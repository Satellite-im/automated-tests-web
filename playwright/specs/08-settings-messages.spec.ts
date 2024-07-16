import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsMessages } from "../PageObjects/Settings/SettingsMessages";

test.describe("Settings Messages Tests", () => {
  const username = "test123";
  const status = "test status";

  test.beforeEach(async ({ page }) => {
    // Declare the page object implementations
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const settingsProfile = new SettingsProfile(page);

    // Select Create Account
    await createOrImport.navigateTo();
    await createOrImport.clickCreateNewAccount();

    // Enter Username and Status
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.buttonNewAccountCreate.click();

    // Enter PIN
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.buttonSavedPhrase.waitFor({ state: "attached" });
    await saveRecoverySeed.clickOnSavedIt();
    await chatsMainPage.addSomeone.waitFor({ state: "visible" });
    await page.waitForURL("/chat");

    // Go to Settings Profile and then Settings Inventory page
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");
    await settingsProfile.buttonMessages.click();
    await page.waitForURL("/settings/messages");
  });

  test("L1 - User should be able to toggle on and off emoji conversion", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsMessages = new SettingsMessages(page);
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
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsMessages = new SettingsMessages(page);
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
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsMessages = new SettingsMessages(page);
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
