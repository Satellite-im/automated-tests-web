import { test, expect } from "../fixtures/setup";

test.describe("Settings Developer Tests", () => {
  const username = "test123";
  const status = "test status";

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

      await settingsProfile.buttonAbout.click();
      await page.waitForURL("/settings/about");
    },
  );

  test("T1, T2 - Clicking Exit Devmode should exit user out of Devmode", async ({
    settingsAbout,
    settingsDeveloper,
    page,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();
    await page.waitForURL("/settings/developer");

    // Validate header and description texts
    await expect(settingsDeveloper.devModeSectionLabel).toHaveText("Devmode");
    await expect(settingsDeveloper.devModeSectionText).toHaveText(
      "Disable devmode.",
    );

    // Click on Exit DevMode
    await settingsDeveloper.devModeSectionButton.click();
    await settingsDeveloper.devModeSectionButton.waitFor({ state: "detached" });
    await page.waitForURL("/settings/about");
  });

  test("T3 - Clicking Load MockData should load all mock data throughout app", async ({
    chatsMainPage,
    settingsAbout,
    settingsDeveloper,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Validate header and description texts
    await expect(settingsDeveloper.loadMockSectionLabel).toHaveText(
      "Load Mock",
    );
    await expect(settingsDeveloper.loadMockSectionText).toHaveText(
      "Loads mock data into state.",
    );

    // Click on Load Mock
    await settingsDeveloper.loadMockSectionButton.click();

    // Favorites bubble from mock is added to slimbar
    await settingsDeveloper.slimbarFavorite.waitFor({ state: "visible" });

    // Mock data is loaded into chats
    await settingsDeveloper.goToChat();
    const numberOfSidebarChatBubbles =
      await chatsMainPage.sidebarChatPreview.count();
    expect(numberOfSidebarChatBubbles).toEqual(6);
  });

  // Skipped since button is not performing any action now
  test.skip("T4 - Clicking Clear State should clear users state", async ({
    settingsAbout,
    settingsDeveloper,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Validate header and description texts
    await expect(settingsDeveloper.clearStateSectionLabel).toHaveText(
      "Clear State",
    );
    await expect(settingsDeveloper.clearStateSectionText).toHaveText(
      "Reset the application state.",
    );

    // Click on Clear State
    await settingsDeveloper.clearStateSectionButton.click();
  });

  test("T5 - Highlighted border should appear around Exit DevMode when clicked", async ({
    settingsAbout,
    settingsDeveloper,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Focus on Exit DevMode
    await settingsDeveloper.devModeSectionButton.focus();

    // Validate that the border color changes to blue
    await expect(settingsDeveloper.devModeSectionButton).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  test("T6 - Highlighted border should appear around Load MockData when clicked", async ({
    settingsAbout,
    settingsDeveloper,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Click on Load Mock Data button
    await settingsDeveloper.loadMockSectionButton.click();

    // Validate that the border color changes to blue
    await expect(settingsDeveloper.loadMockSectionButton).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  test("T7 - Highlighted border should appear around Clear State when clicked", async ({
    settingsAbout,
    settingsDeveloper,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Click on Clear State button
    await settingsDeveloper.clearStateSectionButton.focus();

    // Validate that the border color changes to blue
    await expect(settingsDeveloper.clearStateSectionButton).toHaveCSS(
      "border-bottom-color",
      "rgb(77, 77, 255)",
    );
  });

  test("T8 - Clicking Test Voice State should open debug voice page", async ({
    settingsAbout,
    settingsDeveloper,
    page,
  }) => {
    // Open DevMode
    await settingsAbout.openDevModeSection();

    // Validate header and description texts
    await expect(settingsDeveloper.testVoiceSectionLabel).toHaveText(
      "Test Voice",
    );
    await expect(settingsDeveloper.testVoiceSectionText).toHaveText(
      "Dev Voice",
    );

    // Click on Test Voice
    await settingsDeveloper.testVoiceSectionButton.click();

    // Validate that the URL is redirected correctly
    await page.waitForURL("/developer/debug/voice");
  });
});
