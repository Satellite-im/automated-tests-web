import { test, expect } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsAbout } from "../PageObjects/Settings/SettingsAbout";

test.describe("Settings About Tests", () => {
  const username = "test123";
  const status = "test status";
  const BASE_URL = "https://satellite.im/";
  const VERSION = "0.2.5";
  const GITHUB_URL = "https://github.com/Satellite-im";

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
    await settingsProfile.buttonAbout.click();
    await page.waitForURL("/settings/about");
  });

  test('R1 - "About Uplink" should appear at top of page', async ({ page }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.aboutSectionLabel).toHaveText("About");
    await expect(settingsAbout.aboutSectionText).toHaveText("Uplink");
  });

  test("R2 - Current version of Uplink should be displayed", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.versionSectionLabel).toHaveText("Version");
    await expect(settingsAbout.versionSectionText).toHaveText(VERSION);
  });

  // Skipped since button is not performing any action now
  test.skip("R3 - Clicking Check for Updates should check for newest version of Uplink available", async ({
    page,
  }) => {
    const settingsAbout = new SettingsAbout(page);
    await settingsAbout.versionSectionButton.click();
  });

  test("R4 - Clicking Open Website should take you to the Uplink website", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.websiteSectionLabel).toHaveText("Website");
    await expect(settingsAbout.websiteSectionText).toHaveText(
      "Open a new browser window to our official website.",
    );

    // Validate that clicking on the button opens a new window with the correct URL
    await settingsAbout.websiteSectionButton.click();
    const pagePromise = page.waitForEvent("popup");
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(BASE_URL);
  });

  test("R5 - Clicking Open Source Code should take you to the source code", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.openSourceCodeSectionLabel).toHaveText(
      "Open Source Code",
    );
    await expect(settingsAbout.openSourceCodeSectionText).toHaveText(
      "Open a new browser window to our open source repository.",
    );

    // Validate that clicking on the button opens a new window with the correct URL
    await settingsAbout.openSourceCodeSectionButton.click();
    const pagePromise = page.waitForEvent("popup");
    const newTab = await pagePromise;
    await newTab.waitForLoadState();
    await expect(newTab).toHaveURL(GITHUB_URL);
  });

  test("R6 and R7 - Made In header text, description and flags displayed", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.madeInSectionLabel).toHaveText("Made In");
    await expect(settingsAbout.madeInSectionText).toHaveText(
      "Our team is all over the world with different backgrounds and different day-to-day lives all working on a common goal to build this app.",
    );
    await expect(settingsAbout.madeInSectionFlags).toHaveText(
      "🇺🇸 🇮🇹 🇩🇪 🇵🇹 🇧🇷 🇺🇦 🇧🇾 🇯🇵 🇦🇺 🇮🇩 🇲🇽 🇨🇦",
    );
  });

  test("R8 - Clicking DevMode button 10 times should enable DevMode", async ({
    page,
  }) => {
    // Label and texts for settings section are correct
    const settingsAbout = new SettingsAbout(page);
    await expect(settingsAbout.devModeSectionLabel).toHaveText("DevMode");
    await expect(settingsAbout.devModeSectionText).toHaveText(
      "Click 10 times to enable developer settings.",
    );
    await settingsAbout.openDevModeSection();
    await page.waitForURL("/settings/developer");
  });
});
