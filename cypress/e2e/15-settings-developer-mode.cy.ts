import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";

describe("Settings - Developer Mode", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonAudioAndVideo.click();
  });

  it.skip("T1 - Clicking the DevMode button 10x should enable it", () => {
    // Test code for T1
  });

  it.skip("T2 - Clicking Exit Devmode should exit user out of Devmode", () => {
    // Test code for T2
  });

  it.skip("T3 - Clicking Load MockData should load all mock data throughout app", () => {
    // Test code for T3
  });

  it.skip("T4 - Clicking Clear State should clear users state", () => {
    // Test code for T4
  });

  it.skip("T5 - Highlighted border should appear around Exit DevMode when clicked", () => {
    // Test code for T5
  });

  it.skip("T6 - Highlighted border should appear around Load MockData when clicked", () => {
    // Test code for T6
  });

  it.skip("T7 - Highlighted border should appear around Clear State when clicked", () => {
    // Test code for T7
  });
});
