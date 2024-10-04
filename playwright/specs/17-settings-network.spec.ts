import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { test } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";

test.describe("Settings Network Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page, viewport);
    await settingsProfile.buttonNetwork.click();
  });

  // Test not implemented yet
  // test.skip("Validate Settings Network page is shown", async ({
  //   singleUserContext,
  // }) => {
  //   // Test code for R1
  // });
});
