import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { test, expect } from "../fixtures/setup";
import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { SettingsAbout } from "playwright/PageObjects/Settings/SettingsAbout";
import { SettingsDeveloper } from "playwright/PageObjects/Settings/SettingsDeveloper";

test.describe("Settings Developer Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonAbout.click();
    await page.waitForURL("/settings/about");
  });

  test("T1, T2 - Clicking Exit Devmode should exit user out of Devmode", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

    // Open DevMode
    await settingsAbout.openDevModeSection();
    await page.waitForURL("/settings/developer");

    // Validate header and description texts
    await expect(settingsDeveloper.devModeSectionLabel).toHaveText("Dev Mode");
    await expect(settingsDeveloper.devModeSectionText).toHaveText(
      "Disable devmode.",
    );

    // Click on Exit DevMode
    await settingsDeveloper.devModeSectionButton.click();
    await settingsDeveloper.devModeSectionButton.waitFor({ state: "detached" });
    await page.waitForURL("/settings/about");
  });

  test("T3 - Clicking Load MockData should load all mock data throughout app", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
    await settingsDeveloper.slimbarFavorite.waitFor({ state: "attached" });

    // Mock data is loaded into chats
    //await settingsDeveloper.goToChat();
    //const numberOfSidebarChatBubbles = await chatsMain.slimbarFavorite.count();
    //expect(numberOfSidebarChatBubbles).toEqual(1);
  });

  // Skipped since button is not performing any action now
  test.skip("T4 - Clicking Clear State should clear users state", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsAbout = new SettingsAbout(page);
    const settingsDeveloper = new SettingsDeveloper(page);

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
