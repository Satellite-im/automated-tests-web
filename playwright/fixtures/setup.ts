import { test as base, BrowserContext, chromium, Page } from "@playwright/test";
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
  authNewAccountFirst: AuthNewAccount;
  authNewAccountSecond: AuthNewAccount;
  authNewAccountThird: AuthNewAccount;
  context1: BrowserContext;
  context2: BrowserContext;
  context3: BrowserContext;
  chatsMainPage: ChatsMainPage;
  chatsMainPageFirst: ChatsMainPage;
  chatsMainPageSecond: ChatsMainPage;
  chatsMainPageThird: ChatsMainPage;
  createOrImport: CreateOrImportPage;
  createOrImportFirst: CreateOrImportPage;
  createOrImportSecond: CreateOrImportPage;
  createOrImportThird: CreateOrImportPage;
  filesPage: FilesPage;
  friendsScreen: FriendsScreen;
  friendsScreenFirst: FriendsScreen;
  friendsScreenSecond: FriendsScreen;
  friendsScreenThird: FriendsScreen;
  loginPinPage: LoginPinPage;
  loginPinPageFirst: LoginPinPage;
  loginPinPageSecond: LoginPinPage;
  loginPinPageThird: LoginPinPage;
  page1: Page;
  page2: Page;
  page3: Page;
  saveRecoverySeed: SaveRecoverySeedPage;
  saveRecoverySeedFirst: SaveRecoverySeedPage;
  saveRecoverySeedSecond: SaveRecoverySeedPage;
  saveRecoverySeedThird: SaveRecoverySeedPage;
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
  settingsProfileFirst: SettingsProfile;
  settingsProfileSecond: SettingsProfile;
  settingsRealms: SettingsRealms;
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
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

  settingsProfileFirst: async ({ page1 }, use) => {
    await use(new SettingsProfile(page1));
  },

  settingsProfileSecond: async ({ page2 }, use) => {
    await use(new SettingsProfile(page2));
  },
});

export { expect } from "@playwright/test";
