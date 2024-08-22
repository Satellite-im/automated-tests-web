import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { test, expect } from "../fixtures/setup";
import { ChatsMainPage } from "playwright/PageObjects/ChatsMain";
import { SettingsExtensions } from "playwright/PageObjects/Settings/SettingsExtensions";

test.describe("Settings Extensions Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const chatsMainPage = new ChatsMainPage(page);
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page);
    await settingsProfile.buttonExtensions.click();
    await page.waitForURL("/settings/extensions");
  });

  test("N1 - User should land on Installed when navigating to this page", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const settingsExtensions = new SettingsExtensions(page);

    await expect(settingsExtensions.installedButton).toBeVisible();
    await expect(settingsExtensions.exploreButton).toBeVisible();
    await expect(settingsExtensions.settingsButton).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toBeVisible();
    await expect(settingsExtensions.underConstructionIndicator).toHaveText(
      "Under Construction",
    );
    await expect(settingsExtensions.noExtensionsInstalledLabel).toBeVisible();
  });

  test.skip("N2 - Clicking Explore should take user to Explore page", ({
    page,
  }) => {
    // Test code for N2
  });

  test.skip("N3 - Clicking Settings should take user to Settings page", ({
    page,
  }) => {
    // Test code for N3
  });
});
