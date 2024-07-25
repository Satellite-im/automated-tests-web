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
  loginPinPageFirst: LoginPinPage;
  loginPinPageSecond: LoginPinPage;
  loginPinPageThird: LoginPinPage;
  authNewAccount: AuthNewAccount;
  authNewAccountFirst: AuthNewAccount;
  authNewAccountSecond: AuthNewAccount;
  authNewAccountThird: AuthNewAccount;
  chatsMainPage: ChatsMainPage;
  chatsMainPageFirst: ChatsMainPage;
  chatsMainPageSecond: ChatsMainPage;
  chatsMainPageThird: ChatsMainPage;
  createOrImport: CreateOrImportPage;
  createOrImportFirst: CreateOrImportPage;
  createOrImportSecond: CreateOrImportPage;
  createOrImportThird: CreateOrImportPage;
  saveRecoverySeed: SaveRecoverySeedPage;
  saveRecoverySeedFirst: SaveRecoverySeedPage;
  saveRecoverySeedSecond: SaveRecoverySeedPage;
  saveRecoverySeedThird: SaveRecoverySeedPage;
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
  friendsScreenFirst: FriendsScreen;
  friendsScreenSecond: FriendsScreen;
  friendsScreenThird: FriendsScreen;
  context1: BrowserContext;
  context2: BrowserContext;
  context3: BrowserContext;
  page1: Page;
  page2: Page;
  page3: Page;
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  createOrImport: async ({ page }, use) => {
    await use(new CreateOrImportPage(page));
  },

  createOrImportFirst: async ({ page1 }, use) => {
    await use(new CreateOrImportPage(page1));
  },

  createOrImportSecond: async ({ page2 }, use) => {
    await use(new CreateOrImportPage(page2));
  },

  createOrImportThird: async ({ page3 }, use) => {
    await use(new CreateOrImportPage(page3));
  },

  authNewAccount: async ({ page }, use) => {
    await use(new AuthNewAccount(page));
  },

  authNewAccountFirst: async ({ page1 }, use) => {
    await use(new AuthNewAccount(page1));
  },

  authNewAccountSecond: async ({ page2 }, use) => {
    await use(new AuthNewAccount(page2));
  },

  authNewAccountThird: async ({ page3 }, use) => {
    await use(new AuthNewAccount(page3));
  },

  loginPinPage: async ({ page }, use) => {
    await use(new LoginPinPage(page));
  },

  loginPinPageFirst: async ({ page1 }, use) => {
    await use(new LoginPinPage(page1));
  },

  loginPinPageSecond: async ({ page2 }, use) => {
    await use(new LoginPinPage(page2));
  },

  loginPinPageThird: async ({ page3 }, use) => {
    await use(new LoginPinPage(page3));
  },

  saveRecoverySeed: async ({ page }, use) => {
    await use(new SaveRecoverySeedPage(page));
  },

  saveRecoverySeedFirst: async ({ page1 }, use) => {
    await use(new SaveRecoverySeedPage(page1));
  },

  saveRecoverySeedSecond: async ({ page2 }, use) => {
    await use(new SaveRecoverySeedPage(page2));
  },

  saveRecoverySeedThird: async ({ page3 }, use) => {
    await use(new SaveRecoverySeedPage(page3));
  },

  chatsMainPage: async ({ page }, use) => {
    await use(new ChatsMainPage(page));
  },

  chatsMainPageFirst: async ({ page1 }, use) => {
    await use(new ChatsMainPage(page1));
  },

  chatsMainPageSecond: async ({ page2 }, use) => {
    await use(new ChatsMainPage(page2));
  },

  chatsMainPageThird: async ({ page3 }, use) => {
    await use(new ChatsMainPage(page3));
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

  friendsScreenFirst: async ({ page1 }, use) => {
    await use(new FriendsScreen(page1));
  },

  friendsScreenSecond: async ({ page2 }, use) => {
    await use(new FriendsScreen(page2));
  },

  friendsScreenThird: async ({ page3 }, use) => {
    await use(new FriendsScreen(page3));
  },

  context1: async ({}, use) => {
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

  context3: async ({}, use) => {
    const browser3 = await chromium.launch();
    const context3 = await browser3.newContext();
    await use(context3);
    await context3.close();
  },

  page1: async ({ context1 }, use) => {
    const page1 = await context1.newPage();
    await use(page1);
    await page1.close();
  },

  page2: async ({ context2 }, use) => {
    const page2 = await context2.newPage();
    await use(page2);
    await page2.close();
  },

  page3: async ({ context3 }, use) => {
    const page3 = await context3.newPage();
    await use(page3);
    await page3.close();
  },
});

export { expect } from "@playwright/test";
