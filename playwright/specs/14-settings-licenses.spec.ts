import { test, expect } from "../fixtures/setup";

test.describe("Settings Licenses Tests", () => {
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

      await settingsProfile.buttonLicenses.click();
      await page.waitForURL("/settings/licenses");
    },
  );

  test("S1 - Clicking View License should take user to our licenses page", async ({
    settingsLicenses,
    page,
  }) => {
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
