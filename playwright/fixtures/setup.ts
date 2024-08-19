import {
  test as base,
  BrowserContext,
  chromium,
  Page,
  Browser,
} from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { FilesPage } from "../PageObjects/FilesScreen";
import { FriendsScreen } from "../PageObjects/FriendsScreen";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsAbout } from "../PageObjects/Settings/SettingsAbout";
import { SettingsAccessibility } from "../PageObjects/Settings/SettingsAccessibility";
import { SettingsAudio } from "../PageObjects/Settings/SettingsAudio";
import { SettingsCustomizations } from "../PageObjects/Settings/SettingsCustomizations";
import { SettingsDeveloper } from "../PageObjects/Settings/SettingsDeveloper";
import { SettingsExtensions } from "../PageObjects/Settings/SettingsExtensions";
import { SettingsGamepad } from "playwright/PageObjects/Settings/SettingsGamepad";
import { SettingsInventory } from "../PageObjects/Settings/SettingsInventory";
import { SettingsLicenses } from "../PageObjects/Settings/SettingsLicenses";
import { SettingsNetwork } from "../PageObjects/Settings/SettingsNetwork";
import { SettingsKeybinds } from "../PageObjects/Settings/SettingsKeybinds";
import { SettingsMessages } from "../PageObjects/Settings/SettingsMessages";
import { SettingsNotifications } from "../PageObjects/Settings/SettingsNotifications";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsRealms } from "playwright/PageObjects/Settings/SettingsRealms";

// Declare the types of your fixtures.
type MyFixtures = {
  authNewAccount: AuthNewAccount;
  firstUserContext: {
    browser: Browser;
    context: BrowserContext;
    page: Page;
    authNewAccount: AuthNewAccount;
    createOrImport: CreateOrImportPage;
    loginPinPage: LoginPinPage;
    saveRecoverySeed: SaveRecoverySeedPage;
    chatsMainPage: ChatsMainPage;
    username: string;
    status: string;
  };
  secondUserContext: {
    browser: Browser;
    context: BrowserContext;
    page: Page;
    authNewAccount: AuthNewAccount;
    createOrImport: CreateOrImportPage;
    loginPinPage: LoginPinPage;
    saveRecoverySeed: SaveRecoverySeedPage;
    chatsMainPage: ChatsMainPage;
    username: string;
    status: string;
  };
  chatsMainPage: ChatsMainPage;
  createOrImport: CreateOrImportPage;
  filesPage: FilesPage;
  friendsScreen: FriendsScreen;
  loginPinPage: LoginPinPage;
  saveRecoverySeed: SaveRecoverySeedPage;
  settingsAbout: SettingsAbout;
  settingsAccessibility: SettingsAccessibility;
  settingsAudio: SettingsAudio;
  settingsCustomizations: SettingsCustomizations;
  settingsDeveloper: SettingsDeveloper;
  settingsExtensions: SettingsExtensions;
  settingsGamepad: SettingsGamepad;
  settingsInventory: SettingsInventory;
  settingsKeybinds: SettingsKeybinds;
  settingsLicenses: SettingsLicenses;
  settingsMessages: SettingsMessages;
  settingsNetwork: SettingsNetwork;
  settingsNotifications: SettingsNotifications;
  settingsProfile: SettingsProfile;
  settingsRealms: SettingsRealms;
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  authNewAccount: async ({ page }, use) => {
    await use(new AuthNewAccount(page));
  },

  chatsMainPage: async ({ page }, use) => {
    await use(new ChatsMainPage(page));
  },

  firstUserContext: async ({}, use) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const username: string = "ChatUserA";
    const status: string = faker.lorem.sentence(3);

    // Start browser one
    await createOrImport.navigateTo();
    // Start browser two
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Go to Friends
    await chatsMainPage.goToFriends();

    // Pass the context, browser, and page to the test
    await use({
      browser,
      context,
      page,
      authNewAccount,
      createOrImport,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      username,
      status,
    });

    // Close the context and browser after the test is done
    await context.close();
    await browser.close();
  },

  secondUserContext: async ({}, use) => {
    // Declare all constants required for the precondition steps
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    const createOrImport = new CreateOrImportPage(page);
    const authNewAccount = new AuthNewAccount(page);
    const loginPinPage = new LoginPinPage(page);
    const saveRecoverySeed = new SaveRecoverySeedPage(page);
    const chatsMainPage = new ChatsMainPage(page);
    const username: string = "ChatUserB";
    const status: string = faker.lorem.sentence(3);

    // Start browser one
    await createOrImport.navigateTo();
    // Start browser two
    await createOrImport.navigateTo();

    // Click on Create New Account
    await createOrImport.clickCreateNewAccount();

    // Enter username and Status and click on create account
    await authNewAccount.validateLoadingHeader();
    await authNewAccount.typeOnUsername(username);
    await authNewAccount.typeOnStatus(status);
    await authNewAccount.clickOnCreateAccount();

    // Enter Pin
    await loginPinPage.waitUntilPageIsLoaded();
    await loginPinPage.enterDefaultPin();

    // Click on I Saved It
    await saveRecoverySeed.clickOnSavedIt();

    // Go to Friends
    await chatsMainPage.goToFriends();

    // Pass the context, browser, and page to the test
    await use({
      browser,
      context,
      page,
      authNewAccount,
      createOrImport,
      loginPinPage,
      saveRecoverySeed,
      chatsMainPage,
      username,
      status,
    });

    // Close the context and browser after the test is done
    await context.close();
    await browser.close();
  },

  createOrImport: async ({ page }, use) => {
    await use(new CreateOrImportPage(page));
  },

  filesPage: async ({ page }, use) => {
    await use(new FilesPage(page));
  },

  friendsScreen: async ({ page }, use) => {
    await use(new FriendsScreen(page));
  },

  loginPinPage: async ({ page }, use) => {
    await use(new LoginPinPage(page));
  },

  page: async ({ context }, use) => {
    // Declare all constants required for the precondition steps
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  saveRecoverySeed: async ({ page }, use) => {
    await use(new SaveRecoverySeedPage(page));
  },

  settingsAbout: async ({ page }, use) => {
    await use(new SettingsAbout(page));
  },

  settingsAccessibility: async ({ page }, use) => {
    await use(new SettingsAccessibility(page));
  },

  settingsAudio: async ({ page }, use) => {
    await use(new SettingsAudio(page));
  },

  settingsCustomizations: async ({ page }, use) => {
    await use(new SettingsCustomizations(page));
  },

  settingsDeveloper: async ({ page }, use) => {
    await use(new SettingsDeveloper(page));
  },

  settingsExtensions: async ({ page }, use) => {
    await use(new SettingsExtensions(page));
  },

  settingsGamepad: async ({ page }, use) => {
    await use(new SettingsGamepad(page));
  },

  settingsInventory: async ({ page }, use) => {
    await use(new SettingsInventory(page));
  },

  settingsKeybinds: async ({ page }, use) => {
    await use(new SettingsKeybinds(page));
  },

  settingsLicenses: async ({ page }, use) => {
    await use(new SettingsLicenses(page));
  },

  settingsMessages: async ({ page }, use) => {
    await use(new SettingsMessages(page));
  },

  settingsNetwork: async ({ page }, use) => {
    await use(new SettingsNetwork(page));
  },

  settingsNotifications: async ({ page }, use) => {
    await use(new SettingsNotifications(page));
  },

  settingsProfile: async ({ page }, use) => {
    await use(new SettingsProfile(page));
  },
});

export { expect } from "@playwright/test";
