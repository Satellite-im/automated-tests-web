import { test as base } from "@playwright/test";
import { LoginPinPage } from "../PageObjects/LoginPin";
import { AuthNewAccount } from "../PageObjects/AuthNewAccount";
import { ChatsMainPage } from "../PageObjects/ChatsMain";
import { CreateOrImportPage } from "../PageObjects/CreateOrImport";
import { SaveRecoverySeedPage } from "../PageObjects/SaveRecoverySeed";
import { SettingsProfile } from "playwright/PageObjects/Settings/SettingsProfile";
import { SettingsInventory } from "playwright/PageObjects/Settings/SettingsInventory";
import { SettingsCustomizations } from "playwright/PageObjects/Settings/SettingsCustomizations";
import { SettingsMessages } from "playwright/PageObjects/Settings/SettingsMessages";
import { SettingsAudio } from "playwright/PageObjects/Settings/SettingsAudio";
import { SettingsExtensions } from "playwright/PageObjects/Settings/SettingsExtensions";
import { SettingsKeybinds } from "playwright/PageObjects/Settings/SettingsKeybinds";
import { SettingsNotifications } from "playwright/PageObjects/Settings/SettingsNotifications";
import { SettingsAbout } from "playwright/PageObjects/Settings/SettingsAbout";
import { SettingsLicenses } from "playwright/PageObjects/Settings/SettingsLicenses";
import { SettingsDeveloper } from "playwright/PageObjects/Settings/SettingsDeveloper";
import { SettingsAccessibility } from "playwright/PageObjects/Settings/SettingsAccessibility";
import { SettingsNetwork } from "playwright/PageObjects/Settings/SettingsNetwork";
import { FilesPage } from "playwright/PageObjects/FilesScreen";
import { FriendsScreen } from "playwright/PageObjects/FriendsScreen";

// Declare the types of your fixtures.
type MyFixtures = {
  loginPinPage: LoginPinPage;
  authNewAccount: AuthNewAccount;
  chatsMainPage: ChatsMainPage;
  createOrImport: CreateOrImportPage;
  saveRecoverySeed: SaveRecoverySeedPage;
  chatsPageLogged: ChatsMainPage;
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
};

// Extend base test by providing page object classes as fixtures.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  createOrImport: async ({ page }, use) => {
    await use(new CreateOrImportPage(page));
  },

  authNewAccount: async ({ page }, use) => {
    await use(new AuthNewAccount(page));
  },

  loginPinPage: async ({ page }, use) => {
    await use(new LoginPinPage(page));
  },

  saveRecoverySeed: async ({ page }, use) => {
    await use(new SaveRecoverySeedPage(page));
  },

  chatsMainPage: async ({ page }, use) => {
    await use(new ChatsMainPage(page));
  },

  settingsProfile: async ({ page }, use) => {
    await use(new SettingsProfile(page));
  },

  settingsInventory: async ({ page }, use) => {
    await use(new SettingsInventory(page));
  },

  settingsCustomizations: async ({ page }, use) => {
    await use(new SettingsCustomizations(page));
  }

  settingsMessages: async ({ page }, use) => {
    await use(new SettingsMessages(page));
  }

  settingsAudio: async ({ page }, use) => {
    await use(new SettingsAudio(page));
  }

  settingsExtensions: async ({ page }, use) => {
    await use(new SettingsExtensions(page));
  }

  settingsKeybinds: async ({ page }, use) => {
    await use(new SettingsKeybinds(page));
  }

  settingsNotifications: async ({ page }, use) => {
    await use(new SettingsNotifications(page));
  }

  settingsAbout: async ({ page }, use) => {
    await use(new SettingsAbout(page));
  }

  settingsLicenses: async ({ page }, use) => {
    await use(new SettingsLicenses(page));
  }

  settingsDeveloper: async ({ page }, use) => {
    await use(new SettingsDeveloper(page));
  }

  settingsAccessibility: async ({ page }, use) => {
    await use(new SettingsAccessibility(page));
  }

  settingsNetwork: async ({ page }, use) => {
    await use(new SettingsNetwork(page));
  }

  filesPage: async ({ page }, use) => {
    await use(new FilesPage(page));
  }

  friendsScreen: async ({ page }, use) => {
    await use(new FriendsScreen(page));
  }
});
export { expect } from "@playwright/test";
