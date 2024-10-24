import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { test, expect } from "../fixtures/setup";
import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
import { SettingsExtensions } from "playwright/PageObjects/Settings/SettingsExtensions";

test.describe("Settings Extensions Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page, viewport);
    await settingsProfile.buttonExtensions.click();
    await page.waitForURL("/settings/extensions");
  });

  test("N1 - User should land on Installed when navigating to this page", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsExtensions = new SettingsExtensions(page, viewport);

    await expect(settingsExtensions.installedButton).toBeVisible();
    await expect(settingsExtensions.exploreButton).toBeVisible();
    await expect(settingsExtensions.settingsButton).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toHaveText(
      "Under Construction",
    );
    await expect(settingsExtensions.noExtensionsInstalledLabel).toBeVisible();
  });

  // Cannot be automated now since button does not perform any action
  // test.skip("N2 - Clicking Explore should take user to Explore page", ({
  //   page,
  // }) => {
  //   // Test code for N2
  // });

  // Cannot be automated now since button does not perform any action
  // test.skip("N3 - Clicking Settings should take user to Settings page", ({
  //   page,
  // }) => {
  //   // Test code for N3
  // });
});
