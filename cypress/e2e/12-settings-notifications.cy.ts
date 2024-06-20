import { faker } from "@faker-js/faker";
import authNewAccount from "./PageObjects/AuthNewAccount";
import chatsMain from "./PageObjects/ChatsMain";
import loginPinPage from "./PageObjects/LoginPin";
import settingsProfile from "./PageObjects/Settings/SettingsProfile";
import settingsNotifications from "./PageObjects/Settings/SettingsNotifications";

describe("Settings - Accessibility", () => {
  const username = faker.internet.userName();
  const status = faker.lorem.sentence(3);

  beforeEach(() => {
    loginPinPage.loginWithPin("1234");
    authNewAccount.createRandomUser(username, status);
    chatsMain.validateChatsMainPageIsShown();
    chatsMain.goToSettings();
    settingsProfile.buttonNotifications.click();
  });

  it.skip("P1 - User should be able to toggle on/off Dyslexic mode", () => {
    cy.url().should("include", "/settings/notifications");
  });

  it.skip("P2 - If Dyslexic mode is toggled on, font should be applied everywhere throughout the app", () => {
    // Test code for P2
  });
});
