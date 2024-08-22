import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

test.describe("Settings Network Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonNetwork.click();
  });

  test.skip("Validate Settings Network page is shown", async ({
    singleUserContext,
  }) => {
    // Test code for R1
  });
});
