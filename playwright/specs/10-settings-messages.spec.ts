import { test, expect } from "../fixtures/setup";

test.describe("Settings Messages Tests", () => {
  const username = "test123";
  const status = "fixed status";

  test.beforeEach(
    async ({
      createOrImport,
      authNewAccount,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      settingsProfile,
      page,
    }) => {
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

      await chatsMainPage.goToSettings();
      await page.waitForURL("/settings/profile");

      await settingsProfile.buttonMessages.click();
      await page.waitForURL("/settings/messages");
    },
  );

  test("L1 - User should be able to toggle on and off emoji conversion", async ({
    settingsMessages,
  }) => {
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
    settingsMessages,
  }) => {
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
    settingsMessages,
  }) => {
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
