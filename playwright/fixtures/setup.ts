import { test as base, BrowserContext, chromium, Page } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "../PageObjects/Settings/SettingsProfile";
import { SettingsInventory } from "../PageObjects/Settings/SettingsInventory";
import { SettingsCustomizations } from "../PageObjects/Settings/SettingsCustomizations";
import { SettingsMessages } from "../PageObjects/Settings/SettingsMessages";
import { SettingsAudio } from "../PageObjects/Settings/SettingsAudio";
import { SettingsExtensions } from "../PageObjects/Settings/SettingsExtensions";
import { SettingsKeybinds } from "../PageObjects/Settings/SettingsKeybinds";
import { SettingsNotifications } from "../PageObjects/Settings/SettingsNotifications";
import { SettingsAbout } from "../PageObjects/Settings/SettingsAbout";
import { SettingsLicenses } from "../PageObjects/Settings/SettingsLicenses";
import { SettingsDeveloper } from "../PageObjects/Settings/SettingsDeveloper";
import { SettingsAccessibility } from "../PageObjects/Settings/SettingsAccessibility";
import { SettingsNetwork } from "../PageObjects/Settings/SettingsNetwork";
import { FilesPage } from "../PageObjects/FilesScreen";
import { FriendsScreen } from "../PageObjects/FriendsScreen";

// Declare the types of your fixtures.
type MyFixtures = {
  loginPinPage: LoginPinPage;
  loginPinPageSecond: LoginPinPage;
  authNewAccount: AuthNewAccount;
  authNewAccountSecond: AuthNewAccount;
  chatsMainPage: ChatsMainPage;
  chatsMainPageSecond: ChatsMainPage;
  createOrImport: CreateOrImportPage;
  createOrImportSecond: CreateOrImportPage;
  saveRecoverySeed: SaveRecoverySeedPage;
  saveRecoverySeedSecond: SaveRecoverySeedPage;
  chatsPageLogged: ChatsMainPage;
  chatsPageLoggedSecond: ChatsMainPage;
  settingsProfile: SettingsProfile;
  settingsInventory: SettingsInventory;
  settingsCustomizations: SettingsCustomizations;
  settingsMessages: SettingsMessages;
  settingsAudio: SettingsAudio;
  settingsExtensions: SettingsExtensions;
  settingsKeybinds: SettingsKeybinds;
  settingsNotifications: SettingsNotifications;
  settingsAbout: SettingsAbout;
  settingsLicenses: SettingsLicenses;
  settingsDeveloper: SettingsDeveloper;
  settingsAccessibility: SettingsAccessibility;
  settingsNetwork: SettingsNetwork;
  filesPage: FilesPage;
  friendsScreen: FriendsScreen;
  friendsScreenSecond: FriendsScreen;
  context: BrowserContext;
  context2: BrowserContext;
  page: Page;
  page2: Page;
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  createOrImport: async ({ page }, use) => {
    await use(new CreateOrImportPage(page));
  },

  createOrImportSecond: async ({ page2 }, use) => {
    await use(new CreateOrImportPage(page2));
  },

  authNewAccount: async ({ page }, use) => {
    await use(new AuthNewAccount(page));
  },

  authNewAccountSecond: async ({ page2 }, use) => {
    await use(new AuthNewAccount(page2));
  },

  loginPinPage: async ({ page }, use) => {
    await use(new LoginPinPage(page));
  },

  loginPinPageSecond: async ({ page2 }, use) => {
    await use(new LoginPinPage(page2));
  },

  saveRecoverySeed: async ({ page }, use) => {
    await use(new SaveRecoverySeedPage(page));
  },

  saveRecoverySeedSecond: async ({ page2 }, use) => {
    await use(new SaveRecoverySeedPage(page2));
  },

  chatsMainPage: async ({ page }, use) => {
    await use(new ChatsMainPage(page));
  },

  chatsMainPageSecond: async ({ page2 }, use) => {
    await use(new ChatsMainPage(page2));
  },

  settingsProfile: async ({ page }, use) => {
    await use(new SettingsProfile(page));
  },

  settingsInventory: async ({ page }, use) => {
    await use(new SettingsInventory(page));
  },

  settingsCustomizations: async ({ page }, use) => {
    await use(new SettingsCustomizations(page));
  },

  settingsMessages: async ({ page }, use) => {
    await use(new SettingsMessages(page));
  },

  settingsAudio: async ({ page }, use) => {
    await use(new SettingsAudio(page));
  },

  settingsExtensions: async ({ page }, use) => {
    await use(new SettingsExtensions(page));
  },

  settingsKeybinds: async ({ page }, use) => {
    await use(new SettingsKeybinds(page));
  },

  settingsNotifications: async ({ page }, use) => {
    await use(new SettingsNotifications(page));
  },

  settingsAbout: async ({ page }, use) => {
    await use(new SettingsAbout(page));
  },

  settingsLicenses: async ({ page }, use) => {
    await use(new SettingsLicenses(page));
  },

  settingsDeveloper: async ({ page }, use) => {
    await use(new SettingsDeveloper(page));
  },

  settingsAccessibility: async ({ page }, use) => {
    await use(new SettingsAccessibility(page));
  },

  settingsNetwork: async ({ page }, use) => {
    await use(new SettingsNetwork(page));
  },

  filesPage: async ({ page }, use) => {
    await use(new FilesPage(page));
  },

  friendsScreen: async ({ page }, use) => {
    await use(new FriendsScreen(page));
  },

  friendsScreenSecond: async ({ page2 }, use) => {
    await use(new FriendsScreen(page2));
  },

  context: async ({}, use) => {
    const browser1 = await chromium.launch();
    const context1 = await browser1.newContext();
    await use(context1);
    await context1.close();
  },

  context2: async ({}, use) => {
    const browser2 = await chromium.launch();
    const context2 = await browser2.newContext();
    await use(context2);
    await context2.close();
  },

  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  page2: async ({ context2 }, use) => {
    const page2 = await context2.newPage();
    await use(page2);
    await page2.close();
  },
});

export { expect } from "@playwright/test";
