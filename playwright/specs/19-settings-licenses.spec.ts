import { ChatsMainPage } from "playwright/PageObjects/ChatsElements/ChatsMain";
import { test, expect } from "../fixtures/setup";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsLicenses } from "playwright/PageObjects/Settings/SettingsLicenses";

test.describe("Settings Licenses Tests", () => {
  test.beforeEach(async ({ singleUserContext }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const chatsMainPage = new ChatsMainPage(page, viewport);
    await chatsMainPage.dismissDownloadAlert();
    await chatsMainPage.goToSettings();
    await page.waitForURL("/settings/profile");

    const settingsProfile = new SettingsProfile(page, viewport);
    await settingsProfile.buttonLicenses.click();
    await page.waitForURL("/settings/licenses");
  });

  test("S1 - Clicking View License should take user to our licenses page", async ({
    singleUserContext,
  }) => {
    const page = singleUserContext.page;
    const viewport = singleUserContext.viewport;
    const settingsLicenses = new SettingsLicenses(page, viewport);

    // Declare the page object implementations and constants
    const LICENSE_URL =
      "https://github.com/Satellite-im/UplinkWeb/blob/dev/LICENSE-MIT";

    // Label and texts for settings section are correct
    await expect(settingsLicenses.licensesSectionLabel).toHaveText("Uplink");
    await expect(settingsLicenses.licensesSectionText).toHaveText(
      "Both code and icons are under the MIT license.",
    );

    // Validate that clicking on the button opens a new window with the correct URL
    await settingsLicenses.licensesSectionButton.click();
    const pagePromise = page.waitForEvent("popup");
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(LICENSE_URL);
  });
});
